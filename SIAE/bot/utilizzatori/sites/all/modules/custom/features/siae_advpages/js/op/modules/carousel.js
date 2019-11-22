var opCarousel = function () {
    $ = jQuery.noConflict();

    var owl4blocks = $(".op .carousel_container.blocks-4"),
        owlHeroLicences = $(".op__hero__bottom-carousel .carousel_container"),
        owlIdeaCarousel = $(".op__idea-evolution .steps"),
        owlIdeaCarouselCurrent = $(".idea-carousel .steps-num .current"),
        owlIdeaCarouselTotal = $(".idea-carousel .steps-num .total");


    owl4blocks.on("initialized.owl.carousel changed.owl.carousel translated.owl.carousel", function (event) {
        owlPrevNext(event);
    });

    owl4blocks.owlCarousel({
        items: 4,
        nav: false,
        dots: true,
        pullDrag: false,
        navText: ["‹", "›"],
        responsive: {
            // breakpoint from 0 up
            0: {
                slideBy: 1,
                items: 1
            },
            // breakpoint from 480 up
            600: {
                slideBy: 2,
                items: 2
            },
            // breakpoint from 768 up
            700: {
                slideBy: 3,
                items: 3,
                nav: true
            },
            1200: {
                slideBy: 4,
                items: 4,
                dots: false,
                nav: true
            }
        }
    });


    owlHeroLicences.on("initialized.owl.carousel changed.owl.carousel translated.owl.carousel", function (event) {
        owlPrevNext(event);
    });
    owlHeroLicences.owlCarousel({
        items: 3,
        nav: false,
        navText: ["‹", "›"],
        dots: true,
        pullDrag: false,
        responsive: {
            // breakpoint from 0 up
            0: {
                slideBy: 1,
                items: 1
            },
            // breakpoint from 480 up
            600: {
                slideBy: 3,
                items: 3,
                dots: false,
                nav: false
            }
        }
    });
    owlIdeaCarousel.on("initialized.owl.carousel changed.owl.carousel translated.owl.carousel", function (event) {
        var items = (event.item.count - 3) <= 9 ? '0' + (event.item.count - 3) : (event.item.count - 3);     // Number of items
        var page = event.page.index <= 9 ? '0' + event.page.index : event.page.index;
        owlIdeaCarouselCurrent.text(page);
        owlIdeaCarouselTotal.text(items);
        if (items < page || page == "00") {
            $(".steps-num").fadeOut();
        } else {
            $(".steps-num").fadeIn();
        }

    });
    owlIdeaCarousel.owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        pullDrag: true,
        loop: true,
        navText: ["‹", "›"],
        responsive: {
            1200: {
                nav: true
            }
        }
    });

    // owlHeroLicences.owlCarousel({
    // items:1,
    // nav:false,
    // navText:["‹","›"],
    // dots:true,
    // autoWidth:true,
    // responsive:{
    // 0 : {
    // slideBy:1,
    // items:1
    // },
    // // breakpoint from 480 up
    // 600 : {
    // slideBy:2,
    // items:2
    // },
    // // breakpoint from 768 up
    // 700 : {
    // slideBy:3,
    // items:3
    // },
    // 1200 : {
    // slideBy:3,
    // items:3
    // },
    // 1400 : {
    // slideBy:4,
    // items:4
    // }
    // }
    // });
};