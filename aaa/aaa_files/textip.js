/**
*	Oggetto globale con variabili ad uso globale
*/
G_NOSEL = false;
G_JQT = {
	'lang':					'it',
	'mouse_left':			null,
	'mouse_top':			null,
	'selttip_timeout':		null,
	'selttip_timeout_secs':	null,
	'min_chars':			3,
	'max_words':			7,
	'popupwin':				'#jqt_popupwin',
	'labels':	{
					'it':	{
								'risultati':		'Risultati',
								'di_circa':			'di circa',
								'per':				'per',
								'ordina_data':		'Ordina per data',
								'ordina_rilevanza':	'Ordina per rilevanza',
								'chiudi_finestra':	'Chiudi la finestra',
								'visualizza_tutto':	'Visualizza tutti i risultati',
								'click_info':		'Clicca per cercare informazioni su',
								'errore_ajax':		'Condizione di errore comunicazione AJAX',
								'errore':			'Errore',
								'mime_txt':			'Documento di testo',
								'mime_rtf':			'Documento Rich Text',
								'mime_pdf':			'Documento PDF',
								'mime_ps':			'Documento PostScript',
								'mime_ppt':			'Presentazione di Powerpoint',
								'mime_xls':			'Foglio di Excel',
								'mime_doc':			'Documento di Word',
								'mime_zip':			'Archivio Compresso',
								'mime_mp4':			'File Video',
								'mime_mp3':			'File Audio',
								'mime_html':		'Pagina HTML',
								'min_caratteri':	'Si devono inserire almeno {min_chars} caratteri',
								'nessun_risultato':	'Nessun risultato',
								'forse_cercavi':	'Forse cercavi',
								'prova_anche':		'Perchè non provi anche'
							},
					'en':	{
								'risultati':		'Results',
								'di_circa':			'of about',
								'per':				'for',
								'ordina_data':		'Order by date',
								'ordina_rilevanza':	'Order by relevance',
								'chiudi_finestra':	'Close window',
								'visualizza_tutto':	'See all results',
								'click_info':		'Click to get informations on',
								'errore_ajax':		'AJAX communication error',
								'errore':			'Error',
								'mime_txt':			'Text document',
								'mime_rtf':			'Rich Text document',
								'mime_pdf':			'PDF document',
								'mime_ps':			'PostScript document',
								'mime_ppt':			'Powerpoint presentation',
								'mime_xls':			'Excel sheet',
								'mime_doc':			'Word document',
								'mime_zip':			'Compressed archive',
								'mime_mp4':			'Video file',
								'mime_mp3':			'Audio file',
								'mime_html':		'HTML page',
								'min_caratteri':	'You can search at least {min_chars} characters',
								'nessun_risultato':	'No results',
								'forse_cercavi':	'Maybe you were looking for',
								'prova_anche':		'Why not also try'
							}
				}
}


jQuery.noConflict();
jQuery(function(){
	var classes = ''+jQuery('.jq_lang:eq(0)').get(0).className;
	var splt = classes.split('jq_lang jq_lang_');
	if (splt.length > 1) {
		var splt2 = splt[1].split(' ');
		G_JQT.lang = splt2[0];
	}
	//alert(G_JQT.lang);
});

/**
*	Funzione che restituisce la selection corrente
*/
function getSelected(){
	try {
		var w=window,d=document,gS='getSelection';
		//return (''+(w[gS]?w[gS]():d[gS]?d[gS]():d.selection.createRange().text)).replace(/(^\s+|\s+$)/g,'');
		var ret = (''+(w[gS]?w[gS]():d[gS]?d[gS]():d.selection.createRange().text)).replace(/(^\s+|\s+$)/g,'');
		return ret;
	}
	catch(e){
		return null;
	}
}
G_dataURI = '';
function ajaxRetrieveData(selection, sort, elemSel) {
	var dropDownMode = true;
	if (elemSel != '#jquicksearch_results') {
		dropDownMode = false;
	}
	var site = 'gh_generale_'+G_JQT.lang;
	var client = 'gruppohera_'+G_JQT.lang;
	if (dropDownMode) {
		site = jQuery('#site').val();
	}
	var extra = '';
	if (jQuery('.tipo_utente_comune_comune').length > 0) {
		extra = '&requiredfields=servizio_comune:'+jQuery('.tipo_utente_comune_comune span:eq(0)').text();//.replace('(','').replace(')','')
	}
	//alert(encodeURI("q="+selection+'&lr=lang_'+G_JQT.lang+'&site='+site+"&output=xml_no_dtd&sort="+sort+extra));
	//q=presidente&site=gh_generale_it&oe=UTF-8&ie=iso-8859-1&num=10&entqr=3&numgm=3&lr=lang_it&sort=D%3AS%3Ad1&output=xml_no_dtd&client=gruppohera_it
	//var dataURI = encodeURI("q="+selection+'&lr=lang_'+G_JQT.lang+'&site='+site+"&client="+client+"&output=xml_no_dtd&sort="+sort+extra+"&oe=UTF-8&ie=iso-8859-1&num=10&entqr=3&numgm=3");
	var dataURI = escape("q="+selection+'&lr=lang_'+G_JQT.lang+'&site='+site+"&client="+client+"&output=xml_no_dtd&sort="+sort+extra+"&oe=UTF-8&ie=iso-8859-1&num=10&entqr=3&numgm=3");
	dataURI = dataURI.split('%26').join('&');
	dataURI = dataURI.split('%3D').join('=');
	//var dataURI = encodeURI("q="+selection+'&lr=lang_'+G_JQT.lang+'&site='+site+"&client="+client+"&output=xml_no_dtd&sort="+sort+extra+"&oe=iso-8859-1&ie=iso-8859-1&num=10&entqr=3&numgm=3");
	//alert(dataURI);
	G_dataURI = dataURI;
	var elementoContenuti = elemSel;
	/*http://www.gruppohera.it/*/
	/*
	var tunnelScript = "http://new.gruppohera.it/tunnel.php";//"http://www.gruppohera.it/tunnel.php";//
	if (G_JQT.lang != 'it') {
		tunnelScript = "http://neweng.gruppohera.it/tunnel.php";//"http://eng.gruppohera.it/tunnel.php";//
	}
	*/
	/*
	var tunnelScript = "http://hera2.od.loc/tunnel_ajax.php";//"http://www.gruppohera.it/tunnel.php";//
	if (G_JQT.lang != 'it') {
		tunnelScript = "http://heraeng.od.loc/tunnel_ajax.php";//"http://eng.gruppohera.it/tunnel.php";//
	}
	*/
	var tunnelScript = "http://www.gruppohera.it/tunnel.php";//
	if (G_JQT.lang != 'it') {
		tunnelScript = "http://eng.gruppohera.it/tunnel.php";//
	}
	//alert(tunnelScript+dataURI);
	jQuery.ajax({
		"type":		"POST",
		"url":		tunnelScript, /* chiamata fatta al tunnel PHP in modo da evitare problemi di crossdomain */
		"data":		dataURI,
		"dataType":	"xml",
		"success":	function(xml){ //alert(jQuery(xml).text());
						//alert(jQuery('RES', xml).length);
						if (jQuery('RES', xml).length > 0) {
							jQuery('.jqt_vis_all').show();
							var contenuti = '';
							if ( ! dropDownMode ) {
								jQuery('#jqt_startnum').html(jQuery("RES", xml).attr('SN'));
								jQuery('#jqt_endnum').html(Math.min(jQuery("RES", xml).attr('EN')-0,jQuery("M", xml).text()-0));
								jQuery('#jqt_results').html(jQuery("M", xml).text());
								jQuery('#jqt_question').html(jQuery("Q", xml).text());
							}
							/**/
							if (jQuery('Synonyms', xml).length > 0) { // sinonimi
								var tryalso = jQuery('OneSynonym:eq(0)', xml).text();
								contenuti += '<div id="jq_sy">'+G_JQT.labels[G_JQT.lang].prova_anche+':';
								contenuti += '	<span class="jq_tryalso">'+tryalso+'</span>';
								contenuti += '</div>';
							}
							/**/
							/**/
							if (jQuery('GM', xml).length > 0) { // link in evidenza
								contenuti += '<div id="jq_km">';
								contenuti += '	<h3>Featured</h3>';
								contenuti += '	<ul>';
								var gl,gd;
								jQuery('GM', xml).each(function(){
									gl = jQuery(this).find('GL:eq(0)').text();
									gd = jQuery(this).find('GD:eq(0)').text();
									contenuti += '		<li><span class="l"><a href="'+gl+'">'+gd+'</a></span><span> - </span><span class="a">'+gl.split('/').join('/ ').replace('/ / ','//')+'</span></li>';
								});
								contenuti += '	</ul>';
								contenuti += '</div>';
							}
							/**/
							var url,title,subtitle;
							jQuery('RES>R', xml).each(function(){
								url = jQuery(this).find('U').text();
								title = jQuery(this).find('T').text();
								subtitle = jQuery(this).find('S').text();
								var mime = jQuery.trim(jQuery(this).attr('MIME'));
								var mimeImg = '';
								var mimeImgAlt = '';
								var mimeText = '';
								var mimeIco = '';
								if (mime == 'text/plain') {
									mimeIco = 'ico_txt.png';
									mimeImgAlt = G_JQT.labels[G_JQT.lang].mime_txt;
									mimeText = "TXT";
								}
								else if (mime == 'application/rtf') {
									mimeIco = 'ico_word.png';
									mimeImgAlt = G_JQT.labels[G_JQT.lang].mime_rtf;
									mimeText = "RTF";
								}
								else if (mime == 'application/pdf') {
									mimeIco = 'ico_pdf.png';
									mimeImgAlt = G_JQT.labels[G_JQT.lang].mime_pdf;
									mimeText = "PDF";
								}
								else if (mime == 'application/postscript') {
									mimeIco = 'ico_ps.png';
									mimeImgAlt = G_JQT.labels[G_JQT.lang].mime_ps;
									mimeText = "PS";
								}
								else if (mime == 'application/vnd.ms-powerpoint') {
									mimeIco = 'ico_ppt.png';
									mimeImgAlt = G_JQT.labels[G_JQT.lang].mime_ppt;
									mimeText = "PPT";
								}
								else if (mime == 'application/vnd.ms-excel') {
									mimeIco = 'ico_excel.png';
									mimeImgAlt = G_JQT.labels[G_JQT.lang].mime_xls;
									mimeText = "XLS";
								}
								else if (mime == 'application/msword') {
									mimeIco = 'ico_word.png';
									mimeImgAlt = G_JQT.labels[G_JQT.lang].mime_doc;
									mimeText = "DOC";
								}
								else if (mime == 'application/vnd.ms-powerpoint') {
									mimeIco = 'ico_ppt.png';
									mimeImgAlt = G_JQT.labels[G_JQT.lang].mime_ppt;
									mimeText = "PPT";
								}
								else if (mime == 'application/zip') {
									mimeIco = 'ico_zip.png';
									mimeImgAlt = G_JQT.labels[G_JQT.lang].mime_zip;
									mimeText = "ZIP";
								}
								else if (mime == 'video/mpeg') {
									mimeIco = 'ico_video_MP4.png';
									mimeImgAlt = G_JQT.labels[G_JQT.lang].mime_mp4;
									mimeText = "MP4";
								}
								else if (mime == 'audio/mpeg') {
									mimeIco = 'ico_mp3.png';
									mimeImgAlt = G_JQT.labels[G_JQT.lang].mime_mp3;
									mimeText = "MP3";
								}
								else {
									mimeIco = 'ico_html.png';
									mimeImgAlt = G_JQT.labels[G_JQT.lang].mime_html;
									mimeText = "HTML";
								}
								if (mimeIco != '') {
									mimeImg = '<img title="'+mimeImgAlt+'" alt="'+mimeImgAlt+'" style="float:left;margin-right:5px;" src="/images/mimes/'+mimeIco+'" />';
								}
								subtitle = subtitle.split('<br>').join('').split('- ').join('');
								contenuti += '<div class="jqt_result_block"><div style="padding:0 5px;">'+mimeImg+'<div class="jqt_result_title"><a style="text-decoration:none;color:#06C;" href="'+url+'">'+title+'</a></div><div class="jqt_result_body">'+subtitle+'</div></div></div>';/*<span class="jqt_result_type"> ['+mimeText+']</span>*/
							});
							jQuery(elementoContenuti).html(contenuti);
							
							jQuery('.jq_tryalso')
								.one('click', function(){
									var term = jQuery(this).text();
									jQuery('.jq_q').val( term );
									jQuery('.bot_vai').trigger('click');
								});

							setTimeout(function(){
								if ( ! dropDownMode ) {
									jQuery(G_JQT.popupwin).show();
									jQuery('#jqt_contents').scrollTop(0); /* reinizializzo la barra di scroll */
									jQuery('.jqt_close').one('click', function(){
										jQuery(G_JQT.popupwin).hide();
									});
									jQuery('.jqt_showall').one('click', function(){
										//location.href = jQuery(G_JQT.popupwin).data('link');
										//jQuery('.form_cerca_generale:eq(0)').submit();
										var urlBase = 'http://www.gruppohera.it/risultato_ricerca/';//'http://new.gruppohera.it/risultato_ricerca/';//'http://search.gruppohera.it/';
										if (G_JQT.lang != 'it') {
											urlBase = 'http://eng.gruppohera.it/search_result/';
										}
										/*alert(urlBase+'?'+G_dataURI);*/
										location.href = urlBase+'?'+G_dataURI;
									});
								}
								else {
									//jQuery('.controlli').hide();
									jQuery('.ui-autocomplete').hide();
									jQuery('#jquicksearch_results').css({
										'background': 'white'
									});
									jQuery('.jqt_footer_dropdown').fadeIn();
									jQuery('#jquicksearch_results').scrollTop(0); /* reinizializzo la barra di scroll */
									jQuery('.jqt_close').one('click', jqtCloseDropDown);
									jQuery('.jqt_showall').one('click', function(){
										//jQuery('.form_cerca_generale:eq(0)').submit();
										var urlBase = 'http://www.gruppohera.it/risultato_ricerca/';//'http://new.gruppohera.it/risultato_ricerca/';//'http://search.gruppohera.it/';
										if (G_JQT.lang != 'it') {
											urlBase = 'http://eng.gruppohera.it/search_result/';
										}
										/*alert(urlBase+'?'+G_dataURI);*/
										location.href = urlBase+'?'+G_dataURI;
									});
									jQuery('.jq_q:eq(0)').one('focus', function(){
										jqtCloseDropDown();
									});
									jQuery('#site').one('change', function(){
										jqtCloseDropDown();
									});
								}
							},500);
						}
						else {
							jQuery('.jqt_vis_all').hide();
							if (jQuery('Suggestion', xml).length > 0) { // Suggerimenti ricerca
								var maybeterm = jQuery('Suggestion:eq(0)', xml).text();
								jQuery(elementoContenuti).html('<div class="jqt_maybelookingfor">'+G_JQT.labels[G_JQT.lang].forse_cercavi+': <span class="jq_maybesearch">'+maybeterm+'</span></div><div class="jqt_noresults2">'+G_JQT.labels[G_JQT.lang].nessun_risultato+'</div>');
								jQuery('.jq_maybesearch')
									.one('click', function(){
										var term = jQuery(this).text();
										jQuery('.jq_q').val( term );
										jQuery('.bot_vai').trigger('click');
									});
							}
							else {
								jQuery(elementoContenuti).html('<div class="jqt_noresults">'+G_JQT.labels[G_JQT.lang].nessun_risultato+'</div>');
							}
							jQuery('#jqt_startnum').html('0');
							jQuery('#jqt_endnum').html('0');
							jQuery('#jqt_results').html('0');
							jQuery('#jqt_question').html(selection);
							setTimeout(function(){
								if ( ! dropDownMode ) {
									jQuery(G_JQT.popupwin).show();
									jQuery('#jqt_contents').scrollTop(0); /* reinizializzo la barra di scroll */
									jQuery('.jqt_close').one('click', function(){
										jQuery(G_JQT.popupwin).hide();
									});
									jQuery('.jqt_showall').one('click', function(){
										//location.href = jQuery(G_JQT.popupwin).data('link');
										//jQuery('.form_cerca_generale:eq(0)').submit();
										var urlBase = 'http://www.gruppohera.it/risultato_ricerca/';//'http://new.gruppohera.it/risultato_ricerca/';//'http://search.gruppohera.it/';
										if (G_JQT.lang != 'it') {
											urlBase = 'http://eng.gruppohera.it/search_result/';
										}
										/*alert(urlBase+'?'+G_dataURI);*/
										location.href = urlBase+'?'+G_dataURI;
									});
								}
								else {
									jQuery('#jquicksearch_results').css({
										'background': 'white'
									});
									jQuery('.jqt_footer_dropdown').fadeIn();
									jQuery('#jquicksearch_results').scrollTop(0); /* reinizializzo la barra di scroll */
									jQuery('.jqt_close').one('click', jqtCloseDropDown);
									jQuery('.jqt_showall').one('click', function(){
										//jQuery('.form_cerca_generale:eq(0)').submit();
										var urlBase = 'http://www.gruppohera.it/risultato_ricerca/';//'http://new.gruppohera.it/risultato_ricerca/';//'http://search.gruppohera.it/';
										if (G_JQT.lang != 'it') {
											urlBase = 'http://eng.gruppohera.it/search_result/';
										}
										/*alert(urlBase+'?'+G_dataURI);*/
										location.href = urlBase+'?'+G_dataURI;
									});
									jQuery('.jq_q:eq(0)').one('focus', function(){
										jqtCloseDropDown();
									});
									jQuery('#site').one('change', function(){
										jqtCloseDropDown();
									});
								}
							},500);
						}
						if ( ! dropDownMode ) {
							clearTimeout(G_JQT.selttip_timeout);
							jQuery('#jqt_tipcall').hide();
						}
					},
		"error":	function(xhr, status, err){
						alert(G_JQT.labels[G_JQT.lang].errore_ajax+": "+status+"\n\n"+G_JQT.labels[G_JQT.lang].errore+": "+err);
					}
	});
}

function jqtCloseDropDown() {
	jQuery('#jquicksearch_shadow_bottom').fadeOut(0);
	jQuery('#jquicksearch_content').animate(
		{
			'top': '-339px'
		},{
			'duration':	500,
			'complete':	function(){
							jQuery('#jquicksearch').css({
								'height': '0px'
							});
							jQuery('#jquicksearch_results').css({
								'background': 'transparent'
							});
							jQuery('#jquicksearch_results').html('');
							//jQuery('.controlli').show();
						}
		}
	);
}
/**
*	Recupero AJAX dei risultati corrispondenti alla ricerca "selezionata"
*/
function ajaxRetrieveResults(sort) {
	jqtCloseDropDown();
	var selection = jQuery(G_JQT.popupwin).data('selection'); /* dentro #jqt_popupwin, nella variabile data con nome "selection" viene salvata la stringa da cercare */
////	document.title = selection+' -- '+sort;
	jQuery('#jqt_contents').html('<img style="margin:110px 0 0 160px;" src="http://www.gruppohera.it/images/jqt_loader.gif" />');
	jQuery('.jqt_order_selected').removeClass('jqt_order_selected');
	if (sort=='date:D:L:d1') {
		jQuery('.jqt_order_relevance').addClass('jqt_order_selected');
	}
	else {
		jQuery('.jqt_order_date').addClass('jqt_order_selected');
	}
	ajaxRetrieveData(selection, sort, '#jqt_contents');
}

/**
*	Inizializzazione globali di timeout e funzione di timeout per il tooltip
*/
G_JQT.selttip_timeout = null;
G_JQT.selttip_timeout_secs = 10;
function tipcallTimeout(){
   clearTimeout(G_JQT.selttip_timeout);
   G_JQT.selttip_timeout = setTimeout(function(){
	   jQuery('#jqt_tipcall').hide();
   }, G_JQT.selttip_timeout_secs * 1000);
}

/**
*	Inizializzazioni jQuery e globali usate
*/
jQuery.noConflict();
jQuery(document).ready(function() {
	
	if (jQuery(G_JQT.popupwin).length <= 0) {
		////alert('CREATE POPUPWIN');
		var classTip = '_'+G_JQT.lang;
		jQuery('body').append('<div id="jqt_popupwin" class="jqt_popupwin png_fix"><div class="jqt_pad"><div class="jqt_handle"><div class="jqt_close jqt_close_button">&nbsp;</div><div class="jqt_title">'+G_JQT.labels[G_JQT.lang].risultati+' <span id="jqt_startnum"></span> - <span id="jqt_endnum"></span> &nbsp;'+G_JQT.labels[G_JQT.lang].di_circa+' <span id="jqt_results"></span>&nbsp; '+G_JQT.labels[G_JQT.lang].per+' <span id="jqt_question" class="jqt_question"></span></div></div><div class="jqt_subtitle"><div class="jqt_subtitle_text"><span class="jqt_order_date">'+G_JQT.labels[G_JQT.lang].ordina_data+'</span>&nbsp;/&nbsp;<span class="jqt_order_relevance jqt_order_selected">'+G_JQT.labels[G_JQT.lang].ordina_rilevanza+'</span></div></div><div class="jqt_body"><div class="jqt_body_pad"><div id="jqt_contents" class="jqt_contents"></div></div></div><div class="jqt_footer"><div class="jqt_footer_contents"><span class="jqt_close jqt_close_footer">'+G_JQT.labels[G_JQT.lang].chiudi_finestra+'</span><span class="jqt_vis_all">&nbsp;-&nbsp;<span class="jqt_showall">'+G_JQT.labels[G_JQT.lang].visualizza_tutto+'</span></span></div></div></div><div id="jqt_popupwin_shadow" class="png_fix">&nbsp;</div><div id="jqt_popupwin_shadow_bottom" class="png_fix">&nbsp;</div></div><div id="jqt_tipcall" class="jqt_tipcall'+classTip+'"></div>');
		
	}
	if (jQuery('.blocco_testo').length > 0) {
		jQuery(G_JQT.popupwin).draggable({ /* DRAGGABILE */
			'containment':		'document',
			'handle':			'.jqt_handle',
			'cursor':			'move'
		});
	}
	/*
	var url = 'http://search.gruppohera.it/?q={term}';	// INDIRIZZO QUERY RICERCA
	if (G_JQT.lang != 'it') {
		url = 'http://searcheng.gruppohera.it/?q={term}';	// INDIRIZZO QUERY RICERCA
	}
	*/
	//******DA CONTROLLARE!!*****
	url = "http://hera2.od.loc/tunnel_ajax.php?q={term}";
	
	jQuery('.blocco_testo').mousedown(function(e) {
		/*for(var i in e)if(!confirm(i+"\n"+e[i]))break;*/
		if ((''+e.target.nodeName).toUpperCase() == 'OBJECT') {
			return true;
		}
		var nodoSelezionato = (''+e.target.nodeName).toLowerCase();
		if (nodoSelezionato=='input' || nodoSelezionato=='textarea') { /* evito la selezione in campi form testuali [selezione con trascinamento] */
			G_NOSEL = true;
		}
		G_JQT.mouse_top  = e.pageY -0;
		G_JQT.mouse_left = e.pageX -0;
	});
	jQuery('.blocco_testo').mouseup(function(e) {
		if ((''+e.target.nodeName).toUpperCase() == 'OBJECT') {
			return true;
		}
		//per risoluzioni mobile disattiva pulsante cerca
		if (jQuery(window).width() < 980) {
			jQuery('#jqt_tipcall').hide();
			return true;
		}
		var nodoSelezionato = (''+e.target.nodeName).toLowerCase();
		if (nodoSelezionato=='input' || nodoSelezionato=='textarea') { /* evito la selezione in campi form testuali [doppioclick di selezione] */
			G_NOSEL = true;
		}
		if (G_NOSEL) { /* evito la selezione in campi form testuali */
			G_NOSEL = false;
			return false;
		}
		clearTimeout(G_JQT.selttip_timeout);
		/*var selObject = getSelObj();
		for(var i in selObject) if(!confirm(i+"\n"+selObject[i]))break;*/
		var selection = getSelected();				
		if (selection) { /*alert('testo: '+selection);return;*/
			selection = jQuery.trim(''+selection).replace(/"/g,"'");
			if (selection=='' || selection.split(' ').length > G_JQT.max_words || (''+selection).length < G_JQT.min_chars) {				/* NUMERO MASSIMO DI PAROLE e NUMERO MINIMO DI CARATTERI */
				jQuery(G_JQT.popupwin).hide();
				jQuery('#jqt_tipcall').hide();
				return;
			}
			var G_selectionImage = jQuery('#jqt_tipcall');
			G_selectionImage.attr('title',G_JQT.labels[G_JQT.lang].click_info+': '+selection);
			var mouseTop  = e.pageY -0;
			var mouseLeft = e.pageX -0;
			//document.title = G_JQT.mouse_left+","+G_JQT.mouse_top+" --> "+mouseLeft+","+mouseTop;
			if (mouseLeft < G_JQT.mouse_left) {
				mouseLeft = G_JQT.mouse_left;
				mouseTop  = G_JQT.mouse_top;
			}
			jQuery(G_JQT.popupwin).hide();
			var winTop = mouseTop  + 20;
			var winLeft = mouseLeft - 200;
			var winWid = jQuery(window).width();
			if (winLeft + 400 > winWid) {
				winLeft = winWid - 400;
			}
			if (winLeft < 10) {
				winLeft = 10;
			}
			jQuery(G_JQT.popupwin).css({
				"top":  winTop,
				"left": winLeft
			});
			var offTop = mouseTop  - 50;
			var offLeft = mouseLeft - 0;	// - 13;
			if (offLeft + 80 > winWid) {
				offLeft = winWid - 80;
			}
			jQuery(G_JQT.popupwin)
				.data('link',url.replace('{term}',encodeURI(selection)))
				.data('selection',selection);	// salvo il testo cercato
			G_selectionImage
				.css({
					"top": 	offTop,
					"left": offLeft
				})
			   .one('click', function(e){
				   ajaxRetrieveResults('date:D:L:d1');
				   return false;
			   })
			   .show();
			tipcallTimeout();
			jQuery('.jqt_order_date,.jqt_order_relevance').each(function(){
				jQuery(this)
					.css({
						'cursor':	'pointer'
					})
					.one('click', function(){
						if ( ! jQuery(this).hasClass('jqt_order_selected') ) {
							tipcallTimeout();
							jQuery('.jqt_order_selected').removeClass('jqt_order_selected');
							jQuery(this).addClass('jqt_order_selected');
							if (jQuery(this).hasClass('jqt_order_date')) {
								ajaxRetrieveResults('date:D:S:d1');
							}
							else {
								ajaxRetrieveResults('date:D:L:d1');
							}
						}
					});
			});
		}
		else {
			jQuery(G_JQT.popupwin).hide();
			jQuery('#jqt_tipcall').hide();
		}
	});

	////alert('jquicksearch');
	if (jQuery('.jquicksearch_enabled').length > 0) {
		////alert('jquicksearch ENABLED');
		if (jQuery('#jquicksearch').length <= 0) {
			////alert('jquicksearch CREATE');
			//document.title += '.';
			jQuery('body .container:eq(0)').append('<div id="jquicksearch"><div id="jquicksearch_content" class="png_fix"><div class="jquicksearch_pad"><div id="jquicksearch_results">&nbsp;</div></div><div class="jqt_footer_dropdown"><div class="jqt_footer_contents"><span class="jqt_close jqt_close_footer">'+G_JQT.labels[G_JQT.lang].chiudi_finestra+'</span><span class="jqt_vis_all">&nbsp;-&nbsp;<span class="jqt_showall">'+G_JQT.labels[G_JQT.lang].visualizza_tutto+'</span></span></div></div></div> </div>');//<div id="jquicksearch_shadow" class="png_fix">&nbsp;</div><div id="jquicksearch_shadow_bottom" class="png_fix">&nbsp;</div>
		}
		//document.title += jQuery('#jquicksearch').length;
		//document.title += jQuery('#jquicksearch:hidden').length;
		
		//jQuery('.bot_vai').click(function(){
		jQuery('.navbar-top .submit_ricerca').click(function(){
			
			//disabilita tendina su versioni mobile
			if (jQuery(window).width() < 980) {
				return true;
			}
			
			if ( ! jQuery(this).hasClass('noquicksearch') ) {
				jQuery('.ui-autocomplete').hide();
			
				//document.title += ':';
				jQuery(G_JQT.popupwin).hide();
				//var ricercata = jQuery.trim(jQuery('.jq_q:eq(0)').val());//alert('['+ricercata+']');
				var ricercata = jQuery('.navbar-top .input_ricerca').val();
				if (ricercata != '' & ricercata.length >= G_JQT.min_chars) {
					//if (jQuery('#jquicksearch:hidden').length > 0) {
					if (jQuery('#jquicksearch').length > 0) {
						var jqt_left = 15;
						var jqt_top = 25;
						if (jQuery.browser.msie) {
							jqt_top = 27;
						}
						else if (jQuery.browser.safari || jQuery.browser.webkit) { /* .safari è deprecato dalla 1.4+ rimane webkit */
							jqt_top = 26;
						}
						var jqq = jQuery('.navbar-top .input_ricerca');//jQuery('.jq_q:eq(0)');
						var leftPos = Math.round(jqq.offset().left) -jqt_left;
						
						//leftPos -= 120;
						leftPos -= 20;
						if (jQuery(window).width() < 1024) {
							leftPos -= 20;
						}
	
						//alert( Math.ceil( (jQuery(window).width() - jQuery('body>.container').width()) /2) );
						
						jQuery('#jquicksearch').css({
							'height': '339px',
							//'left':	leftPos,
							'right':	Math.ceil( (jQuery(window).width() - jQuery('body>.container').width()) /2)+'px',//'1px',
							'top': Math.round(jqq.offset().top) +jqt_top
						});
	
						/*
						var url = 'http://search.gruppohera.it/?q={term}';	// INDIRIZZO QUERY RICERCA
						if (G_JQT.lang != 'it') {
							url = 'http://searcheng.gruppohera.it/?q={term}';	// INDIRIZZO QUERY RICERCA
						}
						*/
						url = "http://hera2.od.loc/tunnel_ajax.php?q={term}";
						
						jQuery('#jquicksearch')
							.data('link',url.replace('{term}', encodeURI(ricercata)))
							.data('selection', ricercata);	// salvo il testo cercato
						ajaxRetrieveData(ricercata, 'date:D:L:d1', '#jquicksearch_results');
						setTimeout(function(){
							jQuery('#jquicksearch_content').animate(
								{
									'top': '0px'
								},{
									'duration':	1000,
									'complete':	function(){
													jQuery('.ui-autocomplete').hide();
													jQuery('#jquicksearch_shadow_bottom').show();
												}
								}
							);
						}, 500);
						return false;
					}
	//				return true;
				}
				else if (ricercata.length < G_JQT.min_chars) {
					alert(G_JQT.labels[G_JQT.lang].min_caratteri.replace('{min_chars}',G_JQT.min_chars));
				}
				return false; // non avvio ricerche senza parole da cercare
			}
			return true;
		});
	}
});