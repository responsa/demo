jQuery(function ($) {
    var numbers = (function () {
        'use strict';

        function init() {

            $('.odometer-item').each(function () {

                var $this = $(this),
                    number = parseInt($this.html(), 10),
                    zeroes = (function () {

                        var l = ('' + number).split('').length,
                            html = '';

                        for (var i = l - 1; i >= 0; i--) {
                            html += '0';

                            if (i % 3 === 0 && i !== 0) {

                                html += '.';

                            }

                        }

                        return html;
                    }),
                    odometerWatcher = scrollMonitor.create($this);

                $this.attr('data-number', number);

                $this.html(zeroes);

                odometerWatcher.enterViewport(function () {

                    var od = new Odometer({
                        el: $this[0],
                        value: 0,
                        auto: false,
                        duration: 2000,
                        format: '(.ddd),dd',
                        animation: 'count'
                    });
                    $this.html(number);

                });

            });

        }

        return {
            init: init
        };
    }());
});