jQuery.noConflict();
jQuery(document).ready(function(){
   
   //*****prettyPhoto per slider*****///
   jQuery("a[rel^='prettyPhoto']").prettyPhoto({
      default_width: 500,
      default_height: 344,
   });
   
   //***se c'è solo un elemento duplicalo
   jQuery('.slide2').each(function(e){
	  if (jQuery(this).find('ul li div.imghover').length == 1) {
	  /*window.clearTimeout(timer_slider_gruppo);
	  window.clearTimeout(timer_slider_gruppo2);*/
	  jQuery(this).find('.freccine').hide();
	  //jQuery('.slide2 ul li:last-child').removeClass('current');
	  }
   });
   
   
   jQuery('.freccine .left').click(function(e){
	  //***associazione oggetto contenitore corrente
	  var var_slider = jQuery(this).closest('.slide2');
	  //****stoppa l'animazione temporizzata
	  window.clearTimeout(var_slider.data('timer_slider_gruppo'));
	  window.clearTimeout(var_slider.data('timer_slider_gruppo2'));
	  e.preventDefault();
	  //oggettoPrec =jQuery('.slide2 ul li.current');
	  oggettoPrec =var_slider.find('ul li.current');
	  if (oggettoPrec.length == 0) {
		 var_slider.find('ul li').last().addClass('current');
		 oggettoPrec =var_slider.find('ul li.current');
	  }
	  //*****per effettuare carousel infinito quando arrivo all'ultimo prendo il primo
	  if(oggettoPrec.is(":last-child")) 
		 oggetto = var_slider.find('ul li:first'); 
	  else
		 oggetto = var_slider.find('ul li.current').next();
	  //alert(oggettoPrec.is(":last"));
	  
	  //*****modifica per slider in clienti
	  contenitore_slide = jQuery(this).parents('.box_slider_home_gruppo');
	  if (contenitore_slide.hasClass('slider_nuovo_clienti')) {
		 oggettoPrec.find('.imghover').animate({'opacity':0},200,'easeInOutQuad');
		 oggetto.find('.imghover').css('opacity',1);
	  }
	  
	  //*****controllo animazione solo se è già finita quella precedente
	  if (parseInt(oggettoPrec.find('.imghover').css('left'))==0 && (parseInt(oggettoPrec.css('left'))==0 || oggettoPrec.css('left')=="auto")) {
		 //****sposto i livelli da mostrare in alto e gli altri in bassos
		 oggetto.css("z-index",100000); 
		 oggettoPrec.css("z-index",1);
		 //oggettoPrec.hide();
		 oggettoPrec.removeClass("current");
		 //***sposto l'oggetto a fianco
		 oggetto.css("top",0);
		 oggetto.css("left",2100);
		 oggetto.show();
		 oggetto.addClass("current");
		 imgTesto = oggetto.find('.imghover');
		 imgTesto.hide();  
		 imgTesto.css("left",2100);
		 imgTesto.show();  
		 //****faccio entrare il testo ritardato
		 imgTesto.animate({left: 0},1500,'easeInOutCirc');
		 //****animo il layer
		 oggetto.animate({
		 left:0
		 },800,'easeInOutCubic',function(){
		   
		   oggettoPrec.hide();
		   //jQuery('.freccine .left').hide();
		   jQuery('.freccine .right').show(200);
		 });
	  }
   });  
  
   jQuery('.freccine .right').click(function(e){
	  //***associazione oggetto contenitore corrente
	  var var_slider = jQuery(this).closest('.slide2');
	  window.clearTimeout(var_slider.data('timer_slider_gruppo'));
	  window.clearTimeout(var_slider.data('timer_slider_gruppo2'));
	  e.preventDefault();
	  oggettoPrec =var_slider.find('ul li.current');
	  
	  if (oggettoPrec.length == 0) {
		 var_slider.find('ul li').first().addClass('current');
		 oggettoPrec =var_slider.find('ul li.current');
	  }
	  
	  if(oggettoPrec.is(":first-child")){
		 oggetto = var_slider.find('> ul > li:last');
	  }
	  else{
		 oggetto = var_slider.find('ul li.current').prev();
	  }
	  
	  //*****modifica per slider in clienti
	  contenitore_slide = jQuery(this).parents('.box_slider_home_gruppo');
	  if (contenitore_slide.hasClass('slider_nuovo_clienti')) {
		 oggettoPrec.find('.imghover').animate({'opacity':0},200,'easeInOutQuad');
		 oggetto.find('.imghover').css('opacity',1);
	  }
	  
	  //controllo animazione solo se è terminata la precedente
	  if (parseInt(oggettoPrec.find('.imghover').css('left'))==0 && (parseInt(oggettoPrec.css('left'))==0 || oggettoPrec.css('left')=="auto")) {
		 oggetto.css("z-index",10);
		 oggettoPrec.css("z-index",1);
		 oggettoPrec.removeClass("current");
		 oggetto.css("top",0);
		 oggetto.css("left",-2100);
		 oggetto.show();
		 oggetto.addClass("current");
		 imgTesto = oggetto.find('.imghover');
		 imgTesto.hide();
		 imgTesto.css("left",-2100);
		 imgTesto.show();
		 imgTesto.animate({left: 0},1500,'easeInOutCirc');
		 oggetto.animate({
		 left:0
		 },800,'easeInOutCubic',function(){
		   oggettoPrec.hide();
		   jQuery('.freccine .left').show(200);
		 });
	  }
   });

	//***** modifiche per rendere tutto cliccabile
		//jQuery('#riga_ani_gruppo').on('click', 'ul li.current .link_cornice_js',function(){
		jQuery('.slide2').on('click', 'ul li.current .link_cornice_js',function(){
			var self = jQuery(this);
		//alert('ciao1'); 
			if (jQuery(window).width()>980) {
				var linkcheck = jQuery('ul li.current .link_cornice_home').html(); // prendo il link per lo slide
				var poslink = linkcheck.indexOf("trigger_"); // cerco la sottostringa
				dataLayerPush(jQuery(this).data('action'), jQuery(this).data('label'));
				if(poslink > -1) { // se trova la sottostringa fa il trigger
					var numlink = linkcheck.split('_');
					jQuery(this).closest('.current').find('ul.links_slide li:eq('+(numlink[1]-1)+')>a').get(0).click();
				}
				else { // altrimenti usa il link normalmente
					location.href=linkcheck;
				}
				return false;
			}			
		});
		jQuery('ul.links_slide li a').click(function(e){
			e.stopPropagation();
			dataLayerPush(jQuery(this).data('action'), jQuery(this).data('label'));
		});
	//***** fine modifiche per rendere tutto cliccabile

   timer_slider_gruppo = 0;
   timer_slider_gruppo2 = 0;
   if (jQuery('.slide2').html()!==undefined) {
	  //***stoppa i timer se clicco su link*****//
	  jQuery('.slide2').each(function(e){
		 jQuery(this).find('ul.links_slide li a').click(function(e){
			window.clearTimeout(jQuery(this).data('timer_slider_gruppo'));
			window.clearTimeout(jQuery(this).data('timer_slider_gruppo2'));
		 });
	  });
	  
   	  
	  //adatta altezza e posizione freccine in base alla dimensione risoluzione
	  timer_adattamento = setTimeout(function(){
		 jQuery('.slide2').each(function(e){
			//alert('aa');
			altezzaFreccine = parseInt(jQuery(this).find('.freccine .right').height());
			altezzaImg = parseInt(jQuery(this).find('ul li.current img').height());
			altezzaLinks = parseInt(jQuery(this).find('ul li.current .links_slide').height())+20;
			jQuery(this).css('height',altezzaImg);
			jQuery(this).find('.freccine').css('top',(altezzaImg/2) - (altezzaFreccine/2));
			jQuery(this).find('.img_slide img').css('max-height',altezzaImg-altezzaLinks);
		 });
		 
	  },1000);
	  
  	  jQuery(window).resize(function(){
 	  	 time_ridimensiona = setTimeout(function(){
			jQuery('.slide2').each(function(e){
			   altezzaFreccine = parseInt(jQuery(this).find('.freccine .right').height());
			   altezzaImg = parseInt(jQuery(this).find('ul li.current img').height());
			   altezzaLinks = parseInt(jQuery(this).find('ul li.current .links_slide').height())+20;
			   jQuery(this).css('height',altezzaImg);
			   jQuery(this).find('.freccine').css('top',(altezzaImg/2) - (altezzaFreccine/2))
			   jQuery(this).find('.img_slide img').css('max-height',altezzaImg-altezzaLinks);
			});
		 },100);
	  });
	  
	  secondi_timer = 7000; //Tempo di passaggio da una slide all'altra
	  jQuery('.slide2').each(function(e){
		 var var_slider = jQuery(this);
		 var oggetto = jQuery(this).find('ul li.current');
		 oggetto.css('display','block');
		 oggetto.css("z-index",1000);
		 //***anima solo la parte hover ritardata
		 imgTesto = oggetto.find('.imghover');
		 imgTesto.css("left",2100);
		 imgTesto.show();
		 imgTesto.animate({left: 0},1500,'easeInOutCirc');
		 //****inizia slideshow continua********
		 var_slider.data('timer_slider_gruppo',setTimeout(function() {
			oggettoPrec =var_slider.find('ul li.current');
			//*****per effettuare carousel infinito quando arrivo all'ultimo prendo il primo
			if(oggettoPrec.is(":last-child"))
			   oggetto = var_slider.find('ul li:first'); 
			else
			   oggetto = var_slider.find('ul li.current').next();
			
			//*****modifica per slider in clienti
			contenitore_slide = oggetto.parents('.box_slider_home_gruppo');
			if (contenitore_slide.hasClass('slider_nuovo_clienti')) {
			   oggettoPrec.find('.imghover').animate({'opacity':0},200,'easeInOutQuad');
			   oggetto.find('.imghover').css('opacity',1);
			}
			
			//****sposto i livelli da mostrare in alto e gli altri in bassos
			oggetto.css("z-index",100000); 
			oggettoPrec.css("z-index",1);
			//oggettoPrec.hide();
			oggettoPrec.removeClass("current");
			//***sposto l'oggetto a fianco
			oggetto.css("top",0);
			oggetto.css("left",2100);
			oggetto.show();
			imgTesto = oggetto.find('.imghover');
			imgTesto.hide();  
			imgTesto.css("left",2100);
			imgTesto.show();  
			//****faccio entrare il testo ritardato
			imgTesto.animate({left: 0},1500,'easeInOutCirc');
			//****animo il layer
			oggetto.animate({
			left:0
			},800,'easeInOutCubic',function(){
			  oggetto.addClass("current");
			  oggettoPrec.hide();
			  //jQuery('.freccine .left').hide();
			  var_slider.find('.freccine .right').show(200);
			});
			var_slider.data('timer_slider_gruppo2',setTimeout(arguments.callee, secondi_timer));
			}, secondi_timer)
		 );
		 
		 if (var_slider.find('ul li div.imghover').length == 1) {
			window.clearTimeout(var_slider.data('timer_slider_gruppo'));
			window.clearTimeout(var_slider.data('timer_slider_gruppo2'));
		 }
	  secondi_timer+=1000;
	  });
   }

});