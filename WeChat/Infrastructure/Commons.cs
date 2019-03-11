using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WeChat.Infrastructure
{
    public class Commons
    {

        public const string URL = "http://118.189.144.221/pmobile2";
        //public const string URL = "https://api.poems.com.sg/pmobile2";
        public const string GET_DEFAULT_PARAM = "?osVersion=9.1.1&language={0}";
        public const string PRESESSION_PATH = "/global/onefa/presession";
        public const string AUTHENTICATE_PATH = "/global/onefa/authenticate";
        public const string TWO_FA = "/global/twofa";
        public const string TWO_FA_AUTHENTICATE = "/global/twofa/authenticate";
        public const string SMS_OTP = "/global/twofa/outofboundotp";
        public const string LOGOUT_PATH = "/global/onefa/logout";

        public const string WATCHLIST_PRELOGIN_PATH = "/global/watchlist/prelogin";
        public const string WATCHLIST_PATH = "/global/watchlist";
        public const string WATCHLIST_DETAIL_PATH = "/global/watchlist/?";
        public const string WATCHLIST_ADD_COUNTER_PATH = "/global/watchlist/?/add";
        public const string WATCHLIST_REMOVE_COUNTER_PATH = "/global/watchlist/?/remove";

        public const string COUNTER_PRELOGIN_PATH = "/global/counter/prelogin";
        public const string COUNTER_INFO_PATH = "/global/counter/info";
        public const string COUNTER_SEARCH_PATH = "/global/counter/search";
        public const string COUNTER_PRICELIST_PATH = "/global/counter/pricelist";
        public const string COUNTER_UT_GENERALINFO="/ut/counter/generalinfo";
        public const string COUNTER_UT_DOCUMENTS = "/ut/counter/documents";
        public const string COUNTER_UT_MANAGERINFO = "/ut/counter/managerinfo";
        public const string COUNTER_UT_PERFORMANCE = "/ut/counter/performance";
        public const string COUNTER_UT_RSP = "/ut/counter/rsp";

        public const string CONTRACT_DETAILS_PATH = "/{0}/contract";

        public const string ORDER_TODAY_PATH = "/global/order/today";
        public const string ORDER_PAST_PATH = "/global/order/history/?";
        public const string ORDER_DATES_PATH = "/global/order/history/dates";

        public const string ORDER_STOCK_DETAIL_PATH = "/st/order/?";
        public const string ORDER_STOCK_WITHDRAW_PATH = "/st/order/?/withdraw";
        public const string ORDER_STOCK_AMEND_PATH = "/st/order/?/amend";

        public const string ORDER_CFD_DETAIL_PATH = "/cfd/order/?";
        public const string ORDER_CFD_WITHDRAW_PATH = "/cfd/order/?/withdraw";

        public const string ORDER_UT_DETAIL_PATH = "/ut/order/?";
        public const string ORDER_UT_WITHDRAW_PATH = "/ut/order/?/withdraw";
        public const string ORDER_UT_CANCEL_PATH = "/ut/order/?/cancel";

        public const string ORDER_FT_FX_FXMN_ORDER_DETAIL_PATH = "/{0}/orders/{1}/{2}";


        public const string OSPOSITION_LIST_PATH = "/global/osposition";

        public const string OSPOSITION_STOCK_CONTRACT_DETAIL_PATH = "/st/osposition/contract";
        public const string OSPOSITION_STOCK_CONTRA_DETAIL_PATH = "/st/osposition/contra";

        public const string OSPOSITION_UT_DETAIL_FROMYOU_PATH = "/ut/osposition/fromyou";
        public const string OSPOSITION_UT_DETAIL_TOYOU_PATH = "/ut/osposition/toyou";

        public const string TRANSACTION_HISTORY_STOCK_LIST_PATH = "/st/transactionhistory";
        public const string TRANSACTION_HISTORY_CFD_LIST_PATH = "/cfd/transactionhistory";

        public const string TRADE_STOCK_INFO_PATH = "/st/trade/info";
        public const string TRADE_STOCK_TYPE_SETTINGS_PATH = "/st/trade/settings";
        public const string TRADE_STOCK_LIMITBALANCE_PATH = "/st/trade/limitbalance";
        public const string TRADE_STOCK_VALIDATE_PATH = "/st/trade/validate";
        public const string TRADE_STOCK_SUBMIT_PATH = "/st/trade/submit";

        public const string TRADE_CFD_INFO_PATH = "/cfd/trade/info";
        public const string TRADE_CFD_LIMITBALANCE_PATH = "/cfd/trade/limitbalance";
        public const string TRADE_CFD_LIMITORDER_PATH = "/cfd/trade/limitorder";
        public const string TRADE_CFD_VALIDATE_PATH = "/cfd/trade/validate";
        public const string TRADE_CFD_SUBMIT_PATH = "/cfd/trade/submit";

        public const string TRADE_UT_INFO_PATH = "/ut/trade/info";
        public const string TRADE_UT_SWITCH_IN_COUNTER_PATH = "/ut/trade/switchincounter";
        public const string TRADE_UT_VALIDATE_PATH = "/ut/trade/validate";
        public const string TRADE_UT_SUBMIT_PATH = "/ut/trade/submit";
        public const string TRADE_UT_BASKET_ADD_PATH = "/ut/trade/basket/add";
        public const string TRADE_UT_BASKET_GET_PATH = "/ut/trade/basket/get";
        public const string TRADE_UT_BASKET_GETBYGROUP_PATH = "/ut/trade/basket/getbygroup";
        public const string TRADE_UT_BASKET_UPDATE_PATH = "/ut/trade/basket/update";
        public const string TRADE_UT_BASKET_DELETE_PATH = "/ut/trade/basket/delete";
        public const string TRADE_UT_BASKET_VALIDATE_PATH = "/ut/trade/basket/validate";
        public const string TRADE_UT_BASKET_SUBMIT_PATH = "/ut/trade/basket/submit";
        public const string TRADE_UT_BASKET_COUNT_PATH = "/ut/trade/basket/count";
        public const string TRADE_UT_SALES_CHARGE_BUY_PATH = "/ut/trade/salescharge/buy";
        public const string TRADE_UT_SALES_CHARGE_SWITCHIN_PATH = "/ut/ trade/salescharge/switchin";

        public const string TRADE_FT_FX_FXMN_INFO_PATH = "/{0}/orders/tradeinfo";
        public const string TRADE_FT_FX_FXMN_VALIDATE_PATH = "/{0}/orders/validate";
        public const string TRADE_FT_FX_FXMN_SUBMIT_PATH = "/{0}/orders";
        public const string TRADE_FX_FXMN_AMEND_PATH = "/{0}/orders/amend/{1}";
        public const string TRADE_FT_FX_FXMN_WITHDRAW_PATH = "/{0}/orders/withdraw/{1}";



        public const string PORTFOLIO_ALL_EQUITYBALANCE_PATH = "/global/portfolio/equitybalance";
        public const string PORTFOLIO_STK_ACCOUNTDETAILS_PATH = "/st/portfolio/accountdetails";
        public const string PORTFOLIO_CFD_ACCOUNTDETAILS_PATH = "/cfd/portfolio/accountdetails";
        public const string PORTFOLIO_UT_ACCOUNTDETAILS_PATH = "/ut/portfolio/accountdetails";

        public const string PORTFOLIO_ST_HOLDING_PATH = "/st/portfolio/holdings";   
        public const string PORTFOLIO_UT_HOLDING_PATH = "/ut/portfolio/holdings";

        public const string PORTFOLIO_CFD_POSITIONS_PATH = "/cfd/portfolio/positions";
        public const string PORTFOLIO_CFD_POSITION_DETAILS_PATH = "/cfd/portfolio/positions/{0}/{1}/{2}";//0:tradeDate  1:orderNo   2:subOrderNo

        public const string PORTFOLIO_GLOBAL_DISCLAIMER_PATH = "/global/portfolio/disclaimer";







        //不能缺少最前边斜杠“/”
        public const string ACCOUNT_FT_FX_FXMN_NFX_PATH = "/{0}/account";
        public const string NET_POSITION_FT_FX_FXMN_SUMMARY_PATH = "/{0}/position/all";
        public const string NET_POSITION_FT_FX_FXMN_DETAIL_PATH = "/{0}/position/{1}/{2}/{3}";

        public const string SETTINGS_PMP_PATH = "/global/settings/pmp";
        public const string SETTINGS_PMP_WEBSOCKET_PATH = "/global/settings/websocketPMP";
        public const string SETTINGS_PMP_ACCOUNT_PATH = "/global/settings/account";
        public const string SETTINGS_PMP_UPDATE_PATH = "/global/settings/account/update";
        public const string SETTINGS_PRODUCT_ACCESS_PATH = "/global/settings/productaccess";

    }
}