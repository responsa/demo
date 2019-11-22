function UserUtils() {
    UserUtils.init();
}


UserUtils.init = function () {
    UserUtils.addUserInfo();
    UserUtils.checkBrowser();
}

UserUtils.checkBrowser = function() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName  = navigator.appName;
    var fullVersion  = ''+parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion,10);
    var nameOffset,verOffset,ix;

    // OPERA"
    if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset+6);
        if ((verOffset=nAgt.indexOf("Version"))!=-1)
            fullVersion = nAgt.substring(verOffset+8);
    }
    // Microsoft Internet Explorer
    else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset+5);
        var nAgtNew = nAgt.substring(verOffset + 4);
        var nAgtNewSub = nAgtNew.substring(1, 3);
        if (nAgtNewSub < 10){
            alert('Sfortunatamente il tuo browser non supporta questa tecnologia. Dovresti aggiornare alla versione Internet Explorer 10 e successive o passare a Safari 6 e successive, Google Chrome, Mozilla Firefox');
        }
    }
    //  Chrome
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset+0);
        var nAgtNewSub = fullVersion.substring(7, 9);
        if (nAgtNewSub < 35){
            alert('Sfortunatamente il tuo browser non supporta questa tecnologia. Dovresti aggiornare alla versione Internet Explorer 10 e successive o passare a Safari 6 e successive, Google Chrome, Mozilla Firefox');
        }
    }
    //  Firefox
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset+0);
        var nAgtNewSub = fullVersion.substring(8, 10);
        if (nAgtNewSub < 30){
            alert('Sfortunatamente il tuo browser non supporta questa tecnologia. Dovresti aggiornare alla versione Internet Explorer 10 e successive o passare a Safari 6 e successive, Google Chrome, Mozilla Firefox');
        }
    }
    // In Safari
    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset+7);
        if ((verOffset=nAgt.indexOf("Version"))!=-1) {
            fullVersion = nAgt.substring(verOffset + 8);
            fullVersion = fullVersion.split('.');
            fullVersionInt = parseInt(fullVersion[0]);
            if(fullVersionInt < 6){
                alert('Sfortunatamente il tuo browser non supporta questa tecnologia. Dovresti aggiornare alla versione Safari 6 e successive o passare a Internet Explorer 10 e successive, Google Chrome, Mozilla Firefox');
            }

        }
    }
}

UserUtils.checkBrowserOLD = function () {

    var browserCheck = 0;
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var msieVersion = 0;

    if (msie > 0){
        msieVersion = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
    }

    if (msie > 0 && (msieVersion == 8 || msieVersion == 9) ){
        browserCheck = UserUtils.getCookie('sBrowserCheck');
    }
    if(browserCheck === null){
        //
        alert('Sfortunatamente il tuo browser non supporta questa tecnologia. Dovresti aggiornare alla versione Internet Explorer 10 e successive o passare a Safari 6 e successive, Google Chrome, Mozilla Firefox');
        //document.cookie = 'sBrowserCheck=1;';
    }


}


UserUtils.userInfo = null;

UserUtils.addUserInfo = function () {
    var thisAction = siaePath+"/it/services/users/user_info.json";
     
    jQuery.ajax({
        type: "GET",
        dataType: "json",
        url: thisAction,
        data: {   },
        success: function(dataResponse) {
            if(typeof(dataResponse.KO) != 'undefined' && dataResponse.KO){

                return;
            }else{
                UserUtils.userInfo =  dataResponse;
                //UserUtils.getAddressInfo();
                UserUtils.addUserMenu();
                UserUtils.checkStatoServizi();
				if(typeof(UserAccount) != 'undefined'){
					UserAccount.init();
                }
            }
        }
    });
}

//UserUtils.userAddressInfo = null;
/*UserUtils.getAddressInfo = function() {
    var thisAction = siaePath+'/it/services/users/address_contact_index.json';
    //var params = {};
    jQuery.ajax({
        type: "GET",
        dataType: "json",
        url: thisAction,
        data: {   },
        success: function(dataResponse) {
            if(typeof(dataResponse.KO)!='undefined' && dataResponse.KO){
                return;
            }else{
                UserUtils.userAddressInfo = dataResponse;
            }
        }
    });
}*/

UserUtils.checkStatoServizi = function () {
    var thisAction = siaePath+"/it/services/users/stato_servizi.json";

    jQuery.ajax({
        type: "GET",
        dataType: "json",
        url: thisAction,
        data: {   },
        success: function(dataResponse) {

            if(dataResponse === null  || (typeof(dataResponse.KO) != 'undefined' && dataResponse.KO)){

                return;
            }else{
                UserUtils.msgManutenzione(dataResponse.content);
            }
        }
    });
}

UserUtils.msgManutenzione = function (content) {

    jQuery.each( content, function (index, value) {
        //var classOrigBlockFalse = jQuery('.' + value.applicativo + ' a').attr("class");
        if(value.bloccante){
            var linkA = '.'+value.applicativo+' a';
            jQuery(linkA).replaceWith(function () {
                var classOrig = jQuery(linkA).attr("class");

                var div =jQuery('<div/>', {
                    html: jQuery(linkA).html()
                });
                div.addClass(classOrig);

                return div
            });

            jQuery('.' + value.applicativo + ' .bkg-flag').addClass("bkg-flag-red");
            jQuery('.' + value.applicativo + ' .bkg-flag').removeClass("bkg-flag");

        }else{
            jQuery('.' + value.applicativo + ' .bkg-flag').addClass("bkg-flag-yellow");
            jQuery('.' + value.applicativo + ' .bkg-flag').removeClass("bkg-flag");

        }
        jQuery("."+ value.applicativo + " .content-msg").append(" (" + value.corpo + ")");



    });
}

UserUtils.userInfo3 = '';
UserUtils.cmsData = [];


UserUtils.addUserMenu = function () {
    jQuery("#userNameLoggedMobile").html(UserUtils.userInfo['anagrafica']['nome'] + " " + UserUtils.userInfo['anagrafica']['cognomeDenominazione']);
}

UserUtils.addUserMenu = function () {
    if(typeof(UserUtils) == 'undefined' || typeof(UserUtils.userInfo) == 'undefined'){
        return;
    }

    if(UserUtils.userInfo['anagrafica']['tipoSocieta']['denominazione'] == "PF"){
        jQuery("#userNameLogged").html(UserUtils.userInfo['anagrafica']['nome'] + " " + UserUtils.userInfo['anagrafica']['cognomeDenominazione']);
        jQuery("#userNameLoggedMobile").html(UserUtils.userInfo['anagrafica']['nome'] + " " + UserUtils.userInfo['anagrafica']['cognomeDenominazione']);
    }else{
        jQuery("#userNameLogged").html(UserUtils.userInfo['anagrafica']['cognomeDenominazione']);
        jQuery("#userNameLoggedMobile").html(UserUtils.userInfo['anagrafica']['cognomeDenominazione']);
    }

    if((jQuery("#userNameLogged").text()).length > 17){
        jQuery('#userNameLogged').attr('data-tooltip', jQuery("#userNameLogged").text());
        var nominativoTroncato = (jQuery("#userNameLogged").text()).substr(0,17) + "...";
        jQuery("#userNameLogged").html(nominativoTroncato) ;
    }else{
        jQuery("#userNameLogged").removeAttr('data-tooltip data-tooltip-position')
    }

    if(UserUtils.userInfo['isAbilitatoNewsLetter']){
        jQuery('#newsletterUserSetting').attr( 'checked', true);
    }else{
        jQuery('#newsletterUserSetting').attr( 'checked', false);
    }

    // cambio abilitazione newsletter
    jQuery( ".bootstrap-switch-id-newsletterUserSetting" ).click(function() {
        UserUtils.cambioAbilitazioneNewsletter();
    });

    // al click menu service logged
    /*jQuery( "#menu-services-logged" ).click(function() {
        UserUtils.menuServiceLogged();
    });*/

    if(typeof(UserUtils.userInfo['serviziAttivi']) == 'undefined'){
        return;
    }

    var imgPmo;

    UserUtils.countMenuLenghtAttivi(UserUtils.userInfo['serviziAttivi'], 'COUNT_RECURSIVE');
    UserUtils.countMenuLenghtAttivabili(UserUtils.userInfo['serviziAttivabili'], 'COUNT_RECURSIVE');
    UserUtils.countMenuLenghtInAttivazione(UserUtils.userInfo['serviziInAttivazione'], 'COUNT_RECURSIVE');

}

//ATTIVI
UserUtils.countMenuLenghtAttivi = function (mixed_var, mode) {
    var imgPmo = siaePath + "/sites/default/files/styles/servizi-online-thumb/public/sol-thumbimages/pmo.jpg";
    var key, cnt = 0;

    if (mixed_var === null || typeof mixed_var === 'undefined') {
        return 0;
    } else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object) {
        return 1;
    }

    if (mode === 'COUNT_RECURSIVE') {
        mode = 1;
    }
    if (mode != 1) {
        mode = 0;
    }

    for (key in mixed_var) {
        if (mixed_var.hasOwnProperty(key)) {
            cnt++;
            if (mode == 1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor ===
                Object)) {
                //cnt += this.count(mixed_var[key], 1);
            }
        }
    }
    var serviziAttiviList = '';

    if(cnt <= 1){
        serviziAttiviList = '';
        jQuery.each( UserUtils.userInfo['serviziAttivi'], function (index, value) {
            if (value['codice'] == "APMO_FREE") {
                serviziAttiviList +="<li class='col-sm-6 no-uppercase with100 bkg-flag "+ value['codiceServizio'] +"'><a class='"+ value['type'] + "' href=\""+value['url']+"\"><div class='content-title'><img width='90' height='90' alt='' src=" + imgPmo + " class='img_sol_service'></div><div class='content-msg'>" +value['titolo']+"</div></a></li>";
            }else {
                serviziAttiviList += "<li class='col-sm-6 no-uppercase with100 bkg-flag " + value['codiceServizio'] + "'><a class='" + value['type'] + "' href=\"" + value['url'] + "\"><div class='content-title'>" + value['thumbimage'] + "</div><div class='content-msg'>" + value['titolo'] + "</div></a></li>";
            }
        });
        jQuery("#menu-services-active").html(serviziAttiviList+"<span class='titolo-menu-service'></span><div class='divider'>ATTIVI</div>");
        jQuery("#menu-services-active-mobile").html(serviziAttiviList+"<span class='titolo-menu-service'></span>ATTIVI");
    }else {

        serviziAttiviList = '';
        jQuery.each( UserUtils.userInfo['serviziAttivi'], function (index, value) {
            if (value['codice'] == "APMO_FREE") {

                serviziAttiviList += "<li class='col-sm-6 no-uppercase " + value['codiceServizio'] + "'><a class='" + value['type'] + "' href=\"" + value['url'] + "\"><div class='content-title'><img width='90' height='90' alt='' src=" + imgPmo + " class='img_sol_service'><span class=\"bkg-flag\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div><div class='content-msg'>" + value['titolo'] + "</div></a></li>";
            } else{
                serviziAttiviList += "<li class='col-sm-6 no-uppercase " + value['codiceServizio'] + "'><a class='" + value['type'] + "' href=\"" + value['url'] + "\"><div class='content-title'>" + value['thumbimage'] + "<span class=\"bkg-flag\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div><div class='content-msg'>" + value['titolo'] + "</div></a></li>";
            }
        });
        jQuery("#menu-services-active").html(serviziAttiviList);
        jQuery("#menu-services-active-mobile").html(serviziAttiviList);
    }
    return cnt;
}

//ATTIVABILI
UserUtils.countMenuLenghtAttivabili = function (mixed_var, mode) {
    var imgPmo = siaePath + "/sites/default/files/styles/servizi-online-thumb/public/sol-thumbimages/pmo.jpg";
    var key, cnt = 0;

    if (mixed_var === null || typeof mixed_var === 'undefined') {
        return 0;
    } else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object) {
        return 1;
    }

    if (mode === 'COUNT_RECURSIVE') {
        mode = 1;
    }
    if (mode != 1) {
        mode = 0;
    }

    for (key in mixed_var) {
        if (mixed_var.hasOwnProperty(key)) {
            cnt++;
            if (mode == 1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor ===
                Object)) {
                //cnt += this.count(mixed_var[key], 1);
            }
        }
    }
    var serviziAttivabiliList = '';
    if(cnt == 0){
        serviziAttivabiliList = '';
    }else if(cnt == 1){
        serviziAttivabiliList = '';
        //jQuery("#menu-services-activating").html("<span class='titolo-menu-service'>ATTIVABILI</span><div class='divider'></div>");
        jQuery.each( UserUtils.userInfo['serviziAttivabili'], function (index, value) {
            if (value['codice'] == "APMO_FREE") {
                serviziAttivabiliList +="<li class='col-sm-6 no-uppercase with100 "+ value['codiceServizio'] +"'><a class='"+ value['type'] + "' href=\""+value['url']+"\"><img width='90' height='90' alt='' src=" + imgPmo + " class='img_sol_service'>" +value['titolo']+"</a></li>";
            }else {
                serviziAttivabiliList += "<li class='col-sm-6 no-uppercase with100 " + value['codiceServizio'] + "'><a class='" + value['type'] + "' href=\"" + value['url'] + "\">" + value['thumbimage'] + value['titolo'] + "</a></li>";
            }
        });
        jQuery("#menu-services-activating").html("<span class='titolo-menu-service'>ATTIVABILI</span><div class='divider'></div>"+serviziAttivabiliList);
        jQuery("#menu-services-activating-mobile").html("<span class='titolo-menu-service'>ATTIVABILI</span>"+serviziAttivabiliList);

    }else{
        //jQuery("#menu-services-activating").html("<span class='titolo-menu-service'>ATTIVABILI</span><div class='divider'></div>");
        serviziAttivabiliList = '';
        jQuery.each( UserUtils.userInfo['serviziAttivabili'], function (index, value) {
            if (value['codice'] == "APMO_FREE") {
                serviziAttivabiliList += "<li class='col-sm-6 no-uppercase " + value['codiceServizio'] + "'><a class='" + value['type'] + "' href=\"" + value['url'] + "\"><img width='90' height='90' alt='' src=" + imgPmo + " class='img_sol_service'>" + value['titolo'] + "</a></li>";
            }else {
                serviziAttivabiliList += "<li class='col-sm-6 no-uppercase " + value['codiceServizio'] + "'><a class='" + value['type'] + "' href=\"" + value['url'] + "\">" + value['thumbimage'] + value['titolo'] + "</a></li>";
            }
        });
        jQuery("#menu-services-activating").html("<span class='titolo-menu-service'>ATTIVABILI</span><div class='divider'></div>"+serviziAttivabiliList);
        jQuery("#menu-services-activating-mobile").html("<span class='titolo-menu-service'>ATTIVABILI</span>"+serviziAttivabiliList);
    }
    return cnt;
}

//IN ATTIVAZIONE
UserUtils.countMenuLenghtInAttivazione = function (mixed_var, mode) {
    var imgPmo = siaePath + "/sites/default/files/styles/servizi-online-thumb/public/sol-thumbimages/pmo.jpg";
    var key, cnt = 0;

    if (mixed_var === null || typeof mixed_var === 'undefined') {
        return 0;
    } else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object) {
        return 1;
    }

    if (mode === 'COUNT_RECURSIVE') {
        mode = 1;
    }
    if (mode != 1) {
        mode = 0;
    }

    for (key in mixed_var) {
        if (mixed_var.hasOwnProperty(key)) {
            cnt++;
            if (mode == 1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor ===
                Object)) {
                //cnt += this.count(mixed_var[key], 1);
            }
        }
    }
    var serviziInAttivazioneList = '';
    if(cnt == 0){
        serviziInAttivazioneList = '';
    }else if(cnt == 1){
        serviziInAttivazioneList = '';
        //jQuery("#menu-services-activable").html("<span class='titolo-menu-service'>IN ATTIVAZIONE</span><div class='divider'></div>");
        jQuery.each( UserUtils.userInfo['serviziInAttivazione'], function (index, value) {
            if (value['codice'] == "APMO_FREE") {
                serviziInAttivazioneList +="<li class='col-sm-6 no-uppercase with100 "+ value['codiceServizio'] +"'><a class='"+ value['type'] + "' href=\""+value['url']+"\"><img width='90' height='90' alt='' src=" + imgPmo + " class='img_sol_service'>" +value['titolo']+"</a></li>";
            }else{
                serviziInAttivazioneList +="<li class='col-sm-6 no-uppercase with100 "+ value['codiceServizio'] +"'><a class='"+ value['type'] + "' href=\""+value['url']+"\">"+ value['thumbimage'] +value['titolo']+"</a></li>";
            }
         });
        jQuery("#menu-services-activable").html("<span class='titolo-menu-service'>IN ATTIVAZIONE</span><div class='divider'></div>"+serviziInAttivazioneList);
        jQuery("#menu-services-activable-mobile").html("<span class='titolo-menu-service'>IN ATTIVAZIONE</span>"+serviziInAttivazioneList);

    }else{
        serviziInAttivazioneList = '';
        //jQuery("#menu-services-activable").html("<span class='titolo-menu-service'>IN ATTIVAZIONE</span><div class='divider'></div>");
        jQuery.each( UserUtils.userInfo['serviziInAttivazione'], function (index, value) {
            if (value['codice'] == "MFVDJ") {
                serviziInAttivazioneList +="<li class='col-sm-6 no-uppercase "+ value['codiceServizio'] +"'><a class='"+ value['type'] + "' href=\""+value['url']+"\"><img width='90' height='90' alt='' src=" + imgPmo + " class='img_sol_service'>"+ value['titolo']+"</a></li>";
            }else{
                serviziInAttivazioneList +="<li class='col-sm-6 no-uppercase "+ value['codiceServizio'] +"'><a class='"+ value['type'] + "' href=\""+value['url']+"\">"+ value['thumbimage'] +value['titolo']+"</a></li>";

            }
         });
        jQuery("#menu-services-activable").html("<span class='titolo-menu-service'>IN ATTIVAZIONE</span><div class='divider'></div>"+serviziInAttivazioneList);
        jQuery("#menu-services-activable-mobile").html("<span class='titolo-menu-service'>IN ATTIVAZIONE</span>"+serviziInAttivazioneList);
    }
    return cnt;
}




UserUtils.cambioAbilitazioneNewsletter = function () {
    var thisAction = siaePath+"/it/services/users/toggle_newsletter.json";
    jQuery.ajax({
        type: "GET",
        dataType: "json",
        url: thisAction,
        data: {   },
        success: function(dataResponse) {
            if(dataResponse.KO){
                // jQuery( "#errorMessage" ).html(dataResponse.errorMessage);
                alert(dataResponse.errorMessage);
                return;
            }else{
                //alert('Cambio abilitazione newsletter eseguito con successo');
            }
        }
    });
//risposta {"KO":false,"status":"OK","errorCode":"","errorMessage":"","abilitato":boolean}
}

UserUtils.menuServiceLogged = function () {
    if(jQuery("#menu-services-logged li").hasClass("open")){
        jQuery( "body" ).removeClass( "noScroll" );
        jQuery( "body" ).css( "overflow","auto" );
    }else{
        jQuery( "body" ).addClass( "noScroll" );
        jQuery( "body" ).css( "overflow","hidden" );
    }
}


UserUtils.getCookie = function (name) {

  var dc = document.cookie;

   var prefix = name + "=";

  var begin = dc.indexOf("; " + prefix);

  if (begin == -1) {

      begin = dc.indexOf(prefix);

 if (begin != 0) return null;

}

 else {
begin += 2;
var end = document.cookie.indexOf(";", begin);
 if (end == -1) {
  end = dc.length;
  }
}
return unescape(dc.substring(begin + prefix.length, end));
}

jQuery(document).ready(function () {
    UserUtils();


});
