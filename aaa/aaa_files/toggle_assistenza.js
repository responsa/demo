jQuery.noConflict();
var altezza_box_clienti;
jQuery(document).ready(function() {

	altezza_box_clienti = 280;

	setTimeout(function() {
		if (jQuery('.container').width()==940)
		{
			altezza_box_clienti=243;
		}
		if (!jQuery('body').hasClass('IE8') && !jQuery('body').hasClass('IE9'))
		{
			altezza_box_clienti = parseInt(jQuery('.riga_assistenza_clienti_casa').height());
		}
	},1000);

	if (jQuery('body').hasClass('cls-clienti-aperto') || jQuery('body').hasClass('cls-business'))
	{
		jQuery('.riga_assistenza_clienti_casa').addClass('hide');
	}

//	RESPONSIVE
	if (jQuery(window).width()<=768)
	{
		jQuery('.riga_assistenza_clienti_casa').addClass('hide');
	}

//	apri/chiudi riga assistenza
//	jQuery('.area_assistenza').live('click',function(e){
	jQuery('body').on('click', 'div.area_assistenza', function(e) {
		e.preventDefault();
		if (jQuery('.riga_assistenza_clienti_casa').hasClass('hide'))
		{
			questo = jQuery('.riga_assistenza_clienti_casa');
			questo.css('height','0px');
			questo.removeClass('hide');
			
			if (jQuery(window).scrollTop()>0)
			{
				jQuery('html, body').animate({scrollTop:0},500,'easeInOutQuad',function() {
					questo.animate({height:altezza_box_clienti},600,'easeInOutQuad');
				});
			}
			else
			{
				questo.animate({height:altezza_box_clienti},600,'easeInOutQuad'); 
			}
		}
		else
		{
			questo = jQuery('.riga_assistenza_clienti_casa');
			altezza_box_clienti = parseInt(questo.height());
			questo.animate({height:0},600,'easeInOutQuad',function() {
				jQuery('.riga_assistenza_clienti_casa').addClass('hide');
			});
		}
	});

//	controllo altezza box clienti ogni volta che si ridimensiona la pagina
	jQuery( window ).resize(function() {
		if (!jQuery('body').hasClass('IE8') && !jQuery('body').hasClass('IE9'))
		{
			jQuery('.riga_assistenza_clienti_casa').addClass('hide');
			jQuery('.riga_assistenza_clienti_casa').removeAttr('style');
			if (!jQuery('body').hasClass('IE8') && !jQuery('body').hasClass('IE9'))
			{
				altezza_box_clienti = parseInt(jQuery('.riga_assistenza_clienti_casa').height());
			}
			jQuery('.riga_assistenza_clienti_casa').css('height','0');
		}
	});

//	append click sui tabs
	defaultHeight = jQuery('.riga_assistenza_clienti_casa').height();
	jQuery('.boxGiallo .nav-tabs a').each(function(i) {
		var thisClick = jQuery(this);
		thisClick.click(function(e) {
			var thisItem = jQuery(this);
			if ( thisItem.parents('.boxGiallo').find('.tab-pane:eq('+i+') .apritotale').hasClass('aperto') )
			{
				thisItem.parents('.boxGiallo').height('auto');
				thisItem.parents('.riga_assistenza_clienti_casa').height('auto');
			}
			else
			{
				thisItem.parents('.boxGiallo').removeAttr('style');
				thisItem.parents('.riga_assistenza_clienti_casa').removeAttr('style');
			}
		});
	});

//	gestione apertura leggi tutto in box gialli in barra assistenza
	jQuery('.apritotale').each(function(i) {
		var thisClick = jQuery(this);
		thisClick.click(function(e) {
			e.preventDefault();
			try
			{
				jQuery('.apritotale').each(function(j) {
					if ( j != i )
					{
						closeBox(jQuery(this),0);
					}
				});
				if (jQuery(this).hasClass('aperto'))
				{
					closeBox(jQuery(this),0);
				}
				else
				{
					closeBox(jQuery(this),1);
				}
			}
			catch(e)
			{
				alert(e.message)
			}
			return false;
		});
	});
});

function closeBox(obj,openBox)
{
	if ( openBox == 0 )
	{
		obj.parents('.link').siblings('.description').show();
		obj.parents('.link').siblings('.totale').hide();
		obj.parents('.boxGiallo').removeAttr('style');
		obj.parents('.riga_assistenza_clienti_casa').removeAttr('style');
		obj.removeClass('aperto');
		obj.html('Leggi tutto');
	}
	else
	{
		obj.parents('.link').siblings('.description').hide();
		obj.parents('.link').siblings('.totale').show();
		height_box = obj.parents('.boxGiallo').height();
		obj.parents('.boxGiallo').height('auto');
		obj.parents('.riga_assistenza_clienti_casa').height('auto');
		if ( obj.parents('.boxGiallo').height() <= height_box )
		{
			obj.parents('.boxGiallo').removeAttr('style');
			obj.parents('.riga_assistenza_clienti_casa').removeAttr('style');
		}
		obj.addClass('aperto');
		obj.html('Chiudi');
	}
}