using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using WeChat.Infrastructure;

namespace WeChat.Models
{
    public class PortfolioFtFxMgr
    {
        public string getAccount(string deviceId, string accountNo, string sessionID, string language, string product)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string path = string.Format(Commons.ACCOUNT_FT_FX_FXMN_NFX_PATH, product);
            string result = hcr.getRequest(path, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getNetPositionSummary(string deviceId, string accountNo, string sessionID, string language, string product)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string path = string.Format(Commons.NET_POSITION_FT_FX_FXMN_SUMMARY_PATH, product);
            string result = hcr.getRequest(path, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getNetPositionDetail(string deviceId, string accountNo, string sessionID, string language, string product
            , string symbol, string transactionID, string orderID)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string path = string.Format(Commons.NET_POSITION_FT_FX_FXMN_DETAIL_PATH, product, symbol, transactionID, orderID);
            string result = hcr.getRequest(path, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

    }
}