jQuery(function(){
	//window.alert(navigator.userAgent);
	if ( /*true || */navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod' || navigator.userAgent.indexOf('Android')>=0 || navigator.userAgent.indexOf('Windows Phone')>=0 ) {
		//jQuery('[rel^=pretty]').removeAttr('rel');
		jQuery('[rel^=pretty]').each(function(){
			if (jQuery(this).attr('href').indexOf('youtu') >= 0) {
				jQuery(this).removeAttr('rel');
				jQuery(this).attr('href', jQuery(this).attr('href').replace('?width','&width'));
			}
		});
		jQuery('a[href$=#prettyPhoto]').each(function(){
			if (jQuery(this).attr('href').indexOf('youtu') >= 0) {
				jQuery(this).attr('href', jQuery(this).attr('href').replace('#prettyPhoto','').replace('?width','&width'));
			}
		});
		jQuery('img[alt*=prettyPhoto]').each(function(){
			if (jQuery(this).attr('alt').indexOf('youtu') >= 0) {
				jQuery(this).attr('alt', jQuery(this).attr('alt').replace('prettyPhoto','').replace('?width','&width'));
			}
		});
	}
	
	
	jQuery("a[rel^='prettyPhoto']").prettyPhoto({
		deeplinking: 	false,
		theme: 			'pp_default',
		social_tools:	'',
		autoplay:		false
	});

	jQuery('.js_openppgal')
		.css({
			'cursor':	'pointer'
		})
		.click(function(){
			jQuery(this).closest('.js_ppgalcontainer').find('a:eq(0)').trigger('click');
		});

	jQuery(".imagemap_prettyphoto area").prettyPhoto({
		deeplinking: 	false,
		theme: 			'pp_default',
		social_tools:	'',
		autoplay:		false
	});

	jQuery("area.area_prettyphoto").prettyPhoto({ /* questa classe si può applicare a un tag area per utilizzare la funzionalità di prettyPhoto */
		deeplinking: 	false,
		theme: 			'pp_default',
		social_tools:	'',
		autoplay:		false
	});

	jQuery("a[rel^='mapPrettyPhoto']").prettyPhoto({
		deeplinking: 	false,
		theme: 			'pp_default', /* il theme Ã¨ stato "personalizzato" */
		social_tools:	'',
		autoplay:				false,
		changepicturecallback:	function(){
									var txt = jQuery('.pp_inline .fotomap_txt');
									if ( txt.length > 0 ) {
										txt.find('.fotomap_content').each(function(idx){
											var dati =jQuery(this).find('.data').text().split(';');
											var coords = dati[0].split(',');
											var dims = dati[1].split(',');
											jQuery('.pp_inline .fotomap_img')
												.append('<div class="fotomap_plc" style="position:absolute;left:'+coords[0]+'px;top:'+coords[1]+'px;width:'+dims[0]+'px;height:'+dims[1]+'px;"><div class="fotomap_hdl" style="width:'+dims[0]+'px;height:'+dims[1]+'px;cursor:pointer;"><div style="display:none;">'+idx+'</div></div></div>');
										});
										jQuery('.pp_inline .fotomap_img .fotomap_hdl').css({'border':	'1px dotted #FF0000',
											'background':	'white',
											'opacity':		0.01
										});
										jQuery('.fotomap_hdl').click(function(){
											/* highligh area */
											jQuery('.pp_inline .fotomap_plc').css({
												'border':		'0'
											});
											jQuery(this).closest('.fotomap_plc').css({
												'border':	'2px dotted #FF0000'
											});
											/* /highligh area */
											var idx = jQuery(this).text()-0;
											var txt = jQuery('.pp_inline .fotomap_txt');
											txt.find('.fotomap_content').hide();
											txt.find('.fotomap_content:eq('+idx+')').show();
										});
										jQuery('.pp_inline .fotomap_hdl:eq(0)').trigger('click');
									}
								}
	});
	
		
	if ( ! (navigator.platform == 'iPad' || navigator.platform == 'iPhone') ) {
		jQuery('.fotomap_hdl').live('click',function(){
			/* highligh area */
			jQuery('.pp_inline .fotomap_plc').css({
												'border':		'0'
											});
			jQuery(this).closest('.fotomap_plc').css({
				'border':		'2px dotted #FF0000'
			});
			/* /highligh area */
			var idx = jQuery(this).text()-0;
			var txt = jQuery('.pp_inline .fotomap_txt');
			txt.find('.fotomap_content').hide();
			txt.find('.fotomap_content:eq('+idx+')').show();
		});
	}

	
		// prettyPhoto per i link HREF
	jQuery('a[href$=#prettyPhoto]').each(function(){
		jQuery(this).attr('href', jQuery(this).attr('href').replace('#prettyPhoto',''));
		if (jQuery(this).attr('target')) {
			jQuery(this).removeAttr('target');
		}
		jQuery(this).prettyPhoto();
		jQuery(this).attr('rel','prettyPhoto');
		/*
		jQuery(this).click(function(e){
			_gaq.push(['_trackPageview',jQuery(this).attr('href')]);
		});
		*/
	});
	
	// prettyphoto negli ALT delle immagini
	jQuery('img[alt*=prettyPhoto]').each(function(){
		var splt = jQuery(this).attr('alt').split('|');
		jQuery(this).attr('alt', splt[0]);
		var link = jQuery(this).closest('a');
		link.attr('href', splt[2]);
		link.prettyPhoto();
		link.attr('rel','prettyPhoto');
		/*
		link.click(function(e){
			_gaq.push(['_trackPageview',link.attr('href')]);
		});
		*/
	});
	
	/*intercetta eventi per inviare report a Google Analytics*/
	jQuery('body').on('click','[rel=prettyPhoto]', function(){
		_gaq.push(['_trackPageview',jQuery(this).attr('href')]);
	});
	
	

});