/**
 *		Oggetto di gestione menu mobile
 */

jQuery(document).ready(function() {
	if(jQuery(window).width() <= 800) {
		jQuery('.span3.logo.inrete_small').removeClass('span3').addClass('span2');
		jQuery('.span9.inrete_large').removeClass('span9').addClass('span10');
	}
	else {
		jQuery('.span2.logo.inrete_small').removeClass('span2').addClass('span3');
		jQuery('.span10.inrete_large').removeClass('span10').addClass('span9');
	}
});

supermenu = {
	obj:							null,
	urlSep:						'__',
	creazione:					function() {
										
										if (jQuery('.logo_acegas').length > 0) {
											jQuery('<style type="text/css"> #sm_main .sm_main_div { padding:5px 15px;background:#F9EC60;border-bottom:2px solid #474642; } #sm_main .sm_main_div a { color:#000; text-decoration: none; } </style>').appendTo("head");
										}
										
										jQuery('body').prepend('<div id="supermenu"></div>');
										
										supermenu.obj = jQuery('#supermenu');
										
										supermenu.obj.css({
											'height':			(window.innerHeight-0) +'px'
										})
																				
										if(jQuery('body.cls-inrete').length > 0) //Solo nel canale INRETE non visualizzo i link "Offerte Energia/Gas e Offerte Ambientali Aziende" e il top menù nel menù principale
										{
											supermenu.obj
												.append('<div id="sm_close"><div class="ico_chiudi"></div></div>')
												.append('<div id="sm_main"><img src="https://'+location.hostname+'/immagini/menu_ajax_loader.gif" style="display:block;margin:15% auto 0;" /></div>')
												.append('<div id="sm_comune"></div>')
												.append('<div id="sm_submain"></div>');
										}
										else
										{
											supermenu.obj
												.append('<div id="sm_close"><div class="ico_chiudi"></div></div>')
												.append('<div id="sm_main"><img src="https://'+location.hostname+'/immagini/menu_ajax_loader.gif" style="display:block;margin:15% auto 0;" /></div>')
												.append('<div id="sm_comune"></div>')
												.append('<div id="sm_submain"></div>')
												.append('<div id="sm_buttons"></div>')
												.append('<div id="sm_topmenu"></div>');																								
										}
										
										//lancio funzione per gestione autocompilazione comune
										velina_primobox();
										
										//appendi il logo hera nella zona di CLOSE
										jQuery('#sm_close').prepend(supermenu.cleanClone('.footer_menu2 .span4', jQuery('body')).show().addClass('ico_logo'));
										// click pulsante CHIUDI
										jQuery('#sm_close .ico_chiudi').click(function(){
											supermenu.obj.hide();
											/*if (jQuery('.sm_selected').length > 0) {
												var locNew = supermenu.buildUrl( jQuery('.sm_selected').attr('href') );
												if (locNew != location.href+'') {
													location.href = locNew;
												}
											}*/
											supermenu.restorePageViewbility();
											return false;
										});
										
										// click voci menu MAIN
										supermenu.obj.on('click','#sm_main .nav li a', function(e){
											if(jQuery(this).parent().hasClass('cls-inrete')) { //Solo nel canale INRETE non visualizzo i link "Offerte Energia/Gas e Offerte Ambientali Aziende" e il top menù nel menù principale
												jQuery('#sm_buttons').hide();
												jQuery('#sm_topmenu').hide();
											}
											else {
												jQuery('#sm_buttons').show();
												supermenu.obj.append('<div id="sm_buttons"></div>');
												jQuery('#sm_topmenu').show();
												supermenu.obj.append('<div id="sm_topmenu"></div>');
											}
											
											if (jQuery(this).parent('li').hasClass('active') && jQuery('.sm_active_lock').length < 2 && supermenu.obj.find('.titolo_menu').length <= 0) {	//se è il tab attivo e non ho altri sottomenu aperti, allora carico la pagina
												location.href = supermenu.buildUrl( jQuery(this).attr('href') );
											}
											else { // altrimenti, se non è il tab attivo o se ho attivo come aperto un altro menu, allora ricarico il menu...
												//rimuovi active da altra voce del menu principale
												supermenu.obj.find('#sm_main li.active a.sm_selected').removeClass('sm_selected');
												supermenu.obj.find('#sm_main li.active').removeClass('active');
												//svuota menu secondario
												supermenu.obj.find('#sm_submain,#sm_comune').html('');
												supermenu.obj.find('#sm_submain').show();
												supermenu.obj.find('#sm_submain').append('<img src="https://'+location.hostname+'/immagini/menu_ajax_loader_w.gif" style="display:block;margin:15% auto" />');
												supermenu.refresh(
																		jQuery(this).attr('href'),
																		supermenu.urlSep+( supermenu.cleanPathname( jQuery(this).attr('href') ) ).split('..').join('').split('//').join('').split('/').join(supermenu.urlSep)
																	);
											}
											return false;
										});
										
										//gestione CLICK su SUBMAIN, TOPMENU e BUTTONS
										supermenu.obj.on('click','#sm_submain .nav li a,#sm_topmenu .nav li a,#sm_buttons li > a', function(e){
											//assegna il last click
											jQuery('.sm_last_click').removeClass('sm_last_click');
											jQuery(this).addClass('sm_last_click');
											if (jQuery(this).closest('li').parent().closest('li').length <= 0) {	//se clicco una voce di primo livello
												supermenu.closeToggleMenu();
											}
											else {
												//alert(supermenu['subMenu'].html());
												//alert(jQuery('.box_menu_laterale', supermenu['subMenu'].html()).length);
												
												//SE NON c'è un titolo menu in pagina carica il menu corrispondente alla voce cliccata
												if (supermenu.obj.find('.titolo_menu').length <= 0) {
													
													var clickedHref = jQuery(this).attr('href');
												
													var leftmenu = supermenu.cleanClone('.box_menu_laterale>div>.nav', supermenu['subMenu']);
													leftmenu.find('li>ul.nav').each(function(){
														if ( ! jQuery(this).prev('a.toggle').hasClass('aperto') ) {
															jQuery(this).hide();
														}
													});
													jQuery('#sm_submain')
														.html('')
														.append(supermenu.cleanClone('.box_menu_laterale .titolo_menu', supermenu['subMenu']).show())
														.append(leftmenu.show());
													
													//alert(jQuery('#sm_submain').find('[href="'+clickedHref+'"]').length);
													//alert(clickedHref);	
													
													//apri il sotto menu che coincide con la voce del menu precedente cliccata
													setTimeout(function(){
														jQuery('#sm_submain')
															.find('[href$="'+clickedHref+'"]')
																.addClass('sm_selected')
																.parent()
																	.addClass('active');	
													},100);
													
													jQuery('#sm_submain')
														.find('[href$="'+clickedHref+'"]')
															.trigger('click');
/////													return false;				// commentato in quanto dava problemi con le sottovoci di "fornitori" e "progettisti e tecnici" nel "top_menu"
												}
											}
											
											//----------GESTIONE TOGGLE-------
											var subnav = jQuery(this).parent('li').find('.nav');
											//se non ha sottomenu attiva il link
											if (subnav.length<=0) {
												if (jQuery(this).hasClass('sm_selected')) {
													location.href = supermenu.buildUrl( jQuery(this).attr('href') );
												}
											}
											else{
												//se è già aperto o è selezionata la voce padre attiva il link altrimenti apri il menu
												if (subnav.hasClass('aperto') || subnav.parent('li').hasClass('active')) {
													if (jQuery(this).hasClass('sm_selected')) {
														location.href = supermenu.buildUrl( jQuery(this).attr('href') );
													}
												}
												else{
													var link_cliccato = jQuery(this);
													subnav.toggle(300,function(){
														//attivazione spostamento menu per centrare sempre la voce selezionata
														setTimeout(function(){
															var altezza_menu_toggle = subnav.innerHeight();
															var altezza_link = link_cliccato.innerHeight();
															var offset_link = link_cliccato.offset();
															var valore_spostamento = altezza_menu_toggle + altezza_link + offset_link.top;
															var scroll_window = jQuery('#supermenu').scrollTop();
															if (offset_link.top < 0) {	//se lo spostamento è negativo perchè l'offset top è negativo
																var sommatoria = scroll_window + offset_link.top;
																jQuery('#supermenu').animate({ scrollTop: sommatoria},200,'easeInOutQuad');
															}
															else{
																if (valore_spostamento+20 >= jQuery('#supermenu').height()) {
																	if (altezza_link + altezza_menu_toggle > jQuery(window).height()) {	//se l'altezza supera window riposiziona a 0
																		jQuery('#supermenu').animate({scrollTop:scroll_window + offset_link.top },200,'easeInOutQuad');
																	}
																	else{
																		jQuery('#supermenu').animate({scrollTop:scroll_window + offset_link.top },200,'easeInOutQuad');
																	}	
																}
																
															}
															
														},50);	
													});
													
													
													subnav.addClass('aperto');
													//supermenu['prevMenu'] = supermenu.obj.find('#sm_submain').html();
													
													//carica in memoria l'eventuale submenu da mostrare al click di una prima sottovoce
													supermenu.refresh(
																			jQuery(this).attr('href'),
																			supermenu.urlSep + supermenu.cleanPathname( jQuery(this).attr('href') ).split('..').join('').split('//').join('').split('/').join(supermenu.urlSep),
																			'subMenu'
																		);
												}
											}
											supermenu.setSelected(jQuery(this));
											
											return false;
										});
										
										//chiusura menu submain se clicco le voci presenti in topmenu o in buttons
										supermenu.obj.on('click','#sm_topmenu a,#sm_buttons a',function(e){
											supermenu.obj.find('#sm_main ul li.active').removeClass('active');
											supermenu.obj.find('#sm_submain').hide(300);
											supermenu.obj.find('#sm_comune').hide(300);
											return false;
										});
										
										//supermenu.obj.on('click', 'li>a,.titolo_menu>a', function(e){
										/*supermenu.obj.on('click', '#sm_submain li>a,#sm_buttons li>a,#sm_topmenu li>a', function(e){
											e.preventDefault();
											e.stopPropagation();
											
											if (jQuery(this).hasClass('sm_selected')) {
												supermenu.refresh(
																		jQuery(this).attr('href'),
																		supermenu.urlSep + supermenu.cleanPathname( jQuery(this).attr('href') ).split('..').join('').split('//').join('').split('/').join(supermenu.urlSep)
																	);
																	
											}
											else if (jQuery(this).parent().hasClass('titolo_menu')) {
												//supermenu.obj.find('#sm_submain').html( supermenu['prevMenu'] );
												
												var leftmenu = supermenu.cleanClone('.box_menu_laterale>div>.nav', supermenu['prevMenu']);
												leftmenu.find('li>ul.nav').each(function(){
													if ( ! jQuery(this).prev('a.toggle').hasClass('aperto') ) {
														jQuery(this).hide();
													}
												});
												jQuery('#sm_submain')
													.html('')
													.append(supermenu.cleanClone('.box_menu_laterale .titolo_menu', supermenu['prevMenu']).show())
													.append(leftmenu.show());
													
													var clickedHref = supermenu.rimuoviPerc( jQuery(this).attr('href') );
													setTimeout(function(){
														jQuery('#sm_submain')
															.find('[href$="'+clickedHref+'"]')
																.addClass('sm_selected')
																.parent()
																	.addClass('active');	
													},100);
													
													jQuery('#sm_submain')
														.find('[href$="'+clickedHref+'"]')
															.trigger('click');
												
											}
											supermenu.setSelected(jQuery(this));
											return false;
										});
										*/
										
										// Gestione click TITOLO MENU
										supermenu.obj.on('click', '.titolo_menu>a', function(e){
											var leftmenu = supermenu.cleanClone('.box_menu_laterale>div>.nav', supermenu['prevMenu']);
											leftmenu.find('li>ul.nav').each(function(){
												if ( ! jQuery(this).prev('a.toggle').hasClass('aperto') ) {
													jQuery(this).hide();
												}
											});
											
											jQuery('#sm_submain')
												.html('')
												.append(supermenu.cleanClone('.box_menu_laterale .titolo_menu', supermenu['prevMenu']).show())
												.append(leftmenu.show());
												
												var clickedHref = supermenu.rimuoviPerc( jQuery(this).attr('href') );
												setTimeout(function(){
													jQuery('#sm_submain')
														.find('[href$="'+clickedHref+'"]')
															.addClass('sm_selected')
															.parent()
																.addClass('active');	
												},100);
												
												jQuery('#sm_submain')
													.find('[href$="'+clickedHref+'"]')
														.trigger('click');
											
											supermenu.setSelected(jQuery(this));
											return false;
										});
										
										//CARICA MENU IN AJAX
										supermenu.refresh(
																location.pathname,
																supermenu.cleanPathname( location.pathname ).split('/').join(supermenu.urlSep)
															);
									},
	applyActive:				function(node, action) {
										var li = node.closest('li');
										if (li.parent().closest('li').length > 0) {
											li = li.parent().closest('li');
										}
										if (li.find('li').length > 0) {
											if (li.hasClass('sm_active_lock')) {
												return;
											}
											li[action]('active');
										}
									},
	estrapolaPath:				function(path) {
										return supermenu.urlSep + path.split('..').join('').split('//').join('').split('/').join(supermenu.urlSep);
									},
	rimuoviPerc:				function(url) {
										return url.split('../').join('');
									},
	buildUrl:					function(url) {
										if ( url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0 )
										{
											return  url;
										}
										else
										{
											return 'https://' + (location.hostname + '/' + supermenu.rimuoviPerc( url )).split('//').join('/');
										}
									},
	cleanPathname:				function(pathname) {
										if (pathname && pathname!='undefined' && pathname.indexOf('.html')>=0) {
											return pathname.split('/').slice(0,-1).join('/') + '/';
										}
										return pathname;
									},
	clientiFix:					function(url) {
										return url.split('/clienti/90').join('/clienti/casa/90');//.replace('www.gruppohera.it','hera2.od.loc/hr_adm_r13');
									},
	init:							function() {
										if (jQuery(window).width() <= 979) {	//768) {
											jQuery('.apertura_menu').click(function(e){
												e.preventDefault();
												if ( ! supermenu.obj ) {
													supermenu.creazione();
												}
												supermenu.obj.show();
												jQuery('body>.container').css({
													'height':	0,
													'overflow':	'hidden'
												});
												return false;
											});
										}
										else if (supermenu.obj) {
											//supermenu.obj.remove();
											supermenu.obj.hide();
											supermenu.restorePageViewbility();
										}
									},
	cleanClone:					function(daClonare, scopeObj) {
										var clonato = jQuery(daClonare, scopeObj).clone();
										var h1 = clonato.find('h1');
										h1.replaceWith(h1.html());
										return clonato;
									},
	restorePageViewbility:	function(){
										jQuery('body>.container').css({
											'height':	'auto',
											'overflow':	'none'
										});
										//chiudi eventuali submenu aperti in fase di chiusura menu
										//jQuery('#sm_submain .nav.aperto').hide().removeClass('aperto');
										supermenu.closeToggleMenu();
									},
	closeToggleMenu:			function(){
										jQuery('#sm_submain .nav.aperto,#sm_topmenu .nav.aperto').each(function(){
											if (jQuery(this).closest('li').find('.sm_last_click').length <= 0) {
												jQuery(this).toggle(300).removeClass('aperto');
											}
										});
									},
	update:						function(scopeObj) {
										jQuery('#sm_main,#sm_submain,#sm_buttons,#sm_topmenu,#sm_comune').html('');
										
									//	jQuery('#sm_main').append(supermenu.cleanClone('.navbar-main', scopeObj).show());
									/*
										if (jQuery('.logo_acegas').length > 0) {
											jQuery('#supermenu .cls-gruppo,#supermenu .cls-reti').hide();
											jQuery('#supermenu .cls-clienti').css({
												"width":		"100%"
											});
										}
										else {
											jQuery('#supermenu .cls-gruppo,#supermenu .cls-reti').show();
											jQuery('#supermenu .cls-clienti').css({
												"width":		''
											});
										}
									*/
										if (jQuery('.logo_acegas').length > 0) {		/*				ACEGAS			*/
											//jQuery('#sm_main').append('<div class="">CLIENTI</div>');
											//alert(supermenu.cleanClone('.navbar-dx>.nav', scopeObj).html());
											var xScope = supermenu.cleanClone('.navbar-dx>.nav');
											jQuery('#sm_main').append( '<div class="sm_main_div active">'+jQuery('li:eq(0)', xScope).html()+'</div>' );
										}
										else {													/*				HERA				*/
											jQuery('#sm_main').append(supermenu.cleanClone('.navbar-main', scopeObj).show());
										}
										
										var leftmenu = supermenu.cleanClone('.box_menu_laterale>div>.nav', scopeObj);
										leftmenu.find('li>ul.nav').each(function(){
											if ( ! jQuery(this).prev('a.toggle').hasClass('aperto') ) {
												jQuery(this).hide();
											}
										});
										jQuery('#sm_submain').show();
										jQuery('#sm_submain')
											.append(supermenu.cleanClone('.box_menu_laterale .titolo_menu', scopeObj).show())
											.append(leftmenu.show());
										
										//se non c'è un titolo in pagina, inserisci il selected alla voce di menu main
										if (supermenu.obj.find('.titolo_menu').length<=0) {
											supermenu.obj.find('#sm_main .active a').addClass('sm_selected');
										}
										
										if (jQuery('.logo_acegas').length > 0) {		/*				ACEGAS			*/
											jQuery('#sm_buttons').append(supermenu.cleanClone('.navbar-dx>.nav').show());
											jQuery('#sm_buttons').find('.giallo').remove();
											jQuery('#sm_topmenu').empty();
										}
										else {													/*				HERA				*/
											jQuery('#sm_buttons').append(supermenu.cleanClone('.navbar-dx>.nav', scopeObj).show());
											jQuery('#sm_topmenu').append(supermenu.cleanClone('.navbar-top>.nav', scopeObj).removeClass('hidden-tablet hidden-phone').show());
										}
										
										jQuery('#sm_comune').show();
										jQuery('#sm_comune').append( jQuery('.scelta_comune',scopeObj).clone().find('.tipo_utente_cambio').show() );
										supermenu.obj.find('.active').addClass('sm_active_lock');
									},
	
	mainMenu:					null,
	prevMenu:					null,
	subMenu:						null,
	
	refresh:						function(href, path, dest) {
										var destination = null;
										if (dest && dest != 'undefined') {
											destination = dest;
										}
										var dataUrl = supermenu.clientiFix( supermenu.buildUrl( supermenu.cleanPathname( href) ) + '90box:72::db:hr_adm::treepath:'+supermenu.cleanPathname( path )+'.html' );
										https://www.gruppohera.it/clienti90box:72::db:hr_adm::treepath:__clienti__casa__.html
										dataUrl = dataUrl.replace('__https:www.gruppohera.it__clienti','__clienti__casa__').replace('clienti90box','clienti/casa/90box');
										/*try{
										console.log(dataUrl);
										}catch(e){}*/
										jQuery
											.ajax({
												"url":	dataUrl
											})
											.done(function(data){
												if (destination) {
													supermenu[destination] = data;//jQuery('.box_menu_laterale', data);
												}
												else {
													supermenu.update(data);
													var titolo = jQuery('.titolo_menu>a', data);
													if (titolo.length > 0) {
														var sez = supermenu.obj.find('#sm_main .active>a');
														supermenu['subMenu'] = data;
														supermenu.refresh(
																				supermenu.cleanPathname( sez.attr('href') ),
																				supermenu.urlSep + supermenu.cleanPathname( sez.attr('href') ).split('..').join('').split('//').join('').split('/').join(supermenu.urlSep),
																				'prevMenu'
																			);
													}
													else {
														supermenu['prevMenu'] = data;
													}
													
												}
											});
									},
	setSelected:				function(self) {
										jQuery('.sm_selected').each(function(){
											jQuery(this).removeClass('sm_selected');
											supermenu.applyActive(jQuery(this), 'removeClass');
										});
										self.addClass('sm_selected');
										supermenu.applyActive(self, 'addClass');
									}
}

jQuery(function(){

	supermenu.init();

	setTimeout(function(){
		G_supermenu_resizer = null;
		jQuery(window).resize(function(){
			clearTimeout(G_supermenu_resizer);
			G_supermenu_resizer = setTimeout(function(){
				supermenu.init();
			}, 500);
		});
	}, 500);

});