using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using WeChat.Infrastructure;

namespace WeChat.Models
{
    public class PortfolioMgr
    {
        public string getAllBalanceList(string deviceId, string accountNo, string sessionID, string language)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string result = hcr.getRequest(Commons.PORTFOLIO_ALL_EQUITYBALANCE_PATH, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getSTKAccountDetails(string deviceId, string accountNo, string sessionID, string language, string accountType)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("accountType", accountType));

            string result = hcr.getRequest(Commons.PORTFOLIO_STK_ACCOUNTDETAILS_PATH, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getCFDAccountDetails(string deviceId, string accountNo, string sessionID, string language)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string result = hcr.getRequest(Commons.PORTFOLIO_CFD_ACCOUNTDETAILS_PATH, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getUTAccountDetails(string deviceId, string accountNo, string sessionID, string language)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string result = hcr.getRequest(Commons.PORTFOLIO_UT_ACCOUNTDETAILS_PATH, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        /// <summary>
        /// Holdings Details data get from list.
        /// Unrealized Profit Loss
        /// </summary>
        /// <returns></returns>
        public string getStocksHoldings(string deviceId, string accountNo, string sessionID, string language, string accountType)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            string param = String.Format("&accountType={0}", accountType);

            string result = hcr.getRequest(Commons.PORTFOLIO_ST_HOLDING_PATH, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getUTHoldings(string deviceId, string accountNo, string sessionID, string language)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string result = hcr.getRequest(Commons.PORTFOLIO_UT_HOLDING_PATH, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getCFDPositionList(string deviceId, string accountNo, string sessionID, string language)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string result = hcr.getRequest(Commons.PORTFOLIO_CFD_POSITIONS_PATH, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getCFDPositionDetail(string deviceId, string accountNo, string sessionID, string language,
            string tradeDate,string orderNo,string subOrderNo,string counterID)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            string path = String.Format(Commons.PORTFOLIO_CFD_POSITION_DETAILS_PATH, tradeDate, orderNo, subOrderNo);
            string param = String.Format("&counterID={0}", counterID);
            string result = hcr.getRequest(path, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

        public string getGlobalDisclaimer(string deviceId, string accountNo, string sessionID, string language,
            string product,string disclaimerType)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            
            string param = String.Format("&product={0}&disclaimerType={1}", product, disclaimerType);
            string result = hcr.getRequest(Commons.PORTFOLIO_GLOBAL_DISCLAIMER_PATH, hcr.headers, param, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

    }
}