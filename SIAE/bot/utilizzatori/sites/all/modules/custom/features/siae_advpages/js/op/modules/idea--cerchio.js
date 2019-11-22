// posizione punto sulla circonferenza:

// cos rm + ( ( cos rM - cos rm ) / 2 )
// sin rm + ( ( sin rM - sin rm ) / 2 )

jQuery(function ($) {
    var model = [];

    $(function () {

        var cerchio = (function () {
            'use strict';

            var templatesCache = [],
                $content = $('.inner-content'),

                $activeCircle = $('.active-circle'),
                $passiveCircle = $('.passive-circle'),
                length = $passiveCircle.length != 0 ? $passiveCircle.get(0).getTotalLength() : 0,
                sectorsNumber = 6,
                sectorLength = length / 6,

                $viewbox = $('.viewbox'),
                $viewboxContainer = $('.viewbox-container'),
                $viewboxTitle = $('.viewbox-title'),
                $viewboxBG = $('.viewbox-background'),
                $viewboxContentWrapper = $('.viewbox-content-wrapper'),
                $viewboxItems = $('.item'),
                $viewboxItemDots = $('.item i'),
                $viewboxCalls = $('.op__cerchio-calls'),

                $index = $viewboxContainer.find('.index'),

                currentActiveIndex = -1,
                scrollMonitors = {},
                $window = siae.app.cache.window,
                $body = siae.app.cache.body,
                scrollBarWidth = (function () {

                    // Create the measurement node
                    var scrollDiv = document.createElement("div");
                    scrollDiv.className = "scrollbar-measure";
                    document.body.appendChild(scrollDiv);

                    // Get the scrollbar width
                    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

                    // Delete the DIV
                    document.body.removeChild(scrollDiv);

                    return scrollbarWidth;

                })();

            function goto(index) {

                var index = parseInt(index, 10),
                    $contentTitle = $content.find('.content-title-wrapper h2'),
                    $contentText = $content.find('.content-inner-wrapper');

                if (index === currentActiveIndex) {

                    return false;

                }

                currentActiveIndex = index;

                $activeCircle.velocity('stop').velocity({

                    'stroke-dashoffset': index === 6 ? length * 2 : length + (sectorLength * (index))

                }, {
                    easing: 'easeInOutCubic',
                    duration: 300,
                    begin: function () {

                        $contentTitle.velocity('finish').velocity({
                            translateY: ['200%', 0]
                        }, {
                            duration: 400,
                            complete: function () {

                                $contentTitle.hide();

                            }
                        });

                        $contentText.velocity('finish').velocity({
                            translateY: ['-200%', 0]
                        }, {
                            duration: 402,
                            complete: function () {

                                $contentText.hide();

                            }

                        });

                    },
                    complete: function () {

                        $index.attr('data-current-index', index);

                        $contentTitle.velocity({
                            translateY: [0, '200%']
                        }, {
                            duration: 400,
                            delay: 0,
                            begin: function () {

                                $contentTitle.html(model[index].titolo);
                                $contentTitle.show();

                            }
                        });

                        $contentText.velocity({
                            translateY: [0, '-200%']
                        }, {
                            duration: 400,
                            delay: 0,
                            begin: function () {

                                $contentText.html(model[index].testo);
                                $contentText.show();

                            }
                        });

                        $viewboxItems.removeClass('is-passed');

                        for (var i = 0, l = index - 1; i <= l; i++) {

                            $($viewboxItems.get(i)).removeClass('is-active').addClass('is-passed');

                        }

                        $($viewboxItems.get(index)).addClass('is-active');

                    }

                });

                $viewboxItems.removeClass('is-active');

            }

            function makeViewboxSticky() {

                function checkSticky() {

                    if (monitor.isAboveViewport && monitor.isBelowViewport) {

                        $viewboxContainer.css({
                            'position': 'fixed',
                            'top': 0,
                            'bottom': 'auto'
                        });

                    } else {

                        if (monitor.isBelowViewport) {

                            $viewboxContainer.css({
                                'position': 'absolute',
                                'top': 0,
                                'bottom': 'auto'
                            });

                        } else {

                            $viewboxContainer.css({
                                'position': 'absolute',
                                'top': 'auto',
                                'bottom': 0
                            });

                        }

                    }

                }

                var $container = $('.op__cerchio-container'),
                    monitor = scrollMonitor.create($container, {top: 0, bottom: 0});

                monitor.stateChange(function () {

                    checkSticky();

                });

                checkSticky();

            }

            function checkShow(monitor) {


                if (monitor.isFullyInViewport && !$viewbox.is(':visible')) {

                    showViewbox();

                }

            }

            function checkHide(monitor) {

                monitor.enterViewport(function () {


                    if ($viewbox.is(':visible')) {

                        hideViewbox();

                    }

                });

            }

            function checkStep(monitor, dataIndex) {

                if (dataIndex != undefined && monitor.isFullyInViewport) {

                    goto(dataIndex);

                }

            }

            function checkCTA(monitor) {

                if (monitor.isInViewport) {

                    $viewboxCalls.velocity({
                        translateY: ['0', '100%']
                    }, {
                        duration: 400,
                        begin: function () {

                            $viewboxCalls.show();

                        }
                    });

                } else {

                    $viewboxCalls.velocity({
                        translateY: ['100%', 0]
                    }, {
                        duration: 400,
                        complete: function () {

                            $viewboxCalls.hide();

                        }
                    });

                }

            }

            function bindScroll() {

                $('.op__cerchioSection').each(function () {

                    var $this = $(this),
                        monitor = scrollMonitor.create($this);

                    var dataIndex = $this.attr('data-index'),
                        dataShowViewbox = $this.attr('data-show-viewbox'),
                        dataHideViewbox = $this.attr('data-hide-viewbox'),
                        dataShowCTA = $this.attr('data-show-cta');

                    if (dataIndex != undefined) {

                        checkShow(monitor);

                        checkStep(monitor, dataIndex);

                        monitor.fullyEnterViewport(function () {

                            checkShow(monitor);

                            checkStep(monitor, dataIndex);

                        });

                    }

                    if (dataShowViewbox != undefined) {

                        checkShow(monitor);

                        monitor.stateChange(function () {

                            checkShow(monitor);

                        });

                    }

                    if (dataHideViewbox != undefined) {

                        checkHide(monitor);

                        monitor.enterViewport(function () {

                            checkHide(monitor);

                        });

                    }

                    // if( dataShowCTA != undefined ){

                    // 	checkCTA( monitor );

                    // 	monitor.visibilityChange(function(){

                    // 		checkCTA( monitor );

                    // 	});

                    // }

                });

            }

            function hideViewbox() {

                $viewbox.velocity('stop').velocity({
                    translateY: [scrollMonitor.viewportHeight, 0]
                }, {
                    duration: 400,
                    complete: function () {

                        $viewbox.hide();

                    }
                });

                $viewboxBG.velocity('stop').velocity({
                    scale: [1, 1.2]
                }, {
                    duration: 400
                });

                $viewboxTitle.velocity('stop').velocity({

                    translateY: ['-50%', '-500%'],
                    opacity: 1

                }, {

                    duration: 500

                });

            }

            function lockUnlockScroll(unlock) {


                if (unlock) {

                    $body.removeClass('no-scroll').css({
                        'margin-right': 0
                    });

                    $viewboxContainer.css({
                        'right': 0
                    });

                } else {

                    $body.addClass('no-scroll').css({
                        'margin-right': scrollBarWidth
                    });

                    $viewboxContainer.css({
                        'right': scrollBarWidth
                    });

                }

            }

            function showViewbox() {

                lockUnlockScroll();

                $passiveCircle.css({

                    'stroke-dasharray': length,
                    'stroke-dashoffset': length

                });

                $viewboxContentWrapper.velocity({
                    opacity: [0, 1]
                }, {
                    duration: 0
                });

                $viewboxItems.velocity({
                    opacity: 0
                }, {
                    duration: 0
                });

                $viewbox.velocity('stop').velocity({
                    translateY: [0, scrollMonitor.viewportHeight]
                }, {
                    duration: 400,
                    delay: 200,
                    begin: function () {

                        $viewbox.show();

                    },
                    complete: function () {

                        $passiveCircle.velocity({

                            'stroke-dashoffset': length * 2

                        }, {
                            duration: 800,
                            delay: 400
                        });

                        $viewboxItems.each(function (index) {

                            var $this = $(this);

                            $this.velocity({
                                opacity: [1, 0]
                            }, {

                                duration: 400,
                                delay: (800 / 6) * index

                            })

                        });

                        $viewboxContentWrapper.velocity({
                            opacity: [1, 0]
                        }, {
                            duration: 400,
                            delay: 1200,
                            begin: function () {

                                $viewboxContentWrapper.show();

                            },
                            complete: function () {

                                lockUnlockScroll(true);

                            }
                        });

                    }

                });

                $viewboxBG.velocity('stop').velocity({
                    scale: [1.2, 1]
                }, {
                    duration: 400
                });

                $viewboxTitle.velocity('stop').velocity({

                    translateY: ['-500%', '-50%'],
                    opacity: 0

                }, {

                    duration: 500

                });

            }

            function bindUI() {

                bindScroll();

                $('.goto').on('click', function () {

                    var $this = $(this),
                        index = parseInt($this.attr('data-index'), 10);

                    if ($this.parents('.item').hasClass('is-active')) {
                        return false;
                    }

                    $('.op__cerchioSection[data-index="' + index + '"]').velocity('scroll', {
                        duration: 400,
                        offset: 100
                    });

                    return false;

                });

            }

            function positionItems() {

                // var rM = 640,
                // 	rm = 533.3;

                // $items.each(function(index){

                // 	var angle = 360 /  6 * ( index ),
                // 		$this = $(this),
                // 		sin = Math.sin( angle ),
                // 		cos = Math.cos( angle ),
                // 		xM = Math.abs( cos * rM ),
                // 		xm = Math.abs( cos * rm ),
                // 		yM = sin * rM,
                // 		ym = sin * rm;


                // cos rm + ( ( cos rM - cos rm ) / 2 )


                // 	if( angle === 0 ){

                // 		$this.css({
                // 			'left':  rM / 2,
                // 			'top': rM - ( rM - rm ) / 2
                // 		});

                // 	}

                // });

            }

            function makeModel() {

                $('.step-content_container').each(function () {

                    var $this = $(this);

                    model.push({

                        titolo: $this.find('h2').html(),
                        testo: $this.find('.content').html()

                    });

                });

            }

            function setIcons() {

                $('.ico-svg_container').each(function (index) {

                    var $this = $(this),
                        svg = $this.html();

                    $($viewboxItems.get(index)).find('span').html(svg);

                });

            }

            function init() {


                $('.idea-carousel').hide();
                $('.idea-circle').show();

                makeModel();

                setIcons();

                positionItems();

                goto(0, true);

                $activeCircle.css({

                    'stroke-dasharray': length,
                    'stroke-dashoffset': length

                });

                makeViewboxSticky();
                hideViewbox();

                bindUI();

            }

            return {
                init: init
            };

        }());

        if ($('.idea-circle').length
            && Modernizr.svg
            && Modernizr.csstransforms
            && !Modernizr.touch
            && scrollMonitor.viewportHeight > 640
            && siae.app.cache.window.width() > 700
        ) {

            cerchio.init();

        }

    });
});