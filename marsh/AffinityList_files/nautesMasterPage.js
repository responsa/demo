
function makeWin(url, w, h) {
    agent = navigator.userAgent;
    windowName = "MarshPopup";
    params = "";
    params += "toolbar=0,";
    params += "location=0,";
    params += "directories=0,";
    params += "status=0,";
    params += "menubar=0,";
    params += "scrollbars=1,";
    params += "resizable=1,";
    params += "width=" + w + ",";
    params += "height=" + h;
    win = window.open(url, windowName, params);
    if (agent.indexOf("Mozilla/2") != -1 && agent.indexOf("Win") == -1) {
        win = window.open(url, windowName, params);
    }
    if (win) {
        if (!win.opener) { win.opener = window; }
        win.focus();
    } else {
        //alert('Script failed to open a pop-up window.\nPerhaps your browser settings prevent it.');
    }
}

/************metodi per textbox ricerca******************/
function eseguiInvio(ev, tb) {
    if ((ev.which && ev.which == 13) || (ev.keyCode && ev.keyCode == 13)) {
        CheckDataAndClick(tb);
        return false;
    } else
        return true;
}
//function trim(stringa) {
//    while (stringa.substring(0, 1) == ' ') {
//        stringa = stringa.substring(1, stringa.length);
//    }
//    while (stringa.substring(stringa.length - 1, stringa.length) == ' ') {
//        stringa = stringa.substring(0, stringa.length - 1);
//    }
//    return stringa;
//}
function CheckDataAndClick(tb) {
    var word = jQuery("[id$='" + tb + "']")[0].value;//trim(jQuery("[id$='" + tb + "']")[0].value).split(" ");
    var bOk = false;
    if (word.length > 2)
        bOk = true;

        //for (i = 0; i < words.length; i++) {
        //    if (trim(words[i]).length > 2) {
        //        bOk = true;
        //        break;
        //    }
        //}
    if (bOk == false) {
        alert('Ricerca non effettuata. È necessario inserire una parola di almeno 3 caratteri');
    }
    else {
        jQuery("[id$='hdSearch']").val(word);
        jQuery("[id$='btnSearch']")[0].click();
    }
}
/********************************************************/

/**********gestione banner cookies***************/
function ManageCookies() {
    var $cookieValue = jQuery.cookie('cookiesProfessionisti');

    //Questa condizione è sdoppiata nell'evento load
    if ($cookieValue != null && $cookieValue != 'undefined' && $cookieValue == 'accepted') {
        //alert("DEBUG::Cookie trovato!");
        //Cookie trovato ed accettato
        //Chiudo il panel
        //event.preventDefault();
        jQuery(".cookiesPopup").hide();
        return;
    }
    else {
        //Cookie non trovato quanto meno con il valore atteso CookieFoundValueTomatch
        //alert("DEBUG::Cookie non trovato!");
        jQuery(".cookiesPopup").show();
    }

    jQuery(".closeCookies").click(function () {
        //Imposto il cookie per un certo periodo in days
        jQuery.cookie('cookiesProfessionisti', 'accepted', { expires: 3650, path: '/' });
        //Chiudo il panel
        //$(".cookiesPopup").slideToggle("slow");
        jQuery(".cookiesPopup").slideUp("slow");
        //$(".cookiesPopup").hide();
        return;
    });
}
/****************************************************/

/******************tooltip*************************/
function ShowPopUp_Tooltip(content) {
    jQuery(".divPopUpTooltip").dialog("open");
    jQuery('.divPopUpTooltipContent').html(content);
}

function SetTooltip(selector,position, arrowClass) {

    if (jQuery(".divToGetBreakpoints").css("display") == "block") {
        bDesktopVersion = true;
    }
    else {
        bDesktopVersion = false;
    }

    if (bDesktopVersion) {//tooltip classico
        jQuery(selector).tooltip({
            content: function () {
                return jQuery(this).prop('title');
            },
            position: {
                my: position,
                using: function (position, feedback) {
                    jQuery(this).css(position);
                    jQuery("<div>")
                      .addClass(arrowClass)
                      .addClass(feedback.vertical)
                      .addClass(feedback.horizontal)
                      .appendTo(this);
                }
            },
        });
    }
    else {
        //tooltip versione mobile -- in popup
        jQuery(selector).click(function () {
            var text = jQuery(this).prop('title');
            ShowPopUp_Tooltip(text);
        });


        jQuery(".divPopUpTooltip").dialog({
            width: '70%',
            appendTo: 'form',
            autoOpen: false,
            modal: true,
        });

    }

}
/****************************************************/


/* TLS 1.1 supported browsers configuration 
 ************************************/
//var okBrowsers = {
//    "internet explorer": ["11.0"], "microsoft edge": ["14"], "msie": ["11"], "opera": ["12.18"],
//    "safari": ["9"], "firefox": ["44"], "mozilla": ["44", "11.0"], "chrome": ["48"]
//};

//lista da mail di Perfetti del 11/04/2017
var okBrowsers = {
    "internet explorer": ["11.0"], "microsoft edge": ["14"], "msie": ["11"], 
    "firefox": ["51"], "mozilla": ["51"],
    "chrome": ["49"], "chrome android": ["57"],
    "safari": ["10"], "safari ios": ["9.3"],    
    "opera": ["43"],
};

/* check the real version of IE */
function IeVersion() {
    //Set defaults
    var value = {
        IsIE: false,
        TrueVersion: 0,
        ActingVersion: 0,
        CompatibilityMode: false
    };

    //Try to find the Trident version number
    var trident = navigator.userAgent.match(/Trident\/(\d+)/);
    if (trident) {
        value.IsIE = true;
        //Convert from the Trident version number to the IE version number
        value.TrueVersion = parseInt(trident[1], 10) + 4;
    }

    //Try to find the MSIE number
    var msie = navigator.userAgent.match(/MSIE (\d+)/);
    if (msie) {
        value.IsIE = true;
        //Find the IE version number from the user agent string
        value.ActingVersion = parseInt(msie[1]);
    } else {
        //Must be IE 11 in "edge" mode
        value.ActingVersion = value.TrueVersion;
    }

    //If we have both a Trident and MSIE version number, see if they're different
    if (value.IsIE && value.TrueVersion > 0 && value.ActingVersion > 0) {
        //In compatibility mode if the trident number doesn't match up with the MSIE number
        value.CompatibilityMode = value.TrueVersion != value.ActingVersion;
    }
    return value;
}

/* check if browser is supported */
function isSupported() {
    var status = true;

    var browserVersion = bowser.version;

    if ((bowser.msie || bowser.msedge) && IeVersion().CompatibilityMode) {
        browserVersion = IeVersion().TrueVersion;
    }

    //alert("Name: " + bowser.name.toLowerCase() + "\nVersion: " + parseFloat(browserVersion));

    if (bowser.msie && browserVersion == 6) { alert("Browser non supportato"); } // only for IE6



    //device ios 
    if (bowser.ios)
    {
        //(il bowser.name è sempre safari quindi ne ho messo uno io ad hoc)
        if (bowser.safari) {
            //alert("is ios safari. version: " + browserVersion);
            if (parseFloat(browserVersion) < parseFloat(okBrowsers["safari ios"][0]))
                status = false;
        }
    }
    // device android 
    else if(bowser.android) 
    {
        //browser chrome mobile (anche qui il bowser.name è sempre chrome quindi ne ho messo uno io ad hoc)
        if (bowser.chrome) {

            //alert("is android chrome version: " + browserVersion);
            if (parseFloat(browserVersion) < parseFloat(okBrowsers["chrome android"][0]))
                status = false;
        }

    }
    else if (okBrowsers[bowser.name.toLowerCase()] == undefined || parseFloat(browserVersion) < parseFloat(okBrowsers[bowser.name.toLowerCase()][0])) {
        status = false;
    }

    return status;
}



