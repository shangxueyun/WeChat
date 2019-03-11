
$(document).ready(function () {

    var myApp = new Framework7(
    {
        // Default title for modals
        //modalTitle: 'My App',

        // If it is webapp, we can enable hash navigation:
        pushState: true,
        swipeBackPage: false,

        modalButtonOk: 'OK',
        fastClicks: false,
        modalButtonCancel: 'Cancel',
        modalCloseByOutside: true,
        actionsCloseByOutside: true,
        popupCloseByOutside: true,

        // Hide and show indicator during ajax requests
        onAjaxStart: function (xhr) {
            myApp.showIndicator();
        },
        onAjaxComplete: function (xhr) {
            myApp.hideIndicator();
        }
    }
    );

    function menusHide() {
        if ($("#menus-black-div").css("display") == "none") {
            myApp.fastClicks = !0;
        }
        $("#menus-black-div").on("click", function () {
            if ($(this).css("display") == "block") {
                myApp.fastClicks = false;
            }
        });
    }
    $(".Menus-Black").click(function () {
        menusHide();
    });

    $(".panel-overlay").click(function () {
        menusHide();
    });

    function tradeEnable() {
        var tradeEnable = localStorage.tradeEnable;

        if (tradeEnable == undefined || tradeEnable == 1) {
            $("#Trades").show();
        } else {
            $("#Trades").hide();
        }
        $("#loading").css("background", "transparent");
        $("#loading").hide();

    }
    tradeEnable();

    function InputFocus(ele) {
        $(ele + " input[type='number']").unbind("blur");
        $(ele + " input[type='number']").blur(function () {
            var thisValue = $(this).val();

            if (thisValue.indexOf("-") != -1) {
                thisValue = thisValue.replace(/-/g, "");
                $(this).val(thisValue);
                return;
            }
            $(this).val(thisValue);
        });
    }

    function LanguageSwitch() {
        if (localStorage.LanguageSwitch_v1 == undefined || localStorage.LanguageSwitch_v1 == "2") {
            var language = localStorage.LanguageSwitch_v1;
            $.get(rootpath + "/Base/SetLanguage?language=" + language, function (d) {
                $("#loading").css("background", "transparent");
                window.location.href = rootpath + "/Base/IndexChinese";
            });
        } else {
            var language = localStorage.LanguageSwitch_v1;
            $.get(rootpath + "/Base/SetLanguage?language=" + language, function (d) {
                $("#loading").css("background", "transparent");
            });
        }
    }
    LanguageSwitch();

    //storage twofaRAS data
    var AWfacheckbox = {};
    //checked flg
    var checked;
    //get rasflag value
    function rasflag() {
        $("#loading").show();
        $.get(rootpath + "/Base/Twofa", function (d) {
            var o = JSON.parse(d);
            if (o["code"] == 1) {
                if (o["rasflag"] == false) {
                    //RAS
                    var obj = o["twofaRAS"];
                    for (var i = 0; i < obj.length; i++) {
                        var arry = [];
                        if (i == 0) {
                            arry["title"] = "<ol><li>" + obj[i]["title"] + "</li>";
                            arry["description"] = "<p>" + obj[i]["description"] + "</p><p><input type='" + obj[i]["content"][0]["type"] + "'/>  " + obj[i]["content"][0]["description"] + " ";
                            arry["description"] += "<a link='RAS' href='" + obj[i]["content"][0]["externalLink"] + "'>" + obj[i]["content"][0]["externalLinkDisplay"] + ".</a></p>";
                            arry["action"] = "<a href='javascript:;'  disabled='disabled' id='twoFA_proceed'>" + obj[i]["action"][1]["text"] + "</a>";
                        }
                        else {
                            arry["title"] = "<li>2FA Signup</li></ol>";
                            arry["description"] = "<p>" + obj[i]["description"] + "</p><p>" + obj[i]["content"][0]["description"] + "</p>";
                            arry["action"] = "";

                        }
                        AWfacheckbox[i] = arry;
                    }
                    twofaRAS(AWfacheckbox);
                    $("#twoFA_content").show();
                    $("#loading").hide();
                    return;
                } else {
                    acquirePage(localStorage.page);
                    return;
                }
            } else {
                acquirePage(localStorage.page);
                $("#loading").hide();
                return;
            }
        });
    }
    rasflag();
    //fill 2FA UI
    function twofaRAS(AWfacheckbox) {
        $(".twoFA_hd_bom").empty();
        $(".dialog_tt").empty();
        $(".dialog_tt").append(AWfacheckbox[0]["description"]);
        var link = $(".dialog_tt a[link]").attr("href");
        $(".dialog_tt a[link]").removeAttr("href");
        $(".dialog_tt a[link]").attr("onclick", "window.open('" + link + "')");

        if (AWfacheckbox.length > 0) {
            $(".twoFA_hd_bom").append(AWfacheckbox[0]["title"] + AWfacheckbox[1]["title"]);
            $(".twoFA_content .twoFA_hd_bom li:last-child").css("padding", "0.4rem 0 0.46rem 0");
        }
        else {
            $(".twoFA_hd_bom").append(AWfacheckbox[0]["title"] + "<li></li>");
            $(".twoFA_content .twoFA_hd_bom li:last-child").css("padding", "0");
        }

        //Access without 2FA and 2FA Signup Switch
        $(".twoFA_hd_bom li:first-child").on("click", function () {
            var Signup = $(".twoFA_hd_bom li:last-child");
            var AWfa = $(".twoFA_hd_bom li:first-child");
            AWfa.css("background", "orange");
            Signup.css("background", "transparent");
            $(".twoFA_content .dialog_tt p").css("paddingBottom", "0");
            //Switch centent
            $(".twoFA_content .dialog_tt").empty();
            $(".twoFA_content .dialog_tt").append(AWfacheckbox[0]["description"]);
            $(".twoFA_content .weui_btn_Two").empty();
            $(".twoFA_content .weui_btn_Two").append(AWfacheckbox[0]["action"]);
            $(".dialog_tt a[link]").removeAttr("href");
            $(".dialog_tt a[link]").attr("onclick", "window.open('" + link + "')");
            $(".twoFA_content .weui_btn_Two").show();

            if (checked == true) {
                $("#twoFA_proceed").removeAttr("disabled");
                $("#twoFA_proceed").css("color", "#f2f2f2");
                $("#twoFA_proceed").css("background", "#12d812");
                $(".dialog_tt input").attr("checked", "true")
            }
            $(".dialog_tt input").on("change", function () {
                FAchecked($(this));
            });
        });
        $(".twoFA_hd_bom li:last-child").on("click", function () {
            var Signup = $(".twoFA_hd_bom li:last-child");
            var AWfa = $(".twoFA_hd_bom li:first-child");
            AWfa.css("background", "transparent");
            Signup.css("background", "orange");
            //Switch centent
            $(".twoFA_content .dialog_tt").empty();
            $(".twoFA_content .dialog_tt").append(AWfacheckbox[1]["description"]);
            $(".twoFA_content .weui_btn_Two").empty();
            $(".twoFA_content .weui_btn_Two").append(AWfacheckbox[1]["action"]);
            $(".twoFA_content .dialog_tt p").css("paddingBottom", "1rem");
            $("#twoFA_proceed").attr("disabled", "disabled");
            $("#twoFA_proceed").css("color", "#ccc");
            $(".twoFA_content .weui_btn_Two").hide();
        });
        $(".dialog_tt input").on("change", function () {
            FAchecked($(this));
        });
    }
    //twoFA_proceed click function
    function FAchecked(ele) {
        if (ele.is(':checked') == true) {
            checked = ele.is(':checked');
            $("#twoFA_proceed").removeAttr("disabled");
            $("#twoFA_proceed").css("color", "#f2f2f2");
            $("#twoFA_proceed").css("background", "#12d812");
            //$(".twoFA_content .dialog_tt p:last-child a").css("color","orange");
            //$(".twoFA_content .dialog_tt p:last-child").css("color","orange");
            $("#twoFA_proceed").unbind("click");
            $("#twoFA_proceed").click(function () {
                $.post(rootpath + "/Base/SendAcknowledgeRAS", "acknowledge=1", function (d) {
                    var o = JSON.parse(d);
                    if (o["code"] == 1) {
                        $("#twoFA_content").hide();
                        acquirePage(localStorage.page);
                    }
                    else {
                        ShowAlert(o["msg"]);
                        return;
                    }
                });
            });
        }
        else {
            checked = ele.is(':checked');
            $("#twoFA_proceed").attr("disabled", "disabled");
            $("#twoFA_proceed").css("color", "#f2f2f2");
            $("#twoFA_proceed").css("background", "#ccc");
            //$(".twoFA_content .dialog_tt p:last-child a").css("color","#333");
            //$(".twoFA_content .dialog_tt p:last-child").css("color","#333");
        }
    }
    //Switch
    $(".LanguageSwitch-right input").eq(0).click(function () {
            localStorage.LanguageSwitch_v1 = "2";
            language = localStorage.LanguageSwitch_v1;
            window.location.href = rootpath + "/Base/IndexChinese";
    });

    //function testing yes or no WeiXin Browser
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }

    function fnGetRPIN(spin, rsa) {
        e2ee_rng_seed_time();
        return rsa.encryptPIN1(spin);
    }

    var $$ = Dom7;

    var mainView = myApp.addView('.view-watchlist', {
        //dynamicNavbar: true,
        domCache: true 
    });
    var tradeView = myApp.addView('.view-trade', {
        //dynamicNavbar: true,
        domCache: true 
    });
    var tradeView = myApp.addView('.view-ordstats', {
        //dynamicNavbar: true,
        domCache: true 
    });
    var tradeView = myApp.addView('.view-portfolio', {
        //dynamicNavbar: true,
        domCache: true 
    });
    var tradeView = myApp.addView('.view-position', {
        //dynamicNavbar: true,
        domCache: true 
    });
    
    //0379139
    //0534058
    //0252070
    //UT test Account
    //0374170
    //0558244
    //http://localhost:2474/weui/trade/UtValidateOrder?counterId=UT/UT/UT/580703&action1=Switch&fundSource=2048&paymentCurrency=SGD&invAmount=1100&switchInID=UT/UT/UT/501010
    myApp.showTab('#page-1-1');
    myApp.showTab('#page-2-1');
    myApp.showTab('#page-3-1');
    myApp.showTab('#page-4-1');
    myApp.showTab('#page-5-1');

    var mainHtmlMap = {};//title & html
    var readyYesterday = "";

    function ShowAlert(mess, numb) {
        if (mess == "User Session Expired.pls Relogin." || mess == "Your current login session has expired or you are currently logged in elsewhere using the same account.") {
            $('#dialog2 .weui_dialog_bd').text(mess);
            $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
                $('#dialog2').off('click').hide();
                $("#Logout").click();
            });
        }
        //else if (mess == "Request timeout.") {
        //    $('#dialog2 .weui_dialog_bd').text(mess);
        //    $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
        //        $('#dialog2').off('click').hide();
        //        location.reload();
        //    });
        //}
        else {
            $('#dialog2 .weui_dialog_bd').text(mess);
            $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
                $('#dialog2').off('click').hide();
            });
        }
    }

    $("#Logout").click(function () {
        readyYesterday = "";
        $("#loading").show();
        $.get(rootpath + "Base/logout", function (d) {
            var o = JSON.parse(d);
            if (o["code"] == 1) {
                LogoutDelete();
            } else if (o["code"] == -1000) {
                LogoutDelete();
            } else {
                LogoutDelete();
            }
            $("#loading").hide();
            //ShowAlert(o["msg"]);
        }).always(function () {
            $("#loading").hide();
        });

    });

    function LogoutDelete() {

        window.location.href = rootpath + "/Base/Login";
        delete localStorage.sessionID;
        delete localStorage.randomNo;
        delete localStorage.publicKey;
        delete localStorage.accountType;
        delete localStorage.tradeEnable;
        delete localStorage.rasflag;
        $("#loading").hide();
        stopPMP();
        return;
    }
    //<--Watchlist start
    $("#Watchlist").click(function () {
        localStorage.page = "1";
        resetClass();
        $("#tabWatchlist").attr("class", "view tab view-watchlist active");
        $("#loading").show();
        $.get(rootpath + "Watchlist/Watchlist", function (d) {
            var o = JSON.parse(d);
            if (o["code"] == 1) {
                var watchlistDataList = o["watchlistDataList"];
                WatchlistNameUI(watchlistDataList);
                $("#Watchlist-title-Text").on("click", function (event) {
                    $("#Watchlist-drop-down").toggle();
                    $(document).unbind("click");
                    $(document).on("click", function () {
                        $("#Watchlist-drop-down").hide();
                    });
                    event.stopPropagation();
                    return false;
                });
                return;
            }
            $("#loading").hide();
            ShowAlert(o["msg"]);
            return;
        });
    });

    function WatchlistNameUI(obj) {
        $("#Watchlist-drop-down li:not(:first-child)").remove();
        $("#Watchlist-title-Text").unbind("click");
        $(document).unbind("click");
        var WatchlisTtitleText = $("#Watchlist-title-Text");
        var WatchlistDownOne = $("#Watchlist-drop-down li:first-child");
        var Html = "";
        for (var i = 0; i < obj.length; i++) {
            if (i == 0) {
                var name = obj[i]["name"];
                var id = obj[i]["watchlistID"];
                WatchlisTtitleText.text(name);
                WatchlisTtitleText.append("<span></span>");
                WatchlisTtitleText.attr("thisId", id);
                WatchlistNameDetailData(id);
                Html += "<li  style='color:#D47510' id='" + obj[i]["watchlistID"] + "'>" + obj[i]["name"] + "</li>";
            }
            else {
                Html += "<li id='" + obj[i]["watchlistID"] + "'>" + obj[i]["name"] + "</li>";
            }

        }
        WatchlistDownOne.after(Html);
        //后续细节效果再加
        $("#Watchlist-drop-down li:not(:first-child)").on("click", function () {
            var id = this.id;
            var text = $(this).text();
            $("#Watchlist-drop-down li:not(:first-child)").css("color", "#333");
            $(this).css("color", "#D47510");
            WatchlisTtitleText.text(text);
            WatchlisTtitleText.append("<span></span>");
            WatchlisTtitleText.attr("thisId", id);
            WatchlistNameDetailData(id);
            
        });
    }

    function WatchlistNameDetailData(id) {
        $("#loading").show();
        $.get(rootpath + "Watchlist/getWatchlistDetail?watchlistId=" + id, function (d) {
            var o = JSON.parse(d);
            if (o["code"] == 1) {
                scrollingX = true;
                WatchlistName(o["counters"]);
                $("#loading").hide();
                if (keyupInput != false) {
                    ShowAlert(keyupInput);
                    keyupInput = false;
                    return;
                }
                return;
            }
            $("#loading").hide();
            ShowAlert(o["msg"]);
        }).always(function () {
            $("#loading").hide();
        });
    }

    function WatchlistName(obj) {
        var WatchlistContractName = $("#Watchlist-contract-name");
        var InformationNameContent = $("#information-name-content_div");
        var Editdetails = $("#Watchlist-Edit-details .OrderStatus-Detail-content ul");
        WatchlistContractName.empty();
        InformationNameContent.empty();

        var TodayOrder = $("#TodayOrder-contract-name");
        var TodayOrderdetails = $("#TodayOrder-content-details");
        var OrderHistory = $("#OrderHistory-contract-name");
        var OrderHistorydetails = $("#OrderHistory-content-details");
        TodayOrder.empty();
        TodayOrderdetails.empty();
        OrderHistory.empty();
        OrderHistorydetails.empty();
        Editdetails.empty();

        pmpmap = {}
        pmpmaptopics = {};
        pmpmaptopics[0] = [];
        var newarry = [], size = 0, UTarry = [];
        for (var i = 0; i < obj.length; i++) {
            var Topic = obj[i]["pmpTopic"];
            var productIcon = obj[i]["productIcon"];
            var nameDisplay = obj[i]["nameDisplay"];
            var product = obj[i]["product"];
            var market = obj[i]["market"];
            var counterId = obj[i]["counterID"];
            var liveOrDelay = "L";
            var urlkey = product + "_" + market + "_" + liveOrDelay;
            var topic_key = {};
            if (Topic==null)
                Topic = "";
            topic_key["topic"] = Topic;
            topic_key["urlkey"] = urlkey;
            newarry[i] = topic_key;

            var topic = Topic;//.substring(Topic.lastIndexOf("\\") + 1);
            symbol = topic.replace(/\./g, "");
            symbol = symbol.replace(/\[/g, "");
            symbol = symbol.replace(/\]/g, "");
            symbol = symbol.replace(/\\/g, "_");
            symbol = "pmpd_" + symbol;
            pmpmap[Topic] = symbol;

            if (productIcon != null) {
                WatchlistOrderStatusLeft(WatchlistContractName, productIcon, nameDisplay, 2);
                if (product == "UT") {
                    Class = counterId.substring(counterId.lastIndexOf("/") + 1);
                    WatchlisContentLiUT(InformationNameContent, Class, symbol, counterId, product, nameDisplay, obj[i]["exchange"], obj[i]["symbol"], productIcon);
                    UTarry.push(counterId);
                    size++;
                } else {
                    WatchlisContentLi(InformationNameContent, symbol, counterId, product, nameDisplay, obj[i]["exchange"], obj[i]["symbol"], productIcon);
                }
                variable++;
            }
            
            $("#Watchlist-contract-name li").eq(i).attr({
                "counterId": counterId,
                "product": product,
                "name": nameDisplay,
                "productIcon": productIcon,
                "exchange": obj[i]["exchange"],
                "symbol": obj[i]["symbol"]
            });

        }
        Hight = leftHight * variable + leftHight;
        pmpmaptopics[m] = newarry;//every Can only storage single Watchlist-title The topics

        if (Hight > window.innerHeight) {
            WatchlistContractName.height((Hight + 10) + (leftHight * 2) + "px");
            InformationNameContent.height((Hight + 10) + (leftHight * 2) + "px");
        } else {
            WatchlistContractName.height((Hight + 10) + (leftHight * 2) + "px");
            InformationNameContent.height((Hight + 10) + (leftHight * 2) + "px");
        }
        variable = 0;
        documentScroll(0);
        TradeOrder();
        RemoveDataUI(obj, Editdetails);
        startPMPTime();
        SubscribeDataUT(size, UTarry);
        $("#loading").hide();
    }

    function WatchlisContentLi(obj,  symbol, counterId, product, name,exchange,symbol1, productIcon) {
        var Html = "";
        Html += "<ul symbol='" + symbol1 + "' exchange='" + exchange + "' productIcon='" + productIcon + "' name='" + name + "' counterId='" + counterId + "' product='" + product + "'  class='Watchlist-information-name' style='width: 1138px;height:49px'>";
        Html += "<li class='" + symbol + "_5'>-</li>";
        Html += "<li class='" + symbol + "_6'>-</li>";
        Html += "<li class='" + symbol + "_9'>-</li>";
        Html += "<li class='" + symbol + "_11'>-</li>";
        Html += "<li class='" + symbol + "_15'>-</li>";
        Html += "<li class='" + symbol + "_16'>-</li>";
        Html += "<li class='" + symbol + "_10'>-</li>";
        Html += "<li class='" + symbol + "_13'>-</li>";
        Html += "<li class='" + symbol + "_7'>-</li>";
        Html += "<li class='" + symbol + "_8'>-</li>";
        Html += "<li class='" + symbol + "_18'>-</li>";
        Html += "</ul>";
        obj.append(Html);
    }

    function WatchlisContentLiUT(obj, Class, symbol, counterId, product, name, exchange, symbol1, productIcon) {
        var Html = "";
        Html += "<ul exchange='" + exchange + "' symbol='" + symbol1 + "' productIcon='" + productIcon + "' name='" + name + "' counterId='" + counterId + "' product='" + product + "'  class='Watchlist-information-name' style='width: 1138px;height:49px'>";
        Html += "<li class='" + Class + "'>-</li>";
        Html += "<li class='" + Class + "'>-</li>";
        Html += "<li class='" + Class + "'>-</li>";
        Html += "<li class='" + Class + "'>-</li>";
        Html += "<li class='" + Class + "'>-</li>";
        Html += "<li class='" + Class + "'>-</li>";
        Html += "<li class='" + Class + "'>-</li>";
        Html += "<li class='" + Class + "'>-</li>";
        Html += "<li class='" + Class + "'>-</li>";
        Html += "<li class='" + Class + "'>-</li>";
        Html += "<li class='" + Class + "'>-</li>";
        Html += "</ul>";
        obj.append(Html);
    }

    function WatchlistOrderStatusLeft(obj, string, string1, type,v) {
        var Html = "";
        var productIcon = string.replace(/\s/g, "");
        Html += "<li>";
        var Color = tone(productIcon);
        if (productIcon.length <= 3) {

            if (type == 1) {
                Html += "<a style='line-height: 32px;background:" + Color + "'>" + productIcon + "</a>";
                if (string1 == null) {
                    string1 = "";
                    Html += "<div style='line-height: 46px;'>" + string1 + "</div></li>";
                } else {
                    if (string1.length >= 17) {
                        Html += "<div style='line-height: 19px;width: 81%;margin-top: 1rem;'>" + string1 + "</div></li>";
                    }
                    else {
                        Html += "<div style='line-height: 46px;width: 56%;margin-top: 0.5rem;'>" + string1 + "</div></li>";
                    }
                }
            } else {
                Html += "<a style='line-height: 32px;background:" + Color + "'>" + productIcon + "</a>";
                if (v == 1) {
                    Html += "<div>" + string1 + "</div>";
                    return Html;
                } else {
                    if (string1 == null) {
                        string1 = "";
                        Html += "<div style='font-size:14px;line-height: 36px;'>" + string1 + "</div></li>";
                    } else {
                        if (string1.length >= 13) {
                            if (string1.length >= 38) {
                                Html += "<div style='font-size:8px;line-height: 12px;'>" + string1 + "</div></li>";
                            }
                            else if (string1.length >= 28) {
                                Html += "<div style='font-size:8px;line-height: 19px;'>" + string1 + "</div></li>";
                            }
                            else
                            Html += "<div style='font-size:12px;line-height: 19px;'>" + string1 + "</div></li>";
                        }
                        else {
                            Html += "<div style='font-size:14px;line-height: 36px;'>" + string1 + "</div></li>";
                        }
                    }
                }

            }
        }
        else {
            if (type == 1) {
                Html += "<a style='line-height: 14px;background:" + Color + "'>" + productIcon + "</a>";
                if (string1 == null) {
                    string1 = "";
                    Html += "<div style='line-height: 46px;'>" + string1 + "</div></li>";
                } else {
                    if (string1.length >= 17) {
                        Html += "<div style='line-height: 19px;width: 81%;margin-top: 1rem;'>" + string1 + "</div></li>";
                    }
                    else {
                        Html += "<div style='line-height: 46px;width: 56%;margin-top: 0.5rem;'>" + string1 + "</div></li>";
                    }
                }
            } else {
                Html += "<a style='line-height: 14px;background:" + Color + "'>" + productIcon + "</a>";
                if (v == 1) {
                    Html += "<div>" + string1 + "</div>";
                    return Html;
                } else {
                    if (string1 == null) {
                        string1 = "";
                        Html += "<div style='font-size:14px;line-height: 36px;'>" + string1 + "</div></li>";
                    } else {
                        if (string1.length >= 13) {
                            if (string1.length >= 38) {
                                Html += "<div style='font-size:8px;line-height: 12px;'>" + string1 + "</div></li>";
                            }
                            else if (string1.length >= 28) {
                                Html += "<div style='font-size:8px;line-height: 19px;'>" + string1 + "</div></li>";
                            }
                            else
                                Html += "<div style='font-size:12px;line-height: 19px;'>" + string1 + "</div></li>";
                        }
                        else {
                            Html += "<div style='font-size:14px;line-height: 36px;'>" + string1 + "</div></li>";
                        }
                    }
                }
            }

        }
        if (type == undefined) {
            return Html;
        }
        obj.append(Html);
    }
    //Watchlist over-->

    //AddWatchlist
    var timerSearch = null;
    $("#AddWatchlist").keyup(function () {
        if (timerSearch) {
            clearTimeout(timerSearch);
            timerSearch = null;
        }
        timerSearch = setTimeout(function () {
            var type = 2;
            var strs = $("#AddWatchlist").val();
            var productFlag = $("#Watchlist-content select").val();

            var keyword = strs;
            fucTimerSearch(keyword, productFlag, type);
        }
    , 500);
    });
    function fucTimerSearch(keyword, productFlag, type, string){
        
        scrollingX = true;
        if (type == 1) {
            if (keyword != "") {
                $.post(rootpath + "Counter/SearchCounter", "productFlag=" + productFlag + "&keyword=" + keyword + "&count=30", function (data) {
                    var o = JSON.parse(data);
                    if (o["code"] == 1) {
                        if (o["counterList"] != "") {
                            $("#Trade-content .clear").show();
                            TradeSearchDataUI(o["counterList"]);
                            scrollingX = false;
                            startPMP();
                            $("#Trade-ContractSearch").show();
                            return;
                        } else {
                            $("#Trade-search-list").css("top", "148px");
                            $("#Trade-content .Contract-title").css("top", "118px");
                            $("#Trade-content .Contract-title").show();
                            $("#Trade-ContractSearch").hide();
                            $("#history-Trade-ContractSearch").show();
                            return;
                        }
                    } else {
                        $("#Trade-content .clear").hide();
                        return;
                    }
                });
            } else {
                $("#Trade-content .clear").hide();
                $("#Trade-search-list").css("top", "148px");
                $("#Trade-content .Contract-title").css("top", "118px");
                $("#Trade-content .Contract-title").show();
                $("#Trade-ContractSearch").hide();
                $("#history-Trade-ContractSearch").show();
                $("#Trades").click();
            }
        }
        else if (type == 2) {
            if (keyword != "") {
                $.post(rootpath + "Counter/SearchCounter", "productFlag=" + productFlag + "&keyword=" + keyword + "&count=5", function (data) {
                    var o = JSON.parse(data);
                    if (o["code"] == 1) {
                        if (o["counterList"] != "") {
                            $("#Watchlist-content .clear").show();
                            SearchDataUI(o["counterList"]);
                            scrollingX = false;
                            startPMP();
                            return;
                        } else {
                            $("#Watchlist-content .clear").hide();
                            $("#Watchlist-search-list").hide();
                            return;
                        }
                    } else {
                        $("#Watchlist-content .clear").hide();
                        $("#Watchlist-search-list").hide();
                        return;
                    }
                });
            } else {
                $("#Watchlist-content .clear").hide();
                $("#Watchlist-search-list").hide();
            }
        }
        else if (type == 3) {
            if (keyword != "") {
                $.post(rootpath + "Counter/SearchCounter", "productFlag=" + productFlag + "&keyword=" + keyword + "&count=30", function (data) {
                    var o = JSON.parse(data);
                    if (o["code"] == 1) {
                        if (o["counterList"] != "") {
                            $("#" + string + "Trade .clear").show();
                            Trade_SearchList(o["counterList"], string);
                            return;
                        } else {
                            $("#CFDTrade .clear").hide();
                            $("#CFD-Search-list").hide();
                            return;
                        }
                    } else {
                        $("#CFDTrade .clear").hide();
                        $("#CFD-Search-list").hide();
                        return;
                    }
                });
            } else {
                $("#CFDTrade .clear").hide();
                $("#CFD-Search-list").hide();
            }
        }
        else if (type == 4)
        {
            if (keyword != "") {
                $.post(rootpath + "trade/UtSwitchInCounter?", "fundSource=" + productFlag + "&keyword=" + keyword, function (data) {
                    var o = JSON.parse(data);
                    if (o["code"] == 1) {
                        if (o["counterList"] != "") {
                            $("#" + string + "Trade .clear").show();
                            Trade_SearchList(o["counterList"], string);
                            return;
                        } else {
                            $("#CFDTrade .clear").hide();
                            $("#CFD-Search-list").hide();
                            return;
                        }
                    } else {
                        $("#CFDTrade .clear").hide();
                        $("#CFD-Search-list").hide();
                        return;
                    }
                });
            } else {
                $("#CFDTrade .clear").hide();
                $("#CFD-Search-list").hide();
            }
        }
    }

    function SearchDataUI(obj) {

        var Html = "<ul>"; var strs, s;
        $("#Watchlist-search-list").empty();

        for (var i = 0; i < obj.length; i++) {
            strs = WatchlistOrderStatusLeft(obj, obj[i]["productIcon"], obj[i]["name"], s, 1);
            if (obj[i]["exchange"] == undefined) {
                Html += strs + "<br counterId='" + obj[i]["counterID"] + "' watchlis-symbol='" + obj[i]["code"] + "' /><div><span>" + obj[i]["code"] + "</span></div></li>";
            } else {
                Html += strs + "<br  counterId='" + obj[i]["counterID"] + "' watchlis-symbol='" + obj[i]["code"] + "' /><div>" + obj[i]["exchange"] + ":<span>" + obj[i]["code"] + "</span></div></li>";
            }
            
        }
        Html += "</ul>";
        if (obj != undefined) {
            Html += "<p class='SHOWALL'>Search " + obj.length + " Data</p>";
        } else {
            Html += "<p class='SHOWALL'>Search 0 Data</p>";
        }
        
        $("#Watchlist-search-list").append(Html);
        $("#Watchlist-search-list").show();
        $("#Watchlist-search-list ul li").unbind("click");
        $("#Watchlist-search-list ul li").click(function () {
            $("#loading").show();
            var watchlistId = $("#Watchlist-title-Text").attr("thisId");
            var BR = $(this).find("br");
            var counterId = $(BR).attr("counterId");
            var symbol = $(BR).attr("watchlis-symbol");
            $.post(rootpath + "Watchlist/addCounter", "watchlistId=" + watchlistId + "&counterId=" + counterId + "&symbol=" + symbol, function (data) {
                var o = JSON.parse(data);
                if (o["code"] == 1) {
                    $("#Watchlist-content .clear").hide();
                    $("#Watchlist-search-list").hide();
                    $("#AddWatchlist").val("");
                    keyupInput = o["msg"];
                    WatchlistNameDetailData(watchlistId);
                    return;
                } else {
                    $("#loading").hide();
                    ShowAlert(o["msg"]);
                    return;
                }
            });
        });
        $("#Watchlist-content .clear").click(function () {
            $("#AddWatchlist").val("");
            $("#Watchlist-search-list").hide();
            $(this).hide();
        });
    }

    $("#Watchlist-content select").change(function () {
        if (timerSearch) {
            clearTimeout(timerSearch);
            timerSearch = null;
        }
        timerSearch = setTimeout(function () {
            var type = 2;
            var strs = $("#AddWatchlist").val();
            var productFlag = $("#Watchlist-content select").val();

            var keyword = strs;
            fucTimerSearch(keyword, productFlag, type);
        }
        , 500);
    });
    //AddWatchlist over-->

    //Remove Watchlist start

    function RemoveDataUI(obj, Editdetails) {

        var str = "", s, c = 0;

        if (obj.length != 0) {
            for (var i = 0; i < obj.length; i++) {
                var newobj = obj[i];
                if (newobj["name"] == null) {
                    str += "<li></li>" + WatchlistOrderStatusLeft(newobj, newobj["productIcon"], "&nbsp;", s, 1);
                } else {
                    str += "<li></li>" + WatchlistOrderStatusLeft(newobj, newobj["productIcon"], newobj["name"], s, 1);
                }
                if (newobj["exchange"] == undefined) {
                    str += "<br><div>" + newobj["symbol"] + "</div>";
                } else {
                    str += "<br><div>" + newobj["exchange"] + ":<span>" + newobj["symbol"] + "</span></div>";
                }
                str += "<input type='checkbox' counterID='" + newobj["counterID"] + "' name='" + newobj["index"] + "' value='' /></li>";
                c++;
            }
            Editdetails.append(str);
            if (c > 9) {
                Editdetails.height(47 * c + 54 + 47+ 14+ "px");
            } else {
                Editdetails.height(47 * c + 54 + "px");
            }
        } else {
            str += "<div class='No-datas' style='width: 100%;height: 35%;position: fixed;text-align: center;top:20%;'><p style='position: absolute;bottom: 10%;font-size: 28px;left: 33%;color: #ccc;'>No Data.</p></div>";
            Editdetails.append(str);
            Editdetails.height("100%");
        }
    }

    $("#Watchlist-Edit-details .remove").click(function () {
        var arry = []; var s = 0;
        var watchlistId = $("#Watchlist-title-Text").attr("thisid");
        for (var i in checkbox) {
            arry[s] = checkbox[i];
            s++;
        }
        $.post(rootpath + "Watchlist/removeCounter", "watchlistId=" + watchlistId + "&counterIDsString=" + arry, function (data) {
            var o = JSON.parse(data);
            if (o["code"] == 1) {

                for (var j in checkbox) {
                    var parentLi=$("#Watchlist-Edit-details .OrderStatus-Detail-content ul li input[name='" + j + "']").parent();
                    parentLiprev = parentLi.prev();
                    parentLi.remove();
                    parentLiprev.remove();
                    delete checkbox[j];
                }
                RemoveComplete(o["counters"]);
                ShowAlert(o["msg"]);
                return;
            } else {
                ShowAlert(o["msg"]);
                return;
            }
        });
    });

    function RemoveComplete(obj) {
        var newobj = obj;
        $("#Complete").unbind("click");
        $("#Complete").click(function () {
            $("#Watchlist-Edit-details").hide();
            $("#loading").show();
            if (newobj != undefined) {
                var id = $("#Watchlist-title-Text").attr("thisid");
                WatchlistNameDetailData(id);
            }
        });
        $("#Watchlist-Edit-details .Watchlist-Edit-exit").unbind("click");
        $("#Watchlist-Edit-details .Watchlist-Edit-exit").click(function () {
            $("#Watchlist-Edit-details").hide();
            var id = $("#Watchlist-title-Text").attr("thisid");
            WatchlistNameDetailData(id);
        });
    }
    
    //Remove Watchlist over-->

    //Watchlist Extended form start
    function TradeOrder() {
        $("#Watchlist-contract-name li").unbind("click");
        $(".Watchlist-information-name").unbind("click");
        $("#Watchlist-contract-name li").on("click", function () {
            TradeClick(this);
        });
        $(".Watchlist-information-name").on("click", function () {
            TradeClick(this);
        });
    }

    function TradeClick(Domthis) {
        $("#loading").show();
        scrollingX = true;
        var thisMap = Domthis.attributes;
        var counterId = thisMap.counterId.value;
        var product = thisMap.product.value;
        var name = thisMap.name.value;
        var exchange = thisMap.exchange.value;
        var symbol = thisMap.symbol.value;
        var productIcon = thisMap.productIcon.value;
        var APIUrl = WatchlistformAPI(1, product);
        if (product != "UT") {
            if (APIUrl != "") {
                $.post(rootpath + APIUrl, "counterId=" + counterId, function (d) {
                    var o = JSON.parse(d);
                    if (o["code"] == 1) {
                        if (product == "ST") {

                            var APIUrl2 = WatchlistformAPI(2, product);
                            $.get(rootpath + APIUrl2, function (d) {
                                var OrderTYPE = JSON.parse(d);
                                if (o["code"] == 1) {
                                    OrderFormSTUI(o, OrderTYPE, productIcon, counterId, name, product);
                                    DetailForm(counterId, $("#ST-Trade .Detailtitle-bottom-left"), $("#ST-Trade .Detailtitle-bottom-right"));
                                } else {
                                    scrollingX = false;
                                    startPMP();
                                    $("#loading").hide();
                                    ShowAlert(o["msg"]);
                                    return;
                                }
                            });
                        } else if (product == "CFD" || product == "CFDDMA") {
                            $("#loading").show();
                            var APIUrl3 = WatchlistformAPI(3, product);

                            $.get(rootpath + APIUrl3, function (d) {
                                var creditLimit = JSON.parse(d);
                                if (o["code"] == 1) {
                                    OrderFormCFDUI(o, creditLimit, productIcon, counterId, name, product);
                                    DetailForm(counterId, $("#CFD-Trade .Detailtitle-bottom-left"), $("#CFD-Trade .Detailtitle-bottom-right"));
                                    return;
                                } else {
                                    scrollingX = false;
                                    startPMP();
                                    $("#loading").hide();
                                    ShowAlert(o["msg"]);
                                    return;
                                }
                            });
                        } else if (product == "FXMN" || product == "FX" || product == "FT") {
                            OrderFormFTFXFXMNUI(o, productIcon, counterId, name, product, exchange, symbol);
                            DetailForm1(counterId, $("#FTFXFXMN-Trade .Detailtitle-bottom-left"), $("#FTFXFXMN-Trade .Detailtitle-bottom-right"), product);
                            return;
                        }
                    } else {
                        scrollingX = false;
                        startPMP();
                        $("#loading").hide();
                        ShowAlert(o["msg"]);
                        return;
                    }
                });
            } else {
                scrollingX = false;
                startPMP();
                $("#loading").hide();
                ShowAlert("NO API");
                return;
            }
        }
        else
        {
            OrderFormInfoData(thisMap);
            return;
        }

    }

    //OrderFormSTUI
    function OrderFormSTUI(obj, obj1, productIcon, counterId, name, product) {
        //empty
        $("#ST-Ordertype").empty();
        $("#ST-TriggerPrice").val("");
        $("#ST-LimitedPrice").val("");
        $("#ST-Payment").empty();
        $("#ST-SettlementCurrency").empty();
        $("#ST-Validity").removeAttr("disabled");
        $("#ST-Trade-title").empty();
        $("#ST-TradePassword").val("");
        $("#ST-Quantity").val("");
        $("#ST-Trade .Detail-content-top .CurrencyLotsize").empty();
        InputFocus("#ST-Trade");

        var market = obj["market"];
        var newobj = obj1["markets"];
        var str = "", str1 = "", str2 = ""; str3 = "<ul><li>Available Cash</li><li>Buy balance</li><li>Sell balance</li></ul>";
        var Datetime = data(1);
        var Domarry = [];

        for (var i = 0;i < newobj.length; i++) {
            if (newobj[i]["market"] == market) {
                arry = newobj[i]["orderTypes"];
                for (var j = 0;j < arry.length; j++) {
                    var gtd = arry[j]["gtd"];
                    str += "<option value='" + arry[j]["value"] + "'>" + arry[j]["name"] + "</option>";
                }
            }
        }
        for (var r = 0;r < obj["paymentMode"].length; r++) {
            str1 += "<option value='" + obj["paymentMode"][r]["value"] + "'>" + obj["paymentMode"][r]["text"] + "</option>";
        }
        for (var s = 0;s < obj["settlementCurrency"].length; s++) {
            str2 += "<option value='" + obj["settlementCurrency"][s]["value"] + "'>" + obj["settlementCurrency"][s]["text"] + "</option>";
        }

        $("#ST-Ordertype").append(str);
        $("#ST-TriggerPrice").val(obj["lastDone"]);
        $("#ST-LimitedPrice").val(obj["lastDone"]);
        $("#ST-Quantity").val(obj["lotSize"]);
        $("#ST-Payment").append(str1);
        $("#ST-SettlementCurrency").append(str2);
        $("#ST-Trade-title").append(WatchlistOrderStatusLeft(obj, productIcon, name));
        $("#ST-Trade .Detail-content-top .CurrencyLotsize").append("<span style='display: block;width: 53%;float: left;'>Currency: " + obj["currency"] + "</span><span>Lot Size: " + obj["lotSize"] + "</span>");
        ElementCSS($("#ST-Trade-title"));

        var TradePassword = $("#ST-Trade .TradePassword");
        var TradePasswordprev = TradePassword.prev();
        TradePassword.show();
        TradePasswordprev.show();
        if (passwordConfirmation == false) {
            TradePassword.hide();
            TradePasswordprev.hide();
        }

        STDomDataParameter(product, counterId, gtd);

        var APIUrl = WatchlistformAPI(3, product);
        $("#loading").show();
        $.get(rootpath + APIUrl, function (d) {
            var o = JSON.parse(d);
            if (o["code"] == 1) {
                str3 += "<ul><li>" + o["aFundBal"] + "</li><li>" + o["buyLimitBal"] + "</li><li>" + o["sellLimitBal"] + "</li></ul>";
                $(".ST-Amount").empty();
                $(".ST-Amount").append(str3);
                return;
            } else {
                str3 += "<ul><li>-</li><li>-</li><li>-</li></ul>";
                $(".ST-Amount").empty();
                $(".ST-Amount").append(str3);
                $("#loading").hide();
                return;
            }
        });
        $("#ST-Trade").show();

    }

    function STDomDataParameter(product, counterId, gtd) {
        var arry1 = [], arry2 = [];
        arry1.splice(0, arry1.length);
        arry2.splice(0, arry2.length);
        $("#ST-Ordertype").change(function () {
            arry1.splice(0, arry1.length);
            arry2.splice(0, arry2.length);
            arry1.push($("#ST-TradePassword"), $("#ST-Ordertype"), $("#ST-LimitedPrice"), $("#ST-Quantity"), $("#ST-SettlementCurrency"), $("#ST-Payment"), gtd);
            arry2.push($("#ST-TradePassword"), $("#ST-Ordertype"), $("#ST-LimitedPrice"), $("#ST-TriggerPrice"), $("#ST-Quantity"), $("#ST-SettlementCurrency"), $("#ST-Payment"), $("#ST-TriggerBased"), gtd);
            var thisval = $(this).val();
            if (thisval == "LO") {
                VerificationSubmitAPI("#ST-", arry1, product, counterId);
                $("#ST-Trade .Detail-content-top .TriggerSpan").hide();

            } else {
                VerificationSubmitAPI("#ST-", arry2, product, counterId);
                $("#ST-Trade .Detail-content-top .TriggerSpan").show();

            }
        });
        if ($("#ST-Ordertype").val() == "LO") {
            arry1.push($("#ST-TradePassword"), $("#ST-Ordertype"), $("#ST-LimitedPrice"), $("#ST-Quantity"), $("#ST-SettlementCurrency"), $("#ST-Payment"), gtd);
            $("#ST-Trade .Detail-content-top .TriggerSpan").hide();
            VerificationSubmitAPI("#ST-", arry1, product, counterId);
        } else {
            VerificationSubmitAPI("#ST-", arry2, product, counterId);
            arry2.push($("#ST-TradePassword"), $("#ST-Ordertype"), $("#ST-LimitedPrice"), $("#ST-TriggerPrice"), $("#ST-Quantity"), $("#ST-SettlementCurrency"), $("#ST-Payment"), $("#ST-TriggerBased"), gtd);
            $("#ST-Trade .Detail-content-top .TriggerSpan").show();

        }
        $("#loading").hide();
    }
    
    //OrderFormCFDUI
    function OrderFormCFDUI(obj, creditLimit, productIcon, counterId, name, product, symbols) {
        //变量
        var str = "", str1 = "", str2 = "", str3 = "", str4 = "", str5 = "", str6 = "", str7 = "", str8 = "", str9 = "", str11 = "", str12 = "", arry = [];
        var str10 = "<ul><li>Available cash</li><li>Credit limit</li></ul>";
        var Ordertype = $("#CFD-Ordertype");
        var LimitedOrderTimeType = $("#CFD-Limited-Order .Effectiveness");
        var StopLimitedOrderStoppricetrigger = $("#CFD-Stop-Limited-Order .input-select select");
        var StopLimitedOrderTimeType = $("#CFD-Stop-Limited-Order .Effectiveness");
        var TraillingStopOrderStoppricetrigger = $("#CFD-Trailling-Stop-Order .input-select select");
        var TraillingStopOrderTimeType = $("#CFD-Trailling-Stop-Order .Effectiveness");
        var OCOOrderStoppricetrigger = $("#CFD-OCO-Order .input-select select");
        var OCOOrderTimeType = $("#CFD-OCO-Order .Effectiveness");
        var ContingencyOrderCondition = $("#CFD-Contingency-Order .select-input select");
        var ContingencyOrderTimeType = $("#CFD-Contingency-Order .Effectiveness");
        var CFDTradetitle = $("#CFD-Trade-title");
        var SelectOrderNo = $("#Select-Order-No");
        var IFDoneOrderEffectiveness = $("#IF-Done-Order .Effectiveness");

        //重置
        Ordertype.empty();
        LimitedOrderTimeType.empty();
        LimitedOrderTimeType.removeAttr("max");

        StopLimitedOrderStoppricetrigger.empty();
        StopLimitedOrderTimeType.empty();
        StopLimitedOrderTimeType.removeAttr("max");
        $("#CFD-Stop-Limited-Order .TradePassword input");
        $("#CFD-Trailling-Stop-Order .trailingStep span:last-child").text("");
        $("#CFD-Trailling-Stop-Order .trailingStep span:last-child").removeAttr("price");
        $("#CFD-Trailling-Stop-Order .trailingStep span:last-child").removeAttr("size");
        $("#CFD-Trailling-Stop-Order .trailingStep span:last-child").removeAttr("max");
        TraillingStopOrderStoppricetrigger.empty();

        $("#CFD-Trailling-Stop-Order .limitSpread span:last-child").removeAttr("size");
        $("#CFD-Trailling-Stop-Order .limitSpread span:last-child").removeAttr("max");
        TraillingStopOrderTimeType.empty();
        TraillingStopOrderTimeType.removeAttr("max");
        OCOOrderStoppricetrigger.empty();
        OCOOrderTimeType.empty();
        OCOOrderTimeType.removeAttr("max");
        ContingencyOrderCondition.empty();
        ContingencyOrderCondition.removeAttr("CompanyCode");
        ContingencyOrderTimeType.empty();
        ContingencyOrderTimeType.removeAttr("max");
        CFDTradetitle.empty();
        $("#CFD-Trade .CFD-Amount").empty();
        $("#CFD-Limited-Order").hide();
        $("#CFD-Stop-Limited-Order").hide();
        $("#CFD-Trailling-Stop-Order").hide();
        $("#CFD-OCO-Order").hide();
        $("#CFD-Contingency-Order").hide();
        $("#CFD-Trade .Detail-content-top .CurrencyLotsize").empty();
        SelectOrderNo.empty();
        IFDoneOrderEffectiveness.empty();
        $("#CFD-Contingency-Contrtact").val("");
        $("#CFD-Contingency-Order .select-input input").val("");
        InputFocus("#CFD-Trade");
        //Ordertype
        for (var i = 0; i < obj["orderTypes"].length; i++) {
            str += "<option value='" + obj["orderTypes"][i]["orderType"] + "'>" + obj["orderTypes"][i]["orderTypeDisplay"] + "</option>";
            if (obj["orderTypes"][i]["orderType"] == "2") {
                //Limited-Order
                $("#CFD-Limited-Order .input-input input:first-child").val(obj["lastDone"]);
                $("#CFD-Limited-Order .input-input input:last-child").val(obj["lotSize"]);
                $("#CFD-Limited-Order .CurrencyLotsize").append("<span style='display: block;width: 50%;float: left;'>Currency: " + obj["currency"] + "</span><span>Lot Size: " + obj["lotSize"] + "</span>");
                for (var j = 0; j < obj["orderTypes"][i]["duration"].length; j++) {
                    str1 += "<option value='" + obj["orderTypes"][i]["duration"][j]["timeInForce"] + "'>" + obj["orderTypes"][i]["duration"][j]["timeInForceDisplay"] + "</option>";
                    if(j==1){
                        LimitedOrderTimeType.attr("max",obj["orderTypes"][i]["duration"][j]["validityDay"]);
                    }
                }
                LimitedOrderTimeType.append(str1);

            } else if (obj["orderTypes"][i]["orderType"] == "3") {
                //Stop-Limited-Order
                $("#CFD-Stop-Limited-Order .input-select input").val(obj["lastDone"]);
                for (var s = 0; s < obj["orderTypes"][i]["triggerTypes"].length; s++) {
                    str2 += "<option value='" + obj["orderTypes"][i]["triggerTypes"][s]["value"] + "'>" + obj["orderTypes"][i]["triggerTypes"][s]["text"] + "</option>";
                }
                StopLimitedOrderStoppricetrigger.append(str2);
                $("#CFD-Stop-Limited-Order .input-input input:first-child").val(obj["lastDone"]);
                $("#CFD-Stop-Limited-Order .input-input input:last-child").val(obj["lotSize"]);
                $("#CFD-Stop-Limited-Order .CurrencyLotsize").append("<span style='display: block;width: 50%;float: left;'>Currency: " + obj["currency"] + "</span><span>Lot Size: " + obj["lotSize"] + "</span>");
                for (var a = 0; a < obj["orderTypes"][i]["duration"].length; a++) {
                    str3 += "<option value='" + obj["orderTypes"][i]["duration"][a]["timeInForce"] + "'>" + obj["orderTypes"][i]["duration"][a]["timeInForceDisplay"] + "</option>";
                    if (a == 1) {
                        StopLimitedOrderTimeType.attr("max", obj["orderTypes"][i]["duration"][a]["validityDay"]);
                    }
                }
                StopLimitedOrderTimeType.append(str3);

            } else if (obj["orderTypes"][i]["orderType"] == "4") {
                //Trailling-Stop-Order
                $("#CFD-Trailling-Stop-Order .trailingStep span:last-child").text(obj["lastDone"]);
                $("#CFD-Trailling-Stop-Order .trailingStep span").css({ "fontSize": "10px" });
                $("#CFD-Trailling-Stop-Order .trailingStep span:last-child").attr("price", obj["lastDone"]);
                $("#CFD-Trailling-Stop-Order .trailingStep span:last-child").attr("size", obj["orderTypes"][i]["trailingStep"].size);
                $("#CFD-Trailling-Stop-Order .trailingStep span:last-child").attr("max", obj["orderTypes"][i]["trailingStep"].max);
                for (var q = 0; q < obj["orderTypes"][i]["triggerTypes"].length; q++) {
                    str4 += "<option value='" + obj["orderTypes"][i]["triggerTypes"][q]["value"] + "'>" + obj["orderTypes"][i]["triggerTypes"][q]["text"] + "</option>";
                }
                TraillingStopOrderStoppricetrigger.append(str4);
                $("#CFD-Trailling-Stop-Order .limitSpread span:first-child").text("Ind. Limit: " + obj["lastDone"]);
                $("#CFD-Trailling-Stop-Order .limitSpread span:first-child").css({ "display": "block", "width": "50%", "float": "left", "fontSize": "10px" });
                $("#CFD-Trailling-Stop-Order .limitSpread span:last-child").attr("size", obj["orderTypes"][i]["limitSpread"].size);
                $("#CFD-Trailling-Stop-Order .limitSpread span:last-child").attr("max", obj["orderTypes"][i]["limitSpread"].max);
                $("#CFD-Trailling-Stop-Order .limitSpread span:last-child").text("Lot Size: " + obj["lotSize"]);
                for (var w = 0; w < obj["orderTypes"][i]["duration"].length; w++) {
                    str5 += "<option value='" + obj["orderTypes"][i]["duration"][w]["timeInForce"] + "'>" + obj["orderTypes"][i]["duration"][w]["timeInForceDisplay"] + "</option>";
                    if (w == 1) {
                        TraillingStopOrderTimeType.attr("max", obj["orderTypes"][i]["duration"][w]["validityDay"]);
                    }
                }
                TraillingStopOrderTimeType.append(str5);
                $.post(rootpath + "counter/CounterInfo", "priceMode=1" + "&counterID=" + counterId, function (d) {
                    var TrailingTopc = JSON.parse(d);
                    if (TrailingTopc["code"] == 1) {
                        TrailingChange(TrailingTopc);
                    }
                    else {
                        ShowAlert(o["msg"]);
                        return;
                    }
                });

            }
            else if (obj["orderTypes"][i]["orderType"] == "5") {
                //IF Done order
                $.post(rootpath + "Trade/CfdLimitOrder", "counterId=" + counterId, function (d) {
                    var o = JSON.parse(d);
                    var orders = o["orders"];
                    if (o["code"] == 1) {
                        if (orders.length > 0) {
                            str11 += "<option value=''>Select Order No</option>";
                            for (var f = 0; f < orders.length; f++) {
                                str11 += "<option value='" + orders[f]["orderNo"] + "'>" + orders[f]["orderNo"] + " " + orders[f]["companyName"] + " " + orders[f]["action"] + " " + orders[f]["price"] + " " + orders[f]["qty"] + "</option>";
                            }
                            SelectOrderNo.append(str11);
                        }
                        else {
                            SelectOrderNo.append("<option value=''>Select Order No</option>");
                        }
                    }
                    else {
                        SelectOrderNo.append("<option value=''>Select Order No</option>");
                        ShowAlert(o["msg"]);
                        return;
                    }
                });
                $("#IF-Done-Order .Limit-Price").val(obj["lastDone"]);
                $("#IF-Done-Order .Quantity").val(obj["lotSize"]);
                obj["orderTypes"][i]["orderType"]
                for (var times = 0; times < obj["orderTypes"][i]["duration"].length; times++) {
                    str12 += "<option value='" + obj["orderTypes"][i]["duration"][times]["timeInForce"] + "'>" + obj["orderTypes"][i]["duration"][times]["timeInForceDisplay"] +"</option>";
                }
                IFDoneOrderEffectiveness.append(str12);
            }
            else if (obj["orderTypes"][i]["orderType"] == "6") {
                //OCO-Order
                $("#CFD-OCO-Order .input-input input:first-child").val(obj["lastDone"]);
                $("#CFD-OCO-Order .input-input input:last-child").val(obj["lotSize"]);
                $("#CFD-OCO-Order .CurrencyLotsize").eq(0).append("<span style='display: block;width: 50%;float: left;'>Currency: " + obj["currency"] + "</span><span>Lot Size: " + obj["lotSize"] + "</span>");
                $("#CFD-OCO-Order .input-select input").val(obj["lastDone"]);
                for (var e = 0; e < obj["orderTypes"][i]["triggerTypes"].length; e++) {
                    str6 += "<option value='" + obj["orderTypes"][i]["triggerTypes"][e]["value"] + "'>" + obj["orderTypes"][i]["triggerTypes"][e]["text"] + "</option>";
                }
                OCOOrderStoppricetrigger.append(str6);
                $("#CFD-OCO-Order .input-input1 input:first-child").val(obj["lastDone"]);
                $("#CFD-OCO-Order .input-input1 input:last-child").val(obj["lotSize"]);
                $("#CFD-OCO-Order .CurrencyLotsize").eq(1).append("<span style='display: block;width: 50%;float: left;'>Currency: " + obj["currency"] + "</span><span>Lot Size: " + obj["lotSize"] + "</span>");
                for (var r = 0; r < obj["orderTypes"][i]["duration"].length; r++) {
                    str7 += "<option value='" + obj["orderTypes"][i]["duration"][r]["timeInForce"] + "'>" + obj["orderTypes"][i]["duration"][r]["timeInForceDisplay"] + "</option>";
                    if (r == 1) {
                        OCOOrderTimeType.attr("max", obj["orderTypes"][i]["duration"][r]["validityDay"]);
                    }
                }
                OCOOrderTimeType.append(str7);

            } else if (obj["orderTypes"][i]["orderType"] == "7") {
                //Contingency Order
                for (var n = 0; n < obj["orderTypes"][i]["triggerTypes"].length; n++) {
                    for (var t = 0; t < obj["orderTypes"][i]["operator"].length; t++) {
                        str8 += "<option value='" + obj["orderTypes"][i]["triggerTypes"][n]["value"] + "/" + obj["orderTypes"][i]["operator"][t]["value"] + "'>" + obj["orderTypes"][i]["triggerTypes"][n]["text"] + " " + obj["orderTypes"][i]["operator"][t]["text"] + "</option>";
                    } 
                }
                ContingencyOrderCondition.append(str8)
                ContingencyOrderCondition.attr("CompanyCode", obj["companyCode"]);
                $("#CFD-Contingency-Order .input-input input:first-child").val(obj["lastDone"]);
                $("#CFD-Contingency-Order .input-input input:last-child").val(obj["lotSize"]);
                $("#CFD-Contingency-Order .CurrencyLotsize").append("<span style='display: block;width: 50%;float: left;'>Currency: " + obj["currency"] + "</span><span>Lot Size: " + obj["lotSize"] + "</span>");
                for (var v = 0; v < obj["orderTypes"][i]["duration"].length; v++) {
                    str9 += "<option value='" + obj["orderTypes"][i]["duration"][v]["timeInForce"] + "'>" + obj["orderTypes"][i]["duration"][v]["timeInForceDisplay"] + "</option>";
                    if (v == 1) {
                        ContingencyOrderTimeType.attr("max", obj["orderTypes"][i]["duration"][v]["validityDay"]);
                    }
                }
                ContingencyOrderTimeType.append(str9);
                Trade_Search(product, "CFD", $("#CFD-Contingency-Contrtact"));
            }
        }
        Ordertype.append(str);
        Ordertype.val("2");
        if (Ordertype.val() == "2") {
            $("#CFD-Limited-Order").show();
        }
        CFDDomDataParameter(product, counterId);

        var NameTitle = WatchlistOrderStatusLeft(CFDTradetitle, productIcon, name);
        CFDTradetitle.append(NameTitle);
        ElementCSS(CFDTradetitle);

        if (creditLimit["availCash"] == undefined) {
            str10 += "<ul><li>-</li><li>-</li></ul>";
        } else {
            str10 += "<ul><li>" + creditLimit["availCash"] + "</li><li>" + creditLimit["creditLimit"] + "</li></ul>";
        }
        
        $("#CFD-Trade .CFD-Amount").append(str10);

        var TradePassword = $("#CFD-Trade .TradePassword");
        var TradePasswordprev = TradePassword.prev();
        TradePassword.show();
        TradePasswordprev.show();
        if (passwordConfirmation == false) {
            TradePassword.hide();
            TradePasswordprev.hide();
        }

        var Effectiveness = $(".Effectiveness").val();
        var EffectivenessNext = $("#CFD-Trade input[type='date']");
        var datatime = data();
        if (Effectiveness == "0") {
            EffectivenessNext.val(datatime);
            EffectivenessNext.attr("disabled", "disabled");
        }
        $("#CFD-Trade").show();
    }

    function Trade_Search(productFlag, string, Ele, fundSource) {

        var strs = productFlag
        if (strs == "CFD")
            productFlag = 2;
        else if (strs == "CFDDMA")
            productFlag = 4;
        else if (strs == "UT")
            productFlag = 64;
        else if (strs == "UTSWITCH")
            productFlag = fundSource;

        $("#" + string + "-Search-list").hide();
        Ele.unbind("click");
        Ele.click(function () {
            $("#" + string + "Trade").show();
            $("#" + string + "Trade .clear").hide();
            $("#" + string + "-Trade-Search").val("");
            $("#" + string + "-Trade-Search").focus();
            $("#" + string + "-Search-list").hide();
        });

        $("#" + string + "-Trade-Search").keyup(function () {
            if (timerSearch) {
                clearTimeout(timerSearch);
                timerSearch = null;
            }
            timerSearch = setTimeout(function () {

                if (strs == "UTSWITCH")
                    type = 4;
                else
                    type = 3;
                var keyword = $("#" + string + "-Trade-Search").val();
                fucTimerSearch(keyword, productFlag, type, string);
            }, 500);
        });
        $("#" + string + "Trade-Trade-content .ContractSearch span:first-child").click(function () {
            $("#" + string + "Trade").hide();
        });
        $("#" + string + "Trade .clear").click(function () {
            $(this).hide();
            $("#" + string + "-Trade-Search").val("");
            $("#" + string + "-Search-list").hide();
        });
    }

    function Trade_SearchList(obj, string) {
        var Html = "", str, s, hieg = 45;
        $("#" + string + "-Search-list ul").empty();

        for (var i = 0; i < obj.length; i++) {
            str = WatchlistOrderStatusLeft(obj, obj[i]["productIcon"], obj[i]["name"], s, 1);
            if (obj[i]["exchange"] == undefined) {
                Html += str + "<br name='" + obj[i]["name"] +"' counterID='" + obj[i]["counterID"] + "' code='" + obj[i]["code"] + "'  symbol='" + obj[i]["symbol"] + "' exchange='" + obj[i]["globalChartExchange"] + "'/><div><span>" + obj[i]["symbol"] + "</span></div></li>";
            } else {
                Html += str + "<br name='" + obj[i]["name"] +"' counterID='" + obj[i]["counterID"] + "' code='" + obj[i]["code"] + "'  symbol='" + obj[i]["symbol"] + "' exchange='" + obj[i]["globalChartExchange"] + "'/><div>" + obj[i]["exchange"] + ":<span>" + obj[i]["symbol"] + "</span></div></li>";
            }
            m++;
        }
        hl = hieg * m + hieg; m = 0;
        $("#" + string + "-Search-list ul").append(Html);
        $("#" + string + "-Search-list ul").height((hl + (hieg + (hieg / 2))) + "px");
        $("#" + string + "-Search-list").show();

        $("#" + string + "-Search-list ul li").click(function () {
            $("#loading").show();
            var Attributes = $(this).find("br");
            if (string == "UT")
            {
                var counterId = Attributes[0].attributes.counterid.value;
                var code = Attributes[0].attributes.code.value;
                var name = Attributes[0].attributes.name.value;
                if (obj.length != 10)
                {
                    $.post(rootpath + "Counter/UTPerformance?counterId=" + counterId, function (data) {
                        let object = JSON.parse(data);
                        if (object["code"] == 1) {
                            UT_chart(object, name);
                        }
                        else {
                            $("#loading").hide();
                            ShowAlert(object["msg"]);
                            return;
                        }
                    });
                }
                else
                {
                    UT_switch_fund(code, name);
                }
            }
            else if (string == "CFD")
            {
                var code = Attributes[0].attributes.code.value;
                var symbol = Attributes[0].attributes.symbol.value;
                var exchange = Attributes[0].attributes.exchange.value;
                var counterid = Attributes[0].attributes.counterid.value;
                var counterid1 = counterid.substring(counterid.lastIndexOf("/") + 1);
                $("#" + string + "-Contingency-Contrtact").val(exchange + " " + exchange + ":" + symbol);
                $("#CFD-Contingency-Contrtact").attr("counterid", counterid1);
                $.post(rootpath + "counter/CounterInfo", "priceMode=1" + "&counterID=" + counterid, function (data) {
                    var o = JSON.parse(data);
                    if (o["code"] == 1) {
                        $("#loading").hide();
                        $("#CFD-Contingency-Order .select-input input").val(o["lastDone"]);
                        $("#CFD-Search-list ul").empty();
                        $("#CFD-Trade-Search").val("");
                        $("#CFD-Search-list").hide();
                        $("#CFDTrade").hide();
                    }
                });
            }

        });
    }

    function CFDDomDataParameter(product, counterId) {
        var arry1 = [], arry2 = [], arry3 = [], arry4 = [], arry5 = [], arry6 = [];
        arry1.splice(0, arry1.length);
        $("#CFD-Ordertype").change(function () {
            arry1.splice(0, arry1.length);
            arry2.splice(0, arry2.length);
            arry3.splice(0, arry3.length);
            arry4.splice(0, arry4.length);
            arry5.splice(0, arry5.length);
            arry6.splice(0, arry6.length);
            arry1.push($("#CFD-Limited-Order .TradePassword input"), $("#CFD-Ordertype"), $("#CFD-Limited-Order .Effectiveness"), $("#CFD-Limited-Order .select-input input"), $("#CFD-Limited-Order .input-input input:first-child"), $("#CFD-Limited-Order .input-input input:last-child"));
            arry2.push($("#CFD-Stop-Limited-Order .TradePassword input"), $("#CFD-Ordertype"), $("#CFD-Stop-Limited-Order .Effectiveness"), $("#CFD-Stop-Limited-Order .select-input input"), $("#CFD-Stop-Limited-Order .input-select input"), $("#CFD-Stop-Limited-Order .input-select select"), $("#CFD-Stop-Limited-Order .input-input input:first-child"), $("#CFD-Stop-Limited-Order .input-input input:last-child"));
            arry3.push($("#CFD-Trailling-Stop-Order .TradePassword input"), $("#CFD-Ordertype"), $("#CFD-Trailling-Stop-Order .Effectiveness"), $("#CFD-Trailling-Stop-Order .select-input input"), $("#CFD-Trailling-Stop-Order .input-select select"), $("#CFD-Trailling-Stop-Order .input-select input"), $("#CFD-Trailling-Stop-Order .input-input input:first-child"), $("#CFD-Trailling-Stop-Order .trailingStep span:last-child"), $("#CFD-Trailling-Stop-Order .limitSpread span:first-child"), $("#CFD-Trailling-Stop-Order .input-input input:last-child"));
            arry4.push($("#CFD-OCO-Order .TradePassword input"), $("#CFD-Ordertype"), $("#CFD-OCO-Order .Effectiveness"), $("#CFD-OCO-Order .select-input input"), $("#CFD-OCO-Order .input-select select"), $("#CFD-OCO-Order .input-input input:first-child"), $("#CFD-OCO-Order .input-input input:last-child"), $("#CFD-OCO-Order .input-select input"), $("#CFD-OCO-Order .input-input1 input:first-child"), $("#CFD-OCO-Order .input-input1 input:last-child"));
            arry5.push($("#CFD-Contingency-Order .TradePassword input"), $("#CFD-Ordertype"), $("#CFD-Contingency-Order .Effectiveness"), $("#CFD-Contingency-Order .select-input1 input"), $("#CFD-Contingency-Contrtact"), $("#CFD-Contingency-Order .select-input select"), $("#CFD-Contingency-Order .select-input input"), $("#CFD-Contingency-Order .input-input input:first-child"),$("#CFD-Contingency-Order .input-input input:last-child"));
            arry6.push($("#IF-Done-Order .TradePassword input"), $("#CFD-Ordertype"), $("#IF-Done-Order .Effectiveness"), $("#IF-Done-Order .select-input input"), $("#Select-Order-No"), $("#IF-Done-Order .Limit-Price"),$("#IF-Done-Order .Quantity"));
            var thisval = $(this).val();
            if (thisval == "2") {
                VerificationSubmitAPI("#CFD-", arry1, product, counterId);
                $("#CFD-Limited-Order").show();
                $("#CFD-Stop-Limited-Order").hide();
                $("#CFD-Trailling-Stop-Order").hide();
                $("#CFD-OCO-Order").hide();
                $("#CFD-Contingency-Order").hide();
                $("#IF-Done-Order").hide();

            } else if (thisval == "3") {
                VerificationSubmitAPI("#CFD-", arry2, product, counterId);
                $("#CFD-Limited-Order").hide();
                $("#CFD-Stop-Limited-Order").show();
                $("#CFD-Trailling-Stop-Order").hide();
                $("#CFD-OCO-Order").hide();
                $("#CFD-Contingency-Order").hide();
                $("#IF-Done-Order").hide();

            } else if (thisval == "4") {
                VerificationSubmitAPI("#CFD-", arry3, product, counterId);
                $("#CFD-Limited-Order").hide();
                $("#CFD-Stop-Limited-Order").hide();
                $("#CFD-Trailling-Stop-Order").show();
                $("#CFD-OCO-Order").hide();
                $("#CFD-Contingency-Order").hide();
                $("#IF-Done-Order").hide();

            } else if (thisval == "5") {
                VerificationSubmitAPI("#CFD-", arry6, product, counterId);
                $("#CFD-Limited-Order").hide();
                $("#CFD-Stop-Limited-Order").hide();
                $("#CFD-Trailling-Stop-Order").hide();
                $("#CFD-OCO-Order").hide();
                $("#CFD-Contingency-Order").hide();
                $("#IF-Done-Order").show();

            } else if (thisval == "6") {
                VerificationSubmitAPI("#CFD-", arry4, product, counterId);
                $("#CFD-Limited-Order").hide();
                $("#CFD-Stop-Limited-Order").hide();
                $("#CFD-Trailling-Stop-Order").hide();
                $("#CFD-OCO-Order").show();
                $("#CFD-Contingency-Order").hide();
                $("#IF-Done-Order").hide();

            } else if (thisval == "7") {
                VerificationSubmitAPI("#CFD-", arry5, product, counterId);
                $("#CFD-Limited-Order").hide();
                $("#CFD-Contingency-Order").show();
                $("#CFD-Stop-Limited-Order").hide();
                $("#CFD-Trailling-Stop-Order").hide();
                $("#CFD-OCO-Order").hide();
                $("#CFD-Contingency-Order").show();
                $("#IF-Done-Order").hide();
            }
        });
        arry1.push($("#CFD-Limited-Order .TradePassword input"), $("#CFD-Ordertype"), $("#CFD-Limited-Order .Effectiveness"), $("#CFD-Limited-Order .select-input input"), $("#CFD-Limited-Order .input-input input:first-child"), $("#CFD-Limited-Order .input-input input:last-child"));
        VerificationSubmitAPI("#CFD-", arry1, product, counterId);
        $("#loading").hide();
    }

    $(".Effectiveness").change(function () {
        var thisvalue = $(this).val();
        if (thisvalue == 0) {
            $(this).next().attr("disabled", "disabled");
        } else {
            $(this).next().removeAttr("disabled");
        }
    });
    //CFDTraillingkey
    function TrailingChange(obj) {
        var symbol, symbol1, symbol2, trailingStep = $("#CFD-Trailling-Stop-Order .trailingStep span:last-child");
        symbol = obj["pmpTopic"].replace(/\./g, "");
        symbol = symbol.replace(/\[/g, "");
        symbol = symbol.replace(/\]/g, "");
        symbol = symbol.replace(/\\/g, "_");
        symbol = "pmpd_" + symbol;
        var symbolTopic1 = symbol + "_5";
        var symbolTopic2 = symbol + "_6";
        for (var i in pmpdatamap) {
            if (i == symbolTopic1)
                if (pmpdatamap[i] == undefined)
                    symbol1 = "-";
                else
                    symbol1 = pmpdatamap[i];
            if (i == symbolTopic2)
                if (pmpdatamap[i] == undefined)
                    symbol2 = "-";
                else
                    symbol2 = pmpdatamap[i];
        }
        if ($("#TrailingPrice").val() == "2") {
            if (symbol1 != "-" && symbol1 != undefined) {
                trailingStep.text(symbol1);
                CFDTraillingkey(symbol1);
            }
            else
            {
                CFDTraillingkey(trailingStep.attr("price"));
            }
            trailingStep.attr("class", symbolTopic1);
        } else {
            if (symbol2 != "-" && symbol2 != undefined) {
                trailingStep.text(symbol2);
                CFDTraillingkey(symbol2);
            }
            else
            {
                CFDTraillingkey(trailingStep.attr("price"));
            }
            trailingStep.attr("class", symbolTopic1);
        }
        $("#TrailingPrice").change(function () {
            var trailingStep = $("#CFD-Trailling-Stop-Order .trailingStep span:last-child");
            var symbolEle1 = $("#CFD-Trade .Detailtitle-bottom-right ul li").eq(1);
            var symbolEle2 = $("#CFD-Trade .Detailtitle-bottom-right ul li").eq(3);
            if ($("#TrailingPrice").val() == "2") {
                if (symbolEle1.text() != "-")
                    trailingStep.text(symbolEle1.text());
                trailingStep.attr("class", symbolTopic1);
                CFDTraillingkey(symbolEle1.text());

            } else {
                if (symbolEle2.text() != "-")
                    trailingStep.text(symbolEle2.text());
                trailingStep.attr("class", symbolTopic2);
                CFDTraillingkey(symbolEle2.text());
            }
        });
    }

    function CFDTraillingkey(string) {

        var size = parseFloat($("#CFD-Trailling-Stop-Order .trailingStep span:last-child").attr("size")), max = parseInt($("#CFD-Trailling-Stop-Order .trailingStep span:last-child").attr("max"));

        var size1 = parseFloat($("#CFD-Trailling-Stop-Order .limitSpread span:last-child").attr("size")), max1 = parseInt($("#CFD-Trailling-Stop-Order .limitSpread span:last-child").attr("max"));
        var Trailling = $("#CFD-Trailling-Stop-Order .input-select input");

        symbol = $("#CFD-Trailling-Stop-Order .trailingStep span:last-child").attr("class"), price = string;
        $("#CFD-Trailling-Stop-Order .limitSpread span:first-child").text("Ind. Limit: " + price);

        Trailling.focus(function () {
            $("#CFD-Trailling-Stop-Order .trailingStep span:last-child").removeAttr("class");
        });
        Trailling.blur(function () {
            if ($(this).val() == "")
                $("#CFD-Trailling-Stop-Order .trailingStep span:last-child").attr("class", symbol);
            else
                $("#CFD-Trailling-Stop-Order .trailingStep span:last-child").removeAttr("class");
        })

        $("#CFD-Trailling-Stop-Order .input-select input").keyup(function () {
            var thisval = parseFloat($(this).val());
            var leng = price.toString().lastIndexOf(".") + 1;
            var trailingStep = $("#CFD-Trailling-Stop-Order .trailingStep span:last-child"), limitSpread = $("#CFD-Trailling-Stop-Order .limitSpread span:first-child");
            var limitSpreadInput = $("#CFD-Trailling-Stop-Order .input-input input:first-child"), limitSpreadInputvalue = parseFloat(limitSpreadInput.val());

            if ($(this).val() == "")
            {
                trailingStep.text(price);
                if (limitSpreadInput.val() == "") {
                    limitSpread.text("Ind. Limit: " + price);
                }
                else
                {
                    var str = ((limitSpreadInputvalue * size) + Number(price)).toFixed(leng);
                    limitSpread.text("Ind. Limit: " + str);
                }
                
            }
            else if ($(this).val() == "0")
            {
                var str = (Number((thisval * Number(price)) / 100) + Number(price)).toFixed(leng);
                trailingStep.text(str);

                if (limitSpreadInput.val() == "") {
                    limitSpread.text("Ind. Limit: " + str);
                }
                else {
                    var str1 = ((limitSpreadInputvalue * size) + Number(price)).toFixed(leng);
                    limitSpread.text("Ind. Limit: " + str1);
                }
            }
            else
            {
                var str = (Number((thisval * Number(price)) / 100) + Number(price)).toFixed(leng);
                trailingStep.text(str);

                if (limitSpreadInput.val() == "") {
                    limitSpread.text("Ind. Limit: " + str);
                }
                else {
                    var str1 = ((limitSpreadInputvalue * size) + Number(str)).toFixed(leng);
                    limitSpread.text("Ind. Limit: " + str1);
                }
            }
        });
        $("#CFD-Trailling-Stop-Order .input-input input:first-child").keyup(function () {
            var thisval = parseFloat($(this).val());
            var price1 = parseFloat($("#CFD-Trailling-Stop-Order .trailingStep span:last-child").text());
            var limitSpread = $("#CFD-Trailling-Stop-Order .limitSpread span:first-child"), leng = price1.toString().lastIndexOf(".") + 1;
            if ($(this).val() == "") {
                limitSpread.text("Ind. Limit: " + price1);
            } else {
                var str = ((thisval * size) + price1).toFixed(leng);
                limitSpread.text("Ind. Limit: " + str);
            }
        });
    }

    //OrderFormFT/FX/FXMNUI
    function OrderFormFTFXFXMNUI(obj, productIcon, counterId, name, product, exchange, symbol) {
        //变量
        var str = "", str1 = "", str2 = "<ul><li>Initial Margin</li><li>Maintenance Margin</li></ul>";
        var arry = [];
        var Ordertype = $("#FTFXFXMN-Ordertype");
        var FTFXFXMNTimeType = $("#FTFXFXMN-Limited-Order .Effectiveness");
        var FTFXFXMNAmount = $(".FTFXFXMN-Amount");
        var FTFXFXMNTradetitle = $("#FTFXFXMN-Trade-title");
        
        //重置
        Ordertype.empty();
        FTFXFXMNTimeType.empty();
        Ordertype.removeAttr("product");
        Ordertype.removeAttr("tickSize");
        FTFXFXMNAmount.empty();
        $("#FTFXFXMN-Limited-Order .input-input input:first-child").val("");
        $("#FTFXFXMN-Limited-Order .input-input input:last-child").val("");
        $("#FTFXFXMN-Limited-Order .stopLimitPrice input").val("");
        $("#FTFXFXMN-Limited-Order .TradePassword input").val("");
        //InputFocus("#FTFXFXMN-Trade");

        FTFXFXMNTradetitle.empty();
        //Ordertype
        for (var i = 0; i < obj["data"]["orderTypes"].length; i++) {
            str += "<option value='" + obj["data"]["orderTypes"][i]["id"] + "'>" + obj["data"]["orderTypes"][i]["display"] + "</option>";
        }
        Ordertype.append(str);

        for (var j = 0; j < obj["data"]["expiry"].length; j++) {
            str1 += "<option value='" + obj["data"]["expiry"][j]["id"] + "'>" + obj["data"]["expiry"][j]["display"] + "</option>";
        }
        FTFXFXMNTimeType.append(str1);
        Ordertype.val("2");
        Ordertype.attr("product", product);
        Ordertype.attr("tickSize", obj["data"]["tickSize"]);
        //$("#FTFXFXMN-Limited-Order .input-input").next().text("Tick Size:" + obj["data"]["tickSize"]);
        $("#FTFXFXMN-Limited-Order .input-input").next().css({ "width": "50%", "float": "left" });
        $("#FTFXFXMN-Limited-Order .input-input").next().next().css({ "width": "50%", "float": "right" });
        $("#FTFXFXMN-Limited-Order .input-input").next().text("Currency:" + obj["data"]["marginCurrency"]);
        $("#FTFXFXMN-Limited-Order .input-input").next().next().text(obj["data"]["displayLotSizeAndUnit"]);

        if (obj["data"]["lastDone"] == undefined || obj["data"]["lastDone"] == "" || obj["data"]["lastDone"] == null) {
            $("#FTFXFXMN-Limited-Order .input-input input:first-child").val(obj["data"]["askPrice"]);
        } else {
            $("#FTFXFXMN-Limited-Order .input-input input:first-child").val(obj["data"]["lastDone"]);
        }
        $("#FTFXFXMN-Limited-Order .input-input input:last-child").val(obj["data"]["defaultQuantity"]);
        str2 += "<ul><li>" + obj["data"]["initialMargin"] + "</li><li>" + obj["data"]["maintenanceMargin"] + "</li></ul>";
        FTFXFXMNAmount.append(str2);

        FTFXFXMNTradetitle.append(WatchlistOrderStatusLeft(obj, productIcon, name));
        ElementCSS(FTFXFXMNTradetitle);

        var Effectiveness = $("#FTFXFXMN-Trade .Effectiveness").val();
        var EffectivenessNext = $("#FTFXFXMN-Trade input[type='date']");
        var datatime = data();
        if (Effectiveness == "0") {
            EffectivenessNext.val(datatime);
            EffectivenessNext.attr("disabled", "disabled");
        }

        var TradePassword = $("#FTFXFXMN-Trade .TradePassword");
        var TradePasswordprev = TradePassword.prev();
        TradePassword.show();
        TradePasswordprev.show();
        if (passwordConfirmation == false) {
            TradePassword.hide();
            TradePasswordprev.hide();
        }

        FTFXFXMNDomDataParameter(product, counterId, exchange, symbol);
        $("#FTFXFXMN-Trade").show();
    }

    function FTFXFXMNDomDataParameter(product, counterId, exchange, symbol) {
        var arry1 = [], arry2 = [], arry3 = [], arry4=[];
        arry1.splice(0, arry1.length);
        arry3.splice(0, arry3.length);
        var tickSize = $("#FTFXFXMN-Ordertype").attr("tickSize");
        var askPrice = $("#FTFXFXMN-Ordertype").attr("askPrice");
        var bidPrice = $("#FTFXFXMN-Ordertype").attr("bidPrice");
        if (product == "FT") {
            arry1.push($("#FTFXFXMN-Limited-Order .TradePassword input"), exchange, symbol, $("#FTFXFXMN-Ordertype"), $("#FTFXFXMN-Limited-Order .input-input input:first-child"), $("#FTFXFXMN-Limited-Order .input-input input:last-child"), $("#FTFXFXMN-Limited-Order .Effectiveness"), tickSize);
            VerificationSubmitAPI("#FTFXFXMN-", arry1, product, counterId);
        } else {
            arry3.push($("#FTFXFXMN-Limited-Order .TradePassword input"), symbol, $("#FTFXFXMN-Ordertype"), $("#FTFXFXMN-Limited-Order .input-input input:first-child"), $("#FTFXFXMN-Limited-Order .input-input input:last-child"), $("#FTFXFXMN-Limited-Order .Effectiveness"), $("#FTFXFXMN-Limited-Order .ocoPrice:eq(1) input"), tickSize)
            VerificationSubmitAPI("#FTFXFXMN-", arry3, product, counterId);
        }
        $("#FTFXFXMN-Ordertype").change(function () {
            arry1.splice(0, arry1.length);
            arry2.splice(0, arry2.length);
            arry3.splice(0, arry3.length);
            arry4.splice(0, arry4.length);
            arry1.push($("#FTFXFXMN-Limited-Order .TradePassword input"), exchange, symbol, $("#FTFXFXMN-Ordertype"), $("#FTFXFXMN-Limited-Order .input-input input:first-child"), $("#FTFXFXMN-Limited-Order .input-input input:last-child"), $("#FTFXFXMN-Limited-Order .Effectiveness"), tickSize);
            arry2.push($("#FTFXFXMN-Limited-Order .TradePassword input"), exchange, symbol, $("#FTFXFXMN-Ordertype"), $("#FTFXFXMN-Limited-Order .input-input input:first-child"), $("#FTFXFXMN-Limited-Order .input-input input:last-child"), $("#FTFXFXMN-Limited-Order .Effectiveness"), $("#FTFXFXMN-Limited-Order .stopLimitPrice:eq(1) input"), tickSize);
            arry3.push($("#FTFXFXMN-Limited-Order .TradePassword input"), symbol, $("#FTFXFXMN-Ordertype"), $("#FTFXFXMN-Limited-Order .input-input input:first-child"), $("#FTFXFXMN-Limited-Order .input-input input:last-child"), $("#FTFXFXMN-Limited-Order .Effectiveness"), $("#FTFXFXMN-Limited-Order .ocoPrice:eq(1) input"), tickSize)
            arry4.push($("#FTFXFXMN-Limited-Order .TradePassword input"), symbol, $("#FTFXFXMN-Ordertype"), $("#FTFXFXMN-Limited-Order .input-input input:first-child"), $("#FTFXFXMN-Limited-Order .input-input input:last-child"), $("#FTFXFXMN-Limited-Order .Effectiveness"), $("#FTFXFXMN-Limited-Order .ocoPrice:eq(1) input"), tickSize)
            var thisval = $(this).val();
            var product = $(this).attr("product");
            if (product == "FT") {
                if (thisval == "2") {
                    VerificationSubmitAPI("#FTFXFXMN-", arry1, product, counterId);
                    $(".stopLimitPrice").hide();
                    $(".ocoPrice").hide();
                } else if (thisval == "3") {
                    VerificationSubmitAPI("#FTFXFXMN-", arry1, product, counterId);
                    $(".stopLimitPrice").hide();
                    $(".ocoPrice").hide();
                } else if (thisval == "4") {
                    VerificationSubmitAPI("#FTFXFXMN-", arry2, product, counterId);
                    $(".stopLimitPrice").show();
                    $(".ocoPrice").hide();
                }
            } else if (product == "FX"||product == "FXMN") {
                if (thisval == "2") {
                    VerificationSubmitAPI("#FTFXFXMN-", arry3, product, counterId);
                    $(".stopLimitPrice").hide();
                    $(".ocoPrice").hide();
                } else if (thisval == "3") {
                    VerificationSubmitAPI("#FTFXFXMN-", arry3, product, counterId);
                    $(".stopLimitPrice").hide();
                    $(".ocoPrice").hide();
                } else if (thisval == "4") {
                    VerificationSubmitAPI("#FTFXFXMN-", arry3, product, counterId);
                    $(".stopLimitPrice").hide();
                    $(".ocoPrice").hide();
                } else if (thisval == "5") {
                    VerificationSubmitAPI("#FTFXFXMN-", arry4, product, counterId);
                    $(".stopLimitPrice").hide();
                    $(".ocoPrice").show();
                } else if (thisval == "6") {
                    VerificationSubmitAPI("#FTFXFXMN-", arry4, product, counterId);
                    $(".stopLimitPrice").hide();
                    $(".ocoPrice").show();
                }
            }
            $("#loading").hide();
        });
        $(".stopLimitPrice").hide();
        $(".ocoPrice").hide();
        $("#loading").hide();
    }

    //OrderFormUT
    function OrderFormInfoData(thisMap) {

        $("#loading").show();
        var counterId = thisMap.counterId.value;
        var product = thisMap.product.value;
        var name = thisMap.name.value;
        var exchange = thisMap.exchange.value;
        var symbol = thisMap.symbol.value;
        var productIcon = thisMap.productIcon.value;
        var APIUrl = WatchlistformAPI(1, product);

        let arry = {}, A = 0;
        arry["GeneralInfo"] = "Counter/UTGeneralInfo?counterId=";
        arry["ManagerInfo"] = "Counter/UTManagerInfo?counterId=";
        arry["Documents"] = "Counter/UTDocuments?counterId=";
        arry["Performance"] = "Counter/UTPerformance?counterId=";
        arry["Rsp"] = "Counter/UTRsp?counterId=";

        for (let i in arry)
        {
            $.post(rootpath + arry[i] + counterId, function (data) {
                let object = JSON.parse(data);
                if (object["code"] == 1) {
                    for (let j in object) {

                        if (j == "code" || j == "msg" ) {
                            delete object[j];
                        }
                    }
                    A++;
                    for (let j in object)
                    {
                    
                        if (j == "price4Week" || j == "mgrName" || j == "documents" || j == "performanceReturn" || j == "monthlyRSP")
                        {
                            switch (j) {
                                case "price4Week":
                                    FormInfoUT_GeneralInfo(object, name);
                                    break;
                                case "mgrName":
                                    FormInfoUT_ManagerInfo(object);
                                    break;
                                case "documents":
                                    FormInfoUT_Documents(object);
                                    break;
                                case "performanceReturn":
                                    FormInfoUT_Performance(object,name);
                                    break;
                                case "monthlyRSP":
                                    FormInfoUT_Rsp(object);
                                    break;
                                default:
                                    return;
                            }
                        }
                    }
                    if (A == 4)
                    {
                        $("#loading").hide();
                        $("#trade_UT_INfo").show();
                         
                        let trade_UT_INfo_title = $("#trade_UT_INfo_title");
                        trade_UT_INfo_title.empty();
                        trade_UT_INfo_title.append(WatchlistOrderStatusLeft(trade_UT_INfo_title, productIcon, name));
                        ElementCSS(trade_UT_INfo_title);
                        SubscribeDataUT(1, counterId, $("#trade_UT_INfo .Detailtitle-bottom-left"), $("#trade_UT_INfo .Detailtitle-bottom-right"));

                        $("#UT_trade").unbind("click");
                        $("#UT_trade").click(function () {
                            $("#loading").show();
                            $.post(rootpath + APIUrl, "counterId=" + counterId, function (data) {
                                let object = JSON.parse(data);
                                if (object["code"] == 1) {
                                    $.post(rootpath + "Counter/UTDocuments?counterId=" + counterId, function (data) {
                                        let Documents = JSON.parse(data);
                                        if (Documents["code"] == 1) {

                                            OrderFormUT(object, productIcon, counterId, name, product, object["availableCash"], Documents);
                                            SubscribeDataUT(1, counterId, $("#UT-Trade .Detailtitle-bottom-left"), $("#UT-Trade .Detailtitle-bottom-right"));
                                            $("#trade_UT_INfo").hide();
                                            $("#UT-Trade").show();
                                        }
                                        else
                                        {
                                            scrollingX = false;
                                            startPMP();
                                            $("#loading").hide();
                                            ShowAlert(Documents["msg"]);
                                            return;
                                        }
                                    });
                                }
                                else
                                {
                                    scrollingX = false;
                                    startPMP();
                                    $("#loading").hide();
                                    ShowAlert(object["msg"]);
                                    return;
                                }
                            });

                        });
                    }
                }
                else
                {
                    scrollingX = false;
                    startPMP();
                    $("#loading").hide();
                    return;
                }

            });
        }
    }
    //FormInfoUT > GeneralInfo
    function FormInfoUT_GeneralInfo(object, name) {

        let Strings = "<ul><li></li>", Strings1 = "<ul><li>Cash</li><li>SRS-IA</li><li>CPEOA-IA</li><li>CPESA-IA</li></ul>", a = 0, arry = [];

        const Low_High = $("#General_Infos .Low_High ul li:last-child");
        const General_InfoLast = $("#General_Info .accordion-item-content ol li ol li:last-child");
        const Investment_Objective = $("#Investment_Objective .accordion-item-content p");
        const Investment_Amount_Left = $("#Investment_Amount_Left");
        const Investment_Amount_Content = $("#Investment_Amount_Content");
        const Relevant_Charges_Left = $("#Relevant_Charges_Left");
        const Relevant_Charges_Content = $("#Relevant_Charges_Content");
        const Fund_Awards_Left = $("#Fund_Awards_Left");
        const Fund_Awards_Content = $("#Fund_Awards_Content");
        const Fund_Awards_Left1 = $("#Fund_Awards_Left1");
        const Fund_Awards_Content1 = $("#Fund_Awards_Content1");
        Low_High.text("");
        General_InfoLast.text("");
        Investment_Objective.text("");
        Investment_Amount_Left.empty();
        Investment_Amount_Content.empty();
        Relevant_Charges_Left.empty();
        Relevant_Charges_Content.empty();
        Fund_Awards_Left.empty();
        Fund_Awards_Content.empty();
        Fund_Awards_Left1.empty();
        Fund_Awards_Content1.empty();
        //Low_High
        Low_High.eq(0).text(object["price4Week"]["high"] + "(@" + object["price4Week"]["highDate"] + ")");
        Low_High.eq(1).text(object["price4Week"]["low"] + "(@" + object["price4Week"]["lowDate"] + ")");
        //General_Info
        for (let i in object["fundInfo"])
        {
            if (i != "source" && i != "isRSP" && i != "objective")
            {
                if (object["fundInfo"][i] == "")
                    object["fundInfo"][i] = "-";
                arry[a] = object["fundInfo"][i];
                a++;
            }
        }
        for (i = 0; i < General_InfoLast.length; i++)
        {
            for (let j = 0; j < arry.length; j++)
            {
                if (i == j)
                {
                    General_InfoLast[i].innerText = arry[j];
                }
            }
        }
        //Investment Objective
        Investment_Objective.text(object["investmentObjective"]);
        //Investment Ammount
        var investmentAmmount = Arry_data(object["investmentAmmount"]);
        var Arry = Characters_of_the_adapter(investmentAmmount, Strings, Strings1);
        Investment_Amount_Left.append(Arry[0]);
        Investment_Amount_Content.append(Arry[1]);
        Strings = "<ul><li></li>";
        Strings1 = "<ul><li>Cash</li><li>SRS-IA</li><li>CPEOA-IA</li><li>CPESA-IA</li></ul>";
        //Relevant Charges
        var relevantCharges = Arry_data(object["relevantCharges"]);
        var Arry = Characters_of_the_adapter(relevantCharges, Strings, Strings1);
        Relevant_Charges_Left.append(Arry[0]);
        Relevant_Charges_Content.append(Arry[1]);
        //Fund Awards
        var hpx = FontSizeUT("Lipper Ratings Classification");
        Strings = "<ul><li style='" + hpx + "'>Lipper Ratings Classification</li>";
        Strings1 = "<ul><li>Total Return</li><li>Consistent Return</li><li>Preservation</li><li>Expense</li></ul>";
        var lipperRatings = Arry_data(object["lipperRatings"]);

        for (i = 0; i < lipperRatings.length; i++) {
            var hpx = FontSizeUT(lipperRatings[i]["classification"]);
            Strings += "<li style='" + hpx + "'>" + lipperRatings[i]["classification"] + "</li>";
            Strings1 += "<ul><li>" + lipperRatings[i]["totalReturn"] + "</li><li>" + lipperRatings[i]["consistentReturn"] + "</li><li>" + lipperRatings[i]["preservation"] + "</li><li>" + lipperRatings[i]["expense"] + "</li></ul>";
        }
        Strings += "</ul>";

        Fund_Awards_Left.append(Strings);
        Fund_Awards_Content.append(Strings1);

        var hpx = FontSizeUT("Morningstar Ratings Classification");
        Strings = "<ul><li style='" + hpx + "'>Morningstar Ratings Classification</li>";
        Strings1 = "<ul><li>Overall</li><li>Three Years</li><li>Five Years</li><li>Ten Years</li></ul>";

        var morningstarRatings = Arry_data(object["morningstarRatings"]);

        for (i = 0; i < morningstarRatings.length; i++) {
            var hpx = FontSizeUT(name);
            Strings += "<li style='" + hpx + "'>" + name + "</li>";
            Strings1 += "<ul><li>" + morningstarRatings[i]["overall"] + "</li><li>" + morningstarRatings[i]["threeYears"] + "</li><li>" + morningstarRatings[i]["fiveYears"] + "</li><li>" + morningstarRatings[i]["tenYears"] + "</li></ul>";
        }
        Strings += "</ul>";

        Fund_Awards_Left1.append(Strings);
        Fund_Awards_Content1.append(Strings1);
    }
    //FormInfoUT > ManagerInfo
    function FormInfoUT_ManagerInfo(object) {

        let String = "<h4>Fund Manager Information</h4>";

        const Fund_Manager_Info = $("#Fund_Manager_Info .Fund_Manager_Info_content");
        Fund_Manager_Info.empty();
        //Fund Manager Info
        String += "<img src='" + object["logo"] + "' />";
        String += "<p>" + object["fmAddress1"] + " " + object["fmAddress2"] + " " + object["fmAddress3"] + "</p>";
        String += "<p><a href='javascript:;'>" + object["website"] + "</a></p>";
        String += "<h3>About Fund Manager</h3>";
        String += "<p>" + object["comintro"]+"</p>";
        String += "<h3>Philosophy</h3>";
        String += "<p>" + object["philosophy"] + "</p>";

        Fund_Manager_Info.append(String);
    }
    //FormInfoUT > Documents
    function FormInfoUT_Documents(object) {

        let Strings = "";

        const Documents_content_chunks = $("#Documents .Documents_content");
        Documents_content_chunks.empty();

        //Documents_content_chunk
        var Documents_documents = Arry_data(object["documents"]);
        for (let i = 0; i < Documents_documents.length; i++)
        {
            Strings += "<div class='Documents_content_chunk'><a></a>";
            Strings += "<h4>" + Documents_documents[i]["title"] + "</h4><p>as of " + Documents_documents[i]["date"]+"</p>";
            Strings += "</div>";
        }
        Documents_content_chunks.append(Strings); Strings = ""; 

        const Documents_content_chunk = $(".Documents_content_chunk");
        for (i = 0; i < Documents_content_chunk.length; i++)
        {
            for (let j = 0; j < Documents_documents.length; j++)
            {
                if (i == j)
                {
                    Documents_content_chunk[i].onclick = function () {
                        window.open(Documents_documents[j]["url"]);
                    }
                }
            }
        }
    }
    //FormInfoUT > Performance
    function FormInfoUT_Performance(object,name) {

        let series = Performance_charts.series[0].data = [], series1 = Performance_chart1s.series[0].data = [];

        const Performance_Return = $("#Performance_table tbody tr").eq(0).children("td").eq(0);
        const Annualized_Return = $("#Performance_table1 tbody tr").eq(0).children("td").eq(0);
        const Performance_Return_table = $("#Performance_table tbody tr:not(:first-child)");
        const Annualized_Return_table = $("#Performance_table1 tbody tr:not(:first-child)");
        Performance_Return.empty();
        Annualized_Return.empty();
        for (let i = 0; i < Performance_Return_table.length; i++)
        {
            Performance_Return_table.eq(i).children("td").text("");
        }
        for (let i = 0; i < Annualized_Return_table.length; i++) {
            Annualized_Return_table.eq(i).children("td").text("");
        }

        //Performance Return
        Performance_Return.append(name + "<span></span>");

        //Performance Return table
        for (i = 0; i < object["performanceReturn"].length; i++)
        {
            Performance_Return_table.eq(i).children("td").eq(0).text(object["performanceReturn"][i]["period"]);
            Performance_Return_table.eq(i).children("td").eq(1).text(object["performanceReturn"][i]["value"]);
        }

        //Performance Return 图表
        var Performance_Returns = Arry_data(object["performanceReturn"]);
        for (i = 0; i < Performance_Returns.length; i++) {
            series.push(Number(Performance_Returns[i]["value"]));
        }
        Echart.setOption(Performance_chart, Performance_charts);

        //Annualized Return
        Annualized_Return.append(name + "<span></span>");

        //Annualized Return table
        for (i = 0; i < object["annualizedReturn"].length; i++) {
            Annualized_Return_table.eq(i).children("td").eq(0).text(object["annualizedReturn"][i]["period"]);
            Annualized_Return_table.eq(i).children("td").eq(1).text(object["annualizedReturn"][i]["value"]);
        }

        //Annualized Return 图表
        var Annualized_Returns = Arry_data(object["annualizedReturn"]);
        for (i = 0; i < Annualized_Returns.length; i++) {
            series1.push(Number(Annualized_Returns[i]["value"]));
        }
        Echart.setOption(Performance_chart1, Performance_chart1s);

        //Compare
        Trade_Search("UT", "UT", $(".Compare"));
    }

    function UT_chart(object,name) {

        let series = Performance_charts.series[1].data = [], series1 = Performance_chart1s.series[1].data = [];

        const Performance_Return_table = $("#Performance_table tbody tr:not(:first-child)");
        const Annualized_Return_table = $("#Performance_table1 tbody tr:not(:first-child)");
        $(".Compare").empty();

        $(".Compare").append(name + "<span></span>");
        $(".Compare").css({
            "height":"60px",
            "background":"#f2f2f2",
            "fontSize":"12px",
            "fontWeight": "bolder",
        });
        if (name.length >= 40)
        {
            $(".Compare").css("fontSize","10px");
        }
        
        for (let i = 0; i < Performance_Return_table.length; i++) {
            Performance_Return_table.eq(i).children("td").eq(2).text("");
        }
        for (let i = 0; i < Annualized_Return_table.length; i++) {
            Annualized_Return_table.eq(i).children("td").eq(2).text("");
        }

        //Performance Return table
        for (i = 0; i < object["performanceReturn"].length; i++) {
            Performance_Return_table.eq(i).children("td").eq(2).text(object["performanceReturn"][i]["value"]);
        }

        //Annualized Return table
        for (i = 0; i < object["annualizedReturn"].length; i++) {
            Annualized_Return_table.eq(i).children("td").eq(2).text(object["annualizedReturn"][i]["value"]);
        }

        //Performance Return 图表
        var Performance_Returns = Arry_data(object["performanceReturn"]);
        for (i = 0; i < Performance_Returns.length; i++) {
            series.push(Number(Performance_Returns[i]["value"]));
        }
        Echart.setOption(Performance_chart, Performance_charts);

        //Annualized Return 图表
        var Annualized_Returns = Arry_data(object["annualizedReturn"]);
        for (i = 0; i < Annualized_Returns.length; i++) {
            series1.push(Number(Annualized_Returns[i]["value"]));
        }
        Echart.setOption(Performance_chart1, Performance_chart1s);

        $("#loading").hide();
        $("#UTTrade").hide();
    }
    //FormInfoUT > Regular Savings Plan
    function FormInfoUT_Rsp(object) {

        let Strings = "<ul><li></li>", Strings1 = "<ul><li>Cash</li><li>SRS-IA</li><li>CPEOA-IA</li><li>CPESA-IA</li></ul>", a = 0, arry = [];

        const Monthly_Rsp_Left = $("#Regular_Savings_Plan_Left");
        const Monthly_Rsp_Content = $("#Regular_Savings_Plan_Content");
        const Quarterly_Rsp_Left = $("#Regular_Savings_Plan_Left1");
        const Quarterly_Rsp_Content = $("#Regular_Savings_Plan_Content1");
        const Regular_Savings_Plan_title = $(".Regular_Savings_Plan_title");
        const Regular_Savings_Plan_p = $("#Regular_Savings_Plan p");
        Monthly_Rsp_Left.empty();
        Monthly_Rsp_Content.empty();
        Quarterly_Rsp_Left.empty();
        Quarterly_Rsp_Content.empty();
        Regular_Savings_Plan_p.empty();

        //判断可现实
        if (object["approved"]) {
            //Monthly Regular Savings Plan Charges
            var Monthly_Rsp_Charges = Arry_data(object["monthlyRSP"]);
            var Arry = Characters_of_the_adapter(Monthly_Rsp_Charges, Strings, Strings1);
            Monthly_Rsp_Left.append(Arry[0]);
            Monthly_Rsp_Content.append(Arry[1]);
            Strings = "<ul><li></li>";
            Strings1 = "<ul><li>Cash</li><li>SRS-IA</li><li>CPEOA-IA</li><li>CPESA-IA</li></ul>";
            //Quarterly Regular Savings Plan Charges
            var Quarterly_Rsp_Charges = Arry_data(object["quarterlyRSP"]);
            var Arry = Characters_of_the_adapter(Quarterly_Rsp_Charges, Strings, Strings1);
            Quarterly_Rsp_Left.append(Arry[0]);
            Quarterly_Rsp_Content.append(Arry[1]);
            //
            Regular_Savings_Plan_p.append("<span>Learn more about Regular Savings Plan</span>");
            Regular_Savings_Plan_p.css("paddingTop", "0");
            Regular_Savings_Plan_p.click(function () {
                window.open(object["learnMoreURL"]);
            });

            Regular_Savings_Plan_title.show();
            Monthly_Rsp_Left.show();
            Monthly_Rsp_Content.show();
            Quarterly_Rsp_Left.show();
            Quarterly_Rsp_Content.show();
        }
        else {
            Regular_Savings_Plan_title.hide();
            Monthly_Rsp_Left.hide();
            Monthly_Rsp_Content.hide();
            Quarterly_Rsp_Left.hide();
            Quarterly_Rsp_Content.hide();
            Regular_Savings_Plan_p.append("The fund is not available for normal savings plans<br/><span>click here</span> to see RSP approved list of funds");
            Regular_Savings_Plan_p.css("paddingTop", "42%");
            Regular_Savings_Plan_p.click(function () {
                window.open(object["approvedListURL"]);
            });
        }
    }

    function FontSizeUT(string,type) {
        var le = string.length;
        if (type == 1) {
            if (le > 27) {
                return "line-height:16px";
            }
            else if (le > 14) {
                return "line-height:22px";
            }
        }
        else
        {
            if (le > 42) {
                return "line-height:16px";
            }
            else if (le > 22 && le < 42) {
                return "line-height:22px";
            }
        }

    }

    function Characters_of_the_adapter(relevantCharges, Strings, Strings1) {

        var arry = [];
        for (let i = 0; i < relevantCharges.length; i++) {

            var hpx = FontSizeUT(relevantCharges[i]["desc"]);
            Strings += "<li style='" + hpx + "'>" + relevantCharges[i]["desc"] + "</li>";

            Strings1 += "<ul>";
            for (var n in relevantCharges[i]) {
                if (n != "desc" && n != "annualManagementFeeManager" && n != "annualTrusteeFeeManager" && n != "expenseRatio") {
                    var hpx = FontSizeUT(relevantCharges[i][n], 1);
                    Strings1 += "<li style='" + hpx + "'>" + relevantCharges[i][n] + "</li>";
                }
            }
            Strings1 += "</ul>";

        }
        Strings += "</ul>";

        arry.push(Strings, Strings1);
        return arry;
    }

    function Arry_data(arry) {

        if (arry.length == undefined)
        {
            for (var i in arry) {
                if (arry[i] == "" || arry[i] == null) {
                    arry[i] = "-";
                }
            }
        }
        else
        {
            for (var i = 0; i < arry.length; i++)
            {
                for (var j in arry[i])
                {
                    if (arry[i][j] == "") {
                        arry[i][j] = "-";
                    }
                    else if (arry[i][j] == "N/A")
                    {
                        arry[i][j] = "";
                    }
                }
            }
        }
        return arry;
    }

    function OrderFormUT(object, productIcon, counterId, name, product, availableCash, Documents) {
        let String = "";

        const Buy_Funding_Sources = $("#UT_Trade_content_Buy .select-select select:first-child");
        const Buy_Payment_Currency = $("#UT_Trade_content_Buy .select-select select:last-child");
        const Buy_MIA = $("#UT_Trade_content_Buy .MIA");
        const Buy_MAA = $("#UT_Trade_content_Buy .MAA");
        const Buy_SE = $("#UT_Trade_content_Buy .SE");
        const UTtitle = $("#UT-Trade-title");
        const Sell_The_Reference = $("#UT_Trade_content_Sell .The_Reference");
        const Sell_Funding_Sources = $("#UT_Trade_content_Sell .select-select select:first-child");
        const Sell_Payment_Currency = $("#UT_Trade_content_Sell .select-select select:last-child");
        const Switch_title_div = $("#UT_Trade_content_Switch .Switch_title_div .Switch_title");
        const Switch_The_Reference = $("#UT_Trade_content_Switch .The_Reference");
        const Switch_Funding_Sources = $("#UT_Trade_content_Switch .select-select select:first-child");
        const Switch_Payment_Currency = $("#UT_Trade_content_Switch .select-select select:last-child");
        const Switch_Search_fund = $("#UT_Trade_content_Switch .Search>div");

        const UTAmount = $("#UT-Trade .UT-Amount");
        const UT_input = $("#UT-Trade input");
        const PDF_Info = $("#UT-Trade .PDF_Info");
        Buy_Funding_Sources.empty();
        Buy_Payment_Currency.empty();
        Buy_MIA.empty(); Buy_MAA.empty();
        Buy_SE.empty(); UTAmount.empty();
        Sell_The_Reference.empty();
        Sell_Funding_Sources.empty();
        Sell_Payment_Currency.empty();
        UTtitle.empty(); UT_input.val("");
        Switch_title_div.empty();
        Switch_Funding_Sources.empty();
        Switch_Payment_Currency.empty();
        Switch_The_Reference.empty();
        Switch_Search_fund.empty();
        PDF_Info.empty();

        //UT_Trade_content_Buy
        UTtitle.append(WatchlistOrderStatusLeft(UTtitle, productIcon, name));
        ElementCSS(UTtitle);

        let Buy_Funding_SourcesS = Arry_data(object["buyInfo"]["fundSources"]);
        for (let i = 0; i < Buy_Funding_SourcesS.length; i++)
        {
            String += "<option value='" + Buy_Funding_SourcesS[i]["value"] + "'>" + Buy_Funding_SourcesS[i]["text"] + "</option>";
        }
        Buy_Funding_Sources.append(String); String = "";

        let Buy_Payment_CurrencyS = Arry_data(object["buyInfo"]["paymentCurrencies"]);
        for (i = 0; i < Buy_Payment_CurrencyS.length; i++) {
            String += "<option value='" + Buy_Payment_CurrencyS[i]["value"] + "'>" + Buy_Payment_CurrencyS[i]["text"] + "</option>";
        }
        Buy_Payment_Currency.append(String); String = "";

        Buy_MIA.append("<span>Min.Investment Amount:</span><span>" + object["buyInfo"]["minIniInvAmt"] + " " + object["buyInfo"]["fundCurrency"] + "</span>");
        Buy_MAA.append("<span>Min.Sub Investment Amount:</span><span>" + object["buyInfo"]["minSubInvAmt"] + " " + object["buyInfo"]["fundCurrency"] + "</span>");
        Buy_SE.append("<span>Sales Charge:</span><span>" + Number(object["buyInfo"]["salesCharge"]) + "%</span>");

        //UT_Trade_content_Sell
        String = "<select class='Reference_select'>";
        let Sell_The_ReferenceS = object["sellInfoList"];

        if (Sell_The_ReferenceS.length > 0)
        {
            for (i = 0; i < Sell_The_ReferenceS.length; i++)
            {
                String += "<option name='" + i + "' value='" + Sell_The_ReferenceS[i]["minRedeemAmt"] + "'>Available Unit: " + Sell_The_ReferenceS[i]["availableUnit"] + "; Unit: " + Sell_The_ReferenceS[i]["minRedeemAmt"] + "</option>";
            }
            String += "</select>";
            Sell_The_Reference.append(String); String = "";

            let Sell_Funding_SourcesS = object["sellInfoList"][0]["fundSource"];
            var text;
            for (var j in Sell_Funding_SourcesS) {
            
                if (j == "value") {
                    text = Sell_Funding_SourcesS[j];
                }
                else
                {

                    String += "<option value='" + text + "'>" + Sell_Funding_SourcesS[j] + "</option>";
                }
            }
            Sell_Funding_Sources.append(String); String = "";

            let Sell_Payment_CurrencyS = Arry_data(object["sellInfoList"][0]["paymentCurrencies"]);
            for (i = 0; i < Sell_Payment_CurrencyS.length; i++) {
                String += "<option value='" + Sell_Payment_CurrencyS[i]["value"] + "'>" + Sell_Payment_CurrencyS[i]["text"] + "</option>";
            }
            Sell_Payment_Currency.append(String); String = "";

            UT_Sell_Switch_change(object["sellInfoList"], Sell_Funding_Sources, Sell_Payment_Currency, $("#UT_Trade_content_Sell .Reference_select"));

            $("#UT-Trade .UT_trading_manner li").eq(1).removeAttr("disabled");
            $("#UT-Trade .UT_trading_manner li").eq(1).css("background","red");
        }
        else
        {
            $("#UT-Trade .UT_trading_manner li").eq(1).attr("disabled", "disabled");
            $("#UT-Trade .UT_trading_manner li").eq(1).css("background", "#ccc");
        }

        //UT_Trade_content_Switch
        String = "<select class='Reference_select'>";
        let Switch_The_ReferenceS = object["switchInfoList"];
        Switch_title_div.append(WatchlistOrderStatusLeft(object, productIcon, name));

        if (Switch_The_ReferenceS.length > 0)
        {
            for (i = 0; i < Switch_The_ReferenceS.length; i++)
            {
                String += "<option name='" + i + "' value='" + Switch_The_ReferenceS[i]["minRedeemAmt"] + "'>Available Unit: " + Switch_The_ReferenceS[i]["availableUnit"] + "; Unit: " + Switch_The_ReferenceS[i]["minRedeemAmt"] + "</option>";
            }
            Switch_The_Reference.append(String); String = "";

            let Switch_Funding_SourcesS = object["sellInfoList"][0]["fundSource"];
            var text;
            for (var j in Switch_Funding_SourcesS) {

                if (j == "value") {
                    text = Switch_Funding_SourcesS[j];
                }
                else {

                    String += "<option value='" + text + "'>" + Switch_Funding_SourcesS[j] + "</option>";
                }
            }
            Switch_Funding_Sources.append(String); String = "";

            let Switch_Payment_CurrencyS = Arry_data(object["sellInfoList"][0]["paymentCurrencies"]);
            for (i = 0; i < Switch_Payment_CurrencyS.length; i++) {
                String += "<option value='" + Switch_Payment_CurrencyS[i]["value"] + "'>" + Switch_Payment_CurrencyS[i]["text"] + "</option>";
            }
            Switch_Payment_Currency.append(String); String = "";

            UT_Sell_Switch_change(object["sellInfoList"], Switch_Funding_Sources, Switch_Payment_Currency, $("#UT_Trade_content_Switch .Reference_select"));

            Switch_Search_fund.removeAttr("class").append("<div><input type='text' name='Amount' value='' placeholder='Click Proceed Search Fund Name' autocomplete='off' /></div>");

            $("#UT-Trade .UT_trading_manner li").eq(2).removeAttr("disabled");
            $("#UT-Trade .UT_trading_manner li").eq(2).css("background", "#F48D1F");
        }
        else
        {
            $("#UT-Trade .UT_trading_manner li").eq(2).attr("disabled", "disabled");
            $("#UT-Trade .UT_trading_manner li").eq(2).css("background", "#ccc");
        }
       
        UTAmount.append("<ul><li>availableCash</li><li>" + availableCash + "</li></ul>");
        //PDF
        String = "";
        for (let i = 0; i < Documents["documents"].length; i++)
        {
            String += "<div><a></a><ul><li>" + Documents["documents"][i]["title"] + "</li></ul></div>";
        }
        PDF_Info.append(String);
        let PDF_Info_children = $("#UT-Trade .PDF_Info div");
        for (i = 0; i < PDF_Info_children.length; i++)
        {
            for (let j = 0; j < Documents["documents"].length; j++)
            {
                if (i == j)
                {
                    PDF_Info_children[i].onclick = function () {
                        window.open(Documents["documents"][j]["url"]);
                    }
                }
            }
        }

        //change
        UT_trading_type_change(product, counterId);


    }

    function UT_Sell_Switch_change(object, element, element1, elementS) {
        elementS.unbind("change");
        elementS.on("change",function () {
            let name = $(this).children("option:selected").attr("name"), String = "";
            element.empty();
            element1.empty();
            for (let i = 0; i < object.length; i++)
            {
                if (i == Number(name))
                {
                    let elements = object[i]["fundSource"];
                    var text;
                    for (var j in elements) {
                        if (j == "value") {
                            text = elements[j];
                        }
                        else {

                            String += "<option value='" + text + "'>" + elements[j] + "</option>";
                        }
                    }
                    element.append(String); String = "";

                    let element1s = Arry_data(object[i]["paymentCurrencies"]);
                    for (i = 0; i < element1s.length; i++) {
                        String += "<option value='" + element1s[i]["value"] + "'>" + element1s[i]["text"] + "</option>";
                    }
                    element1.append(String);
                }
            }
            //Search fundSource
            Trade_Search("UTSWITCH", "UT", $("#UT_Trade_content_Switch .Search>div"), fundSource = $("#UT_Trade_content_Switch .select-select select:first-child").val());
        });
    }

    function UT_trading_type_change(product, counterId) {

        let UT_trading_manner_LI = $("#UT-Trade .UT_trading_manner li"), arry = [], fundSource = $("#UT_Trade_content_Switch .select-select select:first-child").val();

        for ( i = 0; i < UT_trading_manner_LI.length; i++)
        {
            UT_trading_manner_LI[i].onclick = function () {
                var disabled = $(this).attr("disabled");
                var value = $(this).attr("value");
                if (disabled == undefined)
                {
                    if (value == "Buy")
                    {
                        arry = []; $("#UT-Trade input").val("");
                        $("#UT_Trade_content_Buy").show();
                        $("#UT_Trade_content_Sell").hide();
                        $("#UT_Trade_content_Switch").hide();
                        arry.push($("#UT_Trade_content_Buy .TradePassword input"), $("#UT_Trade_content_Buy .input input"), $("#UT_Trade_content_Buy .select-select select:first-child"), $("#UT_Trade_content_Buy .select-select select:last-child"));
                        $("#UT-Trade .UT_Trade_submit").removeAttr("id value");
                        $("#UT-Trade .UT_Trade_submit").attr({
                            "id": "UT_Buy",
                            "value":"Buy"
                        });
                        $("#UT-Trade .UT_Trade_submit").css("background","#009900");
                        VerificationSubmitAPI("#UT_", arry, product, counterId);
                    }
                    else if (value == "Sell")
                    {
                        arry = []; $("#UT-Trade input").val("");
                        $("#UT_Trade_content_Buy").hide();
                        $("#UT_Trade_content_Sell").show();
                        $("#UT_Trade_content_Switch").hide();
                        arry.push($("#UT_Trade_content_Sell .TradePassword input"), $("#UT_Trade_content_Sell .input input"), $("#UT_Trade_content_Sell .select-select select:first-child"), $("#UT_Trade_content_Sell .select-select select:last-child"), $("#UT_Trade_content_Sell .The_Reference select"));
                        $("#UT-Trade .UT_Trade_submit").removeAttr("id value");
                        $("#UT-Trade .UT_Trade_submit").attr({
                            "id": "UT_Sell",
                            "value": "Sell"
                        });
                        $("#UT-Trade .UT_Trade_submit").css("background", "red");
                        VerificationSubmitAPI("#UT_", arry, product, counterId);
                    }
                    else
                    {
                        arry = []; $("#UT-Trade input").val("");
                        $("#UT_Trade_content_Buy").hide();
                        $("#UT_Trade_content_Sell").hide();
                        $("#UT_Trade_content_Switch").show();
                        //Search fundSource
                        Trade_Search("UTSWITCH", "UT", $("#UT_Trade_content_Switch .Search>div"), fundSource);
                        arry.push($("#UT_Trade_content_Switch .TradePassword input"), $("#UT_Trade_content_Switch .input input"), $("#UT_Trade_content_Switch .select-select select:first-child"), $("#UT_Trade_content_Switch .select-select select:last-child"), $("#UT_Trade_content_Switch .The_Reference select"));
                        $("#UT-Trade .UT_Trade_submit").removeAttr("id value");
                        $("#UT-Trade .UT_Trade_submit").attr({
                            "id": "UT_Switch",
                            "value": "Switch"
                        });
                        $("#UT-Trade .UT_Trade_submit").css("background", "#F48D1F");
                        VerificationSubmitAPI("#UT_", arry, product, counterId);
                        return;
                    }
                }
            }
        }
        //默认buy
        arry = [];
        $("#UT_Trade_content_Buy").show();
        $("#UT_Trade_content_Sell").hide();
        $("#UT_Trade_content_Switch").hide();
        arry.push($("#UT_Trade_content_Buy .TradePassword input"), $("#UT_Trade_content_Buy .input input"), $("#UT_Trade_content_Buy .select-select select:first-child"), $("#UT_Trade_content_Buy .select-select select:last-child"));
        $("#UT-Trade .UT_Trade_submit").removeAttr("id value");
        $("#UT-Trade .UT_Trade_submit").attr({
            "id": "UT_Buy",
            "value": "Buy"
        });
        $("#UT-Trade .UT_Trade_submit").css("background", "#009900");
        VerificationSubmitAPI("#UT_", arry, product, counterId);

        var TradePassword = $("#UT-Trade .TradePassword");
        var TradePasswordprev = TradePassword.prev();
        TradePassword.show();
        TradePasswordprev.show();
        if (passwordConfirmation == false) {
            TradePassword.hide();
            TradePasswordprev.hide();
        }
        $("#UT-Trade").show();
    }

    UT_switch_fund = (counterId, name) => {

        let UT_Search_fund = $("#UT_Trade_content_Switch .Search>div");

        UT_Search_fund.empty();
        UT_Search_fund.attr({
            "class": "Detail-top-title Switch_title",
            "counterId": counterId,
        }).append(WatchlistOrderStatusLeft($(this), "UT", name));
        $("#UT-Search-list>ul").empty();
        $("#UTTrade .clear").hide();
        $("#UTTrade .ContractSearch input").val("");
        $("#UTTrade").hide();
        $("#loading").hide();
    }

    function ElementCSS(ele) {
        ele.find("a").css({ "width": "32px", "height": "28px" });
        ele.find("div").css({ "fontSize": "14px" });
        if (ele.find("div").text().length < 24) {
            ele.find("div").css("lineHeight", "30px");
        } else {
            ele.find("div").css("lineHeight", "16px");
            ele.find("div").css("wordBreak", "keep-all");
        }
    }

    function VerificationSubmitAPI(ele,arrys, product, counterId) {
        arryEleDom = arrys;
        $("" + ele + "Buy").unbind("click");
        $("" + ele + "Buy").on("click",function () {
            var action = $(this).attr("value");
            VerificationSubmit(action, product, counterId, arryEleDom);
            return;
        });
        $("" + ele + "Sell").unbind("click");
        $("" + ele + "Sell").on("click", function () {
            var action = $(this).attr("value");
            VerificationSubmit(action, product, counterId, arryEleDom);
        });
        $("" + ele + "Switch").unbind("click");
        $("" + ele + "Switch").on("click", function () {
            var action = $(this).attr("value");
            VerificationSubmit(action, product, counterId, arryEleDom);
        });
    }

    function VerificationSubmit(action, product, counterId,arry) {


        $("#loading").show();
        var APIUrl = WatchlistformAPI(4, product);
        var password = arry[0].val();arry[0].val("");
        if (passwordConfirmation == true) {
            if (password == "") {
                ShowAlert("Password cannot be empty.");
                $("#loading").hide();
                return;
            }
        }
        var attemptedMessage = "";

        var rsa = new RSAEngine();
        rsa.init(localStorage.publicKey, localStorage.sessionID, localStorage.randomNo);
        var passwordSTR = fnGetRPIN(password, rsa);

        if (product == "ST") {
                var orderType = arry[1].val();
                var limitPrice = arry[2].val();
                if (orderType == "LO") {
                    var quantity = arry[3].val();
                    var settlementCurrency = arry[4].val();
                    var payment = arry[5].val();
                    var gtd = arry[6];
                    var passwordE2ee = passwordSTR;

                    var str = "&passwordE2ee=" + passwordE2ee + "&counterId=" + counterId + "&action1=" + action + "&orderType=" + orderType + "&limitPrice=" + limitPrice + "&quantity=";
                    str += quantity + "&settlementCurrency=" + settlementCurrency + "&payment=" + payment + "&validity=0&gtd=";
                }
                else {
                    var triggerPrice = arry[3].val();
                    var triggerPriceType = arry[7].val();
                    var quantity = arry[4].val();
                    var settlementCurrency = arry[5].val();
                    var payment = arry[6].val();
                    var gtd = arry[8];
                    var passwordE2ee = passwordSTR;

                    var str = "&passwordE2ee=" + passwordE2ee + "&counterId=" + counterId + "&action1=" + action + "&orderType=" + orderType + "&limitPrice=" + limitPrice + "&quantity=";
                    str += quantity + "&settlementCurrency=" + settlementCurrency + "&payment=" + payment + "&validity=0&gtd="+"&triggerPrice=" + triggerPrice + "&triggerPriceType=" + triggerPriceType;
                }

        } else if (product == "CFD" || product == "CFDDMA") {
            var orderType = arry[1];
            var timeInForce = arry[2].val();
            var expireTime = arry[3].val().replace(/-/g, "");
            var passwordE2ee = passwordSTR;

            var strs = "&encryptedPIN=" + passwordE2ee + "&counterId=" + counterId + "&orderType=" + orderType.val() + "&action1=" + action + "&timeInForce=" + timeInForce + "&expireTime=" + expireTime;

            if (orderType.val() == "2") {
                var limitPrice = arry[4].val().replace(/,/g, "");
                var quantity = arry[5].val();

                var str = strs + "&limitPrice=" + limitPrice + "&quantity=" + quantity;
            } else if (orderType.val() == "3") {
                var stopPrice = arry[4].val().replace(/,/g, "");
                var triggerPriceType = arry[5].val();
                var limitPrice = arry[6].val().replace(/,/g, "");
                var quantity = arry[7].val();

                var strN = "&limitPrice=" + limitPrice + "&quantity=" + quantity + "&stopPrice=" + stopPrice + "&triggerPriceType=" + triggerPriceType;
                var str = strs + strN;
            } else if (orderType.val() == "4") {
                var triggerPriceType = arry[4].val();
                var trailingStep = arry[5].val(); 
                var limitSpread = arry[6].val();
                var stopPrice = arry[7].text();
                var Price = arry[8].text();
                var limitPrice = Price.substr(Price.lastIndexOf(" ") + 1, Price.length);
                var quantity = arry[9].val();

                var strN = "&triggerPriceType=" + triggerPriceType + "&trailingStep=" + trailingStep + "&limitSpread=" + limitSpread + "&stopPrice=" + stopPrice + "&limitPrice=" + limitPrice + "&quantity=" + quantity;
                var str = strs + strN;
            }
            else if (orderType.val() == "5") {
                var ifDoneLimitOrderNo = arry[4].val();
                var limitPrice = arry[5].val();
                var quantity = arry[6].val();

                var strN = "&ifDoneLimitOrderNo=" + ifDoneLimitOrderNo + "&limitPrice=" + limitPrice + "&quantity=" + quantity;
                var str = strs + strN;
            } 
            else if (orderType.val() == "6") {
                var triggerPriceType = arry[4].val();
                var ocoStopLimitPrice = arry[5].val();
                var ocoStopLimitQuantity = arry[6].val();
                var stopPrice = arry[7].val();
                var limitPrice = arry[8].val();
                var quantity = arry[9].val();

                var strN = "&triggerPriceType=" + triggerPriceType + "&ocoStopLimitPrice=" + ocoStopLimitPrice + "&ocoStopLimitQuantity=" + ocoStopLimitQuantity + "&stopPrice=" + stopPrice + "&limitPrice=" + limitPrice + "&quantity=" + quantity;
                var str = strs + strN;
            } else if (orderType.val() == "7") {
                var operator = arry[5].val()
                var TriggerType = operator.substr(0, operator.indexOf("/"));
                var conditionOperator = operator.substr(operator.indexOf("/") + 1, operator.length);
                var conditionCompanyCode = arry[4].attr("counterid");
                var conditionPrice = arry[6].val();
                var limitPrice = arry[7].val();
                var quantity = arry[8].val();

                var strN = "&triggerPriceType=" + TriggerType + "&conditionOperator=" + conditionOperator + "&conditionCompanyCode=" + conditionCompanyCode + "&conditionPrice=" + conditionPrice + "&limitPrice=" + limitPrice + "&quantity=" + quantity;
                var str = strs + strN;
            }
            else{
                var limitPrice = arry[4].val().replace(/,/g, "");
                var quantity = arry[5].val();

                var str = strs + "&limitPrice=" + limitPrice + "&quantity=" + quantity;
            }
        } else if (product == "FXMN" || product == "FX" || product == "FT") {
            var str = "";
            var password = arry[0].val();
            var passwordE2ee = passwordSTR;
            var LatestBidPrice = Number($("#FTFXFXMN-Trade .Spreads").eq(0).text());
            var LatestAskPrice = Number($("#FTFXFXMN-Trade .Spreads").eq(1).text());

            if (product == "FT") {
                    var orderType = arry[3];
                    var exchange = arry[1];
                    var symbol = arry[2];
                    var expiry = arry[6].val();

                    var qty = Number(arry[5].val().replace(/,/g, ""));
                    newqty = qty + "";
                    if (qty <= 0 || newqty.indexOf(".") != -1 || qty.toString() == "NaN")
                    {
                        ShowAlert("Invalid quantity entered.Please enter in multiples of 1.");
                        $("#loading").hide();
                        return;
                    }

                    var price = Number(arry[4].val().replace(/,/g, ""));
                    newprice = price + "";
                    var multiple = (price * 1000000 / Number(arry[arry.length - 1])) / 1000000;
                    if (price <= 0 || newprice == "" || price.toString() == "NaN") {
                        ShowAlert("Invalid price. Please enter a price above zero.");
                        $("#loading").hide();
                        return;
                    } else if (!Number.isInteger(multiple) && multiple > 0 && (multiple % 1) > 0.001 && (multiple % 1) < 0.999)
                    {
                        ShowAlert("Price should be multiple of bid size <ticksize>.");
                        $("#loading").hide();
                        return;
                    }

                if (orderType.val() != "4") {

                    str = "&product=" + product + "&encryptedPIN=" + passwordE2ee + "&action1=" + action + "&orderType=" + orderType.val() + "&symbol=" + symbol + "&exchange=" + exchange;
                    str += "&expiry=" + expiry + "&qty=" + newqty + "&price=" + price ;

                } else {

                    var stopLimitPrice = Number(arry[7].val().replace(/,/g, ""));
                    newstopLimitPrice = stopLimitPrice + "";
                    var multiple = (stopLimitPrice * 1000000 / Number(arry[arry.length - 1])) / 1000000;
                    if (stopLimitPrice <= 0 || newstopLimitPrice == "" || stopLimitPrice.toString() == "NaN") {
                        ShowAlert("Invalid price. Please enter a price above zero.");
                        $("#loading").hide();
                        return;
                    } else if (!Number.isInteger(multiple) && multiple > 0 && (multiple % 1) > 0.001 && (multiple % 1) < 0.999) {
                        ShowAlert("Price should be multiple of bid size <ticksize>.");
                        $("#loading").hide();
                        return;
                    }

                    str = "&product=" + product + "&encryptedPIN=" + passwordE2ee + "&action1=" + action + "&orderType=" + orderType.val() + "&symbol=" + symbol + "&exchange=" + exchange;
                    str += "&expiry=" + expiry + "&qty=" + newqty + "&price=" + price + "&stopLimitPrice=" + stopLimitPrice;
                }
            } else if (product == "FX" || product == "FXMN") {
                var orderType = arry[2];
                var symbol = arry[1];

                var price = Number(arry[3].val().replace(/,/g, ""));
                newprice = price + "";
                var multiple = (price * 1000000 / Number(arry[arry.length - 1])) / 1000000;
                if (price <= 0 || newprice == "" || price.toString() == "NaN") {
                    ShowAlert("Invalid price. Please enter a price above zero.");
                    $("#loading").hide();
                    return;
                } else if (!Number.isInteger(multiple) && multiple > 0 && (multiple%1)>0.001 && (multiple%1)<0.999) {
                    ShowAlert("Price should be multiple of bid size <ticksize>.");
                    $("#loading").hide();
                    return;
                }

                var qty = Number(arry[4].val().replace(/,/g, ""));
                newqty = qty + "";
                if (qty <= 0 || newqty.indexOf(".") != -1 || qty.toString() == "NaN") {
                    ShowAlert("Invalid quantity entered.Please enter in multiples of 1.");
                    $("#loading").hide();
                    return;
                }
                //Limit
                if (orderType.val() == "2") {
                    if (action == 1) {
                        if (price > LatestAskPrice || LatestAskPrice.toString() == "NaN") {
                            //ShowAlert("You have attempted to submit an order out of the current market price. If you proceed, you might be done at your submitted price.Do you want  to proceed?");
                            $("#loading").hide();
                            //return;
                            attemptedMessage = "You have attempted to submit an order out of the current market price. If you proceed, you might be done at your submitted price.Do you want  to proceed?";
                        }

                    } else if (action == 0) {
                        if (price < LatestBidPrice || LatestBidPrice.toString() == "NaN") {
                            //ShowAlert("You have attempted to submit an order out of the current market price. If you proceed, you might be done at your submitted price. Do you want  to proceed?");
                            $("#loading").hide();
                            //return;
                            attemptedMessage = "You have attempted to submit an order out of the current market price. If you proceed, you might be done at your submitted price. Do you want  to proceed?";
                        }
                    }
                //Stop on Bid
                } else if (orderType.val() == "3"){
                    if (action == 1) {
                        if (price <= LatestBidPrice || LatestBidPrice.toString() == "NaN") {
                            ShowAlert("Stop Price is on wrong side of the market. Please check your order.");
                            $("#loading").hide();
                            return;
                        }

                    } else if (action == 0) {
                        if (price >= LatestBidPrice || LatestBidPrice.toString() == "NaN") {
                            ShowAlert("Stop Price is on wrong side of the market. Please check your order.");
                            $("#loading").hide();
                            return;
                        }
                    }
                //Stop on Offer
                } else if (orderType.val() == "4") {
                    if (action == 1) {
                        if (price <= LatestAskPrice || LatestAskPrice.toString() == "NaN") {
                            ShowAlert("Stop Price is on wrong side of the market. Please check your order.");
                            $("#loading").hide();
                            return;
                        }

                    } else if (action == 0) {
                        if (price >= LatestAskPrice || LatestAskPrice.toString() == "NaN") {
                            ShowAlert("Stop Price is on wrong side of the market. Please check your order.");
                            $("#loading").hide();
                            return;
                        }
                    }
                
                }


                var expiry = arry[5].val();
                if (orderType.val() == "5" || orderType.val() == "6") {

                    var ocoPrice = Number(arry[6].val().replace(/,/g, ""));
                    newocoPrice = ocoPrice + "";
                    var multiple = (ocoPrice * 1000000 / Number(arry[arry.length - 1])) / 1000000;
                    if (ocoPrice <= 0 || newocoPrice == "" || ocoPrice.toString() == "NaN") {
                        ShowAlert("Invalid price. Please enter a price above zero.");
                        $("#loading").hide();
                        return;
                    } else if (!Number.isInteger(multiple) && multiple > 0 && (multiple % 1) > 0.001 && (multiple % 1) < 0.999) {
                        ShowAlert("Price should be multiple of bid size <ticksize>.");
                        $("#loading").hide();

                    }

                    //OCO Stop on Bid
                    if (orderType.val() == "5") {
                        if (action == 1) {
                            if (price < LatestBidPrice || LatestBidPrice.toString() == "NaN") {
                                ShowAlert("Stop Price is on wrong side of the market. Please check your order.");
                                $("#loading").hide();
                                return;
                            } else if (ocoPrice > LatestAskPrice || LatestAskPrice.toString() == "NaN"){
                                //ShowAlert("You have attempted to submit an order out of the current market price. If you proceed, you might be done at your submitted price.Do you want  to proceed?");
                                $("#loading").hide();
                                //return;
                                attemptedMessage = "You have attempted to submit an order out of the current market price. If you proceed, you might be done at your submitted price.Do you want  to proceed?";
                            }

                        } else if (action == 0) {
                            if (price > LatestBidPrice || LatestBidPrice.toString() == "NaN") {
                                ShowAlert("Stop Price is on wrong side of the market. Please check your order.");
                                $("#loading").hide();
                                return;
                            } else if (ocoPrice < LatestAskPrice || LatestAskPrice.toString() == "NaN") {
                                //ShowAlert("You have attempted to submit an order out of the current market price. If you proceed, you might be done at your submitted price.Do you want  to proceed?");
                                $("#loading").hide();
                                //return;
                                attemptedMessage = "You have attempted to submit an order out of the current market price. If you proceed, you might be done at your submitted price.Do you want  to proceed?";
                            }
                        }
                        //OCO Stop on Offer
                    } else if (orderType.val() == "6") {
                        if (action == 1) {
                            if (price < LatestBidPrice || LatestBidPrice.toString() == "NaN") {
                                ShowAlert("Stop Price is on wrong side of the market. Please check your order.");
                                $("#loading").hide();
                                return;
                            } else if (ocoPrice > LatestAskPrice || LatestAskPrice.toString() == "NaN") {
                                //ShowAlert("You have attempted to submit an order out of the current market price. If you proceed, you might be done at your submitted price.Do you want  to proceed?");
                                $("#loading").hide();
                                //return;
                                attemptedMessage = "You have attempted to submit an order out of the current market price. If you proceed, you might be done at your submitted price.Do you want  to proceed?";
                            }

                        } else if (action == 0) {
                            if (price > LatestAskPrice || LatestAskPrice.toString() == "NaN") {
                                ShowAlert("Stop Price is on wrong side of the market. Please check your order.");
                                $("#loading").hide();
                                return;
                            } else if (ocoPrice > LatestBidPrice || LatestBidPrice.toString() == "NaN") {
                                //ShowAlert("You have attempted to submit an order out of the current market price. If you proceed, you might be done at your submitted price.Do you want  to proceed?");
                                $("#loading").hide();
                                //return;
                                attemptedMessage = "You have attempted to submit an order out of the current market price. If you proceed, you might be done at your submitted price.Do you want  to proceed?";
                            }
                        }
                    }

                    str = "&product=" + product + "&encryptedPIN=" + passwordE2ee + "&action1=" + action + "&orderType=" + orderType.val() + "&symbol=" + symbol;
                    str += "&expiry=" + expiry + "&qty=" + qty + "&price=" + price + "&ocoPrice=" + ocoPrice;
                } else {

                    str = "&product=" + product + "&encryptedPIN=" + passwordE2ee + "&action1=" + action + "&orderType=" + orderType.val() + "&symbol=" + symbol;
                    str += "&expiry=" + expiry + "&qty=" + qty + "&price=" + price;
                }
            }

        } else if (product == "UT")
        {
            var encryptedPIN = passwordSTR;
            if (arry[1].val() != "")
                var invAmount = arry[1].val().replace(/,/g, "");
            else {
                ShowAlert("Investment Amount Incorrect Input.");
                $("#loading").hide();
                return;
            }
            var fundSource = arry[2].val();
            var paymentCurrency = arry[3].val();
            if (arry[4])
                var unit = arry[4].val();
            var switchInID = $("#UT_Trade_content_Switch .Search>div").attr("counterid");

            if (action == "Sell")
                str = "&counterId=" + counterId + "&action1=" + action + "&fundSource=" + fundSource + "&paymentCurrency=" + paymentCurrency + "&invAmount=" + invAmount + "&unit=" + unit;
            else if (action == "Switch")
                str = "&counterId=" + counterId + "&action1=" + action + "&fundSource=" + fundSource + "&paymentCurrency=" + paymentCurrency + "&invAmount=" + invAmount + "&unit=" + unit + "&switchInID=" + switchInID;
            else
                str = "&counterId=" + counterId + "&action1=" + action + "&fundSource=" + fundSource + "&paymentCurrency=" + paymentCurrency + "&invAmount=" + invAmount;

            str += "&emailNotification=true&declaration=1&termCondition=true&encryptedPIN=" + encryptedPIN;
            //str = str1;
        }
        if (attemptedMessage != "") {
            $('#dialog2x .weui_dialog_bd').text(attemptedMessage);
            $('#dialog2x').show().on('click', '.weui_btn_Two_cancel', function () {
                $('#dialog2x').off('click').hide();
            });
            $('#dialog2x').show().on('click', '.weui_btn_Two_ok', function () {
                $('#dialog2x').off('click').hide();
                $("#loading").show();
                $.post(rootpath + APIUrl , str, function (d) {
                    var o = JSON.parse(d);
                    if (o["code"] == 1) {
                        var authToken = o["authToken"];
                        var APIUrl = WatchlistformAPI(5, product);
                        if (authToken == undefined) {
                            authToken = o["data"];
                        }
                        $.post(rootpath + APIUrl , "authToken=" + authToken + str, function (d) {
                            var o = JSON.parse(d);
                            if (o["code"] == 1) {
                                $(".Trade-exit").click();
                                $("#tabWatchlist").attr("class", "view tab view-watchlist");
                                $("#tabTrade").attr("class", "view tab view-trade");
                                $("#tabOrdStats").attr("class", "view tab view-ordstats active");
                                $("#OrderStatus").click();
                            } else {
                                $("#loading").hide();
                                ShowAlert(o["msg"]);
                                return;
                            }
                        });
                    } else {
                        $("#loading").hide();
                        ShowAlert(o["msg"]);
                        return;
                    }
                });
            });

        }
        else {
            $.post(rootpath + APIUrl , str, function (d) {
                var o = JSON.parse(d);
                if (o["code"] == 1) {
                    var authToken = o["authToken"];
                    var APIUrl = WatchlistformAPI(5, product);
                    if (authToken == undefined) {
                        authToken = o["data"];
                    }
                    $.post(rootpath + APIUrl , "authToken=" + authToken + str, function (d) {
                        var o = JSON.parse(d);
                        if (o["code"] == 1) {
                            $(".Trade-exit").click();
                            $("#tabWatchlist").attr("class", "view tab view-watchlist");
                            $("#tabTrade").attr("class", "view tab view-trade");
                            $("#tabOrdStats").attr("class", "view tab view-ordstats active");
                            $("#OrderStatus").click();
                        } else {
                            $("#loading").hide();
                            ShowAlert(o["msg"]);
                            return;
                        }
                    });
                } else if (o["code"] == -335 && (product == "FXMN" || product == "FX" || product == "FT")) {
                    $("#loading").hide();
                    $('#dialog2x .weui_dialog_bd').text(o["msg"]);
                    $('#dialog2x').show().on('click', '.weui_btn_Two_cancel', function () {
                        $('#dialog2x').off('click').hide();
                    });
                    $('#dialog2x').show().on('click', '.weui_btn_Two_ok', function () {
                        $('#dialog2x').off('click').hide();
                        $("#loading").show();
                        var authToken = o["authToken"];
                        var APIUrl = WatchlistformAPI(5, product);
                        if (authToken == undefined) {
                            authToken = o["data"];
                        }
                        $.post(rootpath + APIUrl , "authToken=" + authToken + str, function (d) {
                        //$.get(rootpath + APIUrl + str, function (d) {
                            var o = JSON.parse(d);
                            if (o["code"] == 1) {
                                $(".Trade-exit").click();
                                $("#tabWatchlist").attr("class", "view tab view-watchlist");
                                $("#tabTrade").attr("class", "view tab view-trade");
                                $("#tabOrdStats").attr("class", "view tab view-ordstats active");
                                $("#OrderStatus").click();
                            } else {
                                $("#loading").hide();
                                ShowAlert(o["msg"]);
                                return;
                            }
                        });
                    });
                } else {
                    $("#loading").hide();
                    ShowAlert(o["msg"]);
                    return;
                }
            });
        }
    }
    //Watchlist Extended form over-->

    //<--currency scroll Effect
    function documentScroll(type) {
        var timeout = null;
        scrollingX = false;
        startPMP();
        $(".information-name-left").scroll(function () {
            var thisDIV = $(".information-name-left")[type];
            var informationNameContent = $(".information-name-content")[type];
            informationNameContent.scrollTop = thisDIV.scrollTop;
        });
        $(".information-name-top").scroll(function () {
            var thisDIV = $(".information-name-top")[type];
            var informationNameContent = $(".information-name-content")[type];
            if (informationNameContent.scrollLeft > 0) {
                $($(".information-name-left")[type]).css("boxShadow", "0px 2px 14px #000000");
                $($(".top_div-name")[type]).children().first().css("boxShadow", "0px 2px 14px #000000");
            } else {
                $($(".information-name-left")[type]).css("boxShadow", "none");
                $($(".top_div-name")[type]).children().first().css("boxShadow", "none");
            }
            informationNameContent.scrollLeft = thisDIV.scrollLeft;
        });
        $(".information-name-content").scroll(function () {
            var thisDIV = $(".information-name-content")[type];
            var informationNameLeft = $(".information-name-left")[type];
            var informationNameTop = $(".information-name-top")[type];
            informationNameLeft.scrollTop = thisDIV.scrollTop;
            if (type == 0) {
                if (thisDIV.scrollLeft > 810) {
                    thisDIV.scrollLeft = 810;
                } else {
                    informationNameTop.scrollLeft = thisDIV.scrollLeft;
                }
            } else if (type == 1) {
                if (thisDIV.scrollLeft > 368) {
                    thisDIV.scrollLeft = 368;
                } else {
                    informationNameTop.scrollLeft = thisDIV.scrollLeft;
                }
            } else if (type == 2) {
                if (thisDIV.scrollLeft > 388) {
                    thisDIV.scrollLeft = 388;
                } else {
                    informationNameTop.scrollLeft = thisDIV.scrollLeft;
                }
            } else {
                informationNameTop.scrollLeft = thisDIV.scrollLeft;
            }
            if (timeout != null) {
                clearTimeout(timeout);
            }
            if (type == 0) {
                stopPMP();
                timeout = setTimeout(function () {
                    scrollingX = false;
                    startPMP();
                    clearTimeout(timeout);
                }, 500);
            }
            
        });
    }
    //currency scroll Effect-->

    //<--PmpSettings object Encapsulation 
    function PmpSettings() {

        $.get(rootpath + "Settings/PmpSettingsByWebSocket", function (d) {
            var wssHTTP = JSON.parse(d);
            if (wssHTTP["code"] == 1) {
                pmpDataMarket(wssHTTP["enabledProducts"]);
                return;
            } else {
                $("#loading").hide();
                ShowAlert(wssHTTP["msg"]);
                return;
            }
        });

        $.get(rootpath + "Settings/RetrieveClientSettings", function (d) {
            var o = JSON.parse(d);
            if (o["code"] == 1) {
                passwordConfirmation = o["passwordConfirmation"];
            } 
        });
    }
    PmpSettings();

    function pmpDataMarket(obj) {
        var newobj = {};
        var PmpSettingobj = {};
        var urls = {};
        for (var i = 0; i < obj.length; i++) {
            newobj[i] = obj[i]["markets"];
            var product = obj[i].product;
            for (var j = 0; j < newobj[i].length; j++) {
                var market = newobj[i][j]["market"];
                var L_url = newobj[i][j]["primaryURL"];
                var D_url = L_url;
                if (L_url == null) {
                    if (newobj[i][j]["alternativeURLs"] != null) {
                        L_url = newobj[i][j]["alternativeURLs"][0];
                        D_url = L_url;
                    }
                }
                if (newobj[i][j]["primaryDelayedURL"] != null)
                    D_url = newobj[i][j]["primaryDelayedURL"];
                else if (newobj[i][j]["alternativeDelayedURLs"] != null) {
                    D_url = newobj[i][j]["alternativeDelayedURLs"][0];
                }
                if (L_url != null)
                    PmpdataSettings[product + "_" + market + "_L"] = L_url;
                if (D_url != null)
                    PmpdataSettings[product + "_" + market + "_D"] = D_url;
                //if (newobj[i][j]["alternativeURLs"]!=null){
                //    var arrys = newobj[i][j]["alternativeURLs"];
                //    PmpdataSettings[product + "_" + market + "_L"] = newobj[i][j]["primaryURL"];
                //    PmpdataSettings[product + "_" + market + "_D"] = arrys[arrys.length - 1];
                //}else{
                //    PmpdataSettings[product + "_" + market + "_L"] = newobj[i][j]["primaryURL"];
                //    PmpdataSettings[product + "_" + market + "_D"] = newobj[i][j]["primaryURL"];
                //}

            }
            //if (product == "ST") {
            //    product = "CFD";
            //    for (var j = 0; j < newobj[i].length; j++) {
            //        var market = newobj[i][j]["market"];
            //        if (newobj[i][j]["alternativeURLs"] != null) {
            //            var arrys = newobj[i][j]["alternativeURLs"];
            //            PmpdataSettings[product + "_" + market + "_L"] = newobj[i][j]["primaryURL"];
            //            PmpdataSettings[product + "_" + market + "_D"] = arrys[arrys.length - 1];
            //        } else {
            //            PmpdataSettings[product + "_" + market + "_L"] = newobj[i][j]["primaryURL"];
            //            PmpdataSettings[product + "_" + market + "_D"] = newobj[i][j]["primaryURL"];
            //        }

            //    }
            //}
        }

        m = 0;
    }
    //PmpSettings object Encapsulation-->    

    //Order contract subscription data //pmpd__SGXSE_D05_RY_11
    function DetailForm(String, Ele, Eles) {
        $("#loading").show();
        var counterid = String;
        DetailFormUIs(Ele, Eles);
        stopPMP();
        $.post(rootpath + "counter/CounterInfo", "priceMode=1" + "&counterID=" + counterid, function (data) {
            var Topic = JSON.parse(data);
            if (Topic["code"] == 1) {
                DetailFormUI(Topic["pmpTopic"], Topic["product"], Topic["market"], Ele, Eles);
                return;
            } else {
                DetailFormUIs(Ele, Eles);
                $("#loading").hide();
                return;
            }
        });
    }

    function DetailForm1(String, Ele, Eles, product) {
        $("#loading").show();
        var counterid = String;
        DetailFormUIs(Ele, Eles);
        stopPMP();
        $.post(rootpath + "counter/ContractDetails", "product=" + product + "&counterIDs=" + counterid + "&price=0", function (data) {
            var Topic = JSON.parse(data);
            if (Topic["code"] == 1) {
                var name = Topic["data"][0]["name"];
                var FTFXFXMNTradetitle = $("#FTFXFXMN-Trade-title li div");
                FTFXFXMNTradetitle.text(name);
                ElementCSS($("#FTFXFXMN-Trade-title"));
                var FTFXFXMNODtitle = $("#OrderStatus-Detail-title li div");
                FTFXFXMNODtitle.text(name);
                ElementCSS($("#OrderStatus-Detail-title"));
                DetailFormUI(Topic["data"][0]["pmpTopic"], Topic["data"][0]["product"], Topic["data"][0]["market"], Ele, Eles, Topic["data"][0]["spTickSize"]);
                return;
            } else {
                if (product == "FX" || product == "FXMN") {
                    DetailFormUIs(Ele, Eles, 1);
                } else {
                    DetailFormUIs(Ele, Eles);
                }
                $("#loading").hide();
                return;
            }
        });
    }
    function caclSpread(Spreads1, Spreads2, spTickSize) {
        //if (Spreads1 != "" && Spreads2 != "") {
        if (Spreads1.length>1 && Spreads2.length>1) {
            //var arr1 = Spreads1.toString().split(".");
            //var arr2 = Spreads2.toString().split(".");
            //var Length1 = 0;
            //var Length2 = 0;
            //if (arr1.length < 2)
            //    Length1 = 0;
            //else
            //    Length1 = arr1[1].length;
            //if (arr2.length < 2)
            //    Length2 = 0;
            //else
            //    Length2 = arr2[1].length;
            //var text;
            //if (Length1 == 0 && Length2 == 0) {
            //    text = ((Spreads2 - Spreads1)/spTickSize).toFixed(Length2).toString();
            //}
            //else if (Length2 - Length1 > 0) {
            //    text = ((Spreads2 - Spreads1) / spTickSize).toFixed(Length2).toString();
            //    text = ((text * 1000000) * (Math.pow(10, Length2))) / 1000000;
            //} else if (Length1 - Length2 > 0) {
            //    text = ((Spreads2 - Spreads1) / spTickSize).toFixed(Length1).toString();
            //    text = ((text * 1000000) * (Math.pow(10, Length1))) / 1000000;
            //} else if (Length2 - Length1 == 0) {
            //    text = (((Spreads2 - Spreads1) - 0) / spTickSize).toFixed(Length2);
            //    text = ((text * 1000000) * (Math.pow(10, Length2))) / 1000000;
            //}
            text = ((Spreads2 - Spreads1) / spTickSize).toFixed(0).toString();
            if (text == "NaN")
                text = "-";
            return text;
        }
        return "-";
    }

    function DetailFormUI(String, product, market, Ele, Eles, spTickSize) {

        var html = "", htmls = "", arrys = [9, 11, 5, 15, 6, 16, 17], arrys2 = [5, 6, 7, 8], arrys1 = [], arrys3 = [];
        var topic_key = {};
        newarry = [];
        if (String == null)
            String = "";
        urlkey = product + "_" + market + "_L";
        topic_key["topic"] = String;
        topic_key["urlkey"] = urlkey;
        if (pmpmaptopics.length == 0) {
            pmpmaptopics = {}
            newarry[0] = topic_key;
            pmpmaptopics[0] = newarry;
        }
        else {
            pmpmaptopics[0].push(topic_key);
        }

        Ele.empty();
        Eles.empty();
        var oldSpreads = $(".Spreads");
        oldSpreads.removeAttr("class", "");
        var oldSpreadID = $("#Difference");
        oldSpreadID.removeAttr("id", "");
        var changeColor = $("#changeColor");
        changeColor.removeAttr("id", "");
        var changeColor1 = $("#changeColor1");
        changeColor.removeAttr("id", "");

        symbol = String.replace(/\./g, "");
        symbol = symbol.replace(/\[/g, "");
        symbol = symbol.replace(/\]/g, "");
        symbol = symbol.replace(/\\/g, "_");
        symbol = "pmpd_" + symbol;
        pmpmap[String] = symbol;

        for (var i in pmpdatamap) {
            for (var j = 0; j < arrys.length; j++) {
                if (i == symbol + "_" + arrys[j]) {
                    arrys1.push(pmpdatamap[i]);
                }
            }
            for (var w = 0; w < arrys2.length; w++) {
                if (i == symbol + "_" + arrys2[w]) {
                    arrys3.push(pmpdatamap[i]);
                }
            }

        }
        //Bid     font-size: 10px;width: 10%; 2    font-size: 10px; width: 25%; 3    width: 16%;
        //document.addEventListener('DOMSubtreeModified', function () { alert(1) }, false);

        if (product == "FX" || product == "FXMN") {
            Ele.hide();
            if (arrys3[0] == undefined) {
                htmls += "<ul style='width: 100%;position: relative;'><li style='font-size: 10px;width: 10%;'>Bid</li><li style='font-size: 10px;width: 25%;' flag='flag' class='" + symbol + "_5 Spreads'>-</li> <li style='position: absolute;left: 42%;width: 16%;text-align: center;color: #f2f2f2;font-size: 10px;' id='Difference'>-</li> <li flag='flag' class='" + symbol + "_6 Spreads' style='float: right;font-size: 10px;width: 25%;padding-right: 0.45rem;'>-</li><li style='float: right;font-size: 10px;width: 10%;'>Ask</li></ul>";
                htmls += "<ul style='width: 100%;position: relative;clear: both;'><li style='font-size: 10px;width: 10%;text-align: left;'>Low</li><li style='font-size: 10px;width: 25%;' flag='flag' class='" + symbol + "_8'>-</li> <li style='position: absolute;left: 42%;width: 16%;text-align: center;font-size: 10px;'>Spread</li> <li flag='flag' class='" + symbol + "_7' style='float: right;font-size: 10px;width: 25%;padding-right: 0.45rem;'>-</li><li style='float: right;font-size: 10px;width: 10%;text-align: left;'>High</li></ul>";
            } else {
                if (arrys3[0] == undefined || arrys3[1] == undefined || arrys3[2] == undefined || arrys3[3] == undefined) {
                    arrys1[0] = "-"; arrys1[1] = "-"; arrys1[2] = "-"; arrys1[3] = "-";
                } else {
                    //var Spreadval = ((Number(arrys1[1]) - Number(arrys1[0])) * 1000000)/1000000;
                    var Spreadval = caclSpread(arrys1[0], arrys1[1], spTickSize);
                }
                Ele.hide();

                htmls += "<ul style='width: 100%;position: relative;'><li style='font-size: 10px;width: 10%;'>Bid</li><li style='font-size: 10px;width: 25%;' flag='flag' class='" + symbol + "_5 Spreads'>" + arrys3[0] + "</li> <li style='position: absolute;left: 42%;width: 16%;text-align: center;color: #f2f2f2;font-size: 10px;' id='Difference'>" + Spreadval + "</li> <li flag='flag' class='" + symbol + "_6 Spreads' style='float: right;font-size: 10px;width: 25%;padding-right: 0.45rem;'>" + arrys3[1] + "</li><li style='float: right;font-size: 10px;width: 10%;'>Ask</li></ul>";
                htmls += "<ul style='width: 100%;position: relative;clear: both;'><li style='font-size: 10px;width: 10%;text-align: left;'>Low</li><li style='font-size: 10px;width: 25%;' flag='flag' class='" + symbol + "_8'>" + arrys3[3] + "</li> <li style='position: absolute;left: 42%;width: 16%;text-align: center;font-size: 10px;'>Spread</li> <li flag='flag' class='" + symbol + "_7' style='float: right;font-size: 10px;width: 25%;padding-right: 0.45rem;'>" + arrys3[2] + "</li><li style='float: right;font-size: 10px;width: 10%;text-align: left;'>High</li></ul>";
            }
            Eles.append(htmls);
            Eles.css({ "paddingLeft": "4px" });
            var Spreads = $(".Spreads");
            Spreads[0].addEventListener('DOMSubtreeModified', function () {
                var Spreads1 = $(Spreads[0]).text()
                var Spreads2 = $(Spreads[1]).text()
                //if (Spreads1 != "" && Spreads2 != "") {
                //    var Length1 = Spreads1.toString().split(".")[1].length;
                //    var Length2 = Spreads2.toString().split(".")[1].length;

                //} else {
                //    Spreads1 = "-";
                //    Spreads2 = "-";
                //}

                //if (Length2 - Length1 > 0) {
                //    var text = (Spreads1 - Spreads2).toFixed(Length2).toString();
                //    text = ((text * 1000000) * (Math.pow(10, Length2))) / 1000000;
                //} else if (Length1 - Length2 > 0) {
                //    var text = (Spreads1 - Spreads2).toFixed(Length1).toString();
                //    text = ((text * 1000000) * (Math.pow(10, Length1))) / 1000000;
                //} else if (Length2 - Length1 == 0) {
                //    var text = ((Spreads1 - Spreads2) - 0).toFixed(Length2);
                //    text = ((text * 1000000) * (Math.pow(10, Length2))) / 1000000;
                //}

                //if (text == "NaN")
                //    text = "-";
                var text = caclSpread(Spreads1, Spreads2, spTickSize);

                $("#Difference").text(text);
            }, false);
            Spreads[1].addEventListener('DOMSubtreeModified', function () {
                var Spreads1 = $(Spreads[0]).text()
                var Spreads2 = $(Spreads[1]).text()
                //if (Spreads1 != "" && Spreads2 != "") {
                //    var Length1 = Spreads1.toString().split(".")[1].length;
                //    var Length2 = Spreads2.toString().split(".")[1].length;
                //} else {
                //    Spreads1 = "-";
                //    Spreads2 = "-";
                //}

                //if (Length2 - Length1 > 0) {
                //    var text = (Spreads1 - Spreads2).toFixed(Length2).toString();
                //    text = ((text * 1000000) * (Math.pow(10, Length2))) / 1000000;
                //} else if (Length1 - Length2 > 0) {
                //    var text = (Spreads1 - Spreads2).toFixed(Length1).toString();
                //    text = ((text * 1000000) * (Math.pow(10, Length1))) / 1000000;
                //} else if (Length2 - Length1 == 0) {
                //    var text = ((Spreads1 - Spreads2) - 0).toFixed(Length2);
                //    text = ((text * 1000000) * (Math.pow(10, Length2))) / 1000000;
                //}

                //if (text == "NaN")
                //    text = "-";
                var text = caclSpread(Spreads1, Spreads2, spTickSize);
                $("#Difference").text(text);
            }, false);
        } else {
            Ele.show();
            if (arrys1[0] == undefined) {
                html += "<h3 flag='flag' class='" + symbol + "_9'>-</h3><ul><span></span><li id='changeColor1' flag='flag' class='" + symbol + "_11'>-</li><li>&nbsp;</li><li id='changeColor' flag='flag' class='" + symbol + "_17'>-</li><li></li></ul>";

                htmls += "<ul><li>Bid</li><li flag='flag' class='" + symbol + "_5'>-</li><li>Ask</li><li flag='flag' class='" + symbol + "_6'>-</li></ul>";
                if (product == "FT") {
                    htmls += "<ul><li style='text-align: left;'>Low</li><li flag='flag' class='" + symbol + "_15'>-</li><li style='text-align: left;'>High</li><li flag='flag' class='" + symbol + "_16'>-</li></ul>";
                }
                else {
                    htmls += "<ul><li style='text-align: left;'>BVol(K)</li><li flag='flag' class='" + symbol + "_15'>-</li><li style='text-align: left;'>SVol(K)</li><li flag='flag' class='" + symbol + "_16'>-</li></ul>";
                }
                Ele.append(html);
                Eles.append(htmls);

            } else {
                if (arrys1[0] == undefined || arrys1[1] == undefined || arrys1[2] == undefined || arrys1[3] == undefined || arrys1[4] == undefined || arrys1[5] == undefined) {
                    arrys1[0] = "-"; arrys1[1] = "-"; arrys1[2] = "-"; arrys1[3] = "-"; arrys1[4] = "-"; arrys1[5] = "-";
                }
                html += "<h3 flag='flag' class='" + symbol + "_9'>" + arrys1[2] + "</h3><ul style='position:relative'><span></span><li id='changeColor1' flag='flag' class='" + symbol + "_11'>" + arrys1[3] + "</li><li>&nbsp;</li><li id='changeColor' flag='flag' class='" + symbol + "_17'>" + arrys1[6] + "</li><li></li></ul>";

                htmls += "<ul><li>Bid</li><li flag='flag' class='" + symbol + "_5'>" + arrys1[0] + "</li><li>Ask</li><li flag='flag' class='" + symbol + "_6'>" + arrys1[1] + "</li></ul>";
                if (product == "FT") {
                    htmls += "<ul><li style='text-align: left;'>Low</li><li flag='flag' class='" + symbol + "_15'>" + arrys1[4] + "</li><li style='text-align: left;'>High</li><li flag='flag' class='" + symbol + "_16'>" + arrys1[5] + "</li></ul>";
                }
                else {
                htmls += "<ul><li style='text-align: left;'>BVol(K)</li><li flag='flag' class='" + symbol + "_15'>" + arrys1[4] + "</li><li style='text-align: left;'>SVol(K)</li><li flag='flag' class='" + symbol + "_16'>" + arrys1[5] + "</li></ul>";
                }

                Ele.append(html);
                Eles.append(htmls);
                //color
                FormUTDataUICOLOR(Ele.find("h3").text(), Ele.find("h3"));
                var Ul = $("#changeColor").parent().children("li");
                for (var i = 0; i < Ul.length; i++) {
                    FormUTDataUICOLOR($(Ul[i]).text(), $(Ul[i]));
                }
                if ($("#changeColor").text() != "-") {
                    $("#changeColor").next().text("%");
                    $("#changeColor").next().css("color", $("#changeColor").css("color"));
                }
            }

            Eles.css({ "paddingLeft": "7rem" });

            $("#changeColor1").get(0).addEventListener('DOMSubtreeModified', function () {
                var Color = $("#changeColor").css("color");
                if ($("#changeColor").text() == "-") {
                    $("#changeColor").next().text("");
                }
                else
                {
                    $("#changeColor").next().text("%");
                    $("#changeColor").next().css("color", Color);
                }
            }, false);
            $("#changeColor").get(0).addEventListener('DOMSubtreeModified', function () {
                var Color = $(this).css("color");
                if ($(this).text() == "-")
                {
                    $(this).next().text("");
                }
                else {
                    $("#changeColor").next().text("%");
                    FormUTDataUICOLOR($(this).text(), $("#changeColor").next());
                }
            }, false);

            //Eles.css({ "width": "62%", "paddingRight": "0", "marginRight": "14px" });
        }

        scrollingX = false;
        startPMP();
        $("#loading").hide();
    }

    function DetailFormUIs(Ele, Eles, flg) {

        Ele.empty();
        Eles.empty();
        var html = "", htmls = "";
        if (flg == undefined) {
            html += "<h3 flag='flag' >-</h3><ul><li flag='flag' >-</li><li>-</li><li></li></ul>";

            htmls += "<ul><li>Bid</li><li flag='flag' >-</li><li>Ask</li><li flag='flag' >-</li></ul>";
            htmls += "<ul><li style='text-align: left;'>BVol(K)</li><li flag='flag' >-</li><li style='text-align: left;'>SVol(K)</li><li flag='flag' >-</li></ul>";

            Ele.append(html);
            Eles.append(htmls);
            scrollingX = false;
            startPMP();
            return;
        }
        else if (flg == 3){
            return;
        }

        Ele.hide();
        htmls += "<ul style='width: 100%;position: relative;'><li style='font-size: 10px;width: 10%;'>Bid</li><li style='font-size: 10px;width: 25%;'>-</li> <li style='position: absolute;left: 42%;width: 16%;text-align: center;color: #f2f2f2;font-size: 10px;' id='Difference'>-</li> <li style='float: right;font-size: 10px;width: 25%;padding-right: 0.45rem;'>-</li><li style='float: right;font-size: 10px;width: 10%;'>Ask</li></ul>";
        htmls += "<ul style='width: 100%;position: relative;clear: both;'><li style='font-size: 10px;width: 10%;'>MinPrice</li><li style='font-size: 10px;width: 25%;'>-</li> <li style='position: absolute;left: 42%;width: 16%;text-align: center;font-size: 10px;'>Spread</li> <li style='float: right;font-size: 10px;width: 25%;padding-right: 0.45rem;'>-</li><li style='float: right;font-size: 10px;width: 10%;'>MaxPrice</li></ul>";
        Eles.append(htmls);
        //Eles.css({ "width": "96%", "paddingRight": "10px", "marginRight": "0" });
        scrollingX = false;
        startPMP();
    }

    //UT API data
    function SubscribeDataUT(size, arry, Ele, Eles) {

        if (arry.length < 1)
        {
            $("#loading").hide();
            return;
        }
        $("#loading").show();
        var Arry = arry;
        if (Ele != undefined)
            DetailFormUIs(Ele, Eles,3);
        $.post(rootpath + "counter/CounterPrices", "size=" + size + "&counterIDs=" + Arry, function (data) {
            var SubscribeDatas = JSON.parse(data);
            if (SubscribeDatas["code"] == 1) {
                if (typeof Arry == "object") {
                    FormUTDataUI1(SubscribeDatas["priceList"]);
                    return;
                }
                else
                {
                    FormUTDataUI2(Ele, Eles, SubscribeDatas["priceList"]);
                    return;
                }
            } else {
                if (Ele != undefined)
                    DetailFormUIs(Ele, Eles,3);
                $("#loading").hide();
                return;
            }
        });
    }

    function FormUTDataUI1(obj) {
        var Class;
        for (var i = 0; i < obj.length; i++) {
            Class = obj[i]["counterID"].substring(obj[i]["counterID"].lastIndexOf("/") + 1);
            $("." + Class + "").eq(2).text(obj[i]["lastDone"]);
            FormUTDataUICOLOR(obj[i]["change"], $("." + Class + "").eq(2));
            $("." + Class + "").eq(3).text(obj[i]["change"]);
            FormUTDataUICOLOR(obj[i]["change"], $("." + Class + "").eq(3));
        }
    }
    
    function FormUTDataUICOLOR(String, uId,flag) {
        if (String.indexOf('-') > -1)
            uId.css({ color: "red" });
        else if (String.indexOf('+') > -1)
            uId.css({ color: "green" });
        else
            uId.css({ color: "#" });
        if (flag == 1) {
            if (String.indexOf('-') > -1) {
                uId.css({ color: "red" });
            } else {
                uId.css({ color: "green" });
            }
        }
    }

    function FormUTDataUI2(Ele, Eles, obj) {
        var html = "", htmls = "";
        Ele.empty();
        Eles.empty();
        //font-size: 14px;
        //color: #c1c1c1;
        //width: 98%;

        //width: 98%;
        //font-size: 20px;
        //font-weight: bolder;
        html += "<h3 flag='flag' style=''>" + obj[0]["lastDone"] + "</h3><ul style='width:108%'><li flag='flag' >" + obj[0]["change"] + "</li><li>" + obj[0]["changePercent"] + "</li></ul>";
        htmls += "<ul><li flag='flag' style='font-size: 14px;color: #c1c1c1;width: 98%;text-align: right;'>Ind. Nav as of</li><li style='width: 98%;font-size: 20px;font-weight: bolder;text-align:right'>" + obj[0]["dealingDate"] + "</li></ul>";
        Ele.append(html);
        FormUTDataUICOLOR(obj[0]["change"], Ele.find("h3"), 1);
        FormUTDataUICOLOR(obj[0]["change"], Ele.find("ul li:first-child"));
        FormUTDataUICOLOR(obj[0]["changePercent"], Ele.find("ul li:last-child"));
        Ele.width("6.2rem");
        Eles.append(htmls);
        scrollingX = true;
        $("#loading").hide();
    }
    //<--Order start
    $("#OrderStatus").click(function () {
        scrollingX = true;
        localStorage.page = "3";
        resetClass();
        $("#tabOrdStats").attr("class", "view tab view-ordstats active");
        var Yesterday = GetDateStr(-1);
        $("#loading").show();
        $("#tabOrdStats .Modular-Detail").hide();
        $.get(rootpath + "Order/TodayOrder", function (d) {
            var TodayOrder = JSON.parse(d);
            if (TodayOrder["code"] == 1 || TodayOrder["code"] == 0) {
                
                $.get(rootpath + "Order/getOrderDates", function (d) {
                    var getOrderDates = JSON.parse(d);

                    if (getOrderDates["code"] == 1) {
                        if (getOrderDates["dates"].length > 0) {
                            Yesterday = getOrderDates["dates"][0]["historyURI"];
                            Yesterday = Yesterday.substring(Yesterday.lastIndexOf("/") + 1);
                        }

                        //{ignore reget history orders
                        if (readyYesterday == Yesterday) {
                            $("#loading").hide();
                            if (TodayOrder["code"] == 0) {
                                ShowAlert(TodayOrder["msg"]);
                            }
                            OrderObjAnalysis($("#TodayOrder-contract-name"), $("#TodayOrder-content-details"), TodayOrder["orders"]);
                            documentScroll(1);
                            return;
                        }
                        readyYesterday = Yesterday;
                        //}ignore reget history orders

                        $.post(rootpath + "Order/PastOrder", "pastOrderDate=" + Yesterday, function (d) {
                            if (TodayOrder["code"] == 0) {
                                ShowAlert(TodayOrder["msg"]);
                            }

                            var OrderStatus = JSON.parse(d); 
                            if (OrderStatus["code"] == 1) {

                                OrderObjAnalysis($("#OrderHistory-contract-name"), $("#OrderHistory-content-details"), OrderStatus["orders"]);
                                documentScroll(2);
                                OrderObjAnalysis($("#TodayOrder-contract-name"), $("#TodayOrder-content-details"), TodayOrder["orders"]);
                                documentScroll(1);
                                OrderHistorySelect(getOrderDates["dates"]);
                                return;
                            } else {
                                OrderObjAnalysis($("#TodayOrder-contract-name"), $("#TodayOrder-content-details"), TodayOrder["orders"]);
                                documentScroll(1);
                                OrderHistorySelect(getOrderDates["dates"]);
                                $("#loading").hide();
                                ShowAlert(OrderStatus["msg"]);
                                return;
                            }
                        });
                    } else {
                        $("#loading").hide();
                        ShowAlert(getOrderDates["msg"]);
                        return;
                    }
                });

            } else {
                $("#loading").hide();
                ShowAlert(TodayOrder["msg"]);
                return;
            }
        });


    });

    function OrderObjAnalysis(ele, ele1, obj) {
        var TodayOrderContractName = ele;
        var TodayOrderContentDetails = ele1;
        TodayOrderContractName.empty();
        TodayOrderContentDetails.empty();
        if (obj == null)
            return;

        var WatchlistContractName = $("#Watchlist-contract-name");
        var InformationNameContent = $("#information-name-content_div");
        WatchlistContractName.empty();
        InformationNameContent.empty();

        var Html = "";
        sortArray(obj);
        for (var i = 0; i < obj.length; i++) {
            var action = obj[i]["action"];
            if (action == "BUY") {
                actionColor = "#039F12";
            } else {
                actionColor = "#FF3333";
            }
            var executedPrice = obj[i]["executedPrice"];
            var executedQty = obj[i]["executedQty"];
            if (executedPrice == "0" && executedQty == "0") {
                executedPrice = "-";
                executedQty = "-";
            }

            var order_No = obj[i]["orderNo"];
            if (obj[i]["orderDetailsURI"] != null)
            {
                order_No = obj[i]["orderDetailsURI"];
                order_No = order_No.substring(order_No.lastIndexOf("/") + 1);
            }
            var arry = [];
            arry.push(order_No, obj[i]["orderStatusDesc"], obj[i]["statusColor"], obj[i]["action"], actionColor, obj[i]["submittedPrice"], obj[i]["submittedQty"], executedPrice, executedQty, obj[i]["orderType"], obj[i]["submittedTime"], obj[i]["counterID"], obj[i]["productIcon"], obj[i]["name"], obj[i]["product"]);
            for (var j = 0; j < arry.length; j++) {
                if (arry[j] == null) {
                    arry[j] = "-";
                }
            }
            WatchlistOrderStatusLeft(TodayOrderContractName, obj[i]["productIcon"], obj[i]["name"], 2);

            ele.find("li").eq(i).attr({
                "submittedPrice": obj[i]["submittedPrice"],
                "product": obj[i]["product"],
                "name": obj[i]["name"],
                "productIcon": obj[i]["productIcon"],
//                "orderNo": obj[i]["orderNo"],
                "orderNo": order_No,
                "orderType": obj[i]["orderType"],
                "counterID": obj[i]["counterID"]
            });
            OrderStatusContent(TodayOrderContentDetails, arry);
            
            Hight = leftHight * i + leftHight;
        }
        documentSize(TodayOrderContractName, TodayOrderContentDetails, Hight, leftHight);
    }

    function documentSize(TodayOrderContractName, TodayOrderContentDetails, Hight, leftHight) {


        if (TodayOrderContractName[0].id == "OrderHistory-contract-name") {
            TodayOrderContractName.height((Hight + 10) + ((leftHight * 3) + leftHight) + "px");
            TodayOrderContentDetails.height((Hight + 10) + ((leftHight * 3) + leftHight) + "px");
        } else {
            TodayOrderContractName.height((Hight + 10) + ((leftHight * 2) + leftHight) + "px");
            TodayOrderContentDetails.height((Hight + 10) + ((leftHight * 2) + leftHight) + "px");
        }
        
        TodayOrderContentDetails.width("688px");

        var Status = $(".Status").width();
        var submitted = $(".submitted").width();
        var executed = $(".executed").width();
        var orderType = $(".orderType").width();
        var TodayOrderContentDetailstd = $("#TodayOrder-content-details table tr:first-child td").width();
        var OrderHistoryContentDetailstd = $("#OrderHistory-content-details table tr:first-child td").width();
        //if (TodayOrderContentDetailstd == null || OrderHistoryContentDetailstd == null) {
        //    TodayOrderContentDetailstd = OrderHistoryContentDetailstd;
        //    OrderHistoryContentDetailstd = TodayOrderContentDetailstd;
        //}
        if (TodayOrderContentDetailstd == null)
            TodayOrderContentDetailstd = Status = submitted = executed = orderType  = OrderHistoryContentDetailstd;
        else if (OrderHistoryContentDetailstd == null)
            OrderHistoryContentDetailstd = Status = submitted = executed = orderType = TodayOrderContentDetailstd;
        else
            Status = submitted = executed = orderType = TodayOrderContentDetailstd = OrderHistoryContentDetailstd;
        $(".OrderStatus-top div").eq(0).width(Status * 5 + 20 + "px");
        $(".OrderStatus-top div").eq(1).width(Status * 5 + 20 + "px");
        FuturEelementEvent();
    }

    function OrderStatusContent(obj, arry) {
        var Html = "";

        Html += "<table style='width:552px;height:49px;' product='" + arry[14] + "' name='" + arry[13] + "' productIcon='" + arry[12] + "' orderNo='" + arry[0] + "' orderType='" + arry[9] + "'";
        Html += "counterID='" + arry[11] + "' >";
        Html += "<tr><td rowspan='2' style='color:" + arry[2] + "'>" + arry[1] + "</td><td style='color:" + arry[4] + "'>" + arry[3] + "&nbsp;&nbsp;<a>" + arry[5] + "</a></td><td>" + arry[7] + "</td>";
        Html += "<td rowspan='2'>" + arry[9] + "</td></tr>";
        Html += "<tr><td>Qty&nbsp;&nbsp;&nbsp;" + arry[6] + "</td><td>" + arry[8] + "</td></tr>";

        obj.append(Html);
    }

    function OrderHistorySelect(obj) {
        var OrderHistorySelect = $("#OrderHistory-select");
        OrderHistorySelect.empty();
        var str = "";
        for (var i = 0; i < obj.length; i++) {
            str += "<option value='" + obj[i]["historyURI"] + "'>" + obj[i]["display"] + "</option>";
        }
        OrderHistorySelect.append(str);
        $("#loading").hide();
    }
    //未来元素事件绑定function
    function FuturEelementEvent() {
        $("#TodayOrder-content-details table").unbind("click");
        $("#OrderHistory-content-details table").unbind("click");
        $("#TodayOrder-contract-name li").unbind("click");
        $("#OrderHistory-contract-name li").unbind("click");
        $("#TodayOrder-content-details table").click(function () {
            $("#loading").show();
            var NamesNodeMap = this.attributes;
            var isToday = true;
            OrderStatusDetailData(NamesNodeMap, isToday);
        });
        $("#OrderHistory-content-details table").click(function () {
            $("#loading").show();
            var NamesNodeMap = this.attributes;
            var isToday = false;
            OrderStatusDetailData(NamesNodeMap, isToday);
        });
        $("#TodayOrder-contract-name li").click(function () {
            $("#loading").show();
            var NamesNodeMap = this.attributes;
            var isToday = true;
            OrderStatusDetailData(NamesNodeMap, isToday);
        });
        $("#OrderHistory-contract-name li").click(function () {
            $("#loading").show();
            var NamesNodeMap = this.attributes;
            var isToday = false;
            OrderStatusDetailData(NamesNodeMap, isToday);
        });

    }

    $("#OrderHistory-select").change(function () {
        $("#loading").show();
        var thisval = $(this).val();
        Yesterday = thisval.substring(thisval.lastIndexOf("/") + 1);
        $.post(rootpath + "Order/PastOrder", "pastOrderDate=" + Yesterday, function (d) {
            var o = JSON.parse(d);
            if (o["code"] == 1) {
                var OrderStatus = o["orders"];
                OrderObjAnalysis($("#OrderHistory-contract-name"), $("#OrderHistory-content-details"), OrderStatus);
                documentScroll(2);
                $("#loading").hide();
                return;
            }
            $("#loading").hide();
            ShowAlert(o["msg"])
        });
    });

    function OrderStatusDetailData(NamesNodeMap, isToday) {
        var OrderStatusDetailtitle = $("#OrderStatus-Detail-title");
        OrderStatusDetailtitle.empty();
        //var arry = [];
        //for (var i = 0; i < NamesNodeMap.length; i++) {
        //    if (i > 0) {
        //        arry[i] = NamesNodeMap[i];
        //    }
        //}
       
        //var type = 2;
        //var str = arry[1].value;
        //var name = arry[2].value;
        //var producticon = arry[3].value;
        //var orderNo = arry[4].value;
        //var orderType = arry[5].value;
        //var counterId = arry[6].value;
        //1: product, 2: name, 3: producticon, 4: orderno, 5: ordertype, 6: counterid
        //issue: sometime no 5:ordertype
        var type = 2;
        var str = NamesNodeMap[1].value;
        var name = NamesNodeMap[2].value;
        var producticon = NamesNodeMap[3].value;
        var orderNo = NamesNodeMap[4].value;
        var orderType = (NamesNodeMap.length == 7) ? NamesNodeMap[5].value : "-";
        var counterId = (NamesNodeMap.length == 7) ? NamesNodeMap[6].value : NamesNodeMap[5].value;
        var param;
        if(isToday==true){
            param="today";
        }else{
            param="past";
        }
        WatchlistOrderStatusLeft($("#OrderStatus-Detail-title"), producticon, name, type);
        //counterId = counterIds.substring(counterIds.lastIndexOf("/") + 1);
        var APIurl = productScreening(1, str);
        if (str == "ST" || str == "CFD" || str == "CFDDMA") {
            $.post(rootpath + "Order/" + APIurl , "orderNo=" + orderNo + "&counterId=" + counterId + "&isToday=" + isToday, function (d) {
                var o = JSON.parse(d);
                if (o["code"] == 1) {
                    OrderStatusDetailUI(o, o["orderHistory"], o["counterID"], o["product"], o["symbol"], o["exchange"], orderType);
                    return;
                } else {
                    $("#loading").hide();
                    ShowAlert(o["msg"]);
                    return;
                }
            });
        } else if (str == "UT") {
            $.post(rootpath + "Order/" + APIurl , "orderNo=" + orderNo + "&counterId=" + counterId, function (d) {
                var o = JSON.parse(d);
                if (o["code"] == 1) {
                    OrderStatusDetailUI(o, o["orderHistory"], o["counterID"], o["product"], o["symbol"], o["exchange"], orderType);
                    return;
                } else {
                    $("#loading").hide();
                    ShowAlert(o["msg"]);
                    return;
                }
            });
        } else if (str == "FT" || str == "FX" || str == "FXMN") {
            $.post(rootpath + "Order/" + APIurl , "orderNo=" + orderNo + "&product=" + str + "&type=" + param, function (d) {
                var o = JSON.parse(d);
                if (o["code"] == 1) {
                    OrderStatusDetailUI(o["data"], o["data"]["orderHistory"], o["data"]["counterID"], o["data"]["product"], o["data"]["symbol"], o["data"]["exchange"], orderType);
                    return;
                } else {
                    $("#loading").hide();
                    ShowAlert(o["msg"]);
                    return;
                }
            });
        }
    }

    function DetailUIObj(o, obj, product, orderType) {

        var newobj = {};
        //FTFXFXMN product type if
        if (product == "FXMN" || product == "FX" || product == "FT") {
            productFTFXFXMN(o, obj, product, newobj);
            return newobj;
        }
        else if (product == "UT"){
            productUT(o, obj, product, newobj);
            return newobj;
        }
        else if (product == "CFD" || product == "CFDDMA") {
            productCFD(o, obj, product, newobj);
            return newobj;
        }
        newobj["Order No"] = o["orderNo"];
        newobj["StatusColor"] = o["statusColor"];
        newobj["Order Type"] = orderType;
        newobj["Action"] = o["action"];

        if (o["statusDesc"] == undefined) {
            newobj["Status"] = o["statusDescription"];
        } else {
            newobj["Status"] = o["statusDesc"];
        }

        if (o["submittedPrice"] == undefined) {
            newobj["Price"] = o["nav"];
            //submittedPrice = o["nav"];
        } else {
            newobj["Price"] = o["submittedPrice"];
            //submittedPrice = o["submittedPrice"];
        }

        if (product == "ST") {
            if (orderType == "Stop Limit Order" || orderType == "Limit-if-Touched") {
                newobj["Stop Price"] = o["stopPrice"];
                newobj["Stop Price Trigger"] = o["triggeredType"];
            }
        }

        if (o["submittedQty"] == undefined) {
            newobj["Quantity"] = o["qty"];
            //submittedQty = o["qty"];
        } else {
            newobj["Quantity"] = o["submittedQty"];
            //submittedQty = o["submittedQty"];
        }
        
        newobj["Currency"] = o["currency"];
        if (o["paymentMode"] == undefined) {
            newobj["Trade Type"] = o["tradeType"];
        } else {
            newobj["Trade Type"] = o["paymentMode"];
        }

        if (o["settlementCurrency"] == undefined) {
            newobj["Settlement Currency"] = o["paymentCurrency"];
        } else {
            newobj["Settlement Currency"] = o["settlementCurrency"];
        }
        if (o["validity"] == undefined) {
            newobj["Validity"] = o["expiry"];
        } else {
            newobj["Validity"] = o["validity"];
        }
        if (product != "ST") {
            if (o["submittedTime"] == undefined) {
                newobj["Time"] = obj[0]["time"];
            } else {
                newobj["Time"] = o["submittedTime"];
            }
            newobj["Message"] = o["message"];
        }
        return newobj;
    }

    function productCFD(o, obj, product, newobj) {

        newobj["StatusColor"] = o["statusColor"];
        newobj["Order No"] = o["orderNo"];
        newobj["Status"] = o["statusDesc"];
        newobj["Message"] = o["message"];
        newobj["Order Type"] = o["orderType"];
        newobj["Action"] = o["action"];
        if (o["orderType"] == "OCO Stop" || o["orderType"] == "OCO Limit") { }
        else
        {
            newobj["Price"] = o["submittedPrice"];
            newobj["Quantity"] = o["qty"];
        }

        if (o["orderType"] == "Stop Limit") {
            newobj["Stop Price"] = o["stopPrice"];
            newobj["Stop Price Trigger"] = o["stopPriceTrigger"];
            newobj["Corr Order NO"] = o["correspondLimitOrderNo"];
        }
        else if (o["orderType"] == "Trailing Stop") {
            newobj["Stop Price"] = o["stopPrice"];
            newobj["Stop Price Trigger"] = o["stopPriceTrigger"];
            newobj["Trailing Stop"] = o["trailingStep"];
            newobj["Limit Spread"] = o["limitSpread"];
            newobj["Corr Order No"] = o["correspondLimitOrderNo"];
        }
        else if (o["orderType"] == "If Done") {
            newobj["IF Done Limit Order No"] = o["correspondOrderNo"];
            newobj["Corr Order NO"] = o["correspondLimitOrderNo"];
        }
        else if (o["orderType"] == "OCO Stop") {
            newobj["OCO Stop Limit-Stop Price"] = o["stopPrice"];
            newobj["OCO Stop Limit-Stop Price Trigger"] = o["stopPriceTrigger"];
            newobj["OCO Stop Limit-Limit Price"] = o["submittedPrice"];
            newobj["OCO Stop Limit-Quantity"] = o["qty"];
            newobj["OCO No"] = o["ocoNo"];
            newobj["Corr Order NO"] = o["correspondLimitOrderNo"];
        }
        else if (o["orderType"] == "OCO Limit") {
            newobj["OCO Stop Limit-Limit Price"] = o["submittedPrice"];
            newobj["OCO Stop Limit-Quantity"] = o["qty"];
            newobj["OCO No"] = o["ocoNo"];
        }
        else if (o["orderType"] == "Contingency") {
            newobj["Contingency Condition"] = o["contingencyCondition"];
            newobj["Corr Order NO"] = o["correspondLimitOrderNo"];
        }
        if (o["orderType"] != "Trailing Stop") {
            newobj["Settlement Currency"] = o["settlementCurrency"];
            newobj["Validity"] = o["validity"] + "(" +o["gtd"] + ")";
        }
        
        return newobj;
    }

    function productFTFXFXMN(o, obj, product, newobj) {

        newobj["Order No"] = o["orderNo"];
        newobj["StatusColor"] = o["statusColor"];
        newobj["Order Type"] = o["orderType"];
        newobj["Action"] = o["action"];

        if (o["submittedPrice"] == undefined) {
            newobj["Price(S)"] = o["nav"];
            //submittedPrice = o["nav"];
        } else {
            newobj["Price(S)"] = o["submittedPrice"];
            //submittedPrice = o["submittedPrice"];
        }
        if (newobj["Price(S)"] == undefined) {
            newobj["Price(S)"] = o["stopLimitPrice"];
        }
        if (product == "FT") {
            if (o["orderType"] == "Stop Limit") {
                newobj["Stop Price (Trigger)"] = o["stopPrice"];
            }
        }
        else if (product == "FX" || product == "FXMN") {
            if (o["orderType"] == "OCO Stop on Offer" || o["orderType"] == "OCO Stop on Bid") {
                newobj["OCO Price"] = o["ocoPrice"];
            }
        }

        if (product == "FX" || product == "FXMN"){
            newobj["Currency"] = o["currency"];
        }

        if (o["submittedQty"] == undefined) {
            newobj["Quantity"] = o["qty"];
            //submittedQty = o["qty"];
        } else {
            newobj["Quantity"] = o["submittedQty"];
            //submittedQty = o["submittedQty"];
        }

        if (o["validity"] == undefined) {
            newobj["Validity"] = o["expiry"];
        } else {
            newobj["Validity"] = o["validity"];
        }

        if (o["statusDesc"] == undefined) {
            newobj["Status"] = o["statusDescription"];
        } else {
            newobj["Status"] = o["statusDesc"];
        }

        if (o["submittedTime"] == undefined) {
            newobj["Time(S)"] = obj[0]["time"];
        } else {
            newobj["Time(S)"] = o["submittedTime"];
        }
        newobj["Message"] = o["message"];
        return newobj;
    }

    function productUT(o, obj, product, newobj) {

        newobj["Order No"] = o["orderNo"];
        newobj["StatusColor"] = o["statusColor"];
        newobj["Status"] = o["statusDesc"];
        newobj["Action"] = o["action"];
        newobj["Fund Source"] = o["fundSource"];
        newobj["Currency"] = o["currency"];
        newobj["Units"] = o["units"];
        newobj["Investment Amount"] = o["amount"] + " " + o["currency"];
        newobj["Indicative Nav"] = o["nav"];
        newobj["Indicative Transaction Date"] = o["indicativeTransactionDate"];
        newobj["POEMS Sales Charge"] = o["salesCharge"];
        return newobj;
    }

    function OrderStatusDetailUI(o, obj, counterId, product, symbol, exchange, orderType) {

        var newobj = DetailUIObj(o, obj, product, orderType);
        var submittedQty = newobj["Quantity"];
        var submittedPrice;

        if (newobj["Price"] != undefined)
            submittedPrice = newobj["Price"];
        else
            submittedPrice = newobj["Price(S)"];

        if (o["ocoPrice"] == undefined) {
            WithdrawAmend(o["orderNo"], submittedQty, submittedPrice, counterId, product, symbol, exchange,"",o);
        } else {
            WithdrawAmend(o["orderNo"], submittedQty, submittedPrice, counterId, product, symbol, exchange, o["ocoPrice"],o);
        }

        if (o["product"] == "CFD" || o["product"] == "CFDDMA")
            DetailcontenttopCFD(orderType, newobj);
        else
            Detailcontenttop(orderType, newobj, product);

        $(".Detail-bottom-title-content").empty();
        $("#OrderStatus-Detail-content .Detail-content-bottom").height("284px");
        for (var j = 0; j < obj.length; j++) {
            var arry = [];
            var color = "", quantity;
            if (obj[j]["quantity"] != undefined)
                quantity = obj[j]["quantity"];
            else
                quantity = obj[j]["qty"];
            if (obj[j]["statusDesc"] == undefined) {
                arry.push(obj[j]["statusDescription"], quantity, obj[j]["price"], obj[j]["transactionDateTime"], obj[j]["statusColor"]);
            } else {
                if (obj[j]["statusDesc"] == "Received") {
                    color = "black";
                } else {
                    color = "red";
                }
                arry.push(obj[j]["statusDesc"], quantity, obj[j]["price"], obj[j]["time"], color);
            }
            if (product == "UT")
                DetailcontentBottom(arry, o["amount"], 1);
            else
                DetailcontentBottom(arry);
        }
        if ($("#Withdraw").attr("disabled") == "disabled") {
            $("#Amend").attr("disabled", "disabled");
            $("#Amend-div").hide();
        }
        if (product == "FT" || product == "FX" || product == "FXMN") {
            DetailForm1(counterId, $("#tabOrdStats .Modular-Detail .Detailtitle-bottom-left"), $("#tabOrdStats .Modular-Detail .Detailtitle-bottom-right"), product);
        } else if (product == "UT") {
            SubscribeDataUT(1, counterId, $("#tabOrdStats .Modular-Detail .Detailtitle-bottom-left"), $("#tabOrdStats .Modular-Detail .Detailtitle-bottom-right"));
        }else{
            DetailForm(counterId, $("#tabOrdStats .Modular-Detail .Detailtitle-bottom-left"), $("#tabOrdStats .Modular-Detail .Detailtitle-bottom-right"));
        }
        $(".Modular-Detail").show();
    }

    //Detailcontenttop
    function Detailcontenttop(orderType, newobj, product) {
        var OrderStatusDetailcontenttop = $("#OrderStatus-Detail-content .Detail-content-top");
        OrderStatusDetailcontenttop.empty();
        var Html = "", hegiht = 2.4, i = 0, contentHeight;
        for (var key in newobj) {
            if (newobj[key] != "") {
                if (newobj[key] == undefined)
                    newobj[key] = "-";
                if (key != "StatusColor") {
                    if (key == "Action") {
                        if (newobj[key] != "BUY") {
                            Html += "<ul><li style='color:#FF3333'>" + newobj[key] + "</li><li>" + key + "</li></ul>";
                            continue;
                        }
                        Html += "<ul><li style='color:#039F12'>" + newobj[key] + "</li><li>" + key + "</li></ul>";
                        continue;
                    }
                    if (key == "Status") {
                        if (newobj[key] == "Withdrawn" || newobj[key] == "Order Triggered") {
                            $("#Withdraw-div").hide();
                            $("#Withdraw").attr("disabled", "disabled");
                        }
                        Html += "<ul><li style='color:" + str + ";'>" + newobj[key] + "</li><li>" + key + "</li></ul>";
                        continue;
                    }
                    Html += "<ul><li>" + newobj[key] + "</li><li>" + key + "</li></ul>";
                } else {
                    var str = newobj[key];
                }
            } else {
                Html += "<ul><li>-</li><li>" + key + "</li></ul>";
            }

            contentHeight = hegiht * i + hegiht;
            i++;
        }
        OrderStatusDetailcontenttop.append(Html);
        OrderStatusDetailcontenttop.height(contentHeight + 2.4 + "rem");

        if (product == "UT")
            TimeMsgEle(OrderStatusDetailcontenttop, product);
        else
            TimeMsgEle(OrderStatusDetailcontenttop);
        
    }

    function TimeMsgEle(ele, product) {
        var strs = ele.find("ul").last().find("li").last();
        var Msg = ele.find("ul").last().find("li").first();
        var Time = ele.find("ul").last().prev().find("li").first();

        if (product == "UT") {
            var POEMSCharge = ele.find("ul").last().find("li").last();
            var POEMSChargeVal = ele.find("ul").last().find("li").first();
            var IndicativeTransaction=ele.find("ul").last().prev().find("li").last();
            var IndicativeTransactionVal = ele.find("ul").last().prev().find("li").first();
            POEMSCharge.css("width", "62%");
            POEMSChargeVal.css("width", "36%");
            IndicativeTransaction.css("width", "62%");
            IndicativeTransactionVal.css("width", "36%");
            return;
        }
        if (strs.text() == "Message") {
            if (Time.text().length >= 20) {
                Time.css("fontSize", "13px");
            }
            if (Msg.text().length < 20 && Msg.text().length > 18) {
                Msg.css({
                    "fontSize": "14px",
                });
            }
            else if (Msg.text().length > 20 && Msg.text().length < 30) {
                Msg.css({
                    "fontSize": "15px",
                    "lineHeight": "1.4rem",
                    "wordBreak": "break-all",
                    "whiteSpace": "normal",
                    "textAlign": "left"
                });
            }
            else if (Msg.text().length >= 30) {
                Msg.css({
                    "fontSize": "12px",
                    "lineHeight": "0.8rem",
                    "wordBreak": "break-word",
                    "whiteSpace": "normal",
                    "textAlign": "left",
                    "paddingTop": "8px"
                });
            }
            else {
                Msg.css({
                    "fontSize": "16px",
                    "lineHeight": "2.4rem",
                    "whiteSpace": "nowrap",
                    "textAlign": "right"
                });
            }
        }
    }

    function DetailcontenttopCFD(orderType, newobj){
        var OrderStatusDetailcontenttop = $("#OrderStatus-Detail-content .Detail-content-top");
        OrderStatusDetailcontenttop.empty();
        var Html = "", hegiht = 2.4, i = 0, contentHeight, str, strs;
        for (var key in newobj) {
            if (newobj[key]!= "") {
                if (orderType == "If Done") {
                    if (key == "IF Done Limit Order No")
                        Html += "<ul><li style='width:23%'>" + newobj[key] + "</li><li style='width:76%'>" + key + "</li></ul>";
                    else
                        if (str == undefined)
                            str = DetailcontenttopSize(Html, key, newobj);
                        else
                            Html = DetailcontenttopSize(Html, key, newobj, str);
                    continue;
                }
                else if (orderType == "OCO Stop") {
                    if (key == "OCO Stop Limit-Stop Price" || key == "OCO Stop Limit-Stop Price Trigger" || key == "OCO Stop Limit-Limit Price" || key == "OCO Stop Limit-Quantity")
                        Html += "<ul><li style='width:23%'>" + newobj[key] + "</li><li style='width:76%'>" + key + "</li></ul>";
                    else
                        if (str == undefined)
                            str = DetailcontenttopSize(Html, key, newobj);
                        else
                            Html = DetailcontenttopSize(Html, key, newobj, str);
                    continue;
                }
                else if (orderType == "OCO Limit") {
                    if (key == "OCO Stop Limit-Limit Price" || key == "OCO Stop Limit-Quantity")
                        Html += "<ul><li style='width:23%'>" + newobj[key] + "</li><li style='width:76%'>" + key + "</li></ul>";
                    else
                        if (str == undefined)
                            str = DetailcontenttopSize(Html, key, newobj);
                        else
                            Html = DetailcontenttopSize(Html, key, newobj, str);
                    continue;
                }
                else if (orderType == "Contingency") {
                    if (key == "Contingency Condition")
                        Html += "<ul><li style='font-size:12px;width:48%'>" + newobj[key] + "</li><li style='width:50%'>" + key + "</li></ul>";
                    else
                        if (str == undefined)
                            str = DetailcontenttopSize(Html, key, newobj);
                        else
                            Html = DetailcontenttopSize(Html, key, newobj, str);
                    continue;
                }
                else
                    if (str == undefined)
                        str = DetailcontenttopSize(Html, key, newobj);
                    else
                        Html = DetailcontenttopSize(Html, key, newobj, str);
                continue;
            } else {
                Html += "<ul><li>-</li><li>" + key + "</li></ul>";
                continue;
            }

            contentHeight = hegiht * i + hegiht;
            i++;
        }
        OrderStatusDetailcontenttop.append(Html);
        OrderStatusDetailcontenttop.height(contentHeight + 2.4 + "rem")
        TimeMsgEle(OrderStatusDetailcontenttop);
    }

    function DetailcontenttopSize(Html, key, newobj, str) {
        if (key != "StatusColor") {
            if (key == "Action") {
                if (newobj[key] != "BUY") {
                    Html += "<ul><li style='color:#FF3333'>" + newobj[key] + "</li><li>" + key + "</li></ul>";
                    return Html;
                }
                Html += "<ul><li style='color:#039F12'>" + newobj[key] + "</li><li>" + key + "</li></ul>";
                return Html;
            }
            if (key == "Status") {
                if (newobj[key] == "Withdrawn" || newobj[key] == "Order Triggered") {
                    $("#Withdraw-div").hide();
                    $("#Withdraw").attr("disabled", "disabled");
                }
                Html += "<ul><li style='color:" + str + ";'>" + newobj[key] + "</li><li>" + key + "</li></ul>";
                return Html;
            }
            Html += "<ul><li>" + newobj[key] + "</li><li>" + key + "</li></ul>";
            return Html;
        } else {
            var str = newobj[key];
        }
        if (Html == "")
            return str;
        else
            return Html;
    }
    //DetailcontentBottom
    //$("#tabOrdStats .Modular-Detail .Detail-bottom-title ul li").eq(1)
    function DetailcontentBottom(arry, amount,type) {
        var Html = "", s = 0;
        var qtyele = $("#tabOrdStats .Modular-Detail .Detail-bottom-title ul li").eq(1);
        qtyele.text("");
        if (type == 1) {
            qtyele.text("Amount / Ind. NAV");
            if (arry[0].length > 15 && $(document).width() < 414) {
                Html += "<ul><li style='color:" + arry[4] + ";line-height: 1.35rem;'>" + arry[0] + "</li><li>" + amount + "&nbsp;/&nbsp;" + arry[2] + "</li><li>" + arry[3] + "</li></ul>";
            } else {
                Html += "<ul><li style='color:" + arry[4] + ";line-height: 2.75rem;'>" + arry[0] + "</li><li>" + amount + "&nbsp;/&nbsp;" + arry[2] + "</li><li>" + arry[3] + "</li></ul>";
            }
        }
        else {
            qtyele.text("Quantity / Price");
            if (arry[0].length > 15 && $(document).width() < 414) {
                Html += "<ul><li style='color:" + arry[4] + ";line-height: 1.35rem;'>" + arry[0] + "</li><li>" + arry[1] + "&nbsp;/&nbsp;" + arry[2] + "</li><li>" + arry[3] + "</li></ul>";
            } else {
                Html += "<ul><li style='color:" + arry[4] + ";line-height: 2.75rem;'>" + arry[0] + "</li><li>" + arry[1] + "&nbsp;/&nbsp;" + arry[2] + "</li><li>" + arry[3] + "</li></ul>";
            }
        }

        
        $(".Detail-bottom-title-content").append(Html);
        var contentHeight = $("#OrderStatus-Detail-content .Detail-content-bottom").height();
        $("#OrderStatus-Detail-content .Detail-content-bottom").height((contentHeight + 44) + "px");
    }

    //Withdraw and Amend
    function WithdrawAmend(orderNo, submittedQty, submittedPrice, counterId, product, symbol, exchange, ocoPrice, obj) {
        if (submittedPrice == undefined)
            submittedPrice = obj["stopLimitPrice"];
        var remainQty = submittedQty;
        if (obj["remainingQty"] != null)
            remainQty = obj["remainingQty"];

        var name = $("#OrderStatus-Detail-title div").text();
        //var APIurl = productScreening(2, product);
        //if (APIurl != "") {
        var amendURI=obj["amendURI"];
        var withdrawURI = obj["withdrawURI"];
        if (amendURI == null)
            amendURI = "";
        if (withdrawURI == null)
            withdrawURI = "";
        if (withdrawURI != "") {
            var order_No = withdrawURI;
            order_No = order_No.replace("/withdraw", "");
            order_No = order_No.substring(order_No.lastIndexOf("/") + 1);

            $("#Withdraw").removeAttr("disabled");
            $("#Withdraw").click(function () {
                $("#Withdraw-div div").empty();
                var WithdrawDIV = $("#Withdraw-div div");
                var Html = "";
                if (passwordConfirmation == false) {
                    Html += "<p>Withdraw order</p><p>Are you sure you want to cancel the order?</p>";
                    Html += "<p>" + obj["action"] + " " + submittedQty + " of " + name + " (" + exchange + ":" + symbol + ") at " + submittedPrice + "</p>";
                    Html += "<div><a id='Withdraw-Nofalse'>Cancel</a><a id='Withdraw-Yestrue'>Submit</a></div>";
                } else {
                    Html += "<p>Withdraw order</p><p>Are you sure you want to cancel the order?</p>";
                    Html += "<p>" + obj["action"] + " " + submittedQty + " of " + name + " (" + exchange + ":" + symbol + ") at " + submittedPrice + "</p>";
                    Html += "<p>Trade Password</p>";
                    Html += "<p><input type='password' id='Withdrawpad' name='name' value='' /></p>";
                    Html += "<div><a id='Withdraw-Nofalse'>Cancel</a><a id='Withdraw-Yestrue'>Submit</a></div>";
                }

                WithdrawDIV.append(Html);

                $("#Withdraw-div").show();
                $("#Withdraw-Yestrue").click(function () {
                    $("#loading").show();
                    WithdrawOrderparameter(order_No, counterId, product);
                });
                $("#Withdraw-Nofalse").click(function () {
                    $("#Withdraw-div").hide();
                });
            });
        } else {
            $("#Withdraw").attr("disabled", "disabled");
            $("#Withdraw-div").hide();
        }
        //var APIurl = productScreening(3, product);
        //if (APIurl != "") {
        if(amendURI!=""){
            var order_No = amendURI;
            order_No = order_No.replace("/amend", "");
            order_No = order_No.substring(order_No.lastIndexOf("/") + 1);

            $("#Amend").removeAttr("disabled");
            $("#Amend").click(function () {
                $("#Amend-div div").empty();
                var AmendDIV = $("#Amend-div div");
                var Html = "";
                if (passwordConfirmation == false) {
                    if (product == "FT" || product == "FX" || product == "FXMN") {
                        Html += "<p>Amend order</p><p>" + obj["action"] + " " + submittedQty + " " + name + " (" + exchange + ":" + symbol + ")</p>";
                        if (ocoPrice == "") {
                            Html += "<p><span>Price</span><span></span></p>";
                            if (submittedPrice == undefined) {
                                Html += "<p class='Price-Qty-input'><input type='text' id='NEWPrice' name='name' value='' style='width: 95%;height: 34px;' /></p><p></p>";
                            } else {
                                Html += "<p class='Price-Qty-input'><input type='text' id='NEWPrice' name='name' value='" + submittedPrice + "' style='width: 95%;height: 34px;' /></p><p></p>";
                            }

                        } else {
                            Html += "<p><span>Price</span><span>OCO Price</span></p>";
                            Html += "<p class='Price-Qty-input'><input type='text' id='NEWPrice' name='name' value='" + submittedPrice + "' /><input id='ocoPrice'  type='text' name='name' value='" + ocoPrice + "' /></p><p></p>";
                        }
                    } else {
                        Html += "<p>Amend order</p><p>" + obj["action"] + " " + submittedQty + " " + name + " (" + exchange + ":" + symbol + ")</p>";
                        Html += "<p><span>Price</span><span>Quantity</span></p>";
                        Html += "<p class='Price-Qty-input'><input disabled='disabled' type='text' name='name' value='" + submittedPrice + "' /><input id='NEWQty' type='text' name='name' value='" + remainQty + "' /></p><p></p>";
                    }
                    Html += "<div><a id='Amend-Nofalse'>Cancel</a><a id='Amend-Yestrue'>Submit</a></div>";
                } else {
                    if (product == "FT" || product == "FX" || product == "FXMN") {
                        Html += "<p>Amend order</p><p>" + obj["action"] + " " + submittedQty + " " + name + " (" + exchange + ":" + symbol + ")</p>";
                        if (ocoPrice == "") {
                            Html += "<p><span>Price</span><span></span></p>";
                            if (submittedPrice == undefined) {
                                Html += "<p class='Price-Qty-input'><input type='text' id='NEWPrice' name='name' value='' style='width: 95%;height: 34px;' /></p><p></p>";
                            } else {
                                Html += "<p class='Price-Qty-input'><input type='text' id='NEWPrice' name='name' value='" + submittedPrice + "' style='width: 95%;height: 34px;' /></p><p></p>";
                            }

                        } else {
                            Html += "<p><span>Price</span><span>OCO Price</span></p>";
                            Html += "<p class='Price-Qty-input'><input type='text' id='NEWPrice' name='name' value='" + submittedPrice + "' /><input id='ocoPrice'  type='text' name='name' value='" + ocoPrice + "' /></p><p></p>";
                        }
                    } else {
                        Html += "<p>Amend order</p><p>" + obj["action"] + " " + submittedQty + " " + name + " (" + exchange + ":" + symbol + ")</p>";
                        Html += "<p><span>Price</span><span>Quantity</span></p>";
                        Html += "<p class='Price-Qty-input'><input disabled='disabled' type='text' name='name' value='" + submittedPrice + "' /><input id='NEWQty' type='text' name='name' value='" + remainQty + "' /></p><p></p>";
                    }
                    Html += "<p><span>Trade Password</span><span></span></p>";
                    Html += "<p class='Price-Qty-input'><input type='password' id='Amend-passwordE2ee' name='name' value='' /></p>";
                    Html += "<div><a id='Amend-Nofalse'>Cancel</a><a id='Amend-Yestrue'>Submit</a></div>";
                }

                AmendDIV.append(Html);

                $("#Amend-div").show();
                $("#Amend-Yestrue").click(function () {
                    $("#loading").show();
                    AmendOrderparameter(order_No, counterId, product);
                });
                $("#Amend-Nofalse").click(function () {
                    $("#Amend-div").hide();
                });
            });
        } else {
            $("#Amend").attr("disabled", "disabled");
            $("#Amend-div").hide();
        }

    }

    function WithdrawOrderparameter(orderNo, counterId, product) {
        var APIurl = productScreening(2, product);
        var passwordE2ee = $("#Withdrawpad").val();

        if (passwordConfirmation == true) {
            if (passwordE2ee == "") {
                ShowAlert("Password cannot be empty.");
                $("#loading").hide();
                return;
            }
            var rsa = new RSAEngine();
            rsa.init(localStorage.publicKey, localStorage.sessionID, localStorage.randomNo);
            var rPIN = fnGetRPIN(passwordE2ee, rsa);
        }


        if (product == "FT" || product == "FX" || product == "FXMN") {
            str = "&orderNo=" + orderNo + "&product=" + product + "&encryptedPIN=" + rPIN;
        } else if (product == "UT") {
            str = "orderNo=" + orderNo + "&counterId=" + counterId + "&passwordE2ee=" + rPIN;
        } else {
            str = "orderNo=" + orderNo + "&counterId=" + counterId + "&passwordE2ee=" + rPIN;;
        }
        $.post(rootpath + "Order/" + APIurl , str, function (d) {
            var o = JSON.parse(d);
            if (o["code"] == 1) {
                $("#Withdraw-div").hide();
                $("#Withdraw").attr("disabled", "disabled");
                $("#Amend").attr("disabled", "disabled");
                $("#loading").hide();
                //ShowAlert(o["msg"]);
                $('#dialog2 .weui_dialog_bd').text(o["msg"]);
                $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
                    $('#dialog2').off('click').hide();
                    $(".Modular-Detail").hide();
                    $("#OrderStatus").click();
                });
                return;
            } else {
                $("#Withdraw-div").hide();
                $("#loading").hide();
                ShowAlert(o["msg"]);
                return;
            }
        });
    }

    function AmendOrderparameter(orderNo, counterId, product) {

        var APIurl = productScreening(3, product);
        var passwordE2ee = $("#Amend-passwordE2ee").val();

        if (passwordConfirmation == true) {
            if (passwordE2ee == "") {
                ShowAlert("Password cannot be empty.");
                $("#loading").hide();
                return;
            }
            var rsa = new RSAEngine();
            rsa.init(localStorage.publicKey, localStorage.sessionID, localStorage.randomNo);
            var rPIN = fnGetRPIN(passwordE2ee, rsa);
        }

        if (product == "FT" || product == "FX" || product == "FXMN") {
            if ($("#NEWPrice").val() == "" || $("#ocoPrice").val() == "") {
                ShowAlert("Price cannot be empty.");
                $("#loading").hide();
                return;
            } else {
                var NEWPrice = $("#NEWPrice").val().replace(/,/g, "");
                if ($("#ocoPrice").val() == undefined) {
                    var NEWocoPrice = "";
                } else {
                    var NEWocoPrice = $("#ocoPrice").val().replace(/,/g, "");
                } 
            }
            str = "orderNo=" + orderNo + "&product=" + product + "&price=" + NEWPrice + "&encryptedPIN=" + rPIN;
        } else {
            if ($("#NEWQty").val() == "") {
                ShowAlert("Quantity cannot be empty.");
                $("#loading").hide();
                return;
            } else {
                var NEWQty = $("#NEWQty").val().replace(/,/g, "");
            }
            str = "orderNo=" + orderNo + "&counterId=" + counterId + "&amendQty=" + NEWQty + "&passwordE2ee=" + rPIN;
        }
        $.post(rootpath + "Order/" + APIurl , str, function (d) {
            var o = JSON.parse(d);
            if (o["code"] == 1) {
                $("#Amend-div").hide();
                $("#Amend").attr("disabled", "disabled");
                $("#loading").hide();
                //ShowAlert(o["msg"]);
                $('#dialog2 .weui_dialog_bd').text(o["msg"]);
                $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
                    $('#dialog2').off('click').hide();
                var newOrderNO = o["orderDetailURI"];
                    if (true || newOrderNO == null || newOrderNO == "" || (product != "FT" && product != "FX" && product != "FXMN")) {
                    $(".Modular-Detail").hide();
                    $("#OrderStatus").click();
                }
                else {
                    newOrderNO = newOrderNO.substring(newOrderNO.lastIndexOf("/") + 1);
                        //$("#Withdraw-Yestrue").unbind("click");
                        //$("#Withdraw-Yestrue").click(function () {
                        //    $("#loading").show();
                        //    WithdrawOrderparameter(newOrderNO, counterId, product);
                        //});
                        var APIurlx = productScreening(1, product);
                        $.post(rootpath + "Order/" + APIurlx , "orderNo=" + newOrderNO + "&product=" + product + "&type=today", function (d) {
                            var o = JSON.parse(d);
                            if (o["code"] == 1) {
                                OrderStatusDetailUI(o["data"], o["data"]["orderHistory"], o["data"]["counterID"], o["data"]["product"], o["data"]["symbol"], o["data"]["exchange"], o["data"]["orderType"]);
                                return;
                            } else {
                                $("#loading").hide();
                                ShowAlert(o["msg"]);
                                return;
                            }
                    });
                }
                });
                return;
            } else {
                $("#Amend-div").hide();
                $("#loading").hide();
                ShowAlert(o["msg"]);
                return;
            }
        });
    }
    //Order over-->

    //<--Portfolio start
    $("#Portfolio").click(function () {
        scrollingX = true;
        localStorage.page = "4";
        resetClass();
        $("#tabPortfolio").attr("class", "view tab view-portfolio active");
        $("#loading").show();
        $.get(rootpath + "Portfolio/AllBalanceList", function (d) {
            var o = JSON.parse(d);
            if (o["code"] == 1) {
                PortfolioUIdata(o["clientName"], o["accountType"], o["total"], o["balanceInfo"], o["disclaimers"]);
                return;
            } else {
                $("#loading").hide();
                ShowAlert(o["msg"]);
                return;
            }
        });
    });
    
    //PortfolioUIdata
    function PortfolioUIdata(clientName, accountType, total, balanceInfo, disclaimers) {
        var Portfoliobottomp = $(".Portfolio-content-bottom-tt p:first");
        var Portfoliobottomcontent = $(".Portfolio-content-bottom-content");
        var Portfoliodown = $("#Portfolio-drop-down");
        var Portfolioproduct = $(".Portfolio-content .product-div");
        $("#Portfolio-top-title").empty;
        $("#Portfolio-top-title").text("");
        //$("#Portfolio-top-title").empty();
        Portfoliobottomp.empty();
        Portfoliobottomcontent.empty();
        Portfoliodown.empty();
        Portfolioproduct.empty();
        var Arrys = {
            "Stock": "ST",
            "Future/Fx-Gold": "FT",
            "Unit Trust": "UT",
            "CFD": "CFD"
        };

        var str = "", strs = "<ul>";
        var str1 = "<ul><li>Portfolio</li>";
        for (var i = 0; i < balanceInfo.length; i++) {

            var coloR = tone(balanceInfo[i]["typeIcon"]);
            str += "<ul class='product-Details " + i + "' accountType='" + accountType + "' type='" + balanceInfo[i]["type"] + "' typeIcon='" + balanceInfo[i]["typeIcon"] + "'><li>";
            if (balanceInfo[i]["typeIcon"] == "FUT/FX") {
                strs += "<li><a href='#'  style='background:" + coloR + ";'>" + balanceInfo[i]["typeIcon"] + "</a><div></div></li>";
                str += "<a style='background:" + coloR + ";'>" + balanceInfo[i]["typeIcon"] + "</a>";
            } else {
                strs += "<li><a href='#'  style='background:" + coloR + ";line-height: 30px;'>" + balanceInfo[i]["typeIcon"] + "</a><div></div></li>";
                str += "<a style='background:" + coloR + ";line-height: 30px;'>" + balanceInfo[i]["typeIcon"] + "</a>";
            }
            for (var type in Arrys) {
                if (balanceInfo[i]["type"] == Arrys[type]) {
                    str += "<div><p><span >" + type + "</span><span>" + balanceInfo[i]["currency"] + " " + balanceInfo[i]["balance"] + "</span></p><p>As of " + balanceInfo[i]["lastUpdated"] + "</p></div></li></ul>";
                }
            }
            str1 += "<li accountType='" + accountType + "' typeIcon='" + balanceInfo[i]["typeIcon"] + "' type='" + balanceInfo[i]["type"] + "'>" + balanceInfo[i]["typeIcon"] + "</li>";
        }

        strs += "</ul>";
        str1 += "</ul>";
        str += "<div style='height: 72px;'></div>";

        Portfolioproduct.append(strs);
        Portfoliobottomcontent.append(str);
        Portfoliodown.append(str1);
        Portfoliobottomp.html("<span>Total</span><span>" + total + "</span>"); 
        //$("#Portfolio-top-title").append("<p>Portfolio(" + accountNo + ") </p><p>" + clientName + "</p>");
        $("#Portfolio-top-title").append("Portfolio(" + accountNo + ") "+"<span>" + clientName + "</span>");
        $("#show-Disclaimer .Disclaimer-content").text(disclaimers);
        canvaS(balanceInfo);
        PortfoliDetailData($(".product-Details"));
        PortfoliDetailData($("#Portfolio-drop-down ul li:not(:first-child)"));

        $("#Disclaimer").unbind("click");
        $("#hide-Disclaimer").unbind("click");
        $("#Disclaimer").on("click", function (event) {
            $("#show-Disclaimer").show();
        });
        $("#hide-Disclaimer").on("click", function () {
            localStorage.PortfolioDisclaimer = "true";
            $("#show-Disclaimer").hide();
        });

        if (localStorage.PortfolioDisclaimer == "false") {
            $("#show-Disclaimer").show();
        }
        $("#loading").hide();
    }

    //Portfolio Detail data
    function PortfoliDetailData(ele) {

        var PortfoliDetaititle = $("#Portfolio-top-title").text().substring($("#Portfolio-top-title").text().indexOf("("));
        ele.unbind("click");
        ele.click(function () {
            $("#loading").show();

            var type = $(this).attr("type");
            var typeIcon = $(this).attr("typeIcon");
            var accountType = $(this).attr("accountType");
            $("#Portfolio-drop-down li:not(:first-child)").css("color", "#333");
            $(this).css("color", "#D47510");

            $("#AccountNo-Detail-content-details").empty();
            $("#Portfolio-title-Text").empty();
            $("#PositionS-contract-name").empty();
            $("#PositionS-content-details").empty();
            $("#AccountNo-Detail-bottom").empty();
            $("#PositionS-bottom").empty();
            $("#PortfolioDetail-top").empty();

            if (type == "ST") {
                $.get(rootpath + "Portfolio/STKAccountDetails?accountType=" + accountType, function (d) {
                    var accountDetails = JSON.parse(d);
                    if (accountDetails["code"] == 1) {
                        var accountDetailsarry = accountDetails["accountDetails"];
                        if (accountDetailsarry.length == 1) {
                            accountDetailsarry = accountDetails["accountDetails"][0];
                        }
                        PortfoliDetailAccountNoDetailUIST(PortfoliDetaititle, type, typeIcon, accountDetailsarry, accountDetails["lastUpdated"]);

                        $.get(rootpath + "Portfolio/StocksHoldings", function (d) {
                            var holdings = JSON.parse(d);
                            if (holdings["code"] == 1) {
                                var newobj = {};
                                newobj["total"] = holdings["total"]
                                newobj["currency"] = holdings["currency"]
                                newobj["lastUpdated"] = holdings["lastUpdated"];
                                PortfoliDetailPositionsUIST(typeIcon, newobj, holdings["holdings"]);
                                return;
                            } else {
                                $("#loading").hide();
                                ShowAlert(holdings["msg"]);
                                return;
                            }
                        });
                        return;
                    } else {
                        $("#loading").hide();
                        ShowAlert(accountDetails["msg"]);
                        return;
                    }
                });

            } else if (type == "CFD") {
                $.get(rootpath + "Portfolio/CFDAccountDetails", function (d) {
                    var Account = JSON.parse(d);
                    if (Account["code"] == 1) {
                        PortfoliDetailAccountNoDetailUIST(PortfoliDetaititle, type, typeIcon, Account, Account["lastUpdated"]);
                        $.get(rootpath + "Portfolio/CFDPositionsList", function (d) {
                            var holdings = JSON.parse(d);
                            if (holdings["code"] == 1) {
                                var newobj = {};
                                newobj["total"] = holdings["total"]
                                newobj["currency"] = holdings["currency"]
                                newobj["lastUpdated"] = holdings["lastUpdated"]
                                PortfoliDetailPositionsUIST(typeIcon, newobj, holdings["holdings"]);
                                return;
                            } else {
                                $("#loading").hide();
                                ShowAlert(holdings["msg"]);
                                return;
                            }
                        });
                        return;
                    } else {
                        $("#loading").hide();
                        ShowAlert(Account["msg"]);
                        return;
                    }
                });

            } else if (type == "UT") {
                $.get(rootpath + "Portfolio/UTAccountDetails", function (d) {
                    var Account = JSON.parse(d);
                    if (Account["code"] == 1) {
                        PortfoliDetailAccountNoDetailUIST(PortfoliDetaititle, type, typeIcon, Account["details"], Account["lastUpdated"]);
                        $.get(rootpath + "Portfolio/UTHoldings", function (d) {
                            var holdings = JSON.parse(d);
                            if (holdings["code"] == 1) {
                                var newobj = {};
                                newobj["total"] = holdings["total"];
                                newobj["totalCost"] = holdings["totalCost"];
                                newobj["totalMarketValue"] = holdings["totalMarketValue"];
                                newobj["currency"] = holdings["currency"];
                                newobj["lastUpdated"] = holdings["lastUpdated"];
                                PortfoliDetailPositionsUIUT(typeIcon, newobj, holdings["holdings"]);
                                return;
                            } else {
                                $("#loading").hide();
                                ShowAlert(holdings["msg"]);
                                return;
                            }
                        });
                        return;
                    } else {
                        $("#loading").hide();
                        ShowAlert(Account["msg"]);
                        return;
                    }
                });
            } else if (type == "FT") {
                $.get(rootpath + "PortfolioFtFx/Account?product=" + type, function (d) {
                    var Account = JSON.parse(d);
                    if (Account["code"] == 1) {
                        PortfoliDetailAccountNoDetailUIST(PortfoliDetaititle, type, typeIcon, Account["data"], Account["data"]["lastUpdatedTime"]);
                        $.get(rootpath + "PortfolioFtFx/NetPositionSummary?product=" + type, function (d) {
                            var PositionS = JSON.parse(d);
                            if (PositionS["code"] == 1) {
                                PortfoliDetailPositionsUIFTFX(typeIcon, PositionS["data"]);
                                return;
                            } else {
                                $("#loading").hide();
                                ShowAlert(PositionS["msg"]);
                                return;
                            }
                        });
                        return;
                    } else {
                        $("#loading").hide();
                        ShowAlert(Account["msg"]);
                        return;
                    }
                });


            }
        });
    }

    function PortfoliDetailAccountNoDetailUIST(PortfoliDetaititle, type, typeIcon, obj, String) {
        //存在的后续问题if有前提条件的话
        var str = "";
        var strs = "<ul><li>Description</li>";
        var objs = obj.length;
        var Color = tone(typeIcon);
        var Arrys = {
            "Stock": "ST",
            "FUT/FX": "FT",
            "Unit Trust": "UT",
            "CFD": "CFD"
        };
        for (var types in Arrys){
            if (Arrys[types] == type) {
                type = types;
            }
        }

        if (type != "FUT/FX") {

            if (objs == undefined || objs <= 0) {

                var arry = PortfolioDetailTop(type, strs, obj);
                strs = arry[0]; str = arry[1];
                //AccountNo-Detail-bottom
            } else {
                if (objs == 2) {
                    strs += "<li>" + obj[0]["currency"] + "</li><li>" + obj[1]["currency"] + "</li></ul>";
                    if (type == "Stock")
                        str = PortfolioDetailTops(obj, STAccountNoDetailData);
                        else if (type == "CFD")
                            str = PortfolioDetailTops(obj, CFDAccountNoDetailData);
                            else
                                str = PortfolioDetailTops(obj, UTAccountNoDetailData);
                }
                else
                {
                    $("#PortfolioDetail-top").append(strs);
                    PortfoliDetailElementSize(typeIcon, Color, type, objs, PortfoliDetaititle, String);
                }
               
            }
        } else {
            var strs = "<ul><li style='width:50%'>Description</li>";
            var strArry = FTFXAccountNoDetailData(obj);
            strs += strArry[1];
            strs += "</ul>";
            str = strArry[0];
        }
        $("#PortfolioDetail-top").append(strs);
        $("#AccountNo-Detail-content-details").append(str);
        PortfoliDetailElementSize(typeIcon, Color, type, objs, PortfoliDetaititle, String);
    }

    function PortfolioDetailTops(obj, Func) {

        var newobj, newobj1, strs = "", str = "";

        for (var i = 0; i < obj.length; i++) {
            if (i == 0) {
                var arry = Func(strs, obj[i]);
                var newobj = arry[1];
            }
            else {
                var arry = Func(strs, obj[i]);
                var newobj1 = arry[1];
            }
        }
        for (var w in newobj) {
            for (var s in newobj1) {
                if (w == s)
                {
                    if (w == "Availble Cash")
                    {
                        if (newobj[w].indexOf("-") != -1)
                            var color = "red";
                        else
                            var color = "#";
                        if (newobj1[s].indexOf("-") != -1)
                            var color1 = "red";
                        else
                            var color1 = "#";

                        str += "<ul><li>" + w + "</li><li style='color:" + color + "'>" + newobj[w] + "</li><li style='color:" + color1 + "'>" + newobj1[s] + "</li></ul>";
                    }
                    else
                        str += "<ul><li>" + w + "</li><li>" + newobj[w] + "</li><li>" + newobj1[s] + "</li></ul>";
                }
            }
        }

        return str;
    }

    function PortfolioDetailTop(type, strs, obj) {

        let arry = [], str = "";

        if (type == "CFD") {
            //后续CFD
            var arrys = CFDAccountNoDetailData(strs, obj);
            for (var i in arrys[1]) {
                str += "<ul><li style='width:49.4%'>" + i + "</li><li style='width:49.4%'>" + arrys[1][i] + "</li></ul>";
            }
            strs = arrys[0];
        }
        else if (type == "Stock") {
            //ST
            var arrys = STAccountNoDetailData(strs, obj);
            for (var i in arrys[1]) {
                str += "<ul><li style='width:49.4%'>" + i + "</li><li style='width:49.4%'>" + arrys[1][i] + "</li></ul>";
            }
            strs = arrys[0];
        }
        else {
            //UT
            var arrys = UTAccountNoDetailData(strs, obj);
            for (var i in arrys[1]) {
                str += "<ul><li style='width:49.4%'>" + i + "</li><li style='width:49.4%'>" + arrys[1][i] + "</li></ul>";
            }
            strs = arrys[0];
        }

        arry.push(strs, str);
        return arry;
    }

    function STAccountNoDetailData(strs, obj) {
        var newobj = {}, arry = [];
        strs = "<ul><li style='width:50%'>Description</li>";
        for (var i in obj) {
            if (i == "currency") {
                strs += "<li style='width:50%'>" + obj[i] + "</li>";
            }
            else {
                if (i == "balanceAsYesterday")
                    newobj["Balance As Yesterday"] = obj[i];
                else if (i == "fundReceivedToday")
                    newobj["Fund Received Today"] = obj[i];
                else if (i == "openingBalanceToday")
                    newobj["Opening Balance Today"] = obj[i];
                else if (i == "itemsDueForSettlement")
                    newobj["Items Due For Settlement"] = obj[i];
                else if (i == "availableBalance")
                    newobj["Available Balance"] = obj[i];
                else if (i == "allItemsOutstanding")
                    newobj["AllItems Outstanding"] = obj[i];
                else if (i == "netAmount")
                    newobj["Net Amount"] = obj[i];
                else if (i == "totalAssetValue")
                    newobj["Total Asset Value"] = obj[i];
                else if (i == "collateralValue")
                    newobj["Collateral Value"] = obj[i];
                else if (i == "marginCall")
                    newobj["Margin Call"] = obj[i];
                else if (i == "marginRatio")
                    newobj["Margin Ratio"] = obj[i];
                else if (i == "creditLimit")
                    newobj["Credit Limit"] = obj[i];
                else if (i == "purchaseA")
                    newobj["Purchase'A'"] = obj[i];
                else if (i == "purchaseB")
                    newobj["Purchase'B'"] = obj[i];
                else if (i == "purchaseC")
                    newobj["Purchase'C'"] = obj[i];
            }
        }
        strs += "</ul>";
        arry.push(strs, newobj);
        return arry;
    }

    function CFDAccountNoDetailData(strs, obj) {
        var newobj = {}, arry = [];
        strs = "<ul><li style='width:50%'>Description</li>";
        for (var i in obj) {
            if (i == "currency") {
                strs += "<li style='width:50%'>" + obj[i] + "</li>";
            }
            else {
                if (i == "ledgerBalance")
                    newobj["Ledger Balance"] = obj[i];
                else if (i == "unrealizedPL")
                    newobj["Unrealized P/L"] = obj[i];
                else if (i == "equityBalance")
                    newobj["Equity Balance"] = obj[i];
                else if (i == "availableCash")
                    newobj["Available Cash"] = obj[i];
                else if (i == "availableBalance")
                    newobj["Available Balance"] = obj[i];
                else if (i == "maintenanceMargin")
                    newobj["Maintenance Margin"] = obj[i];
                else if (i == "marginUtilization")
                    newobj["Margin Utilization(%)"] = obj[i];
                else if (i == "creditLeft")
                    newobj["Credit Left"] = obj[i];
                else if (i == "creditLimit")
                    newobj["Credit Limit"] = obj[i];
            }
        }
        strs += "</ul>";
        arry.push(strs, newobj);
        return arry;
    }

    function FTFXAccountNoDetailData(obj) {
        var Html = "", str = "", arry = [], color = "black", color1 ="black", arrys={},newobj = {};
        //if (obj.baseCurrency == "SGD") {
            for (var i in obj)
            {
                if (obj[i] == "" || obj[i] == null) {
                    newobj[i] = "-";
                }
                else {
                    newobj[i] = obj[i];
                }
            }

            Html += "<ul><li style= 'width:49.4%'><span>Ledger Balance</span></li><li style='width:49.4%;'>" + newobj["ledgerBalance"] + "</li></ul >";
            Html += "<ul><li style= 'width:49.4%' ><span>Account Balance</span></li><li style='width:49.4%;'>" + newobj["accountBalance"] + "</li></ul >";
            color = setColor(newobj["unrealizedPL"]);
            Html += "<ul><li style= 'width:49.4%' ><span>Unrealized P/L</span></li><li style='width:49.4%;color:" + color + "'>" + newobj["unrealizedPL"] + "</li></ul >";
            color = setColor3(newobj["marginExcessDeficit"]);
            Html += "<ul><li style= 'width:49.4%' ><span>Margin Excess/Deficit</span></li><li style='width:49.4%;color:" + color + "'>" + newobj["marginExcessDeficit"] + "</li></ul >";
            Html += "<ul><li style= 'width:49.4%' ><span>Portfolio Initial Margin</span></li><li style='width:49.4%;'>" + newobj["initialMargin"] + "</li></ul >";
            Html += "<ul><li style= 'width:49.4%' ><span>Maintenance Margin</span></li><li style='width:49.4%;'>" + newobj["maintenanceMargin"] + "</li></ul >";
            color = setColor2(newobj["utilization"]);
            Html += "<ul><li style= 'width:49.4%' ><span>Margin Utilization(%)</span></li><li style='width:49.4%;color:" + color + "'>" + newobj["utilization"] + "</li></ul >";
            str += "<li style='width:50%'>" + obj["baseCurrency"] + "</li>";
        //} else if (obj.length == 2) {
        //    for (var i = 0; i < obj.length; i++) {

        //        for (var j in obj[i]) {
        //            if (obj[i][j] == "" || obj[i][j] == null) {
        //                arrys[j] = "-";
        //            }
        //            else {
        //                arrys[j] = obj[i][j];
        //            }
        //        }
        //        newobj[i] = arrys;
        //    }
        //    Html += "<ul><li><span>Ledger Balance</span></li><li style=''>" + newobj[0]["ledgerBalance"] + "</li><li style=''>" + newobj[1]["ledgerBalance"] + "</li></ul >";
        //    Html += "<ul><li><span>Account Balance</span></li><li  style=''>" + newobj[0]["accountBalance"] + "</li><li style=''>" + newobj[1]["accountBalance"] + "</li></ul >";
        //    color1 = setColor(newobj[0]["unrealizedPL"]); color = setColor(newobj[1]["unrealizedPL"]);
        //    Html += "<ul><li><span>Unrealized P/L</span></li><li  style='color:" + color + "'>" + newobj[0]["unrealizedPL"] + "</li><li style='color:" + color + "'>" + newobj[1]["unrealizedPL"] + "</li></ul >";
        //    color1 = setColor3(newobj[0]["marginExcessDeficit"]); color = setColor3(newobj[1]["marginExcessDeficit"]);
        //    Html += "<ul><li><span>Margin Excess/Deficit</span></li><li  style='color:" + color + "'>" + newobj[0]["marginExcessDeficit"] + "</li><li style='color:" + color + "'>" + newobj[1]["marginExcessDeficit"] + "</li></ul >";
        //    Html += "<ul><li><span>Portfolio initial Margin</span></li><li  style=''>" + newobj[0]["initialMargin"] + "</li><li style=''>" + newobj[1]["initialMargin"] + "</li></ul >";
        //    Html += "<ul><li><span>Maintenance Margin</span></li><li  style=''>" + newobj[0]["maintenanceMargin"] + "</li><li style=''>" + newobj[1]["maintenanceMargin"] + "</li></ul >";
        //    color1 = setColor2(newobj[0]["utilization"]); color = setColor2(newobj[1]["utilization"]);
        //    Html += "<ul><li><span>Margin Utilization(%)</span></li><li  style='color:" + color + "'>" + newobj[0]["utilization"] + "</li><li style='color:" + color + "'>" + newobj[1]["utilization"] + "</li></ul >";
        //    Html += "<ul><li><span>Total Adjustment</span></li><li  style=''>" + newobj[0]["totalAdjustment"] + "</li><li style=''>" + newobj[1]["totalAdjustment"] + "</li></ul >";
        //    str += "<li>" + newobj[0]["baseCurrency"] + "</li><li>" + newobj[1]["baseCurrency"] + "</li>";
        //}
        arry.push(Html, str);
        return arry;
    }

    function UTAccountNoDetailData(strs, obj) {
        var newobj = {}, arry = [];
        strs = "<ul><li style='width:50%'>Description</li>";
        for (var i in obj) {
            if (i == "currency") {
                strs += "<li style='width:50%'>" + obj[i] + "</li>";
            }
            else {
                if (i == "availableCash")
                    newobj["Availble Cash"] = obj[i];
                else if (i == "totalCost")
                    newobj["Total Cost"] = obj[i];
                else if (i == "marketValue")
                    newobj["Market Value"] = obj[i];
                else if (i == "unrealizedPL")
                    newobj["Unrealized P/L"] = obj[i];
                else if (i == "gainLossPct")
                    newobj["Unrealized P/L(%)"] = obj[i] + "%";
            }
        }
        strs += "</ul>";
        arry.push(strs, newobj);
        return arry;
    }

    function PortfoliDetailElementSize(typeIcon, Color, type,number, PortfoliDetaititle, String) {
        //if (typeIcon.length > 3) {
        //    if (typeIcon == "FUT/FX") {
        //        $("#Portfolio-title-Text").append("<a style='padding: 4px 4px 4px 4px;line-height: 16px;background:" + Color + "'>" + typeIcon + "</a><div>" + type + PortfoliDetaititle + "</div><span></span>");
        //    } else {
        //        $("#Portfolio-title-Text").append("<a style='padding: 4px 4px 4px 4px;line-height: 32px;background:" + Color + "'>" + typeIcon + "</a><div>" + type + PortfoliDetaititle + "</div><span></span>");
        //    }
        //} else {
        //    $("#Portfolio-title-Text").append("<a style='padding: 4px 4px 4px 4px;line-height: 32px;background:" + Color + "'>" + typeIcon + "</a><div>" + type + PortfoliDetaititle + "</div><span></span>");
        //}
        var lineHeight = "32";
        if (typeIcon.length > 3)
            lineHeight = "16";
        if (typeIcon=="CFD")
            lineHeight = "32px;font-size:12";
        $("#Portfolio-title-Text").append("<a style='padding: 4px 4px 4px 4px;line-height: " + lineHeight + "px;background:" + Color + "'>" + typeIcon + "</a><div style='display:table;'><div style='display:table-cell;vertical-align:middle;float:none;'>" + type + PortfoliDetaititle + "</div></div><span></span>");

        $("#AccountNo-Detail-bottom").append("<p>Last Update : " + String + "</p>");

        $("#Portfolio-title-Text").unbind("click");
        $("#Portfolio-title-Text").click(function (e) {
            $("#Portfolio-drop-down").toggle();
            $(document).unbind("click");
            $(document).click(function () {
                $("#Portfolio-drop-down").hide();
            });
            return false;
        });
        $("#Portfolio-Detail").show();
        if (number == undefined || number <= 0) {
            var h = $("#AccountNo-Detail-content-details").height();
            H = (h + 55 * 3) + 18 + "px";
            if (typeIcon != "EQ") 
                $("#AccountNo-Detail-content-details").css("height", H);
            else
                $("#AccountNo-Detail-content-details").css("height", "800px");
            
        }
        else
        {
            $(".PortfolioDetail-content-content ul").css("height", "50px");
            var h = $("#AccountNo-Detail-content-details").height();
            $("#AccountNo-Detail-content-details").height((h + 200) + "px");
        }
    }

    function setColor(string) {
        var color = "black";
        var num = Number(string);
        if (num == 0)
            return color;
        else if (string.indexOf("-") != -1)
            return color = "red";
        else
            return color = "green";
    }
    function setColor3(string) {
        var color = "black";
        var num = Number(string);
        if (string.indexOf("-") != -1)
            return color = "red";
        else
            return color;
    }
    function setColor2(string) {
        var str = string.replace("%", ""), color="black";
        var num = Number(str);
        if (num > 100)
            return color = "red";
        else
            return color;
    }

    function PortfoliDetailPositionsUIST(typeIcon, obj, obj1) {

        var str = "";
        var str1 = "";
        var backgroundColor = tone(typeIcon);
        var PositionLeft = $("#PositionS-contract-name");
        var PositionSContent = $("#PositionS-content-details");
        PositionLeft.empty();
        PositionSContent.empty();
        PositionLeft.height("auto");
        PositionSContent.height("auto");//investment portfolio

        if (typeIcon == "EQ")
            CFDTitleName(2);
        else if (typeIcon == "CFD")
            CFDTitleName(1);
        else if (typeIcon == "UT")
            CFDTitleName(4);

        if (!obj1) {
            $("#loading").hide();
            return;
        }

        if (obj1[0]["currencies"] == undefined)
            CFDTitleName(1);
        else 
            CFDTitleName(2);
        documentScroll(3);
        

        for (var i = 0; i < obj1.length; i++) {
            //灰色SGX独行
            if (obj1[i].length != 0) {
                if (obj1[i]["exchange"] == undefined) {
                    str += "<li style='height: 26px;line-height: 26px;text-indent: 2.5rem;background: #979797;font-size: 13px;position: relative;border: none;'>" + obj1[i]["productIcon"] + "<span style='position: absolute;display: block;top: 8px;left: 8%;border-left: 6px solid transparent;border-bottom: 6px solid transparent;border-right: 6px solid transparent;border-top: 6px solid #F78E1E;'></span></li>";
                    str1 += "<ul style='height: 26px;line-height: 26px;background: #979797;'></ul>";
                } else {
                    str += "<li style='height: 26px;line-height: 26px;text-indent: 2.5rem;background: #979797;font-size: 13px;position: relative;border: none;'>" + obj1[i]["exchange"] + "<span style='position: absolute;display: block;top: 8px;left: 8%;border-left: 6px solid transparent;border-bottom: 6px solid transparent;border-right: 6px solid transparent;border-top: 6px solid #F78E1E;'></span></li>";
                    str1 += "<ul style='height: 26px;line-height: 26px;background: #979797;'></ul>";
                }
            

                if (obj1[i]["currencies"] != undefined) {

                    for (var j = 0; j < obj1[i]["currencies"].length; j++) {

                        for (var s = 0; s < obj1[i]["currencies"][j]["list"].length; s++) {
                            //内容
                            var Color;
                            str += WatchlistOrderStatusLeft(m, typeIcon, obj1[i]["currencies"][j]["list"][s]["name"]);
                            if (obj1[i]["currencies"][j]["list"][s]["unrealizedPL"].indexOf("-") == 0) {
                                Color = "#FE8366";
                                str1 += "<ul><li style='color:" + Color + "'>" + obj1[i]["currencies"][j]["list"][s]["unrealizedPL"] + "</li>"
                            } else {
                                Color = "#7BCD48";
                                str1 += "<ul><li style='color:" + Color + "'>" + obj1[i]["currencies"][j]["list"][s]["unrealizedPL"] + "</li>"
                            }
                            str1 += "<li>" + obj1[i]["currencies"][j]["list"][s]["qty"] + "</li><li>" + obj1[i]["currencies"][j]["list"][s]["mktValue"] + "</li><li>" + obj1[i]["currencies"][j]["list"][s]["aveCostPrice"] + "</li>";
                            str1 += "<li>" + obj1[i]["currencies"][j]["list"][s]["closingPrice"] + "</li><li>" + obj1[i]["currencies"][j]["list"][s]["tradedCurr"] + "</li><li>" + obj1[i]["currencies"][j]["list"][s]["suspendedQty"] + "</li><li>" + obj1[i]["currencies"][j]["list"][s]["totalCost"] + "</li></ul>";

                        }
                        //独行小计SGD
                        var Color;
                        str += "<li style='height:26px;line-height:26px;text-indent:.4rem;background:#6e6e6e;font-size:13px;border: none;'>Class sum(" + obj1[i]["currencies"][j]["currency"] + ")</li>";
                        if (obj1[i]["currencies"][j]["unrealizedPL"].indexOf("-") == 0) {
                            Color = "#FE8366";
                            str1 += "<ul style='height: 26px;line-height: 26px;background: #6e6e6e;text-indent: 0.6rem;color:" + Color + "'>" + obj1[i]["currencies"][j]["unrealizedPL"] + "</ul>";
                        } else {
                            Color = "#7BCD48";
                            str1 += "<ul style='height: 26px;line-height: 26px;background: #6e6e6e;text-indent: 0.6rem;color:" + Color + "'>" + obj1[i]["currencies"][j]["unrealizedPL"] + "</ul>";
                        }

                    }

                } else {
                    //CFD
                    if (obj1[i]["list"] != null || obj1[i]["list"] != undefined) {
                        for (var s = 0; s < obj1[i]["list"].length; s++) {
                            //内容
                            var Color;
                            str += WatchlistOrderStatusLeft(m, typeIcon, obj1[i]["list"][s]["name"]);
                            if (obj1[i]["list"][s]["unrealizedPL"].indexOf("-") == 0) {
                                Color = "#FE8366";
                                str1 += "<ul><li style='color:" + Color + "'>" + obj1[i]["list"][s]["unrealizedPL"] + "</li>"
                            } else {
                                Color = "#7BCD48";
                                str1 += "<ul><li style='color:" + Color + "'>" + obj1[i]["list"][s]["unrealizedPL"] + "</li>"
                            }
                            str1 += "<li>" + obj1[i]["list"][s]["qty"] + "</li><li>" + obj1[i]["list"][s]["rolloverPrice"] + "</li><li>" + obj1[i]["list"][s]["entryPrice"] + "</li>";
                            str1 += "<li>" + obj1[i]["list"][s]["markToMarket"] + "</li><li>" + obj1[i]["list"][s]["currency"] + "</li></ul>";
                            if(obj1[i]["list"][s]["subList"]!=undefined){
                                for (var j = 0; j < obj1[i]["list"][s]["subList"].length; j++) {
                                    str += WatchlistOrderStatusLeft(m, typeIcon, obj1[i]["list"][s]["subList"][j]["name"]);
                                    if (obj1[i]["list"][s]["subList"][j]["unrealizedPL"].indexOf("-") == 0) {
                                        Color = "#FE8366";
                                        str1 += "<ul><li style='color:" + Color + "'>" + obj1[i]["list"][s]["subList"][j]["unrealizedPL"] + "</li>"
                                    } else {
                                        Color = "#7BCD48";
                                        str1 += "<ul><li style='color:" + Color + "'>" + obj1[i]["list"][s]["subList"][j]["unrealizedPL"] + "</li>"
                                    }
                                    str1 += "<li>" + obj1[i]["list"][s]["subList"][j]["qty"] + "</li><li>" + obj1[i]["list"][s]["subList"][j]["rolloverPrice"] + "</li><li>" + obj1[i]["list"][s]["subList"][j]["entryPrice"] + "</li>";
                                    str1 += "<li>" + obj1[i]["list"][s]["subList"][j]["markToMarket"] + "</li><li>" + obj1[i]["list"][s]["subList"][j]["currency"] + "</li></ul>";
                                }
                            }
                    

                        }
                    }
                    else
                    {
                        str = "";
                        str1 = "";
                    }
                }
            }
        }
        $("#PositionS-bottom").append("<p><span>Total(" + obj["currency"] + ")</span><span>" + obj["total"] + "</span></p><p>Last Updated: " + obj["lastUpdated"] + "</p>")
        PositionLeft.append(str);
        PositionSContent.append(str1);
        var Portfoliocontentul = $("#PositionS-content-details ul");
        if (obj1[0]["currencies"] == undefined) {
            Portfoliocontentul.width("988px");
        } else {
            Portfoliocontentul.width("1252px");
        }
        $("#Portfolio-Detail").show();
        var l = PositionLeft.height();
        var c = PositionSContent.height();

        PositionLeft.height(((l + 53 * 3) + 60) + "px");
        PositionSContent.height(((l + 52 * 3) + 61) + "px");

        $("#loading").hide();
    }

    PortfoliDetailPositionsUIUT = (typeIcon, object, holdings) => {

        let string = "", strings = "", Total = "", backgroundColor = tone(typeIcon), PositionLeft = $("#PositionS-contract-name");
        let PositionSContent = $("#PositionS-content-details");
        PositionLeft.empty(); PositionSContent.empty(); PositionLeft.height("auto"); PositionSContent.height("auto");//investment portfolio

        if (typeIcon == "EQ")
            CFDTitleName(2);
        else if (typeIcon == "CFD")
            CFDTitleName(1);
        else if (typeIcon == "UT")
            CFDTitleName(4);

        if (!holdings)
        {
            $("#loading").hide();
            return;
        }

        documentScroll(3);

        for (let f = 0; f < holdings.length; f++)
        {
            let holdingsList = holdings[f]["list"];
            for (let i = 0; i < holdingsList.length; i++)
            {
                string += WatchlistOrderStatusLeft(m, typeIcon, holdingsList[i]["name"]);

                strings += "<ul><li style='color:" + FontColor(holdingsList[i]["unrealizedPL"]) + "'>" + holdingsList[i]["unrealizedPL"] + "</li>";
                strings += "<li>" + holdingsList[i]["units"] + "</li><li>" + holdingsList[i]["indicativeNAV"] + "</li><li>" + holdingsList[i]["costPrice"] + "</li>";
                strings += "<li>" + holdingsList[i]["currency"] + "</li><li>" + holdingsList[i]["cost"] + "</li><li>" + holdingsList[i]["marketValue"] + "</li>";
                strings += "<li>" + holdingsList[i]["fundCode"] + "</li><li>" + holdingsList[i]["isinCode"] + "</li></ul>";

            }
            string += "<li style='height: 26px;line-height: 26px;text-indent: 1rem;background: #979797;font-size: 13px;border: none;'> Subtotal(" + holdings[f]["currency"] + ")</li>";
            strings += "<ul style='height: 26px;line-height: 26px;background: #979797;'><li style='color:" + FontColor(holdings[f]["unrealizedPL"]) + "'>" + holdings[f]["unrealizedPL"] + "</li><li>-</li><li>-</li><li>-</li><li>-</li><li>" + holdings[f]["cost"] + "</li><li>" + holdings[f]["marketValue"] + "</li><li>-</li><li>-</li></ul>";
        }
        string += "<li style='height: 26px;line-height: 26px;text-indent: 1rem;background: #979797;font-size: 13px;border: none;'> Total(" + object["currency"] + " Base)</li>";
        strings += "<ul style='height: 26px;line-height: 26px;background: #979797;'><li style='color:" + FontColor(object["total"]) + "'>" + object["total"] + "</li><li>-</li><li>-</li><li>-</li><li>-</li><li>" + object["totalCost"] + "</li><li>" + object["totalMarketValue"] + "</li><li>-</li><li>-</li></ul>";

        $("#PositionS-bottom").append("<p>Last Updated: " + object["lastUpdated"] + "</p>")
        PositionLeft.append(string);
        PositionSContent.append(strings);
        $("#PositionS-content-details ul").width("1390px");
        $("#Portfolio-Detail").show();
        var fNext = $("#PositionS-content-details ul").eq("" + $("#PositionS-content-details ul").length - 2 + "");
        fNext.children("li").css({
            "lineHeight": "26px",
            "border": "0",
        }); fNext.next().children("li").css({
            "lineHeight": "26px",
            "border": "0",
        });
        FontColor(fNext.children("li"), 1);
        FontColor(fNext.next().children("li"), 1);
        var l = PositionLeft.height();
        var c = PositionSContent.height();

        PositionLeft.height(((l + 53 * 3) + 24) + "px");
        PositionSContent.height(((l + 52 * 3) + 25) + "px");

        $("#loading").hide();
    }

    function PortfoliDetailPositionsUIFTFX(typeIcon, obj) {

        var str = "";
        var str1 = "";
        var backgroundColor = tone(typeIcon);
        var PositionLeft = $("#PositionS-contract-name");
        var PositionSContent = $("#PositionS-content-details");
        PositionLeft.empty();
        PositionSContent.empty();
        PositionLeft.height("auto");
        PositionSContent.height("auto");//investment portfolio

        for (var i in obj) {
            //灰色FTFX独行
            CFDTitleName(3);
            if (obj[i].length != 0) {
                if (i != "needDisclaimer" && i != "disclaimers") {
                    str += "<li style='height: 26px;line-height: 26px;text-indent: 2.5rem;background: #979797;font-size: 13px;position: relative;border: none;'>" + obj[i][0]["productIcon"] + "<span style='position: absolute;display: block;top: 8px;left: 8%;border-left: 6px solid transparent;border-bottom: 6px solid transparent;border-right: 6px solid transparent;border-top: 6px solid #F78E1E;'></span></li>";
                    str1 += "<ul style='height: 26px;line-height: 26px;background: #979797;'></ul>";

                    var secondLevelobj = obj[i];

                    for (var j = 0; j < secondLevelobj.length; j++) {

                        str += "<li class='secondLevelLi' style='height: 32px;line-height: 16px;background: #fff;font-size: 12px;'><span style='width: 94px;height: 100%;display: inline-block;overflow: hidden;'>" + secondLevelobj[j]["name"] + "</span><span style='float: left;display: block;margin: 12px 18px 4px 10px;border-left: 6px solid transparent;border-bottom: 6px solid transparent;border-right: 6px solid transparent;border-top: 6px solid #F78E1E;'></span></li>";
                        str1 += "<ul class='secondLevel' style='height: 33px;background: #fff;'><li>" + secondLevelobj[j]["broughtForward"] + "</li><li>" + secondLevelobj[j]["intraday"] + "</li>";
                        var action = secondLevelobj[j]["netPositionList"];

                        if (action.length == 0) {
                            str1 += "<li>" + secondLevelobj[j]["net"] + "</li><li>-</li><li>-</li><li>-</li><li>-</li></ul>";
                        } else {
                            str1 += "<li>" + secondLevelobj[j]["net"] + "</li><li>" + secondLevelobj[j]["netPositionList"][0]["action"] + "</li><li>-</li><li>-</li><li>-</li></ul>";
                            var Threeobj = secondLevelobj[j]["netPositionList"];
                
                            for (var s = 0; s < Threeobj.length; s++) {
                                str += WatchlistOrderStatusLeft(m, typeIcon, Threeobj[s]["name"]);
                                str1 += "<ul><li>-</li><li>-</li><li>-</li><li>" + Threeobj[s]["action"] + "</li><li>" + Threeobj[s]["quantity"] + "</li>";
                                str1 += "<li>" + Threeobj[s]["price"] + "</li><li>" + Threeobj[s]["transactionTime"] + "</li></ul>";
                            }
                        }


                    }
                }
            }


        }

        Datetime = new Date(); 
        String = Datetime.toString();
        arry = String.split(" ");
        $("#PositionS-bottom").append("<p>Last Updated: " + arry[2] + "-" + arry[1] + "-" + arry[3] + " " + arry[4] + "AM</p>")
        PositionLeft.append(str);
        PositionSContent.append(str1);
        var Portfoliocontentul = $("#PositionS-content-details ul");
            Portfoliocontentul.width("1110px");
            documentScroll(3);
            $("#Portfolio-Detail").show();
        var l = PositionLeft.height();
        var c = PositionSContent.height();
       
        PositionLeft.height(((l + 53 * 3) + 60) + "px");
        PositionSContent.height(((l + 52 * 3) + 61) + "px");
        $("#loading").hide();
    }

    function CFDTitleName(type) {
        var TitleNameTop = $(".PortfolioDetail-top .information-name-top_div"); 
        var TitleNamename = $(".PortfolioDetail-top .top_div-name");
        var Portfoliotitlefirst = $(".Portfolio-Detail-content-top a:first-child");
        var Portfoliotitlelast = $(".Portfolio-Detail-content-top a:last-child");
        var m = 988, l = 1252, s = 1130, t = 1390;
        var str = "<li>Name</li><li>Unrealized PL</li><li>Quantity</li><li>Market value</li><li>Average cost price</li>";
        str += "<li>Close price</li><li>Trade currency</li><li>Suspended quantity</li><li>Total cost</li>";

        var str1 = "<li>Name</li><li>Unrealized P/L</li><li>Quantity</li><li>Rollover Price</li><li>Entry Price</li>";
        str1 += "<li> Mark to Market</li><li>Currency</li>";//<li>market</li><li>exchange</li>

        var str2 = "<li>Name</li><li>Brought Forward</li><li>Intraday</li><li>Net</li><li>Action</li>";
        str2 += "<li>Quantity</li><li>Price</li><li>Time</li>";

        var str3 = "<li>Name</li><li>Unrealized P/L</li><li>Units</li><li>Ind.NAV</li><li>Average Price</li>";
        str3 += "<li>Currency</li><li>Cost</li><li>Market Value</li><li>PSPL Fund Code</li><li>ISIN Code</li>";

        TitleNamename.empty();

        if (type == 1) {
            //CFD
            Portfoliotitlefirst.text("Account Summary");
            Portfoliotitlelast.text("Positions");
            Portfoliotitlelast.css("padding", "1rem 3rem 1rem 2rem");
            TitleNamename.append(str1);
            TitleNameTop.width(m + "px");
        } else if (type == 2) {
            //ST
            Portfoliotitlefirst.text("Account Detail");
            Portfoliotitlelast.text("Holdings");
            Portfoliotitlelast.css("padding", "1rem 3rem 1rem 2rem");
            TitleNamename.append(str);
            TitleNameTop.width(l + "px");
        } else if (type == 3) {
            //FXFT
            Portfoliotitlefirst.text("Account Detail");
            Portfoliotitlelast.text("Positions");
            Portfoliotitlelast.css("padding", "1rem 3rem 1rem 2rem");
            TitleNamename.append(str2);
            TitleNameTop.width(s + "px");
        }
        else
        {
            //UT
            Portfoliotitlefirst.text("Account Detail");
            Portfoliotitlelast.text("Holdings");
            Portfoliotitlelast.css("padding", "1rem 3rem 1rem 2rem");
            TitleNamename.append(str3);
            TitleNameTop.width(t + "px");
        }
    }

    FontColor = (string,type) => {

        if (type == 1)
        {
            for (let i = 0; i < string.length; i++)
            {
                if ($(string[i]).text() == "-")
                    $(string[i]).css("color", "#979797");
            }
        }
        else
        {
            if (string.indexOf("-") == 0)
              return    Color = "#FE8366";
            else
              return    Color = "#7BCD48";
        }

    }
    //-->

    //<--Position start
    $("#Position").click(function () {
        scrollingX = true;
        localStorage.page = "5";
        resetClass();
        $("#tabPosition").attr("class", "view tab view-position active");
        $("#loading").show();
        $("#Position-top-title").empty();
        var accountNo = localStorage.accountNo;
        $("#Position-top-title").append("Outstanding Positions <span>" + accountNo + "-EQ/UT</span>");
        $.get(rootpath + "OsPosition/OsPosition", function (d) {
            var o = JSON.parse(d);
            if (o["code"] == 1) {
                PositionAnalyticalData(o["lastUpdated"], o["osposition"], o["disclaimers"], o["needDisclaimer"]);
            }
            else {
                ShowAlert(o["msg"]);
            }
            $("#loading").hide();
        });
    });

    //PositionAnalyticalData
    function PositionAnalyticalData(String, obj, String1, needDisclaimer) {
        if (needDisclaimer) {
            //String and String1 data
            var Stringobj = {};
            Stringobj.lastUpdated = String;
            Stringobj.disclaimers = String1;
            PositionCoreDataUI(Stringobj);
        }
        if (obj == null)
            return;
        //obj integration
        var arry = [];
        for (var s = 0; s < obj.length; s++) {
            var groupHeader = obj[s].groupHeader;
            groupHeader = groupHeader.substring(0, groupHeader.indexOf("-"));
            arry[s] = groupHeader;
        }
        arry.sort();
        $(".Position-content-content").empty();

        for (var i = 0; i < arry.length; i++) {
            for (var j = 0; j < obj.length; j++) {
                var groupHeader = obj[j].groupHeader
                groupHeader = groupHeader.substring(0, groupHeader.indexOf("-"));
                if (groupHeader == arry[i]) {
                    $(".Position-content-content").append("<div class='Position-content-select'><div class='Position-content-select-top'></div><div class='Position-content-select-bottom'></div></div>");
                    PositionSubsidiaryDataUI(obj[j], i);
                }
            }
        }
        $(".Position-content-content").append("<div class='Position-select-box'></div>");
        $("#loading").hide();
    }

    function PositionSubsidiaryDataUI(obj,flg) {
        var PositionSelect = $(".Position-content-select").eq(flg);
        var PositionSelecttop = $(".Position-content-select .Position-content-select-top").eq(flg);
        var PositionSelecbottom = $(".Position-content-select .Position-content-select-bottom").eq(flg);
        PositionSelecttop.empty();
        PositionSelecbottom.empty();

        var str = "";
        var height = 42;
        for (var i = 0; i < obj["list"].length; i++) {
            //productIcon; name; amountDueBase; amountDueColor;currency
            var iddata = obj["list"][i]["id"];
            var Color = tone(obj["list"][i]["productIcon"]);

            str += "<ul counterid='" + obj["list"][i]["counterID"] + "' name='" + obj["list"][i]["name"] + "' detailURI='" + obj["list"][i]["detailURI"] + "' productIcon=" + obj["list"][i]["productIcon"] + " id='" + iddata + "' ><li><a style='background:" + Color + "'>" + obj["list"][i]["productIcon"] + "</a><div>" + obj["list"][i]["name"] + "</div></li>";
            str += "<li style='color:" + obj["list"][i]["amountDueColor"] + "'>" + obj["list"][i]["amountDue"] + " " + obj["list"][i]["currency"] + "</li></ul>";
            ht = height * i + height;
        }

        str += "<p>Class sun(SGD):<span style='color:" + obj["groupSummaryColor"] + "'>" + obj["groupSummary"] + "</span></p>";
        PositionSelecbottom.append(str);
        PositionSelecttop.append("Due : " + obj["groupHeader"] + "<span></span>");
        PositionSelecbottom.height((ht + height) + "px");

        spanClick(flg);
        PositionsDetail();
    }

    function spanClick(type) {
        var sclect = $(".Position-content-select-top:eq(" + type + ")");
        var disbottom = $(".Position-content-select-bottom:eq(" + type + ")");
        var s = 0;
        sclect.unbind("click");
        sclect.on("click", function () {
            if (s%2==0) {
                disbottom.hide();
                $(this).find("span").css("borderBottom", "10px solid #434446");
                $(this).find("span").css("borderTop", "10px solid transparent");
                $(this).find("span").css("top", "0px");
            } else {
                disbottom.show();
                $(this).find("span").css("borderBottom", "10px solid transparent");
                $(this).find("span").css("borderTop", "10px solid #434446");
                $(this).find("span").css("top", "10px");
            }
            s++;
        });
    }

    function PositionCoreDataUI(obj) {
        var PositionBottom = $("#Position-bottom");
        PositionBottom.empty();

        PositionBottom.append("<p><span>Last Updated: " + obj["lastUpdated"] + "</span><span id='Position-Disclaimer'>Disclaimer</span></p>");

        $("#Position-show-Disclaimer .Disclaimer-content").text("");
        OsPositionDisclaimer($("#Position-show-Disclaimer .Disclaimer-content"), obj["disclaimers"]);
        $("#Position-Disclaimer").unbind("click");
        $("#Position-Disclaimer").click(function () {            
            $("#Position-show-Disclaimer").show();
        });
        $("#Position-hide-Disclaimer").click(function () {
            localStorage.PositionsDisclaimer = "true";
            $("#Position-show-Disclaimer").hide();
        });
        if (localStorage.PositionsDisclaimer == "false") {
            $("#Position-show-Disclaimer").show();
        }
    }

    function OsPositionDisclaimer(Ele, obj) {
        var arry = obj, str = "<div style='width: 100%;height: 3.5rem;'></div>";
        Ele.empty();
        for (var i = 0; i < arry.length; i++) {
            str += "" + arry[i] + " <br style='height:1rem'>";
        }
        Ele.append(str); 
    }

    function PositionsDetail() {
        var obj = $(".Position-content-select-bottom ul");
        for (var i = 0; i < obj.length; i++) {
            obj[i].onclick = function () {
                $("#loading").show();
                var AttributesMap = this.attributes;
                var id = AttributesMap.id.value;
                var counterid = AttributesMap.counterid.value;
                var type = localStorage.accountType;
                var productIcon = AttributesMap.productIcon.value;
                var detailURI = AttributesMap.detailURI.value;
                var name = AttributesMap.name.value;

                if (productIcon == "EQ") {
                    if (detailURI == "/st/osposition/contract") {
                        $.post(rootpath + "OsPosition/OsPositionStockDetailContract", "accountType=" + type + "&id=" + id, function (d) {
                            var o = JSON.parse(d);
                            if (o["code"] == 1) {
                                PositionsDetailData(productIcon, name, o);
                                DetailForm(counterid, $("#tabPosition .Modular-Detail .Detailtitle-bottom-left"), $("#tabPosition .Modular-Detail .Detailtitle-bottom-right"));
                                return;
                            } else {
                                $("#loading").hide();
                                ShowAlert(o["msg"]);
                                return;
                            }
                        });
                    } else {
                        $.post(rootpath + "OsPosition/OsPositionStockDetailContra", "accountType=" + type + "&id=" + id, function (d) {
                            var o = JSON.parse(d);
                            if (o["code"] == 1) {
                                PositionsDetailData(productIcon, name, o);
                                DetailForm(counterid, $("#tabPosition .Modular-Detail .Detailtitle-bottom-left"), $("#tabPosition .Modular-Detail .Detailtitle-bottom-right"));
                                return;
                            } else {
                                $("#loading").hide();
                                ShowAlert(o["msg"]);
                                return;
                            }
                        });
                    }
                } else {
                    if (detailURI == "/ut/osposition/fromyou") {
                        $.post(rootpath + "OsPosition/OsPositionUtDetailFromyou", "accountType=" + type + "&id=" + id, function (d) {
                            var o = JSON.parse(d);
                            if (o["code"] == 1) {
                                PositionsDetailData(productIcon, name, o);
                                SubscribeDataUT(1, counterid, $("#tabPosition .Modular-Detail .Detailtitle-bottom-left"), $("#tabPosition .Modular-Detail .Detailtitle-bottom-right"));
                                return;
                            } else {
                                $("#loading").hide();
                                ShowAlert(o["msg"]);
                                return;
                            }
                        });
                    } else {
                        $.post(rootpath + "OsPosition/OsPositionUtDetailToyou", "accountType=" + type + "&id=" + id, function (d) {
                            var o = JSON.parse(d);
                            if (o["code"] == 1) {
                                PositionsDetailData(productIcon, name, o);
                                SubscribeDataUT(1, counterid, $("#tabPosition .Modular-Detail .Detailtitle-bottom-left"), $("#tabPosition .Modular-Detail .Detailtitle-bottom-right"));
                                return;
                            } else {
                                $("#loading").hide();
                                ShowAlert(o["msg"]);
                                return;
                            }
                        });
                    }
                }
            }
        }
    }

    function PositionsDetailData(productIcon, name, obj) {
        var contracts = obj["contracts"];
        var newobj = {};

        if (productIcon == "EQ") {
            if (obj["contractNo"] != null || obj["contraNo"] != null) {//data cannot empty!
                if (contracts != undefined && contracts != null) {
                    //002
                    PositionsClassTwo(productIcon, name, obj);
                } else {
                    newobj["Contract No"] = obj["contractNo"];
                    newobj["Contract Date"] = obj["contractDate"];
                    newobj["Due Date"] = obj["dueDate"];
                    newobj["Price"] = obj["price"];
                    newobj["Quantity"] = obj["quantity"];
                    newobj["Settlement AmountColor"] = obj["settlementAmountColor"];
                    newobj["Settlement Amount"] = obj["settlementAmount"] + " " + obj["currency"];
                    newobj["Payment Mode"] = obj["paymentMode"];
                    newobj["Exchange Rate"] = obj["exchangeRate"];

                    PositionsClassOne(productIcon, name, newobj);
                    //001
                }
            } else {
                if (contracts != undefined && contracts != null) {
                    //002
                    PositionsClassTwo(productIcon, name, obj);
                } else {
                    //001
                    newobj["Settlement AmountColor"] = "#333";
                    newobj["Contract No"] = "-";
                    newobj["Contract Date"] = "-";
                    newobj["Due Date"] = "-";
                    newobj["Price"] = "-";
                    newobj["Quantity"] = "-";
                    newobj["Settlement Amount"] = "-";
                    newobj["Payment Mode"] = "-";
                    newobj["Exchange Rate"] = "-";

                    PositionsClassOne(productIcon, name, newobj);
                }
            }
        }
        else
        {
            let Newobj = Arry_data(obj);

            for (i in Newobj)
            {
                if (i !== "msg" && i !== "code" && i !== "counterID" && i !== "fundName")
                {
                    var name = i.replace(/(?!^)([A-Z]+)/g," $1").replace(/^[a-z]/, n => n.toUpperCase())
                    newobj[name] = Newobj[i];
                }
            }
            PositionsClassOne(productIcon, name, newobj);
        }

        $(".Modular-Detail").show();
    }

    function PositionsClassTwoTOP(obj) {

        var strs = "", newobj = {}, Payment_Due_Color;

        let Newobj = Arry_data(obj);

        for (i in Newobj)
        {
            if (i !== "msg" && i !== "code" && i !== "counterID" && i !== "contracts" && i !== "paymentDueColor")
            {
                var name = i.replace(/(?!^)([A-Z]+)/g, " $1").replace(/^[a-z]/, n => n.toUpperCase())
                newobj[name] = Newobj[i];
            }
            if (i == "paymentDueColor") {
                Payment_Due_Color = Newobj[i]
                delete Newobj[i];
            }
        }

        let Payment_Due = newobj["Payment Due"];
        for (var i in newobj)
        {
            if (i == "Payment Due")
            {
                var name = i;
            }
            else
            {
                if (i == "Currency")
                {
                    strs += "<ul><li style='color:" + Payment_Due_Color + "'>" + Payment_Due + " " + newobj[i] + "</li><li>" + name + "</li></ul>";
                }
                else {
                    strs += "<ul><li>" + newobj[i] + "</li><li>" + i + "</li></ul>";
                }
            }
        }
        return strs;
    }

    function PositionsClassTwo(productIcon, name, obj) {
        var strs = "", m = 0;
        var OutstandingPositionscontentdiv = $("#OutstandingPositions-Detail-content .Detail-content-top");
        var OutstandingPositionstitle = $("#OutstandingPositions-top-title");
        OutstandingPositionscontentdiv.empty();
        OutstandingPositionstitle.empty();
        OutstandingPositionscontentdiv.height("auto");

        if (obj["contracts"].length == 0 && obj["contracts"] == null) {
            strs += "<div class='no-data'>没数据.</div>";
        } else {
            var strs = PositionsClassTwoTOP(obj);
            obj = obj["contracts"];
            H = 19.2;
            for (var i = 0; i < obj.length;i++) {
                strs += "<ul class='OutstandingPositions-content-down-top'>";
                    strs +="<li>" + obj[i]["contractNo"] + "(" + obj[i]["action"] + ")</li><li>Contract No</li>";
                strs += "<span></span></ul>";
                strs += "<div class='OutstandingPositions-content-down-bottom' style='display:none'>";
                    strs += "<ul><li>" + obj[i]["contractDate"] + "</li><li>Contract Date</li></ul>";
                    strs += "<ul><li>" + obj[i]["particulars"] + "</li><li>Details</li></ul>";
                    strs += "<ul><li style='color:" + obj[i]["amountColor"] + "'>" + obj[i]["amount"] + "</li><li>Amount</li></ul>";
                strs += "</div>";
                OutstandingPositionscontentdiv.append(strs);
                strs = "";
                l = 12 * i;
                OpositionspanClick(i);
            }
            Hl = H + l;
        }
        strs += "<div style='height:120px'></div>";
        //$(".OutstandingPositions-Detail-content .Detail-content-top").css("height", Hl + "rem");
        var OutstandingPositions = "<ul>" + WatchlistOrderStatusLeft(obj, productIcon, name) + "</ul>";
        OutstandingPositionstitle.append(OutstandingPositions);
        OutstandingPositionscontentdiv.append(strs);
        if (name.length > 22) {
            OutstandingPositionscontentdiv.css({ "fontSize": "12px", "lineHeight": "20px" });
        } else {
            OutstandingPositionscontentdiv.css({ "fontSize": "14px", "lineHeight": "34px" });
        }
    }

    function OpositionspanClick(type) {
        var sclect = $(".OutstandingPositions-content-down-top:eq(" + type + ")");
        var disbottom = sclect.next();;
        var s = 0;
        sclect.unbind("click");
        sclect.on("click", function () {
            if (s % 2 == 0) {
                disbottom.show();
                $(this).find("span").css({ "top": "16px", "left": "6px", "borderTop": "8px solid #333", "borderBottom": "8px solid transparent" });
            } else {
                disbottom.hide();
                $(this).find("span").css({ "top": "8px", "left": "6px", "borderTop": "8px solid transparent", "borderBottom": "8px solid #333" });
            }
            s++;
        });
    }

    function PositionsClassOne(productIcon, name, newobj) {
        var str = "";
        $("#OutstandingPositions-Detail-content .Detail-content-top").empty();
        $("#OutstandingPositions-top-title").empty();
        $("#OutstandingPositions-Detail-content .Detail-content-top").height("auto");

        for (var i in newobj)
        {
            if (i == "Settlement AmountColor")
            {
                    var color = newobj[i];
            }
            else
            {
                if (i == "Settlement Amount") {
                    str += "<ul><li style='color:" + color + "'>" + newobj[i] + "</li><li>" + i + "</li></ul>";
                } else {
                    str += "<ul><li>" + newobj[i] + "</li><li>" + i + "</li></ul>";
                }
            }
        }
        var OutstandingPositions = "<ul>" + WatchlistOrderStatusLeft(newobj, productIcon, name) + "</ul>";
        $("#OutstandingPositions-top-title").append(OutstandingPositions);
        $("#OutstandingPositions-Detail-content .Detail-content-top").append(str);
        $("#OutstandingPositions-Detail-content .Detail-content-top").append("<div style='height:118px;'></div>");
        //$("#OutstandingPositions-Detail-content .Detail-content-top").height("25.6rem");
        if (name.length > 22) {
            $("#OutstandingPositions-top-title div").css({ "fontSize": "12px", "lineHeight": "20px" });
        } else {
            $("#OutstandingPositions-top-title div").css({ "fontSize": "14px", "lineHeight": "34px" });
        }
    }

    //Trade start
    $("#Trade-Search").keyup(function () {
        $("#history-Trade-ContractSearch").hide();
        //keyupinput($(this), $("#Trade-content .ContractSearch select"),1);
        if (timerSearch) {
            clearTimeout(timerSearch);
            timerSearch = null;
        }
        timerSearch = setTimeout(function () {
            var type = 1;
            var strs = $("#Trade-Search").val();
            var productFlag = $("#Trade-content .ContractSearch select").val();

            var keyword = strs;
            fucTimerSearch(keyword, productFlag, type);
        }
    , 500);
    });

    function TradeSearchDataUI(obj) {

        var Html = "", str, s, hieg = 45;
        $("#Trade-search-list").show();
        $("#Trade-search-list ul").empty();

        for (var i = 0; i < obj.length; i++) {
            str = WatchlistOrderStatusLeft(obj, obj[i]["productIcon"], obj[i]["name"], s, 1);
            if (obj[i]["exchange"] == undefined) {
                Html += str + "<br name='" + obj[i]["name"] + "' counterId='" + obj[i]["counterID"] + "' symbol='" + obj[i]["symbol"] + "' product='" + obj[i]["product"] + "' exchange='" + obj[i]["exchange"] + "' producticon='" + obj[i]["productIcon"] + "'/><div><span>" + obj[i]["code"] + "</span></div></li>";
            } else {
                Html += str + "<br name='" + obj[i]["name"] + "' counterId='" + obj[i]["counterID"] + "' symbol='" + obj[i]["symbol"] + "' product='" + obj[i]["product"] + "' exchange='" + obj[i]["exchange"] + "' producticon='" + obj[i]["productIcon"] + "'/><div>" + obj[i]["exchange"] + ":<span>" + obj[i]["code"] + "</span></div></li>";
            }
            m++;
        }
        hl = hieg * m + hieg; m = 0;
        $("#Trade-search-list ul").append(Html);
        $("#Trade-search-list ul").height((hl + (hieg+(hieg/2)+8)) + "px");
        $("#Trade-search-list").css("top", "120px");
        $("#Trade-ContractSearch").show();

        $("#Trade-search-list ul li").click(function () {
            $("#loading").show();
            var Attributes = $(this).find("br");
            storageFunction(Attributes);
        });
    }

    function storageFunction(Attributes) {
            var arry = {};

            arry["counterid"] = Attributes[0].attributes.counterid.value;
            arry["name"] = Attributes[0].attributes.name.value;
            arry["symbol"] = Attributes[0].attributes.symbol.value;
            arry["product"] = Attributes[0].attributes.product.value;
            arry["exchange"] = Attributes[0].attributes.exchange.value;
            arry["producticon"] = Attributes[0].attributes.producticon.value;
            FilterArray(arry);
            TradeClick(Attributes[0]);
            $("#history-search-list ul").empty();
            var Arrys, str = localStorage.TradeHistorys;
            if (str != undefined) {
                Arrys = str.split(";");
                Arrys.pop();
                SearchHistoryUI(Arrys);
            } else {
                $("#loading").hide();
                return;
            }
    }

    function FilterArray(obj) {
        var counterid, r = 0;
        var Arry1, str = localStorage.TradeHistorys, arry1 = [], str1 = "", strs="";
        //构造字符串
        strs += "counterid=" + obj["counterid"] + ",exchange=" + obj["exchange"] + ",name=" + obj["name"] + ",product=" + obj["product"] + ",producticon=" + obj["producticon"] + ",symbol=" + obj["symbol"] + ";";
        if (str != undefined) {
            //删除重复
            str = str.replace(strs, "");
            var str3=strs + str;
            var arr = str3.split(";");
            arr.pop();
            //长度if
            if (arr.length > 10) {
                var str1 = str3.substring(0, str3.lastIndexOf(";"));
                var newstr = str1.substring(0, str1.lastIndexOf(";"));
                localStorage.TradeHistorys = newstr + ";";
            } else {
                localStorage.TradeHistorys = str3;
            }
        } else {
            localStorage.TradeHistorys = strs;
        }
    }

    $("#Trade-content .ContractSearch select").change(function () {
        //SelectSearchClass($("#Trade-Search"),$(this),1);
        if (timerSearch) {
            clearTimeout(timerSearch);
            timerSearch = null;
        }
        timerSearch = setTimeout(function () {
            var type = 1;
            var strs = $("#Trade-Search").val();
            var productFlag = $("#Trade-content .ContractSearch select").val();

            var keyword = strs;
            fucTimerSearch(keyword, productFlag, type);
        }
    , 500);
    });
    
    $("#Trades").click(function () {
        scrollingX = true;
        localStorage.page = "2";
        resetClass();
        $("#tabTrade").attr("class", "view tab view-trade active");
        $("#history-search-list ul").empty();
        clears();
        var Arrys, str = localStorage.TradeHistorys;
        if (str != undefined) {
            Arrys = str.split(";");
            Arrys.pop();
            SearchHistoryUI(Arrys);
        } else {
            $("#loading").hide();
            return;
        }

    });

    function SearchHistoryUI(arry) {

        var arry1 = [], Html = "", s, hieg = 45;

        for (var i = 0; i < arry.length; i++) {
            newarry = arry[i].split(",");
            var newobj = {};
            for (var j = 0; j < newarry.length; j++) {
                
                minarry = newarry[j].split("=");
                newobj[minarry[0]] = minarry[1];
            }
            arry1[i] = newobj;
        }

        for (var r = 0; r < arry1.length; r++) {
            str = WatchlistOrderStatusLeft(arry1, arry1[r]["producticon"], arry1[r]["name"], s, 1);
            Html += str + "<br name='" + arry1[r]["name"] + "' counterId='" + arry1[r]["counterid"] + "' symbol='" + arry1[r]["symbol"] + "' ";
            Html += "product='" + arry1[r]["product"] + "' exchange='" + arry1[r]["exchange"] + "' producticon='" + arry1[r]["producticon"] + "'/>";
            Html +="<div>" + arry1[r]["exchange"] + ":<span>" + arry1[r]["symbol"] + "</span></div></li>";
            m++;
        }
        hl = hieg * m + hieg; m = 0;
        $("#history-search-list ul").append(Html);
        $("#history-search-list ul").height(hl + (hieg + (hieg  + 11)) + "px");
        $("#history-search-list ul li").unbind("click");
        $("#history-search-list ul li").click(function () {
            $("#loading").show();
            var Attributes = $(this).find("br");
            storageFunction(Attributes);
            
        });
    }

    function clears() {
        $("#Trade-content .clear").hide();
        $("#loading").hide();
        $("#Trade-Search").val("");
        $("#Trade-search-list").css("top", "148px");
        $("#Trade-content .Contract-title").css("top", "118px");
        $("#Trade-content .Contract-title").show();
        $("#Trade-ContractSearch").hide();
        $("#history-Trade-ContractSearch").show();
    }
    $("#Trade-content .clear").click(function () {
        clears();
        $("#Trades").click();
    });
    //Trade over

    $("#hide-Portfolio-Detail").click(function () {
        $("#Portfolio-Detail").hide();
    });
    $(".Trade-exit").click(function () {
        $("#ST-Trade").hide();
        $("#CFD-Trade").hide();
        $("#FTFXFXMN-Trade").hide();
        $("#UT-Trade").hide();
    });
    $(".trade_Info_exit").click(function () {
        $("#trade_UT_INfo").hide();
    });
    $("#Watchlist-Edit-details .Watchlist-Edit-exit").click(function () {
        $("#Watchlist-Edit-details").hide();
        var id = $("#Watchlist-title-Text").attr("thisid");
        WatchlistNameDetailData(id);
    });
    $("#Edit").click(function () {
        $("#Watchlist-Edit-details .OrderStatus-Detail-content li:nth-child(even) input").change(function () {
            var checked = $(this)[0].checked;
            var name = $(this).attr("name");
            var counterid = $(this).attr("counterid");
            if (checked == true) {
                checkbox[name] = counterid;
            } else {
                delete  checkbox[name];
            }
        });
        $("#Watchlist-Edit-details").show();
    });
    $("#tabOrdStats .Modular-Detail-exit").click(function () {
        $("#OrderStatus").click();
    });
    $(".Modular-Detail-exit").click(function () {
        $(".Modular-Detail").hide();
    });

    $("#Subrefresh").click(function () {
        $("#loading").show();
        scrollingX = false;
        startPMP();
        $("#loading").hide();
    });

    function canvaS(obj) {

        var ST = "0", CFD = "0", FTFXFXMNT = "0", UT = "0";
        for (var i = 0; i < obj.length; i++) {
            if (obj[i]["type"] == "ST") {
                ST = obj[i]["balance"];
            } else if (obj[i]["type"] == "CFD") {
                CFD = obj[i]["balance"];
            }else if(obj[i]["type"] == "FT"){
                FTFXFXMNT = obj[i]["balance"];
            } else if (obj[i]["type"] == "UT") {
                UT = obj[i]["balance"];
            }
        }

        var ST = parseFloat(ST.replace(/,/g, ""));
        var CFD = parseFloat(CFD.replace(/,/g, ""));
        var FTFXFXMNT = parseFloat(FTFXFXMNT.replace(/,/g, ""));
        var UT = parseFloat(UT.replace(/,/g, ""));
        var Sum = ST + CFD + FTFXFXMNT + UT;

        var STLine = parseFloat((ST / Sum).toFixed(2)) * 2;
        var CFDLine = parseFloat((CFD / Sum).toFixed(2)) * 2;
        var FTFXFXMNLine = parseFloat((FTFXFXMNT / Sum).toFixed(2)) * 2;
        var UTLine = parseFloat((UT / Sum).toFixed(2)) * 2;
        var arry = new Array(STLine, CFDLine, FTFXFXMNLine, UTLine);

        var canvas = document.getElementById('canvas');
        var cancont = canvas.getContext("2d");
        for (var j = 0; j < obj.length; j++) {
            if (obj[j]["type"] == "ST") {
                $(".Portfolio-content-top .product-div li:eq(" + j + ") div").text(parseFloat((ST / Sum).toFixed(4)) * 100 + "%");
            } else if (obj[j]["type"] == "CFD") {
                $(".Portfolio-content-top .product-div li:eq(" + j + ") div").text(parseFloat((CFD / Sum).toFixed(4)) * 100 + "%");
            } else if (obj[j]["type"] == "FT") {
                $(".Portfolio-content-top .product-div li:eq(" + j + ") div").text(parseFloat((FTFXFXMNT / Sum).toFixed(4)) * 100 + "%");
            } else if (obj[j]["type"] == "UT") {
                $(".Portfolio-content-top .product-div li:eq(" + j + ") div").text(parseFloat((UT / Sum).toFixed(4)) * 100 + "%");
            }
        }

        cancont.beginPath();
        cancont.lineWidth = 36;
        cancont.strokeStyle = "#085394";
        cancont.arc(90, 75, 50, 0, STLine * Math.PI);//50%
        cancont.stroke();

        cancont.beginPath();
        cancont.lineWidth = 36;
        cancont.strokeStyle = "#009900";
        cancont.arc(90, 75, 50, STLine * Math.PI, (CFDLine + STLine) * Math.PI);//20%
        cancont.stroke();

        cancont.beginPath();
        cancont.lineWidth = 36;
        cancont.strokeStyle = "#F1C232";
        cancont.arc(90, 75, 50, (CFDLine + STLine) * Math.PI, (FTFXFXMNLine + CFDLine + STLine) * Math.PI);//20%
        cancont.stroke();

        cancont.beginPath();
        cancont.lineWidth = 36;
        cancont.strokeStyle = "#6fa8dc";
        cancont.arc(90, 75, 50, (FTFXFXMNLine + CFDLine + STLine) * Math.PI, (UTLine + FTFXFXMNLine + CFDLine + STLine) * Math.PI);//20%
        cancont.stroke();
    }
    //product Screening
    function productScreening(type, str) {
        if (type == 1) {
            switch (str) {
                case "ST":
                    return "StockOrderDetail";
                    break;
                case "FT":
                    return "FtFxFxmnOrderDetail";
                    break;
                case "UT":
                    return "UtOrderDetail";
                    break;
                case "FXMN":
                    return "FtFxFxmnOrderDetail";
                    break;
                case "FX":
                    return "FtFxFxmnOrderDetail";
                    break;
                case "CFD":
                    return "CfdOrderDetail";
                    break;
                case "CFDDMA":
                    return "CfdOrderDetail";
                    break;
            }
        } else if (type == 2) {
            switch (str) {
                case "ST":
                    return "StockWithdrawOrder";
                    break;
                case "FT":
                    return "FtFxFxmnWithdrawOrder";
                    break;
                case "UT":
                    return "UtWithdrawOrder";
                    break;
                case "FXMN":
                    return "FtFxFxmnWithdrawOrder";
                    break;
                case "FX":
                    return "FtFxFxmnWithdrawOrder";
                    break;
                case "CFD":
                    return "CfdWithdrawOrder";
                    break;
                case "CFDDMA":
                    return "CfdWithdrawOrder";
                    break;
            }
        } else {
            switch (str) {
                case "ST":
                    return "StockAmendOrder";
                    break;
                case "FT":
                    return "FxFxmnAmendOrder";
                    break;
                case "UT":
                    return "";
                    break;
                case "FXMN":
                    return "FxFxmnAmendOrder";
                    break;
                case "FX":
                    return "FxFxmnAmendOrder";
                    break;
                case "CFD":
                    return "";
                    break;
                case "CFDDMA":
                    return "";
                    break;
            }
        }

    }
    //product Screening
    function WatchlistformAPI(type, str) {
        if (type == 1) {
            switch (str) {
                case "ST":
                    return "Trade/StockTradeInfo";//?counterId=
                    break;
                case "FT":
                    return "Trade/FtFxFxmnTradeInfo";//?counterId=
                    break;
                case "UT":
                    return "Trade/UtTradeInfo";//?counterId=
                    break;
                case "FXMN":
                    return "Trade/FtFxFxmnTradeInfo";//?counterId=
                    break;
                case "FX":
                    return "Trade/FtFxFxmnTradeInfo";//?counterId=
                    break;
                case "CFD":
                    return "Trade/CfdTradeInfo";//?counterId=
                    break;
                case "CFDDMA":
                    return "Trade/CfdTradeInfo";//?counterId=
                    break;
            }
        } else if (type == 2) {
            switch (str) {
                case "ST":
                    return "Trade/StocksOrderTypeSettings";//?
                    break;
                case "FT":
                    return "";
                    break;
                case "UT":
                    return "";
                    break;
                case "FXMN":
                    return "";
                    break;
                case "FX":
                    return "";
                    break;
                case "CFD":
                    return "";
                    break;
                case "CFDDMA":
                    return "";
                    break;
            }
        } else if (type == 3) {
            switch (str) {
                case "ST":
                    return "Trade/StocksRefreshLimitBalance";//?
                    break;
                case "FT":
                    return "";
                    break;
                case "UT":
                    return "";
                    break;
                case "FXMN":
                    return "";
                    break;
                case "FX":
                    return "";
                    break;
                case "CFD":
                    return "Trade/CfdRefreshLimitBalance";//?
                    break;
                case "CFDDMA":
                    return "Trade/CfdRefreshLimitBalance";//?
                    break;
            }
        } else if (type == 4) {
            switch (str) {
                case "ST":
                    return "Trade/StocksValidateOrder";//?
                    break;
                case "FT":
                    return "Trade/FtFxFxmnValidateOrder";//?
                    break;
                case "UT":
                    return "Trade/UtValidateOrder";//?
                    break;
                case "FXMN":
                    return "Trade/FtFxFxmnValidateOrder";//?
                    break;
                case "FX":
                    return "Trade/FtFxFxmnValidateOrder";//?
                    break;
                case "CFD":
                    return "Trade/CFDValidateOrder";//?
                    break;
                case "CFDDMA":
                    return "Trade/CFDValidateOrder";//?
                    break;
            }
        } else {
            switch (str) {
                case "ST":
                    return "Trade/StocksSubmitOrder";//?
                    break;
                case "FT":
                    return "Trade/FtFxFxmnSubmitOrder";//?
                    break;
                case "UT":
                    return "Trade/UtSubmitOrder";//?
                    break;
                case "FXMN":
                    return "Trade/FtFxFxmnSubmitOrder";//?
                    break;
                case "FX":
                    return "Trade/FtFxFxmnSubmitOrder";//?
                    break;
                case "CFD":
                    return "Trade/CfdSubmitOrder";//?
                    break;
                case "CFDDMA":
                    return "Trade/CfdSubmitOrder";//?
                    break;
            }
        }

    }
    //call Watchlist
    function acquirePage(page) {
        if (page == undefined || page == "" || page == "1")
            $("#Watchlist").click();
        else if (page == "2")
            $("#Trades").click();
        else if (page == "3")
            $("#OrderStatus").click();
        else if (page == "4")
            $("#Portfolio").click();
        else if (page == "5")
            $("#Position").click();
    }

    function resetClass() {
        var parent = $(".views>div");
        for (var i = 0; i < parent.length; i++) {
            var Class = $(parent[i]).attr("class");
            newClass = Class.substr(Class.lastIndexOf(" "), Class.length);
            newClass2 = Class.substr(0, Class.lastIndexOf(" "));
            if (newClass == " active") {
                $(parent[i]).removeAttr("class");
                $(parent[i]).attr("class", newClass2);
            }
        }
    }
    //Color Picker
    function tone(productIcon) {
        switch (productIcon) {
            case "EQ":
                return "#085394";
                break;
            case "FUT":
                return "#F1C232";
                break; 
            case "UT":
                return "#6FA8DC";
                break;
            case "REGFX":
                return "#990000";
                break;
            case "MiniFX":
                return "#f78a02";
                break;
            case "FUT/FX":
                return "#F1C232";
                break;
            case "CFD":
                return "green";
                break;
            case "CFDDMA":
                return "#274E13";
                break;
        }
    }
    //get current time Conduct assignment
    function data(type) {
        var datatime = new Date();
        var y = datatime.getFullYear();
        var m = datatime.getMonth() + 1;
        var d = datatime.getDate();
        var newm = m.toString();
        var newd = d.toString();
        if (newm.length == 1) {
            newm = "0" + newm;
        }
        if (newd.length == 1) {
            newd = "0" + newd;
        }
        if (type==undefined) {
            return Stringvalue = y + "-" + newm + "-" + newd;
        } else {
            Stringvalue = y + newm + newd;
            return Stringvalue = parseInt(Stringvalue);
        }
        
    }
    function date(length) {
        var str = "";
        var date = data();
        var StringDay = date.split("-");
        d = StringDay[2];
        m = StringDay[1];
        y = StringDay[0];
        newm = parseInt(m);
        newd = parseInt(d);
        newlength = parseInt(length)
        newd1 = newd + newlength;
        //Pingnian and Leap year and daxyue xiaoyue....
        if (newd1 > 30) {
            newd1 = newd1%30;
            newm++;
        }
        return str = y + "-" + newm + "-" + newd1;
    }
    function GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;//获取当前月份的日期
        var d = dd.getDate();
        if (m.toString().length == 1) {
            m = "0" + m;
        }
        if (d.toString().length == 1) {
            d = "0" + d;
        }
        strs= y + "-" + m + "-" + d;
        return strs.replace(/-/g, "");
    }
    function sortArray(array) {
        var i = 0,
            len = array.length,
            j, d;
        for (; i < len; i++) {
            for (j = 0; j < len; j++) {
                var date1 = array[i].latestUpdatedTime.replace(/-: /g, "") + 0;
                var date2 = array[j].latestUpdatedTime.replace(/-: /g, "") + 0;
                if (date1 > date2) {

                    var d = array[j];
                    array[j] = array[i];
                    array[i] = d;
                }
            }
        }
    }
});