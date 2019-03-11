using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Net;
using Newtonsoft.Json.Linq;

namespace DAL
{
    public class WeOpenid
    {
        public string openid { get; set; }
        public string redirectUrl { get; set; }
    }
    public class WeChatDAL
    {
        public static WeOpenid getOpenid(string code, string urlEncode)
        {
            WeOpenid weOpenid=new WeOpenid();
            string url="";
            string appid = ConfigurationManager.AppSettings["appid"];
            string secret = ConfigurationManager.AppSettings["secret"];
            if (string.IsNullOrWhiteSpace(appid) || string.IsNullOrWhiteSpace(secret)){
                weOpenid.openid="";
                weOpenid.redirectUrl=url;
                return weOpenid;
            }
            if (code == null)
            {
                url="https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri="+urlEncode+"&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
                weOpenid.openid="";
                weOpenid.redirectUrl=url;
                return weOpenid;
            }
            url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appid + "&secret=" + secret + "&code=" + code + "&grant_type=authorization_code";
            WebClient wc = new WebClient();
            byte[] bytes = wc.DownloadData(url);
            string result = Encoding.GetEncoding("utf-8").GetString(bytes);
            JObject obj = JObject.Parse(result);
            if(obj["openid"]==null)
            {
                url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + urlEncode + "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
                weOpenid.openid = "";
                weOpenid.redirectUrl = url;
                return weOpenid;
            }
            weOpenid.openid = obj["openid"].ToString();
            weOpenid.redirectUrl = "";
            return weOpenid;
        }
    }
}
