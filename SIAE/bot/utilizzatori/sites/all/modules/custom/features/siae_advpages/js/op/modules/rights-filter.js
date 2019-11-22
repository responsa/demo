jQuery(function ($) {
    var rightsFilter = (function () {
        'use strict';

        var $rightsFilter,
            $rightsContent;

        function filter(category) {


            $rightsContent.find('a').removeClass('active');

            $rightsContent.find('a[data-category="' + category + '"]').addClass('active');

        }

        function bindUI() {

            $rightsFilter.find('a').on('click', function () {

                var $this = $(this),
                    category = $this.attr('data-filter');

                if ($this.is('.active')) {
                    return false;
                }

                $this
                    .addClass('active')
                    .siblings('a')
                    .removeClass('active');

                filter(category);

                return false;

            });

        }

        function init() {


            $rightsFilter = $('.rights-filter');
            $rightsContent = $('.rights-content');

            bindUI();

        }

        return {
            init: init
        };
    }());

    $(function () {

        if ($('.rights-filter').length) {

            rightsFilter.init();

        }

    });
});