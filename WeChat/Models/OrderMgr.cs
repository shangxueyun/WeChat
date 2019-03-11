using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using WeChat.Infrastructure;

namespace WeChat.Models
{
    public class OrderMgr
    {
        public string getTodayOrder(string deviceId, string accountNo, string sessionID, string language)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string result = hcr.getRequest(Commons.ORDER_TODAY_PATH, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getPastOrder(string deviceId, string accountNo, string sessionID, string language, string pastOrderDate)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string path = Commons.ORDER_PAST_PATH.Replace("?", pastOrderDate);
            string result = hcr.getRequest(path, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getOrderDates(string deviceId, string accountNo, string sessionID, string language)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string result = hcr.getRequest(Commons.ORDER_DATES_PATH, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getStockOrderDetail(string deviceId, string accountNo, string sessionID, string language, string orderNo, string counterId, bool isToday)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string path = Commons.ORDER_STOCK_DETAIL_PATH.Replace("?", orderNo);
            string param = "&counterID=" + counterId + "&isToday=" + isToday;
            string result = hcr.getRequest(path, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getStockWithdrawOrder(string deviceId, string accountNo, string sessionID, string language, string orderNo, string counterId, string passwordE2ee)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("encryptedPIN", passwordE2ee));

            hcr.forms.Clear();
            hcr.forms.Add(new KeyValuePair<string, string>("counterID", counterId));

            string path = Commons.ORDER_STOCK_WITHDRAW_PATH.Replace("?", orderNo);
            string result = hcr.postRequest(path, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getStockAmendOrder(string deviceId, string accountNo, string sessionID, string language, string orderNo, string counterId, string amendQty, string passwordE2ee)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("encryptedPIN", passwordE2ee));

            hcr.forms.Clear();
            hcr.forms.Add(new KeyValuePair<string, string>("counterID", counterId));
            hcr.forms.Add(new KeyValuePair<string, string>("amendQty", amendQty));

            string path = Commons.ORDER_STOCK_AMEND_PATH.Replace("?", orderNo);
            string result = hcr.postRequest(path, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getCfdOrderDetail(string deviceId, string accountNo, string sessionID, string language, string orderNo, string counterId, bool isToday)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string path = Commons.ORDER_CFD_DETAIL_PATH.Replace("?", orderNo);
            string param = "&counterID=" + counterId + "&isToday=" + isToday;
            string result = hcr.getRequest(path, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getCfdWithdrawOrder(string deviceId, string accountNo, string sessionID, string language, string orderNo, string counterId, string passwordE2ee)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("encryptedPIN", passwordE2ee));

            hcr.forms.Clear();
            hcr.forms.Add(new KeyValuePair<string, string>("counterID", counterId));

            string path = Commons.ORDER_CFD_WITHDRAW_PATH.Replace("?", orderNo);
            string result = hcr.postRequest(path, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getUtOrderDetail(string deviceId, string accountNo, string sessionID, string language, string orderNo, string counterId)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string path = Commons.ORDER_UT_DETAIL_PATH.Replace("?", orderNo);
            string param = "&counterID=" + counterId;
            string result = hcr.getRequest(path, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getUtWithdrawOrder(string deviceId, string accountNo, string sessionID, string language, string orderNo, string counterId, string passwordE2ee)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("encryptedPIN", passwordE2ee));

            hcr.forms.Add(new KeyValuePair<string, string>("counterID", counterId));

            string path = Commons.ORDER_UT_WITHDRAW_PATH.Replace("?", orderNo);
            string result = hcr.postRequest(path, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getUtCancelOrder(string deviceId, string accountNo, string sessionID, string language, string orderNo, string counterId, string passwordE2ee)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("encryptedPIN", passwordE2ee));

            hcr.forms.Add(new KeyValuePair<string, string>("counterID", counterId));

            string path = Commons.ORDER_UT_CANCEL_PATH.Replace("?", orderNo);
            string result = hcr.postRequest(path, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getFtFxFxmnOrderDetail(string deviceId, string accountNo, string sessionID, string language
            , string product, string type, string orderNo)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string path = string.Format(Commons.ORDER_FT_FX_FXMN_ORDER_DETAIL_PATH, product, type, orderNo);
            string result = hcr.getRequest(path, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getFxFxmnAmendOrder(string deviceId, string accountNo, string sessionID, string language
            , string product, string encryptedPIN, string orderNo, string price, string ocoPrice)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("encryptedPIN", encryptedPIN));

            hcr.forms.Add(new KeyValuePair<string, string>("price", price));
            hcr.forms.Add(new KeyValuePair<string, string>("ocoPrice", ocoPrice));

            string path = string.Format(Commons.TRADE_FX_FXMN_AMEND_PATH, product, orderNo);
            string result = hcr.postRequest(path, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getFtFxFxmnWithdrawOrder(string deviceId, string accountNo, string sessionID, string language
            , string product, string encryptedPIN, string orderNo)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("encryptedPIN", encryptedPIN));

            string path = string.Format(Commons.TRADE_FT_FX_FXMN_WITHDRAW_PATH, product, orderNo);
            string result = hcr.postRequest(path, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

    }
}