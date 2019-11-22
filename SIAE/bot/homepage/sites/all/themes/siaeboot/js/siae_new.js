// Polyfill for requestAnimationFrame
// via: https://gist.github.com/paulirish/1579671

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
        || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    
    
    jQuery('form#user-login-form').bind("keypress", function(e) {
      if (e.keyCode == 13) {
	e.preventDefault();
	return false;
      }
    });
}());

var timer       = 0;
var siae        = {};
var map;
var myLatLng;
var siaePath = Drupal.settings.siae.siaePath;
var currentlang = jQuery('html').attr('lang');
var isLogginIn = false;
var ticking;

siae.app = (function(){
    "use strict";

    var cache = {
            window              : jQuery(window),
            document			: jQuery(document),
            body                : jQuery('body'),
            headerArea      	: jQuery(".header-area"),
            headerAreaContent	: jQuery(".header-area-content"),
            header          	: jQuery("header"),
            mobileLang 			: jQuery( ".lang-selector li" ),
            newsCarousel    	: jQuery("#news-carousel"),
            initiativesCarousel	: jQuery(".initiatives"),
            faqCarousel     	: jQuery("#faq-carousel"),
            launchSiteCarousel	: jQuery(".launch-site"),
            articleGallery		: jQuery("article .gallery"),
            menuAbout			: jQuery("header .menu_about"),
            menuAboutDD			: jQuery("header .menu_about .dropdown-menu"),
            expandableElements	: jQuery("[aria-expanded]"),
            about 				: jQuery('#about'),
            navbarFixedTop 		: jQuery('.navbar-fixed-top'),
            mainContainer		: jQuery(".main"),
            asideMenu			: jQuery('.aside-menu'),
            asideMenuAbout		: jQuery(".aside-menu .menu_about"),
            stickyAnchor 		: jQuery('[data-sticky-anchor]')
        },
        isHome = jQuery('.home').length,
        isNews = jQuery('.news').length,
        isSiaeTrasparente = jQuery('.siae_trasparente').length;



    var data = {
        window:{
            height      : cache.window.height(),
            menuOffset  : 0
        }
    };

    var showPopup = function() {
        var tempPopup = 
        '<div class="modal fade" id="tempPopupModal"' +
            'style="position: fixed; margin: 80px auto; width: 560px; height: 380px;' +
            'padding: 8px; border-radius:4px; background: #e2e2ea">' +
            '<div class="modal-header">' +
                '<a class="close" data-dismiss="modal">×</a>' +
                '<h3>FONDO DI SOLIDARIETA’</h3>' +
            '</div>' +
            '<div class="modal-body">' +
                '<p>Con Delibera del 20 aprile 2019, il Consiglio di Sorveglianza ha deciso all’unanimità di riconoscere determinati importi agli ex soci (loro congiunti e/o eredi) i quali, per effetto della delibera commissariale n. 86/2011 si erano visti interrompere l’erogazione del c.d. Assegno di Professionalità.<br><br>' +
                'IL DIRETTORE GENERALE<br><br>' +
                'CLICCA <a target="_blank" href="https://www.siae.it/it/iniziative-e-news/fondo-di-solidariet%C3%A0"><b>QUI</b></a> per leggere la delibera</p>' +
            '</div>' +
            '<div class="modal-footer text-center">' +
                '<a data-dismiss="modal" class="btn">chiudi</a>' +
            '</div>' +
        '</div>';
        jQuery('body').prepend(tempPopup);
        var popupModal = jQuery('#tempPopupModal');
        setTimeout(function() {
            if (window.location.pathname === '/it' ||
                window.location.pathname === '/en' ||
                window.location.pathname === '/it/' ||
                window.location.pathname === '/en/') {
                    popupModal.modal('show');
                }
        }, 1000);
    };

    var boot = function(){
        cache.body.append(jQuery("<div/>",{id:"headerHeight"}));
        cache.headerHeight = jQuery("#headerHeight");
        data.window.menuOffset = _getOffset();
    };

    var _getOffset = function(){
        var h = cache.headerHeight.height();
        var stickyAnchor = "";
        if(cache.stickyAnchor.length){
            var stickyAnchor = cache.stickyAnchor.offset().top;
            return (stickyAnchor-h);
        }else if(jQuery("body.home").length){
            var stickyAnchor = jQuery('.hp-categories').offset().top;
            return (stickyAnchor-h);
        }else{
            return h;
        }
    };

    function fullLightMenu(anim){

        var header = jQuery('header'),
            cache = siae.app.cache;

        if( anim === 'full' && header.hasClass('lightMenu') ){

            header.removeClass("lightMenu");

            setTimeout( function(){

                cache.body.removeClass("withLightMenu");
                header.removeClass("lightMenu");
                header.addClass("fullMenu");

            }, 300);

        }

        if( anim === 'light' && header.hasClass('fullMenu') ){

            header.removeClass("fullMenu");

            setTimeout( function(){

                cache.body.addClass("withLightMenu");
                header.removeClass("fullMenu");
                header.addClass("lightMenu");

            }, 300);

        }

    }

    var checkStickyMenu = function( monitor ){

        if( monitor.isAboveViewport ){

            // fullLightMenu('light');

        }

        if( !monitor.isAboveViewport ) {

            // fullLightMenu('full');

        }

    };

    var stickyMenu = function(){

        /* modifica per far vedere il menu superiore in modalità FULLMENU nella pagina di assistenza */
        var stickyAnchor = null;
        if (document.URL.toLowerCase().indexOf("/assistenza") > -1) {
            stickyAnchor = jQuery(".page");
            stickyAnchor.css("margin-top","27px");
        } else {
            stickyAnchor = cache.stickyAnchor.length ? cache.stickyAnchor : jQuery(".main")
        }

        var $header = jQuery('header'),
        //stickyAnchor = cache.stickyAnchor.length ? cache.stickyAnchor : jQuery(".main"),
            monitor = scrollMonitor.create( stickyAnchor);

        $header.addClass('fullMenu');

        monitor.stateChange( function(){ checkStickyMenu(monitor); } );

        checkStickyMenu( monitor );

        /*var $header = jQuery('header'),
            stickyAnchor = cache.stickyAnchor.length ? cache.stickyAnchor : jQuery(".main"),
            monitor = scrollMonitor.create( stickyAnchor );

        $header.addClass('fullMenu');

        monitor.stateChange( function(){ checkStickyMenu(monitor); } );

        checkStickyMenu( monitor );*/

    };

    var checkOffset = function(){
        //console.log( cache.stickyAnchor.offset().top);
        //console.log( cache.window.scrollTop());

        var diff          = cache.window.scrollTop();


        data.lastOffset   = 0;

        if(diff>=data.window.menuOffset){
            data.scrollZone = "light";
            var classCheck = "lightMenu";
        }else{
            data.scrollZone = "full";
            var classCheck = "fullMenu";
        }

        if(!cache.header.hasClass(classCheck)){
            cache.header.removeClass("lightMenu fullMenu");
            clearInterval(timer);
            timer = setInterval(function(){
                checkEndScroll();
            },900);
        }
    };

    var menu = function(){
        //clone copyright in about menu dropdown version
        //jQuery("footer .copyright").clone().appendTo("#about");


        //mobile open menu button
        cache.body.addClass("mm-closed");
        jQuery(".menu-button").on("click",function(){
            cache.body.toggleClass("mm-opened").toggleClass("mm-closed");
            cache.body.toggleClass("noScroll");
            jsMeasures();
        });

        jQuery(".menu_about .separator").parent(".active").addClass("opened");
        cache.document.on("click",".mobile .mobile-menu-container .menu_about .separator, .desktop .aside-menu .menu_about .separator",function(e){
            var parentLI = jQuery(".mobile .mobile-menu-container .menu_about .separator, .desktop .aside-menu .menu_about .separator").parent();
            var parentEl = jQuery(e.target).parent();
            parentLI.not(parentEl).removeClass("opened");
            parentLI.not(parentEl).children("ul").velocity('slideUp', {duration: 400 });
            if(parentEl.hasClass("opened")){
                parentEl.children("ul").velocity('slideUp', {duration: 400 });
                parentEl.removeClass("opened");
            }else{
                parentEl.children("ul").velocity('slideDown', { duration: 400 });
                parentEl.addClass("opened");
            }

        });

        //close menu if click out of button
        cache.document.on("click","body.desktop",function(e) {

            cache.menuAboutDD.velocity('slideUp', {duration: 500 });
            cache.menuAbout.removeClass("opened");
            animateAndRemove(cache.menuAboutDD.find("div"), 'fadeOutUp');
            cache.body.removeClass("noScroll");

        });
        //opne/close menu on botton click
        cache.document.on("click",".desktop .menu_about .dropdown-toggle",function(e) {
            //dropdown
            e.preventDefault();
            resizeAboutMenu();

            // @todo: velocity
            if(cache.menuAbout.hasClass("opened")){

                // chiude
                cache.menuAboutDD.velocity('stop').velocity('slideUp', {
                    duration: 500,
                    begin: function(){
                        cache.body.removeClass('noScroll');
                    }
                });

            }else{

                // apre
                cache.menuAboutDD.velocity('stop').velocity('slideDown', {
                    duration: 500,
                    begin: function(){

                        cache.body.addClass('noScroll');

                    }
                });

            }

            //animation
            if(cache.menuAbout.hasClass("opened")){
                animateAndRemove(cache.menuAboutDD.find("div"), 'slideOutUp');
            }else{
                animateAndRemove(cache.menuAboutDD.find("div"), 'slideInDown');

            }
            cache.menuAbout.toggleClass("opened");
            return false;
        });
    };

    var resizeAboutMenu = function(){
        var menuHeight = cache.navbarFixedTop.height();
        var wHeight = data.window.height;

        cache.about.height(wHeight-menuHeight);

    };
    var headerAnimations = function(){
        setTimeout(function(){
            cache.headerArea.addClass('animated fadeIn');
        },200);

        setTimeout(function(){
            animateAndRemove('.hp-categories', 'op__slideInUp');
            jQuery(".hp-categories").removeClass("toAnimate");
        },900);
        setTimeout(function(){
            animate(".desktop .header-area-content", 'fadeInDown');
            cache.headerAreaContent.removeClass("toAnimate");
        },1100);
        setTimeout(function(){
            cache.headerAreaContent.removeClass('animated fadeInDown');
        },3000);
    };


    var headerArea = function(){
        if(cache.headerArea.length){
            var wheight = cache.window.height();
            
            cache.headerArea.height(wheight);
            //cache.afterBanner.css("margin-top",height+"px");
        }
    };


    var toggleFooter = function(){
        var TopMain = cache.mainContainer.offset().top;
        var BotMain = TopMain + cache.mainContainer.height();
        var scrollTop = cache.window.scrollTop();
        // if(scrollTop>(BotMain-cache.window.height()-100)){
        // $("footer").addClass("visible");
        // }else{
        // $("footer").removeClass("visible");
        // }
        if (scrollTop == cache.document.height() - cache.window.height()) {
            cache.body.addClass("scrollCompleted");
            if(jQuery(".news-loader button").length){
                jQuery(".news-loader button").addClass("animated fadeInUp");
            }
        }
        if(cache.asideMenu.length){
            /*var breadcrumbPositon = jQuery('.breadcrumb').offset().top;

            if(scrollTop>breadcrumbPositon+20){
                cache.asideMenuAbout.children("ul").css({
                    top:-80
                });
            }else{
                cache.asideMenuAbout.children("ul").css({
                    top: -cache.window.scrollTop()
                });
            }*/

            cache.asideMenuAbout.children("ul").css({
                top: -cache.window.scrollTop()
            });

            var asidePadding = cache.window.scrollTop() - (BotMain-cache.window.height());
            if(asidePadding>0){
                cache.asideMenuAbout.height(cache.window.height()-asidePadding);
            }else{
                cache.asideMenuAbout.height(cache.window.height());
            }
        }
    };
    var homeSearchFade = function() {

        var TopView = cache.window.scrollTop();
        var wHeight = cache.window.height();

        if(TopView>1){
             cache.headerAreaContent.css("opacity",(1-(TopView/wHeight)*3+0.05));
        }
        else if(TopView==0){
            cache.headerAreaContent.css("opacity",1);
        }
    };
    var homeAnimations = function(){

        if( isHome ){
            // $( ".services .item, .initiatives .item, .3box > div" ).each(function( index ) {
            // if(isElementVisible($(this))&&(cache.window.width()>1024)){
            // $(this).addClass("animated fadeInUp");
            // }
            // });
            if(isElementVisible(".hp-categories .item:first-child")){
                setTimeout(function(){
                    var catchildren = jQuery(".hp-categories .item");
                    var index = 0;

                    function addClassToNextChild() {
                        if (index == catchildren.length) return;
                        catchildren.eq(index++).addClass("withBullet");
                        setTimeout(addClassToNextChild, 400);
                    }

                    addClassToNextChild();
                },1000);
            }
        }
    };
    var newsCarouselInit = function(){
        //newsOwl = cache.newsCarousel;

        cache.newsCarousel.on("initialized.owl.carousel changed.owl.carousel translated.owl.carousel",function(event){
            owlPrevNext(event);
        });
        cache.newsCarousel.on("initialized.owl.carousel resized.owl.carousel",function(event){

            cache.window.trigger("resize");

        });

        cache.newsCarousel.owlCarousel({
            loop:true,
            center: true,
            nav:true,
            navText: ['',''],
            margin:10,
            items:1,
            info:true,
            autoWidth: true,
            smartSpeed:400,

            slideBy:4,
            dots:true,
            responsive : {
                // breakpoint from 0 up
                0 : {
                    slideBy:1,
                    items:1,
                    dots:true,
                    nav:false
                },
                // breakpoint from 480 up
                420 : {
                    slideBy:2,
                    items:2,
                    dots:true
                },
                // breakpoint from 700 up
                700: {
                    items: 2
                },
                // breakpoint from 768 up
                1000 : {
                    slideBy:3,
                    items:3,
                    nav:true,
                    dots:false
                },
                1024: {
                    margin: 32,
                    items: 3
                },
                1200 : {
                    slideBy:4,
                    items:4,
                    nav:true
                },
                1690 : {
                    slideBy:5,
                    items:5,
                    nav:true
                }
            }
        });
    };
    var initiativesCarouselInit = function(){
        cache.initiativesCarousel.owlCarousel({
            loop:false,
            margin:0,
            nav:false,
            pagination:true,
            items:1,
            responsive: true,
            autoHeight:true
        });
    };
    var initiativesCarouselHeight = function(){
        jQuery(".initiatives.owl-carousel .content a, .initiatives.owl-carousel .owl-height").height(cache.window.width()*1.2);
    };
    var faqCarouselInit = function(){
        cache.faqCarousel.on("initialized.owl.carousel resized.owl.carousel",function(event){

            cache.window.trigger("resize");

        });
        cache.faqCarousel.owlCarousel({
            singleItem: true,
            items : 1,
            navText:["‹","›"],
            nav:true,
            dots:true,
            loop:true
        });
    };
    var launchSiteCarouselInit = function(){
        cache.launchSiteCarousel.owlCarousel({
            singleItem: true,
            items : 1,
            nav:false,
            dots:true,
            loop:true
        });
    };
    var mobileCarouselInit = function(){
        jQuery(".xs-carousel").owlCarousel({
            singleItem: true,
            items : 1,
            nav:false,
            dots:true,
            loop:true
        });

        jQuery(".newsList.related").on("initialized.owl.carousel resized.owl.carousel",function(event){

            cache.window.trigger("resize");

        });
        jQuery(".newsList.related").owlCarousel({
            singleItem: true,
            items : 1,
            nav:false,
            dots:true,
            loop:true,
            responsive : {
                // breakpoint from 0 up
                0 : {
                    items:1
                },
                380 : {
                    items:2
                }
            }
        });
    };
    var articleGalleryInit = function(){
        cache.articleGallery.owlCarousel({
            loop:false,
            dots:true,
            center:true,
            responsive : {
                // breakpoint from 0 up
                0 : {
                    items:1,
                    autoWidth:false,
                    margin:15
                },
                // breakpoint from 480 up
                600 : {
                    items:1,
                    autoWidth:false,
                    margin:15
                },
                // breakpoint from 768 up
                1000 : {
                    items: 2.5,
                    autoWidth:false,
                    margin:15
                }
            }
        });

        jQuery(".gallery .owl-item").on("click",function(e){
            e.preventDefault();
            if(!jQuery(this).hasClass("active center")){
                var $parent = jQuery(this).closest(".owl-carousel");
                $parent.find(".owl-controls .owl-dot").eq(jQuery(this).index()).trigger("click");
            }
        });

        jQuery('.gallery .owl-item a').on("click", function (event) {
            event = event || window.event;
            var target = event.target || event.srcElement,
                link = target.src ? target.parentNode : target,
                options = {index: link, event: event},
                links = jQuery('.gallery .owl-item a');
            blueimp.Gallery(links, options);
        });
    };
    var newsFiltersCarouselInit = function(){
        jQuery(".newsFilters").owlCarousel({
            loop:true,
            dots:false,
            center:true,
            autoWidth:true,
            items: 3,
            responsive:{
                660:{
                    items:4,
                    loop:false,
                    autoWidth:false,
                    center:false
                }
            }
        });

        /* commentato per iniziative news

        jQuery('.newsFilters').on('click', '.owl-item', function(e) {

            e.preventDefault();
            // console.log(e.item.index);
            var toIndex = jQuery(this).children().attr("data-filter");
            jQuery(this).closest('.newsFilters').find("[data-filter="+toIndex+"]").addClass("current");
            jQuery(this).closest('.newsFilters').find("[data-filter!='"+toIndex+"']").removeClass("current");
            jQuery('.newsFilters').trigger('to.owl.carousel',[toIndex,1,true]);

        }); */


    };




    var page404 = function(){
        setTimeout(function(){
            jQuery(".animate-container").stop(false, false).velocity({
                delay: 5000,
                top:  0,
                opacity:1
            }, 2500, [100, 10]);
        },100);
        jQuery(".errorPage article hr").stop(false, false).velocity({
            width:"75%"
        }, 2500, [100, 10]);
    };
    var page404resize = function(){
        var errorContainer = jQuery("article.error");
        errorContainer.css("margin-top",(cache.window.height()-errorContainer.height())/2);
    };

    var jsMeasures = function(){

        //cache.body.css("padding-bottom",$("footer").innerHeight());
        //mobile menu height
        jQuery(".mm-main").height(jQuery(".mobile-menu-container").height()-42);

    };
    var mobileShare = function() {

        jQuery(".shareContainer" ).clone().prependTo( "body" );
        jQuery(".mobile-share-close").on("click",function(){

            var shareContainer = cache.body.find('> .shareContainer');

            shareContainer.velocity({
                opacity: [0, 1]
            },{
                duration: 400,
                complete: function(){

                    shareContainer.css({ display: 'none'});

                }
            });

            cache.body.removeClass("noScroll");
        });
        jQuery(".mobile-share").on("click",function(){

            var shareContainer = cache.body.find('> .shareContainer');

            shareContainer.velocity({
                opacity: [1, 0]
            },{
                duration: 400,
                begin: function(){

                    shareContainer.css({ display: 'block' });

                }
            });

            cache.body.addClass("noScroll");
        });
    };

    var contentManipulation = function(){
        //HEADER for mobile
        cache.body.append("<div class='mobile-menu-container'><div class='mm-main'><header></header><div class='menu_about'></div></div><ul class='lang-selector'></ul></div>");
        jQuery(".page header .logo").clone().appendTo(".mobile-menu-container header");
        jQuery(".menu-button").clone().prependTo(".mobile-menu-container");
        jQuery(".right-menu").clone().insertAfter(".mobile-menu-container header");
        jQuery("header #about.dropdown-menu > div").clone().appendTo(".mm-main .menu_about");
        jQuery(".lang-selector li").clone().appendTo(".mobile-menu-container .lang-selector");
        jQuery(".menu-responsive-logged").insertAfter(".mobile-menu-container header");
        jQuery(".menu-responsive-logged").show();

        //jQuery("#menu-services-logged").clone().insertAfter(".mobile-menu-container header");

        jQuery(".menu-responsive-not-logged").insertAfter(".mobile-menu-container header");

        //move footer logo mobile
        jQuery(".br-right" ).clone().prependTo( ".copyright" );
        //about us - page "Strutturta e organizzazione"
        if(jQuery(".white-box.organization").length){
            jQuery("h4 span").clone().prependTo("h4").addClass("mobile-only");
            jQuery(".white-box .introText").clone().insertAfter(".white-box .vCenter").addClass("mobile-only");
            jQuery(".read-more").on("click",function(e){
                e.preventDefault();
                jQuery(this).closest(".organization").addClass("opened");
            });
            jQuery(".white-box .less .btn").on("click",function(e){
                e.preventDefault();
                jQuery(this).closest(".organization").removeClass("opened");
            });
        };

        //search layout - page footer
        jQuery("footer").clone().appendTo(".searchOverPage");
        
        if( isSiaeTrasparente ) {
            if (cache.window.width() < 974) {

                var parentOpened = "no_selected_parent";

                var container_aside_menu = "<div id='main_container_aside_menu' class='menu_about'><div class='closed' id='id_container_aside_menu'><span class='separator'><span class='nolink'>Siae Trasparente</span></span></div></div>";

                jQuery(".hide-mobile-siae-trasperente").attr('style', 'display: none !important');

                jQuery(".mobile-menu-container .menu_about").before(container_aside_menu);

                var aside_menu_mobile = jQuery(".aside-menu .menu_about").children().attr("id", "ulSiaeTrasparente");

                var menu_item_trasparente = "<li id='siae_trasperente_home_mobile' class='parent'><a href='/it/chi-siamo/la-siae/siae-trasparente'>Siae Trasparente - Home</a></liclass>";

                jQuery('#ulSiaeTrasparente').prepend(menu_item_trasparente);

                jQuery('#main_container_aside_menu').append(aside_menu_mobile);

                aside_menu_mobile.hide();

                jQuery(".aside-menu").show();

                jQuery("#id_container_aside_menu").click(function () {
                    if (jQuery("#id_container_aside_menu").hasClass("closed")) {
                        jQuery("#id_container_aside_menu").addClass("menu_opened");
                        jQuery("#id_container_aside_menu").removeClass("closed");
                        jQuery("#ulSiaeTrasparente").slideDown(1000);
                    } else {
                        jQuery("#id_container_aside_menu").addClass("closed");
                        jQuery("#id_container_aside_menu").removeClass("menu_opened");
                        if (parentOpened != "no_selected_parent") {
                            parentOpened.removeClass("opened");
                            parentOpened.find("ul").slideUp(700);
                        }
                        jQuery("#ulSiaeTrasparente").slideUp(1000);
                    }
                });

                jQuery("#ulSiaeTrasparente .parent").click(function () {
                    parentOpened = jQuery(this);
                });

            }

        }else{
            bindWindowRotation(cache.window.width());
            jQuery(window).on("orientationchange",function(){
                bindWindowRotation(cache.window.width());
            });
        }
    };

    var followScrollButton = function(){
        if(jQuery('.follow-scroll-bottom').length){
            // for news detail article page
            var element = jQuery('.follow-scroll-bottom');
            var eHeight = element.height();
            cache.window.on('scroll resize', function(event) {
                var scrollTop = cache.window.scrollTop();
                var wHeight = cache.window.height();
                var cntOffset = jQuery("#cnt-follow-offset").offset().top;
                // element.stop(false, false).animate({
                // top:  ((scrollTop+wHeight)>cntOffset) ? 0 : scrollTop-cntOffset+wHeight-(eHeight*2)
                // }, 0);

                if( scrollTop + wHeight < wHeight * 1.2  ){

                    element.css({
                        transform: 'translateY(200%)',
                        transition: 'transform .3s ease-out'
                    })

                } else {

                    element.css({
                        transform: 'translateY(0%)'
                    })

                }

                if((scrollTop+wHeight)>cntOffset){
                    element.removeClass("fixed");
                }else{
                    element.addClass("fixed");
                }
            });
            cache.window.trigger("scroll");
        }

        if(jQuery('.top-article-navigation').length){
            // for news detail article page
            var topArticleNav = jQuery('.top-article-navigation');
            var articleNav = jQuery('article .navigation');
            var breadcrumbPositon = jQuery('.breadcrumb').offset().top;
            cache.window.on('scroll resize', function(event) {
                var scrollTop = cache.window.scrollTop();
                var lightMenuHeight = jQuery(".lightMenu").height();
                var topHeight = jQuery(".top-article-navigation").height();
                // topArticleNav.stop(false, false).velocity({
                // top:  (scrollTop<breadcrumbPositon) ? -50 : topHeight*1.2
                // },500);
                if(scrollTop>breadcrumbPositon){
                    articleNav.addClass("out");
                }else{
                    articleNav.removeClass("out");
                }
            });
            cache.window.trigger("scroll");
        }
    };

    var bindWindowRotation = function(windowWidth){

            if (windowWidth < 974) {
                jQuery(".hide-mobile-siae-trasperente").removeClass("visible-xs");
            }else{
                jQuery(".hide-mobile-siae-trasperente").addClass("visible-xs");
            }

    }

    var scrollDirection = function(){
        var _top = cache.window.scrollTop();
        var _direction;
        cache.window.scroll(function(){
            var _cur_top = cache.window.scrollTop();
            if(_top < _cur_top)
            {
                _direction = 'down';
                cache.body.addClass("directionDown");
                cache.body.removeClass("directionUp");
            }
            else
            {
                _direction = 'up';
                cache.body.addClass("directionUp");
                cache.body.removeClass("directionDown");
            }
            _top = _cur_top;
        });
    };
    var collapseParentChild = function(){
        if(jQuery(".collapse-parent-child").length){
            jQuery('.collapse-parent-child').click(function(e){
                e.preventDefault();
                var targetChild = "."+jQuery(this).data("target");
                jQuery(this).closest(".collapse-parent").toggleClass("collapsed").children(".full").collapse('toggle');
            });
        }
    };
    var searchOverlay = function(){
        //search
        var $inputSearch = jQuery(".searchOverPage #search"),
            $searchOverlay = jQuery(".searchOverPage"),
            $body = cache.body;

        /*
        jQuery('form.search-form').on('submit', function(e){
            e.preventDefault();
        });
        */

        // constructs the suggestion engine
        var searchwords =  ["Diritto d’autore normativa", "Diritto di recesso", "Diritto di prelazione"];
        var searchwords = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: searchwords
        });

        $inputSearch.typeahead({
                hint: true,
                minLength: 1,
                highlight: false
            },
            {
                name: 'searchwords',
                source: searchwords
            }
        );
        //add class searchCompleted for results animation
        $inputSearch.bind('typeahead:select', function(ev, suggestion) {
            $searchOverlay.addClass("searchCompleted");
            $inputSearch.blur();
        });

        jQuery(".main-search-form .reset").on("click",function(){
            $inputSearch.typeahead('val', '');
        });

        /*function removeSearchOverlay(){
            $body.removeClass("searchOpened");
            $searchOverlay.removeClass("open");
            $inputSearch.blur();
        }*/
        function openSearchOverlay(){
            $body.addClass("searchOpened");
            $searchOverlay.addClass("open");

            jQuery('input#search').focus();
        }
        jQuery("button.opensearch").on("click",function(){
            openSearchOverlay();

        });
        /*jQuery(".searchOverPage .close,.searchOverPage .go-back").on("click",function(){
            removeSearchOverlay();
        });*/


        /*cache.document.keypress(function(e) {
            var inp = String.fromCharCode(event.keyCode);
            if (jQuery(e.target).is('input, textarea')) {
                return;
            }else if(/[a-zA-Z0-9-_ ]/.test(inp)){
                openSearchOverlay();
            }
        });
        $body.keyup(function(e) {
            if (e.keyCode == 27) {
                removeSearchOverlay();
            }
        });*/

        jQuery(".searchresults_item").on("click",function(){
            var link = jQuery(".link a",this);
            var url = link.attr('href');
            //var target = (link.attr('target')) ? link.attr('target') : "_self";
            window.open(url,'_self');
        });
    };

    var destroyMobileCarousels = function(){

        if(typeof cache.initiativesCarousel.data('owlCarousel') != 'undefined') {
            cache.initiativesCarousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
            cache.initiativesCarousel.find('.owl-stage-outer').children().unwrap();
        }
        if(typeof cache.launchSiteCarousel.data('owlCarousel') != 'undefined') {
            if(jQuery(".launch-site.owl-carousel").length){
                cache.launchSiteCarousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
                cache.launchSiteCarousel.find('.owl-stage-outer').children().unwrap();
            }
        }
        jQuery(".xs-carousel").trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        jQuery(".xs-carousel").find('.owl-stage-outer').children().unwrap();

        jQuery(".newsFilters").trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        jQuery(".newsFilters").find('.owl-stage-outer').children().unwrap();

        jQuery(".newsList.related").trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        jQuery(".newsList.related").find('.owl-stage-outer').children().unwrap();
    };

    function onResize() {
        requestTick();
    }

    /**
     * Calls rAF if it's not already
     * been done already
     */
    function requestTick() {
        if(!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }

    /**
     * Our animation callback
     */
    function update() {

        data.window.height = cache.window.height();
        data.window.menuOffset = _getOffset();
        data.window.width = cache.window.width();


        //opHero.init();

        equalheight('.hp-categories .item');

        if( isHome ){

            equalheight('.3box .license-box,.3box .archivio-opere,.3box .faq');

        }
        if( isNews ){

            equalheight('.news .item');

        }

        resizeAboutMenu();

        // jsMeasures();
        if(data.window.width < 600){
            initiativesCarouselInit();
        }
        if(data.window.width < 974){

            if(!cache.body.hasClass("mobile")){
                cache.body.removeClass("desktop").addClass("mobile");
            }

            launchSiteCarouselInit();
            initiativesCarouselHeight();
            mobileCarouselInit();
            newsFiltersCarouselInit();

        }else{

            if(!cache.body.hasClass("desktop")){
                cache.body.removeClass("mobile").addClass("desktop");
            }

            destroyMobileCarousels();

            cache.body.addClass("mm-closed").removeClass("mm-opened");

            cache.navbarFixedTop.css("height","auto");
            cache.body.removeClass("noScroll");
            jQuery("body > .shareContainer").fadeOut();
            jQuery(".initiatives .content a").css("height","auto");
        }

        page404resize();
        headerArea();
        // allow further rAFs to be called
        ticking = false;
    }


    var events = function(){

        cache.window.scroll(function () {

            //checkOffset();

            homeAnimations();
            homeSearchFade();
            jsMeasures();
            toggleFooter();

            jQuery("header .dropdown-toggle[aria-expanded='true']").click();
        });

        cache.window.on('resize', onResize );

    };

    // Handles Bootstrap switches
    var handleBootstrapSwitch = function() {
        if (!jQuery().bootstrapSwitch) {
            return;
        }
        jQuery('.myNewsletter').bootstrapSwitch();
    };

    var responsiveBkgHomepage = function () {
        var totaleImmagini=6;
        var randomNumber = Math.round(Math.random()*(totaleImmagini-1))+1;
        if(cache.window.width() > 470) {
            var imgPathHome = ('homepage/sites/all/themes/siaeboot/img/banners/siae-home-' + randomNumber + '.jpg'); //il percorso può essere relativo o assoluto
        }else{
            var imgPathHome = ('homepage/sites/all/themes/siaeboot/img/banners/siae-home-mobile-' + randomNumber + '.jpg'); //il percorso può essere relativo o assoluto
        }
        if (jQuery('#breaking-news-box').length==0) {
            jQuery('.header-area').css('background-image', ('url("'+imgPathHome+'")'));
        }
        jQuery('.header-area').css('background-size', 'cover');
        jQuery('.header-area').css('background-repeat', 'no-repeat');
        jQuery('.header-area').css('background-position', 'center top');

    }

    return {
        cache:cache,
        data:data,
        init:function(){

            boot();
            // disabilita il popup 
            // showPopup(); 
            // checkOffset();

            stickyMenu();


            headerArea();

            /*var wow = new WOW({
             offset: 100,
             mobile: false
             });*/

            jQuery(".home .news,.central-boxes > section").addClass("wow op__slideInUp");

            //wow.init();

            searchOverlay();
            homeAnimations();
            newsCarouselInit();
            mobileShare();
            articleGalleryInit();

            contentManipulation();
            events();
            handleBootstrapSwitch();

            responsiveBkgHomepage();

            if(cache.window.width() < 600){
                initiativesCarouselInit();
                initiativesCarouselHeight();
            }

            if(cache.window.width() < 974){
                jQuery("#menu_login").click(function () {
                    jQuery(window.location).attr('href', siaePath+'/'+currentlang+'/servizi-online');
                });

                launchSiteCarouselInit();
                mobileCarouselInit();
                newsFiltersCarouselInit();
                if(!cache.body.hasClass("mobile")){
                    cache.body.removeClass("desktop").addClass("mobile");
                }
            }else{
                if(!cache.body.hasClass("desktop")){
                    cache.body.removeClass("mobile").addClass("desktop");
                }
            }

            headerAnimations();

            menu();
            faqCarouselInit();

            equalheight('.hp-categories .item');
            equalheight('.news .item');

            equalheight('.3box .license-box,.3box .archivio-opere,.3box .faq');

            followScrollButton();

            jsMeasures();

            jQuery('.nav-tabs').tab();
            cache.asideMenuAbout.perfectScrollbar();
            // setTimeout(function(){
            // toggleFooter();
            // },500);
//
            initGoogleMap(jQuery(".geoGMap").eq(0));
            //initGoogleMap({lat:"no-text",lng:44});

            page404();
            scrollDirection();
            collapseParentChild();

            cache.window.trigger('resize');

        }
    };
})();

function hiderLoader(){

    jQuery('.pageLoader').hide();
    jQuery('#loaderRec').hide();
    jQuery('#loaderReg').hide();
    jQuery('#modalContentReg').show();
    jQuery('#modalContentRec').show();
}
//Funzione per non far chiudere il menu servizi al click newsletter
var newsletterSetting =  function () {
    jQuery(".bootstrap-switch-id-newsletterUserSetting").click(function( event ) {
        event.stopPropagation();
    });
}

//EFFETTO FADE MENU SERVIZI
var initMenuServizi = function(){
    jQuery('.dropdown').on('show.bs.dropdown', function(e){
        jQuery(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });

    // ADD SLIDEUP ANIMATION TO DROPDOWN //
    jQuery('.dropdown').on('hide.bs.dropdown', function(e){
        e.preventDefault();
        jQuery(this).find('.dropdown-menu').first().stop(true, true).slideUp(800, function(){
            jQuery('.dropdown').removeClass('open');
			//TODO:controllare sotto errato 2018-06 CS
			//jQuerysites/all/themes/siaeboot/js/siae_new.js('.dropdown').find('.dropdown-toggle').attr('aria-expanded','false');
			jQuery('.dropdown').find('.dropdown-toggle').attr('aria-expanded','false');
        });

    });
}



// REGISTRAZIONE & RECUPERO USER/PSWD MODALE
var myRegistrationDialog =  function () {

    var page = "";
    if (!isLogginIn) {
        logMexSetMessageLoginErr('');
    }

    jQuery( "#user-login-form .input__field" ).change(function() {

        if(jQuery(this).val() != ''){
            jQuery(this).closest('.input--juro').addClass('input--filled');
        }else{
            jQuery(this).closest('.input--juro').removeClass('input--filled');
        }
    });

    jQuery( "#myRegistration .input__field" ).change(function() {
        if(jQuery(this).val() != ''){
            jQuery(this).closest('.input--juro').addClass('input--filled');
        }else{
            jQuery(this).closest('.input--juro').removeClass('input--filled');
        }
    });

    jQuery( "#menu_login" ).click(function( event ) {
        jQuery( "#errorMessage").html('');
        jQuery( ".alert").html('');
        jQuery( ".input__label").removeClass('errorFields-label');
        jQuery( ".input").removeClass('input--filled');
        jQuery( ".input__field--juro").val('');
    });

    jQuery( "#btn-to-reg" ).click(function( event ) {
        jQuery("#myLogin .close").click ();
        //jQuery('#loaderReg').show();
        jQuery(".pageLoader").show();
        jQuery('#modalContentReg').hide();
        page = siaePath+"/it/siae/user/registration";
        jQuery('#myRegistration #regFrameContainer').remove();
        jQuery('#myRegistration .modal-body').append('<div id="regFrameContainer"><iframe id="regFrame" onload="hiderLoader()" class="reg-frame" style="border: 0px; " src="' + page + '" width="100%" height="538px"></iframe><div>');
    });

    jQuery( "#restoreUserData" ).click(function( event ) {
        jQuery("#myLogin .close").click ();
        jQuery(".pageLoader").show();
        jQuery('#modalContentRec').hide();
        page = siaePath+"/it/siae-auth-user/data-recover";
        jQuery('#recoverUserData #dataRecFrameContainer').remove();
        jQuery('#recoverUserData .modal-body').append('<div id="dataRecFrameContainer"><iframe id="recoverFrame" onload="hiderLoader()" class="recover-frame" style="border: 0px;" src="' + page + '" width="100%" height="522px"></iframe><div>');
    });

    /*
    
    jQuery( ".backToLogin" ).click(function( event ) {
        jQuery("#myRegistration .close-white").click();
        jQuery("#menu_login").click();
    });
    */
}

var checkStatoSito = function () {

    jQuery.ajax({
        url: siaePath+"/it/services/users/stato_sito.json",
        dataType: 'json',
        async: false,
        success: function(json) {
            jQuery('body').waitMe('hide');

	    
            jQuery("#errorMessage").html("").hide();
	    
            if(json == null || json['KO'] == true) {

            }else {
                var statoSito = jQuery("#statoSito");
                if(json.online == false){
                    jQuery("#user-login-form").hide();
                    statoSito.show();
                    statoSito.html(json.corpo);
                    //jQuery("#statoSito").html("I servizi online non sono al momento disponibili. Riprovare in un secondo momento.");
                }else{
                    jQuery("#user-login-form").show();
                    statoSito.hide();
                    statoSito.html("");
                    if(json.corpo != ""){
                        jQuery("#msgStatoSito").html(json.corpo).show();
                    }
                    // CODICE PER TESTARE IL CASO DI STATO.ONLINE == FALSE
                    /*jQuery("#user-login-form").hide();
                     jQuery("#statoSito").show();
                     jQuery("#statoSito").html("I servizi online non sono al momento disponibili. Riprovare in un secondo momento.");*/
                }
            }
        }
    });

};

var getVisible = function() {
    var $el = jQuery('footer'),
    scrollTop = jQuery(this).scrollTop(),
    scrollBot = scrollTop + jQuery(this).height(),
    elTop = $el.offset().top,
    elBottom = elTop + $el.outerHeight(),
    visibleTop = elTop < scrollTop ? scrollTop : elTop,
    visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
    var effectiveVisible = visibleBottom - visibleTop;
    return effectiveVisible;
}



var bodyPositionFooter = function() {
    jQuery('html, body').animate({
        scrollTop: 1
    }, 100);
    if(jQuery( '.node-static-content' ).is(":visible") && (jQuery( "body" ).height() < jQuery(window).height())){
        jQuery( 'body' ).css('background','#f6f6f6');
        var heightDiff = jQuery(window).height() - jQuery( "body" ).height();
        var blocksystemmainheight = jQuery( '.node-static-content' ).height();
        var blockfooterheight = jQuery( 'footer' ).height();
        var newblocksystemmainheight = blocksystemmainheight  + heightDiff - blockfooterheight + 235;
        jQuery( '.node-static-content' ).css('min-height',newblocksystemmainheight+'px');
    }else{
        var windowHeight = jQuery(window).height();
        var visibleFooterHeight = getVisible();
        var heightAsideAboutMenu = windowHeight - visibleFooterHeight;
        jQuery(".aside-menu .menu_about").height(heightAsideAboutMenu);
    }
}


jQuery(document).ready(function () {
    siae.app.init();
    bodyPositionFooter();
/* 
    jQuery("#modale_messaggio_elezioni").modal({
        keyboard: false,
        backdrop: 'static'
    }); 
*/
    if(Drupal.settings.userIsLogged){
        checkAnagraficaCompletaUtente();
    }

    /*
    jQuery('.find-more-button').click(function () {
        var url = siaePath+'/it/chi-siamo/uffici-e-contatti/contatti';
        window.open(url,'_parent');
    });
    */
    if( jQuery("#sliding-popup").is(':visible')) {
        jQuery('body').addClass('modal-open');
    }
    if( jQuery("#node-488").is(':visible')) {
        jQuery('.modal-open').css('overflow', 'auto');
    }

    myRegistrationDialog();
    newsletterSetting();
    //initMenuServizi();
    //jQuery("#newsletterUserSetting").bootstrapSwitch();
    initlogin();
    siaeGSA();
    //setFocusAccedi();

    jQuery("#menu_login").click(function () {
        run_waitMe('body');
        checkStatoSito();
    });

    if(null==UserUtils.userInfo){
        jQuery("#new_anonym_menu_login").click(function( event ) {
            jQuery(window.location).attr('href', siaePath+'/'+currentlang+'/servizi-online');
        });
    }

    genera_link_accedi();
    facet_active_links();

    jQuery(".button-container #button-authors").on("click", function(){
        jQuery("#responsa_faq").fadeIn( "slow" );
        jQuery("#utilizers_faq").hide();
        jQuery("#button-authors").addClass("button-authors-clicked");
        jQuery("#button-utilizers").removeClass("button-utilizers-clicked");

    });

    jQuery(".button-container #button-utilizers").on("click", function(){
        jQuery("#responsa_faq").hide();
        jQuery("#utilizers_faq").fadeIn( "slow" );
        jQuery("#utilizers_faq").css("display","block");
        jQuery("#button-utilizers").addClass("button-utilizers-clicked");
        jQuery("#button-authors").removeClass("button-authors-clicked");
    });
    if (jQuery(".custom-error-message").html() !== "") {

        var errorMsg = jQuery(".custom-error-message").html();
        var duplicateEmailErrorText = jQuery("#duplicateEmailErrorText").html();
        if (errorMsg && errorMsg === duplicateEmailErrorText) {
            // MB: mostro la modale per email duplicata
            jQuery('#email_doppia_login').modal({backdrop: 'static', keyboard: false});
        } else {
            // MB: mostro il messaggio di errore
            if (!jQuery('#errorMessage').length) {
                jQuery(".custom-error-message").after('<div id="errorMessage" class="error-message-white-du"></div>');
            }
                jQuery('#errorMessage').html(errorMsg).show();
            jQuery(".custom-error-message").html("");
            // MB: setto questa variabile per evitare che venga cancellato il messaggio di errore
            isLogginIn = true;
        }

    }
});



logMexSetMessageLoginErr = function (textData) {
    jQuery("#errorMessage").html(textData);
    jQuery("#errorMessage" ).addClass("error-message");
}

function siaeNewHideErrorMessage(event) {
    //jQuery( "#errorMessage").html('');
    //jQuery( "#errorMessage_recover_password").html('');
    //jQuery( ".alert").html('');
}

/*function siaeNewHideErrorMessageFocus(event) {
    jQuery( ".alert").html('');
}*/

var validateNumber = function(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8) {
        return true;
    } else if ( key < 48 || key > 57 ) {
        return false;
    } else if ( event.keyCode === 46 ) {
        return false;
    } else {
        return true;
    }
};




jQuery(document).ajaxComplete(function () {

    myRegistrationDialog();
    var val = jQuery("#myLogin .input__field").val();

    if(null != val && val != '') {
        jQuery('.input__label--juro').addClass('errorFields-label');
        jQuery('.input__label-content--juro').addClass('errorFields-input-login');
    }

    //jQuery( ".input__field" ).focus(jQuery( ".alert").html(''));

    jQuery("#edit-name--2").attr('id', 'edit-name');
    jQuery("#edit-pass--2").attr('id', 'edit-pass');
    jQuery("#edit-name").removeClass('form-control');
    jQuery("#edit-pass").removeClass('form-control');

    jQuery("input[id^=edit-step-1-input-cellulare-check--2]").keypress(validateNumber);

});

setTimeout(function(){
    jQuery("body").addClass("loaded");
    jQuery(".pageLoader").show();
    jQuery(".pageLoader").fadeOut("slow");
},500);

logMexsetMessage = function (textData){
    jQuery( "#errorMessage" ).html(textData);
}

var siaeGSA = function(containerSelector) {
    jQuery( ".page-home #edit-submit" ).append( jQuery( "<span id=\'iconSearch\' class=\'icon-search\'></span>" ) );
    jQuery( "#edit-submit" ).removeClass( "btn btn-primary form-submit" );
    jQuery( "#edit-submit" ).addClass( "search-button" );
    //jQuery( '.search-container #edit-submit').removeClass("icon-search");
    jQuery( '.search-container #iconSearch').removeClass("icon-search");
    //jQuery( ".opensearch" ).append( jQuery( "<span class=\'icon-search\'></span>" ) );
}

var siaeFormPrefillStyle = function(containerSelector) {
    if(typeof(containerSelector)=='undefined'){
        containerSelector = 'body';
    }
    jQuery( ''+containerSelector+' .form-control').each(function(){
        if(jQuery( this ).val() != ''){
            jQuery( this ).closest('div').addClass('input--filled');
        }
    });

    jQuery( ''+containerSelector+' .form-control').each(function(){
        var parentDiv = jQuery( this ).closest('div');
        if(jQuery( this ).val() != ''){
            parentDiv.addClass('input--filled');
        }
        if(parentDiv.hasClass('sol_select')){
            var thisText = jQuery(this).find('option:selected').text();
            jQuery(parentDiv).find('.select2-selection__rendered').html(thisText);
        }

    });

}

initlogin = function (){

    jQuery('#edit-name').val("");
    jQuery('#edit-pass').val("");

    jQuery( "#myLogin" ).bind('keypress', function(e) {
        if(e.keyCode==13){
            jQuery( "#buttonAvanti" ).click();
        }
    });


    jQuery( "#buttonAvanti" ).click(function( event ) {
        isLogginIn = true;
        event.preventDefault();

        if(null==jQuery('#edit-name').val() || jQuery('#edit-name').val()=="") {
            logMexsetMessage("Inserire il nome utente per proseguire");
            jQuery('.input__label--juro').addClass('errorFields-label');
            event.preventDefault();
            return;
        }
        if (null==jQuery('#edit-pass').val() || jQuery('#edit-pass').val()==""){
            logMexsetMessage("Inserire la password per proseguire");
            jQuery('.input__label--juro').addClass('errorFields-label');
            return;
        }
         if(jQuery('#edit-name').val() && jQuery('#edit-pass').val()){
             //var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
             // MB, BT: regexp per indirizzo email valido con supporto ad indirizzi unicode, nuovi domini ICANN e sottodomini
             var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
             if (!regex.test(jQuery('#edit-name').val().trim())) {
                 jQuery('#comunicazione_annulla_nome_utente').modal({backdrop: 'static', keyboard: false});
                 //jQuery("header").css("z-index", 'auto');
                 //jQuery('.input__label--juro').addClass('errorFields-label');
             } else {
                 // nuovo sviluppo per cambio email utenza con più mail associate ad account
                 // faccio chiamata a bpmServices/login per vedere se c'e' response doppia email
                 // in caso affermativo apro modale per andare al cambio della email
                 // Successivamente chiamerò il submit.
                 siae_new_login(jQuery('#edit-name').val(), jQuery('#edit-pass').val());
             }
        }
        //jQuery("#user-login-form").submit();
    });

    jQuery( "#edit-name" ).focus(function( event ){
        jQuery( "#errorMessage").html('');
        jQuery('.input__label-content').removeClass('errorFields-label');
        jQuery(".input__label--juro").removeClass("errorFields-label");
    });

    jQuery( "#edit-pass" ).focus(function( event ){
        jQuery( "#errorMessage").html('');
        jQuery('.input__label-content').removeClass('errorFields-label');
        jQuery(".input__label--juro").removeClass("errorFields-label");
    });

    jQuery(".assistenzaLogin").click(function(){
        jQuery(window.location).attr('href', '/richiestaAssistenza/1');
    })

    siaeFormPrefillStyle();
    
    jQuery( "#returnBackReg").click(function() {
	  jQuery("#modalContentReg .close-white").click();
	  jQuery("#menu_login").click();
    });

    jQuery( "#returnBackRec").click(function() {
        jQuery("#modalContentRec .close-white").click();
        jQuery("#menu_login").click();
    });
}

function run_waitMe(idValue,exception){
    if(exception !=1){
        idValue = 'body';
    }
    jQuery(idValue).waitMe({
        effect: 'rotation',
        text: '',
        bg: 'rgba(48,74,51,0.5)',
        color:'#ffffff',
        sizeW:'',
        sizeH:'',
        source: 'img.svg'
    });
}

function facet_active_links() {

    //INIZIATIVE NEWS
    jQuery("#tagged-news .facetapi-checkbox").append("<a class='selFacets'>X</a>");
    jQuery("#tagged-news .deactive-link").append("<a class='deselFacets'>+</a>");

    var cont = jQuery("#facetapi-facet-search-apinotizie-searchapi-block-field-tags").clone();
    /*jQuery("#facetapi-facet-search-apinotizie-searchapi-block-field-tags").after('</div>');*/
    jQuery("#facetapi-facet-search-apinotizie-searchapi-block-field-tags").before('<div class="facets-container"></div>').remove();
    jQuery(".facets-container").html(cont);

    if (jQuery("ul.facetapi-facet-field-tags li a").hasClass('facetapi-active')) {
        jQuery("ul.facetapi-facet-field-tags li a.facetapi-active").parent().addClass("deselect");
    }

    var contDeselect = jQuery("#tagged-news .current-search-item-active").clone();
    jQuery("#tagged-news .current-search-item-active").remove();

    jQuery(contDeselect).insertAfter(".facets-container");

    jQuery(contDeselect).prepend("<div class='desIniziat' id='desIniziat'>" + Drupal.t('You searched :') + "</div>");
}

function genera_link_accedi(){

    var myUrl = siaePath+"/it/services/users/user_info.json";
    //inserire  anche il controllo al KOtrue nel ritorno
    if(UserUtils.userInfo == undefined){
        var linkPortale = siaePath+'/'+currentlang+'/servizi-online';
        jQuery("#linkAccedi").html("<a href="+linkPortale+" id=\"mostraLogin\" class=\"accediLogin\" >ACCEDI AL PORTALE</a> oppure <a href=\"#\" class=\"mostraLogin\">REGISTRATI AI SERVIZI ONLINE</a>");
        jQuery(".mostraLogin").click(function(){
            jQuery("#new_anonym_menu_login").click();
        });
        jQuery("#linkAccedi").show();
    }
    else {
      //  if(UserUtils.userInfo){

            //accedi ai servizi
            jQuery("#linkAccedi").html("<a href=\"#\" id=\"mostraMenu\" class=\"mostraMenu\" >ACCEDI AI SERVIZI ONLINE</a>");
            jQuery(".mostraMenu").click(function(e){
                e.stopPropagation();
                jQuery("#menu-services-logged li").addClass("open");
            });
            jQuery("#linkAccedi").show();
      //  }
    }
    //genero link accedi portale MDA
     jQuery("#link_accedi_mda").html("<a href=\"/it/servizi-online\" id=\"mostraMda\" class=\"mostraLogin\" >ACCEDI AL PORTALE</a>");
     jQuery("#link_accedi_mda").show();

    //genero link accedi portale GEVI
    jQuery("#link_accedi_gevi").html("Sei già registrato al Servizio on line di richiesta contrassegni libri? <a href=\"https://www.siae.it/it/sol_gevi\" target=\"_blank\" >ACCEDI AL PORTALE</a>");
    jQuery("#link_accedi_gevi").show();
}

function dismiss_nome_utente_modal(){
    jQuery('#comunicazione_annulla_nome_utente').modal("hide");
    //jQuery("#user-login-form").submit();

}

function siae_new_login(email, password){

    // MB: spinner in fase di login
    run_waitMe("body");

    var params = {};

    var email = email;
    var password = password;

    params['email'] = email;
    params['password'] = password;

    // MB: viene sottomessa la form, il check sulle email duplicate sarà effettuato successivamente
    if (jQuery("#errorMessage").html() !== "") {
        jQuery("#errorMessage").show();
    }
    jQuery("#user-login-form").submit();

    /*var thisAction = siaePath + "/it/reset-email/ajax/check_user_for_duplicate_email";

    jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: thisAction,
        data: params,
        success: function(dataResponse){
            if(dataResponse['KO'] == false) {
                // MB: solo nel caso in cui non sia KO
                jQuery("#user-login-form").submit();
            } else{
                if (dataResponse.errorCode === "50") {
                    jQuery('#email_doppia_login').modal({backdrop: 'static', keyboard: false});
                } else if (dataResponse.errorCode === "01") {
                    jQuery('#errorMessage').html(jQuery('#wrongUserErrorText').html()).show();
                } else if (dataResponse.errorCode === "AUS_13") {
                    jQuery('#errorMessage').html(jQuery('#badCredentialsErrorText').html()).show();
                } else if (dataResponse.errorCode.split("_").length && dataResponse.errorCode.split("_")[0] === "DRU") {
                    jQuery('#errorMessage').html(jQuery('#genericErrorText').html()).show();
                } else {
                    // MB: modifica messaggio di errore di default di Drupal
                    if (jQuery(".custom-error-message").text() != "") {
                        jQuery(".custom-error-message").html(jQuery('#genericErrorText'));
                    }
                    if (jQuery("#errorMessageInt").text() != "") {
                        jQuery("#errorMessageInt").html(jQuery('#genericErrorText'));
                    }
                    // MB: nel caso standard non gestisco l'errore ma mostro il messaggio generico
                    jQuery('#errorMessage').html(jQuery('#genericErrorText').html()).show();
                    //jQuery("#user-login-form").submit();
                }
            }
        },
        error: function(){
            //jQuery('#errorMessage').text('Errore nella chiamata al servizio.').show();
            jQuery('#errorMessage').text(jQuery('#genericErrorText').html()).show();
        }

    });*/

};

function redirect_change_email(){
    jQuery(window.location).attr('href', siaePath+'/'+currentlang+'/reset-email');
};

  
function checkAnagraficaCompletaUtente(){

    var consistenzaIndirizzi = 0;

    var indirizziValidi = [];

    var myInterval = setInterval(function(){

        var message = [];
        var openPopup = false;

        if(UserUtils.userInfo != null) {

            if(!GestPay.ChkTLS.enabled){
                message.push('Il browser utilizzato non è compatibile con il nostro sistema di pagamento online. Ti preghiamo di utilizzare un altro tipo/versione di browser');
                openPopup = true;
            }
            var userInfoIndirizzi = UserUtils.userInfo.recapitiContatti.indirizzi;
            var userInfoStatoNascita = UserUtils.userInfo.anagrafica.statoNascita;
            var userInfoLuogoNascita = UserUtils.userInfo.anagrafica.luogoNascita;
            var userInfoProvinciaNascita = UserUtils.userInfo.anagrafica.provinciaNascita;
            var utenteEstero = (UserUtils.userInfo.anagrafica.codiceFiscale.substr(-5, 1).toUpperCase() === "Z");
            var webaccountDelegato = (UserUtils.userInfo.informazioniWebAccount && UserUtils.userInfo.informazioniWebAccount.idtipologiaWebAccount && UserUtils.userInfo.informazioniWebAccount.tipologiaWebAccount) ? (UserUtils.userInfo.informazioniWebAccount.idtipologiaWebAccount.toUpperCase() === "WWW" && UserUtils.userInfo.informazioniWebAccount.tipologiaWebAccount.toUpperCase() === "DELEGATO") : false;

            if (UserUtils.userInfo.anagrafica !== null) {
                if (UserUtils.userInfo.anagrafica.statoNascita !== null) {
                    if (((UserUtils.userInfo.anagrafica.statoNascita.id !== null && UserUtils.userInfo.anagrafica.statoNascita.id.toUpperCase() == 'IT') || ( UserUtils.userInfo.anagrafica.statoNascita.denominazione !== null && UserUtils.userInfo.anagrafica.statoNascita.denominazione.toUpperCase() == 'ITALIA')) && (UserUtils.userInfo.anagrafica.tipoSocieta.denominazione == 'PF' || UserUtils.userInfo.anagrafica.tipoSocieta.id == '7')) {
                        if( userInfoStatoNascita == null || userInfoLuogoNascita == null || userInfoProvinciaNascita == null){

                            if( userInfoStatoNascita == null){
                                message.push('Stato nascita non presente');
                                openPopup = true;
                            }
                            // MB: se CF estero non controlla la consistenza del comune di nascita
                            if(userInfoLuogoNascita == null && !utenteEstero){
                                message.push('Comune nascita non presente');
                                openPopup = true;
                            }
                            // MB: se CF estero non controlla la consistenza della provincia di nascita
                            if(userInfoProvinciaNascita == null && !utenteEstero){
                                message.push('Provincia nascita non presente');
                                openPopup = true;
                            }
                        }else{
                            if((userInfoStatoNascita.denominazione == "" || userInfoStatoNascita.denominazione == null) || (userInfoStatoNascita.id == "" || userInfoStatoNascita.id == null)){
                                message.push('Stato nascita incompleto: riprova il salvataggio da modifica dati account');
                                openPopup = true;
                            }
                            // MB: se CF estero non controlla la consistenza del comune di nascita
                            if(!utenteEstero && ((userInfoLuogoNascita.denominazione == "" || userInfoLuogoNascita.denominazione == null) || (userInfoLuogoNascita.id == "" || userInfoLuogoNascita.id == null))){
                                message.push('Comune nascita incompleto : riprova il salvataggio da modifica dati account');
                                openPopup = true;
                            }
                            // MB: se CF estero non controlla la consistenza della provincia di nascita
                            if(!utenteEstero && ((userInfoProvinciaNascita.denominazione == "" || userInfoProvinciaNascita.denominazione == null) || (userInfoProvinciaNascita.id == "" || userInfoProvinciaNascita.id == null))){
                                message.push('Provincia nascita incompleta : riprova il salvataggio da modifica dati account');
                                openPopup = true;
                            }
                        }

                    }

                }
            }
            // MB: se webaccount delegato non controlla la consistenza degli indirizzi
            if(UserUtils.userInfo.recapitiContatti !== null && !webaccountDelegato){
                if(UserUtils.userInfo.recapitiContatti.indirizzi !== null){
                    if(Object.keys(userInfoIndirizzi).length == 0){
                        message.push("Indirizzi mancanti (Inseriscili da modifica dati)");
                        openPopup = true;
                    }else{
                        jQuery.each( userInfoIndirizzi, function( i, val ) {
                            if(val.stato == null || val.stato == undefined || val.stato == ''){
                                return;
                            }

                            if(val.tipoIndirizzo == null || val.tipoIndirizzo == undefined  || val.tipoIndirizzo == ''){
                                return;
                            }
                            if((val.stato.id == null || val.stato.id == undefined || val.stato.id == '') || (val.stato.denominazione == null || val.stato.denominazione == undefined || val.stato.denominazione == '')){
                                return;
                            }
                            if((val.tipoIndirizzo.codice != "001" && val.tipoIndirizzo.descrizione != "RESIDENZA") && (val.tipoIndirizzo.codice != "002" && val.tipoIndirizzo.descrizione != "DOMICILIO") && (val.tipoIndirizzo.codice != "003" && val.tipoIndirizzo.descrizione != "SEDE LEGALE") && (val.tipoIndirizzo.codice != "004" && val.tipoIndirizzo.descrizione != "SEDE AMMINISTRATIVA" )){
                                return;
                            }else{

                                if(consistenzaIndirizzi < 2){

                                    if(val.indirizzo == null || val.indirizzo == ''){
                                        message.push("Indirizzo " + val.tipoIndirizzo.descrizione +  ": indirizzo mancante.");
                                        openPopup = true;
                                    }

                                    if(val.stato.id.toUpperCase() == "IT" || val.stato.denominazione.toUpperCase() == "ITALIA"){
                                        if((val.provincia.id == '' || val.provincia.id == null) || (val.provincia.denominazione == '' || val.provincia.denominazione == null)){
                                            message.push("Indirizzo " + val.tipoIndirizzo.descrizione + ': Provincia mancante');
                                            openPopup = true;
                                        }
                                        if((val.citta.id == '' || val.citta.id == null) || (val.citta.denominazione == '' || val.citta.denominazione == null)){
                                            message.push("Indirizzo " + val.tipoIndirizzo.descrizione + ': Città mancante');
                                            openPopup = true;
                                        }
                                    }
                                    if((val.citta.denominazione == '' || val.citta.denominazione == null)){
                                        message.push("Indirizzo " + val.tipoIndirizzo.descrizione + ': Città mancante');
                                        openPopup = true;
                                    }
                                    if(!openPopup){
                                        if((val.tipoIndirizzo.codice != "001" && val.tipoIndirizzo.descrizione != "RESIDENZA") || (val.tipoIndirizzo.codice != "003" && val.tipoIndirizzo.descrizione != "SEDE LEGALE")){
                                            indirizziValidi.push(val);
                                        }
                                    }
                                    consistenzaIndirizzi++
                                }else{
                                    return;
                                }

                            }

                        });

                        if(consistenzaIndirizzi < 2){
                            if(UserUtils.userInfo.anagrafica.tipoSocieta.denominazione == 'PF' || UserUtils.userInfo.anagrafica.tipoSocieta.id == '7'){
                                message.push("Indirizzi incompleti (Residenza e/o Domicilio)");
                            }else{
                                message.push("Indirizzi incompleti (Sede legale e/o Sede Amministrativa)");
                            }
                            openPopup = true;
                        }
                    }
                }
            }

            if(openPopup && (typeof(consorella) == 'undefined' || consorella() === false)){
                var list = jQuery('#lista_dati_inconsistenti');
                jQuery.each(message, function(index, element, array){
                    var li = jQuery('<li/>')
                        .addClass('red')
                        .text(element)
                        .appendTo(list);
                });

                jQuery("#datiInconsistenti").modal({
                    keyboard: false,
                    backdrop: 'static'
                });
                clearInterval(myInterval);
            }else{
                jQuery('body').waitMe('hide');
                clearInterval(myInterval);
            }
        }

    }, 500);

};



