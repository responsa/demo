/*
	Genera automaticamente il menu laterale per la navigazione interna delle pagine
	le ancore sono create a partire da elementi che hanno css classe 'op__section'
	Ogni .op__section deve avere un 'id' per consentire il funzionamento delle ancore
	e un attributo 'data-title' che sarà il nome mostrato nel menù.

	Gestisce la visualizzazione delle immagini parallax presenti nelle sezioni.

	Aggiunge i tooltip per la sezione 'Importi non distribuibili'.
*/
var sectionNav = (function() {
	'use strict';

	var $sectionNav;
	var watchers = [];
	var PARALLAX_LENGTH = 0;
	var PARALLAX_SELECTOR = {};
	var ITEM_TEMPLATE = jQuery('.op__section-nav-item-template').text();
	var ITEM_TOOLTIP_TEMPLATE =
		'<li class="op__section-nav-item" data-id="{id}" id="{id}-li-item">' +
			'<a href="#{id}" data-toggle="tooltip" data-placement="right"' +
					'id=impo_non_distr_item_element title="">' +
				'<span>Importi Non Distribuibili</span>' +
			'</a>' +
		'</li>';

	function _menuTemplate( model ){
		return (model.id === "imp_non_dist_serv") ?
			Tlite.find(ITEM_TOOLTIP_TEMPLATE, model) :
			Tlite.find(ITEM_TEMPLATE, model);
	}

	function createMenu(){
		var $sections = $('.op__section'),
			html = '';
		$sections.each(function(){
			var $this = $(this);
			html += _menuTemplate({
				title: $this.attr('data-title'),
				id: $this.attr('id')
			}) ;
		});
		$('.op__section-nav-wrapper').html(html);
	}

	function checkSticky( watcher ){
		if( watcher.isAboveViewport ){
			$sectionNav.addClass('is-fixed').removeClass('is-vertical');
		} else {
			$sectionNav.removeClass('is-fixed').addClass('is-vertical');
		}
	}

	function makeSticky(){
		var watcher = scrollMonitor.create( $('[data-sticky-anchor]') );
		checkSticky( watcher );
		watcher.lock();
		watcher.stateChange(function(){
			checkSticky( watcher );
		});
	}

	function centerInViewport(){
		$sectionNav.css('margin-top', - $sectionNav.height() / 2 );
	}

	function getParallaxMirrorElement(id) {
		return $(PARALLAX_SELECTOR[id]);
	}

	function setSectionVisibility(id, isActive) {
		$("#" + id)[isActive ? 'show' : 'hide']();
		$("li[data-id~='"+id+"']")[isActive ? 'addClass' : 'removeClass']("is-active" );
		getParallaxMirrorElement(id)[isActive ? 'show' : 'hide']();
	}

	function showLogin() {
		if($('#editNameLabel').is(':hidden')) {
			setSectionVisibility("sezione__0", true);
			setSectionVisibility("sezione__0_reg", false);
			setSectionVisibility("sezione__0_recover", false);
			$("#sol-login-region").show();
			$("#sezione__0 #errorMessage").remove();
			$(".alert").remove();
			$("#errorMessageInt").remove('');
		}
	}

	function showRegistration() {
		setSectionVisibility("sezione__0", false);
		setSectionVisibility("sezione__0_reg", true);
		setSectionVisibility("sezione__0_recover", false);
		$("#sezione__0 #errorMessage").remove();
		$("#sezione__0_recover #errorMessage").remove('');
		$("#sezione__0_reg #errorMessage").html('');
	}

	function showPasswordRecover() {
		setSectionVisibility("sezione__0", false);
		setSectionVisibility("sezione__0_reg", false);
		setSectionVisibility("sezione__0_recover", true);
		$(".alert").remove();
		$("#sezione__0 #errorMessage").remove('');
		$("#sezione__0_reg #errorMessage").remove('');
		$("#sezione__0_recover 	#errorMessage").html('');
	}

	function getVisibleSectionId($item) {
		var id = $item.attr('id');
		// If we are at the top of the page then the watcher start for sezione__0 element but, if the user
		// before clicked for sezione__0_reg or sezione__0_recover then the we have to activate the clicked
		// element that it is no longer sezione__0.
		if (id == 'sezione__0' && $('#sezione__0').is(":hidden")) {
			id = $("#sezione__0_reg").is(":visible") ? 'sezione__0_reg' : 'sezione__0_recover';
		}
		return id;
	}

	function setActiveItem(element) {
		var $item = element.watcher !== undefined ? $(element.watcher.watchItem) : element.$item;
		if ($item.is('.is-active')) {	return false;	}
		
		$('.op__section-nav-item').removeClass('is-active');
		
		var id = getVisibleSectionId($item)
		$sectionNav.find('[data-id="'+ id +'"]').addClass('is-active');

		jQuery("#sezione__0_recover button[id^='edit-back-registration']").click(showLogin);
	}

	function sectionWatchers(){
		var $sections = $('.op__section');
		$sections.each(function(){
			var $this = $(this);
			var watcher = scrollMonitor.create( $this, -scrollMonitor.viewportHeight/2  );
			watchers.push( watcher );
			watcher.visibilityChange(function(){
				if( watcher.isInViewport ){
					setActiveItem({ watcher: watcher });
				}
			});
		});
	}

	function bindUI(){
		sectionWatchers();
		$('.op__section-nav-item a').each(function() {
			var $this = $(this);
			$this.on('click', function(){
				$.scrollTo( $( $this.attr('href') ), {
					duration: 400,
					offset: { top: -100 }
				});
				return false;
			});
		});
	}

	function setFirstActiveItem() {
		var highestIndex = 0;
		$.each(watchers , function(index, watcher) {
			if( watcher.isInViewport && index > highestIndex ){
				highestIndex = index;
			}
		});
		setActiveItem( { watcher: watchers[ highestIndex ] } );
	}

	function setNewLoginDestination() {
		var oldDestination = jQuery('#user-login-form').attr('action');
		var newDestination = oldDestination
			.replace('destination=servizi-online', 'destination=sol_non_identificato');
		jQuery('#user-login-form').attr('action', newDestination);
	}

	function scrollToTopCallback(e) {
		e.preventDefault();
		setNewLoginDestination();
		jQuery('html, body').scrollTop(0);
	}

	function manageImportiNonDistribuibiliItems() {
		// bind click and activate tooltip (that writes the "data-original-title attr")
		var button = $('#impo_non_distr_a_element').tooltip()
		if (!Drupal.settings.userIsLogged) { button.click(scrollToTopCallback); }
		// get the "data-original-title" text
		var impNonDistrText = $('#impo_non_distr_a_element').attr('data-original-title');
		// set the title and activate the tooltip
		$('#impo_non_distr_item_element').attr('title', impNonDistrText).tooltip();
	}

	function setBackgroundImages() {
		$('#sezione__0_reg img').attr('src', siaePath +
			'/sites/all/modules/custom/features/siae_advpages/img/idea.jpg');
		$('#sezione__0_recover img').attr('src', siaePath +
			'/sites/all/modules/custom/features/siae_advpages/img/licenses-support.jpg');
		$('#imp_non_dist_serv img').attr('src', siaePath +
			'/sites/default/files/images/siae-advpages/author-right/06_Servizi_Online.jpg');
		$('#licenses-support img').attr('src', siaePath +
			'/sites/all/modules/custom/features/siae_advpages/img/licenses-support.jpg');
		$('#archive img').attr('src', siaePath +
			'/sites/all/modules/custom/features/siae_advpages/img/archive.jpg');
	}

	function bindButtonsClick() {
		$('[data-id="sezione__0"] a').bind('click', showLogin);
		$('[data-id="sezione__0_reg"] a').bind('click', showRegistration);
		$('[data-id="sezione__0_recover"] a').bind('click', showPasswordRecover);
	}

	function initParallaxData() {
		PARALLAX_LENGTH = $('.parallax-mirror').length;
		PARALLAX_SELECTOR = {
			sezione__0: '.parallax-mirror:nth-child(' + PARALLAX_LENGTH + ')',
			sezione__0_reg: '.parallax-mirror:nth-child(' + (PARALLAX_LENGTH-1) + ')',
			sezione__0_recover: '.parallax-mirror:nth-child(' + (PARALLAX_LENGTH-2) + ')'
		}
	}

	function init() {
		$sectionNav = $('.op__section-nav');
		createMenu();
		if(!Modernizr.csstransforms3d) { centerInViewport(); }
		makeSticky();
		bindUI();
		setFirstActiveItem();
		manageImportiNonDistribuibiliItems();
		setBackgroundImages();
		bindButtonsClick();
		initParallaxData();
		setSectionVisibility("sezione__0_reg", false);
		setSectionVisibility("sezione__0_recover", false);
	}

	return {
		init: init,
		showLogin: showLogin,
		showRegistration: showRegistration,
		showPasswordRecover: showPasswordRecover
	};
}());