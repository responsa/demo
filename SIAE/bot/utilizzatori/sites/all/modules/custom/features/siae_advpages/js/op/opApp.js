/* jQuery(function ($) {

    var opApp = (function() {
        'use strict';

        function init() {
            sectionNav.init();
            faqAccordion.init();
            header.init();
            opCarousel();
            opConfigurator();
            opHero.init();
        }

        return {
            init:init
        };
    }());

    $(function(){
        if( siae.app.cache.body.hasClass('op') ){
            opApp.init();
            $('[data-parallax="scroll"]').parallax();
        }
    });
}); */

var opApp = (function() {
    'use strict';

    function init() {

        sectionNav.init();
        faqAccordion.init();
        header.init();
        opCarousel();
        opConfigurator();
        opHero.init();

    }

    return {
        init:init
    };
}());

$(function(){

    if( siae.app.cache.body.hasClass('op') ){

        opApp.init();
        $('[data-parallax="scroll"]').parallax();

    }

    $('.servizi-dropdown__bar').on('click', function(){

        var $this = $(this);

        $this.parents('.servizi-dropdown').toggleClass('is-active');

        return false;

    });

});


