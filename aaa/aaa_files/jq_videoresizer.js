jQuery.noConflict();
jQuery(function(){
	// sistemazione automatica primo video pagina
	G_videoResizer = null;
	G_videoResizer = setInterval(function(){
		jQuery('div.contenitore2 div.box_video_dx:eq(0)').each(function(imgIdx){
			var obj = jQuery(this).find('object:eq(0)');
			if (obj.length <= 0) {
				return;
			}
			clearInterval(G_videoResizer);
			
			var objWid = obj.attr('width');
			var objHei = obj.attr('height');
			var objAr = objHei / objWid;
			var cont = jQuery('div.contenitore:eq(0)');
			var contWid = cont.width() - 20;
			var objHei_new = Math.round( contWid * objAr );
			obj.attr('width', contWid);
			obj.attr('height', objHei_new);
			var divTit = jQuery('#riga_content_standard .nome_sezione');
			var divTit_color = divTit.css('color');
			var div = obj.closest('.set_cornice_blu');
			div.css({
				'width':		contWid,
				'height':	objHei_new,
				'border':	'4px solid '+divTit_color
			});
			jQuery('.jq_overlay_back,.jq_overlay_front,.box_video_dx').css({
				'width':				div.width() -2
			});
			
			jQuery(window).resize(function(){
				jQuery('div.contenitore2 div.box_video_dx:eq(0)').each(function(imgIdx){
					var obj = jQuery(this).find('object:eq(0)');
					var objWid = obj.attr('width');
					var objHei = obj.attr('height');
					var objAr = objHei / objWid;
					var cont = jQuery('div.contenitore:eq(0)');
					var contWid = cont.width() - 20;
					var objHei_new = Math.round( contWid * objAr );
					obj.attr('width', contWid);
					obj.attr('height', objHei_new);
					var divTit = jQuery('#riga_content_standard .nome_sezione');
					var divTit_color = divTit.css('color');
					var div = obj.closest('.set_cornice_blu');
					div.css({
						'width':		contWid,
						'height':	objHei_new,
						'border':	'4px solid '+divTit_color
					});
					jQuery('.jq_overlay_back,.jq_overlay_front,.box_video_dx').css({
						'width':				div.width() -2
					});
				});
			});
		});
	}, 250);
});