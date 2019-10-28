// GLOBALI

// struttura organizzativa
var APPEAR_TIME = 300;
var hot_spot_timein = null;

//FUNZIONI
function checkMobile() {
	if (navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPhone Simulator' || navigator.platform == 'iPad Simulator') {
		return true;
	}
	return false;
}

function getLanguage() {
	if (jQuery('.jq_lang').length > 0) {
		var objLang = jQuery('.jq_lang');
		objLang = objLang.get(0);
		var classi = (''+(objLang.className)).split(' ');
		for(var i=0; i<classi.length; i++) {
			if (classi[i].indexOf('jq_lang_') >= 0) {
				return classi[i].replace('jq_lang_','');
			}
		}
	}
	return 'it';
}

// struttura organizzativa
var showPup_thumbnailCache = [];
function onResizeShowPup() {
	jQuery(window).unbind('resize',onResizeShowPup);
	if (jQuery('.map_container').length>0) {
		jQuery('.tree_tip,.tree_tip_cover,.tree_tip_cover_link,.tree_tip_cover_clip').hide().css({
			top:	'-10000px'							
		});
		jQuery('.tree_tip_out').hide().css({
			width:	'0px',
			height:	'0px'
		});
		var imgmap = jQuery('.map_position').find('img:eq(0)');
		var daddy = jQuery('.map_container');
		var dadleft = daddy.offset().left-0;
		daddy.css('paddingLeft',Math.floor( (jQuery(window).width() - imgmap.attr('width'))/2 -dadleft));
	}
}
function showPup(hot_spot_this) {
  //try{
	jQuery('.tree_tip__link').attr('href', '../../../foto_small.gif');
  
	var baseaddr = ''+location.href;
	baseaddr = baseaddr.split('/');
	baseaddr = 'http://'+baseaddr[2]+'/';

	var href = ''+hot_spot_this.attr('href');
		//href = href.replace('www.gruppohera.it','hera2.od.loc');	// per prove su sviluppo			############# ATTENZIONE !!!  #####################
	var text = ''+hot_spot_this.attr('alt');	//alert(href+"\n"+text);
	var title = '';
	var subtitle = '';
	if (text.indexOf(',') >= 0) {
		text = text.split(',');
		title = jQuery.trim(text[1]);
		subtitle = jQuery.trim(text[0]);
	}
	else {
		title = jQuery.trim(text);
	}

	
		jQuery('.tree_tip__title').html(title);
		jQuery('.tree_tip__subtitle').html(subtitle);
		jQuery('.tree_tip__link').hide();
		jQuery('.tree_tip__link').attr('href', href);
		
		var coords = hot_spot_this.attr('coords');
////	  try{
		if (coords!='undefined') {
			coords = coords.split(',');
			//alert(coords); // xa, ya, xb, yb
		}
////	  }catch(e){alert('errore coords: '+e+"\nhot_spot: "+hot_spot_this.nodeName);}

		var imgmap = jQuery('.map_position').find('img:eq(0)');
		//alert(jQuery(window).width() +"\n"+ imgmap.attr('width') +"\n" + Math.floor((jQuery(window).width() - imgmap.attr('width'))/2));
		var daddy = jQuery('.map_container');
		var dadleft = daddy.offset().left-0;
		daddy.css('paddingLeft',Math.floor( (jQuery(window).width() - imgmap.attr('width'))/2 -dadleft));
		hot_spot_this = jQuery('.map_position');


		var hot_spot_this__width  = Math.round((coords[2]-0) - (coords[0]-0));
		var hot_spot_this__height = Math.round((coords[3]-0) - (coords[1]-0));
		var hot_spot_this__position_left = Math.round((hot_spot_this.offset().left-0) + (coords[0]-0) );
		var hot_spot_this__position_top  = Math.round((hot_spot_this.offset().top-0)  + (coords[1]-0) );
		//alert(hot_spot_this__width+","+hot_spot_this__height+"\n"+hot_spot_this__position_left+","+hot_spot_this__position_top);		
		
		var pos = 'sx';
		if (hot_spot_this__position_left < 250) {
			pos = 'dx';
		}
		if (hot_spot_this__position_top -jQuery(window).scrollTop() < 50) {
			pos = 'dw';
		}
		if (jQuery(window).height()-0 - hot_spot_this__position_top +jQuery(window).scrollTop() < 50) {
			pos = 'up';
		}
		if (jQuery(window).width()-0 - hot_spot_this__position_left < 200) {
			pos = 'sx';
		}
		//alert(pos+"\n"+hot_spot_this__position_left+","+hot_spot_this__position_top+"\n"+(jQuery(window).height()-0 - hot_spot_this__position_top));

		if (pos == 'sx') {
			jQuery('.tree_tip').css({
									width:	'223px',
									height:	'85px'
								});
			jQuery('.tree_tip_shadow,.tree_tip_cloud').css({
									width:	'221px',
									height:	'83px'
								});
			jQuery('.tree_tip_shadow').css({
										backgroundImage:	'url('+baseaddr+'immagini/tooltip_nero_sx.gif)'
									});
			jQuery('.tree_tip_cloud').css({
										backgroundImage:	'url('+baseaddr+'immagini/tooltip_bianco_sx.gif)'
									});
			jQuery('.tree_tip_padding').css({
											padding:	'6px 20px 7px 7px'
										});
			jQuery('.tree_tip,.tree_tip_cover').css({
															top:	(Math.round(hot_spot_this__height/2 + hot_spot_this__position_top) -64)+'px',
															left:	(Math.round(hot_spot_this__position_left) -211)+'px',
															width:	(223 + Math.round(hot_spot_this__width))+'px'
														});
			jQuery('.tree_tip_cover_link').css({
														top:	(Math.round(hot_spot_this__height/2 + hot_spot_this__position_top) -62 +65)+'px',
														left:	(Math.round(hot_spot_this__position_left) -95)+'px'
													});
			jQuery('.tree_tip_cover_clip').css({
														top:	(Math.round(hot_spot_this__position_top - (85-hot_spot_this__height)))+'px',
														left:	(Math.round(hot_spot_this__position_left))+'px',
														width:	(Math.round(hot_spot_this__width))+'px',
														height:	(Math.round(85-hot_spot_this__height))+'px'
													});
			jQuery('.tree_tip_out').css({
												width:	(Math.round(jQuery(window).width()-0))+'px',
												height:	(Math.round(jQuery(window).height()-0))+'px'
											});
		}
		else if (pos == 'dx') {
			jQuery('.tree_tip').css({
									width:	'223px',
									height:	'85px'
								});
			jQuery('.tree_tip_shadow,.tree_tip_cloud').css({
									width:	'221px',
									height:	'83px'
								});
			jQuery('.tree_tip_shadow').css({
										backgroundImage:	'url('+baseaddr+'immagini/tooltip_nero_dx.gif)'
									});
			jQuery('.tree_tip_cloud').css({
										backgroundImage:	'url('+baseaddr+'immagini/tooltip_bianco_dx.gif)'
									});
			jQuery('.tree_tip_padding').css({
											padding:	'6px 7px 7px 18px'
										});
			jQuery('.tree_tip').css({ //background:'red',
												top:	(Math.round(hot_spot_this__height/2 + hot_spot_this__position_top) -64)+'px',
												left:	(Math.round(hot_spot_this__position_left + hot_spot_this__width) -11)+'px',
												width:	(223)+'px',
												height:	(85)+'px'
											});
			jQuery('.tree_tip_cover').css({ //background:'yellow', opacity:'0.5',
													top:	(Math.round(hot_spot_this__height/2 + hot_spot_this__position_top) -64)+'px',
													left:	(Math.round(hot_spot_this__position_left) )+'px',
													width:	(223 +Math.round(hot_spot_this__width) -10)+'px',
												height:	(85)+'px'
												});
			jQuery('.tree_tip_cover_link').css({
														top:	(Math.round(hot_spot_this__height/2 + hot_spot_this__position_top) +3)+'px',
														left:	(Math.round(hot_spot_this__position_left + hot_spot_this__width) +117)+'px'
													});
			jQuery('.tree_tip_cover_clip').css({
														top:	(Math.round(hot_spot_this__position_top - (85-hot_spot_this__height)))+'px',
														left:	(Math.round(hot_spot_this__position_left))+'px',
														width:	(Math.round(hot_spot_this__width))+'px',
														height:	(Math.round(85-hot_spot_this__height))+'px'
													});
			jQuery('.tree_tip_out').css({
												width:	(Math.round(jQuery(window).width()-0))+'px',
												height:	(Math.round(jQuery(window).height()-0))+'px'
											});
		}
		else if (pos == 'up') {
			jQuery('.tree_tip').css({
									width:	'211px',
									height:	'96px'
								});
			jQuery('.tree_tip_shadow,.tree_tip_cloud').css({
									width:	'209px',
									height:	'94px'
								});
			jQuery('.tree_tip_shadow').css({
										backgroundImage:	'url('+baseaddr+'immagini/tooltip_nero_up.gif)'
									});
			jQuery('.tree_tip_cloud').css({
										backgroundImage:	'url('+baseaddr+'immagini/tooltip_bianco_up.gif)'
									});
			jQuery('.tree_tip_padding').css({
											padding:	'6px 7px 20px 7px'
										});
			jQuery('.tree_tip').css({ //background:'red',
												top:	(Math.round(hot_spot_this__position_top) -89)+'px',
												left:	(Math.round(hot_spot_this__position_left) )+'px',
												width:	(211)+'px',
												height:	(96)+'px'
											});
			jQuery('.tree_tip_cover').css({ //background:'yellow', opacity:'0.5',
													top:	(Math.round(hot_spot_this__position_top) -89)+'px',
													left:	(Math.round(hot_spot_this__position_left) )+'px',
													width:	(211)+'px',
													height:	(96 + Math.round(hot_spot_this__height) -5)+'px'
												});
			//alert('x '+navigator.appVersion);
			//alert(jQuery.browser.mozilla && !jQuery.browser.chrome());
			if (jQuery.browser.mozilla || jQuery.browser.chrome()) {
				jQuery('.tree_tip_cover_link').css({
														top:	(Math.round(hot_spot_this__height/2 + hot_spot_this__position_top) -44)+'px',
														left:	(Math.round(hot_spot_this__position_left + hot_spot_this__width) +39)+'px'
													});
			}
			else {
				jQuery('.tree_tip_cover_link').css({
														top:	(Math.round(hot_spot_this__height/2 + hot_spot_this__position_top) -44)+'px',
														left:	(Math.round(hot_spot_this__position_left + hot_spot_this__width) +9)+'px'
													});
			}
			jQuery('.tree_tip_cover_clip').css({
														top:	(Math.round(hot_spot_this__position_top))+'px',
														left:	(Math.round(hot_spot_this__position_left + hot_spot_this__width))+'px',
														width:	(Math.round(211 - hot_spot_this__width))+'px',
														height:	(Math.round(hot_spot_this__height))+'px'
													});
			jQuery('.tree_tip_out').css({
												width:	(Math.round(jQuery(window).width()-0))+'px',
												height:	(Math.round(jQuery(window).height()-0))+'px'
											});
		}
		else if (pos == 'dw') {
			jQuery('.tree_tip').css({
									width:	'211px',
									height:	'96px'
								});
			jQuery('.tree_tip_shadow,.tree_tip_cloud').css({
									width:	'209px',
									height:	'94px'
								});
			jQuery('.tree_tip_shadow').css({
										backgroundImage:	'url('+baseaddr+'immagini/tooltip_nero_dw.gif)'
									});
			jQuery('.tree_tip_cloud').css({
										backgroundImage:	'url('+baseaddr+'immagini/tooltip_bianco_dw.gif)'
									});
			jQuery('.tree_tip_padding').css({
											padding:	'17px 7px 7px 7px'
										});
			jQuery('.tree_tip').css({ //background:'red',
												top:	(Math.round(hot_spot_this__position_top + hot_spot_this__height) -5)+'px',
												left:	(Math.round(hot_spot_this__position_left) )+'px',
												width:	(211)+'px',
												height:	(96)+'px'
											});
			jQuery('.tree_tip_cover').css({ //background:'yellow', opacity:'0.5',
													top:	(Math.round(hot_spot_this__position_top))+'px',
													left:	(Math.round(hot_spot_this__position_left) )+'px',
													width:	(211)+'px',
													height:	(96 + Math.round(hot_spot_this__height) -5)+'px'
												});
			jQuery('.tree_tip_cover_link').css({
														top:	(Math.round(hot_spot_this__position_top) +110)+'px',
														left:	(Math.round(hot_spot_this__position_left) +115)+'px'
													});
			jQuery('.tree_tip_cover_clip').css({
														top:	(Math.round(hot_spot_this__position_top))+'px',
														left:	(Math.round(hot_spot_this__position_left + hot_spot_this__width))+'px',
														width:	(Math.round(211 - hot_spot_this__width))+'px',
														height:	(Math.round(hot_spot_this__height))+'px'
													});
			jQuery('.tree_tip_out').css({
												width:	(Math.round(jQuery(window).width()-0))+'px',
												height:	(Math.round(jQuery(window).height()-0))+'px'
											});
		}
		
		
		
			
	
	jQuery('.tree_tip__image').attr('src', baseaddr+'immagini/foto_small.gif');
	
	var imgsrc = href;
	imgsrc = imgsrc.replace('.html','-20x.html');
	if ((showPup_thumbnailCache[imgsrc]+'') != 'undefined') {//alert('load cache: '+imgsrc);
		jQuery('.tree_tip__image').attr('src', showPup_thumbnailCache[imgsrc]);
		jQuery('.tree_tip,.tree_tip_cover,.tree_tip_cover_link,.tree_tip_cover_clip,.tree_tip_out').show();
		jQuery('.tree_tip__link').show(); // added to fix link disappear
		setTimeout(function(){
			jQuery(window).bind('resize',onResizeShowPup);
		},500);
		/*if (href == '#') {
				jQuery('.tree_tip_cover_link').hide();
			}*/
	}
	else {//alert('load NON cached '+imgsrc);
		jQuery('.ajax_loadplace').load( imgsrc, '', function(responseText, textStatus, XMLHttpRequest) {
			responseText = jQuery.trim(responseText);
			var splitted = responseText.split('#');
			responseText = splitted[0]; // url immagine			
			if (responseText.indexOf('DOCTYPE')>=0) {
				responseText = baseaddr+'immagini/foto_small.gif';
			}
			else if (responseText.indexOf('.gif')<0 && responseText.indexOf('.jpg')<0 && responseText.indexOf('.jpeg')<0 && responseText.indexOf('.png')<0) {
				responseText = baseaddr+'immagini/foto_small.gif';
			}
			showPup_thumbnailCache[imgsrc] = responseText;
			jQuery('.tree_tip__image').attr('src', responseText);
			jQuery('.tree_tip,.tree_tip_cover,.tree_tip_cover_clip,.tree_tip_out').show();
			if (splitted[1] != 1) {
				jQuery('.tree_tip__link').show();
				jQuery('.tree_tip_cover_link').show();
			}
			else{
				jQuery('.tree_tip__link').hide();
				jQuery('.tree_tip_cover_link').hide();
			}
			setTimeout(function(){
				jQuery(window).bind('resize',onResizeShowPup);
			},500);
			/*if (href == '#') {
				jQuery('.tree_tip_cover_link').hide();
			}*/
		});
	}
	
	
  //}catch(e){alert(e);}
}
	
// JQUERY ###################################################################################################################################
jQuery.noConflict();
jQuery.browser.chrome = function() {
	var appver = navigator.appVersion+'';
	if (appver.indexOf('Chrome')>=0) {
		return true;
	}
	return false;
}
jQuery(document).ready(function(){
	/**
	 *		questa parte permette al form di funzionare anche con la componente di autocompletamento
	 *		in pratica la funzionalità seguente serve a intercettare il submit della ricerca e
	 *		popolare il campo "q" con il valore fittizio visualizzato a video su cui agisce l'autocomplete.
	 *		Questo perchè il campo fittizio ha nome e id contententi un timestamp, cosa che serve ad
	 *		evitare che entri in azione l'autocomplete dell'input presente nei browser.
	 */
	//if (jQuery('.jq_q_terms').length > 0) {
  try{
	var at_cache = {};	
	//if ( GLOBAL_jq_q_terms.length > 0 ) {
	if ( jQuery('.jq_autocomp').length > 0 ) {
		var d = new Date();
		var ts = '' + d.getFullYear() + d.getMonth() + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds();
//		var jqq_terms = GLOBAL_jq_q_terms.split(',');
		jQuery('.jq_autocomp,#sf>form').each(function(){
			var sf_q = jQuery(this).find('#q');
			var jq_q = sf_q.clone(false);			
			jq_q.hide();
			jQuery(this).append(jq_q);
			
			sf_q.attr('id','jq_q__' +ts);
			sf_q.attr('name','jq_q__' +ts);
			sf_q.addClass('jq_q');

			//if (jQuery('.jq_q_autocomp_en').length > 0) {
			if ( getLanguage() != 'it' ) {
				//jqq_terms,{width:'118px', highlight: false, selectFirst: false});
				jQuery(this).find(".jq_q").autocomplete({
					//open:		function() { jQuery('.ui-menu').width(118) },
					open:		function() { //alert('1');
									jQuery('.ui-menu').width(212);/*152)*/
									/*var liHei = 0;
									jQuery(this).autocomplete('widget').each(function(){
										liHei += jQuery(this).height() +6;
									});
									//alert(liHei);
									jQuery(this).autocomplete('widget').css({
										'z-index':		9999,
										'overflow':		'auto',
										'height':		Math.min(200, liHei)
									});*/
								},
					source: 	function(request, response){
									try{
										var term = request.term;
										if (term in at_cache) {
											response( at_cache[ term ] );
											return;
										}
									}
									catch(e) { alert('e1: '+e.message); }
									try{
										jQuery.getJSON(
											"/ajax/get_searchterms.php",
											{
												"term":		term,
												"lingua":	"en"
											},
											function(data, status) {
												try{
													//alert(data);
													at_cache[ term ] = data;
													response( data );
												}
												catch(e) { alert('e3a: '+e.message); }
											}
										);
									}
									catch(e) { alert('e2a: '+e.message); }
								},
					minLength:	1
				});
			}
			else if (jQuery(this).hasClass('jq_autocomp')) {
				//jQuery(this).find(".jq_q").autocomplete(jqq_terms,{width:'152px', highlight: false, selectFirst: false});
				jQuery(this).find(".jq_q").autocomplete({
					open:		function() { //alert('2');
									jQuery('.ui-menu').width(212);/*152)*/
									jQuery(this).autocomplete('widget').css({
										'z-index':		9999,
										'overflow-x':	'hidden',
										'overflow':		'auto',
										'height':		'auto'
									});
									//document.title = jQuery(this).autocomplete('widget').height();
									if (jQuery(this).autocomplete('widget').height() > 200) {
										jQuery(this).autocomplete('widget').css({
											'height':	200
										});
									}
								},
					source: 	function(request, response){
									try{
										var term = request.term;
										if (term in at_cache) {
											response( at_cache[ term ] );
											return;
										}
									}
									catch(e) { alert('e1: '+e.message); }
									try{
										jQuery.getJSON(
											"/ajax/get_searchterms.php",
											{
												"term":		term
											},
											function(data, status) {
												try{
													//alert(data);
													at_cache[ term ] = data;
													response( data );
												}
												catch(e) { alert('e3b: '+e.message); }
											}
										);
									}
									catch(e) { alert('e2b: '+e.message); }
								},
					minLength:	1
				});
			}
			else {
				//jQuery(this).find(".jq_q").autocomplete(jqq_terms,{highlight: false, selectFirst: false});
				jQuery(this).find(".jq_q").autocomplete({
					open:		function() { //alert('3');
									jQuery('.ui-menu').width(212);/*152)*/
									jQuery(this).autocomplete('widget').css({
										'z-index':		9999,
										'overflow-x':	'hidden',
										'overflow':		'auto',
										'height':		'auto'
									});
									//document.title = jQuery(this).autocomplete('widget').height();
									if (jQuery(this).autocomplete('widget').height() > 200) {
										jQuery(this).autocomplete('widget').css({
											'height':	200
										});
									}
								},
					source: 	function(request, response){
									try{
										var term = request.term;
										if (term in at_cache) {
											response( at_cache[ term ] );
											return;
										}
									}
									catch(e) { alert('e1: '+e.message); }
									try{
										jQuery.getJSON(
											"/ajax/get_searchterms.php",
											{
												"term":		term
											},
											function(data, status) {
												try{
													alert(data);
													at_cache[ term ] = data;
													response( data );
												}
												catch(e) { alert('e3c: '+e.message); }
											}
										);
									}
									catch(e) { alert('e2c: '+e.message); }
								},
					minLength:	1
				});
			}
			//jQuery( ".jq_q" ).autocomplete( "option", "position", { my : "right top", at: "right bottom" } );
			
			jQuery(this).removeAttr('onsubmit');
			jQuery(this).submit(function(){
				jQuery(this).find('#q').val(jQuery(this).find(".jq_q").val());
				return true;
			});

			/*
			 *		meta filter
			 */
			var metafilter = jQuery('meta[name=servizio_comune]');
			if (metafilter.length > 0) {
				var metainput = jQuery('<input name="requiredfields" value="servizio_comune:'+metafilter.attr('content')+'" style="display:none;"/>');
				jQuery(this).append(metainput);
				jQuery('#site').val('gh_clienti_it');
			}			
		});
	}
  } catch(e) {
	// HIDDEN
	alert(e.message);
  }
	
	
	//termovalorizzatori tab home
	jQuery('.ter_tab_titoli').css({"display":'block'}); //mostro i tab
	jQuery('#bird_tab_2,#bird_tab_3').css({"display":'none'}); // nascondo il contenuto dei tab non necessari
	jQuery('.tab_titolo, .tab_titolo_big').each(function() { // per ogni titolo
		jQuery(this).find('a').click(function(){ 
			var idtab = jQuery(this).closest('div').attr('id');
			jQuery('.tab_on').removeClass('tab_on'); // cavo i tab_on
			jQuery(this).closest('.tab_titolo, .tab_titolo_big').addClass('tab_on'); //lo applico a quella corrente
			jQuery('.btn').css({"display":'none'}); //nascondo i contenuti 
			jQuery('.'+idtab).css({"display":'block'});// mostro contenuti tab corrente
			return false;
		});
	});


	// landing
	var landing = jQuery('.contenitore_landing');
	if (landing.length > 0) {
		var tab_css = [
						{
							over:{
								backgroundColor:		'#90B5C8'
							},
							out:{
								backgroundColor:		'transparent'
							}
						},
						{
							over:{
								backgroundColor:		'#E9BF37',
								backgroundImage:		'url(immagini/cliente_sei.gif)',
								backgroundPosition:		'85px -1px',
								backgroundRepeat:       'no-repeat'
							},
							out:{
								backgroundColor:		'transparent',
								backgroundImage:		'none'
							}
						},
						{
							over:{
								backgroundColor:		'#ECBDD1'
							},
							out:{
								backgroundColor:		'transparent'
							}
						},
						{
							over:{
								backgroundColor:		'#BCD999'
							},
							out:{
								backgroundColor:		'transparent'
							}
						}
					];             //sostituibili con classi, con piccole modifiche al codice 
		var tab_css_en = [
						{
							"over_top":{
								backgroundImage:		'url(\'../immagini/landing_en/menu_bg_top_sx_over.png\')'
							},
							"out_top":{
								backgroundImage:		'url(\'../immagini/landing_en/menu_bg_top_sx.png\')'
							}
						},
						{
							"over_top":{
								backgroundImage:		'url(\'../immagini/landing_en/menu_bg_over.png\')'
							},
							"out_top":{
								backgroundImage:		'url(\'../immagini/landing_en/menu_bg.png\')'
							}
						},
						{
							"over_top":{
								backgroundImage:		'url(\'../immagini/landing_en/menu_bg_top_dx_over.png\')'
							},
							"out_top":{
								backgroundImage:		'url(\'../immagini/landing_en/menu_bg_top_dx.png\')'
							}
						},
						{
							"over_top":{
								backgroundImage:		'url(\'../immagini/landing_en/menu_bg_over.png\')'
							},
							"out_top":{
								backgroundImage:		'url(\'../immagini/landing_en/menu_bg.png\')'
							}
						}
					];
		if ( getLanguage() == 'it' )
		{
			jQuery('.menu2 .top').each(function(tab_idx){
				jQuery(this).mouseover(function(){
					jQuery(this).find('.top_link').css(tab_css[tab_idx]['over']);
				});
				jQuery(this).mouseout(function(){
					var self = jQuery(this);
					if ( self.find('.sub').position().top < 0 ) {
						self.find('.top_link').css(tab_css[tab_idx]['out']);
					}
					setTimeout(function(){
						if ( self.find('.sub').position().top < 0 ) {
							self.find('.top_link').css(tab_css[tab_idx]['out']);
						}
					},125);
					setTimeout(function(){
						if ( self.find('.sub').position().top < 0 ) {
							self.find('.top_link').css(tab_css[tab_idx]['out']);
						}
					},250);
					setTimeout(function(){
						if ( self.find('.sub').position().top < 0 ) {
							self.find('.top_link').css(tab_css[tab_idx]['out']);
						}
					},500);
				});
			});
		}
		else
		{
			//	jQuery('.menu2 .topTab').css('marginBottom','-1px');
			//	jQuery('.menu2 .boxUL').css('marginTop','-1px');
			
			jQuery('.menu2 .top').each(function(tab_idx){
				jQuery(this).mouseover(function(){
					jQuery(this).css(tab_css_en[tab_idx]['over_top']);
					jQuery(this).find('.top_link span.down').css(tab_css_en[tab_idx]['over_top']);
					jQuery(this).find('.top_link span.down').css(tab_css_en[3]['over_top']);
				});
				jQuery(this).mouseout(function(){
					jQuery(this).css(tab_css_en[tab_idx]['out_top']);
					jQuery(this).find('.top_link span.down').css(tab_css_en[tab_idx]['out_top']);
					jQuery(this).find('.top_link span.down').css(tab_css_en[3]['out_top']);
				});
			});
			
		}
	}
	// landing[end]

	// language selector [begin]
	var menulang = jQuery('.menu_language');
	if (menulang.length > 0) {
		var selected = menulang.find('.lang_selected');	//alert(selected.attr('href'));
		var otheropt = menulang.find('.lang_otheropt');	//alert(otheropt.attr('href'));

		menulang.find('.level1').remove();
		menulang.append('<select id="languagesel"><option value="'+selected.closest('a').attr('href')+'" selected="selected">'+selected.text()+'</option><option value="'+otheropt.closest('a').attr('href')+'">'+otheropt.text()+'</option></select>');
		var languagesel = jQuery('#languagesel');
		languagesel.selectbox({ debug: true });
		jQuery('#languagesel_container li').each(function(){
			jQuery(this).click(function(){
				location.href= (jQuery(this).attr('id')+'').replace('languagesel_input_','');
			});
		});
		if (! jQuery.browser.msie) {
			jQuery('.menu_container').css('marginTop','1px');
		}
	}
	// language selector [end]
	
/*
	// aclgen_autocomp - riposizionamento per fix su IE6
	var aclgen_autocomp = jQuery('#aclgen_autocomp');
	if (aclgen_autocomp.length > 0) {
		jQuery('body').append(aclgen_autocomp);
		jQuery(window).resize(function(){
			jQuery('#aclgen_autocomp').hide();
		});
		jQuery('body').click(function(){
			jQuery('#aclgen_autocomp').hide();
		});
	}
	// aclgen_autocomp - riposizionamento per fix su IE6 [fine]
*/
	
	// tabelle hover di riga
	jQuery('.tabella_download tbody').find('tr').each(function(){
		jQuery(this).hover(
			function(){
				jQuery(this).css({
								 	background:		'#EEE'
								 });
			},
			function(){
				jQuery(this).css({
								 	background:		'#FFF'
								 });
			}
		);
	});
	// tabelle hover di riga [end]

	// trasparenza tag gruppo
	if(jQuery('.tab_button').length >0) {
		jQuery('.tab_button').each(function(){
			jQuery(this).prev('div').css({opacity:'0.85',filter:'alpha(opacity=85)'});
		});
	}
	// trasparenza tag gruppo [end]

	// social netvorks
/*
	var socialnetworks = jQuery('.social_networks');
	if (socialnetworks.length > 0) {
		socialnetworks.show();
		jQuery('.social_networks_bar').slideUp();
		socialnetworks.click(function(){
			jQuery('.social_networks_bar').slideToggle();
		});		
		jQuery('.social_networks_list').find('a').each(function(){
			jQuery(this).click(function(){
				window.open(jQuery(this).attr('href'), "social_network_add_link");
				return false;
			});
		});
	}
*/
	// social netvorcs [end]
	
	// struttura organizzativa - popup

	// ###################################   era COMMENTATO FINO AL RIENTRO
	// RIGA 34 sullo split relativo all'alt (ora e' virgola)
	var map_so = jQuery('#map_so');
	if (map_so.length > 0) {
		jQuery('.tree_tip_shadow').css({
											opacity:	0.4,
											filter:		'alpha(opacity=40)'
										});
		jQuery('.tree_tip_out,.tree_tip_cover,.tree_tip_cover_clip').css({
											opacity:	0.01,
											filter:		'alpha(opacity=1)'
										});
		var imgmap = jQuery('.testocenter img:eq(0)');
		var daddy = jQuery('map:eq(0)').closest('div');
		daddy.removeClass('testocenter');
		daddy.addClass('map_container');
		dadleft = daddy.offset().left-0;
		daddy.css('paddingLeft',Math.floor( ((jQuery(window).width()-0)-(imgmap.attr('width')-0))/2 -dadleft));
		daddy.wrapInner('<div class="map_position" style="width:'+imgmap.attr('width')+'px;height:'+imgmap.attr('height')+'px;"></div>');				
	
		map_so.find('area').each(function(){
			jQuery(this).mouseover(function(){
				clearTimeout(hot_spot_timein);
				var ths = jQuery(this);
				hot_spot_timein = setTimeout(function(){
					showPup(ths);
				}, APPEAR_TIME);
			});					
			jQuery('.tree_tip_out,.tree_tip_cover_clip').mouseover(function(){
				clearTimeout(hot_spot_timein);
				jQuery(window).unbind('resize',onResizeShowPup);
				jQuery('.tree_tip,.tree_tip_cover,.tree_tip_cover_link,.tree_tip_cover_clip').hide().css({
					top:	'-10000px'							
				});
				jQuery('.tree_tip_out').hide().css({
					width:	'0px',
					height:	'0px'
				});
			});			
		});
	}

	// struttura organizzativa - popup [end]
	
	
	/*
		mappa immagine lavorare gruppo hera mappa_all_link
	*/
	var mymap = jQuery('#map_lavhera');
	if (mymap.length > 0) {
		G_tmp_mapInterval = null;
		var mymap_cont = mymap.closest('div');
		mymap_cont.css({
			'position':		'relative'
		});
		var mymap_img = mymap_cont.find('img:first');
		var selettore = 'area:gt(0)'; // salto la visualizzazione del fumetto per la prima voce (faq)
		if (mymap.hasClass('mappa_all_link')) // per la presenza geografica ho il fumetto per tutte le voci
		{
			selettore = 'area';		
		}
		mymap.find(selettore).each(function(idx){
			//alert(idx);
			var img = jQuery('<img class="jq_map_tip" src="'+G_mapTooltips[idx].src+'" style="position:absolute;top:'+G_mapTooltips[idx].top+'px;left:'+G_mapTooltips[idx].left+'px; display:none; border:0;" />');
			mymap_cont.append(img);
			jQuery(this).hover(function(){
				clearInterval(G_tmp_mapInterval);
				var bias_left = Math.round(mymap_img.position().left);
				var left = G_mapTooltips[idx].left;
				jQuery('.jq_map_tip:eq('+idx+')').css({
					'left': (left + bias_left)+'px'
				})
				jQuery('.jq_map_tip:eq('+idx+')').fadeIn(1);//.show();
			},function(){
				jQuery('.jq_map_tip').hide();
			});
		});
		
		G_limitAutoShown = 3; // numero di fumetti da aprire in automatico
		G_permanenza = 0.1; //tempo di permanenza del fumetto
		if (mymap.hasClass('mappa_all_link')) {
			G_limitAutoShown = mymap.find(selettore).length-1;
			G_permanenza = 5;
		}
		
		G_tmp_waitingShow = null;
		G_tmp_waitingShow = setInterval(function(){
			if ( (jQuery('.boxjs_visibile').length <= 0) || (jQuery('#map_lavhera').closest('div.box_home_gruppo').parent('div').hasClass('boxjs_visibile')) ) {
				clearInterval(G_tmp_waitingShow);
				setTimeout(function(){
					G_tmp_mapIdx = 0;
					G_tmp_mapInterval = setInterval(function(){
						var bias_left = Math.round(mymap_img.position().left);
						var left = G_mapTooltips[G_tmp_mapIdx].left;
						jQuery('.jq_map_tip:eq('+G_tmp_mapIdx+')').css({
							'left': (left + bias_left)+'px'
						})
						jQuery('.jq_map_tip:eq('+G_tmp_mapIdx+')').fadeIn(0.75*1000,function(){ // tempo di apparizione del fumetto
							var me = jQuery(this);
							setTimeout(function(){
								me.fadeOut(0.75*1000); // tempo di sparizione del fumetto
							}, G_permanenza*1000); // tempo di permanenza del fumetto
						});
						G_tmp_mapIdx++;
						if (G_tmp_mapIdx >= G_limitAutoShown) {
							clearInterval(G_tmp_mapInterval);
							delete G_tmp_mapIdx;
						}
					}, (1.5 + G_permanenza)*1000); // tempo di avvio dell'animazione successiva (animazione fadein + fadeout + tempo permanenza)
				},3*1000);//ritardo sull'avvio dell'animazione
			}
		}, 500);
	}

});

jQuery(function(){
	
	jQuery('.jq_submit_on_change').change(function(){
		jQuery(this).closest('form').submit();
	});
	
	
	/*"il file verrà aperto in una nuova finestra" / "download will be open in a new window"*/
	var link_title = 'il file verrà aperto in una nuova finestra';
	if (jQuery('#languagesel_input').text() != 'Italiano') {
		link_title = 'download will be open in a new window';
	}
	
	//alert('bin:'+jQuery("a[href*='/binary/']").length);
	jQuery("a[href*='/binary/']").each(function(){
		var href = ''+jQuery(this).attr('href');
		var exp = href.split('.');
		var ext = exp[exp.length-1];
		var estensioni = ',pdf,doc,docx,xls,xlsx,ppt,pptx,pps,';
		if (estensioni.indexOf(','+ext+',') >= 0) {
			jQuery(this)
				.attr('title', link_title)
				.attr('target', 'hera_document');	
		}
		//jQuery(this).css({'border':'1px solid red'});
	});

	//alert('a:'+jQuery("a[href^='http']").length);
	jQuery("a[href^='http']").each(function(){
		if ( ! jQuery(this).attr('rel') ) {
			var href = ''+jQuery(this).attr('href');
			if ( ! ( href.indexOf('gruppohera.it')>=0 ) ) {
				jQuery(this).attr('target','hera_external_link');
			}
			//jQuery(this).css({'border':'1px solid orange'});
		}
	});
	
});


jQuery(function(){
	jQuery('.jq_simplemodal').click(function(){
		jQuery(jQuery(this).attr('href')).modal(); // DOM
		return false;
	})
});