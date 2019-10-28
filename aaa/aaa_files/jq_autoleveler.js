jQuery.noConflict();
jQuery(function(){
	// Allineamento fondo box con altezza "vicina"
/*
	G_wait4layout = null;
	if (jQuery.browser.msie && jQuery.browser.version == 8) {
		jQuery(window).resize(function(){
			autoleveler(6000);
		});
	}
	else {
		autoleveler(1000);
	}
	
	G_wait4autoleveler = null;
	G_wait4autoleveler = setInterval(function(){
		if (jQuery('body.jq_autoleveler').length > 0) {
			clearInterval(G_wait4autoleveler);
			setTimeout(function(){
				autoleveler(10000);
			}, 500);
		}
	},500);
*/
	var waitPolling = 1000;
	if (jQuery.browser.msie && jQuery.browser.version == 8) {
		waitPolling = 3000;
	}

	var cont = jQuery('body div.container:eq(0)');
	G_layoutstatus = null;
	
	G_wait4render = null;
	G_wait4render = setInterval(function(){
		var cont = jQuery('div.container:eq(0)');
		var foot = jQuery('div.footer:eq(0)');
		var last = jQuery('div.row-fluid:last');
		var actualStatus = cont.width() +'#' +cont.height() +'#' +foot.offset().top +'#' +foot.width() +'#' +last.width() +'#' +last.height() +'#' +last.position().top;
		//document.title = '.' +actualStatus;
		if ( G_layoutstatus == actualStatus) {
			clearInterval(G_wait4render);
			
			/**/
			if (jQuery(window).width() <= 768) {
				jQuery('body').addClass('jq_autoleveler');
				return;
			}
			/**/
			
			autoleveler();
		}
		else {
			G_layoutstatus = actualStatus;
		}
	}, waitPolling);
	
	function autoleveler() {//ritardoAvvio) {

		/*clearTimeout(G_wait4layout);
		G_wait4layout = setTimeout(function(){*/
		//document.title = '.'+document.title;
		
		jQuery('body').addClass('jq_autoleveler'); // aggiungo classe CSS al body dopo aver iniziato l'autolevel...
		
		// Calcolo griglia verticale
		G_h_slot = 10;
		G_h_soglia_delta_media1 = 95;
		G_h_soglia_delta_media2 = 60;//65;
		G_h_soglia_delta = 100;//95;
		G_boxMap = {};
		jQuery('#riga_4cols,#riga_3cols_SSB,#riga_3cols_SBS,#riga_3cols_BSS,#riga_2cols_BS,#riga_2cols_SB,#riga_2cols_SB_clienti').each(function(){
			jQuery(this).children('div').each(function(){
				jQuery(this).children('div').each(function(){
					var posTop = Math.round( jQuery(this).position().top /G_h_slot );
					if ( ! G_boxMap[posTop]) {
						G_boxMap[posTop] = [];
					}
					if ( ! jQuery(this).hasClass('jq_no_autolevel') ) {
						G_boxMap[posTop].push(jQuery(this));
					}
				});
			});
		});
		// ciclo i box dello stesso slot (offset dal top)
		for(topIdx in G_boxMap) {
			var boxList = G_boxMap[ topIdx ]; 
			var heiList = [];
			for(var i=0; i<boxList.length; i++) {
				heiList.push( boxList[i].height() -0 );
			}
			if (heiList.length > 0) {
				var sum = 0;
				for(var i=0; i<heiList.length; i++) {
					sum += heiList[i];
				}
				var media = Math.round( sum / heiList.length );
				var sum = 0;
				var cnt = 0;
				for(var i=0; i<heiList.length; i++) {
					if (Math.abs( heiList[i] - media ) < G_h_soglia_delta_media1) { // tolgo dalla media quelli troppo distanti
						sum += heiList[i];
						cnt++;
					}
				}
				var media = Math.round( sum / cnt ); //ricalcolo la media
				var max = 0;
				for(var i=0; i<heiList.length; i++) {
					if (heiList[i] > max && heiList[i] < (media + G_h_soglia_delta_media2) ) { // calcolo del massimo "medio"
						max = heiList[i];
					}
				}
				for(var i=0; i<boxList.length; i++) {
					var hei = boxList[i].height();
					/*
					boxList[i].css({'border':'1px dotted black'});
					boxList[i].prepend(
									'<div style="background:navy;color:yellow;">'
									+boxList[i].find('.box_lista_allegati').length +' # '
									+media + ' # '
									+hei +' < '+ max +' && '+(max - hei)+' < '+G_h_soglia_delta
									+'</div>'
								);
					*/
					if (hei < max && (max - hei) < G_h_soglia_delta) { // ridimensiono solo i box sotto soglia
						var lastBox = boxList[i].find('.box_lista_allegati');	
						if (lastBox.length == 1) {
							var prevMargTop = lastBox.css('margin-top').replace('px','') -0;
							//lastBox.data('jq_autolev_margintop', lastBox.css('margin-top'));
							lastBox.css({
								'margin-top':	prevMargTop + max - hei
								/*,'border':	'1px dotted red'*/
							});
							lastBox.addClass('jq_autoleveler_processed jq_autoleveler_processed_margintop');
						}
						else if ( boxList[i].hasClass('sfondo_sottotitolo') ) {
							var resizBox = boxList[i].find('div.titolo_e_sottotitolo:eq(0)');
							var prevPadBot = resizBox.css('padding-bottom').replace('px','') -0;
							//resizBox.data('jq_autolev_paddingbottom', lastBox.css('padding-bottom'));
							resizBox.css({
								'padding-bottom':	prevPadBot + max - hei
								/*,'border':	'1px dotted blue'*/
							});
							resizBox.addClass('jq_autoleveler_processed jq_autoleveler_processed_paddingbottom');
						}
						else if ( boxList[i].hasClass('jq_autoleveler_height') ) {
							var localMaxHei = boxList[i].height();
							for(var y=0; y<boxList.length; y++) {
								if (y != i) {
									if (localMaxHei < boxList[y].height()) {
										localMaxHei = boxList[y].height();
									}
								}
							}
							//boxList[i].data('jq_autolev_height', lastBox.css('height'));
							boxList[i].css({
								'height':	localMaxHei
								/*,'border':	'1px dashed orange'*/
							});
							boxList[i].addClass('jq_autoleveler_processed jq_autoleveler_processed_height');
						}
					}
				}
			}
		}
	//}, ritardoAvvio);
	
}

	
	
	G_autolev_resiz = null;
	jQuery(window).resize(function() {
		clearTimeout(G_autolev_resiz);
		G_autolev_resiz = setTimeout(function(){
			
			jQuery('.jq_autoleveler_processed').each(function(){
				if (jQuery(this).hasClass('jq_autoleveler_processed_margintop')) {
					jQuery(this).css({
						'margin-top':	''//jQuery(this).data('jq_autolev_margintop')
					});
				}
				else if (jQuery(this).hasClass('jq_autoleveler_processed_paddingbottom')) {
					jQuery(this).css({
						'padding-bottom':	''//jQuery(this).data('jq_autolev_paddingbottom')
					});
				}
				else if (jQuery(this).hasClass('jq_autoleveler_processed_height')) {
					jQuery(this).css({
						'height':	''//jQuery(this).data('jq_autolev_height')
					});
				}
			});
			jQuery('.jq_autoleveler_processed')
				.removeClass('jq_autoleveler_processed jq_autoleveler_processed_margintop jq_autoleveler_processed_paddingbottom jq_autoleveler_processed_height')
			
			setTimeout(function(){
				autoleveler();
			}, 500);
		}, 1000);
	});

});