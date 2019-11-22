/**
 * Created by andrea on 14/07/15.
 */

jQuery(document).ready(function () {

    doTrace();
});


function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

function doTrace() {
    var myCookie = getCookie("trace");

    if (myCookie == null) {
        // do cookie doesn't exist stuff;
        //alert("Creo il cookie!");
        createCookie("trace")

        jQuery.ajax({
            url: siaePath+"/services/users/trace.json?page=index.html&sessionId=-1",
            async: true,
            success: function(json) {
                // do something
                //alert(json.toSource());
                //document.cookie = "trace=" + value + ";";
            }
        });
    }
    else {
        // do cookie exists stuff
    }


}


var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    // document.cookie = name + "=" + value + expires + "; path=/";
    document.cookie = name + "=" + value + ";";
}
