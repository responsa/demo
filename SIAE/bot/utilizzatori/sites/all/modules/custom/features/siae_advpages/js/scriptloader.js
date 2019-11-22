var jsPath = './utilizzatori/sites/all/modules/custom/features/siae_advpages/js/';
var scripts=[];
scripts.push(
    jsPath + 'op/modules/sectionNav.js',
    jsPath + 'op/modules/faqAccordion.js',
    jsPath + 'header.js',
    jsPath + 'op/modules/numbers.js',
    jsPath + 'op/modules/opHero.js',
    jsPath + 'op/modules/carousel.js',
    jsPath + 'op/modules/configurator.js',
    jsPath + 'op/modules/idea--cerchio.js',
    jsPath + 'op/modules/rights-filter.js',
    jsPath + 'op/opApp.js'
);

//dynamic libraries.
if(window.modules) {
    for(var i=0;i<modules.length;i++) {
        scripts.push(modules[i]);
    }
}

// callback
//scripts.push(function(){
//
//    window.onload = new function() {
//        siae.app.init();
//        setTimeout(function(){
//
//            siae.app.cache.body.addClass("loaded");
//            $(".pageLoader").fadeOut("slow");
//
//            siae.app.cache.window.trigger('resize');
//            siae.app.cache.window.trigger('scroll');
//
//        },500);
//
//    };
//
//});

if (typeof head !== 'undefined') {
    head.js.apply(this, scripts);
}
