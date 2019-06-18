/* 
Javascript file for Edidomus Quattroruote Pro website
version 1.0 modified on April 30, 2014

C2014 Arachno Web Agency - www.arachnowebagency.it 
*/

// Funzione di scroll schermata tabs su mobile
function scrollingTo(target){
	var top = target.offset().top-50;
	if(navigator.userAgent.match(/webkit/i)){ var page = $("body") } else { var page = $("html,body") }
	var time = (top-page.offset().top)*1.4;
	$(page).animate({
		scrollTop: top
		}, time);
	}
// Funzione loading tabs Homepage
function startTabs() {
	var loader = '.ls-loading', tab = $('.tab-content');
	$(loader).fadeOut(300, function(){
		tab.removeClass('loading');
		});
}
// Funzione menu collassabili+
function collapsible(){
	var links = $('.js-dropdown').find('a'), collLink = $('.js-dropdown').children('a:first-child'), coll = $('.js-dropdown').find('ul');
	links.each(function(){
		$(this).removeAttr('onclick');
		if($(this).parent('li').hasClass('selected')){
			$(this).parent('li').find('ul').show();
			}
		})
	if(coll.length == 0 || collLink.length == 0){
		return false;
		}
	else{
		collLink.click(function(e){
			e.preventDefault();
			var target = $(this).next('ul');
			if(target.is(':visible')){
				target.slideUp(500);
				}
			else{
				target.slideDown(500);
				}
			});
		}
	}
// Funzione carousels ingrandimento immagini
function imageFocus(items, active){
	var img = $('.carousel-fullimg'), src = active.find('img').attr('src');
	img.attr('src', src);
	items.click(function(){
		var src = $(this).find('img').attr('src');
		items.removeClass('active');
		$(this).addClass('active');
		img.fadeOut(800, function(){
			img.attr('src', src);
			img.fadeIn(800);
			});
		});
	}	

// Funzione partenza carousels
function startCarousels(carousels){
	var i = 0, l = carousels.length;
	carousels.each(function(){
		var  prev = $(this).attr('data-prev'), next = $(this).attr('data-next'), type = $(this).attr('data-type'), pagination = $(this).attr('data-pagination'), counter = $(this).attr('data-counter'), carousel = $(this).attr('data-carousel');
		i++
		if(type == 'type1'){
			$(this).carouFredSel({
				items               : {
					visible         : 1,
					width           : 180
					},
				swipe               : {
					onTouch         : true
					},
				direction           : 'left',
				auto                : false,
				scroll : {
					items           : 1,
					duration        : 3000
				},
				prev   : {
					button          : $(prev)
					},
				next   : {
					button          : $(next)
					}              
			});
		}
		else if(type == 'type2'){
			$(this).carouFredSel({
				items               : {
					visible         : 1,
					width           : 140
					},
				swipe               : {
					onTouch         : true
					},
				direction           : 'left',
				auto                : false,
				scroll : {
					items           : 1,
					duration        : 3000
				},
				prev   : {
					button          : $(prev)
					},
				next   : {
					button          : $(next)
					}
			});
			imageFocus($(this).find('li'), $(this).find('.active'));
		}
		if(i == l){
			startTabs();
			}
	});
}
// Funzione espansione dettagli prodotto
function productExpand(){
	var text = ['Dettagli', 'Chiudi'], links = $('.js-product-link'), textLinks = $('.js-product-link.btn'), details = $('.js-product-details'), closing = $('.js-closedrop');
	links.click(function(e){
		e.preventDefault();
		var l = $(this), el = $($(this).parent('li').find('.js-product-details')), t = l.position().top, h = l.height(), top = t + h;
		if(el.hasClass('active') || l.hasClass('active')){
			l.removeClass('active');
			el.removeClass('active');
			links.removeClass('active');
			textLinks.text(text[0]);
			}
		else{
			details.removeClass('active');
			links.removeClass('active');
			textLinks.text(text[0]);
			el.css('top', top)
			el.addClass('active');
			l.addClass('active');
			if($(this).hasClass('btn')){
				l.text(text[1]);
				}
			}
		});
	closing.click(function(e){
		e.preventDefault();
		$(this).parent('div').parent('.js-product-details').removeClass('active');
		links.removeClass('active');
		textLinks.text(text[0]);
		});
	}
// Funzione creazione elenco mobile alternativo a slider
function altSlider(slider){
	/*if(slider.attr('id') == 'slider-prodotto'){
		var items = slider.find('.ls-layer');
		var alt = $('<ul class="nav nav-listed visible-phone"></ul>'), i = 0, l = items.length;
		items.each(function(){
			var h1 = $(this).find('h1').html(), h2 = $(this).find('h2').html(), h3 = $(this).find('h3').html(), h4 = $(this).find('h4').html(), img = $(this).find('img').attr('alt'), list = $(this).find('ul'), video = $(this).find('iframe').attr('src'), pL = $(this).find('p').length, pI = 1, pStr = '', lL = $(this).find('li').length, lI = 1, lStr = '';
			$(this).find('p').each(function(){
				pStr += $(this).html()+'<br /><br />';
				if(pI == pL){
					if(typeof pStr == 'undefined'){ pStr = ''; }
					}
				pI++
			});
			$(this).find('li').each(function(){
				lStr += '&dot; '+$(this).html()+'<br />';
				if(lI == lL){
					if(typeof lStr == 'undefined'){ lStr = ''; }
					}
				lI++
			});
			if(typeof h1 != 'undefined'){ h1 = '<strong>'+ h1 +'</strong><br />'; } else { h1 = '' }
			if(typeof h2 != 'undefined'){ h2 = '<strong>'+ h2 +'</strong><br />'; } else { h2 = '' }
			if(typeof h3 != 'undefined'){ h3 = '<strong>'+ h3 +'</strong><br />'; } else { h3 = '' }
			if(typeof h4 != 'undefined'){ h4 = '<strong>'+ h4 +'</strong><br />'; } else { h4 = '' }
			if(typeof video != 'undefined'){ video = '<a href="' + video + '" target="_blank">Guarda il video</a>' }else{ video = '' }
			if(typeof img == 'undefined'){ img = '' }
			var child = $('<li><p>' + h1 + h2 + h3 + h4 + pStr + lStr + img + video + '</p></li>');
			alt.append(child);
			if((i + 1) == l){ alt.insertAfter(slider); }
				i++
			});
		}
	else{
		var items = slider.find('a');
		var alt = $('<ul class="nav nav-listed visible-phone"></ul>'), i = 0, l = items.length;
		items.each(function(){
			var el = $(this), target = el.attr('href');
			if(target.indexOf('youtube') > -1){
				var title = el.attr('title')
				if(typeof title == 'undefined'){ title = el.find('img').attr('alt') }
				var video = '<a href="' + target + '" target="_blank">'+title+' - Guarda il video</a>';
				var child = $('<li>' + video + '</li>');
				}
			else {
				var thumb = el.find('img'), title = thumb.attr('alt');
				if(typeof title == 'undefined'){ title = el.attr('title') }
				var text = '<p>' + title + '</p>'
				if(text.length > 7){ var child = $('<li>' + text + '</li>'); } else { var child = ''; }
				}
			alt.append(child);
			if((i + 1) == l){ alt.insertAfter(slider); }
			i++
			});\\\\\\\\\\\\\\\\\
			
		}*/
	}
	
// Aggiornamento dati Ricambi e Tempari XML loading
function getOptions(){
	var selector = $('#periodoTempati');
	if(selector.length < 1){
		return false;
		}
	else{
	url = 'http://93.57.13.204/BDRT/listaModelli.xml';
	console.log("ok")
	$.ajax({
			type: "GET",
			url: url,
			dataType: "xml",
			crossDomain: true,	
			success: function(xml) {
				var myXML = $.parseXML(xml.responseText);
				$(myXML).find('mese').each(function(){
					value = $(this).find('value').text();
					label = $(this).find('label').text();
					$('#periodoTempati').append('<option value="'+value+'">'+label+'</option>');
					showResults();
			
					});
				}
		});
	}
	}
// LOADING XML CONTENT FUNCTION
function loadContent(n, opt){
	$('#bdrt-lista-agg').html('');
	$('#bdrt-mese').text(opt.text());
	url = 'http://93.57.13.204/BDRT/listaModelli.xml';
	$.ajax({
			type: "GET",
			url: url,
			crossDomain: true,	
			dataType: "xml",
			success: function(xml) {
				var myXML = $.parseXML(xml.responseText);
				$(myXML).find('mese').each(function(){
					if($(this).find('value').text()==n){
					$('#bdrt-lista-agg').empty();
					$(this).find('veicolo').each(function(){
						marca = $(this).find('marca').text();
						modello = $(this).find('modello').text();
						$('#bdrt-lista-agg').append('<li><p>'+marca+'</p><p>'+modello+'</p></li>');
					});
				}
			});
		}
	});
}
function showResults(){
	var opt = $('#periodoTempati').children('option:selected');
	var latest = $('#periodoTempati').children('option:selected').attr('value');
	loadContent(latest, opt);
	$('#periodoTempati').change(function(){
		n = $(this).children('option:selected').attr('value');
		loadContent(n, $(this).children('option:selected'));
		});
};

// Funzione FAQ
function collapseFaq(faq){
	faq.each(function(){
		var ans = $(this).children('.js-answer'), que = $(this).children('a').first();
		
		if(que.hasClass('selected')){ ans.show(); }
			else{ ans.hide(); }
		
		que.click(function(e){
			e.preventDefault();
			var quEans = $(this).next('.js-answer');
			
			if($(this).hasClass('selected')){ quEans.slideUp(500); }
				else{ quEans.slideDown(500); }
				
				$(this).toggleClass('selected');
			});
			
		});
	}
	
// Funzione accordion 
function createAccordion(items){
	
	items.addClass('js-faq');
	
	var i = 0, l = items.length;
	
	items.each(function(){
		var current = $(this), href = current.find('a').attr('href');
	  	$.get( href, function(data) {
			var answer = '<div class="js-answer" style="display: none;">' + $(data).find('.answer').html() + '</div>';
			current.append(answer);
			i++
			if(i == l){
				var faq = $('.js-faq');
				collapseFaq(faq);
				}
		  	});
	});
	
	}
	
// Funzione filtro FAQ
function filterFaq(faqFilter){
	
	var href = window.location.href, table = $('.faqresultstable');
	
	if(href.indexOf('/infocar-web2/faq.html') > -1){
		table.removeClass('show');
		}
	else {
		table.addClass('show');
		$('.faq-frame').find('h2').text('Risultati ricerca');
		$('.js-faq').remove();
		
		createAccordion($('.faqresultstablequestion'));
		
		}
	
	faqFilter.click(function(e){
		e.preventDefault();
		
		faqFilter.parent('li').removeClass('selected');
		$(this).parent('li').addClass('selected');
		
		var text = $(this).text();
		
		$.get( $(this).attr('href'), function(data) {
			$('.faq-frame').find('h2').text(text);
			$('.faq-list').empty().append($(data).find('.faq-frame').find('li'));
			
			var faq = $('.js-faq');
			collapseFaq(faq);
		}).fail(function() {
			$('.faq-frame').find('h2').text('');
			$('.faq-list').empty().append('<li>Nessuna FAQ disponibile per questa categoria.</li>')
		});
		
		});
	
	}

// Funzione filtro FAQ
function filterFaq(faqFilter){
	
	var href = window.location.href, table = $('.faqresultstable');
	
	if(href.indexOf('/infocar-web3/faq.html') > -1){
		table.removeClass('show');
		}
	else {
		table.addClass('show');
		$('.faq-frame').find('h2').text('Risultati ricerca');
		$('.js-faq').remove();
		
		createAccordion($('.faqresultstablequestion'));
		
		}
	
	faqFilter.click(function(e){
		e.preventDefault();
		
		faqFilter.parent('li').removeClass('selected');
		$(this).parent('li').addClass('selected');
		
		var text = $(this).text();
		
		$.get( $(this).attr('href'), function(data) {
			$('.faq-frame').find('h2').text(text);
			$('.faq-list').empty().append($(data).find('.faq-frame').find('li'));
			
			var faq = $('.js-faq');
			collapseFaq(faq);
		}).fail(function() {
			$('.faq-frame').find('h2').text('');
			$('.faq-list').empty().append('<li>Nessuna FAQ disponibile per questa categoria.</li>')
		});
		
		});
	
	}
		
// Selezione workflow in base al prodotto
function workflowSelect(products){
	
	products.each(function(){
		
		var workflows = $(this).next('.js-workflow');
		
		var id = $(this).find('option:selected').data('id');
		
		workflows.val(id);
		
		});
		
	products.change(function(){
		
		var workflows = $(this).next('.js-workflow');
		
		var id = $(this).find('option:selected').data('id');
		
		workflows.val(id);
		
		});
	
	}

$(function(){
	var aside = $('.large-aside'), faq = $('.js-faq'), faqFilter = $('.faq-filter').find('a');
	
	if(faq.length > 0){
		collapseFaq(faq);
		}
		
	if(faqFilter.length > 0){
		filterFaq(faqFilter);
		}
		
	if(aside.length > 0 && $(window).width() > 767 && $(window).width() < 979 ){
		var h = aside.height() + 20;
		aside.parent('.relative').css('min-height', h);
		
		$(window).resize(function(){
			if($(window).width() > 767 && $(window).width() < 979 ){
				var h = aside.height() + 20;
				aside.parent('.relative').css('min-height', h);
				}
			});
		
		}
		
		var products = $('.js-product');
		
		if(products.length > 0){
			workflowSelect(products);
			}
		
	});
	$(document).ready(function(){
  $.cookieBar();
}); 