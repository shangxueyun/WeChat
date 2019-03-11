using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WeChat.Infrastructure;
using WeChat.Models;
using WeChat.Models.VO;
using System.Configuration;

namespace WeChat.Controllers
{
    public class TradeController : Controller
    {
        //
        // GET: /Trade/
        TradeMgr tradeMgr = new TradeMgr();

        public ActionResult Index()
        {
            return View();
        }

        public string StockTradeInfo(string counterId)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if(tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getStockTradeInfo(deviceId, user.accountNo, user.sessionID, language, counterId);

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

        public string StocksOrderTypeSettings()
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if (tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getStocksOrderTypeSettings(deviceId, user.accountNo, user.sessionID, language);

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

        public string StocksRefreshLimitBalance()
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if (tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getStocksRefreshLimitBalance(deviceId, user.accountNo, user.sessionID, language);

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

        public string StocksValidateOrder(string passwordE2ee, string counterId, string action1, string orderType, string limitPrice, string triggerPrice, string quantity
            , string settlementCurrency, string payment, string triggerPriceType, string validity, string gtd)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if (tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getStocksValidateOrder(deviceId, user.accountNo, user.sessionID, language
                    , user.encryptedPIN, counterId, action1, orderType, limitPrice, triggerPrice, quantity
                    , settlementCurrency, payment, triggerPriceType, validity, gtd);

                STReturn ret = Global.chkJsonStats(result);
                if (int.Parse(ret.retCode) != (int)MsgCode.PARSE_JSON_ERROR)
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

        public string StocksSubmitOrder(string authToken, string counterId, string action1, string orderType, string limitPrice, string triggerPrice, string quantity
            , string settlementCurrency, string payment, string triggerPriceType, string validity, string gtd)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if (tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getStocksSubmitOrder(deviceId, user.accountNo, user.sessionID, language
                    , authToken, counterId, action1, orderType, limitPrice, triggerPrice, quantity
                    , settlementCurrency, payment, triggerPriceType, validity, gtd);

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

        public string CfdTradeInfo(string counterId)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if (tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getCfdTradeInfo(deviceId, user.accountNo, user.sessionID, language, counterId);

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

        public string CfdRefreshLimitBalance()
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if (tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getCfdRefreshLimitBalance(deviceId, user.accountNo, user.sessionID, language);

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

        public string CfdLimitOrder(string counterId)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if (tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getCfdLimitOrder(deviceId, user.accountNo, user.sessionID, counterId, language);

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

        public string CFDValidateOrder(string encryptedPIN, string counterId, string orderType, string action1, string timeInForce, string expireTime, string limitPrice, string quantity
            , string ifDoneLimitOrderNo, string ocoStopLimitPrice, string ocoStopLimitQuantity, string stopPrice, string trailingStep
            , string limitSpread, string triggerPriceType, string conditionOperator, string conditionCompanyCode, string conditionPrice)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if (tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getCFDValidateOrder(deviceId, user.accountNo, user.sessionID, language, encryptedPIN, counterId
                    , orderType, action1, timeInForce, expireTime, limitPrice, quantity
                    , ifDoneLimitOrderNo, ocoStopLimitPrice, ocoStopLimitQuantity, stopPrice, trailingStep
                    , limitSpread, triggerPriceType, conditionOperator, conditionCompanyCode, conditionPrice);

                STReturn ret = Global.chkJsonStats(result);
                if (int.Parse(ret.retCode) != (int)MsgCode.PARSE_JSON_ERROR)
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


        public string CfdSubmitOrder(string authToken, string counterId, string orderType, string action1, string timeInForce, string expireTime, string limitPrice, string quantity
            , string ifDoneLimitOrderNo, string ocoStopLimitPrice, string ocoStopLimitQuantity, string stopPrice, string trailingStep
            , string limitSpread, string triggerPriceType, string conditionOperator, string conditionCompanyCode, string conditionPrice)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if (tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getCfdSubmitOrder(deviceId, user.accountNo, user.sessionID, language, authToken, counterId
                    , orderType, action1, timeInForce, expireTime, limitPrice, quantity
                    , ifDoneLimitOrderNo, ocoStopLimitPrice, ocoStopLimitQuantity, stopPrice, trailingStep
                    , limitSpread, triggerPriceType, conditionOperator, conditionCompanyCode, conditionPrice);

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

        public string UtTradeInfo(string counterId)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if (tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getUtTradeInfo(deviceId, user.accountNo, user.sessionID, language, counterId);

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

        public string UtValidateOrder(string counterId, string action1, string fundSource, string paymentCurrency, string invAmount, string unit
            , string switchInID)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if (tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getUtValidateOrder(deviceId, user.accountNo, user.sessionID, language, counterId, action1
                    , fundSource, paymentCurrency, invAmount,unit, switchInID);

                STReturn ret = Global.chkJsonStats(result);
                if (int.Parse(ret.retCode) != (int)MsgCode.PARSE_JSON_ERROR)
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

        public string UtSubmitOrder(string encryptedPIN, string counterId, string action1, string fundSource
            , string paymentCurrency, string invAmount, string unit, string switchInID, string emailNotification
            , string declaration, string termCondition)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if (tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getUtSubmitOrder(deviceId, user.accountNo, user.sessionID, language, encryptedPIN, counterId, action1
                    , fundSource, paymentCurrency, invAmount, unit, switchInID, emailNotification, declaration, termCondition);

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

        public string UtSwitchInCounter(string keyword, string fundSource)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if (tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getUtSwitchInCounter(deviceId, user.accountNo, user.sessionID, language, keyword, fundSource);

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

        public string FtFxFxmnTradeInfo(string counterId)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if (tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getFtFxFxmnTradeInfo(deviceId, user.accountNo, user.sessionID, language, counterId);

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

        public string FtFxFxmnValidateOrder(string product, string encryptedPIN, string action1, string orderType, string symbol, string exchange
            , string expiry, string qty, string price, string stopLimitPrice, string ocoPrice)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if (tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getFtFxFxmnValidateOrder(deviceId, user.accountNo, user.sessionID, language, product, encryptedPIN
                    , action1, orderType, symbol, exchange, expiry, qty, price, stopLimitPrice, ocoPrice);

                STReturn ret = Global.chkJsonStats(result);
                if (int.Parse(ret.retCode) != (int)MsgCode.PARSE_JSON_ERROR)
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

        public string FtFxFxmnSubmitOrder(string product, string encryptedPIN, string authToken, string symbol, string exchange, string action1, string orderType
            , string price, string qty, string expiry, string stopLimitPrice, string ocoType, string ocoPrice)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.CacheControl = "no-cache";
            string tradeEnable = ConfigurationManager.AppSettings["tradeEnable"];
            if (tradeEnable != "1")
            {
                return "{\"msg\":\"Sorry,you don't have permission to trade.\",\"code\":-1}";
            }

            JObject json = new JObject();
            try
            {
                string deviceId = Session["openid"].ToString();
                UserInfo user = (UserInfo)Session["User"];

                string language = Session["language"].ToString();
                string result = tradeMgr.getFtFxFxmnSubmitOrder(deviceId, user.accountNo, user.sessionID, language
                    , product, encryptedPIN, authToken, symbol, exchange, action1, orderType
                    , price, qty, expiry, stopLimitPrice, ocoType, ocoPrice);

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
