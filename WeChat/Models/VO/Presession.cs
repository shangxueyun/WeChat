using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace WeChat.Models.VO
{
    public class Presession
    {

        public string sessionID;
        public string randomNo;
        public string publicKey;

        public Presession parsePresession(string result)
        {
            JObject json = JObject.Parse(result);

            sessionID = json["sessionID"].ToString();
            randomNo = json["randomNo"].ToString();
            publicKey = json["publicKey"].ToString();
            return this;
        }

        //public JObject presession()
        //{
        //    try
        //    {
        //        System.Net.ServicePointManager.Expect100Continue = false;
        //        HttpClient httpClient = new HttpClient();
        //        httpClient.MaxResponseContentBufferSize = 256000;
        //        httpClient.DefaultRequestHeaders.Add("user-agent", "Mozilla/5.0 (POEMS WeChat)");
        //        httpClient.DefaultRequestHeaders.Add("deviceId", "2066592d7ff8408X");
        //        httpClient.DefaultRequestHeaders.Add("apikey", "A4AB8B23-735E-4ABC-9E26-9F78292E25CC");
        //        httpClient.DefaultRequestHeaders.Add("versionNo", "2.0.0");

        //        List<KeyValuePair<String, String>> paramList = new List<KeyValuePair<String, String>>();
        //        paramList.Add(new KeyValuePair<string, string>("osVersion", "9.1.1"));
        //        paramList.Add(new KeyValuePair<string, string>("language", "1"));
        //        HttpContent httpContent = new FormUrlEncodedContent(paramList);

        //        string uri = Commons.URL + Commons.PRESESSION_PATH;
        //        var task = httpClient.PostAsync(new Uri(uri), httpContent);
        //        //var task = httpClient.PostAsync(new Uri("http://118.189.144.221/pmobile2/global/onefa/presession"), httpContent);
        //        HttpResponseMessage response = task.Result;
        //        var result = response.Content.ReadAsStringAsync();
        //        JObject obj = JObject.Parse(result.Result);
        //        string sessionID = obj["sessionID"].ToString();
        //        string randomNo = obj["randomNo"].ToString();
        //        string publicKey = obj["publicKey"].ToString();

        //        Presession.sessionID = obj["sessionID"].ToString();
        //        Presession.randomNo = obj["randomNo"].ToString();
        //        Presession.publicKey = obj["publicKey"].ToString();

        //        JObject newObj = new JObject();
        //        newObj.Add("sessionID", sessionID);
        //        newObj.Add("randomNo", randomNo);
        //        newObj.Add("publicKey", publicKey);
        //        return newObj;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}
    }
}