using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using WeChat.Infrastructure;

namespace WeChat.Models
{
    public class TransactionHistoryMgr
    {
        public string getTransactionHistoryStockList(string deviceId, string accountNo, string sessionID, string language, string currency, string month, string accountType, int pageSize, int pageIndex)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string param = "&currency" + currency + "&month" + month + "&accountType" + accountType + "&pageSize" + pageSize + "&pageIndex" +pageIndex;
            string result = hcr.getRequest(Commons.TRANSACTION_HISTORY_STOCK_LIST_PATH, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getTransactionHistoryCfdList(string deviceId, string accountNo, string sessionID, string language, string currency, string month)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.headers.Clear();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string param = "&currency" + currency + "&month" + month;
            string result = hcr.getRequest(Commons.TRANSACTION_HISTORY_CFD_LIST_PATH, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }


    }
}