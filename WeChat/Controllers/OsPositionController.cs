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
    public class OsPositionController : Controller
    {
        //
        // GET: /OsPosition/
        OsPositionMgr osPositionMgr = new OsPositionMgr();

        public ActionResult Index()
        {
            return View();
        }

        public string OsPosition()
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
                string result = osPositionMgr.getOsPosition(deviceId, user.accountNo, user.sessionID, language);

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

        public string OsPositionStockDetailContract(string accountType, string id)
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
                string result = osPositionMgr.getOsPositionStockDetailContract(deviceId, user.accountNo, user.sessionID, language, accountType, id);

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

        public string OsPositionStockDetailContra(string accountType, string id)
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
                string result = osPositionMgr.getOsPositionStockDetailContra(deviceId, user.accountNo, user.sessionID, language, accountType, id);

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

        public string OsPositionUtDetailFromyou(string accountType, string id)
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
                string result = osPositionMgr.getOsPositionUtDetailFromyou(deviceId, user.accountNo, user.sessionID, language, id);

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

        public string OsPositionUtDetailToyou(string accountType, string id)
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
                string result = osPositionMgr.getOsPositionUtDetailToyou(deviceId, user.accountNo, user.sessionID, language, id);

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
