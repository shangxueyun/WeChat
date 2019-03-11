using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using WeChat.Infrastructure;

namespace WeChat.Models
{
    public class CounterMgr
    {
        public string getSearchCounter(string deviceId, string accountNo, string sessionID, string language
            , string productFlag, string module, string market, string Exchange, string keyword, string count)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string param = "&productFlag=" + productFlag + "&module=" + module + "&market=" + market + "&Exchange=" + Exchange + "&keyword=" + keyword + "&count=" + count;
            string result = hcr.getRequest(Commons.COUNTER_SEARCH_PATH, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getCounterInfo(string deviceId, string accountNo, string sessionID, string language, string priceMode, string counterID)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string param = "&priceMode=" + priceMode + "&counterID=" + counterID;
            string result = hcr.getRequest(Commons.COUNTER_INFO_PATH, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getCounterPrices(string deviceId, string accountNo, string sessionID, string language, string size, string counterIDsString)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            //string param = "&size=" + size + "&counterIDs=" + counterIDs;
            string[] counterIDs = counterIDsString.Split(',');
            string param = "&size=" + counterIDs.Length;
            for (int i = 0; i < counterIDs.Length; i++)
            {
                //hcr.forms.Add(new KeyValuePair<string, string>("counterIDs", counterIDs[i]));
                param += "&counterIDs=" + counterIDs[i];
            }
            string result = hcr.getRequest(Commons.COUNTER_PRICELIST_PATH, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getContractDetails(string deviceId, string accountNo, string sessionID, string language, string product, string counterIDs, string price)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string path = string.Format(Commons.CONTRACT_DETAILS_PATH, product);
            string param = "&counterIDs=" + counterIDs + "&price=" + price;
            string result = hcr.getRequest(path, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getUTInfo(string deviceId, string accountNo, string sessionID, string language, string counterID, string url)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string param = "&counterID=" + counterID;
            string result = hcr.getRequest(url, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }
    }
}