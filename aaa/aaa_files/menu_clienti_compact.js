jQuery.noConflict();
jQuery(document).ready(function(){

   //*****adatta larghezza spazio nome comune
   /*
   tolleranza = 10;
   larghezza_areacomune = jQuery('.area_comune').width();
   larghezza_icomappa = jQuery('.area_comune').find('.ico_mappa').width();
   margin_area = parseInt(jQuery('.area_comune').find('.jq_nome_comune').css('margin-left'));
   larghezza_ingranaggio = jQuery('.area_comune').find('.jq_cambia_comune').width() + parseInt(jQuery('.area_comune').find('.jq_cambia_comune').css('margin-left'));
   
   larghezza_totale = larghezza_areacomune - larghezza_icomappa - margin_area - larghezza_ingranaggio - tolleranza;
   //altezza_box = jQuery('.area_comune').find('.jq_nome_comune').height();
   altezza_box = 18;
   jQuery('.area_comune').find('.jq_nome_comune').css({
	  'width': larghezza_totale,
	  'overflow': 'hidden',
	  'height':altezza_box
   });*/
   //alert(larghezza_totale);
   
   //****attivazione tooltip
   jQuery('.jq_nome_comune').each(function(){
	  jQuery(this).tooltip({container: 'body',trigger: 'manual'});
   });
   
   jQuery('.jq_nome_comune').mouseover(function(e){
	  jQuery(this).tooltip('show');
   });
   
   jQuery('.jq_nome_comune').mouseleave(function(e){
	  jQuery(this).tooltip('hide');
	  if (jQuery(this).parent('.area_comune').find('.tipo_utente_cambio').css('display')=='none') {
		 jQuery(this).show();
	  }
   });
   
   menu_aperto = false;
   clienti_aperto = false;
   business_aperto = false;
   if (jQuery('body').hasClass('cls-clienti-aperto')) {
	  clienti_aperto = true;
   }
   if (jQuery('body').hasClass('cls-business')) {
	  business_aperto = true;
   }
   if (jQuery(window).scrollTop()>180) {
		jQuery('body').prepend('<div class="menu_fixed"><div class="wrapper"><div class="navbar"></div></div></div>');
		jQuery('.menu_fixed .wrapper').addClass('cls-clienti-aperto');
		if (business_aperto) {
			jQuery('.menu_fixed .wrapper').addClass('cls-business-aperto');
			jQuery('.menu_fixed .wrapper').addClass('cls-business');
			jQuery('.menu_fixed .wrapper').removeClass('cls-clienti-aperto');
		}
		jQuery('.menu_fixed .wrapper').css('width',parseInt(jQuery('.container').width()));
		if (jQuery(window).width() > 768) {
			jQuery('.riga_assistenza_clienti_casa').addClass('hide');
		}
		jQuery('.logo').clone().prependTo('.menu_fixed .wrapper');
		jQuery('.navbar .nav').clone().appendTo('.menu_fixed .wrapper .navbar');
		jQuery('.area_assistenza').clone().appendTo('.menu_fixed .wrapper');
		jQuery('.area_ricerca').clone().appendTo('.menu_fixed .wrapper');
		// RESPONSIVE
		if (jQuery(window).width() <=789) {
			jQuery('.apertura_menu').clone().appendTo('.menu_fixed .wrapper').removeClass('span5 visible-tablet visible-phone ');
			jQuery('.menu_fixed .apertura_menu a').live('click',function(e){
				e.preventDefault();
				jQuery('.header .apertura_menu a').trigger('click');
			});
		}
		jQuery('.area_comune').clone().appendTo('.menu_fixed .wrapper');
		jQuery('.navbar-lev2').clone().appendTo('.menu_fixed .wrapper');
		if(jQuery('.navbar-lev3 .nav-orizz').has('li').length>0){
			jQuery('.navbar-lev3').clone().appendTo('.menu_fixed .wrapper');
		}
	  menu_aperto=true;
	  
	  larghezza_icomappa = jQuery('.menu_fixed .jq_cambia_comune').parent('.area_comune').find('.ico_mappa').width();
	  larghezza_spazio = jQuery('.menu_fixed .jq_cambia_comune').parent('.area_comune').width();
	  padding_form = parseInt(jQuery('.menu_fixed .jq_cambia_comune').parent('.area_comune').find('.tipo_utente_cambio').css('padding-left'));
	  larghezza_totale = larghezza_spazio - larghezza_icomappa - padding_form;
	  jQuery('.menu_fixed .jq_cambia_comune').parent('.area_comune').find('.tipo_utente_cambio').css('width',larghezza_totale);
	  
   }

   //****gestione scroll window per creazione menu static
   jQuery(window).scroll(function(){
	  
	  if(jQuery(window).scrollTop()>=100 && jQuery(document).height() > jQuery(window).height()+121 ){
		 //alert(jQuery(window).height());
		 if (!menu_aperto){
			jQuery('body').prepend('<div class="menu_fixed"><div class="wrapper"><div class="navbar"></div></div></div>');
			jQuery('.menu_fixed .wrapper').addClass('cls-clienti-aperto');
			if (business_aperto) {
			   jQuery('.menu_fixed .wrapper').addClass('cls-business-aperto');
			   jQuery('.menu_fixed .wrapper').addClass('cls-business');
			   jQuery('.menu_fixed .wrapper').removeClass('cls-clienti-aperto');
			}
			jQuery('.menu_fixed .wrapper').css('width',parseInt(jQuery('.container').width()));
			
			if (jQuery(window).width() > 768) {
				jQuery('.riga_assistenza_clienti_casa').addClass('hide');
			}
			
			
			jQuery('.logo').clone().prependTo('.menu_fixed .wrapper');
			jQuery('.navbar .nav').clone().appendTo('.menu_fixed .wrapper .navbar');
			jQuery('.area_assistenza').clone().appendTo('.menu_fixed .wrapper');
			jQuery('.area_ricerca').clone().appendTo('.menu_fixed .wrapper');
			// RESPONSIVE
			if (jQuery(window).width() <=789) {
				jQuery('.apertura_menu').clone().appendTo('.menu_fixed .wrapper').removeClass('span5 visible-tablet visible-phone text-right');
				jQuery('.menu_fixed .apertura_menu a').live('click',function(e){
					e.preventDefault();
					jQuery('.header .apertura_menu a').trigger('click');
				});
			}
			jQuery('.area_comune').clone().appendTo('.menu_fixed .wrapper');
			jQuery('.navbar-lev2').clone().appendTo('.menu_fixed .wrapper');
			if(jQuery('.navbar-lev3 .nav-orizz').has('li').length>0){
			   jQuery('.navbar-lev3').clone().appendTo('.menu_fixed .wrapper');
			}
			menu_aperto=true;
		 
			//***adatta larghezza form input comune on resize
			larghezza_icomappa = jQuery('.menu_fixed .jq_cambia_comune').parent('.area_comune').find('.ico_mappa').width();
			larghezza_spazio = jQuery('.menu_fixed .jq_cambia_comune').parent('.area_comune').width();
			padding_form = parseInt(jQuery('.menu_fixed .jq_cambia_comune').parent('.area_comune').find('.tipo_utente_cambio').css('padding-left'));
			larghezza_totale = larghezza_spazio - larghezza_icomappa - padding_form;
			jQuery('.menu_fixed .jq_cambia_comune').parent('.area_comune').find('.tipo_utente_cambio').css('width',larghezza_totale);
			
		 }
	  }
	  else{
		 jQuery('.menu_fixed').remove();
		 if (!clienti_aperto) {
			jQuery('body').removeClass('cls-clienti-aperto');
		 }
		 
		 menu_aperto= false;
	  }
	  
   });
   
   jQuery(window).resize(function(){
	  if (menu_aperto) {
		 jQuery('.menu_fixed .wrapper').css('width',parseInt(jQuery('.container').width()));
	  }
	  
	  //***adatta larghezza form input comune on resize
	  larghezza_icomappa = jQuery('.jq_cambia_comune').parent('.area_comune').find('.ico_mappa').width();
	  larghezza_spazio = jQuery('.jq_cambia_comune').parent('.area_comune').width();
	  padding_form = parseInt(jQuery('.jq_cambia_comune').parent('.area_comune').find('.tipo_utente_cambio').css('padding-left'));
	  larghezza_totale = larghezza_spazio - larghezza_icomappa - padding_form;
	  jQuery('.jq_cambia_comune').parent('.area_comune').find('.tipo_utente_cambio').css('width',larghezza_totale);
   });
   
   jQuery('.jq_cambia_comune').live('click',function(){
	  jQuery(this).parent('.area_comune').find('.jq_nome_comune').toggle();
	  jQuery(this).parent('.area_comune').find('.tipo_utente_cambio').toggle();
	  larghezza_icomappa = jQuery(this).parent('.area_comune').find('.ico_mappa').width();
	  larghezza_spazio = jQuery(this).parent('.area_comune').width();
	  
	  padding_form = parseInt(jQuery(this).parent('.area_comune').find('.tipo_utente_cambio').css('padding-left')) + 1;
	  larghezza_totale = larghezza_spazio - larghezza_icomappa - padding_form;
	  
	  //****toggle ingranaggio
	  jQuery(this).toggle();
	  //**allarga il form per tutto lo spazio che ha a disposizione
	  jQuery(this).parent('.area_comune').find('.tipo_utente_cambio').css('width',larghezza_totale);
	  return false;
   });
   
   
   //****attiva box cambio comune anche su nome comune e icona mappa in clienti
   jQuery('.jq_nome_comune').live('click',function(e){
	  jQuery('.jq_cambia_comune').trigger('click');	  
   });
   
   
   jQuery('.ico_mappa').live('click',function(){
	  jQuery('.jq_cambia_comune').trigger('click');	  
   });
   
});
