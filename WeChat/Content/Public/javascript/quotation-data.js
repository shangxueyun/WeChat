
var pmpuser = "test";
var pmppass = "pwd";
var pmpmap = {};

var timeout = null;
var pmpmaptopics=[];
var pmpIndex = 0;
var pmpIsForex = false;

var rootpath = getRootPath();
var leftHight = 49;
var variable = 0;
var m = 0;
var DataTimes;
var PmpdataSettings = {};
var pmpdatamap = {};
var pmpdatatime = null;
var FormInfoUT = {};

var scrolling = false;
var scrollingX = false;
var keyupInput = false;

var AccountNo = localStorage.randomNo;
var accountNo = localStorage.accountNo;
var arryEleDom;
var keywords = [];
var checkbox = {};
var TradeHistorys = [];
var StateString;
var passwordConfirmation;

function onBridgeReady() {
    WeixinJSBridge.call('hideOptionMenu');
}
function wechatCheck() {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        onBridgeReady();
    }
}
wechatCheck();


(function () {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("Weixin3SBridgeReady", handleFontSize);
            document, attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }
    function handleFontSize() {

        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });

        WeixinJSBridge.on('menu:setfont', function () {
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
        });
    }
})();

function getRootPath() {//获得根目录
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1) + "/";
    return (prePath + postPath);
}

function startPMP() {
    pmpdatatime = setTimeout(flashPMPdata, 200);
    startPMPx();
    return 0;
}
function stopPMP() {
    scrollingX = true;
    pmp.destroy_connection();
}
function subscribeConfirmHandler(o) {
}

function addDataMap(dObj, symb, field) {
    if (dObj[field]) {
        var key = symb + "_" + field;
        pmpdatamap[key] = dObj[field] + "";
    }
}
function flashPMPdata() {
    //for(var key in pmpdatamap){
    //    var uId = $("." + key);
    //    if (uId.length > 0) {

    //    }
    //}
    var topic_key = pmpmaptopics[pmpIndex];
    //symbols.forEarch(function (element, index, array) {});
    for (var i in topic_key) {
        if (scrollingX || scrolling)
            return;
        var symbol = pmpmap[topic_key[i]["topic"]];
            setNvalue2(symbol, "5");
            setNvalue2(symbol, "6");
            setNvalue0(symbol, "7");
            setNvalue0(symbol, "8");
            //setNvalue0(symbol, "47");
            setNvalue(symbol, "9");
            setNvalue(symbol, "10");
            setNvalue(symbol, "11");
            setNvalue(symbol, "13");
            setNvalue(symbol, "15");
            setNvalue(symbol, "16");
            setNvalue(symbol, "17");
            setNvalue(symbol, "18");
            //setNvalue(symbol, "2");
    }
        pmpdatatime = setTimeout(flashPMPdata, 200);
}

function subscribeHandler(o) {
    if (o) {
        if (o.id == "data") {
            for (var i = 0; i < o.val.length; i++) {
                var topic = o.val[i].tpc;
                var dataObject = o.val[i].item[0].val;
                if (dataObject) {
                }
                else {
                    continue;
                }
                //topic = topic.substring(topic.lastIndexOf("\\") + 1);
                var symbol = pmpmap[topic];
                addDataMap(dataObject, symbol, "2");
                addDataMap(dataObject, symbol, "5");
                addDataMap(dataObject, symbol, "6");
                addDataMap(dataObject, symbol, "7");
                addDataMap(dataObject, symbol, "8");
                addDataMap(dataObject, symbol, "9");
                addDataMap(dataObject, symbol, "10");
                addDataMap(dataObject, symbol, "11");
                addDataMap(dataObject, symbol, "13");
                addDataMap(dataObject, symbol, "15");
                addDataMap(dataObject, symbol, "16");
                addDataMap(dataObject, symbol, "17");
                addDataMap(dataObject, symbol, "18");
            }
        }
    }
}
function setNvalue0(symb, field) {
    setvalue0(pmpdatamap[symb + "_" + field], symb, field);
}
function setNvalue(symb, field) {
    setvalue(pmpdatamap[symb + "_" + field], symb, field);
}
function setNvalue1(symb, field) {
    setvalue1(pmpdatamap[symb + "_" + field], symb, field);
}
function setNvalue2(symb, field) {
    setvalue2(pmpdatamap[symb + "_" + field], symb, field);
}

function setOvalue0(dObj, symb, field) {
    setvalue0(dObj[field], symb, field);
}
function setOvalue(dObj, symb, field) {
    setvalue(dObj[field], symb, field);
}
function setOvalue1(dObj, symb, field) {
    setvalue1(dObj[field], symb, field);
}
function setOvalue2(dObj, symb, field) {
    setvalue2(dObj[field], symb, field);
}
function setvalue0(Obj, symb, field) {
    if (Obj) {
        var uId = $("." + symb + "_" + field);
        if (uId.length > 0) {
            var newvalue = Obj + "";
            if (newvalue != uId.text()) {
                uId.text(newvalue);
            }
        }
    }
}
function format1(input) {
    var n = parseFloat(input).toFixed(1);
    var re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
    return n.replace(re, "$1,");
}
function Floatflag(Obj) {
    var newvalue = Obj.replace(",", "");
    if (newvalue.indexOf(".") < 0) {
        return newvalue
    }
    if (Number(newvalue).toString() == "NaN")
        newvalue = "-";
    return newvalue
}
function setvalue(Obj, symb, field) {
    if (Obj) {
        var uId = $("." + symb + "_" + field);
        if (uId.length > 0) {
            var newvalue = Floatflag(Obj);
            if (field == "10") {
                if (newvalue.indexOf(".") > 0 && newvalue.substr(newvalue.length - 2) == "00") {
                    newvalue = format1(newvalue);
                }
            }
            var oldvalue = $("." + symb + "_" + field + ":first").text();
            if (newvalue != oldvalue) {
                uId.text(newvalue);
                if (newvalue.indexOf('-') > -1)
                    uId.css({ backgroundColor: "#05A205", color: "red" });
                else if (newvalue.indexOf('+') > -1)
                    uId.css({ backgroundColor: "#05A205", color: "green" });
                else
                    uId.css({ backgroundColor: "#05A205", color: "#" });
                setTimeout(function () {
                    uId.css({ backgroundColor: "" });
                }, 500);
            }
        }
    }
}
function setvalue2(Obj, symb, field) {
    if (Obj) {
        var uId0 = $("." + symb + "_" + field);
        if (uId0.length > 0) {
            var newvalue = Floatflag(Obj);
            var oldvalue = $("." + symb + "_" + field + ":first").text();
            newvalue = newvalue.replace(/ /g, '');
            oldvalue = oldvalue.replace(/ /g, '');
            if (newvalue != oldvalue) {
                if (newvalue != "" && oldvalue != "") {
                    var fold = parseFloat(oldvalue);
                    var fnew = parseFloat(newvalue);
                    var uId = $("." + symb + "_" + field);
                    uId.text(newvalue);
                    if (fnew > fold) {
                        uId.css({ color: "green" });
                    }
                    else if (fnew < fold) {
                        uId.css({ color: "red" });
                    } setTimeout(function () {
                        uId.css({ color: "#" });
                    }, 500);
                }
            }
        }
    }
}

function clearHighlight() {
    if (connState !== pmp.ConnectionStatus.Active)
    { return; }
    $("div.pmps").css({ backgroundColor: "" });
}
function connectionStatusHandler(o) {
    connState = o;
}


function loginHandler(o) {
    if (o.id == "login" && o.rc == 0)//success
    {
        subscribe(o.wsurl);
    }
    else if (o.id == "login" && o.rc != 0)//fail
    {
        //		alert("login faild. return value:"+o.rc );
    }
    else//unknown error
    {
        //		alert("invalid login handler");		
    }
}

function startPMPx() {
        var mapurls = {};
        for (var key in PmpdataSettings) {
            if (PmpdataSettings[key])
                mapurls[PmpdataSettings[key]] = 1;
        }
        for (var wsurl in mapurls) {
            var ret = pmp.create_connectionByUserName(
                    wsurl,
                    {
                        subscribeHandler: subscribeHandler,
                        subscribeConfirmHandler: subscribeConfirmHandler,
                        connectionStatusHandler: connectionStatusHandler,
                        loginHandler: loginHandler
                    },
                    pmpuser,
                    pmppass
               );
        }
}
function subObj(topic) {
    var subscribeObject = {};
    subscribeObject.tpc = topic;
    var fids = {};
    //fids.fids = "5,6,7,8".split(",");;
    fids.fids = "5,6,7,8,2,9,11,17,15,16,10,13,18".split(",");;
    subscribeObject.param = fids;
    return subscribeObject;
}
function subscribe(wsurl) {
    var subscribeObjects = [];
    for (var j = 0; j < pmpmaptopics[0].length; j++) {
        var topic = pmpmaptopics[0][j]["topic"];
        var urlkey = pmpmaptopics[0][j]["urlkey"];
        var url = PmpdataSettings[urlkey];
        if (url == wsurl)
            subscribeObjects.push(subObj(topic));
    }
    pmp.subscribe(subscribeObjects, wsurl);
}
//后续增加代码
function startPMPTime() {
    var datatime;
    datatime = setTimeout(function () {
        scrollingX = false;
        startPMP();
        scrollingX = false;
        startPMP();
        clearTimeout(datatime);
    }, 1000);
}
startPMPTime();
$(function () {
    getHistory();
    var flag = false;
    setTimeout(function () {
        flag = true
    }, 1000)
    window.addEventListener('popstate', function (e) {
        location.reload();
    }, false);
    function getHistory() {
        var state = {
            title: '',
            url: 'https://www.phillip.com.cn/weuiT3/Base/Index'
        };
        window.history.pushState(state, 'title', "");
    }
})
window.onload = function () {
    function reSize() {
        var clientHeight = document.body.clientHeight;
        var _focusElem = null; //输入框焦点
        //利用捕获事件监听输入框等focus动作
        document.body.addEventListener("focus", function (e) {
            _focusElem = e.target || e.srcElement;
        }, true);
        window.addEventListener("resize", function () {
            eleDOc();
            var H = $("#Watchlist-content .information-name-left ul").height();
            if (document.body.clientHeight < clientHeight) {
                //焦点元素滚动到可视范围的底部(false为底部)

                $("#Watchlist-content .information-name-left ul").height(H - 116 + "px");
                $("#Watchlist-content .information-name-content>div").height(H - 116 + "px");
                $(".Trade-Top-div .Detail-content-top + div").height("15.3rem");
            } else {

                $("#Watchlist-content .information-name-left ul").height(H + 116 + "px");
                $("#Watchlist-content .information-name-content>div").height(H + 116 + "px");
                $(".Trade-Top-div .Detail-content-top + div").height("14rem");
            }

        });
    }
    eleDOc();
    reSize();
}
function eleDOc() {
    var hl = $(document).height(), t;
    t = hl - 216;
    $(".Trade-Top-div .Detail-content-top").css("height", t + "px");
}

$(document).focus(function () {
    TimedRefresh();
});
$(document).blur(function () {
    TimedRefresh();
});
function TimedRefresh() {
    var times = setInterval(function () {
        location.reload();
        clearInterval(times);
    }, 120000);
}