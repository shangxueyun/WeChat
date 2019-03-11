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
    public class WatchlistController : Controller
    {
        //
        // GET: /Watchlist2/

        WatchlistMgr wltMgr = new WatchlistMgr();

        public ActionResult Index()
        {
            return View();
        }


        public string PreWatchlist()
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
                string result = wltMgr.getPreWatchlist(deviceId, language);

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

        public string Watchlist()
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
                string result = wltMgr.getWatchlist(deviceId, user.accountNo, user.sessionID, language);

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

        public string getWatchlistDetail(string watchlistId)
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
                string result = wltMgr.getWatchlistDetail(deviceId, user.accountNo, user.sessionID, language, watchlistId);

                STReturn ret = Global.chkJsonStats(result);
                if (int.Parse(ret.retCode) == (int)MsgCode.OPR_SUCC)
                {
                    string disableCFDUT = ConfigurationManager.AppSettings["disableCFDUT"];
                    if (disableCFDUT == "true")
                    {//filter UT,CFD,CFDDMA
                        JObject jsonFilter = new JObject();
                        jsonFilter = JObject.Parse(result);
                        if (jsonFilter["counters"] != null)
                        {
                            JArray arrNew = new JArray();
                            int countFilter = 0;
                            JArray arrFilter = (JArray)jsonFilter["counters"];
                            foreach (JObject item in arrFilter)
                            {
                                string product = item["product"].ToString();
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
                                jsonFilter["counters"] = arrNew;
                                result = jsonFilter.ToString();
                            }
                        }
                    }//filter UT,CFD,CFDDMA
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

        public string removeCounter(string watchlistId, string counterIDsString)
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
                string result = wltMgr.invokeRemoveCounter(deviceId, user.accountNo, user.sessionID, language, watchlistId, counterIDsString);

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

        public string addCounter(string watchlistId, string counterId, string symbol)
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
                string result = wltMgr.invokeAddCounter(deviceId, user.accountNo, user.sessionID, language, watchlistId, counterId, symbol);

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
