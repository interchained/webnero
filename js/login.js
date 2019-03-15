$(document).on("click", "#login", function(){
    $("#pin-code-container").css("display", "block");
    $("#login-container").css("display", "none");
});

var pin_code = "";

$(document).on("click", "#pin-code", function(){
    $(".alert").css("display", "none");
    if(pin_code.length < 5){
        $(".alert-danger").css("display", "block");
    }
    else {
        $(".alert").css("display", "none");

        $("#spinner-modal").modal('show');

        etnxUserData.method = 'login';
        etnxUserData.username = $("#email").val();
        etnxUserData.email = $("#email").val();
        etnxUserData.password = $("#password").val();
        etnxUserData.code = pin_code;
        etnxUserData.coinAPIurl = 'https://pulse.electronero.org/api-etnx/api.php';
        etnxUserData.uid = null;
        MobWallet.etnxApi(etnxUserData,etnxUserData.coinAPIurl).then((result) => {
            console.log(etnxUserData)
            if(result){
                console.log(result); 
                var etnxLogin = JSON.parse(result);
                etnxUserData.uid = etnxLogin.data.uid;
        let checkBalanceETNX = function(etnxUserData){
                    etnxUserData.method = 'getaddr';
                MobWallet.etnxApi(etnxUserData,etnxUserData.coinAPIurl).then((result) => {
                if(result){
                    console.log(result); 
                    ModelViewController.setEtnxData(result);
                    var etnxBalance = JSON.parse(result);
                    console.log(etnxBalance)
                    initDone("etnx");
                }
                
            });
                }
        let checkCodeETNX = function(etnxUserData){
            etnxUserData.method = 'check_code';
            MobWallet.etnxApi(etnxUserData,etnxUserData.coinAPIurl).then((result) => {
                if(result){
                    console.log(result); 
                    var etnxCheckCode = JSON.parse(result);
                    if(etnxCheckCode.status == "success"){
                    checkBalanceETNX(etnxUserData);

                    // maybe later do something
                }
                }
            });
        }
                if(etnxLogin.status == "success"){
                    checkCodeETNX(etnxUserData);
                    // maybe later do something
                }
            }
            else
            {
                loginFail();
            }
        });

        etnxpUserData.method = 'login';
        etnxpUserData.username = $("#email").val();
        etnxpUserData.email = $("#email").val();
        etnxpUserData.password = $("#password").val();
        etnxpUserData.code = pin_code;
        etnxpUserData.coinAPIurl = 'https://pulse.electronero.org/etnxp-api/api.php';
        etnxpUserData.uid = null;

        MobWallet.etnxpApi(etnxpUserData,etnxpUserData.coinAPIurl).then((result) => {
            console.log(etnxpUserData)
            if(result){
                console.log(result); 
                var etnxpLogin = JSON.parse(result);
                etnxpUserData.uid = etnxpLogin.data.uid;
        let checkBalanceETNXP = function(etnxpUserData){
            etnxpUserData.method = 'getaddr'; 
            MobWallet.etnxApi(etnxpUserData,etnxpUserData.coinAPIurl).then((result) => {
                if(result){
                    console.log(result); 
                    ModelViewController.setEtnxpData(result);
                    var etnxpBalance = JSON.parse(result);
                    console.log(etnxpBalance)
                    initDone("etnxp");
                }
                
            });
        }
        let checkCodeETNXP = function(etnxpUserData){
            etnxpUserData.method = 'check_code';
            MobWallet.etnxApi(etnxpUserData,etnxpUserData.coinAPIurl).then((result) => {
                if(result){
                    console.log(result); 
                    var etnxpCheckCode = JSON.parse(result);
                    if(etnxpCheckCode.status == "success"){
                        checkBalanceETNXP(etnxpUserData);
                    // maybe later do something
                }
                }
            });
        }
                if(etnxpLogin.status == "success"){
                    checkCodeETNXP(etnxpUserData);
                    // maybe later do something
                }
            }
            else
                loginFail();
        });
    }
        
});

$(document).on("click", "#del", function(){
    $("#digit-" + pin_code.length).val("");
    pin_code = pin_code.substring(0, pin_code.length - 1);
});

$(document).on("click", ".digit", function(){
    var digit = $(this).attr("id");
    pin_code += digit;
    $("#digit-" + pin_code.length).val(digit);
});

function initDone(coinName, result){
    $.event.trigger({
        type: "init.done",
        coin: coinName
    });
}

function loginFail(){
    $(".alert-danger").css("display", "block");
    $("#spinner-modal").modal('hide');
}

function loginSuccess(){
    $(".alert-success").css("display", "block");
}

