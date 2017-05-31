/******************************************************************************
 * Nasconde/visualizza la barra di navigazione superiore (#fixie)
 * e visualizza il link di scrolltop se siamo troppo sotto
 * Check eseguito a intervalli per evitare impatto su performance
 ******************************************************************************/
var didScroll;
var lastScrollTop = 0;
var delta = 70;
var navbarHeight = $('.fixed-nav-container').outerHeight();

$(window).scroll(function(event){
  didScroll = true;
});

setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();

  // scroll > delta
  if(Math.abs(lastScrollTop - st) <= delta)
    return;

  if (st > lastScrollTop && st > navbarHeight){
    // scroll down
    $('.fixed-nav-container').removeClass('move-down').addClass('move-up');
  } else {
    // scroll up
    if(st + $(window).height() < $(document).height()) {
      $('.fixed-nav-container').removeClass('move-up').addClass('move-down');
    }
  }

  lastScrollTop = st;

  // show/hide scrollToTop
  if (lastScrollTop > 1200) {
    $('.scrollToTop').show();
  } else {
    $('.scrollToTop').hide();
  }
}
/******************************************************************************/


/******************************************************************************
 * Sticky nav su pagine interne, con range
 ******************************************************************************/
var navbarHeight = $('.fixed-nav-container').outerHeight();
var navbarWidth = $('.fixed-nav-container').width();
var sideNavHeight = $('#side-nav').outerHeight();
var headingHeight = $('#heading').outerHeight();
var mainHeight = $('#main').outerHeight();

$(window).scroll(function() {
  var scrollPos = $(this).scrollTop();
  if ((scrollPos > headingHeight) && (scrollPos < (mainHeight + navbarHeight))) {
    $('#side-nav').addClass('stickme');
  } else {
    $('#side-nav').removeClass('stickme');
  }
});
/******************************************************************************/


/******************************************************************************
 * Form polizze
 ******************************************************************************/
jQuery.validator.setDefaults({
  debug: false,
  success: "valid",
  onkeyup: false
});


/*
var defaultPhone = "";
var country = "it";


function load() {
  
  $('#telefono').val('+39' + defaultPhone);
  $('#telefono').focus();
  
  processPhone();
}


// -------------------------------------------------------------------------   
function clickPhone() {
  //Called when the phone box is clicked

  if ($('#telefono').val() == defaultPhone) {
    $('#telefono').val('');
  }
  
  processPhone();
}


// -------------------------------------------------------------------------   
function processPhone() {
  //Process the phone number

  phone = '+39' + $('#telefono').val();
  
  var country = "it";
  
  if (isValidNumber(phone)) {
    return true;
  } else {
    return false;
  }
}
//*/



$(document).ready(function() {

  console.log('Ready...');
  
  $(document).foundation();
  
  var nav = responsiveNav(".nav-collapse", { // Selector
    animate: true, // Boolean: Use CSS3 transitions, true or false
    transition: 284, // Integer: Speed of the transition, in milliseconds
    label: "\uf0c9", // String: Label for the navigation toggle
    insert: "before", // String: Insert the toggle before or after the navigation
    customToggle: "", // Selector: Specify the ID of a custom toggle
    closeOnNavClick: false, // Boolean: Close the navigation when one of the links are clicked
    openPos: "relative", // String: Position of the opened nav, relative or static
    navClass: "nav-collapse", // String: Default CSS class. If changed, you need to edit the CSS too!
    navActiveClass: "js-nav-active", // String: Class that is added to  element when nav is active
    jsClass: "js", // String: 'JS enabled' class which is added to  element
    init: function(){}, // Function: Init callback
    open: function(){}, // Function: Open callback
    close: function(){} // Function: Close callback
  });    

  // show cookie alert if not set
  var t_cookie = $.cookie('thedarkside');
  console.log(t_cookie);
  if(t_cookie == undefined) {
    $("body").prepend(
      "<div id='wehavecookies'>" +
        "<div data-alert class='alert-box secondary'>" +
          "<!--googleoff: index-->" +
          "<p>Questo sito utilizza cookies di profilazione, propri e di altri siti, per inviarti pubblicità in linea con le tue preferenze. Per saperne di più o negare il consenso <a href='https://www.carrefourbanca.it/home/Disclaimer/Trasparenza/Privacy'>clicca qui</a>. Chiudendo questo banner, scorrendo questa pagina, cliccando su un link o proseguendo la navigazione in altra maniera, acconsenti al loro uso.</p>" +
          "<a href='#' class='close'>&times;</a>" +
          "<!--googleon: index-->" +
        "</div>" +
      "</div>"
    );
    $('.fixed-nav-container').css('top', '2em');
    $.cookie('thedarkside','true', { expires: 365, path: '/' });
  }

  // we love cookies, but we also love to get the alert out of our way when needed...
  $('#wehavecookies .alert-box a').click(function(e) {
    $('#wehavecookies').remove();
    $('.fixed-nav-container').css('top', '0');
  });

  /*** PROFILE UPDATE ALERT ***/
  /*
  // show profile update  alert if not set
  var t_profileupdate = $.cookie('profileupdate');
  //console.log(t_profileupdate);
  if(t_profileupdate == undefined) {
    $("#nav").prepend("\
      <div id='profileupdate'>\
        <div data-alert class='alert-box secondary'>\
          <!--googleoff: index-->\         <p>Aggiorna i tuoi dati nella sezione Homebanking del nostro sito internet per aiutarci a garantirti un servizio sempre migliore. Vai alla pagina <a href='https://onlinebanking.carrefourbanca.it'>onlinebanking.carrefourbanca.it</a></p>\
          <a href='#' class='close'>&times;</a>\
          <!--googleon: index-->\
        </div>\
      </div>"
    );
    //$.cookie('profileupdate','true', { expires: 3, path: '/' });
  }
 
  $('#profileupdate .alert-box a.close').click(function(e) {
    $('#profileupdate').remove();
    $.cookie('profileupdate','true', { expires: 3, path: '/' });
  });
  //*/
  /*** END PROFILE UPDATE ALERT ***/

  /*** MAINTENANCE ALERT ***/
  //*
  // show maintenance alert if not set
  var t_maintenance1 = $.cookie('maintenance2');
  //console.log(t_maintenance1);
  if(t_maintenance1 == undefined) {
    $("#nav").prepend(
      "<div id='profileupdate'>" +
        "<div data-alert class='alert-box secondary'>" +
          "<!--googleoff: index-->         <p>SE SEI TITOLARE DI CARTA PASS TI RICORDIAMO DI CONSULTARE IL TUO <a href='https://onlinebanking.carrefourbanca.it/'>HOME BANKING</a>; UNITAMENTE ALL'ESTRATTO CONTO PUOI TROVARE COMUNICAZIONI IMPORTANTI.</p>" +


          "<a href='#' class='close'>&times;</a>" +
          "<!--googleon: index-->" +
        "</div>" +
      "</div>"
    );
    //$.cookie('maintenance1','true', { expires: 3, path: '/' });
  }

  $('#profileupdate .alert-box a.close').click(function(e) {
    $('#profileupdate').remove();
    $.cookie('maintenance2','true', { expires: 3, path: '/' });
  });
  //*/
  /*** END MAINTENANCE ALERT ***/
  

 
  // opens/closes text notes
  $('.text-note h5').click(function(e) {
    $(this).next().toggleClass('opened');
  });
  
  /*
  $.validator.addMethod("customvalidation",
        function(value, element) {
                return processPhone();
        },
        "Inserire numero di telefono valido"
  );
  //*/
  
  // form validation
  $("#request-form").validate({
    rules:  {
      email:{required:true,email:true},
      nome:{required:true},
      telefono:{required:true/*, customvalidation: true*/},
      privacy:{checked:true},
      destinatario:{required:true}
    },
    submitHandler: function(f){
      $('#request-form input[type=submit]').attr('disabled', 'disabled');
      $('#request-form').submit();
    },
    messages:{
          email: " Inserire indirizzo <b>E-mail</b> valido",
      nome: "Inserire nome",
      telefono: "Inserire telefono",
          privacy:" Accettare le condizioni sulla Privacy",
      destinatario: "Scegliere destinatario"
        },
    errorPlacement: function(error, element) {
      
      if (element.attr("name") == "email"){
        error.appendTo( $("#email-label") );
        //$("#email").addClass("insert_error");
      } else if (element.attr("name") == "nome"){
        error.appendTo( $("#nome-label") );
        //$("#richiesta").addClass("insert_error");
        } else if (element.attr("name") == "telefono"){
        error.appendTo( $("#telefono-label") );
        //$("#richiesta").addClass("insert_error");
        } else if (element.attr("name") == "destinatario"){
        error.appendTo( $("#destinatario-label") );
        //$("#richiesta").addClass("insert_error");
      } else {
      // the default error placement for the rest
        //error.insertAfter(element);
        error.appendTo( $("#privacy-label") );
      }
    }
  });
  
  
});

$(window).load(function() {

  // Mixpanel
  
  // define tracking events only if mixpanel is available (we are in Magnolia's public instance)
  if (typeof mixpanel !== 'undefined') {
  
    // tracking #nav links
    $('#nav a.mxp').each(function(index) {
      link_id = $(this).attr('id');
      mixpanel.track_links("#"+link_id, "Click Navigation Link", {
        "referrer": document.referrer,
        "link_id": link_id
      });
    });
  
    // tracking homepage featured boxes
    $('.home #featured .featured-box a.mxp').each(function(index) {
      link_id = $(this).attr('id');
      mixpanel.track_links("#"+link_id, "Click Featured Box Homepage", {
        "referrer": document.referrer,
        "link_id": link_id
      });
    });
  
    // tracking homepage promo box
    $('.home #promo .promo-box a.mxp').each(function(index) {
      link_id = $(this).attr('id');
      mixpanel.track_links("#"+link_id, "Click Promo Box Homepage", {
        "referrer": document.referrer,
        "link_id": link_id
      });
    });
    
    // tracking homepage boxes links
    $('.home #boxes .links-box a.mxp').each(function(index) {
      link_id = $(this).attr('id');
      mixpanel.track_links("#"+link_id, "Click Box Homepage", {
        "referrer": document.referrer,
        "link_id": link_id
      });
    });
    
    // tracking homepage proposals boxes
    $('.home #proposals .proposals-box a.mxp').each(function(index) {
      link_id = $(this).attr('id');
      mixpanel.track_links("#"+link_id, "Click Proposal Box Homepage", {
        "referrer": document.referrer,
        "link_id": link_id
      });
    });
    
    // tracking internal pages' heading CTAs
    $('.internal #heading a.mxp').each(function(index) {
      link_id = $(this).attr('id');
      mixpanel.track_links("#"+link_id, "Click CTA Internal Page", {
        "referrer": document.referrer,
        "link_id": link_id
      });
    });
    
    // tracking internal pages' contextual boxes
    $('.internal #contextual .featured-box a.mxp').each(function(index) {
      link_id = $(this).attr('id');
      mixpanel.track_links("#"+link_id, "Click Contextual Box Internal Page", {
        "referrer": document.referrer,
        "link_id": link_id
      });
    });
    
    // tracking footer links
    $('#footer .links-box a.mxp').each(function(index) {
      link_id = $(this).attr('id');
      mixpanel.track_links("#"+link_id, "Click Footer Link", {
        "referrer": document.referrer,
        "link_id": link_id
      });
    });
    
  }

});

/*
It's a lonely night
Everybody's happy
Been turning around
Looking for a friendly light
But I see nothing
No eyes, no eyes on me...
*/
