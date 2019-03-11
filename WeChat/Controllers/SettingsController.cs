using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WeChat.Infrastructure;
using WeChat.Models;
using WeChat.Models.VO;

namespace WeChat.Controllers
{
    public class SettingsController : Controller
    {
        //
        // GET: /Settings/
        SettingsMgr setMgr = new SettingsMgr();

        public ActionResult Index()
        {
            return View();
        }

        public string PmpSettings()
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
                string result = setMgr.getPmpSettings(deviceId, user.accountNo, user.sessionID, language);

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
                json.Add("code", (int)MsgCode.SESSION_EXPIRED_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SESSION_EXPIRED_ERR]);
                return json.ToString();
            }
        }

        public string PmpSettingsByWebSocket()
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
                string result = setMgr.getPmpSettingsByWebSocket(deviceId, user.accountNo, user.sessionID, language);

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
                json.Add("code", (int)MsgCode.SESSION_EXPIRED_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SESSION_EXPIRED_ERR]);
                return json.ToString();
            }
        }

        public string ProductAccess()
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
                string result = setMgr.getProductaccess(deviceId, user.accountNo, user.sessionID, language);

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
                json.Add("code", (int)MsgCode.SESSION_EXPIRED_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SESSION_EXPIRED_ERR]);
                return json.ToString();
            }
        }

        public string RetrieveClientSettings()
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
                string result = setMgr.getClientSettings(deviceId, user.accountNo, user.sessionID, language);

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
                json.Add("code", (int)MsgCode.SESSION_EXPIRED_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SESSION_EXPIRED_ERR]);
                return json.ToString();
            }
        }

        public string UpdateClientSettings(string encryptedPIN, string settingType, string settingValue)
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
                string result = setMgr.updateClientSettings(deviceId, user.accountNo, user.sessionID, language
                    , encryptedPIN, settingType, settingValue);

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
                json.Add("code", (int)MsgCode.SESSION_EXPIRED_ERR);
                json.Add("msg", ReturnMsg.msgList[(int)MsgCode.SESSION_EXPIRED_ERR]);
                return json.ToString();
            }
        }

    }
}
