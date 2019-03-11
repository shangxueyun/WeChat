using System;
using System.Collections.Generic;
using System.Web;
namespace WeChat
{
    /// <summary>
    /// Summary description for WeChatException
    //  -100xxx			E2EE
    //  -101xxx			Login Module
    //  -102xxx			Login Session	
    //  -103xxx			Account	
    //  -104xxx			Announcement
    //  -105xxx			Chart
    //  -106xxx			Stock Detail or Counter Detail
    //  -107xxx			Counter Price
    //  -108xxx			Counter Search	
    //  -109xxx			News
    //  -110xxx			Order Status
    //  -111xxx			Price Indice
    //  -112xxx			Settings
    //  -113xxx			Top20
    //  -114XXx			WatchList	
    //  -115xxx			Outstanding Position
    //  -999999			Other Server Request Error
    /// ----------------------------
    ///           
    /// </summary>


    public class WeChatException : System.Exception
    {
        private int m_ErrorCode;
        public int WeChatErrorCode
        {
            get { return m_ErrorCode; }
        }

        private string m_ErrorMessage;

        public string WeChatErrorMessage
        {
            get { return m_ErrorMessage; }
        }

        public override string Message
        {
            get
            {
                return string.Format("ErrorCode:{0} ErrMessage:{1}",m_ErrorCode, m_ErrorMessage); 
            }
        }

        

        /// <summary>
        /// </summary>
        /// <param name="code"></param>
        /// <param name="msg"></param>
        public WeChatException(int code, string msg, Exception ex)
        {
            if (ex.GetType() == typeof(WeChatException))
            {

                this.m_ErrorCode = ((WeChatException)ex).WeChatErrorCode;
                this.m_ErrorMessage = ((WeChatException)ex).WeChatErrorMessage;

            }
            else
            {
                this.m_ErrorCode = code;
                this.m_ErrorMessage = msg;
            }

            

        }

        public WeChatException(int code, string msg)
        {
            this.m_ErrorCode = code;
            this.m_ErrorMessage = msg;
        }
   

        private void GetWeChatException(Exception ex)
        {
            string logMsg = string.Empty;
            int errorCode = 0;
            string errMsg = string.Empty;
            if (ex.GetType() == typeof(WeChatException))
            {

                errorCode = ((WeChatException)ex).WeChatErrorCode;
                errMsg = ((WeChatException)ex).Message;//WeChatErrorMessage;

            }
            else
            {
                errorCode = -999999;
                errMsg = "ServerError: " + ex.Message;
            }

            //show this error to the client side.
            this.m_ErrorMessage = errMsg.Split('~')[0];
            this.m_ErrorCode = errorCode;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="service"></param>
        /// <param name="account"></param>
        /// <param name="userAction"></param>
        /// <param name="errMsg"></param>
        /// <param name="errorCode"></param>
        /// <param name="ex"></param>
        /// <param name="allowLog">Allow to log if it fail. For streaming, suggest not to log for it will create alot of unnecessary logs</param>
        /// int errorCode,
        public WeChatException(Exception ex)//WebReference service, string account, string userAction, string errMsg, string strServiceInputLog, Exception ex, bool allowLog)
        {
            GetWeChatException(ex);
        }
    }


    //public class SessionException: WeChatException
    //{
    //    SessionException
    //}
}
