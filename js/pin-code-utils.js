var pin_code = "";

$(document).on("click", "#del", function(){
    $("#digit-" + pin_code.length).val("");
    pin_code = pin_code.substring(0, pin_code.length - 1);
});

$(document).on("click", ".digit", function(){
    var digit = $(this).attr("id");
    pin_code += digit;
    $("#digit-" + pin_code.length).val(digit);
});