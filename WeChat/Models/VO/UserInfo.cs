using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WeChat.Models.VO
{
    public class UserInfo
    {
        public string sessionID = String.Empty;
        public string randomNo = String.Empty;
        public string publicKey = String.Empty;

        public string accountNo = String.Empty;
        public string encryptedPIN = String.Empty;
        public string accountType = String.Empty;


        //public static string toe2eepassword(string password)
        //{

        //    try
        //    {
        //        snce2eeclient sncclient = new snce2eeclient();
        //        passworde2ee = sncclient.encryptpin1(presession.publickey, presession.randomno, password);

        //    }
        //    catch (exception e)
        //    {
        //        passworde2ee = null;
        //    }
        //    return passworde2ee;
        //} 

    }
}