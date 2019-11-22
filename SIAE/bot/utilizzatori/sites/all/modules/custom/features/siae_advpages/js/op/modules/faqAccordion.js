var faqAccordion = (function () {
    $ = jQuery.noConflict();

    'use strict';

    var cache = {};

    function toggle($element, callback) {

        deactivate($element, callback);

    }

    function deactivate($element, callback) {

        var $this = $element,
            $toDeactivate = $this.parents('.op__accordion').find('.is-active'),
            $content = $toDeactivate.find('.op__accordion-content');

        $content.velocity('stop').velocity({
            'opacity': [0, 1]
        }, {
            duration: 400,
            complete: function () {

                $content.hide();

                $toDeactivate.velocity({
                    'padding-bottom': 0
                }, {
                    duration: 200,
                    complete: function () {

                        if (typeof callback === 'function') {

                            callback();

                        }

                        $toDeactivate.removeClass('is-active');
                    }
                });

            }
        });

    }

    function activate($element) {

        var $this = $element,
            $content = $this.find('.op__accordion-content');

        $content.find('.op__accordion-content-close').one('click', function () {

            deactivate($this);
            return false;

        });

        $content.css({
            'top': $this.outerHeight() + $this.offset().top - $this.parents('.op__accordion').offset().top
        });

        $this
            .addClass('is-active')
            .velocity({
                'padding-bottom': $content.outerHeight()
            }, {
                duration: 300,
                complete: function () {
                    $content.velocity({
                        opacity: [1, 0]
                    }, {
                        duration: 300,
                        begin: function () {

                            $content.css('opacity', 0).show();

                        }
                    });
                }
            });

    }

    function bindUI() {

        $('.op__accordion-item-title').on('click', function () {

            var $this = $(this).parents('.op__accordion-item'),
                $toDeactivate = $this.parents('.op__accordion').find('.is-active');

            if ($this.hasClass('is-active')) {

                deactivate($this);

            } else if ($toDeactivate.length !== 0) {

                toggle($this, function () {
                    activate($this);
                });

            } else {

                activate($this);

            }

            cache.window.one('resize', function () {
                deactivate($this);
            });

            return false;

        });

    }

    function init() {

        bindUI();
        cache.window = $(window);

    }

    return {
        init: init
    };
}());