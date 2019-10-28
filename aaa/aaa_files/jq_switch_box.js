// Cambia il tab attivo e il tab affianco al click
jQuery.noConflict();
jQuery(document).ready(function(){
	// switch tra aperto/chiuso dei box per cambiare il tipo di utente e di comune
	/*jQuery('#jq_cambia_cliente').click(function(){
		jQuery('.tipo_utente_cambio').hide();
		jQuery('.tipo_comune_cambio').toggle();
		return false;
	});
	jQuery('#jq_home_scelgo_comune').click(function(){
		//jQuery('.box_clienti').each(function(i) {
			jQuery('.box_clienti').toggle();
		//});
		jQuery('.jq_home_scelgo_comune').toggle();
		return false;
	});*/
	jQuery('#jq_cambia_comune').click(function(){
		jQuery('.jq_nome_comune').toggle();
		jQuery('.tipo_utente_cambio').toggle();
		return false;
	});
	
	/*
	jQuery('.tipo_utente_cambio a').click(function(){
		jQuery('.tipo_utente_cambio').hide();
	});
	jQuery('.tipo_comune_cambio').each(function(i) {
		jQuery(this).find('a').click(function(){
			jQuery('.tipo_comune_cambio').hide();
		});
	});
	*/
	// login nella home di clienti
	//if (jQuery('#js_tuc_clienti_comune').length > 0) {	/*alert('x');*/
	if (jQuery('#clienti_comune').length > 0) {
		velina_primobox();
	}
		/*jQuery('#js_tuc_noprofilo_a').click(function(){
			velina_primobox();
			return false;
		});
		jQuery('#js_tuc_clienti_utente_a').click(function(){ // STEP 2: visualizzo i box del comune			
			jQuery('#js_tuc_clienti_utente').css('display','none');
			return false;
		});
	}*/
	
});

// Funzione che contiene le operazioni generiche all'apertura della pagina e al click del bottone
function velina_primobox() {
	
/*************************** OD_R13 REMOVED ***************************
	jQuery('#js_tuc_clienti_utente,#js_tuc_clienti_comune').hide();
	if(jQuery('#jq_tucsez_clienti').length > 0)
		jQuery('body').append(jQuery('#js_tuc_clienti_utente'));
	jQuery('#js_tuc_clienti_comune_content').html('');
	jQuery('body').append(jQuery('#js_tuc_clienti_comune'));
	jQuery('#js_tuc_clienti_comune_content').html(G_s);
**********************************************************************/

	//alert('autocomplete');

	var ac_cache = {};
	jQuery('#clienti_comune').live('keydown',function(){
		jQuery('#clienti_comune').keydown(function(ev){ /* se cerco il Comune disabilito il Cap */
			jQuery('#clienti_comune').css({
				'background': '#FFF'
			});
			setTimeout(function(){
				if(jQuery.trim(jQuery('#clienti_comune').val()).length > 0) {
					jQuery('#clienti_cap').attr("disabled", "disabled");
					jQuery('#clienti_cap').css('background-color', '#E7E7E7');
		
					if (ev.keyCode == 13) {
						//alert( jQuery( "#clienti_comune" ).val() );
						jQuery.getJSON( "/ajax/get_comuni.php", {"term": jQuery( "#clienti_comune" ).val(),"exact":1}, function( data, status ) {
							//alert('52:'+data);
							if (data.length == 1) {
								jQuery( "#comune_pag_ref" ).val( data[0].value );
								jQuery( "#clienti_comune" ).val( data[0].label );
								jQuery( ".ui-autocomplete" ).hide();	//alert('dbg:105');
								jQuery('#submit').trigger('click');		
								return;
							}
						});
					}
				}
				else {
					jQuery('#clienti_cap').removeAttr("disabled");
					jQuery('#clienti_cap').css('background-color', '#FFFFFF');
				}
			}, 250);
		});
	});
	
			
	jQuery('#clienti_cap').keydown(function(ev){ /* se cerco il Cap disabilito il Comune */
		jQuery(this).css({
			'background': '#FFF'
		});
		setTimeout(function(){
			if(jQuery.trim(jQuery('#clienti_cap').val()).length > 0) {
				jQuery('#clienti_comune').attr("disabled", "disabled");
				jQuery('#clienti_comune').css('background-color', '#E7E7E7');
	
				if (ev.keyCode == 13) {
					jQuery.getJSON( "/ajax/get_cap_comuni.php", {"term": jQuery( "#clienti_cap" ).val(),"exact":1}, function( data, status ) {
						//alert('77:'+data);
						if (data.length == 1) {
							jQuery( "#comune_cap_ref" ).val( data[0].value );
							jQuery( "#clienti_cap" ).val( data[0].label );
							jQuery( ".ui-autocomplete" ).hide();	//alert('dbg:147');
							jQuery('#submit').trigger('click');		
							return;
						}
					});
				}
			}
			else {
				jQuery('#clienti_comune').removeAttr("disabled");
				jQuery('#clienti_comune').css('background-color', '#FFFFFF');
			}
		}, 250);
	});


	jQuery('#clienti_comune').live('focus',function(){
		questo = jQuery(this);
		jQuery(this).autocomplete({												
			//autoFocus: true,
			open: function(){
				jQuery(this).autocomplete('widget').css({
					'z-index':		10000000002,
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
				return false;
			},
			source: function( request, response ) {
				var term = request.term;
				if ( term in ac_cache ) {
					response( ac_cache[ term ] );
					return;
				}
				//G_TEST = request;
				if(jQuery('#clienti_comune').hasClass("comune_progettisti_tecnici"))
				{
					jQuery.getJSON( "/ajax/get_comuni_progettisti.php", request, function( data, status ) {
						ac_cache[ term ] = data;
						response( data );
					});
				}
				else
				{					
					jQuery.getJSON( "/ajax/get_comuni.php", request, function( data, status ) {
						ac_cache[ term ] = data;
						response( data );					
					});
				}
			},
			minLength: 3,
			focus: function( event, ui ) {
				jQuery( "#comune_pag_ref" ).val( ui.item.value );
				questo.val( ui.item.label );
				
				//alert(navigator.userAgent);
				var ua = '' + navigator.userAgent;	/*		TRICK PER WINDOWS PHONE	*/
				if (ua.indexOf('Windows Phone') >= 0) {
					questo.closest('form').find('#submit').trigger('click');
				}
				return false;
			},
			select: function( event, ui ) {
				questo.val( ui.item.label );
				jQuery( "#comune_pag_ref" ).val( ui.item.value );
				return false;
			}

		});
	});
			
	
	jQuery('#clienti_cap').autocomplete({
		//autoFocus: true,
		open: function(){
			jQuery(this).autocomplete('widget').css({
				'z-index':		100000000002,
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
			return false;
		},
		source: function( request, response ) {
			var term = request.term;
			if ( term in ac_cache ) {
				response( ac_cache[ term ] );
				return;
			}
			//G_TEST = request;
			jQuery.getJSON( "/hr_adm/ajax/get_cap_comuni.php", request, function( data, status ) {
				ac_cache[ term ] = data;
				response( data );					
			});
		},
		minLength: 2,
		focus: function( event, ui ) {
			jQuery( "#comune_cap_ref" ).val( ui.item.value );
			jQuery( "#clienti_cap" ).val( ui.item.label );
			return false;
		},
		select: function( event, ui ) {
			jQuery( "#clienti_cap" ).val( ui.item.label );
			jQuery( "#comune_cap_ref" ).val( ui.item.value );
			return false;
		}
	});
	
	G_canSubmit = true;
	jQuery('#formAutocomp').submit(function(){
		//alert('submit');
		if(jQuery('#clienti_comune').val() != '') {							
			if (G_canSubmit && jQuery.trim( jQuery( "#comune_pag_ref" ).val() ) == '') {
				G_canSubmit = false;
				
				var termine = (''+jQuery('#clienti_comune').val()).toLowerCase();
				
				jQuery.getJSON( "/hr_adm/ajax/get_comuni.php", {"term":termine}, function( data, status, xhr ) {
					//alert('231:'+data);
					
					var srch = (''+jQuery('#clienti_comune').val()).toLowerCase();
					
					var jsonArr = data;
					for(var i=0; i<jsonArr.length; i++) {
						if ( (''+jsonArr[i].label).toLowerCase() == srch ) {
							jQuery( "#comune_pag_ref" ).val( jsonArr[i].value );
							jQuery( "#comune_pag_form" ).trigger('submit');
							return;
						}
					}
					jQuery('#clienti_comune').css({
						'background': '#FAA'
					});
					G_canSubmit = true;
				});
				return false;
			}
		}
		else {
			if (G_canSubmit && jQuery.trim( jQuery( "#comune_cap_ref" ).val() ) == '') {
				G_canSubmit = false;
				
				var termine = (''+jQuery('#clienti_cap').val()).toLowerCase();

				jQuery.getJSON( "/hr_adm/ajax/get_cap_comuni.php", {"term":termine}, function( data, status, xhr ) {
					//alert('255:'+data);
					
					var srch = (''+jQuery('#clienti_cap').val()).toLowerCase();
					
					var jsonArr = data;
					for(var i=0; i<jsonArr.length; i++) {
						if ( (''+jsonArr[i].label).toLowerCase() == srch ) {
							jQuery( "#comune_cap_ref" ).val( jsonArr[i].value );
							jQuery( "#comune_pag_form" ).trigger('submit');
							return;
						}
					}
					jQuery('#clienti_cap').css({
						'background': '#FAA'
					});
					G_canSubmit = true;
				});
				return false;
			}
		}
	});
	
	

	/* FIX PER IE POSIZIONAMENTO TENDINA AUTOCOMPLETE */
	if (jQuery.browser.msie && (jQuery.browser.version == '6.0' || jQuery.browser.version == '7.0' || document.documentMode == '7')) {
		setTimeout(function(){
			jQuery('#autocomp').css({
						'margin-top':	'54px',
						'margin-left':	'40px'
					   });
		},17);		
		G_autocompInterval = null;
		G_autocompInterval = setInterval(function(){
			var ac = jQuery('#autocomp');
			if (ac.length < 1) {
				clearInterval(G_autocompInterval);
				return;
			}
			if (ac.css('display')=='block') {
				ac.css({
						'margin-top':	'54px',
						'margin-left':	'40px'
					   });
			}
		},200);
	}

	jQuery('#js_tuc_clienti_utente,#js_tuc_clienti_comune').css({
		'font-size':	'0.8em'
	});
	
	/*
	if (jQuery.browser.msie) {
		jQuery('select').css({'visibility':'hidden'});
	}
	*/
}
