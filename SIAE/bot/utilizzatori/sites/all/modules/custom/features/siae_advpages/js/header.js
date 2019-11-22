var header = (function() {
  $ = jQuery.noConflict();
  $(document).ready(function () {
    if (window.location.hash === '#recover-password') {
      setTimeout(sectionNav.showPasswordRecover, 1000);
    }
  });
	'use strict';

	var $header,
		$stickyAnchor,
		stickyHeaderWatcher,
		fixedHeaderWatcher;

	function checkSticky(){

		if( stickyHeaderWatcher.isAboveViewport && $header.not('.sticky') ){

			$header.addClass('sticky').removeClass('unsticky');

		} else if( $header.is('.sticky') ) {

			$header.addClass('unsticky');

			setTimeout(function(){

				$header.removeClass('sticky');

			},400)

		}

	}

	function checkFixed(){

		if( fixedHeaderWatcher.isAboveViewport ){

			$header.css({
				'position': 'absolute',
				'top': $stickyAnchor.offset().top - $header.height()
			});

		} else {

			$header.css({
				'position': 'fixed',
				'top': 'auto'
			});

		}

	}

	function init() {

		$header = $('.header'),
		$stickyAnchor = $('[data-sticky-anchor]'),
		stickyHeaderWatcher = scrollMonitor.create( $stickyAnchor, -60 ),
		fixedHeaderWatcher = scrollMonitor.create( $stickyAnchor, $header.height() );
	
		checkSticky();
		checkFixed();

		stickyHeaderWatcher.stateChange(function(){

			checkSticky();

		});

		fixedHeaderWatcher.stateChange(function(){

			checkFixed();

		});

	}

	return {
		init:init
	};
}());