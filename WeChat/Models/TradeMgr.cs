using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using WeChat.Infrastructure;

namespace WeChat.Models
{
    public class TradeMgr
    {
        public string getStockTradeInfo(string deviceId, string accountNo, string sessionID, string language, string counterId)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string param = "&counterID=" + counterId;
            string result = hcr.getRequest(Commons.TRADE_STOCK_INFO_PATH, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getStocksOrderTypeSettings(string deviceId, string accountNo, string sessionID, string language)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string result = hcr.getRequest(Commons.TRADE_STOCK_TYPE_SETTINGS_PATH, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getStocksRefreshLimitBalance(string deviceId, string accountNo, string sessionID, string language)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string result = hcr.getRequest(Commons.TRADE_STOCK_LIMITBALANCE_PATH, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getStocksValidateOrder(string deviceId, string accountNo, string sessionID, string language
            , string password, string counterId, string action, string orderType, string limitPrice, string triggerPrice, string quantity
            , string settlementCurrency, string payment, string triggerPriceType, string validity, string gtd)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("encryptedPIN", password));

            hcr.forms.Clear();
            hcr.forms.Add(new KeyValuePair<string, string>("counterID", counterId));
            hcr.forms.Add(new KeyValuePair<string, string>("action", action));
            hcr.forms.Add(new KeyValuePair<string, string>("orderType", orderType));
            hcr.forms.Add(new KeyValuePair<string, string>("limitPrice", limitPrice));
            hcr.forms.Add(new KeyValuePair<string, string>("triggerPrice", triggerPrice));
            hcr.forms.Add(new KeyValuePair<string, string>("quantity", quantity));
            hcr.forms.Add(new KeyValuePair<string, string>("settlementCurrency", settlementCurrency));
            hcr.forms.Add(new KeyValuePair<string, string>("payment", payment));
            hcr.forms.Add(new KeyValuePair<string, string>("triggerPriceType", triggerPriceType));
            hcr.forms.Add(new KeyValuePair<string, string>("validity", validity));
            hcr.forms.Add(new KeyValuePair<string, string>("gtd", ""));
            //hcr.forms.Add(new KeyValuePair<string, string>("validity", validity));
            //hcr.forms.Add(new KeyValuePair<string, string>("gtd", gtd));

            string result = hcr.postRequest(Commons.TRADE_STOCK_VALIDATE_PATH, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getStocksSubmitOrder(string deviceId, string accountNo, string sessionID, string language
            , string authToken, string counterId, string action, string orderType, string limitPrice, string stopPrice, string quantity
            , string settlementCurrency, string payment, string triggerPriceType, string validity, string gtd)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("authToken", authToken));

            hcr.forms.Clear();
            hcr.forms.Add(new KeyValuePair<string, string>("counterID", counterId));
            hcr.forms.Add(new KeyValuePair<string, string>("action", action));
            hcr.forms.Add(new KeyValuePair<string, string>("orderType", orderType));
            hcr.forms.Add(new KeyValuePair<string, string>("limitPrice", limitPrice));
            hcr.forms.Add(new KeyValuePair<string, string>("triggerPrice", stopPrice));
            hcr.forms.Add(new KeyValuePair<string, string>("quantity", quantity));
            hcr.forms.Add(new KeyValuePair<string, string>("settlementCurrency", settlementCurrency));
            hcr.forms.Add(new KeyValuePair<string, string>("payment", payment));
            hcr.forms.Add(new KeyValuePair<string, string>("triggerPriceType", triggerPriceType));
            hcr.forms.Add(new KeyValuePair<string, string>("validity", validity));
            hcr.forms.Add(new KeyValuePair<string, string>("gtd", gtd));

            string result = hcr.postRequest(Commons.TRADE_STOCK_SUBMIT_PATH, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getCfdTradeInfo(string deviceId, string accountNo, string sessionID, string language, string counterId)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string param = "&counterID=" + counterId;
            string result = hcr.getRequest(Commons.TRADE_CFD_INFO_PATH, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getCfdRefreshLimitBalance(string deviceId, string accountNo, string sessionID, string language)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string result = hcr.getRequest(Commons.TRADE_CFD_LIMITBALANCE_PATH, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getCfdLimitOrder(string deviceId, string accountNo, string sessionID, string counterId, string language)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string param = "&counterID=" + counterId;
            string result = hcr.getRequest(Commons.TRADE_CFD_LIMITORDER_PATH, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getCFDValidateOrder(string deviceId, string accountNo, string sessionID, string language
            , string encryptedPIN, string counterId, string orderType, string action, string timeInForce, string expireTime, string limitPrice, string quantity
            , string ifDoneLimitOrderNo, string ocoStopLimitPrice, string ocoStopLimitQuantity, string stopPrice, string trailingStep
            , string limitSpread, string triggerPriceType, string conditionOperator, string conditionCompanyCode, string conditionPrice)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("encryptedPIN", encryptedPIN));

            hcr.forms.Clear();
            hcr.forms.Add(new KeyValuePair<string, string>("counterID", counterId));
            hcr.forms.Add(new KeyValuePair<string, string>("orderType", orderType));
            hcr.forms.Add(new KeyValuePair<string, string>("action", action));
            hcr.forms.Add(new KeyValuePair<string, string>("timeInForce", timeInForce));
            hcr.forms.Add(new KeyValuePair<string, string>("expireTime", expireTime));
            hcr.forms.Add(new KeyValuePair<string, string>("limitPrice", limitPrice));
            hcr.forms.Add(new KeyValuePair<string, string>("quantity", quantity));
            hcr.forms.Add(new KeyValuePair<string, string>("ifDoneLimitOrderNo", ifDoneLimitOrderNo));
            hcr.forms.Add(new KeyValuePair<string, string>("ocoStopLimitPrice", ocoStopLimitPrice));
            hcr.forms.Add(new KeyValuePair<string, string>("ocoStopLimitQuantity", ocoStopLimitQuantity));
            hcr.forms.Add(new KeyValuePair<string, string>("stopPrice", stopPrice));
            hcr.forms.Add(new KeyValuePair<string, string>("trailingStep", trailingStep));
            hcr.forms.Add(new KeyValuePair<string, string>("limitSpread", limitSpread));
            hcr.forms.Add(new KeyValuePair<string, string>("triggerPriceType", triggerPriceType));
            hcr.forms.Add(new KeyValuePair<string, string>("conditionOperator", conditionOperator));
            hcr.forms.Add(new KeyValuePair<string, string>("conditionCompanyCode", conditionCompanyCode));
            hcr.forms.Add(new KeyValuePair<string, string>("conditionPrice", conditionPrice));

            string result = hcr.postRequest(Commons.TRADE_CFD_VALIDATE_PATH, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getCfdSubmitOrder(string deviceId, string accountNo, string sessionID, string language
            , string authToken, string counterId, string orderType, string action, string timeInForce, string expireTime, string limitPrice, string quantity
            , string ifDoneLimitOrderNo, string ocoStopLimitPrice, string ocoStopLimitQuantity, string stopPrice, string trailingStep
            , string limitSpread, string triggerPriceType, string conditionOperator, string conditionCompanyCode, string conditionPrice)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("authToken", authToken));

            hcr.forms.Clear();
            hcr.forms.Add(new KeyValuePair<string, string>("counterID", counterId));
            hcr.forms.Add(new KeyValuePair<string, string>("orderType", orderType));
            hcr.forms.Add(new KeyValuePair<string, string>("action", action));
            hcr.forms.Add(new KeyValuePair<string, string>("timeInForce", timeInForce));
            hcr.forms.Add(new KeyValuePair<string, string>("expireTime", expireTime));
            hcr.forms.Add(new KeyValuePair<string, string>("limitPrice", limitPrice));
            hcr.forms.Add(new KeyValuePair<string, string>("quantity", quantity));
            hcr.forms.Add(new KeyValuePair<string, string>("ifDoneLimitOrderNo", ifDoneLimitOrderNo));
            hcr.forms.Add(new KeyValuePair<string, string>("ocoStopLimitPrice", ocoStopLimitPrice));
            hcr.forms.Add(new KeyValuePair<string, string>("ocoStopLimitQuantity", ocoStopLimitQuantity));
            hcr.forms.Add(new KeyValuePair<string, string>("stopPrice", stopPrice));
            hcr.forms.Add(new KeyValuePair<string, string>("trailingStep", trailingStep));
            hcr.forms.Add(new KeyValuePair<string, string>("limitSpread", limitSpread));
            hcr.forms.Add(new KeyValuePair<string, string>("triggerPriceType", triggerPriceType));
            hcr.forms.Add(new KeyValuePair<string, string>("conditionOperator", conditionOperator));
            hcr.forms.Add(new KeyValuePair<string, string>("conditionCompanyCode", conditionCompanyCode));
            hcr.forms.Add(new KeyValuePair<string, string>("conditionPrice", conditionPrice));

            string result = hcr.postRequest(Commons.TRADE_CFD_SUBMIT_PATH, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getUtTradeInfo(string deviceId, string accountNo, string sessionID, string language, string counterId)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string param = "&counterID=" + counterId;
            string result = hcr.getRequest(Commons.TRADE_UT_INFO_PATH, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getUtValidateOrder(string deviceId, string accountNo, string sessionID, string language
            , string counterId, string action, string fundSource, string paymentCurrency, string invAmount, string unit
            , string switchInID)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            hcr.forms.Clear();
            hcr.forms.Add(new KeyValuePair<string, string>("counterID", counterId));
            hcr.forms.Add(new KeyValuePair<string, string>("action", action));
            hcr.forms.Add(new KeyValuePair<string, string>("fundSource", fundSource));
            hcr.forms.Add(new KeyValuePair<string, string>("paymentCurrency", paymentCurrency));
            hcr.forms.Add(new KeyValuePair<string, string>("invAmount", invAmount));
            hcr.forms.Add(new KeyValuePair<string, string>("unit", unit));
            hcr.forms.Add(new KeyValuePair<string, string>("switchInID", switchInID));

            string result = hcr.postRequest(Commons.TRADE_UT_VALIDATE_PATH, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getUtSubmitOrder(string deviceId, string accountNo, string sessionID, string language, string encryptedPIN
            , string counterId, string action, string fundSource, string paymentCurrency, string invAmount, string unit
            , string switchInID, string emailNotification, string declaration, string termCondition)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("encryptedPIN", encryptedPIN));

            hcr.forms.Clear();
            hcr.forms.Add(new KeyValuePair<string, string>("counterID", counterId));
            hcr.forms.Add(new KeyValuePair<string, string>("action", action));
            hcr.forms.Add(new KeyValuePair<string, string>("fundSource", fundSource));
            hcr.forms.Add(new KeyValuePair<string, string>("paymentCurrency", paymentCurrency));
            hcr.forms.Add(new KeyValuePair<string, string>("invAmount", invAmount));
            hcr.forms.Add(new KeyValuePair<string, string>("unit", unit));
            hcr.forms.Add(new KeyValuePair<string, string>("switchInID", switchInID));
            hcr.forms.Add(new KeyValuePair<string, string>("emailNotification", emailNotification));
            hcr.forms.Add(new KeyValuePair<string, string>("declaration", declaration));
            hcr.forms.Add(new KeyValuePair<string, string>("termCondition", termCondition));

            string result = hcr.postRequest(Commons.TRADE_UT_SUBMIT_PATH, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getUtSwitchInCounter(string deviceId, string accountNo, string sessionID, string language, string keyword, string fundSource)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string param = "&keyword=" + keyword + "&fundSource=" + fundSource;
            string result = hcr.getRequest(Commons.TRADE_UT_SWITCH_IN_COUNTER_PATH, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getFtFxFxmnTradeInfo(string deviceId, string accountNo, string sessionID, string language, string counterId)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string param = "&counterID=" + counterId;
            string product = "";
            string prefix = counterId.Substring(0, 5);
            if (prefix.Contains("FXMN/"))
            {
                product = "FXMN";
            }
            else if (prefix.Contains("FX/"))
            {
                product = "FX";
            }
            else if (prefix.Contains("FT/"))
            {
                product = "FT";
            }

            string path = string.Format(Commons.TRADE_FT_FX_FXMN_INFO_PATH, product);
            string result = hcr.getRequest(path, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getFtFxFxmnValidateOrder(string deviceId, string accountNo, string sessionID, string language, string product
            , string encryptedPIN, string action, string orderType, string symbol, string exchange
            , string expiry, string qty, string price, string stopLimitPrice, string ocoPrice)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("encryptedPIN", encryptedPIN));

            hcr.forms.Clear();
            hcr.forms.Add(new KeyValuePair<string, string>("action", action));
            hcr.forms.Add(new KeyValuePair<string, string>("orderType", orderType));
            hcr.forms.Add(new KeyValuePair<string, string>("symbol", symbol));
            hcr.forms.Add(new KeyValuePair<string, string>("exchange", exchange));
            hcr.forms.Add(new KeyValuePair<string, string>("expiry", expiry));
            hcr.forms.Add(new KeyValuePair<string, string>("qty", qty));
            hcr.forms.Add(new KeyValuePair<string, string>("price", price));
            hcr.forms.Add(new KeyValuePair<string, string>("stopLimitPrice", stopLimitPrice));
            hcr.forms.Add(new KeyValuePair<string, string>("ocoPrice", ocoPrice));

            string path = string.Format(Commons.TRADE_FT_FX_FXMN_VALIDATE_PATH, product);
            string result = hcr.postRequest(path, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getFtFxFxmnSubmitOrder(string deviceId, string accountNo, string sessionID, string language, string product
            , string encryptedPIN, string authToken, string symbol, string exchange, string action, string orderType
            , string price, string qty, string expiry, string stopLimitPrice, string ocoType, string ocoPrice)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("encryptedPIN", encryptedPIN));
            hcr.headers.Add(new KeyValuePair<string, string>("authToken", authToken));

            hcr.forms.Clear();
            hcr.forms.Add(new KeyValuePair<string, string>("symbol", symbol));
            hcr.forms.Add(new KeyValuePair<string, string>("exchange", exchange));
            hcr.forms.Add(new KeyValuePair<string, string>("action", action));
            hcr.forms.Add(new KeyValuePair<string, string>("orderType", orderType));
            hcr.forms.Add(new KeyValuePair<string, string>("price", price));
            hcr.forms.Add(new KeyValuePair<string, string>("qty", qty));
            hcr.forms.Add(new KeyValuePair<string, string>("expiry", expiry));
            hcr.forms.Add(new KeyValuePair<string, string>("stopLimitPrice", stopLimitPrice));
            hcr.forms.Add(new KeyValuePair<string, string>("ocoType", ocoType));
            hcr.forms.Add(new KeyValuePair<string, string>("ocoPrice", ocoPrice));

            string path = string.Format(Commons.TRADE_FT_FX_FXMN_SUBMIT_PATH, product);
            string result = hcr.postRequest(path, hcr.headers, hcr.forms,language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

    }
}