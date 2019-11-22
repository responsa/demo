jQuery.fn.outside = function(ename, cb){
    return this.each(function(){
        var $this = jQuery(this),
            self = this;

        jQuery(document).bind(ename, function tempo(e){
            if(e.target !== self && !jQuery.contains(self, e.target)){
                cb.apply(self, [e]);
                if(!self.parentNode) jQuery(document.body).unbind(ename, tempo);
            }
        });
    });
};

function checkEndScroll(){
    var scrollTop = siae.app.cache.window.scrollTop();
    if(siae.app.data.lastOffset == scrollTop){
        //clearInterval(timer);
        fullLightMenu(siae.app.data.scrollZone);
    } else {
        siae.app.data.lastOffset = scrollTop;
    }
}

function isElementVisible(elementToBeChecked) {

    var TopView = siae.app.cache.window.scrollTop(),
        TopElement = jQuery(elementToBeChecked).offset().top - siae.app.cache.window.height() + 100;

    return (TopView >= TopElement);

}

function isElementFullVisible(elementToBeChecked) {

    var TopView = siae.app.cache.window.scrollTop(),
        BotView = TopView + siae.app.cache.window.height(),
        TopElement = jQuery(elementToBeChecked).offset().top,
        BotElement = TopElement + jQuery(elementToBeChecked).height();

    return ((BotElement <= BotView) && (TopElement >= TopView));
}

function animationClick(trigger, element, animation){
    element = jQuery(element);
    trigger = jQuery(trigger);
    trigger.click(
        function() {
            element.addClass('animated ' + animation);
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);

        });
}
function animate(element, animation) {
    element = jQuery(element);
    element.addClass('animated ' + animation);
};
function animateAndRemove(element, animation) {
    element = jQuery(element);
    element.addClass('animated ' + animation);
    setTimeout( function(){
        element.removeClass('animated ' + animation);
    }, 1000);
};

function equalheight(container){
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = [],
        $el,
        topPosition = 0;

    jQuery(container).each(function() {

        $el = jQuery(this);
        $el.height('auto');
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {

            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }

            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);

        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }

        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }

    });
};

function initGoogleMap($item) {
    if(jQuery("#map_canvas").length){
        if(jQuery.isPlainObject($item) && $item.lat && jQuery.isNumeric($item.lat) && $item.lng && jQuery.isNumeric($item.lng)){
            var lat = $item.lat;
            var lng = $item.lng;
        } else {
            var lat = ($item.length&&jQuery.isNumeric($item.data("lat")) ) ? $item.data("lat") : null;
            var lng = ($item.length&&jQuery.isNumeric($item.data("lng")) ) ? $item.data("lng") : null;
        }
        if(lat!=null && lng!=null) {
            myLatLng = new google.maps.LatLng(lat,lng);
            map = new google.maps.Map(document.getElementById('map_canvas'),{
                zoom: 16,
                center: myLatLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map
            });
        }
    }
}

function owlPrevNext(event){
    var element   = event.target;
    var items     = event.item.count;     // Number of items
    var item      = event.item.index;
    var size      = event.page.size;
    //console.log("items:"+items+"; item:" + item + "; size:"+size);
    if(item==0||items==size){
        jQuery(".owl-prev",element).addClass("disabled");

    }else if(items>size){
        jQuery(".owl-prev",element).removeClass("disabled");
    }
    if(items<=(size+item)||items==size){
        jQuery(".owl-next",element).addClass("disabled");

    }else{
        jQuery(".owl-next",element).removeClass("disabled");
    }
}
