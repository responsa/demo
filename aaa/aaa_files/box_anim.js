/* ---------------------------------------------------------------------------------- */
G_rifiutologowait4autoleveler = null;
G_rifiutologowait4autoleveler = setInterval(function(){
	if (jQuery('body').hasClass('jq_autoleveler')) {
		clearInterval(G_rifiutologowait4autoleveler);
		jQuery('.box_anim_layout').each(function(){
			var box = jQuery(this);
			var wid = box.width();
			var hei = box.height();
			box.find('.box_anim_maincont,.box_anim_front,.box_anim_rear').css({
					'width':		wid,
					'height':	hei
				});
				
			odBoxAnim = {
				open_event: 'click',
				close_event: 'click',
				rearInit: {
									'top':			hei,
									'visibility':	'visible'
								},
				frontClose: {
									'top':			-jQuery('.box_anim_layout').height()
								},
				rearOpen: {
									'top':			0
								},
				frontOpen: {
									'top':			0
								},
				rearClose: {
									'top':			jQuery('.box_anim_layout').height()
								},
				f: {
					open:		function(self) {
									self.closest('.box_anim_layout').find('.box_anim_front').animate(odBoxAnim.frontClose);
									self.closest('.box_anim_layout').find('.box_anim_rear').animate(odBoxAnim.rearOpen);
								},
					close:	function(self) {
									//alert(jQuery('.box_anim_layout').width());
									self.closest('.box_anim_layout').find('.box_anim_front').animate(odBoxAnim.frontOpen);
									self.closest('.box_anim_layout').find('.box_anim_rear').animate(odBoxAnim.rearClose);
								}
				}
			}
			if (box.hasClass('box_anim_open_event_over')) {
				odBoxAnim.open_event = 'mouseover';
			}
			if (box.hasClass('box_anim_close_event_over')) {
				odBoxAnim.close_event = 'mouseover';
			}
			if (box.hasClass('box_anim_r2l')) {
				odBoxAnim.rearInit = {
												'left':			wid,
												'visibility':	'visible'
											};
				odBoxAnim.frontClose = {
												'left':			-jQuery('.box_anim_layout').width()
											};
				odBoxAnim.rearOpen = {
												'left':			0
											};
				odBoxAnim.frontOpen = {
												'left':			0
											};
				odBoxAnim.rearClose = {
												'left':			jQuery('.box_anim_layout').width()
											}
			}
			box.find('.box_anim_rear').css(odBoxAnim.rearInit);

			jQuery(this).on(odBoxAnim.open_event, '.box_anim_open', function(){
				odBoxAnim.f.open( jQuery(this) );
			});
			jQuery(this).on(odBoxAnim.close_event, '.box_anim_close', function(){
				odBoxAnim.f.close( jQuery(this) );
			});
			
			setTimeout(function(){
				/*G_rifiutologowait4autoleveler2 = null;
				G_rifiutologowait4autoleveler2 = setInterval(function(){
					if (jQuery('body').hasClass('jq_autoleveler')) {
						clearInterval(G_rifiutologowait4autoleveler2);*/
						G_boxrif_resize = null;
						jQuery(window).resize(function(){
							clearTimeout(G_boxrif_resize);
							G_boxrif_resize = setTimeout(function(){
								//document.title = '.'+document.title;
								jQuery('.box_anim_layout').each(function(){
									var box = jQuery(this);
									var wid = box.width();
									var hei = box.height();
									box.find('.box_anim_maincont,.box_anim_front,.box_anim_rear').css({
										'width':		wid,
										'height':	hei
									});
									
									var param = 'top';
									var value = hei;
									if (box.hasClass('box_anim_r2l')) {
										param = 'left';
										value = wid;
									}
									try{
										if (box.find('.box_anim_front').css(param).replace('px','')-0 == 0) {
											//alert('frontopen');
											box.find('.box_anim_rear').css(param, value);
										}
										else {
											//alert('rearopen');
											box.find('.box_anim_front').css(param, -value);
										}
									}
									catch(e) {/* avoid me */}
									odBoxAnim.frontClose[param] = -value;
									odBoxAnim.rearOpen[param] = 0;
									odBoxAnim.frontOpen[param] = 0;
									odBoxAnim.rearClose[param] = value;
								});
							}, 500);
						});
					/*}
				});*/
			}, 1500);
		});
	}
}, 500);

/* ---------------------------------------------------------------------------------- */