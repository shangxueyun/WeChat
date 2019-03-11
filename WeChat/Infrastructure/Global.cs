using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using WeChat.Models.VO;

namespace WeChat.Infrastructure
{
    public class Global
    {

        public static bool isXmlCallFuncSucc(string xmlString)
        {
            try
            {
                bool ret = false;
                XmlDocument xd = new XmlDocument();
                xd.LoadXml(xmlString);//需增加解析异常以及是否有相应node的判断
                XmlNodeList xnl = xd.SelectNodes("Error");
                if ((xnl != null) && (xnl.Count > 0))
                    ret = false;
                else
                    ret = true;

                return ret;
            }
            catch (Exception ex)
            {
                throw new WeChatException((int)MsgCode.PARSE_XML_ERROR, ReturnMsg.msgList[(int)MsgCode.PARSE_XML_ERROR], ex);
            }        
        }

        public static STReturn getXmlFuncRetStatus(string xmlString)
        {
            try
            {
                STReturn ret1;
                XmlDocument xd = new XmlDocument();
                xd.LoadXml(xmlString);//需增加解析异常以及是否有相应node的判断
                XmlNodeList xnl = xd.SelectNodes("Error");
                if ((xnl != null) && (xnl.Count > 0))
                {
                    ret1.retCode = xnl[0]["ReturnCode"].InnerText;
                    ret1.retMsg = xnl[0]["ReturnMessage"].InnerText;
                }
                else
                {
                    ret1.retCode = "1";
                    ret1.retMsg = "succ";
                }

                return ret1;
            }
            catch (Exception ex)
            {
                throw new WeChatException((int)MsgCode.PARSE_XML_ERROR, ReturnMsg.msgList[(int)MsgCode.PARSE_XML_ERROR], ex);
            }
        }


        public static bool isSessionTimeOut(Object objUser)
        {
            if (objUser == null ||
                ((UserInfo)objUser).sessionID == null || ((UserInfo)objUser).sessionID == ""
                || ((UserInfo)objUser).accountNo == null || ((UserInfo)objUser).accountNo == ""
                || ((UserInfo)objUser).encryptedPIN == null || ((UserInfo)objUser).encryptedPIN == ""
                || ((UserInfo)objUser).randomNo == null || ((UserInfo)objUser).randomNo == "")
                return true;

            return false;
        }


        public static STReturn chkJsonStats(string result)
        {
            try
            {
                STReturn ret;
                JObject json = JObject.Parse(result);
                ret.retCode = json["code"].ToString();
                ret.retMsg = json["msg"].ToString();
                return ret;
            }
            catch (Exception)
            {
                STReturn ret;
                JObject json = new JObject();
                ret.retCode = String.Format("{0}", (int)MsgCode.PARSE_JSON_ERROR);
                ret.retMsg = ReturnMsg.msgList[(int)MsgCode.PARSE_JSON_ERROR];
                return ret;
            }
        }

        public static STReturn chkJsonStats2(string result)
        {
            try
            {
                STReturn ret;
                JObject json = JObject.Parse(result);
                ret.retCode = json["code"].ToString();
                ret.retMsg = "success";
                return ret;
            }
            catch (Exception)
            {
                STReturn ret;
                JObject json = new JObject();
                ret.retCode = String.Format("{0}", (int)MsgCode.PARSE_JSON_ERROR);
                ret.retMsg = ReturnMsg.msgList[(int)MsgCode.PARSE_JSON_ERROR];
                return ret;
            }
        }
    }
}