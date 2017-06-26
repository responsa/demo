/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_587a8021b07c47b7afdbbbf042464373(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_587a8021b07c47b7afdbbbf042464373.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fItem_Slider_Easy_hp_restyling.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Titolo':['Title'], 'slider':['WebsliderOWSBOOL'], 'Descrizione':['SlidershortpromodescriptionOWSTEXT'], 'Image':['PublishingImage', 'PictureURL', 'PictureThumbnailURL'], 'Price':['PriceOWSHTML'], 'Slider background image':['SliderbackgroundimageOWSIMGE'], 'Slider left panel':['SliderLeftPanelOWSHTML'], 'Preventivatore':['EASliderCheckPreventivatoreOWSBOOL', 'FormPreventivatoreVisibileOWSBOOL'], 'Contenuto Form':['EASliderHtmlPreventivatoreOWSHTML', 'HtmlformpreventivatoreOWSHTML'], 'Flusso':['EAFlussoCommerceSourceOWSCHCS'], 'TrkCode':['EAFlussoCommerceTrkCodeOWSTEXT'], 'ContentType Product':['ContentType'], 'defaultSlider':['SliderfirstopenelementOWSNMBR'], 'Primo Intervallo':['SliderfirstintervalOWSNMBR'], 'Intervallo':['SliderintervalOWSNMBR'], 'Ordine  di scorrimento auto':['SliderOrderViewAutoOWSNMBR'], 'Ordine  di scorrimento viaggi':['SliderOrderViewViaggiOWSNMBR'], 'Ordine  di scorrimento casa e famiglia':['SliderOrderViewCasaefamigliaOWSNMBR'], 'Ordine  di scorrimento salute':['SliderOrderViewSaluteOWSNMBR'], 'Ordine  di scorrimento easy':['SliderOrderViewEasyOWSNMBR'], 'ProductItemCategory':['owstaxIdProductCatalogItemCategory'], 'EstimateLinkMenu':['EstimatelinkwebmenuOWSURLH'], 'LinkTuttiServiziSodlinksOWSURLH':null, 'LinkPoliciesPolicieslinksOWSURLH':null, 'SliderContentPanel':['SliderContentPanelOWSHTML']};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {
    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
};

ms_outHtml.push('',''
);
        var encodedId = $htmlEncode(ctx.ClientControl.get_nextUniqueId() + "_SliderHp_");
          var contentType = $getItemValue(ctx, "ContentType Product");

        var ItemCategory = $getItemValue(ctx, "ProductItemCategory");
            ItemCategory = ItemCategory.inputValue.toLowerCase();

        var Term="";
        if(ItemCategory.indexOf('flexi') !== -1)
            ctx.ID_TERMS[0] = ItemCategory.substring(5,ItemCategory.indexOf(';'));
        else if(ItemCategory.indexOf('easy') !== -1)
            ctx.ID_TERMS[1] = ItemCategory.substring(5,ItemCategory.indexOf(';'));       

        if(ctx.ID_TERMS[0]!= "" && ItemCategory.indexOf(ctx.ID_TERMS[0]) !== -1)
            Term = 'flexy';
        else if(ctx.ID_TERMS[1]!= "" && ItemCategory.indexOf(ctx.ID_TERMS[1]) !== -1)
            Term = 'easy';
        
        if ((!contentType.isNull) && (contentType.value.indexOf(ctx.CT_PRODUCT_FAMILY) !== -1))
	{
	    var interval = $getItemValue(ctx, "Intervallo");
	    if(!interval.isNull) interval = interval.value; else interval = 0;
	
	    var first_interval = $getItemValue(ctx, "Primo Intervallo");
	    if(!first_interval.isNull) first_interval = first_interval.value; else first_interval = 0;
	
	    var defaultSlider = $getItemValue(ctx, "defaultSlider");
	    if(!defaultSlider.isNull)ctx['FIRST_AREA_TO_SHOW'] = defaultSlider.value; else ctx['FIRST_AREA_TO_SHOW'] = 1;      
		
        var vOrderEasy = $getItemValue(ctx, "Ordine  di scorrimento easy");
		  if(vOrderEasy.isNull)vOrderEasy=0; else vOrderEasy=vOrderEasy.value-1;

       var vOrderFlexy = $getItemValue(ctx, "Ordine  di scorrimento Auto");
		  if(vOrderFlexy.isNull)vOrderFlexy=0; else vOrderFlexy=vOrderFlexy.value-1;
        	
  		ctx['INTERVAL'] = interval;
  		ctx['FIRST_INTERVAL'] = first_interval;
          ctx.SLIDER_VIEW_ORDER[vOrderFlexy] = 0;
          ctx.SLIDER_VIEW_ORDER[vOrderEasy] = 1;
  	}
      else if (!contentType.isNull && contentType.value.indexOf(ctx.CT_PRODUCT_CATEGORY) !== -1)
          {
            var pictureMarkup = EA.Web.getParsedImage(ctx, $getItemValue(ctx, "Slider background image"), 980, 374, encodedId, "", true);
            var contentPanel = $getItemValue(ctx, "SliderContentPanel");
            var sliderLeftPanel = $getItemValue(ctx, "Slider left panel");

            if(!sliderLeftPanel.isNull)
                leftPanel = sliderLeftPanel.value;
            else
                leftPanel = "";

            switch(Term)
              {
                case 'flexy':
                        ctx['Flexy_BackgroundImage'] = '<div class="evidence-background">'+pictureMarkup+'</div>';
                        ctx['Flexy_LeftPanel'] = leftPanel;
                        ctx['Flexy_ContentPanel'] = contentPanel;
                        break;

                case 'easy':
                        ctx['Easy_BackgroundImage'] = '<div class="evidence-background">'+pictureMarkup+'</div>';
                        ctx['Easy_LeftPanel'] = leftPanel;
                        ctx['Easy_ContentPanel'] = contentPanel;
                        break;
                
                default:
                    break;
            }
        }

        ms_outHtml.push(''
,'    '
);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_587a8021b07c47b7afdbbbf042464373() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Item_Slider_hp", DisplayTemplate_587a8021b07c47b7afdbbbf042464373);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fItem_Slider_Easy_hp_restyling.js", DisplayTemplate_587a8021b07c47b7afdbbbf042464373);
}
//
        $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fItem_Slider_Easy_hp_restyling.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/CustomStrings.js");
    //
}
RegisterTemplate_587a8021b07c47b7afdbbbf042464373();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fItem_Slider_Easy_hp_restyling.js"), RegisterTemplate_587a8021b07c47b7afdbbbf042464373);
}