/**
 * Created by dubash on 08/06/15.
 */

jQuery(document).ajaxComplete(function () {
    /*jQuery(".about_us__content .text").off().on("click", ".question-container", function() {
        if(jQuery(this).hasClass('active')){
            jQuery(this).removeClass("active");
            jQuery(this).siblings('.answer-container').slideUp(200);
            jQuery(".question-information").hide();
        }else{
            jQuery(".question-container").removeClass("active");
            jQuery(this).addClass("active");
            jQuery(".question-information").show();
            jQuery('.answer-container').slideUp(200);
            jQuery(this).siblings('.answer-container').slideDown(200);
        }
    });*/
});

jQuery( document ).ready(function() {
    jQuery( "#edit-search-keys--2" ).removeClass( "form-control" );
    jQuery( "#edit-search-keys" ).removeClass( "form-control" );
    jQuery( "#edit-submit" ).removeClass( "btn" );
    jQuery( "#edit-submit" ).removeClass( "btn-default" );
    jQuery( "#edit-submit--2" ).removeClass( "btn" );
    jQuery( "#edit-submit--2" ).removeClass( "btn-default" );
    jQuery( "#edit-prompt" ).remove();
    jQuery( ".form-autocomplete .input-group-addon" ).remove();
    jQuery( ".home .input-group .input-group-addon" ).remove();

    /*var linkFaq = jQuery(".search-content").find(".searchresults .searchresults_item .title a");
    jQuery.each(linkFaq, function(key, value){
        if(jQuery(value).prop("href").indexOf("/content/") > 0){
            var hrefEnd = jQuery(value).prop("href").length;

            var idAperturaStart = jQuery(value).prop("href").indexOf("/%");
            var idApertura =  jQuery(value).prop("href").substring(idAperturaStart + 1, hrefEnd);

            var indexStart = jQuery(value).prop("href").indexOf("/content/");
            var testoSost =	jQuery(value).prop("href").substring(indexStart, hrefEnd);
            var result = jQuery(value).prop("href").replace(testoSost, "/chi-siamo/documenti-e-faq/faq-cose-da-sapere?idApertura="+idApertura);

            jQuery(value).prop("href", result);
        }
    });*/

    referrerWriter();
    openFaqResponsa();

    jQuery(".searchOverPage .close").on("click",function(){
        readReferrerCookieStr = readReferrerCookie();
        window.location.replace(readReferrerCookieStr);
    });

    jQuery(".searchOverPage .go-back").on("click",function(){
        readReferrerCookieStr = readReferrerCookie();
        window.location.replace(readReferrerCookieStr);
    });

    //the original search keyword
    var textEditSearch = clearEditSearch(jQuery( "#edit-search-keys--2" ).val());

    //for each tag, append it to original search keyword
    addKeyWords(textEditSearch);



    jQuery( "#dialog").dialog();
    jQuery(".arrow_notifica").prependTo(".page-utilizzatori .ui-dialog");


});

function isset(object){
    return (typeof object !=='undefined');
}

function clearEditSearch(textEditSearch)
{
    var listTags =  metatagKeyWords();
    if (isset(textEditSearch)) {
        var splitTextSearch = textEditSearch.split(" ");
        for ( key in splitTextSearch) {
            if (listTags.indexOf(splitTextSearch[key]) > -1  ) {
                splitTextSearch.splice([key],1);
            }
        }
        return textEditSearch = splitTextSearch.join(' ');

    } else {
        return textEditSearch;
    }

}

function addKeyWords(textEditSearch)
{
    jQuery('ul#tagfilters li a').each(function() {
        var current = jQuery(this);
        current.on("click",function(){
            //var tagName = current.text().toLowerCase();
            var tagName = current.attr('data-filter').toLowerCase();
            //if tagname is equal to Document then append as_filetype in query parameters

            var newSearch = textEditSearch  + ' ' + tagName;
            jQuery( "#edit-search-keys--2").val(newSearch);

            //put here submit call to button #edit-submit--2
            jQuery('#edit-submit--2').click();
        });
    });
}

function metatagKeyWords()
{
    //retrive current menu 
    var thisPage = window.location.href;
    thisPage = thisPage.split("?");
    thisPage = thisPage[0];
    var thisMenu = thisPage.split("%2B")
    var lastEl = thisMenu[thisMenu.length-1];
  
    var tagList = new Array();
    /*jQuery('ul#tagfilters li a').each(function() {
      
      //set current active menu

      // Uncomment this line when enabling new gsa
      // jQuery( ".search-content_top #tagfilters a.active" ).removeClass('active');

      // Start comment here when enabling new gsa
      if(jQuery(this).attr('data-filter') == lastEl){
        jQuery( ".search-content_top #tagfilters a.active" ).removeClass('active');
        jQuery(this).addClass('active');
      }
      tagList.push(jQuery(this).text().toLowerCase());
      tagList.push(jQuery(this).attr('data-filter').toLowerCase());
      // Sto comment here when enabling new gsa

    });*/
    return tagList;
}


/*cs*/
function referrerWriter()
{
    /*var gsearchUrl = document.URL.indexOf('en/gsearch') > -1;
    var gsearchUrlApp = document.URL.indexOf('?') > -1;

    if(gsearchUrl && !gsearchUrlApp) {
        var thisAction;
        thisAction = document.location+'?client=all-en';
        window.location.replace(thisAction);
    }*/

    var thisLocation = document.location;
    if(thisLocation == siaePath+'/gsearch' || thisLocation == siaePath+'/gsearch/'){
        var referrer = document.referrer;
        document.cookie = 'siaeSearchReferrer=' + escape(referrer);
    }
}


function readReferrerCookie()
{
    if (document.cookie.length > 0)
    {
        var inizio = document.cookie.indexOf('siaeSearchReferrer' + "=");
        if (inizio != -1)
        {
            inizio = inizio + 'siaeSearchReferrer'.length + 1;
            var fine = document.cookie.indexOf(";",inizio);
            if (fine == -1) fine = document.cookie.length;
            return unescape(document.cookie.substring(inizio,fine));
        }else{
            return siaePath;
        }
    }
    return siaePath;
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};



function openFaqResponsa() {
    /*jQuery(".faq-responsa .button-container").hide();
    jQuery(".faq-responsa #authors_faq").hide();
    jQuery(".faq-responsa #utilizers_faq").hide();*/


    var idFaq = getUrlParameter('faqId');
    var faqType = getUrlParameter('faqType');

    if(idFaq == undefined) {
        jQuery(".faq-responsa #button-faq-all").hide();
        jQuery(".faq-responsa .question-container").hide();
        jQuery(".faq-responsa .answer-container").hide();
        jQuery(".faq-responsa .question-information").hide();

    }else{
        jQuery(".about_us__content .text .question-container").addClass("active");
        jQuery('.answer-container').slideUp(200);
        jQuery(".about_us__content .text .question-container").siblings('.answer-container').slideDown(200);
        
        var thisAction;

        if(jQuery("body").hasClass("i18n-it")){
            if (faqType == "Author") {
                thisAction = "https://goresponsa.com/api/v2/widget/"+responsaCodes.autorIta+"/question/" + idFaq;
            } else {
                thisAction = "https://goresponsa.com/api/v2/widget/57d2cc6ee0e2ee692b001f83/question/" + idFaq;
            }
        }else{
            if (faqType == "Author") {
                thisAction = "https://goresponsa.com/api/v2/widget/57d2cc55e0e2eee474001fcb/question/" + idFaq;
            } else {
                thisAction = "https://goresponsa.com/api/v2/widget/57d2cc84e0e2ee8418001f36/question/" + idFaq;
            }
        }
        

        jQuery.ajax({
            type: "GET",
            dataType: "json",
            url: thisAction,
            data: "",
            success: function (dataResponse) {
                if (dataResponse == "") {
                    jQuery(".faq-responsa .question-container-empty").show();
                    jQuery(".faq-responsa .question-container").hide();
                    jQuery(".faq-responsa .answer-container").hide();
                    jQuery(".faq-responsa .question-information").hide();
                    jQuery(".faq-responsa .button-container").hide();
                    jQuery(".faq-responsa #responsa_faq").hide();
                    jQuery(".faq-responsa #utilizers_faq").hide();
                } else {
                    jQuery(".faq-responsa .button-container").show();
                    jQuery(".faq-responsa #responsa_faq").show();
                    jQuery(".faq-responsa #utilizers_faq").hide();
                    jQuery(".faq-responsa #button-faq-all").hide();

                    var idIframe = jQuery("#res_root_56c5d285e0e2eef6a7001746").find("iframe").attr("id");
                    //idIframe.hide();
                    var txtQuestion = dataResponse.text;
                    var txtQuestionInformation = dataResponse.topics;
                    var txtAnswer = dataResponse['answer'].text;

                    var replace = dataResponse['answer'].text.replace(/-/g, "</br>-");

                    jQuery(".txtQuestion").html(txtQuestion);
                    jQuery(".txtQuestionInformation").html("in " + txtQuestionInformation);
                    jQuery(".txtAnswer").html(replace);
                }

            }
        });

        jQuery(".faq-responsa #button-faq-all").click(function () {
            jQuery(".faq-responsa .button-container").show();
            jQuery(".faq-responsa #responsa_faq").show();
            jQuery(".faq-responsa .question-information").hide();

            jQuery(".faq-responsa .question-container").hide();
            jQuery(".faq-responsa .answer-container").hide();
            jQuery(".faq-responsa #button-faq-all").hide();
            jQuery(".faq-responsa .question-container-empty").hide();
        });
    }

}
