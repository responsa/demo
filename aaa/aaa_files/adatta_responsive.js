G_righe_bak = {
	'riga_2cols_SB':	'',
	'riga_3cols_SSB':	'',
	'riga_3cols_BSS':	'',
	'riga_3cols_SBS':	'',
	'riga_4cols':		''
};

jQuery.noConflict();
jQuery(document).ready(function(){

   if (jQuery('#riga_content_home_interna').length!=0) {
	  jQuery('body').addClass('riga_legacy');
   }
   
   tetris_backup();
	
	
   /*if(parseInt(jQuery(document).width())<963){ //larghezza = 979-16
	  scelta_comune = jQuery('.cls-clienti .container .navbar .area_comune').clone().show().addClass('comune_copia');
	  scelta_comune.css('clear','both');
	  jQuery('.cls-clienti .container .area_assistenza').after(scelta_comune);
   
   }
   else{
	  jQuery('.comune_copia').remove();
   }
   */
	
   if(parseInt(jQuery(window).width())<=768){ //larghezza = 768-16
	  //adatta box all'interno della colonna big in riga 2cols_SB
	  cont = 0;
	  /*jQuery('#riga_2cols_SB > .span9 > div').each(function(){
		 if (jQuery(this).hasClass('span4')) {
			if (cont % 2==0) {
			   jQuery(this).css({
				  'clear':'both',
				  'margin-left':0,
				  'margin-right':0
			   });
			}
			cont++;	
		 }
		 else{
			cont=2;
		 }
	  });*/
	  
	  adattaPrimaColonna('riga_2cols_SB');
	  adattaPrimaColonna('riga_3cols_BSS');
	  adattaPrimaColonna('riga_3cols_SBS');
	  
	  gOD.autolevReady.push( function(){
		 //--------LAVORAZIONE SUI BREADCRUMBS
		// if (jQuery('#riga_content_standard').length==0 && jQuery('.box_breadcrumbs').parent('.row-fluid').attr('id')!='riga_ani_gruppo') {	//solo se non sono in una content standard
		//	briciole = jQuery('.box_breadcrumbs').clone().css( {'width':'98%','margin-left':'1%','margin-top':'2%','min-height':'unset'} ).addClass('briciole_copia');
		//	jQuery('.box_breadcrumbs').hide();
		//	//jQuery('#riga_2cols_SB > div > div').first().css( {'clear':'both','margin-left':0} );
		//	jQuery('#riga_ani_gruppo').append(briciole);
		// }
		 //funzioni per centrare i box presenti nelle colonne strette in base alla risoluzione
////		 centraBox('riga_2cols_SB');
////		 centraBox('riga_3cols_BSS');
////		 centraBox('riga_3cols_SBS');
////		 centraBox('riga_4cols');
		 //gestione margin top dei box
		 setTimeout(function(){
			//Azione sui margin dei box
			var array_di_box_cont = {};//new Array();
			var cont_array = 1;
////			cont_array = adattaMarginBox('riga_2cols_SB',array_di_box_cont,cont_array);
////			cont_array = adattaMarginBox('riga_3cols_BSS',array_di_box_cont,cont_array);
////			cont_array = adattaMarginBox('riga_3cols_SBS',array_di_box_cont,cont_array);
////			cont_array = adattaMarginBox('riga_4cols',array_di_box_cont,cont_array);

				tetris();

		 },300);
		 
		 
	  });
   
	  
	  //sposta in landing box servizi menu di pronto intervento sotto ai servizi
	  pronto_intervento = jQuery('.box_elenco_servizi > .casa_servizi > .menuelenco_servizi').first().clone().show().addClass('servizi_copia');
	  jQuery('.box_elenco_servizi > .casa_servizi').append(pronto_intervento);
	  pronto_intervento = jQuery('.box_elenco_servizi > .business_servizi > .menuelenco_servizi').first().clone().show().addClass('servizi_copia');
	  jQuery('.box_elenco_servizi > .business_servizi').append(pronto_intervento);
   
	  
   
		//se sono in menu in una risoluzione inferiore a 768
		if (jQuery('body').hasClass('cls-clienti-aperto')) {
		  jQuery('.navbar-lev2').parent('.row-fluid').append('<div class="apri_menu_clienti"></div>');
		  var servizio = jQuery('.navbar-lev2 li.active a').html();
		  jQuery('.apri_menu_clienti').html('<span>Menu '+ servizio+'</span>');
		}
	  
		jQuery('.apri_menu_clienti').live('click',function(e){
			if (jQuery('.menu_clienti_hover').length==0) {
			  jQuery(this).parent('.row-fluid').append('<div class="menu_clienti_hover"></div>');
			  jQuery('.menu_clienti_hover').hide();
			  jQuery('.menu_clienti_hover').append(jQuery('.navbar-lev3').clone().show());
			  altezza_finale = parseInt(jQuery('.menu_clienti_hover').height());
			  jQuery('.menu_clienti_hover').height(0);
			  jQuery('.menu_clienti_hover').show();
			  jQuery('.menu_clienti_hover').animate({'height':altezza_finale},200,'easeInOutQuad',function(){
				  jQuery('.menu_clienti_hover').addClass('aperto');
			  });	
			}
			else{
			  altezza_iniziale = parseInt(jQuery('.menu_clienti_hover').height());
			  //jQuery('.menu_clienti_hover').height(0);
			  //jQuery('.menu_clienti_hover').show();
			  jQuery('.menu_clienti_hover').animate({'height':0},200,'easeInOutQuad',function(){
				  jQuery('.menu_clienti_hover').hide();
				  jQuery('.menu_clienti_hover').css('height',altezza_iniziale);
				  jQuery('.menu_clienti_hover').remove();
				  //jQuery('.menu_clienti_hover').addClass('aperto');
			  });	
			}
		 
		});
	  
		jQuery(window).scroll(function(){
		  if (jQuery('.menu_clienti_hover').length!=0) {
		  jQuery('.menu_clienti_hover').remove();
		  }
		});
	  
		//jQuery('.area_ricerca').on('click','.submit_ricerca',function(e){
		jQuery('.area_ricerca .submit_ricerca').live('click',function(e){
			box_ricerca = jQuery(this).parents('.area_ricerca').find('.input_ricerca');
			if (box_ricerca.hasClass('aperto')) {
				if (box_ricerca.val()!="Cerca argomento") {
					return true;
				}
				else{
					box_ricerca
						.hide(200)
						.removeClass('aperto');
				}
			}
			else{
			box_ricerca
						.css({'top':jQuery('.header').height() + jQuery(this).parents('.navbar').height() })
						.show(200)
						.addClass('aperto');
			}
			return false;
		});
	
		if (jQuery('.slides-container').length > 0) {
			jQuery('.box_eventi_calendario').addClass('calendario_landing');
		}
		
		
		manageBoxContatti(true);
		
   }
   else{
		
	  setTimeout(function(){
		 jQuery('#riga_2cols_SB > .span9 > .span4').removeAttr('style');
	  },400);
	  

		manageBoxContatti(false);
		
   }
   
   if(parseInt(jQuery(document).width())<464){	//larghezza = 480-16
	  /*menu_copy = jQuery('.menu_principale').first().clone().show().addClass('menu_copia');
	  jQuery('.header').append(menu_copy);
	  */
	  /*menu_clienti = jQuery('.cls-clienti .container .navbar .nav').first().clone().show().addClass('menu_clienti_copia');
	  jQuery('.cls-clienti .container .area_assistenza').after(menu_clienti);
	  */
	  
	  //gestione link menu servizi anche quando i link (testi) sono nascosti  
	  jQuery('.navbar-lev2 ul.nav li').live('click',function(e){
		 e.preventDefault();
		 location.href = jQuery(this).find('a').attr('href'); 
	  });
   
   }
   
   if ( parseInt( jQuery(window).width() ) < 980 ) {
		//gestisci click per aprire storytelling "differente"
		jQuery('.slides-container > li  .over').click(function(e){
		 e.preventDefault();
		 if (jQuery(window).width()>=980) {
					return true;
				}
		 //alert(jQuery(this).parent('.over').find('.over_link'));
		 link_over = jQuery(this).find('.over_link').clone().show();
		 if (jQuery('.layer_storylink').length==0) {
			jQuery('body').prepend('<div class="layer_storylink"></div>');
			jQuery('.layer_storylink').append('<div class="chiudi_storylink"></div>');
			//jQuery('.layer_storylink').width(jQuery(window).width() / 2 );
			jQuery('.layer_storylink').width(150);
			var margine = jQuery('.slides-container').offset();
			jQuery('.layer_storylink').css({
										  'left':( jQuery(window).width() - jQuery('.layer_storylink').width() ) / 2,
										  'top': margine.top
										  });
			
			
			
			jQuery('.layer_storylink').append(link_over);
			jQuery('.layer_storylink a').on('click',function(e) {
			//	e.stopPropagation();
				dataLayerPush(jQuery(this).data('action'), jQuery(this).data('label'));
			});
			jQuery(".layer_storylink a[rel^='prettyPhoto']").prettyPhoto({
			   deeplinking: 	false,
			   theme: 			'pp_default',
			   social_tools:	'',
			   autoplay:		false
			});
			jQuery('.layer_storylink').show(200);
		 }
		});
	  
		jQuery('.layer_storylink a.layer').live('click',function(e){ //, .box_archivio_3colonne_box4 a.layer
			e.preventDefault();
			var url_story = jQuery(this).attr('href');
			var numero_slide =  url_story.slice( url_story.indexOf('90slider:') + 9 ) ;
			location.href = 'http://' + location.hostname + '/storytelling_pagina/pagina' + numero_slide;
		});
		jQuery('.chiudi_storylink').live('click',function(e){
			questo = jQuery(this);
			jQuery(this).parent('.layer_storylink').hide(200,'easeInOutQuad',function(){
				questo.parent('.layer_storylink').remove();
			});
		});
	  
		//se c'� lo storytelling adatta l'area di click ed inserisci dicitura
		if (jQuery('.slides-container').length > 0) {
			jQuery('.slides-container li').each(function(){
				altezza_slide = jQuery(this).height();
				var dicitura = "";
				if (jQuery('body').hasClass('jq_lang_it')) {
					dicitura = "Leggi";
				}
				else{
					dicitura = "Read";
				}
				jQuery(this).find('.over').height(altezza_slide);
				testo_old = jQuery(this).find('.over .over_sottotitolo').html();
				jQuery(this).find('.over .over_sottotitolo')
																			.html(dicitura)
																			.show()
																			.attr('data-testo',testo_old);
			});
		}
	  
   }
   
   setTimeout(function(){
	  //------------------------------- RESIZE ------------------------------------
	  jQuery(window).resize(function(){
		 
		if ( parseInt( jQuery(window).width() ) < 980 ) {
			//gestisci click per aprire storytelling "differente"
			jQuery('.slides-container > li  .over').click(function(e){
				if (jQuery(window).width()>=980) {
					return true;
				}
				e.preventDefault();
				//alert(jQuery(this).parent('.over').find('.over_link'));
				link_over = jQuery(this).find('.over_link').clone().show();
				if (jQuery('.layer_storylink').length==0) {
					jQuery('body').prepend('<div class="layer_storylink"></div>');
					jQuery('.layer_storylink').append('<div class="chiudi_storylink"></div>');
					//jQuery('.layer_storylink').width(jQuery(window).width() / 2 );
					jQuery('.layer_storylink').width(150);
					var margine = jQuery('.slides-container').offset();
					jQuery('.layer_storylink').css({
												  'left':( jQuery(window).width() - jQuery('.layer_storylink').width() ) / 2,
												  'top': margine.top
												  });
					
					jQuery('.layer_storylink').append(link_over);
					jQuery('.layer_storylink a').on('click',function(e) {
					//	e.stopPropagation();
						dataLayerPush(jQuery(this).data('action'), jQuery(this).data('label'));
					});
					jQuery(".layer_storylink a[rel^='prettyPhoto']").prettyPhoto({
						deeplinking: 	false,
						theme: 			'pp_default',
						social_tools:	'',
						autoplay:		false
					});
					jQuery('.layer_storylink').show(200);
				}
			});
		  
			jQuery('.layer_storylink a.layer').live('click',function(e){
				e.preventDefault();
				var url_story = jQuery(this).attr('href');
				var numero_slide =  url_story.slice( url_story.indexOf('90slider:') + 9 ) ;
				location.href = 'http://' + location.hostname + '/storytelling_pagina/pagina' + numero_slide;
			});
			jQuery('.chiudi_storylink').live('click',function(e){
				questo = jQuery(this);
				jQuery(this).parent('.layer_storylink').hide(200,'easeInOutQuad',function(){
					questo.parent('.layer_storylink').remove();
				});
			});
		  
			//se c'� lo storytelling adatta l'area di click ed inserisci dicitura
			if (jQuery('.slides-container').length > 0) {
				jQuery('.slides-container li').each(function(){
					altezza_slide = jQuery(this).height();
					var dicitura = "";
					if (jQuery('body').hasClass('jq_lang_it')) {
						dicitura = "Leggi";
					}
					else{
						dicitura = "Read";
					}
					if (jQuery(this).find('.over .over_sottotitolo').attr('data-testo') === undefined) {
					
					jQuery(this).find('.over').height(altezza_slide);
					testo_old = jQuery(this).find('.over .over_sottotitolo').html();
					jQuery(this).find('.over .over_sottotitolo')
																			.html(dicitura)
																			.show()
																			.attr('data-testo',testo_old);
					}
				});
			}
		  
		}
		else{
		if (jQuery('.slides-container').length > 0) {
				jQuery('.slides-container li').each(function(){
				if (jQuery(this).find('.over .over_sottotitolo').attr('data-testo') !== undefined) {
						jQuery(this).find('.over .over_sottotitolo').html( jQuery(this).find('.over .over_sottotitolo').attr('data-testo') );
						jQuery(this).find('.over .over_sottotitolo').removeAttr('data-testo');
					}
				});
			}
			
		}
		 
		 //adatta box all'interno della colonna big in riga 2cols_SB
		 
		 if(parseInt(jQuery(document).width())<=768){
			cont = 0;
			//jQuery('#riga_2cols_SB > .span9 > div').each(function(){
			//   if (jQuery(this).hasClass('span4')) {
			//	  if (cont % 2==0) {
			//		 jQuery(this).css({
			//			'clear':'both',
			//			'margin-left':0,
			//			'margin-right':0
			//		 });
			//	  }
			//	  cont++;
			//   }
			//   else{
			//	  cont=2;
			//   }
			//});
			adattaPrimaColonna('riga_2cols_SB');
			adattaPrimaColonna('riga_3cols_BSS');
			adattaPrimaColonna('riga_3cols_SBS');
			
			//--------LAVORAZIONE SUI BREADCRUMBS
			//if (jQuery('.briciole_copia').length==0 && jQuery('#riga_content_standard').length==0 && jQuery('.box_breadcrumbs').parent('.row-fluid').attr('id')!='riga_ani_gruppo') {
			//   briciole = jQuery('.box_breadcrumbs').clone().first().css( {'width':'98%','margin-left':'1%','margin-top':'2%','min-height':'unset'} ).addClass('briciole_copia');
			//   jQuery('.box_breadcrumbs').hide();
			//   //jQuery('#riga_2cols_SB > div > div').first().css( {'clear':'both','margin-left':0} );
			//   jQuery('#riga_ani_gruppo').append(briciole);
			//}
			
			//funzioni per centrare i box presenti nelle colonne strette in base alla risoluzione
			
////			centraBox('riga_2cols_SB');
////			centraBox('riga_3cols_BSS');
////			centraBox('riga_3cols_SBS');
////			centraBox('riga_4cols');
			
			//re-inizializza margin top
			jQuery('.resized').css('margin-top','inherit');
			jQuery('.resized').removeClass('resized');
			//azione sui margin
			var array_di_box_cont = {};//new Array();
			var cont_array = 1;
////			cont_array = adattaMarginBox('riga_2cols_SB',array_di_box_cont,cont_array);
////			cont_array = adattaMarginBox('riga_3cols_BSS',array_di_box_cont,cont_array);
////			cont_array = adattaMarginBox('riga_3cols_SBS',array_di_box_cont,cont_array);
			//console.log(array_di_box_cont);
////			cont_array = adattaMarginBox('riga_4cols',array_di_box_cont,cont_array);
			
			//sposta in landing box servizi menu di pronto intervento sotto ai servizi
			jQuery('.servizi_copia').remove();
			pronto_intervento = jQuery('.box_elenco_servizi > .casa_servizi > .menuelenco_servizi').first().clone().show().addClass('servizi_copia');
			jQuery('.box_elenco_servizi > .casa_servizi').append(pronto_intervento);
			pronto_intervento = jQuery('.box_elenco_servizi > .business_servizi > .menuelenco_servizi').first().clone().show().addClass('servizi_copia');
			jQuery('.box_elenco_servizi > .business_servizi').append(pronto_intervento);
		 
			//se sono in menu in una risoluzione inferiore a 768
			if (jQuery('body').hasClass('cls-clienti-aperto') && jQuery('.apri_menu_clienti').length==0) {
			   jQuery('.navbar-lev2').parent('.row-fluid').append('<div class="apri_menu_clienti"></div>');
			   var servizio = jQuery('.navbar-lev2 li.active a').html();
			   jQuery('.apri_menu_clienti').html('<span>Menu '+ servizio+'</span>');
			}
			
			if (jQuery('.slides-container').length > 0) {
				jQuery('.box_eventi_calendario').addClass('calendario_landing');
			}
			
			manageBoxContatti(true);
			
		 }
		 else{
			//alert('azzera');
			jQuery('#riga_2cols_SB > .span9 > .span4').removeAttr('style');
			//jQuery('.resized').css('margin-top',0);
			jQuery('.resized').removeAttr('style');
			jQuery('.resized').removeClass('resized');
			jQuery('#riga_ani_gruppo .box_breadcrumbs').remove();
			jQuery('.servizi_copia').remove();
			jQuery('.box_breadcrumbs').show();
			//azzera spaziature laterali per i box
			jQuery('#riga_2cols_SB >.span3 .box_layout').css({'margin-left':0,'margin-right':0});
			jQuery('#riga_3cols_SBS >.span3 .box_layout').css({'margin-left':0,'margin-right':0});
			jQuery('#riga_3cols_SBS >.span6 .box_layout').removeAttr('style');
			jQuery('#riga_3cols_BSS >.span3').removeAttr('style');
			jQuery('#riga_4cols >.span3').removeAttr('style');
			jQuery('.apri_menu_clienti').remove();
			jQuery('.menu_clienti_hover').remove();
			
			jQuery('.menu_fixed .menu_lingua').css('margin-right',0);
			jQuery('.menu_fixed .apertura_menu').remove();
			
			manageBoxContatti(false);
			
		 }
		 
		 tetris();
		 
	  });
   },300);
   
   //per i box che sono stati spostati pi� vicino al box menu laterale, disattiva il margine negativo e ricalcolalo quando � terminata l'apertura del menu
   jQuery('.box_menu_laterale .nav li a.toggle').click(function(e){
	  if(parseInt(jQuery(document).width())<=768){
		 jQuery('.resized').css('margin-top','inherit');
		 jQuery('.resized').removeClass('resized');
		 setTimeout(function(){
			var array_di_box_cont = {};//new Array();
			var cont_array = 1;
////			cont_array = adattaMarginBox('riga_2cols_SB',array_di_box_cont,cont_array);
////			cont_array = adattaMarginBox('riga_3cols_BSS',array_di_box_cont,cont_array);
////			cont_array = adattaMarginBox('riga_3cols_SBS',array_di_box_cont,cont_array);
			///console.log(array_di_box_cont);
////			cont_array = adattaMarginBox('riga_4cols',array_di_box_cont,cont_array);

				////tetris();

		 },500);
	  };
   });
   
   //-------------------------FUNZIONE PER "AGGIUSTARE" I MARGIN TOP DEI BOX "PICCOLI"-----------------------------
   function adattaMarginBox(riga,array_di_box_param,cont_array_param){
		var array_di_box = array_di_box_param;
		var cont_array = cont_array_param;
		
		jQuery('#'+ riga +' > div').each(function(){	//per ogni colonna
			var delta_spaziatura = 40;
			var riga_attuale = jQuery('#'+ riga);
			jQuery(this).find('.box_layout').each(function(){
				//controllo larghezza box per gestione azzeramento array
				var larghezza_box = jQuery(this).width();
				var larghezza_riga = riga_attuale.width();
				
				if (larghezza_box > (larghezza_riga/2) ) {
					cont_array++;
				}
				
				var offset_box = jQuery(this).offset();
				var distanza_left = offset_box.left;
				distanza_left = Math.round(distanza_left);
				distanza_left = "riga_"+cont_array+"_colonna_"+distanza_left.toString();
				
				if (!jQuery.isArray(array_di_box[distanza_left])) {
					//alert(distanza_left);
					array_di_box[distanza_left] = new Array();
				}
				
				if (!array_di_box[distanza_left].length) {
					array_di_box[distanza_left][0]=jQuery(this);
				}
				else{
					num_elemento = parseInt(array_di_box[distanza_left].length);
					array_di_box[distanza_left][ array_di_box[distanza_left].length ]=jQuery(this);
				}
			});
			
			for (var key in array_di_box) {
				for(i=0;i<array_di_box[key].length;i++){
					if (i>0) {
						//alert(key+"----"+ array_di_box[key][i - 1].find('.box_titolo_big').html()+ " ------ " +  array_di_box[key][i ].find('.box_titolo_big').html());
						offset_precedente = array_di_box[key][i - 1].offset();
						altezza_precedente = array_di_box[key][i - 1].height();
						margini_precedente = parseInt(array_di_box[key][i - 1].css('margin-bottom'));
						if (parseInt( array_di_box[key][i - 1].css('margin-top') )>0 ) {
						  margini_precedente = margini_precedente + parseInt(array_di_box[key][i - 1].css('margin-top'));
						}
						spazio_top = offset_precedente.top + altezza_precedente + margini_precedente;
						offset_attuale = array_di_box[key][i].offset();
						if ( (offset_attuale.top - spazio_top)>delta_spaziatura ) {
						 array_di_box[key][i].css('margin-top', spazio_top - offset_attuale.top +16);
						 //array_di_box[key][i].css('margin-top', 0);
						 array_di_box[key][i].addClass('resized');
						}
					}
				}
			}
		});
		//evitaCollisioni( riga );
		
		return cont_array;
   }
   //-------------FINE FUNZIONE-------------------------------
	
	//------------FUNZIONE PER evitare sovrapposizioni di box
	function evitaCollisioni( riga ) {
		var array_di_box = {};
		cont_array = 0;
		var riga_attuale = jQuery('#'+ riga);
		riga_attuale.find('.box_layout').each(function(){
				//controllo larghezza box per gestione azzeramento array
				var larghezza_box = jQuery(this).width();
				var larghezza_riga = riga_attuale.width();
				
				if (larghezza_box > (larghezza_riga/2) ) {
					cont_array++;
				}
				
				var offset_box = jQuery(this).offset();
				var distanza_left = offset_box.left;
				distanza_left = Math.round(distanza_left);
				distanza_left = "riga_"+cont_array+"_colonna_"+distanza_left.toString();
				
				if (!jQuery.isArray(array_di_box[distanza_left])) {
					//alert(distanza_left);
					array_di_box[distanza_left] = new Array();
				}
				
				if (!array_di_box[distanza_left].length) {
					array_di_box[distanza_left][0]=jQuery(this);
				}
				else{
					num_elemento = parseInt(array_di_box[distanza_left].length);
					array_di_box[distanza_left][ array_di_box[distanza_left].length ]=jQuery(this);
				}
			});
		
		for (var key in array_di_box) {
			inizio = array_di_box[key].length -1;
			for(i=inizio;i>0;i--){
				offset_corrente = array_di_box[key][i].offset();
				
				altezza_precedente = array_di_box[key][i - 1].height();
				offset_precedente = array_di_box[key][i - 1].offset();
				somma = offset_precedente.top + altezza_precedente;
				
				if (offset_corrente.top < somma) {
					delta_spostamento = somma - offset_corrente.top+16;
					margine_top = parseInt(array_di_box[key][i].css('margin-top'));
					
					//array_di_box[key][i].attr('data-info', margine_top+', '+delta_spostamento);
					
					array_di_box[key][i].css({'margin-top': (margine_top + delta_spostamento) });//0});
					array_di_box[key][i].addClass('collisione');
				}
			}
		}
	}
	//-----------------fine funzione
   //----------FUNZIONE PER CENTRARE I BOX "PICCOLI"
   function centraBox(riga) {
		
	  //esegui solo fino a 480
		if (parseInt(jQuery(window).width())>460) {
			if (riga=="riga_4cols" || riga=="riga_3cols_BSS") {	//se sono 2 colonne o 4 colonne sposta le colonne
			  jQuery('#'+riga+' > .span3').each(function(){	//controlla ogni box
				  larghezza_finestra = parseInt(jQuery('#' + riga).width());	//estrai larghezza riga
				  if (parseInt(jQuery(this).width()) < larghezza_finestra / 2 ) {	//applica solo a box che occupano meno della met� dello spazio della riga
					 larghezza_colonna = parseInt(jQuery(this).width());
					 spazio_colonne = larghezza_colonna * 2;
					 marginatura_totale = larghezza_finestra - spazio_colonne;
					 margine_laterale_colonna = (marginatura_totale-4) / 4;
					 jQuery(this).css({'margin-left':margine_laterale_colonna,'margin-right':margine_laterale_colonna});   
				  }
			  });
			}
			else{	//altrimenti sposta i box all'interno delle colonne
			  jQuery('#'+riga+' .box_layout').each(function(){	//controlla ogni box
				  larghezza_finestra = parseInt(jQuery('#' + riga).width());	//estrai larghezza riga
				  if (parseInt(jQuery(this).width()) < larghezza_finestra / 2 ) {	//applica solo a box che occupano meno della met� dello spazio della riga
					 larghezza_colonna = parseInt(jQuery(this).width());
					 spazio_colonne = larghezza_colonna * 2;
					 marginatura_totale = larghezza_finestra - spazio_colonne;
					 margine_laterale_colonna = (marginatura_totale-4) / 4;
					 jQuery(this).css({'margin-left':margine_laterale_colonna,'margin-right':margine_laterale_colonna});   
				  }
			  });
			}
		}
		else{
		  //alert('aa');
		  jQuery('#'+riga+' .box_layout').css({'margin-left':0,'margin-right':0});
		  jQuery('#'+riga+' >.span3').removeAttr('style');
		}
   }
   //------FINE FUNZIONE
   
   //-------funzione per adattare la prima colonna affiancando i box piccoli
   function adattaPrimaColonna(riga) {
		cont = 0;
	  jQuery('#'+riga+' > .span3:first-child > div').each(function(){
			
		 if (!jQuery(this).hasClass('box_menu_laterale')) {	//se non � il menu laterale affianca i box a due a due
			
			if (cont % 2==0) {
			   jQuery(this).css({
				  'clear':'both',
			   });
			}
			else{
			   jQuery(this).css({
				  'clear':'none',
			   });
			}
			cont++;
		 }
	  });
   }
	
	
	// riposiziona i box contatti e il resto della colonna 1
	function manageBoxContatti(infondo) {
		//document.title = jQuery(window).width();
		var box_contact = jQuery('div.box_contatti:eq(0)');
		if (box_contact.length > 0) {
			var riga = box_contact.closest('div[id^=riga]');
			
			if ( infondo === false ) {
				if (jQuery('body').data('manageBoxContatti') == 'coda'){
					var lastCol = riga.children('div:last-child');
					riga.prepend(lastCol);
					jQuery('body').data('manageBoxContatti', 'testa');
				}
			}
			else {
				if (jQuery('body').data('manageBoxContatti') != 'coda'){
					var primaCol = riga.children('div:first-child');
					riga.append(primaCol);
					jQuery('body').data('manageBoxContatti', 'coda');
				}
			}
			/*}*/
		}
		
	}
	
	
	function bilancia_half() {
		for(var c=0; c<2; c++) {
			/* bilanciamento colonne 1 e 2 (half) */
			var vcol_1 = jQuery('#riga_half_jq>div:first-child');
			var vcol_1_hei = vcol_1.height();
			var vcol_1_num = jQuery('#riga_half_jq>div:first-child>div').length;
			var vcol_1_beforelast = jQuery('#riga_half_jq>div:first-child>div:eq('+(vcol_1_num-2)+')');
			var vcol_1_beforelast_hei = vcol_1_beforelast.height();
			var vcol_1_last = jQuery('#riga_half_jq>div:first-child>div:last-child');
			var vcol_1_last_hei = vcol_1_last.height();
			
			var vcol_2 = jQuery('#riga_half_jq>div:last-child');
			var vcol_2_hei = vcol_2.height();
			var vcol_2_num = jQuery('#riga_half_jq>div:last-child>div').length;
			var vcol_2_beforelast = jQuery('#riga_half_jq>div:last-child>div:eq('+(vcol_2_num-2)+')');
			var vcol_2_beforelast_hei = vcol_2_beforelast.height();
			var vcol_2_last = jQuery('#riga_half_jq>div:last-child>div:last-child');
			var vcol_2_last_hei = vcol_2_last.height();
			/*
			vcol_1_beforelast.css({'border':'1px dotted orange'});
			vcol_1_last.css({'border':'1px dotted orange'});
			vcol_2_beforelast.css({'border':'1px dotted orange'});
			vcol_2_last.css({'border':'1px dotted orange'});
			*/
			//document.title = vcol_1_hei+', '+vcol_2_hei+' // '+vcol_1_beforelast_hei+', '+vcol_1_last_hei+', '+vcol_2_beforelast_hei+', '+vcol_2_last_hei;
			if (c % 2 == 0) {
				if (vcol_1_hei - Math.round(vcol_1_last_hei/2) > vcol_2_hei) { // sposto da 1 a 2
					vcol_2.append( vcol_1_last );
					//vcol_1_last.css({'border':'1px dotted blue'});
				}
				else if (vcol_2_hei - Math.round(vcol_2_last_hei/2) > vcol_1_hei) { // sposto da 2 a 1
					vcol_1.append( vcol_2_last );
					//vcol_2_last.css({'border':'1px dotted blue'});
				}
			}
			else {
				if (vcol_1_hei - Math.round(vcol_1_beforelast_hei/2) > vcol_2_hei) { // sposto da 1 a 2
					vcol_2.append( vcol_1_beforelast );
					//vcol_1_beforelast.css({'border':'1px dotted blue'});
				}
				else if (vcol_2_hei - Math.round(vcol_2_beforelast_hei/2) > vcol_1_hei) { // sposto da 2 a 1
					vcol_1.append( vcol_2_beforelast );
					//vcol_2_beforelast.css({'border':'1px dotted blue'});
				}
			}
			/* ---- fine bilanciamento ---- */
		}
	}
	

	function tetris_backup() {
		for (var r in G_righe_bak) {
			if (G_righe_bak[r] == '') {
				G_righe_bak[r] = jQuery('#'+r).html();
			}
		}
	}
	
	function tetris() {
		var pageWid = parseInt(jQuery(document).width());
		if(pageWid > 480 && pageWid <= 768){
			if (jQuery('#riga_full_jq').length > 0) {
				return;
			}
			
			if (jQuery('#riga_multimedia').length > 0) {
				jQuery('#riga_multimedia')
					.before('<div id="riga_half_lower_jq" class="row-fluid"><div class="span6" style="width:47%;margin:0 1% 0 2%;"></div><div class="span6" style="width:47%;margin:0 2% 0 1%;"></div></div>')
					.before('<div id="riga_full_jq" class="row-fluid" style="padding: 0 2%;width: 96%;"></div>')
					.before('<div id="riga_half_jq" class="row-fluid"><div class="span6" style="width:47%;margin:0 1% 0 2%;"></div><div class="span6" style="width:47%;margin:0 2% 0 1%;"></div></div>');
			}
			else if (jQuery('#riga_ani_gruppo').length > 0) {
				jQuery('#riga_ani_gruppo')
					.after('<div id="riga_half_jq" class="row-fluid"><div class="span6" style="width:47%;margin:0 1% 0 2%;"></div><div class="span6" style="width:47%;margin:0 2% 0 1%;"></div></div>')
					.after('<div id="riga_full_jq" class="row-fluid" style="padding: 0 2%;width: 96%;"></div>')
					.after('<div id="riga_half_lower_jq" class="row-fluid"><div class="span6" style="width:47%;margin:0 1% 0 2%;"></div><div class="span6" style="width:47%;margin:0 2% 0 1%;"></div></div>');
			}
			else if (jQuery('body>.container').length > 0) {
				//jQuery('body>.container')
				jQuery('.footer').parent('.row-fluid')
					.before('<div id="riga_half_jq" class="row-fluid"><div class="span6" style="width:47%;margin:0 1% 0 2%;"></div><div class="span6" style="width:47%;margin:0 2% 0 1%;"></div></div>')
					.before('<div id="riga_full_jq" class="row-fluid" style="padding: 0 2%;width: 96%;"></div>')
					.before('<div id="riga_half_lower_jq" class="row-fluid"><div class="span6" style="width:47%;margin:0 1% 0 2%;"></div><div class="span6" style="width:47%;margin:0 2% 0 1%;"></div></div>')
			}
			
			var side = 'left';
			var refWid = Math.round( jQuery(window).width() /2);
			//jQuery('#riga_2cols_SB .box_layout,#riga_3cols_SSB .box_layout,#riga_3cols_BSS .box_layout,#riga_3cols_SBS .box_layout,#riga_4cols .box_layout').each(function(){
			jQuery('#riga_2cols_SB .box_layout,#riga_3cols_SSB .box_layout,#riga_3cols_BSS .box_layout,#riga_3cols_SBS .box_layout').each(function(){
				
				// casi speciali, fix PRE REPOSITION
				if (jQuery(this).hasClass('box_eventi_calendario')) {
				/*
					jQuery('.box_eventi_calendario.calendario_landing .box_lista_archivio li').css({
						"width":	'50%'
					});
				*/
					jQuery('.img_banner_calendario').css({
						'margin':	0
					});
				}
				// --------------------
				
				//if (jQuery(this).width() > refWid) {
				if (jQuery(this).width() > refWid   &&  ! jQuery(this).hasClass('box_eventi_calendario') ) {	//	CONDIZIONE SPECIALE PER EVENTI
					jQuery('#riga_full_jq').append( jQuery(this) );
				}
				else {
					if (side == 'left') {
						if (jQuery.trim( jQuery('#riga_half_jq>div:first-child').text() ) == '') {
							jQuery(this).css({
								'margin-top':	'4%'
							});
						}
						jQuery('#riga_half_jq>div:first-child').append( jQuery(this) );
						side = 'right';
					}
					else {
						if (jQuery.trim( jQuery('#riga_half_jq>div:last-child').text() ) == '') {
							jQuery(this).css({
								'margin-top':	'4%'
							});
						}
						jQuery('#riga_half_jq>div:last-child').append( jQuery(this) );
						side = 'left';
					}
				}
				
				jQuery(this).find('img:eq(0)').each(function(){
					if (jQuery(this).width() > refWid*0.7 && !(jQuery(this).hasClass('fullimg_gruppo_3o_img'))) {
						jQuery(this)
							.css({
									'width':		'100%'
								});
					}
				});
				
				
				// casi speciali, fix DOPO REPOSITION
				if (jQuery(this).hasClass('box_eventi_calendario')) {
				
					jQuery('.box_eventi_calendario.calendario_landing .box_lista_archivio li').css({
						"width":	'100%'
					});
					jQuery('.img_banner_calendario img').css({
						'max-width':	'none'
					});
					jQuery(this).css({
						'overflow':	'hidden'
					});
				}
				/*if (jQuery(this).hasClass('box_box_rifiutologo')) {
					jQuery('.box_anim_maincont,.box_anim_front,.box_anim_rear').css({
						'width':		jQuery(this).width()
					});
				}*/
				// --------------------
				
				
			});
			
			side = 'left';
			jQuery('#riga_4cols .box_layout').each(function(){
				
				if (side == 'left') {
					if (jQuery.trim( jQuery('#riga_half_lower_jq>div:first-child').text() ) == '') {
						jQuery(this).css({
							'margin-top':	'4%'
						});
					}
					jQuery('#riga_half_lower_jq>div:first-child').append( jQuery(this) );
					side = 'right';
				}
				else {
					if (jQuery.trim( jQuery('#riga_half_lower_jq>div:last-child').text() ) == '') {
						jQuery(this).css({
							'margin-top':	'4%'
						});
					}
					jQuery('#riga_half_lower_jq>div:last-child').append( jQuery(this) );
					side = 'left';
				}
				
				jQuery(this).find('img:eq(0)').each(function(){
					if (jQuery(this).width() > refWid*0.7) {
						jQuery(this)
							.css({
									'width':		'100%'
								});
					}
				});
				
			});
			
			jQuery('#riga_2cols_SB,#riga_3cols_BSS,#riga_3cols_SSB,#riga_3cols_SBS,#riga_4cols')
				.empty()
				.hide();
				
			bilancia_half();
		}
		else {
			if (jQuery('#riga_full_jq').length <= 0) {
				return;
			}
			jQuery('#riga_full_jq,#riga_half_jq,#riga_half_lower_jq').remove();
			jQuery('#riga_2cols_SB,#riga_3cols_BSS,#riga_3cols_SSB,#riga_3cols_SBS,#riga_4cols').each(function(){
				var r = jQuery(this).attr('id');
				if (G_righe_bak[ r ]) {
					jQuery(this)
						.empty()
						.html( G_righe_bak[ r ] )
						.show();
				}
			});
			
		}
		

	}
	
});
