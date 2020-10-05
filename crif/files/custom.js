/*  Wizard */

var customWizard

jQuery(function ($) {
    "use strict";

    // ----------------------
    // JS | Init wizard
    //
    customWizard = new CustomWizard();
    customWizard.init();

});

/**
 * Validazione mail
 */
function validateEmail(mail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
        return true;
    }

    return false
}

/**
 * Loading ON
 */
function loadingON()
{
    // console.log('loadingON');
    $('#loader_form').css('display','block');
}

/**
 * Loading OFF
 */
function loadingOFF()
{
    // console.log('OFF');
    $('#loader_form').css('display','none');
}

/**
 * Mostra un messaggio all'utente
 * @param {string} type tipo
 * @param {string} message messaggio
 */
function themeAlert(type, message)
{
    alert(message);
}