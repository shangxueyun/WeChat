using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using WeChat.Infrastructure;

namespace WeChat.Models
{
    public class OsPositionMgr
    {
        public string getOsPosition(string deviceId, string accountNo, string sessionID, string language)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string result = hcr.getRequest(Commons.OSPOSITION_LIST_PATH, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getOsPositionStockDetailContract(string deviceId, string accountNo, string sessionID, string language, string accountType, string id)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string param = "&accountType=" + accountType + "&id=" + id;
            string result = hcr.getRequest(Commons.OSPOSITION_STOCK_CONTRACT_DETAIL_PATH, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getOsPositionStockDetailContra(string deviceId, string accountNo, string sessionID, string language, string accountType, string id)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string param = "&accountType=" + accountType + "&id=" + id;
            string result = hcr.getRequest(Commons.OSPOSITION_STOCK_CONTRA_DETAIL_PATH, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getOsPositionUtDetailFromyou(string deviceId, string accountNo, string sessionID, string language, string id)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string param = "&id=" + id;
            string result = hcr.getRequest(Commons.OSPOSITION_UT_DETAIL_FROMYOU_PATH, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getOsPositionUtDetailToyou(string deviceId, string accountNo, string sessionID, string language, string id)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string param = "&id=" + id;
            string result = hcr.getRequest(Commons.OSPOSITION_UT_DETAIL_TOYOU_PATH, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

    }
}