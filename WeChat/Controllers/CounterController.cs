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
    public class CounterController : Controller
    {
        //
        // GET: /Counter2/
        CounterMgr counterMgr = new CounterMgr();

        public ActionResult Index()
        {
            return View();
        }

        public string SearchCounter(string productFlag, string module, string market, string Exchange, string keyword, string count)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            JObject json = new JObject();
            try
            {
                string disableCFDUT = ConfigurationManager.AppSettings["disableCFDUT"];
                if (disableCFDUT == "true")
                {//filter UT,CFD,CFDDMA
                    int iFlag = int.Parse(productFlag);
                    iFlag &= 57;
                    productFlag = iFlag.ToString();
                }//filter UT,CFD,CFDDMA
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = counterMgr.getSearchCounter(deviceId, user.accountNo, user.sessionID, language
                    ,productFlag, module, market, Exchange, keyword, count);

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

        public string CounterInfo(string priceMode, string counterID)
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
                string result = counterMgr.getCounterInfo(deviceId, user.accountNo, user.sessionID, language, priceMode, counterID);

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

        public string CounterPrices(string size, string counterIDs)
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
                string result = counterMgr.getCounterPrices(deviceId, user.accountNo, user.sessionID, language, size, counterIDs);

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

        public string ContractDetails(string product, string counterIDs, string price)
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
                string result = counterMgr.getContractDetails(deviceId, user.accountNo, user.sessionID, language, product, counterIDs, price);

                STReturn ret = Global.chkJsonStats2(result);
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

        public string UTGeneralInfo(string counterID)
        {
            return GetUTInfo(counterID, Commons.COUNTER_UT_GENERALINFO);
        }

        public string UTDocuments(string counterID)
        {
            return GetUTInfo(counterID, Commons.COUNTER_UT_DOCUMENTS);
        }
        public string UTManagerInfo(string counterID)
        {
            return GetUTInfo(counterID, Commons.COUNTER_UT_MANAGERINFO);
        }
        public string UTPerformance(string counterID)
        {
            return GetUTInfo(counterID, Commons.COUNTER_UT_PERFORMANCE);
        }
        public string UTRsp(string counterID)
        {
            return GetUTInfo(counterID, Commons.COUNTER_UT_RSP);
        }

        private string GetUTInfo(string counterID, string url)
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
                string result = counterMgr.getUTInfo(deviceId, user.accountNo, user.sessionID, language, counterID, url);

                STReturn ret = Global.chkJsonStats2(result);
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
