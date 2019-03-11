using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using WeChat.Infrastructure;

namespace WeChat.Models
{
    public class WatchlistMgr
    {
        public string getPreWatchlist(string deviceId, string language)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();
            
            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));

            string result = hcr.getRequest(Commons.WATCHLIST_PRELOGIN_PATH, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getWatchlist(string deviceId, string accountNo, string sessionID, string language)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            
            string result = hcr.getRequest(Commons.WATCHLIST_PATH, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getWatchlistDetail(string deviceId, string accountNo, string sessionID, string language, string watchlistId)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string path = Commons.WATCHLIST_DETAIL_PATH.Replace("?", watchlistId);
            string result = hcr.getRequest(path, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string invokeRemoveCounter(string deviceId, string accountNo, string sessionID, string language, string watchlistId, string counterIDsString)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            hcr.forms.Clear();
            string[] counterIDs = counterIDsString.Split(',');
            for (int i = 0; i < counterIDs.Length; i++)
            {
                hcr.forms.Add(new KeyValuePair<string, string>("counterIDs", counterIDs[i]));
            }

            string path = Commons.WATCHLIST_REMOVE_COUNTER_PATH.Replace("?", watchlistId);
            string result = hcr.postRequest(path, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string invokeAddCounter(string deviceId, string accountNo, string sessionID, string language, string watchlistId, string counterId, string symbol)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            hcr.forms.Clear();
            hcr.forms.Add(new KeyValuePair<string, string>("counterID", counterId));
            hcr.forms.Add(new KeyValuePair<string, string>("symbol", symbol));

            string path = Commons.WATCHLIST_ADD_COUNTER_PATH.Replace("?", watchlistId);
            string result = hcr.postRequest(path, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }


    }
}