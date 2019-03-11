using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WeChat.Infrastructure;
using WeChat.Models;
using WeChat.Models.VO;

namespace WeChat.Controllers
{
    public class PortfolioController : Controller
    {
        //
        // GET: /Portfolio/

        PortfolioMgr portMgr = new PortfolioMgr();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AllBalanceList()
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            JObject json = new JObject();

            if (Global.isSessionTimeOut(Session["User"]))
            {
                //Session[GlobalDef.NEXT_PAGE] = GlobalDef.DEFAULT_PAGE;
                //this.TempData["idx"] = idx;
                //this.TempData["subIdx"] = subIdx;
                return RedirectToAction("Login", "Base");
            }

            try
            {
                UserInfo user  = (UserInfo)Session["User"];
                string deviceId = Session["openid"].ToString();

                string language = Session["language"].ToString();
                string result = portMgr.getAllBalanceList(deviceId,user.accountNo, user.sessionID, language);

                STReturn ret = Global.chkJsonStats(result);
                if (int.Parse(ret.retCode) == (int)MsgCode.OPR_SUCC)
                {
                    string disableCFDUT = ConfigurationManager.AppSettings["disableCFDUT"];
                    if (disableCFDUT == "true")
                    {//filter UT,CFD,CFDDMA
                        JObject jsonFilter = new JObject();
                        jsonFilter = JObject.Parse(result);
                        if (jsonFilter["balanceInfo"] != null)
                        {
                            JArray arrNew = new JArray();
                            int countFilter = 0;
                            JArray arrFilter = (JArray)jsonFilter["balanceInfo"];
                            foreach (JObject item in arrFilter)
                            {
                                string product = item["type"].ToString();
                                if (product.Equals("UT", StringComparison.OrdinalIgnoreCase) || product.Equals("CFD", StringComparison.OrdinalIgnoreCase) || product.Equals("CFDDMA", StringComparison.OrdinalIgnoreCase))
                                {
                                    //arrFilter.remove(item);
                                    countFilter++;
                                }
                                else
                                    arrNew.Add(item);
                            }
                            if (countFilter > 0)
                            {
                                jsonFilter["balanceInfo"] = arrNew;
                                result = jsonFilter.ToString();
                            }
                        }
                    }//filter UT,CFD,CFDDMA
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
            catch (Exception)
            {
                json.RemoveAll();
                json.Add("code", (int)MsgCode.SESSION_EXPIRED_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SESSION_EXPIRED_ERR]);
                return Content(json.ToString());
            }
        }

        public ActionResult STKAccountDetails()
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            JObject json = new JObject();

            if (Global.isSessionTimeOut(Session["User"]))
            {
                return RedirectToAction("Login", "Base");
            }

            try
            {
                UserInfo user = (UserInfo)Session["User"];
                string deviceId = Session["openid"].ToString();

                string language = Session["language"].ToString();
                string result = portMgr.getSTKAccountDetails(deviceId,user.accountNo, user.sessionID, language, user.accountType);

                STReturn ret = Global.chkJsonStats(result);
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
            catch (Exception)
            {
                json.RemoveAll();
                json.Add("code", (int)MsgCode.SESSION_EXPIRED_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SESSION_EXPIRED_ERR]);
                return Content(json.ToString());
            }
        }

        public ActionResult CFDAccountDetails()
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            JObject json = new JObject();

            if (Global.isSessionTimeOut(Session["User"]))
            {
                return RedirectToAction("Login", "Base");
            }

            try
            {
                UserInfo user = (UserInfo)Session["User"];
                string deviceId = Session["openid"].ToString();

                string language = Session["language"].ToString();
                string result = portMgr.getCFDAccountDetails(deviceId,user.accountNo, user.sessionID, language);

                STReturn ret = Global.chkJsonStats(result);
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
            catch (Exception)
            {
                json.RemoveAll();
                json.Add("code", (int)MsgCode.SESSION_EXPIRED_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SESSION_EXPIRED_ERR]);
                return Content(json.ToString());
            }
        }

        public ActionResult UTAccountDetails()
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            JObject json = new JObject();

            if (Global.isSessionTimeOut(Session["User"]))
            {
                return RedirectToAction("Login", "Base");
            }

            try
            {
                UserInfo user = (UserInfo)Session["User"];
                string deviceId = Session["openid"].ToString();

                string language = Session["language"].ToString();
                string result = portMgr.getUTAccountDetails(deviceId,user.accountNo, user.sessionID, language);

                STReturn ret = Global.chkJsonStats(result);
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
            catch (Exception)
            {
                json.RemoveAll();
                json.Add("code", (int)MsgCode.SESSION_EXPIRED_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SESSION_EXPIRED_ERR]);
                return Content(json.ToString());
            }
        }

        /// <summary>
        /// Holdings Details data get from list.
        /// Unrealized Profit Loss
        /// </summary>
        /// <returns></returns>
        public ActionResult StocksHoldings()
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            JObject json = new JObject();

            if (Global.isSessionTimeOut(Session["User"]))
            {
                return RedirectToAction("Login", "Base");
            }

            try
            {
                UserInfo user = (UserInfo)Session["User"];
                string deviceId = Session["openid"].ToString();

                string language = Session["language"].ToString();
                string result = portMgr.getStocksHoldings(deviceId,user.accountNo, user.sessionID, language, user.accountType);

                STReturn ret = Global.chkJsonStats(result);
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
            catch (Exception)
            {
                json.RemoveAll();
                json.Add("code", (int)MsgCode.SESSION_EXPIRED_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SESSION_EXPIRED_ERR]);
                return Content(json.ToString());
            }
        }


        public ActionResult CFDPositionsList()
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            JObject json = new JObject();

            if (Global.isSessionTimeOut(Session["User"]))
            {
                return RedirectToAction("Login", "Base");
            }

            try
            {
                UserInfo user = (UserInfo)Session["User"];
                string deviceId = Session["openid"].ToString();

                string language = Session["language"].ToString();
                string result = portMgr.getCFDPositionList(deviceId,user.accountNo, user.sessionID, language);

                STReturn ret = Global.chkJsonStats(result);
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
            catch (Exception)
            {
                json.RemoveAll();
                json.Add("code", (int)MsgCode.SESSION_EXPIRED_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SESSION_EXPIRED_ERR]);
                return Content(json.ToString());
            }
        }

        public ActionResult UTHoldings()
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            JObject json = new JObject();

            if (Global.isSessionTimeOut(Session["User"]))
            {
                return RedirectToAction("Login", "Base");
            }

            try
            {
                UserInfo user = (UserInfo)Session["User"];
                string deviceId = Session["openid"].ToString();

                string language = Session["language"].ToString();
                string result = portMgr.getUTHoldings(deviceId,user.accountNo, user.sessionID, language);

                STReturn ret = Global.chkJsonStats(result);
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
            catch (Exception)
            {
                json.RemoveAll();
                json.Add("code", (int)MsgCode.SESSION_EXPIRED_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SESSION_EXPIRED_ERR]);
                return Content(json.ToString());
            }
        }

        public ActionResult Disclaimer(string product,string disclaimerType)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            JObject json = new JObject();

            if (Global.isSessionTimeOut(Session["User"]))
            {
                return RedirectToAction("Login", "Base");
            }

            try
            {
                UserInfo user = (UserInfo)Session["User"];
                string deviceId = Session["openid"].ToString();

                string language = Session["language"].ToString();
                string result = portMgr.getGlobalDisclaimer(deviceId,user.accountNo, user.sessionID, language, product,disclaimerType);

                STReturn ret = Global.chkJsonStats(result);
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
            catch (Exception)
            {
                json.RemoveAll();
                json.Add("code", (int)MsgCode.SESSION_EXPIRED_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SESSION_EXPIRED_ERR]);
                return Content(json.ToString());
            }
        }


    }
}
