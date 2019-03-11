$(document).ready(function () {

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
    //function testing yes or no WeiXin Browser
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
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
        var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
        return (prePath + postPath);
    }

    var rootpath = getRootPath();
    //user name blur touch function
    $("#vAccount").blur(function () {
        var thisval = $(this).val();
        if (thisval != "") {
            thisval = "000000" + thisval;
            thisval = thisval.substr(thisval.length - 7, 7);
        }
        //$(this).val(thisval); 
        $("#vAccount").val(thisval);
    });

    function LanguageEnglish(type) {
        str = "By logging in, you are bound by the Terms and Conditions.";
        strs = "Phillip Securities Pte Ltd and Phillip Futures Pte Ltd (Members of PhillipCapital) are regulated by Monetary Authority of Singapore.(Co. Reg. No. 197501035Z and 198305695G)";
            $("#vAccount").attr("placeholder", "Account");
            $("#vPassword").attr("placeholder", "Password");
            $("#Login").text("Login");
            $("#forgotpss").text("Forgot Password?");
            $("#SMS").text("SMS");
            $("#Token").text("Token");
            $("#Login-2FA-Verification .weui_dialog_bd span").text("OTP-Token");
            $("#OTP").text("Get OTP");
            $("#Login-2FA-Verification .Login_Verification_submit").text("Submit");
            $("#Login-2FA-Verification .Return").text("Skip>>");
            $("#Login-dialog .dialog_bm a").text("OK");
            $("#statement p:nth-child(1) button").eq(0).text("Agree");
            $("#statement p:nth-child(1) button").eq(1).text("Disagree");
            $(".LanguageSwitch-left").text("Language:");
            $(".LanguageSwitch-right span").eq(0).text("中文");
            $(".LanguageSwitch-right span").eq(1).text("English");
            $(".LanguageSwitch-right input").eq(0).removeAttr("checked");
            $(".LanguageSwitch-right input").eq(1).attr("checked", "checked");
            $(".Login-Bottom button").css("letterSpacing", "0px");
            $("#statement p:last-child a:first-child").text("Terms and Conditions");
            $("#statement p:last-child a:first-child").css("width","52%");
            $("#statement p:last-child a:last-child").text("Security Advisory");
            $("#statement p:last-child a:last-child").css("width","48%");
            $("#statement p:first-child").text(str);
            $("#statement p").eq(2).text(strs);
    }
    function LanguageChinese(type) {
        str = "当您登陆后, 表示您已了解并同意以下条件条款";
            strs = "辉立证券和辉立期货私人有限公司（辉立资本成员）均由新加坡金融管理局监管。公司注册号码 (Co. Reg. No. 197501035Z 和 198305695G)";
            //str = "当您登陆后,表示您已了解并同意以下条件条款";
            //strs = "辉立资本由新加坡金融管理局监管。公司注册号码（Co. Reg. No.197501035Z）";
            $("#vAccount").attr("placeholder", "账号");
            $("#vPassword").attr("placeholder", "密码");
            $("#Login").text("登录");
            $("#forgotpss").text("忘了密码?");
            $("#SMS").text("短信验证");
            $("#Token").text("令牌");
            $("#Login-2FA-Verification .weui_dialog_bd span").text("OTP令牌");
            $("#OTP").text("获取OTP");
            $("#Login-2FA-Verification .Login_Verification_submit").text("提交");
            $("#Login-2FA-Verification .Return").text("跳过>>");
            $("#Login-dialog .dialog_bm a").text("确认");
            $("#statement p:nth-child(2) button").eq(0).text("同意");
            $("#statement p:nth-child(2) button").eq(1).text("不同意");
            $(".LanguageSwitch-left").text("语言设置:");
            $(".LanguageSwitch-right span").eq(0).text("中文");
            $(".LanguageSwitch-right span").eq(1).text("English");
            $(".LanguageSwitch-right input").eq(1).removeAttr("checked");
            $(".LanguageSwitch-right input").eq(0).attr("checked", "checked");
            $(".Login-Bottom button").css("letterSpacing", "4px");
            $("#statement p:last-child a:first-child").text();
            $("#statement p:last-child a:last-child").text();
            $("#statement p:last-child a:first-child").text("条件条款");
            $("#statement p:last-child a:first-child").css("width", "49%");
            $("#statement p:last-child a:last-child").text("安全须知");
            $("#statement p:last-child a:last-child").css("width", "49%");
            $("#statement p:first-child").text(str);
            $("#statement p").eq(2).text(strs);
    }
    var wec_language = (navigator.browserLanguage || navigator.language).toLowerCase();
    wec_language = wec_language.substring(0, 2);
    var times = 0;
    //默认重置
    function LanguageSwitch() {
        if (localStorage.LanguageSwitch_v1 != "1" && localStorage.LanguageSwitch_v1 != "2")
        {
            if (wec_language == "en")
                localStorage.LanguageSwitch_v1 = "1";
            else// if (wec_language == "zh")
                localStorage.LanguageSwitch_v1 = "2";
        }
        if (localStorage.LanguageSwitch_v1 == undefined || localStorage.LanguageSwitch_v1 == "2") {
            LanguageChinese();
            $("#loading").css("background", "transparent");
            //SwitchEment();
            var language = localStorage.LanguageSwitch_v1;
            $.get(rootpath + "/Base/SetLanguage?language=" + language, function (d) {
                $("#loading").hide();
            });
            
        } else {
            LanguageEnglish();
            //SwitchEment();
            $("#loading").css("background", "transparent");
            var language = localStorage.LanguageSwitch_v1;
            $.get(rootpath + "/Base/SetLanguage?language=" + language, function (d) {
                $("#loading").hide();
            });
        }
    }
    LanguageSwitch();

    //Switch
    $(".LanguageSwitch-right input").eq(0).click(function () {
        localStorage.LanguageSwitch_v1 = "2";
        language = localStorage.LanguageSwitch_v1;
        $.get(rootpath + "/Base/SetLanguage?language=" + language, function (d) {
            LanguageSwitch();
        });
    });
    $(".LanguageSwitch-right input").eq(1).click(function () {
        localStorage.LanguageSwitch_v1 = "1";
        language = localStorage.LanguageSwitch_v1;
        $.get(rootpath + "/Base/SetLanguage?language=" + language, function (d) {
            LanguageSwitch();
        });
    });
    //$("#LanguageSwitch .Switch-btn").click(function () {
    //    if (times % 2 == 0) {
    //        localStorage.LanguageSwitch_v1 = "1";
    //        language = localStorage.LanguageSwitch_v1;
    //        $.get(rootpath + "/Base/SetLanguage?language=" + language, function (d) {
    //        });

    //    } else {
    //        localStorage.LanguageSwitch_v1 = "2";
    //        language = localStorage.LanguageSwitch_v1;
    //        $.get(rootpath + "/Base/SetLanguage?language=" + language, function (d) {
    //        });
    //    }
    //    times++;
    //});
    ////切换样式
    //function SwitchEment(type) {
    //    if (localStorage.LanguageSwitch_v1 == undefined || localStorage.LanguageSwitch_v1 == "2") {
    //        $(".LanguageSwitch-Text").text("English");
    //        //$(".LanguageSwitch-right").css("width", "170%");
    //        //$(".Switch-div").css("background", "#fff");
    //        //var pre = Number($(".Switch-div").width());
    //        //w = Number($("#LanguageSwitch .Switch-btn").width());
    //        //$("#LanguageSwitch .Switch-btn").animate({ "marginLeft": (pre - w) + "px" }, 500);
    //    } else {
    //        $(".LanguageSwitch-Text").text("简体中文");
    //        //$(".LanguageSwitch-right").css("width", "192%");
    //        //$(".Switch-div").css("background", "#4ED966");
    //        //var pre = Number($(".Switch-div").width());
    //        //w = Number($("#LanguageSwitch .Switch-btn").width());
    //        //$("#LanguageSwitch .Switch-btn").animate({ "marginLeft": "0px" }, 500);
    //    }

    //}

    $("#vPassword").keydown(function (event) {
        if (event.keyCode == 13) {
            $("#Login").click();
        }
    });

    //Sign in cueing information
    function ShowAlert(mess) {
        $('#Login-dialog .dialog_bd').text(mess);
        $('#Login-dialog').show().on('click', '.dialog_bm', function () {
            $("#vPassword").val("");
            //location.reload();
            $('#Login-dialog').off('click').hide();
        });
    }

    function fnGetRPIN(spin, rsa) {
        e2ee_rng_seed_time();
        return rsa.encryptPIN1(spin);
    }

    //Sign in testing click event
    $("#Login").click(function () {

        $("#loading").show();
        var vAccountNo = $("#vAccount").val();
        var vPassword = $("#vPassword").val();
        $("#vAccount").val("");
        $("#vPassword").val("");
        //var newDataTimes = DayTime();
        //var Refresh = newdattime(newDataTimes);

        //if (Refresh) {
        //    $("#loading").hide();
        //    ShowAlert("overtime click ok to refresh.");
        //    return;
        //}

        if (vAccountNo.length <= 0) {
            $("#loading").hide();
            ShowAlert("Please input account");
            return;
        }

        if (vPassword.length <= 0) {
            $("#loading").hide();
            ShowAlert("Please input password");
            return;
        }
        if (localStorage.LanguageSwitch_v1 == undefined) {
            localStorage.LanguageSwitch_v1 = "2";
        }
        var language = localStorage.LanguageSwitch_v1;

        $.get(rootpath + "/Base/SetLanguage?language=" + language, function (d) {
            $.get(rootpath + "/Base/Presession", function (d) {
                var o = JSON.parse(d);
                if (o["code"] == 1) {

                    localStorage.publicKey = o["publicKey"];
                    localStorage.sessionID = o["sessionID"];
                    localStorage.randomNo = o["randomNo"];
                    //localStorage.md5pwd = md5 = hex_md5(vPassword);
                    if (localStorage.accountNo == undefined) {
                        localStorage.PortfolioDisclaimer = "false";
                        localStorage.PositionsDisclaimer = "false";
                    }


                    var publicKey = localStorage.publicKey;

                    var rsa = new RSAEngine();
                    if (publicKey.length > 0) {
                        rsa.init(localStorage.publicKey, localStorage.sessionID, localStorage.randomNo);
                        var rPIN = fnGetRPIN(vPassword, rsa);
                        $.post(rootpath + "/Base/Authenticate","accountNo=" + vAccountNo + "&passwordE2ee=" + rPIN, function (d) {
                            var o = JSON.parse(d);
                            if (o["code"] == 1) {

                                if (localStorage.accountNo != vAccountNo) {
                                    delete localStorage.TradeHistorys;
                                }
                                localStorage.accountNo = vAccountNo;
                                localStorage.accountType = o["accountType"];
                                localStorage.tradeEnable = o["tradeEnable"];

                                if (o["twoFARequired"] == true) {
                                    $.get(rootpath + "/Base/Twofa", function (d) {
                                        var o = JSON.parse(d);
                                        if (o["code"] == 1) {
                                            var arry = [];
                                            //arry.push(o["linkUsers"][0]["nafUserName"], o["linkUsers"][0]["device"][0]["id"], o["linkUsers"][0]["spid"], o["linkUsers"][0]["device"][0]["type"], o["linkUsers"][0]["device"][1]["id"], o["linkUsers"][0]["device"][1]["type"]);
                                            var nafusername = o["linkUsers"][0]["nafUserName"];
                                            var spid = o["linkUsers"][0]["spid"];
                                            var deviceID="-", type="0", smsDeviceID="-", smsType="0";
                                            for (var i = 0; i < o["linkUsers"][0]["device"].length; i++)
                                            {
                                                var id=o["linkUsers"][0]["device"][i]["id"];
                                                if (id.substring(0, 2) == "VA") {
                                                    deviceID = id;
                                                    type = o["linkUsers"][0]["device"][i]["type"];
                                                }
                                                else if (id.substring(0, 2) == "VB") {
                                                    smsDeviceID = id;
                                                    smsType = o["linkUsers"][0]["device"][i]["type"];
                                                }
                                            }
                                            arry.push(nafusername, deviceID, spid, type, smsDeviceID, smsType);
                                            $("#loading").hide();
                                            twoFAinfo(arry)
                                        }
                                        else {
                                            $("#loading").hide();
                                            ShowAlert(o["msg"]);
                                        }
                                    });
                                }
                                else {
                                    if (localStorage.LanguageSwitch_v1 == "1") {
                                        window.location.href = rootpath + "/Base/Index";
                                    } else {
                                        window.location.href = rootpath + "/Base/IndexChinese";
                                    }

                                }
                            }
                            else {
                                $("#loading").hide();
                                ShowAlert(o["msg"]);
                            }
                        });
                    }
                }
                else {
                    $("#loading").hide();
                    ShowAlert(o["msg"]);
                    return;
                }

            });
        });


    });

    function twoFAinfo(arry) {
        var str = "";
        for (var i = 0; i < arry.length; i++) {
            str += arry[i] + " ";
        }
        $("#input_text").attr("twoFa", str);
        $("#Login-2FA-Verification").show();
    }
    $("#OTP").click(function () {
        var twoFa = $("#input_text").attr("twoFa");

        var arry = twoFa.split(" "); arry.pop();
        var nafUserName = arry[0];
        var twoFADeviceId = arry[4];
        var spid = arry[2];

        $.post(rootpath + "/Base/sendSmsOtp", "nafUserName=" + nafUserName + "&twoFADeviceId=" + twoFADeviceId + "&spid=" + spid, function (d) {
            var o = JSON.parse(d);
            var challenge = o["challenge"];
            $("#input_text").attr("challenge", challenge);
        });
    });

    $(".Login_Verification_submit").click(function () {
        var type = 1;
        var name_text = $("#OTP").css("display");
        //var name_text = $("#name_text").css("display");
        if (name_text == "none") {
            type = 0;
        }
        TwofaAuth(type);
    });

    function TwofaAuth(type) {
        var twoFAData = $("#input_text").val();
        var twoFa = $("#input_text").attr("twoFa");

        var arry = twoFa.split(" "); arry.pop();
        var nafUserName = arry[0];
        var twoFADeviceId = arry[1]
        var twoFADeviceId1 = arry[4];
        var spid = arry[2];
        var type2 = arry[3]
        var type1 = arry[5]
        var challenge = $("#input_text").attr("challenge");

        if (type == 1) {
            $.post(rootpath + "/Base/TwofaAuth", "nafUserName=" + nafUserName + "&twoFADeviceId=" + twoFADeviceId1 + "&spid=" + spid + "&twoFAData=" + twoFAData + "&type=" + type1 + "&challenge=" + challenge, function (d) {
                var o = JSON.parse(d);

                if (o["code"] == 1) {
                    $("#Login-2FA-Verification").hide();
                    if (localStorage.LanguageSwitch_v1 == "1") {
                        window.location.href = rootpath + "/Base/Index";
                    } else {
                        window.location.href = rootpath + "/Base/IndexChinese";
                    }
                }
                else {
                    ShowAlert(o["msg"]);
                }
            });
        }
        else {
            $.post(rootpath + "/Base/TwofaAuth", "nafUserName=" + nafUserName + "&twoFADeviceId=" + twoFADeviceId + "&spid=" + spid + "&twoFAData=" + twoFAData + "&type=" + type2, function (d) {
                var o = JSON.parse(d);

                if (o["code"] == 1) {
                    $("#Login-2FA-Verification").hide();
                    if (localStorage.LanguageSwitch_v1 == "1") {
                        window.location.href = rootpath + "/Base/Index";
                    } else {
                        window.location.href = rootpath + "/Base/IndexChinese";
                    }
                }
                else {
                    ShowAlert(o["msg"]);
                }
            });
        }

    }

    //2FA
    $("#Token").click(function () {
        $("#SMS").css("background", "#46AB2C");
        $("#SMS").css("color", "#000");
        var Token = $(this);
        $("#OTP").hide();
        Token.css("background", "#ccc");
        Token.css("color", "#f2f2f2");
    });
    $("#SMS").click(function () {
        $("#Token").css("background", "#46AB2C");
        $("#Token").css("color", "#000");
        var SMS = $(this);
        $("#OTP").show();
        SMS.css("background", "#ccc");
        SMS.css("color", "#f2f2f2");
    });
    $(".Exit").click(function () {
        readyYesterday = "";
        $("#loading").show();
        $.get(rootpath + "/Base/logout", function (d) {
            var o = JSON.parse(d);
            if (o["code"] == 1) {
                LogoutDelete();
            } else if (o["code"] == -1000) {
                LogoutDelete();
            } else {
                LogoutDelete();
            }
        }).always(function () {
            $("#loading").hide();
        });
    });

    function LogoutDelete() {
        delete localStorage.sessionID;
        delete localStorage.randomNo;
        delete localStorage.publicKey;
        delete localStorage.accountType;
        delete localStorage.tradeEnable;
        delete localStorage.rasflag;
        WeixinJSBridge.call('closeWindow');
        return;
    }

    //window.onfocus=function () {
    //    TimedRefresh();
    //};
    //window.onblur=function () {
    //    TimedRefresh();
    //};
    //function TimedRefresh() {
    //    var times = setInterval(function () {
    //        location.reload();
    //        clearInterval(times);
    //    }, 120000);
    //}

    $(".Agree").click(function () {
        $("#statement").hide();
    });
    $(".Disagree").click(function () {
        WeixinJSBridge.call('closeWindow');
    });
    //function DayTime() {
    //    var DataTime = new Date();
    //    m = DataTime.getMinutes();
    //    s = DataTime.getSeconds();
    //    return  strs = m + "" + s;
    //}
    //DataTimes = DayTime();

    //function newdattime(time) {

    //    if (time.length < 4 || DataTimes.length < 4) {
    //        time = "0000" + time;
    //        time = time.substring(time.length - 4);
    //        DataTimes = "0000" + DataTimes;
    //        DataTimes = DataTimes.substring(DataTimes.length - 4);
    //    }
    //    var ms = time - DataTimes;
    //    if (ms < 0) {
    //        ms = ms.toString;
    //        ms = parseInt(ms.replace("-", ""));
    //        if (ms > 30) 
    //            return Refresh = true;
    //            return Refresh = false;
    //    } else {
    //        if (ms > 30) 
    //            return Refresh = true;
    //            return Refresh = false;
    //    }
    //}
});
//后续增加代码
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
            url: 'https://www.phillip.com.cn/weuiT3/Base/Login'
        };
        window.history.pushState(state, 'title', "");
    }
})