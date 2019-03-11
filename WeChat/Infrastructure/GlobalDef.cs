using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WeChat.Infrastructure
{
    //Forex Product type
    public enum FXPType
    {
        REGFX = 1,//Regular FX
        MINIFX = 2//Mini FX
    }

    //general for SG
    public enum Role
    {
        Client = 0,
        TR = 1,
        Administrator = 2
    }

    //用户角色定义 for HK
    enum User_Type
    {
        USER_SUPER,
        USER_CLIENT,
        USER_AE,
        USER_DEALER
    };

    public struct User
    {
        public string sessionID;
        public string accountNo;
        public string encryptedPIN;
        public string randomNO;
    }

    public struct STReturn
    {
        public string retCode;
        public string retMsg;
    }


    public enum MsgCode
    {
        //for common
        SYSTEM_ERR = -1000,
        REQ_SVR_ERR,
        PRELOGIN_ERR,
        AUTHLOGIN_ERR,
        SESSION_EXPIRED_ERR,

        OPR_SUCC = 1,
        WARNING1 = 100,
        WARNING2,
        WARNING3,
        WARNING4,

        PARSE_XML_ERROR =1000,
        PARSE_JSON_ERROR,

    }

    public static class GlobalDef
    {
        public const int MAX_RETRY_TIMES = 3;
        public const double MIN_DIFFERENCE = 0.00001;
        public const string DEV_TYPE_IOS = "A4AB8B23-735E-4ABC-9E26-9F78292E25CC";
        public const string DEV_TYPE_ANDROID = "3FA5B748-9EC7-41EF-93FA-8C93AC349312";


        static GlobalDef()
        {

        }
    }

    public static class ReturnMsg
    {
        public static Dictionary<int, string> msgList = new Dictionary<int, string>();
        static ReturnMsg()
        {
            //for common            
            msgList.Add((int)MsgCode.SYSTEM_ERR, "System Unknown Error.Pls Contact Administrator.");
            msgList.Add((int)MsgCode.REQ_SVR_ERR, "Call remote server error.Pls Contact Administrator.");            
            msgList.Add((int)MsgCode.PRELOGIN_ERR, "Login Check Fail.Pls check Network and Server");
            msgList.Add((int)MsgCode.AUTHLOGIN_ERR, "Login Fail.Pls check Network and Server");
            msgList.Add((int)MsgCode.SESSION_EXPIRED_ERR, "User Session Expired.pls Relogin.");            
            msgList.Add((int)MsgCode.PARSE_XML_ERROR, "Parsing Server Data Error");
            msgList.Add((int)MsgCode.PARSE_JSON_ERROR, "Parsing Server Json Data Error");            

            msgList.Add((int)MsgCode.OPR_SUCC, "Operation is successful.");
            msgList.Add((int)MsgCode.WARNING1, "WarningMsg1");
            msgList.Add((int)MsgCode.WARNING2, "WarningMsg2");
            msgList.Add((int)MsgCode.WARNING3, "WarningMsg3");
            msgList.Add((int)MsgCode.WARNING4, "WarningMsg4");
                                       
        }
    }

}