using log4net;
using log4net.Config;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using WeChat.Models.VO;

namespace WeChat.Infrastructure
{
    public class HttpClientRequest
    {
        public List<KeyValuePair<String, String>> headers = new List<KeyValuePair<String, String>>();
        public List<KeyValuePair<String, String>> forms = new List<KeyValuePair<String, String>>();

        public static string deviceId = GlobalDef.DEV_TYPE_IOS;

        //public string getHttpClient1()
        //{
        //    System.Net.ServicePointManager.Expect100Continue = false;
        //    HttpClient httpClient = new HttpClient();
        //    httpClient.MaxResponseContentBufferSize = 256000;
        //    httpClient.DefaultRequestHeaders.Add("user-agent", "Mozilla/5.0 (POEMS WeChat)");
        //    httpClient.DefaultRequestHeaders.Add("deviceId", "2066592d7ff8408X");
        //    httpClient.DefaultRequestHeaders.Add("apikey", "A4AB8B23-735E-4ABC-9E26-9F78292E25CC");
        //    httpClient.DefaultRequestHeaders.Add("versionNo", "2.0.0");

        //    List<KeyValuePair<String, String>> paramList = new List<KeyValuePair<String, String>>();
        //    paramList.Add(new KeyValuePair<string, string>("osVersion", "9.1.1"));
        //    paramList.Add(new KeyValuePair<string, string>("language", "1"));
        //    HttpContent httpContent = new FormUrlEncodedContent(paramList);
        //    string uri = Commons.URL + Commons.PRESESSION_PATH;
        //    var task = httpClient.PostAsync(new Uri(uri), httpContent);
        //    HttpResponseMessage response = task.Result;
        //    var result = response.Content.ReadAsStringAsync();

        //    return result.Result;
        //}
             
        //public string getHttpClient2()
        //{
        //    HttpClient httpClient = new HttpClient();
        //    httpClient.MaxResponseContentBufferSize = 256000;
        //    httpClient.DefaultRequestHeaders.Add("user-agent", "Mozilla/5.0 (POEMS WeChat)");
        //    httpClient.DefaultRequestHeaders.Add("deviceId", "2066592d7ff8408X");
        //    httpClient.DefaultRequestHeaders.Add("apikey", "A4AB8B23-735E-4ABC-9E26-9F78292E25CC");
        //    httpClient.DefaultRequestHeaders.Add("versionNo", "2.0.0");

        //    List<KeyValuePair<String, String>> paramList = new List<KeyValuePair<String, String>>();
        //    paramList.Add(new KeyValuePair<string, string>("osVersion", "9.1.1"));
        //    paramList.Add(new KeyValuePair<string, string>("language", "1"));

        //    HttpResponseMessage response = httpClient.GetAsync(Commons.URL + Commons.WATCHLIST_PRELOGIN_PATH + "?osVersion=9.1.1&language=1").Result;
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string result = response.Content.ReadAsStringAsync().Result;

        //        return result;
        //    }

        //    return null;
        //}

        //public void setDeviceId(string deviceId1)
        //{
        //    deviceId = deviceId1;
        //}

        public void clearHeadersForms()
        {
            headers.Clear();
            forms.Clear();
        }

        public static HttpClient getHttpClient(/*string deviceId*/)
        {
            System.Net.ServicePointManager.Expect100Continue = false;
            HttpClient httpClient = new HttpClient();
            httpClient.Timeout =new TimeSpan(0,0,5);
            httpClient.MaxResponseContentBufferSize = 256000;
            httpClient.DefaultRequestHeaders.Add("user-agent", "Mozilla/5.0 (POEMS WeChat)");

            //httpClient.DefaultRequestHeaders.Add("deviceId", deviceId);
            //httpClient.DefaultRequestHeaders.Add("apikey", "A4AB8B23-735E-4ABC-9E26-9F78292E25CC");
            httpClient.DefaultRequestHeaders.Add("apikey", "CCFF15FF-916B-485A-8745-58DFB5EAD35E");
            httpClient.DefaultRequestHeaders.Add("versionNo", "1.0.0");

            return httpClient;
        }
        /// <summary>
        /// post request
        /// </summary>
        /// <param name="path"></param>
        /// <param name="requestParams"></param>
        /// <returns></returns>
        public string postRequest(string path, List<KeyValuePair<String, String>> headers, List<KeyValuePair<String, String>> forms, string language)
        {

            HttpClient httpClient = getHttpClient();

            //import params
            foreach (KeyValuePair<String, String> header in headers)
            {
                httpClient.DefaultRequestHeaders.Add(header.Key, header.Value);
            }

            List<KeyValuePair<String, String>> paramList = new List<KeyValuePair<String, String>>();
            paramList.Add(new KeyValuePair<string, string>("osVersion", "9.1.1"));
            //paramList.Add(new KeyValuePair<string, string>("osVersion", "1"));
            paramList.Add(new KeyValuePair<string, string>("language", language));

            //import params
            foreach (KeyValuePair<String, String> form in forms)
            {
                paramList.Add(form);
            }

            HttpContent httpContent = new FormUrlEncodedContent(paramList);

            //string uri = Commons.URL + path;
            string uri = ConfigurationManager.AppSettings["apiuri"] + path;

            if(true)
            {

                ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
                logger.Info(uri);
                
                foreach (KeyValuePair<String, String> header in headers)
                {
                    logger.Info(header.Key + " = " + header.Value);
                }
                foreach (KeyValuePair<String, String> form in forms)
                {
                    logger.Info(form.Key + " = " + form.Value);
                }
            }

            string result = null;
            int i = 0;
            do
            {
                try
                {
                    //var task = httpClient.PostAsync(new Uri(uri), httpContent);
                    //HttpResponseMessage response = task.Result;
                    var task = httpClient.PostAsync(new Uri(uri), httpContent);
                    task.Result.EnsureSuccessStatusCode();
                    HttpResponseMessage response = task.Result;
                    var sResult = response.Content.ReadAsStringAsync();
                    result = sResult.Result;
                    if (response.IsSuccessStatusCode)
                    {
                        //result = response.Content.ReadAsStringAsync().Result;
                        break;
                    }
                    else
                    {
                        i++;
                        ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
                        logger.Info(i.ToString() + ",--," + uri);
                        if (i < 5)
                        {
                            continue;
                        }
                        result = "{\"msg\":\"Return exception\",\"code\":-101}";
                    }
                } 
                catch (Exception ex)
                {
                    i++;
                    Thread.Sleep(10);
                    ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
                    logger.Info(i.ToString() + ",- -," + uri);
                    if (i < 5)
                    {
                        continue;
                    }
                    result = "{\"msg\":\"Request timeout.\",\"code\":-408}";
                }
            } while (i < 5);
            return result;
        }

        /// <summary>
        /// get request
        /// </summary>
        /// <param name="path">eg: "/global/watchlist"</param>
        /// <param name="param">eg: "?osVersion=9.1.1&language=1"</param>
        /// <returns></returns>
        public string getRequest(string path, List<KeyValuePair<String, String>> headers, string param, string language)
        {
            HttpClient httpClient = getHttpClient();

            //import params
            foreach (KeyValuePair<String, String> header in headers)
            {
                httpClient.DefaultRequestHeaders.Add(header.Key, header.Value);
            }

            //string uri = Commons.URL + path + string.Format(Commons.GET_DEFAULT_PARAM, language) + param;
            string uri = ConfigurationManager.AppSettings["apiuri"] + path + string.Format(Commons.GET_DEFAULT_PARAM, language) + param;
            
            ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            if (true)
            {
                //ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
                logger.Info(uri);
                foreach (KeyValuePair<String, String> header in headers)
                {
                    logger.Info(header.Key + " = " + header.Value);
                }
            }

            string result = null;
            int i = 0;
            do
            {
                try
                {
                    logger.Info("1,-~-," + uri); 
                    var task = httpClient.GetAsync(uri);
                    logger.Info("2,-~-," + uri);
                    task.Result.EnsureSuccessStatusCode();
                    logger.Info("3,-~-," + uri);
                    HttpResponseMessage response = task.Result;
                    logger.Info("4,-~-," + uri);
                    var sResult = response.Content.ReadAsStringAsync();
                    logger.Info("5,-~-," + uri);
                    result = sResult.Result;
                    logger.Info("6,-~-," + uri); 

                    //HttpResponseMessage response = httpClient.GetAsync(uri).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        //result = response.Content.ReadAsStringAsync().Result;
                        break;
                    }
                    else
                    {
                        i++;
                        logger.Info(i.ToString() + ",--," + uri);
                        if (i < 5)
                        {
                            continue;
                        }
                        result = "{\"msg\":\"Return exception.\",\"code\":-101}";
                    }
                }
                catch (Exception ex)
                {
                    i++;
                    Thread.Sleep(10);
                    //ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
                    logger.Info(i.ToString() + ",- -," + uri);
                    if (i < 5)
                    {
                        continue;
                    }
                    result = "{\"msg\":\"Request timeout.\",\"code\":-408}";
                }
            }while(i<5);
            return result;
        }


    }
}