using log4net;
using log4net.Config;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using WeChat.Infrastructure;
using WeChat.Models.VO;

namespace WeChat.Models
{
    public class AuthMgr
    {
        public string getPresession(string deviceId, string language)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));


            string result = hcr.postRequest(Commons.PRESESSION_PATH, hcr.headers, hcr.forms, language);

            XmlConfigurator.Configure();
            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
            

        }

        public string getAuth(string deviceId, string language, string accountNo, string passwordE2ee, string sessionID)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("encryptedPIN", passwordE2ee));

            string result = hcr.postRequest(Commons.AUTHENTICATE_PATH, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
           


        }

        public string getTwofa(string deviceId, string language, string accountNo, string sessionID)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            
            string result = hcr.getRequest(Commons.TWO_FA, hcr.headers, "", language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
            

        }

        public string getTwofaAuth(string deviceId, string language, string accountNo, string sessionID, string nafUserName, string twoFADeviceId, string spid, string type, string twoFAData, string challenge)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("nafUserName", nafUserName));
            hcr.headers.Add(new KeyValuePair<string, string>("twoFADeviceId", twoFADeviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("spid", spid));
            hcr.headers.Add(new KeyValuePair<string, string>("type", type));
            hcr.headers.Add(new KeyValuePair<string, string>("twoFAData", twoFAData));
            hcr.headers.Add(new KeyValuePair<string, string>("challenge", challenge));

            string result = hcr.postRequest(Commons.TWO_FA_AUTHENTICATE, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;

        }

        public string getSmsOtp(string deviceId, string language, string accountNo, string sessionID, string nafUserName, string twoFADeviceId, string spid)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));
            hcr.headers.Add(new KeyValuePair<string, string>("nafUserName", nafUserName));
            hcr.headers.Add(new KeyValuePair<string, string>("twoFADeviceId", twoFADeviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("spid", spid));

            string result = hcr.postRequest(Commons.SMS_OTP, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
            
        }

        public string invokLogout(string deviceId, string language)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));

            
            string result = hcr.postRequest(Commons.LOGOUT_PATH, hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
            

        }

        public string acknowledgeras(string deviceId, string language, string accountNo, string sessionID, string acknowledge)
        {
            HttpClientRequest hcr = new HttpClientRequest();
            hcr.clearHeadersForms();

            hcr.headers.Add(new KeyValuePair<string, string>("deviceId", deviceId));
            hcr.headers.Add(new KeyValuePair<string, string>("accountNo", accountNo));
            hcr.headers.Add(new KeyValuePair<string, string>("sessionId", sessionID));

            hcr.forms.Clear();
            hcr.forms.Add(new KeyValuePair<string, string>("acknowledge", acknowledge));

            string result = hcr.postRequest("/global/twofa/acknowledgeras", hcr.headers, hcr.forms, language);

            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            logger.Info(result + "");

            return result;
        }

    }
}