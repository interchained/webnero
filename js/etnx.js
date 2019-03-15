
//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    // var element = $('ul.nav a').filter(function() {
    //     return this.href == url;
    // }).addClass('active').parent().parent().addClass('in').parent();
    var element = $('ul.nav a').filter(function() {
        return this.href == url;
    }).addClass('active').parent();

    while (true) {
        if (element.is('li')) {
            element = element.parent().addClass('in').parent();
        } else {
            break;
        }
    }
});

$(document).on("click", ".coin-selector", function(){
    if(!$(this).hasClass("btn-selected"))
        $(".coin-selector").toggleClass("btn-selected");
});

$(document).on("click", "blockquote", function(){
    $("blockquote").removeClass("selected");
    $(this).addClass("selected");

    document.getElementById("qrimage").innerHTML="<img src='https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl="+encodeURIComponent($(this).children("p").html())+"'/>";
});
 
var etnxUserData = {
    method: 'login',
    timestamp: '',
    date: '',
    telegramID: '',
    telegramUsername: '',
    username: '',
    email: '',
    password: '',
    code: null,
    uid: null,
    name: '',
    addr: '',
    pid: null,
    receiver: '',
    txid: '',
    link: '',
    notes: '',
    bounty_id: '',
    address: '',  
    secret: null,
    unlocked_balance: 0, 
    locked_balance: 0,
    coinAPIurl: "",
}; 

var etnxpUserData = {
    method: 'login',
    timestamp: '',
    date: '',
    telegramID: '',
    telegramUsername: '',
    username: '',
    email: '',
    password: '',
    code: null,
    uid: null,
    name: '',
    addr: '',
    pid: null,
    receiver: '',
    txid: '',
    link: '',
    notes: '',
    bounty_id: '',
    address: '',  
    secret: null,
    unlocked_balance: 0, 
    locked_balance: 0,
    coinAPIurl: "",
}; 

var ModelViewController = {
    initLevel: 0,
    setCoinData: function(coin, data){
        if(coin == "etnx")
            setEtnxData(data);
        else
            setEtnxpData(data);
    },
    setEtnxData: function(data){
        localStorage.setItem("etnxData", data);
    },
    setEtnxpData: function(data){
        localStorage.setItem("etnxpData", data);
    },
    getEtnxData: function(){
        try{ return JSON.parse(localStorage.getItem("etnxData")); }
        catch(e) { console.log(e); return null; }
    },
    getEtnxpData: function(){
        try{ return JSON.parse(localStorage.getItem("etnxpData")); }
        catch(e) { console.log(e); return null; }
    },
    fillData: function(){
        var etnxData = this.getEtnxData();
        var etnxpData = this.getEtnxpData();
        
        if(etnxData != null){
            $("#etnx-wallet").html(etnxData.address);
            document.getElementById("etnx-qrimage").innerHTML="<img src='https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl="+encodeURIComponent(etnxData.address)+"'/>";
            console.log(etnxData);
            $("#etnx-balance").html(etnxData.balances.balance);
            $("#etnx-unlocked-balance").html(etnxData.balances.unlocked_balance);
        }

        if(etnxpData != null){
            $("#etnxp-wallet").html(etnxpData.address);
            document.getElementById("etnxp-qrimage").innerHTML="<img src='https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl="+encodeURIComponent(etnxpData.address)+"'/>";
            console.log(etnxpData);
            $("#etnxp-balance").html(etnxpData.balances.balance);
            $("#etnxp-unlocked-balance").html(etnxpData.balances.unlocked_balance);
        }
    },

    fillHistory: function(){
        var etnxData = this.getEtnxData();
        var etnxpData = this.getEtnxpData();
        
        if(etnxData != null){
            this.fillHistoryRows("ETNX", "Receive", etnxData.txs.in);
            this.fillHistoryRows("ETNX", "Send", etnxData.txs.out);
        }

        if(etnxpData != null){
            this.fillHistoryRows("ETNXP", "Receive", etnxpData.txs.in);
            this.fillHistoryRows("ETNXP", "Send", etnxpData.txs.out);
        }
    },

    fillHistoryRows: function(coin, type, items){
        var tbody = $("#transaction-history").find('tbody');
        for(var i = 0; i < items.length; i++) {
            var item = items[i];
            tbody.append( "<tr class='row_" + coin +"'>" +
                            "<td>" + coin + "</td>" + 
                            "<td>" + type + "</td>" + 
                            "<td>" + item.amount + "</td>" + 
                            "<td>" + item.height + "</td>" + 
                            "<td>" + item.txid + "</td>" + 
                          "</tr>" );
        }
    },

    refreshData: function(coin){
        var operationData = {};
        var coinMethod = function (data, apiUrl) {};
        if(coin == "etnx"){
            coinMethod = MobWallet.etnxApi;
            operationData = etnxUserData;
        }
        else{
            coinMethod = MobWallet.etnxpApi;
            operationData = etnxpUserData;
        }
        operationData.method = 'balance';
        coinMethod(etnxpUserData,etnxpUserData.coinAPIurl).then((result) => {
            if(result)
                this.setCoinData(coin, data);
        });
    }
};

$(document).on("init.done", function(e){
    console.log(e.type + " - " + e.coin);
    ModelViewController.initLevel++;
    if(ModelViewController.initLevel == 2)
        location.href = location.href.replace("login", "index");
});