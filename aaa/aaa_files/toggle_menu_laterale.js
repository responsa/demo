jQuery.noConflict();
//jQuery(document).ready(function(){
	jQuery(function(){
	/******gestione toggle menu box laterale********/
   jQuery('.box_menu_laterale .nav li a.toggle').click(function(e){
	  e.preventDefault();
	  jQuery(this).parent('li').find('ul:first').toggle(300);
	  if (jQuery(this).hasClass('aperto')) {
		 jQuery(this).removeClass('aperto');
	  }
	  else{
		 jQuery(this).addClass('aperto');
	  }
   });
 
	
	/****** se ho settato la classe "box_menu_aperto_liv2" apro subito le voci di 2 livello ******/
	jQuery('.box_menu_aperto_liv2 .nav>li>a.toggle').each(function(){
		var ul_first = jQuery(this).parent('li').find('ul:first')
		if (ul_first.closest('.active').length <= 0) {
			ul_first.toggle(0);
			jQuery(this).addClass('aperto');
		}
	});
});