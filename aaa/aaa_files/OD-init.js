/* scroll morbido pagina strategia */
jQuery(function() {
	jQuery('.anchor_point[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = jQuery(this.hash);
			target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				jQuery('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
});

//mostra freccia "torna su"
jQuery(window).scroll(function() {
	if (jQuery(window).scrollTop() > 600 && jQuery(window).scrollTop() < 4800)
		jQuery(".strategia #up").show(200);
	else
		jQuery(".strategia #up").hide(200);
	});
	jQuery(document).ready(function() {
		jQuery(".strategia #up").click(function() {
			jQuery("html, body").animate({scrollTop: "410px"}, "slow");
		});
	});
//mostra freccia "torna su"
/* fine scroll morbido pagina strategia */

/* Inizio: scroll della pagina "Hera per l'economia circolare" */
jQuery(window).scroll(function() {
	if (jQuery(window).scrollTop() > 1045 && jQuery(window).scrollTop() < 6300)
		jQuery(".hera_economia_circolare #up").show(200);
	else
		jQuery(".hera_economia_circolare #up").hide(200);
});
jQuery(document).ready(function() {
	jQuery(".hera_economia_circolare #up").click(function() {
		jQuery("html, body").animate({scrollTop: "1055px"}, "slow");
	});
});
/* Fine: scroll della pagina "Hera per l'economia circolare" */

gOD = {
	getBrowser:		function()
					{
						var ua = '' + navigator.userAgent;
						var verOffset;
						
						var platform = 'unknown';
						var bname = 'unknown';
						var ub = 'unknown';
						
						if (/linux/i.test(ua)) {
							platform = 'Linux';
						}
						else if (/macintosh|mac os x/i.test(ua)) {
							platform = 'MacOSX';
						}
						else if (/win/i.test(ua)) {
							platform = 'Windows';
						}
						
						if (/iPad/i.test(ua)) {
							platform = 'iPad';
						}
						else if (/iPhone/i.test(ua)) {
							platform = 'iPhone';
						}
						else if (/iPod/i.test(ua)) {
							platform = 'iPod';
						}
						else if (/Android/i.test(ua)) {
							platform = 'Android';
						}
						else if (/Windows Phone/i.test(ua)) {
							platform = 'WindowsPhone';
						}
						else if (/MSIE/i.test(ua) && ! /ARM/i.test(ua) ) {
							platform = 'WindowsRT';
						}
						
						
						if (/MSIE/i.test(ua) && ! /Opera/i.test(ua))
						{
							bname = 'IE';
							ub = "MSIE";
						}
						else if (/Firefox/i.test(ua))
						{
							bname = 'Firefox';
							ub = "Firefox";
						}
						else if (/Chrome/i.test(ua))
						{
							bname = 'Chrome';
							ub = "Chrome";
						}
						else if (/Safari/i.test(ua))
						{
							bname = 'Safari';
							ub = "Safari";
						}
						else if (/Opera/i.test(ua))
						{
							bname = 'Opera';
							ub = "Opera";
						}
						else if (/Netscape/i.test(ua))
						{
							bname = 'Netscape';
							ub = "Netscape";
						}
						
						var N = navigator.appName, tem,
						//M = ua.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*([\d\.]+)/i) || [];
						M = ua.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*([\d]+)/i) || [];
						M = M[2]? [M[1], M[2]]:[N, navigator.appVersion, '-?'];
						if (M && (tem = ua.match(/version\/([\d]+)/i))!= null) M[2]= tem[1];
						
						var version = M[1];
						if (bname == 'Safari') {
							tem = ua.match(/version\/([\d]+)/i);
							//alert(tem);
							version = tem[1];
						}
						
						return {
							'name'		: bname,
							'version'	: version,
							'platform'	: platform,
							'cssString'	: platform + ' '+ bname + version
						};
					},
	box:			{
						refresh:		function(uniquid, dbName, boxRef) {
											//alert('http://'+location.hostname+'/gruppo/90box:'+boxRef+'::db:'+dbName+'.html');
											var lang = 'gruppo';
											if (jQuery('.jq_lang_en').length > 0) {
												lang = 'group';
											}
											jQuery
												.ajax({
													'url':		'https://'+location.hostname+'/'+lang+'/90box:'+boxRef+'::db:'+dbName+'.html',
													'cache':	false
												})
												.done(function(data) {
													data = data.replace('id="uniquid______"', 'id='+uniquid);
													jQuery('#'+uniquid).replaceWith( data );
												})
												.fail(function(xhr, status) {
													//alert('['+uniquid+'] AJAX error: '+status);
													//alert('http://'+location.hostname+'/gruppo/90box:'+boxRef+'::db:'+dbName+'.html');
												});
										}
					},
	'autolevelerReady':	[],
	'autolevReady':		{
									'push':		function( myFun ) {
														gOD.autolevelerReady.push( myFun );
													},
									'go':			function() {
														for(var i in gOD.autolevelerReady) {
															//alert(i);
															gOD.autolevelerReady[i]();
														}
														gOD.autolevelerReady = [];
														setTimeout(function() {
															gOD.autolevReady.go();
														},500);
													}
								},
	'resizeMapping':		function() {
									jQuery('.jq_map_resizable').each(function() {
										var map = jQuery(this);
										var id = map.attr('id');
										var img = jQuery('img[usemap=#'+id+']');
										//alert(img.width()+', '+img.height());
										jQuery('body').append('<img class="imgtmpremoveme" src="'+img.attr('src')+'" style="display:block;position:absolute;top:-100000px;">')
										var imgRaw = jQuery('.imgtmpremoveme');
										//alert(imgRaw.width()+', '+imgRaw.height());
										var wid = imgRaw.width();
										var hei = imgRaw.height();
										imgRaw.remove();
	
										var img_wid = img.width();
										var img_hei = img.height();
										var scale_x = img_wid / wid;
										var scale_y = img_hei / hei;
										map.find('area').each(function() {
											if ( ! jQuery(this).data('coords') ) {
												jQuery(this).data('coords', jQuery(this).attr('coords'));
											}
											var coord = jQuery(this).data('coords').split(',');
											if (coord.length == 4) {
											jQuery(this).attr('coords', Math.round(coord[0]*scale_x) +','+ Math.round(coord[1]*scale_y) +','+ Math.round(coord[2]*scale_x) +','+ Math.round(coord[3]*scale_y) );
											}
											else if (coord.length == 3) {
												jQuery(this).attr('coords', Math.round(coord[0]*scale_x) +','+ Math.round(coord[1]*scale_y) +','+ Math.round(coord[2]*scale_x) );
											}
										});
									});
								},
								
	"createCookie":			function (name,value,days) {
								if (days) {
									var date = new Date();
									date.setTime(date.getTime()+(days*24*60*60*1000));
									var expires = "; expires="+date.toGMTString();
								}
								else var expires = "";
								document.cookie = name+"="+value+expires+"; path=/";//
							},
	"readCookie":			function (name) {
								var nameEQ = name + "=";
								var ca = document.cookie.split(';');
								for(var i=0;i < ca.length;i++) {
									var c = ca[i];
									while (c.charAt(0)==' ') c = c.substring(1,c.length);
									if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
								}
								return null;
							},
	"eraseCookie":			function (name) {
								gOD.createCookie(name,"",-1);
							}
							
}


G_alreadyDatalayerPushed = null;
G_dataLayerAutoOpen = null;
function dataLayerPush(action,label,eventStr,eventCat)
{
//	console.log(action)
//	console.log(label)
//	console.log(G_alreadyDatalayerPushed)
//	console.log(G_dataLayerAutoOpen)
	if ( eventStr != 'undefined' && eventStr != null )
	{
		dataLayer.push({ 'event' : eventStr, 'eventCategory' : eventCat, 'eventAction' : action, 'eventLabel' : label });
	}
	else
	{
		if ( ! G_alreadyDatalayerPushed )
		{
			if ( action != 'undefined' && action != null )
			{
				if ( ! G_dataLayerAutoOpen )
				{
					if ( label != 'undefined' && label != null )
					{
						dataLayer.push({ 'event' : 'slider_totale', 'eventCategory' : 'slider_tracking', 'eventAction' : action, 'eventLabel' : label });
					}
				}
				else
				{
					dataLayer.push({ 'event': 'home_popup', 'eventCategory' : 'home_popup', 'eventAction' : action });
				}
			}
			G_alreadyDatalayerPushed = true;
			G_dataLayerAutoOpen = false;
		}
		else
		{
			G_alreadyDatalayerPushed = false;
		}
	}
}


jQuery.noConflict();
jQuery(function() {
	/* 								MAP RESIZER ON REQUEST 								*/
	//gOD.autolevReady.push(function() {
		gOD.resizeMapping();
		
		G_map_resizable = null;
		jQuery(window).resize(function() {
			G_map_resizable = setTimeout(function() {
				clearTimeout( G_map_resizable );
				gOD.resizeMapping();
				
				jQuery('.jqt_close ').trigger('click');
				
			}, 1000);
		});
	//});
	/* -------------------------------------------------------------------- */

	setTimeout(function() {
		G_genWaitLeveler = null;
		G_genWaitLeveler = setInterval(function() {
			if (jQuery('body.jq_autoleveler').length > 0) {
				
				clearInterval(G_genWaitLeveler);
				
				//alert(gOD.autolevelerReady.length);
				gOD.autolevReady.go();
				
			}
		}, 250);
	}, 200);
	
	
	/* -------------------------------------------------------------------- */

	jQuery('.navbar-top .input_ricerca')
		/*.click(function() {
			jQuery('.jqt_close').trigger('click');
		})*/
		.attr('autocomplete', 'off')
		.autocomplete({
			source:			"/ajax/get_searchterms.php",
			minLength:		1,
			select:			function( event, ui ) {
									jQuery('.navbar-top .input_ricerca')
										.val( ui.item.value )
										.parent()
										.find('.submit_ricerca')
											.addClass('noquicksearch')
											.delay(200)
											.trigger('click');
									return false;
								},
			open: function() {
					window_width = jQuery(window).width();
					container_width = jQuery('.container').width();
					margine = (window_width - container_width) / 2;
					if (margine <=0) {
						margine = 5;
					}
					jQuery('.ui-autocomplete').css({'left': 'auto','right':margine,'z-index':999999999});
					
					setTimeout(function() {
						jQuery('.ui-autocomplete').css({'left': 'auto','right':margine,'z-index':999999999});
					}, 500);
					
			}
		});
		/*
		._renderItem = function( ul, item ) {
			return jQuery( '<li></li>' )
						.attr( "data-value", item.value )
						.append( '<a style="font-size:1.3em;border-bottom:1px solid gray;">' )
							.text( item.value )
						.appendTo( ul );
		}
		*/

	jQuery('area.qtip_stage').each(function()
	{
		jQuery(this).qtip(
		{
				content: jQuery(this).attr('alt'),
				position: {
					corner: {
						target: 'topRight',
					 	tooltip: 'bottomLeft'
					}
				},
				style: {
					border: {
							width: 1,
							radius: 0,
							color: '#f47b23' 
					},
				tip: true
			}
		});
	});

	jQuery('img.qtip_img').each(function()
	{
		jQuery(this).closest('label,span.bold').css({'display':'block','padding-right':'35px'});		//	,'width':'160px','float':'left'
		jQuery(this).css({'display':'block'});
		jQuery(this).qtip(
		{
			content :	jQuery(this).next('.qtip_text').html(),
						position : {
							corner : {
								target : 'topMiddle',
								tooltip : 'bottomMiddle'
							}
						},
						style: {
							width : 320,
							border : {
										width : 1,
										radius : 0,
										color : '#F47B23' 
							},
							'font-size' : '0.8em',
							tip : true
						}
		});
	});

	//Accordion
	jQuery('.apri_sottotitolo_accordion').click(function(e) {
		e.preventDefault();
		id_accordion = jQuery(this).attr('href');
		if (jQuery(this).closest('.titolo_aprichiudi').find('.ico_aprichiudi').hasClass('chiudi')) {
			jQuery(this).closest('.titolo_aprichiudi').find('.ico_aprichiudi').removeClass('chiudi');
		}
		else {
			jQuery(this).closest('.titolo_aprichiudi').find('.ico_aprichiudi').addClass('chiudi');	
		}		
		jQuery(id_accordion).toggle();
	});
	
	/**/
	// storitelling che si apre in automatico
	if (gOD.readCookie('cc_necessary') != null) {
		if (gOD.readCookie('auto_open_layer') == null) {
			//gOD.createCookie('auto_open_layer', '1', 1);
			var liObj = jQuery('ul.slides-container>li:first-child.jq_auto_open');
			if (liObj.length > 0 && jQuery('body.ismobile, body.mobile, body.issmartphone, body.smartphone').length <= 0) {
				setTimeout(function() {
					G_dataLayerAutoOpen = true;
					liObj.find('.cls-ico_storia>a, .cls-ico_slider_video_bianco>a, .cls-ico_storia_rosa>a').get(0).click(gOD.createCookie('auto_open_layer', '1', 1));
				}, 500);
			}
		}
	}
	/**/


	// **funzione per aprire il layer*******/
	jQuery('a.layer').click(function(e) {
		e.preventDefault();
		apriStoryTelling( jQuery(this) );
	});

	 // *****funzioni per chiudere il layer
/*
	jQuery('div.layer_close').click(function(e) {
		e.preventDefault();
		jQuery('div.layer_sottosito').fadeOut(500,function() {
			jQuery(this).css('top','-9999px');
			jQuery(this).find('h2').remove();
			jQuery(this).find('contentuto').html('');
			jQuery('div.layer_overflow').hide();
			
		});
		jQuery('div.maschera').fadeOut(500,function() {
			jQuery(this).css({'top': '-9999px','height':'0px'});
		});
	});
	 
	 jQuery('div.maschera').click(function(e) {
		jQuery('div.layer_sottosito').fadeOut(500,function() {
			jQuery(this).css('top','-9999px');
			jQuery(this).find('h2').remove();
			jQuery(this).find('contentuto').html('');
			jQuery('div.layer_overflow').hide();
		});
		jQuery('div.maschera').fadeOut(500,function() {
			jQuery(this).css({'top': '-9999px','height':'0px'});
		});
	 });
*/

	// ****scorrimento fra i vari storytelling dello slider
	jQuery('.frecce .news_next').click(function(e) {
		e.preventDefault();
		larghezzaWindow = jQuery(window).width();
		jQuery('.layer_close').fadeOut(300);
		jQuery('.frecce').fadeOut(300,function() {
			jQuery('.layer_sottosito').animate({left:-larghezzaWindow},600,'easeInOutQuad',function() {
				elSuccessivo = jQuery('.currentnews').next().find('li a.layer');
				if (elSuccessivo.length < 1)
				{
					elSuccessivo = jQuery('.currentnews').next().find('h2 a.layer');
				}				
				current = jQuery('.currentnews');
				current.next().addClass('currentnews');
				current.removeClass('currentnews');
				larghezza = parseInt(jQuery('.container').width());
				larghezzaWindow = parseInt(jQuery(window).width());
				urlSfondo = elSuccessivo.attr('bkg');	
				titolo = elSuccessivo.attr('tit');
				urlLink = elSuccessivo.attr('href');
				// ****svuota layer da vecchio contenuto
				jQuery('div.layer_sottosito').find('contentuto').html('');
				jQuery('div.layer_sottosito').find('h2').remove();
				// ***imposta nuovi parametri
				jQuery('div.layer_sottosito').css({'background-image':'url("'+urlSfondo+'")','left':jQuery(window).width()});
			
				//----FUNZIONE NUOVA PER CAMBIO COLORE SFONDO
				cssLayer = elSuccessivo.attr('stile');
				layer = jQuery('div.layer_sottosito');
				layer.removeAttr('class');
				layer.addClass('layer_sottosito');
				jQuery('div.layer_sottosito').addClass(cssLayer);
				//---FINE FUNZIONE NUOVA
				
				//jQuery('div.layer_sottosito').prepend('<h2>'+titolo+'</h2>');
				jQuery('div.layer_sottosito .contenuto').load( urlLink, function(e) {
					setTimeout(function() {
						jQuery('div.layer_sottosito .container').append('<div class="clear"></div>');
						jQuery('div.layer_overflow').css({'height':jQuery('.layer_sottosito').height()});
						// ***ingrandimento eventuale maschera
						altezzaMaschera = parseInt(jQuery('div.maschera').height());
						altezzaBox = parseInt(jQuery('div.layer_overflow').height());
						if (altezzaMaschera < altezzaBox + ( 40 * 2 ) )
						{
							jQuery('div.maschera').css('height', altezzaBox + ( 40 * 2 ) );
						}
						jQuery('.layer_sottosito').animate({left:parseInt(jQuery('.frecce .news_next').width())},500,'easeInOutQuad',function(e) {
							jQuery('.frecce .news_next').hide();
							jQuery('.frecce .news_prev').hide();
							jQuery('.frecce').show();
							jQuery('.layer_close').fadeIn(300);
							elSuccessivo = jQuery('.currentnews').next().find('li a.layer');
							if (elSuccessivo.length < 1)
							{
								elSuccessivo = jQuery('.currentnews').next().find('h2 a.layer');
							}				
							elPrecedente = jQuery('.currentnews').prev().find('li a.layer');
							if (elPrecedente.length < 1)
							{
								elPrecedente = jQuery('.currentnews').prev().find('h2 a.layer');
							}				
							if (elSuccessivo.attr('href') !==undefined) {
								jQuery('.frecce .news_next').fadeIn(300);
							}
							if (elPrecedente.attr('href') !==undefined) {
								jQuery('.frecce .news_prev').fadeIn(300);
							}
						});
						if (jQuery('.layer_sottosito .colonna_dx').height()<jQuery('.layer_sottosito .notizia').height()) {
							jQuery('.layer_sottosito .colonna_dx').css('height',jQuery('.layer_sottosito .notizia').height());
						}
					},500);
				});
			});	
		});
	});
	
	jQuery('.frecce .news_prev').click(function(e) {
		e.preventDefault();
		larghezzaWindow = jQuery(window).width();
		jQuery('.layer_close').fadeOut(300);
		jQuery('.frecce').fadeOut(300,function() {
			jQuery('.layer_sottosito').animate({left:larghezzaWindow},600,'easeInOutQuad',function() {
				elSuccessivo = jQuery('.currentnews').prev().find('li a.layer');
				if (elSuccessivo.length < 1)
				{
					elSuccessivo = jQuery('.currentnews').prev().find('h2 a.layer');
				}				
				current = jQuery('.currentnews');
				current.prev().addClass('currentnews');
				current.removeClass('currentnews');
				
				larghezza = parseInt(jQuery('.container').width());
				larghezzaWindow = parseInt(jQuery(window).width());
				urlSfondo = elSuccessivo.attr('bkg');	
				titolo = elSuccessivo.attr('tit');
				urlLink = elSuccessivo.attr('href');
				// ****svuota layer da vecchio contenuto
				jQuery('div.layer_sottosito').find('contentuto').html('');
				jQuery('div.layer_sottosito').find('h2').remove();
				// ***imposta nuovi parametri
				jQuery('div.layer_sottosito').css({'background-image':'url("'+urlSfondo+'")','left':-jQuery(window).width()});
			
			//----FUNZIONE NUOVA PER CAMBIO COLORE SFONDO
			cssLayer = elSuccessivo.attr('stile');
			layer = jQuery('div.layer_sottosito');
			layer.removeAttr('class');
			layer.addClass('layer_sottosito');
			jQuery('div.layer_sottosito').addClass(cssLayer);
			//---FINE FUNZIONE NUOVA
			
				//jQuery('div.layer_sottosito').prepend('<h2>'+titolo+'</h2>');
				jQuery('div.layer_sottosito .contenuto').load( urlLink, function(e) {
					setTimeout(function() {
						jQuery('div.layer_sottosito .container').append('<div class="clear"></div>');
						jQuery('div.layer_overflow').css({'height':jQuery('.layer_sottosito').height()});
						// ***ingrandimento eventuale maschera
						altezzaMaschera = parseInt(jQuery('div.maschera').height());
						altezzaBox = parseInt(jQuery('div.layer_overflow').height());
						if (altezzaMaschera < altezzaBox )	{
							jQuery('div.maschera').css('height',altezzaBox+40);
						}
						jQuery('.layer_sottosito').animate({left:parseInt(jQuery('.frecce .news_next').width())},500,'easeInOutQuad',function(e) {
							jQuery('.frecce .news_next').hide();
							jQuery('.frecce .news_prev').hide();
							jQuery('.frecce').show();
							jQuery('.layer_close').fadeIn(300);
							elSuccessivo = jQuery('.currentnews').next().find('li a.layer');
							if (elSuccessivo.length < 1)
							{
								elSuccessivo = jQuery('.currentnews').next().find('h2 a.layer');
							}				
							elPrecedente = jQuery('.currentnews').prev().find('li a.layer');
							if (elPrecedente.length < 1)
							{
								elPrecedente = jQuery('.currentnews').prev().find('h2 a.layer');
							}				
							if (elSuccessivo.attr('href') !==undefined) {
								jQuery('.frecce .news_next').fadeIn(300);
							}
							if (elPrecedente.attr('href') !==undefined) {
								jQuery('.frecce .news_prev').fadeIn(300);
							}
						});
						if (jQuery('.layer_sottosito .colonna_dx').height()<jQuery('.layer_sottosito .notizia').height()) {
							jQuery('.layer_sottosito .colonna_dx').css('height',jQuery('.layer_sottosito .notizia').height());
						}
					},500);
				});
			});	
		});
	});


	/* archivio storytelling con layer che sale con il titolo */
	if (jQuery('.notmobile').length > 0) {
		jQuery(".arc_storytelling_mask").hover(
			function () {
				jQuery(this).find(".arc_storytelling_desc").animate({height: jQuery(this).find('img').height()}, 500);
			},
			function () {
				jQuery(this).find(".arc_storytelling_desc").animate({height: '0'}, 500);
			}
		);
	}
	else {
		var mask = jQuery(".arc_storytelling_mask");
		mask
			.find(".arc_storytelling_desc")
			.css({height: Math.round( mask.find('img').height() /2 )});
	}





	gOD.autolevReady.push(function() {
		VSLI.init();
		
		// apertura storytelling da notizia principale in pagina
		var alink = jQuery('#riga_2cols_SB>.span9 .box_lista_archivio li.first_big a:eq(0)');
		if (alink.length > 0 && alink.attr('href').indexOf('slider:') >= 0) {
			//document.title = alink.attr('href');
			//document.title = jQuery('ul.slides-container>li.current div.over_link li.cls-ico_storia:first-child>a').attr('href');
			var xurl = jQuery('ul.slides-container>li.current div.over_link li.cls-ico_storia:first-child>a, ul.slides-container>li.current div.over_link li.cls-ico_slider_video_bianco:first-child>a').attr('href');
			var xchk = alink.attr('href').replace('#','');
			if ( xurl != 'undefined' && xurl.indexOf(xchk) >= 0 ) { // funziona solo se è "prima slide"
				var img = alink.find('img:eq(0)');
				img.css({
					"display":	"block"
				});
				img.wrap('<div class="newslinkstorywrapper" style="position:relative;height:'+img.height()+'px;"></div>');
				var leggi = jQuery('.cls-ico_storia:eq(0) .layer').text();
				jQuery('.newslinkstorywrapper').append(
					'<div class="newslinkstoryhover" style="position:absolute;left:20px;bottom:10px;width:50px;">'+
						'<img src="../images_r13/ico_slider_landing/ico_slider_storia.png" style="border:none;"/>'+
						'<div style="text-transform:uppercase;color:#ffffff;text-align:center;">'+ leggi +'</div>'+
						'<div class="clear"></div>'+
					'</div>'
				);
				alink.click(function() {
					var li = jQuery('ul.slides-container>li.current div.over_link li.cls-ico_storia:first-child>a');
					if (li.length > 0 && li.attr('href').indexOf( jQuery(this).attr('href') )) {
						li.trigger('click');
					}
					else {
						
						jQuery(this).closest('li').find('.link_freccia a')[0].click();
					}
					return false;
				});
				
				//jQuery('.slides-navigation .prev_preview,.slides-navigation .next_preview').click(function() {
					//setTimeout(function() {
					setInterval(function() {
						var alink = jQuery('#riga_2cols_SB>.span9 .box_lista_archivio li.first_big a:eq(0)');
						var li = jQuery('ul.slides-container>li.current div.over_link li.cls-ico_storia:first-child>a');
						if (li.length > 0 && li.attr('href').indexOf( alink.attr('href') )) {
							jQuery('.newslinkstoryhover').show(0);
						}
						else {
							jQuery('.newslinkstoryhover').hide(0);
						}
					}, 555);
				//});
				
				var G_storylink_resize = null;
				jQuery(window).resize(function() {
					clearTimeout(G_storylink_resize);
					G_storylink_resize = setTimeout(function() {
						var alink = jQuery('#riga_2cols_SB>.span9 .box_lista_archivio li.first_big a:eq(0)');
						var img = alink.find('img:eq(0)');
						var wrapper = jQuery('.newslinkstorywrapper');
						if (wrapper.length <= 0) {
							img.css({
								"display":	"block"
							});
							img.wrap('<div class="newslinkstorywrapper" style="position:relative;height:'+img.height()+'px;"></div>');
							var leggi = jQuery('.cls-ico_storia:eq(0) .layer').text();
							jQuery('.newslinkstorywrapper').append(
								'<div class="newslinkstoryhover" style="position:absolute;left:20px;bottom:10px;width:50px;">'+
									'<img src="../images_r13/ico_slider_landing/ico_slider_storia.png" style="border:none;"/>'+
									'<div style="text-transform:uppercase;color:#ffffff;text-align:center;">'+ leggi +'</div>'+
									'<div class="clear"></div>'+
								'</div>'
							);
							alink.click(function() {
								var li = jQuery('ul.slides-container>li.current div.over_link li.cls-ico_storia:first-child>a');
								if (li.length > 0 && li.attr('href').indexOf( jQuery(this).attr('href') )) {
									li.trigger('click');
								}
								else {
									
									jQuery(this).closest('li').find('.link_freccia a')[0].click();
								}
								return false;
							});
						}
						wrapper.css({
							"height":	img.height()
						});
					}, 500);
				});
			}
		}
		else if (alink.length <= 0) {
			jQuery("a[href^='#slider:']").click(function() {
				jQuery(this).closest('li').find('.link_freccia a')[0].click();
			});
		}
		
		
		/*
		jQuery('body').on("click", "a[href^='storytelling:']", function() {
			alert('x');
			return false;
		});
		*/
		
		
	});
	
	
	
	
	//	*****************gestione apertura storytelling OVUNQUE
	
	setInterval(function() {
		jQuery('.is_storytelling:not(.storytelling_everywhere),a[href^=#storytelling]:not(.storytelling_everywhere)').each(function() {	// classe is_storytelling o href che inizia con #storytelling
			var self = jQuery(this);
			self.addClass('storytelling_everywhere');//.css({'border':'2px dotted red'});
			
			self.click(function() {
				
				var storyRef = null;
				var storyDB = null;
				
				if (self.hasClass('is_storytelling')) { // caso marcatura CSS
					var elem = self.get(0);
					var classi = (elem.className +'').split(' ');
					
					for(var i=0; i<classi.length; i++) {
						if (classi[ i ].indexOf('storytelling_num_') >= 0) { // ci sarà una classe CSS con suffisso comune e il numero che identifica lo storytelling da caricare (REF tabella slides)
							storyRef = classi[ i ].replace('storytelling_num_','');
						}
						else if (classi[ i ].indexOf('storytelling_db_') >= 0) {
							storyDB = classi[ i ].replace('storytelling_db_','');
						}
					}
				}
				else { // caso href
					var hrefData = self.attr('href').split(':');
					//alert(hrefData+"\n"+hrefData.length);
					if (hrefData.length >= 2) {
						storyRef = hrefData[1];
						if (hrefData.length >= 3) {
							storyDB = hrefData[2];
						}
					}
				}
				
				if ( storyRef ) {
					var lang = '_it';
					if (jQuery('.jq_lang_it').length <= 0) {
						lang = '_en';
					}
					var datiGetStory = {
													"id":		storyRef,
													"a":		lang
												};
					if (storyDB) {
						datiGetStory.db = storyDB;
					}
					// carico i dati per lo storytelling
					jQuery
						.ajax({
							"url":	'/ajax/get_storytelling.php',
							"data":	datiGetStory	
						})
						.done(function(dati) {
							
							var datiStory = ''+ dati;
							
							
							if ( parseInt( jQuery(window).width() ) < 980 ) {	// caso pagina
								
								var datiStoryObj = jQuery.parseJSON( datiStory );
								location.href = '/storytelling_pagina/pagina'+ datiStoryObj.numStory +'.html'
								
							}
							else { // caso popup
								
								if ( jQuery('.layer_sottosito').length <= 0 ) { // se non ho il layer in pagina lo carico...
									jQuery
										.ajax({
											"url":	'/ajax/layer_sottosito.php'
										})
										.done(function( tpl ) {
											//alert('layer loaded');
											jQuery('body').append( tpl );
											apriStoryTelling( datiStory, true );
										})
										.fail(function(xhr,status) {
											//Shhh!
										});
								}
								else {
									//alert('layer already exists');
									apriStoryTelling( datiStory, true );
								}
							
							}
							
						})
						.fail(function(xhr,status) {
							//Shhh!
						});
				}
				
				return false;
				
			});
			
		});
	}, 1000);

	adminDropdownExcelInvestors();
	adminCompleteListExcelInvestors();



});
// *******************************************	CHIUSURA CORPO READY		*******************************************

function adminDropdownExcelInvestors()
{
//	gestione tendina numero elementi listati - archivio WR investitori
	allItemsToList = jQuery('.jq_filter_num tr');
	if ( allItemsToList.length > 0 )
	{
		jQuery('.jq_filter_select').show();
		select_field = jQuery('.jq_filter_select select[name=filter_num]');
		select_field.change(function() {
			var thisVal = parseInt(jQuery(this).val());
			allItemsToList.each(function(i) {
				if ( thisVal == 0 || i <= thisVal || i == allItemsToList.length-1 )
					jQuery(this).show();
				else
					jQuery(this).hide();
			});
		});
		select_field.trigger('change');
		var anchorList = jQuery('a[name=contentList]');
		if ( anchorList.length > 0 )
		{
			scrollToAnchor('contentList');
		}
	}
}

function adminCompleteListExcelInvestors()
{
	var listExcel = jQuery('.jq_link_excel');
	if ( listExcel.length > 0 )
	{
		listExcel.each(function() {
			var thisItem = jQuery(this);
			thisItem.click(function() {
				var thisClick = jQuery(this);
				if ( ! thisClick.hasClass('active') )
				{
					listExcel.removeClass('active');
					thisClick.addClass('active');
					ajaxExcel(thisClick.data('id'),thisClick.data('dbdatireale'));
				}
				return false;
			});
		});
	}
}

function ajaxExcel(id,dbdatireale)
{
	setLoader(true,jQuery('.listPlaceholder'));
	jQuery.ajax({
		type: 'GET',
		url: '/ajax/get_datatext_investors.php',
		timeout: 10000,
		data: {
			id: id,
			dbdatireale: dbdatireale
		}
	})
	.done(function(data) {
	//	console.log(data)
	//	jQuery('.excelCompleteList').hide();
		jQuery('.contenuto_ajax').html(data);
		adminDropdownExcelInvestors();
		jQuery('.linkExcel').html('').append(jQuery('.fileExcelLink'));
		setLoader(false);
	})
	.fail(function() {
	//	console.log('recupero dati fallito')
		setLoader(false);
	});
}

function setLoader(bool,objToAppend)
{
	if ( typeof objToAppend == 'undefined' )
	{
		objToAppend = jQuery('body');
		objWindow = jQuery(window);
		objDocument = jQuery(document);
	}
	else
	{
		objWindow = objToAppend;
		objDocument = objToAppend;
	}
	if ( bool )
	{
		objToAppend.css('position', 'relative');
		var ww = objWindow.width();
		var wh = objWindow.height();
		var dw = objDocument.width();
		var dh = objDocument.height();
	//	console.log(ww+" | "+wh)
	//	console.log(wwi+" | "+whi)
	//	console.log(dw+" | "+dh)
		objToAppend.append('<div class="loaderOverlay" />');
		var loaderOverlay = jQuery('.loaderOverlay');
		loaderOverlay.css({
			opacity: 0.5,
			width: dw + 'px',
			height: dh + 'px'
		});
		objToAppend.append('<div class="loaderImage" />');
		var loaderImage = jQuery('.loaderImage');
		loaderImage.css({
			width: ww + 'px',
			height: wh + 'px'
		});
	}
	else
	{
		if ( typeof objToAppend != 'undefined' )
		{
			objToAppend.css('position', 'inherit');
			objToAppend.find('.loaderOverlay').remove();
			objToAppend.find('.loaderImage').remove();
		}
		else
		{
			jQuery('.loaderOverlay').remove();
			jQuery('.loaderImage').remove();
		}
	}
}

function scrollToAnchor(aid)
{
	var anchorPlaceholder = jQuery('a[name=' + aid + ']');
	jQuery('html,body').animate( {scrollTop: anchorPlaceholder.offset().top-120} , 'slow' );
}

VSLI = {
	"canDo":			function() {
							var doit = true;
							if (jQuery('body.ismobile').length > 0) {
								doit = false;
							}
							if (jQuery.browser.msie && (jQuery.browser.version == '8.0' || jQuery.browser.version == '7.0' || jQuery.browser.version == '6.0')) {
								doit = false;
							}
							return doit;
						},
	
	"init":			function() {
							if (VSLI.canDo()) {
								jQuery('li.jq_vsli').each(function(vidx) { // ciclo tutte le slide col video in background
									var vid = VSLI.namex(jQuery(this)[0]); // estraggo il nome del video (e modificatore di id e classi usate)
									if (vid != null) {
										var vsli = jQuery(this);
										if (vsli.length > 0) {
											vsli.data('vid', vid); // salvo in un data dello slider il vid suddetto
											VSLI.inject( vid );
											vsli.find('.cls-ico_storia>a').click(function() { // pausa sul click LEGGI dello storytelling
												VSLI.pause('#video_'+vid);
											});
											vsli.find('.cls-ico_slider_video_bianco>a').click(function() { // pausa sul click VIDEO
												VSLI.pause('#video_'+vid);
											});
											vsli.find('.cls-ico_slider_video_verde>a').click(function() { // pausa sul click VIDEO
												VSLI.pause('#video_'+vid);
											});
										}
										
									}
								});
								jQuery('.maschera,.layer_sottosito .layer_close').click(function() { // chiusura sottosito per click chiudi o velina nera
									var vsliCurr = jQuery('li.jq_vsli.current');
									if (vsliCurr.length > 0) {
										VSLI.play('#video_' + vsliCurr.data('vid'));
									}
								});
								jQuery('.slides-navigation .prev_preview,.slides-navigation .next_preview').click(function() { // gestisco navigazione storytelling
									var self = jQuery(this); // rendo visibile il this al timeout...
									setTimeout( function() {
										var div = self.find('div:eq(0)');
										if (div.hasClass('jq_vsli')) { // cerco se il prev/next cliccato contiene il riferimento a una slide con video
											VSLI.adapt( jQuery('li.jq_vsli_'+ VSLI.namex(div[0])) ); // devi riestrarre il vid, perche sono su un bottone next/prev
										}
										else {
											VSLI.startStop();
										}
									}, 555 );
								});
								G_vid_resizable = null;
								jQuery(window).resize(function() {
									G_vid_resizable = setTimeout(function() {
										clearTimeout( G_vid_resizable );
										VSLI.adapt( jQuery('li.jq_vsli.current') ); // faccio resize SOLO del video correntemente mostrato (se presente)
									}, 500);
								});
							}
						},
	"namex":			function(vsliObj) {		// restituisce la stringa che identifica il video-slider-background
							if (vsliObj && vsliObj.className) {
								var classi = ''+vsliObj.className;
								var classiArr = classi.split(' ');
								for(var i=0; i<classiArr.length; i++) {
									if (classiArr[i].indexOf('jq_vsli_') >= 0) {
										return classiArr[i].replace('jq_vsli_','');
									}
								}
							}
							return null;
						},
	"adapt":			function (vsli) {
							if (vsli.length > 0) { // se l'oggetto passato ha elementi...
								var linkbox = vsli.find('img.main');//vsli.find('.link_cornice_js');
								var vid = vsli.data('vid');
								jQuery('#vslider_'+vid)
									.css({
										"left":	linkbox.css('margin-left')
									})
									.find('.video_cropper')
										.css({
											"width":		linkbox.width(),
											"height":	linkbox.height()
										})
										.find('#video_'+vid)
											.css({
												"width":	linkbox.width()
											});
								VSLI.startStop();
							}
						},
	"inject":		function (vsli_id) {
							var vsli = jQuery('li.jq_vsli_'+vsli_id);
							var linkbox = vsli.find('img.main');//vsli.find('.link_cornice_js')
							var vsli_blockid = 'vslider_'+vsli_id;
							var vid = vsli.data('vid');
						
							//linkbox.before('<div id="'+vsli_blockid+'" style="position:absolute;top:0;left:'+linkbox.css('margin-left')+';">'+
							linkbox.after('<div id="'+vsli_blockid+'" style="position:absolute;top:0;left:'+linkbox.css('margin-left')+';">'+
								'<div class="video_cropper" style="width:'+linkbox.width()+'px;height:'+linkbox.height()+'px;overflow:hidden;">'+
									'<video id="video_'+vid+'" style="width:'+linkbox.width()+'px;" preload="auto" muted="muted" loop="loop">'+
										'<source id="mp4Source" src="/video/'+vid+'.mp4" type="video/mp4" />'+
										'<source id="webmSource" src="/video/'+vid+'.webm" type="video/webm" />'+
									'</video>'+
								'</div>'+
							'</div>');
							VSLI.startStop();
						},
	"startStop":	function() {
							setTimeout(function() {
								var vsliCurr = jQuery('li.jq_vsli.current');
								if (vsliCurr.length > 0) { // se sto mostrando una slide col video...
									VSLI.play('#video_' + vsliCurr.data('vid'));
								}
								else {
									VSLI.pause();
								}
							}, 1000);
						},
	"pause":			function() { 		// pauso tutti i video...
							jQuery('li.jq_vsli').each(function() {
								jQuery( '#video_'+jQuery(this).data('vid') )[0].pause();
							});
							
						},
	"play":			function(id) {
							jQuery(id)[0].play();
							jQuery(id)[0].volume = 0;
						}
}



/**
 *			FUNZIONI APERTURA LAYER SOTTOSITO STORYTELLING
 *
 *			esempio di oggetto jQuery puntato da "questo":
 *			<a id="storyarc_29"
 *				class="bold layer"
 *				bkg="/binary/hr_press_comunicazione/archivio_storytelling/img_sfondo_cambia_finale.1430151669.jpg"
 *				tit="Cambia il finale" stile="cls-slider_blu cls-sfondo_nero"
 *				href="http://hera2.od.loc/slider/90slider:3.html"
 *				target="hera_external_link"
 *			>
 *
 *			esempio di classi da aggiungere per usare l'apertura storytelling ovunque:
 *			is_storytelling storytelling_num_24
 *			dove 24 è il REF del record dello storytelling nella tabella slider
 *
 *			altro esempio:
 *			is_storytelling storytelling_num_24 storytelling_db_hr_gruppo
 *
 *			nel caso la tabella di riferimento non sia in hr_adm, ma su altro db
 */
function apriStoryTelling( questo, disableArrows ) {	//e) {
	//questo = jQuery(this);
	//e.preventDefault();
	
	jQuery(window).scrollTop(0);
	
	//alert(questo);
	
	var dati = null;
	//if ( ! jQuery.isPlainObject( questo ) ) {
	if ( (''+questo).indexOf('titolo') >= 0 ) {
		dati = jQuery.parseJSON( questo );
	}
	
	if ( dati == null && questo ) {
		if (questo.parents('.box_archivio_3colonne_box4').length)
			questo.parents('.box_archivio_3colonne_box4').addClass('current');
	}
		
	// ****crea maschera grigia
	jQuery('div.maschera').css({'top':'0'});
	altezzaMaschera = parseInt(jQuery('body').height());
	if ( altezzaMaschera < parseInt(jQuery(window).height()) )
	{
		altezzaMaschera = parseInt(jQuery(window).height());
	}
	var layHei = jQuery('.layer_sottosito').height();

	if ( (layHei + (40 * 2)) > altezzaMaschera )
	{
		altezzaMaschera = ( layHei + ( 40 * 2 ) );
	}
	jQuery('div.maschera').css('height',altezzaMaschera);

	jQuery('div.maschera').fadeIn(500);
	// *****imposta lo sfondo
	if ( dati == null ) {
		urlSfondo = questo.attr('bkg');
		titolo = questo.attr('tit');
		urlLink = questo.attr('href');
	}
	else {
		urlSfondo = dati.immagine;
		titolo = dati.titolo;
		urlLink = dati.link;
	}

	//////larghezza = parseInt(jQuery('.container').width());
	//larghezza = parseInt(Math.max( 900, jQuery('.container').width() -100 ));
	larghezza = parseInt(jQuery('.container').width()-100);	//MODIFICA RESPONSIVE
	larghezzaWindow = parseInt(jQuery(window).width());
	larghezzaFrecce = parseInt(jQuery('.frecce .news_next').width());
	larghezzaFrecce = larghezzaFrecce*2;
	larghezzaFrecce = larghezza + larghezzaFrecce;
	spostamentoFrecce = -parseInt(jQuery('.frecce .news_next').width());
	
	// ****adattamento in base alla larghezza
	jQuery('div.layer_overflow').css({'top':'40px','width':larghezzaFrecce,'left':(larghezzaWindow-larghezzaFrecce)/2});
	
	//----FUNZIONE NUOVA PER CAMBIO COLORE SFONDO
	if ( dati == null ) {
		cssLayer = questo.attr('stile');
	}
	else {
		cssLayer = dati.css;
	}
	
	layer = jQuery('div.layer_sottosito');
	layer.removeAttr('class');
	layer.addClass('layer_sottosito');
	jQuery('div.layer_sottosito').addClass(cssLayer);
	//---FINE FUNZIONE NUOVA
	jQuery('div.layer_sottosito').css({'top':0,'background-image':'url("'+urlSfondo+'")','width':larghezza,'left':parseInt(jQuery('.frecce .news_next').width())});
	 jQuery('.frecce').css({'width':larghezzaFrecce,'left':spostamentoFrecce});
	 //jQuery('div.layer_sottosito').prepend('<h2>'+titolo+'</h2>');
	 // ***carica contenuto*******
	 //jQuery('div.layer_sottosito .contenuto').load( urlLink, function(e) {
	jQuery
		.ajax({
			url:	urlLink
		})
		.done(function(data) {
			if (jQuery.browser.msie && jQuery.browser.version == '8.0')
			{
				try
				{
					var txt = ''+data;
					var scriptList = [];
					var out = '';
					var splt1 = txt.split('<script type="text/javascript">');
					out += splt1[0];
					for (var i=1; i<splt1.length; i++)
					{
						var splt2 = splt1[i].split('</script>');
						if (splt2.length > 1)
						{
							scriptList.push(splt2[0]);
							out += splt2[1];
						}
						else
						{
							out += splt2[0];
						}
					}
					jQuery('div.layer_sottosito .contenuto').html( out );
					
					for (var i=0;i<scriptList.length; i++)
					{
						eval( scriptList[i] );
					}
				}
				catch(e)
				{
					alert('errore: '+e);
				}
			}
			else
			{
				jQuery('div.layer_sottosito .contenuto').html( data );
			}

			setTimeout(function() {
				jQuery('div.layer_sottosito .container').append( '<div class="clear"></div>' );
				jQuery('.frecce .news_next').hide();
				jQuery('.frecce .news_prev').hide();
				if ( disableArrows != true )
				{
					jQuery('.frecce').show();
				}
				else
				{
					jQuery('.frecce').hide();
				}
				jQuery('div.layer_overflow').fadeIn(500);
				jQuery('div.layer_sottosito').fadeIn(500,function() {
				//	***ingrandimento eventuale maschera
					altezzaBox = parseInt(jQuery('div.layer_overflow').height());
					if (altezzaMaschera < altezzaBox )
					{
						jQuery('div.maschera').css('height', altezzaBox + ( 40 * 2 ) );
					}
				});
				jQuery('.currentnews').removeClass('currentnews');
				if ( dati == null )
				{
					questo.parents('li.current, div.current').addClass('currentnews');
				}
			//	****adatta altezza layer per gestire overflow
				jQuery('div.layer_overflow').css({'height':jQuery('.layer_sottosito').height()});
				setTimeout(function() {
				//	jQuery('div.layer_overflow').css({'height':jQuery('.layer_sottosito').height()});
					jQuery('div.layer_overflow').css({'height':altezzaBox});
				//	jQuery('.layer_sottosito').height( jQuery('.layer_sottosito').height() + 20 );
				//	*****livella le altezze delle colonne
					if ( jQuery('.layer_sottosito .colonna_dx').height() < jQuery('.layer_sottosito .notizia').height() )
					{
						jQuery('.layer_sottosito .colonna_dx').css('height',jQuery('.layer_sottosito .notizia').height() + 20);
					}
					else
					{
						jQuery('.layer_sottosito .colonna_dx').css('height',jQuery('.layer_sottosito .colonna_dx').height() + 20);
					}
					if ( jQuery('.layer_sottosito').height() > jQuery('div.layer_overflow').height() )
					{
						var altezzaBox = parseInt(jQuery('div.layer_overflow').height());
						var marginTop = parseInt(jQuery('div.layer_overflow .layer_sottosito').css('marginTop').replace('px',''));
					//	alert(altezzaBox+" | "+marginTop)
						altezzaBox += marginTop + 20;
						jQuery('div.layer_overflow').height(altezzaBox);
						if ( ( jQuery('div.maschera').height() + marginTop + 20 ) > jQuery('body').height() )
							jQuery('div.maschera').height( jQuery('div.maschera').height() + marginTop + 20 );
					}
				}, 1500);
				elSuccessivo = jQuery('.currentnews').next().find('li a.layer');
				elPrecedente = jQuery('.currentnews').prev().find('li a.layer');
				//alert(elSuccessivo.length+ ' ppp');
				if (elSuccessivo.length < 1)
				{
					elSuccessivo = jQuery('.currentnews').next().find('h2 a.layer');
				}
				if (elPrecedente.length < 1)
				{
					elPrecedente = jQuery('.currentnews').prev().find('h2 a.layer');
				}
			//	*****controllo per apertura pulsanti di navigazione
				if ( elSuccessivo.attr('href') !== undefined ) {
					jQuery('.frecce .news_next').fadeIn(500);
				}
				if ( elPrecedente.attr('href') !== undefined ) {
					jQuery('.frecce .news_prev').fadeIn(500);
				}
				jQuery('.layer_close').fadeIn(500);

		/*	//	*****livella le altezze delle colonne
				if (jQuery('.layer_sottosito .colonna_dx').height()<jQuery('.layer_sottosito .notizia').height()) {
					jQuery('.layer_sottosito .colonna_dx').css('height',jQuery('.layer_sottosito .notizia').height());
				} */
				//attiva prettyphoto sul layer
				jQuery('.layer_sottosito a[href$=#prettyPhoto]').each(function() {
					jQuery(this).attr('href', jQuery(this).attr('href').replace('#prettyPhoto',''));
					if (jQuery(this).attr('target'))
					{
						jQuery(this).removeAttr('target');
					}
					jQuery(this).prettyPhoto();
					jQuery(this).attr('rel','prettyPhoto');
				});
				jQuery("a[rel^='prettyPhoto']").prettyPhoto();
				
				
				jQuery('div.layer_close').one('click', function(e) {
					e.preventDefault();
					jQuery('div.layer_sottosito').fadeOut(500,function() {
						jQuery(this).css('top','-9999px');
						jQuery(this).find('h2').remove();
						jQuery(this).find('contentuto').html('');
						jQuery('div.layer_overflow').hide();
					});
					jQuery('div.maschera').fadeOut(500,function() {
						jQuery(this).css({'top': '-9999px','height':'0px'});
					});
				});

				jQuery('div.maschera').one('click', function(e) {
					jQuery('div.layer_sottosito').fadeOut(500,function() {
					 jQuery(this).css('top','-9999px');
					 jQuery(this).find('h2').remove();
					 jQuery(this).find('contentuto').html('');
					 jQuery('div.layer_overflow').hide();
					});
					jQuery('div.maschera').fadeOut(500,function() {
						jQuery(this).css({'top': '-9999px','height':'0px'});
					});
				});
			},500);
		})
		.fail(function(xhr, status) {
			alert(status);
		});
}

//	controllo pulsante invio su form
function console_log(str)
{
	jQuery('#console_log').append(str + '<br/>');
}
G_temp_noclick = null;
G_form_focus = null;
function checkLoginForm()
{
	if ( jQuery('.form_login_sol_interna #username').is(":focus") || jQuery('.form_login_sol_interna #password').is(":focus") || jQuery('.form_login_sol_interna #submit').is(":focus") )
	{
		whoFrom = jQuery('.form_login_sol_interna #username, .form_login_sol_interna #password, .form_login_sol_interna #submit');
		whoFrom.unbind('focus');
		whoFrom.each(function() {
			thisItem = jQuery(this);
			if ( thisItem.is(":focus") )
			{
				G_form_focus = thisItem.closest('.form_login_sol_interna');
			}
		});
		console_log(G_form_focus+" | "+G_form_focus.length)
		var valuser = jQuery.trim(G_form_focus.find('#username').val());
		var valpwd = jQuery.trim(G_form_focus.find('#password').val());
	//	console_log("-"+jQuery.trim(valuser.val()).length+"|"+jQuery.trim(valpwd.val()).length+"-")
	//	console_log("-"+valuser+"|"+valpwd+"-")
	//	console_log("-"+valuser.length+"|"+valpwd.length+"-")
		if ( valuser.length != 0 && valpwd.length != 0 )
		{
			G_form_focus.unbind('submit');
			G_form_focus.find("#submit").unbind('click');
			G_form_focus.submit();
		}
		else
		{
			G_temp_noclick = true;
			alert('I campi \'Username\' e \'Password\' devono essere compilati')
		}
		return false;
	}
}
jQuery(function() {
	jQuery('body').append('<div id="console_log"></div>');
	jQuery('#console_log').css({
		'display'			:	'none',
		'position'			:	'fixed',
		'top'				:	0,
		'left'				:	0,
		'z-index'			:	99999,
		'padding'			:	'10px',
		'border'			:	'1px solid red',
		'background-color'	:	'white'
	});
	jQuery(".form_login_sol_interna #submit").unbind('click');
	jQuery('.form_login_sol_interna #submit').click(function(e) {
		console_log('click intercepted');
		if ( ! G_temp_noclick )
		{
			e.preventDefault(e);
			checkLoginForm();
		}
		G_temp_noclick = null
	});
//	blocco il submit della form login per qualunque altra occasione (perché ha precedenza)
//	jQuery('.form_login_sol_interna').unbind('submit');
	jQuery('.form_login_sol_interna').submit(function(e) {
		console_log('submit intercepted');
		e.preventDefault(e);
	});
	jQuery(window).keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode));
		if ( keycode == 13 )	//	keycode for enter key
		{
			G_temp_noclick = null
		//	console_log(222)
		//	jQuery('.form_login_sol_interna #submit').click();
		//	jQuery('.form_login_sol_interna').submit();
			if ( jQuery('#comune_pag_form #clienti_comune').is(":focus") )
			{
				var valSearched = jQuery.trim(jQuery('#comune_pag_form #clienti_comune').val());
				if ( valSearched.length != '' )
				{
					jQuery('#comune_pag_form').submit();
				}
				else
				{
					alert('Non hai selezionato alcun Comune')
				}
				return false;
			}
			checkLoginForm();
		//	return false;
		}
	});

	var dataLayerGenericBoxes = jQuery('.box_layout.box_datalayer');
	if ( dataLayerGenericBoxes.length > 0 )
	{
		dataLayerGenericBoxes.each(function() {
			var thisBox = jQuery(this);
			thisBox.find('.box_lista_allegati a').click(function() {
				console_log('dataLayerPush: '+jQuery(this).text().replace("/","\\/"));
				dataLayerPush('Click',jQuery(this).text().replace("/","\\/"),'widget','Widget')
			//	return false;
			});
			if ( thisBox.hasClass('box_default_banner') )
			{
				thisBox.find('a').click(function() {
					console_log('dataLayerPush image: '+jQuery(this).find('img').attr('alt').replace("/","\\/"));
					dataLayerPush('Click',jQuery(this).find('img').attr('alt').replace("/","\\/"),'widget','Widget')
				//	return false;
				});
			}
		});
	}
});

function resetSeeVideoBtns(id)
{
//	console.log(id+" | "+jQuery('.float_link.gruppo_blu.gruppo_'+id).length)
	jQuery('.float_link.gruppo_blu.gruppo_'+id+' li>a').toggleClass('hidden');
	jQuery('#video_'+id).data('see_click_on',1);
}

function get_all_videos(id,collapseTo)
{
	jQuery
		.ajax({
			'url':		'//'+location.hostname+'/ajax/get_all_videos.php',
			'data':		{
							'id'			:	id,
							'perc'			:	G_perc,
							'collapseTo'	:	collapseTo
						},
			'cache':	false
		})
		.done(function(data) {
			console_log(data);
			jQuery('#video_'+id).html('').html( data );
			setLoader(false,jQuery('#video_'+id));
			resetSeeVideoBtns(id);
			jQuery("a[rel^='prettyPhoto']").prettyPhoto();
		})
		.fail(function(xhr, status) {
		//	alert('['+uniquid+'] AJAX error: '+status);
		//	alert('http://'+location.hostname+'/gruppo/90box:'+boxRef+'::db:'+dbName+'.html');
			setLoader(false);
			resetSeeVideoBtns(id);
		});
}

jQuery(function() {
//	caricamento altri video su web_channel
	var video_page = jQuery('.video_r15');
	if ( video_page.length > 0 )
	{
		var links = jQuery('.float_link.gruppo_blu li>a');
		if ( links.length > 0 && ! links.closest('.float_link.gruppo_blu').hasClass('no_js_follow') )
		{
			links.each(function() {
				var thisLink = jQuery(this);
				var id = thisLink.data('id');
				var video_box = thisLink.closest('.float_link.gruppo_blu').siblings('#video_'+id);
				video_box.data('see_click_on',1);
				thisLink.click(function() {
					var thisClick = jQuery(this);
				//	console_log(id);
					if ( video_box.data('see_click_on') )
					{
						setLoader(true,jQuery('#video_'+id));
						if ( thisClick.hasClass('see_more') )
							get_all_videos(id,0);
						else
							get_all_videos(id,4);
						thisClick.data('see_click_on',0);
					}
					return false;
				});
			});
		}
	}
});