using log4net;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using WeChat.Infrastructure;
using WeChat.Models;
using WeChat.Models.VO;
using System.Configuration;

namespace WeChat.Controllers
{
    public class BaseController : Controller
    {
        //
        // GET: /Base2/
        AuthMgr authMgr = new AuthMgr();
        SettingsMgr setMgr = new SettingsMgr();
        //public const string LANGUAGE_VALUE = "2";

        public ActionResult Login(string code)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string serveruri = ConfigurationManager.AppSettings["serveruri"]; 
            Session["openid"] = null;
            DAL.WeOpenid weOpenid = DAL.WeChatDAL.getOpenid(code, Url.Encode(serveruri));
            if (weOpenid.redirectUrl != "")
                Response.Redirect(weOpenid.redirectUrl);

            //ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            //logger.Info("weOpenid=" + weOpenid.openid);

            if (weOpenid.openid != "")
            {
                Session["openid"] = weOpenid.openid;
            }
            else
            {//test
                string openid1 = "o9_uZvx0hyenB1va7S-P8zkJCwbp";
                Session["openid"] = openid1;
            }
            if (!Global.isSessionTimeOut(Session["User"]))
            {
                return RedirectToAction("Index", "Base");
            }
            string liveOrUat = ConfigurationManager.AppSettings["liveOrUat"];
            ViewData["liveOrUat"] = liveOrUat;
            return View();
        }

        public ActionResult Index()
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            if (Global.isSessionTimeOut(Session["User"]))
            {
                //Session[GlobalDef.NEXT_PAGE] = GlobalDef.DEFAULT_PAGE;
                //this.TempData["idx"] = idx;
                //this.TempData["subIdx"] = subIdx;
                return RedirectToAction("Login", "Base");
            }
            string disableCFDUT = ConfigurationManager.AppSettings["disableCFDUT"];
            if (disableCFDUT == "true")
            {
                ViewData["optCFD"] = "";
                ViewData["optUT"] = "";
            }
            else
            {
                ViewData["optCFD"] = "<option value=\"2\">CFD</option><option value=\"4\">CFDDMA</option>";
                ViewData["optUT"] = "<option value=\"64\">UT</option>";
            }
            return View();
        }

        public ActionResult IndexChinese()
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            if (Global.isSessionTimeOut(Session["User"]))
            {
                //Session[GlobalDef.NEXT_PAGE] = GlobalDef.DEFAULT_PAGE;
                //this.TempData["idx"] = idx;
                //this.TempData["subIdx"] = subIdx;
                return RedirectToAction("Login", "Base");
            }
            string disableCFDUT = ConfigurationManager.AppSettings["disableCFDUT"];
            if (disableCFDUT == "true")
            {
                ViewData["optCFD"] = "";
                ViewData["optUT"] = "";
            }
            else
            {
                ViewData["optCFD"] = "<option value=\"2\">CFD</option><option value=\"4\">CFDDMA</option>";
                ViewData["optUT"] = "<option value=\"64\">UT</option>";
            }
            return View();
        }

        //public void init(string deviceId)
        //{
        //    new HttpClientRequest.setDeviceId(deviceId);
        //}

        public void SetLanguage(string language)
        {
            Session["language"] = language;
        }

        public ActionResult Presession()
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            //ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            //logger.Info("weOpenid=" + Session["openid"]);
            JObject json = new JObject();
            
            try
            {
                string deviceId = Session["openid"].ToString();
                //string language = LANGUAGE_VALUE;
                string language = Session["language"].ToString();
                string result = authMgr.getPresession(deviceId, language);

                STReturn ret = Global.chkJsonStats(result);
                json.Add("code", ret.retCode);
                json.Add("msg", ret.retMsg);

                if (int.Parse(ret.retCode) != (int)MsgCode.OPR_SUCC)
                {
                    //when retcode status not succ,directly return retcode and msg to frontend
                    return Content(json.ToString());
                }

                Presession presession = new Presession().parsePresession(result);
                json.Add("sessionID", presession.sessionID);
                json.Add("randomNo", presession.randomNo);
                json.Add("publicKey", presession.publicKey);

                Session["Presession"] = presession;

                return Content(json.ToString());
            }
            catch (WeChatException ex)
            {
                json.RemoveAll();
                json.Add("code", ex.WeChatErrorCode);
                json.Add("msg", ex.WeChatErrorMessage);
                return Content(json.ToString());
            }
            catch (Exception)
            {
                json.RemoveAll();
                json.Add("code", (int)MsgCode.SYSTEM_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SYSTEM_ERR]);
                return Content(json.ToString());
            }


        }

        public ActionResult Authenticate(string accountNo, string passwordE2ee)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            //Response.Expires = 0;
            //Response.CacheControl = "no-cache,no-store";
            //Response.AddHeader("Pragma", "No-Cache");
            JObject json = new JObject();

            Presession pression = null;
            if (Session["Presession"] != null)
                pression = (Presession)Session["Presession"];
            else
            {
                json.Add("code", (int)MsgCode.SESSION_EXPIRED_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SESSION_EXPIRED_ERR]);
                return Content(json.ToString());
            }

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info("Login: Acc=" + accountNo + "   PassE2EE=" + passwordE2ee);
           
            try
            {
                string deviceId = Session["openid"].ToString();
                string language = Session["language"].ToString();
                string result = authMgr.getAuth(deviceId, language, accountNo, passwordE2ee, pression.sessionID);

                STReturn ret = Global.chkJsonStats(result);
                if (int.Parse(ret.retCode) == (int)MsgCode.OPR_SUCC)
                {
                    UserInfo user = new UserInfo();
                    user.accountNo = accountNo;
                    user.encryptedPIN = passwordE2ee;
                    user.sessionID = pression.sessionID;
                    user.randomNo = pression.randomNo;
                    user.publicKey = pression.publicKey;


                    JObject authResult = JObject.Parse(result);
                    user.accountType = authResult["accountType"].ToString();

                    //Session.Abandon();
                    //Session["openid"] = deviceId;
                    //Session["language"] = language;
                    Session["User"] = user;

                    // add trade limit.2017-6-19
                    string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
                    if (tradeEnable != "1")
                    {
                        tradeEnable = "0";
                    }
                    JObject jsonAdd = JObject.Parse(result);
                    jsonAdd.Add("tradeEnable", tradeEnable);
                    result = jsonAdd.ToString();
                    {
                        string resultAccess = setMgr.getProductaccess(deviceId, user.accountNo, user.sessionID, language);
                    }

                    return Content(result);
                }
                else
                {
                    json.Add("code", ret.retCode);
                    json.Add("msg", ret.retMsg);
                    //json.Add("sessionID", pression.sessionID);//test
                    //json.Add("deviceId", deviceId);//test
                    return Content(json.ToString());
                }

            }
            catch (WeChatException ex)
            {
                json.RemoveAll();
                json.Add("code", ex.WeChatErrorCode);
                json.Add("msg", ex.WeChatErrorMessage);
                //json.Add("sessionID", "---");//test
                return Content(json.ToString());
            }
            catch (Exception)
            {
                json.RemoveAll();
                json.Add("code", (int)MsgCode.SYSTEM_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SYSTEM_ERR]);
                return Content(json.ToString());
            }
        }

        public string Twofa()
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = authMgr.getTwofa(deviceId, language, user.accountNo, user.sessionID);

                STReturn ret = Global.chkJsonStats(result);
                if (int.Parse(ret.retCode) == (int)MsgCode.OPR_SUCC)
                {
                    return result;
                }
                else
                {
                    json.Add("code", ret.retCode);
                    json.Add("msg", ret.retMsg);
                    return json.ToString();
                }

            }
            catch (WeChatException ex)
            {
                json.RemoveAll();
                json.Add("code", ex.WeChatErrorCode);
                json.Add("msg", ex.WeChatErrorMessage);
                return json.ToString();
            }
            catch (Exception)
            {
                json.RemoveAll();
                json.Add("code", (int)MsgCode.SYSTEM_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SYSTEM_ERR]);
                return json.ToString();
            }

        }

        public string TwofaAuth(string nafUserName, string twoFADeviceId, string spid, string type, string twoFAData, string challenge)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = authMgr.getTwofaAuth(deviceId, language, user.accountNo, user.sessionID, nafUserName, twoFADeviceId, spid, type, twoFAData, challenge);

                STReturn ret = Global.chkJsonStats(result);
                if (int.Parse(ret.retCode) == (int)MsgCode.OPR_SUCC)
                {
                    return result;
                }
                else
                {
                    json.Add("code", ret.retCode);
                    json.Add("msg", ret.retMsg);
                    return json.ToString();
                }

            }
            catch (WeChatException ex)
            {
                json.RemoveAll();
                json.Add("code", ex.WeChatErrorCode);
                json.Add("msg", ex.WeChatErrorMessage);
                return json.ToString();
            }
            catch (Exception)
            {
                json.RemoveAll();
                json.Add("code", (int)MsgCode.SYSTEM_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SYSTEM_ERR]);
                return json.ToString();
            }

        }

        public string SendSmsOtp(string nafUserName, string twoFADeviceId, string spid)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = authMgr.getSmsOtp(deviceId, language, user.accountNo, user.sessionID, nafUserName, twoFADeviceId, spid);

                STReturn ret = Global.chkJsonStats(result);
                if (int.Parse(ret.retCode) == (int)MsgCode.OPR_SUCC)
                {
                    return result;
                }
                else
                {
                    json.Add("code", ret.retCode);
                    json.Add("msg", ret.retMsg);
                    return json.ToString();
                }

            }
            catch (WeChatException ex)
            {
                json.RemoveAll();
                json.Add("code", ex.WeChatErrorCode);
                json.Add("msg", ex.WeChatErrorMessage);
                return json.ToString();
            }
            catch (Exception)
            {
                json.RemoveAll();
                json.Add("code", (int)MsgCode.SYSTEM_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SYSTEM_ERR]);
                return json.ToString();
            }
        }

        public ActionResult Logout()
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            JObject json = new JObject();
            
            try
            {
                string deviceId = Session["openid"].ToString();

                string language = Session["language"].ToString();
                CleanAll();
                string result = authMgr.invokLogout(deviceId, language);

                STReturn ret = Global.chkJsonStats(result);

                Session.Abandon();
                Response.Cookies.Add(new HttpCookie("ASP.NET_SessionId", "")); 
                if (int.Parse(ret.retCode) == (int)MsgCode.OPR_SUCC)
                {
                    return Content(result);
                }
                else
                {
 
                    json.Add("code", ret.retCode);
                    json.Add("msg", ret.retMsg);
                    return Content(json.ToString());
                }
            }
            catch (WeChatException ex)
            {
                json.RemoveAll();
                json.Add("code", ex.WeChatErrorCode);
                json.Add("msg", ex.WeChatErrorMessage);
                return Content(json.ToString());
            }
            catch (Exception ex2)
            {
                json.RemoveAll();
                json.Add("code", (int)MsgCode.SYSTEM_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SYSTEM_ERR]);
                return Content(json.ToString());
            }
        }

        public string SendAcknowledgeRAS(string acknowledge)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = authMgr.acknowledgeras(deviceId, language, user.accountNo, user.sessionID, acknowledge);

                STReturn ret = Global.chkJsonStats(result);
                if (int.Parse(ret.retCode) == (int)MsgCode.OPR_SUCC)
                {
                    return result;
                }
                else
                {
                    json.Add("code", ret.retCode);
                    json.Add("msg", ret.retMsg);
                    return json.ToString();
                }

            }
            catch (WeChatException ex)
            {
                json.RemoveAll();
                json.Add("code", ex.WeChatErrorCode);
                json.Add("msg", ex.WeChatErrorMessage);
                return json.ToString();
            }
            catch (Exception)
            {
                json.RemoveAll();
                json.Add("code", (int)MsgCode.SYSTEM_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SYSTEM_ERR]);
                return json.ToString();
            }
        }


        public void CleanAll()
        {
            Session.Clear();
        }
    }
}
