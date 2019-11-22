var opHero = (function() {
    $ = jQuery.noConflict();
    'use strict';

    var cache = {

        opHeroContent: $('.op__hero-content'),
        opHero: $('.op__hero')

    };

    var lastViewportHeight = siae.app.cache.window.height(),
        ticking = false;

    function setHeight(){

        cache.opHero.height( lastViewportHeight );

    }

    function center(){

        cache.opHeroContent.css({
            'margin-top': ( cache.opHeroContent.parent('.op__hero').height() - cache.opHeroContent.height() ) / 2,
            'top': 0
        });

    }

    function bindResize(){

        /**
         * Callback for our scroll event - just
         * keeps track of the last scroll value
         */
        function onResize() {
            lastViewportHeight = siae.app.cache.window.height();
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
            setHero();

            // allow further rAFs to be called
            ticking = false;
        }

        // only listen for scroll events
        siae.app.cache.window.on('resize', onResize );

    }

    function setHero(){

        setHeight();

        if( !Modernizr.csstransforms ){

            center();

        }

    }

    function init() {

        if( cache.opHero.length ){

            setHero();
            bindResize();

        }

    }

    return {
        init:init
    };
}());

