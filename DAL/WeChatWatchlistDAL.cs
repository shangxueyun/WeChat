using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Configuration;

namespace DAL
{
    public class WeChatWatchlistDAL
    {
        static string strConn = ConfigurationManager.ConnectionStrings["PMAServerDb"].ConnectionString;
        public static void userLogin(string openid)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            string sql = "exec usp_wl_userlogin @openid='" + openid + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
        }
        public static bool userBinding(string openid, string account)
        {
            int icode = -1;
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            string sql = "exec usp_wl_userbinding @openid='" + openid + "', @account='" + account + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            SqlDataReader sdr = cmd.ExecuteReader();
            while (sdr.Read())
            {
                string code = sdr["code"].ToString();
                icode = int.Parse(code);
                break;
            }
            sdr.Close();
            conn.Close();
            return (icode>=0);
        }
        public static void userUnbind(string openid)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            string sql = "exec usp_wl_userUnbind @openid='" + openid + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
        }
        public static string userBindAccount(string openid)
        {
            string account = "";
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            string sql = "exec usp_wl_userBindAccount @openid='" + openid + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            SqlDataReader sdr = cmd.ExecuteReader();
            while (sdr.Read())
            {
                account = sdr["acct"].ToString();
                break;
            }
            sdr.Close();
            conn.Close();
            return account;
        }
        public static void updateUserWacthlistStocks(string openid, string json)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            string sql = "exec usp_wl_updateUserWacthlist @product='stocks', @openid='" + openid + "', @json='" + json + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
        }
        public static void updateUserWacthlistFutures(string openid, string json)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            string sql = "exec usp_wl_updateUserWacthlist @product='futures', @openid='" + openid + "', @json='" + json + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
        }
        public static void updateUserWacthlistForex(string openid, string json)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            string sql = "exec usp_wl_updateUserWacthlist @product='forex', @openid='" + openid + "', @json='" + json + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
        }
        public static void updateUserWacthlistForex2(string openid, string json)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            string sql = "exec usp_wl_updateUserWacthlist @product='forex2', @openid='" + openid + "', @json='" + json + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
        }
        public static string userWacthlistStocks(string openid)
        {
            string json = "";
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            string sql = "exec usp_wl_userWacthlist @product='stocks', @openid='" + openid + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
            SqlDataReader sdr = cmd.ExecuteReader();
            while (sdr.Read())
            {
                json = sdr["json"].ToString();
                break;
            }
            sdr.Close();
            conn.Close();
            return json;
        }
        public static string userWacthlistFutures(string openid)
        {
            string json = "";
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            string sql = "exec usp_wl_userWacthlist @product='futures', @openid='" + openid + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
            SqlDataReader sdr = cmd.ExecuteReader();
            while (sdr.Read())
            {
                json = sdr["json"].ToString();
                break;
            }
            sdr.Close();
            conn.Close();
            return json;
        }
        public static string userWacthlistForex(string openid)
        {
            string json = "";
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            string sql = "exec usp_wl_userWacthlist @product='forex', @openid='" + openid + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
            SqlDataReader sdr = cmd.ExecuteReader();
            while (sdr.Read())
            {
                json = sdr["json"].ToString();
                break;
            }
            sdr.Close();
            conn.Close();
            return json;
        }
        public static string userWacthlistForex2(string openid)
        {
            string json = "";
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            string sql = "exec usp_wl_userWacthlist @product='forex2', @openid='" + openid + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
            SqlDataReader sdr = cmd.ExecuteReader();
            while (sdr.Read())
            {
                json = sdr["json"].ToString();
                break;
            }
            sdr.Close();
            conn.Close();
            return json;
        }
    }
}
