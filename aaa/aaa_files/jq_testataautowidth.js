jQuery.noConflict();
jQuery(function(){
	// sistemazione automatica testate
	G_testataAutowidth = null;
	G_testataAutowidth = setInterval(function(){
		if (jQuery('div.div_testo img:eq(0)').width() > 0) {
			clearInterval(G_testataAutowidth);
		
			jQuery('div.div_testo img').each(function(imgIdx){
				var ridimensiona = false;
				if ( jQuery(this).width() > 480 && jQuery(this).height() < 220 ) {
					ridimensiona = true;
				}
			/*	else if (imgIdx == 0 && ! jQuery(this).attr('usemap')){
					ridimensiona = true;
				}*/
				if (ridimensiona) {
					jQuery(this)
						.removeAttr('width')
						.removeAttr('height')
						.css({
							//'width':	jQuery(this).closest('.contenitore').width()
							'width':	'100%'
						})
						.closest('div')
							.css({
								'width':	'100%'
							});
				}
			});
		}
	}, 100);
});