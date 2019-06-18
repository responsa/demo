/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_1b3b895c39b547c5aaea4743286938fe(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_1b3b895c39b547c5aaea4743286938fe.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fItem_Slider_Services_hp_restyling.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Path':['Path'], 'Titolo':['Title'], 'slider':['WebsliderOWSBOOL'], 'Descrizione':['SlidershortpromodescriptionOWSTEXT'], 'Image':['PublishingImage', 'PictureURL', 'PictureThumbnailURL'], 'Price':['PriceOWSHTML'], 'Slider background image':['SliderbackgroundimageOWSIMGE'], 'Sliderleftpanel':['SliderLeftPanelOWSHTML'], 'Preventivatore':['EASliderCheckPreventivatoreOWSBOOL', 'FormPreventivatoreVisibileOWSBOOL'], 'Contenuto Form':['EASliderHtmlPreventivatoreOWSHTML', 'HtmlformpreventivatoreOWSHTML'], 'Flusso':['EAFlussoCommerceSourceOWSCHCS'], 'TrkCode':['EAFlussoCommerceTrkCodeOWSTEXT'], 'ContentType Product':['ContentType'], 'defaultSlider':['SliderfirstopenelementOWSNMBR'], 'AreaSelected':['EASliderSelectedAreaClickOWSNMBR'], 'Primo Intervallo':['SliderfirstintervalOWSNMBR'], 'Intervallo':['SliderintervalOWSNMBR'], 'Ordine  di scorrimento auto':['SliderOrderViewAutoOWSNMBR'], 'Ordine  di scorrimento viaggi':['SliderOrderViewViaggiOWSNMBR'], 'Ordine  di scorrimento casa e famiglia':['SliderOrderViewCasaefamigliaOWSNMBR'], 'Ordine  di scorrimento salute':['SliderOrderViewSaluteOWSNMBR'], 'Ordine  di scorrimento easy':['SliderOrderViewEasyOWSNMBR'], 'ProductItemCategory':['owstaxIdProductCatalogItemCategory'], 'EstimateLinkMenu':['EstimatelinkwebmenuOWSURLH'], 'LinkTuttiServiziSodlinksOWSURLH':null, 'LinkPoliciesPolicieslinksOWSURLH':null, 'SliderContentPanel':['SliderContentPanelOWSHTML']};
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

        if(ItemCategory.indexOf('auto') !== -1) ctx.ID_TERMS[0] = ItemCategory.substring(5,ItemCategory.indexOf(';'));
        else if(ItemCategory.indexOf('casa e famiglia') !== -1) ctx.ID_TERMS[1] = ItemCategory.substring(5,ItemCategory.indexOf(';'));
        else if(ItemCategory.indexOf('salute') !== -1) ctx.ID_TERMS[2] = ItemCategory.substring(5,ItemCategory.indexOf(';'));

        if(ctx.ID_TERMS[0]!= "" && ItemCategory.indexOf(ctx.ID_TERMS[0]) !== -1) Term = 'auto';
        else if(ctx.ID_TERMS[1]!= "" && ItemCategory.indexOf(ctx.ID_TERMS[1]) !== -1) Term = 'casa-e-famiglia';
        else if(ctx.ID_TERMS[2]!= "" && ItemCategory.indexOf(ctx.ID_TERMS[2]) !== -1) Term = 'salute';

        if ((!contentType.isNull) && (contentType.value.indexOf(ctx.CT_PRODUCT_FAMILY) !== -1))
        {
		  var interval = $getItemValue(ctx, "Intervallo");
		  if(!interval.isNull) interval = interval.value; else interval = 0;

		  var first_interval = $getItemValue(ctx, "Primo Intervallo");
		  if(!first_interval.isNull) first_interval = first_interval.value; else first_interval = 0;

		  var defaultSlider = $getItemValue(ctx, "defaultSlider");
		  if(!defaultSlider.isNull)ctx['FIRST_AREA_TO_SHOW'] = defaultSlider.value; else ctx['FIRST_AREA_TO_SHOW'] = 1;
            
          var defaultAreaSelected = $getItemValue(ctx, "AreaSelected");
          if(!defaultAreaSelected.isNull)ctx['AreaSelected'] = defaultAreaSelected.value; else ctx['FIRST_AREA_TO_SHOW'] = null;

          var vOrderAuto = $getItemValue(ctx, "Ordine  di scorrimento auto");
          if(vOrderAuto.isNull)vOrderAuto=0; else vOrderAuto=vOrderAuto.value-1;

          var vOrderCasa = $getItemValue(ctx, "Ordine  di scorrimento casa e famiglia");
          if(vOrderCasa.isNull)vOrderCasa=0; else vOrderCasa=vOrderCasa.value-1;

          var vOrderSalute = $getItemValue(ctx, "Ordine  di scorrimento salute");
          if(vOrderSalute.isNull)vOrderSalute=0; else vOrderSalute=vOrderSalute.value-1;

          ctx['INTERVAL'] = interval; ctx['FIRST_INTERVAL'] = first_interval;
		  ctx.SLIDER_VIEW_ORDER[vOrderAuto] = vOrderAuto; ctx.INDEX_AUTO = vOrderAuto; 
		  ctx.SLIDER_VIEW_ORDER[vOrderCasa] = vOrderCasa; ctx.INDEX_CASA = vOrderCasa; 
		  ctx.SLIDER_VIEW_ORDER[vOrderSalute] = vOrderSalute;  ctx.INDEX_SALUTE = vOrderSalute;
             
        } else if (!contentType.isNull && contentType.value.indexOf(ctx.CT_PRODUCT_CATEGORY) !== -1 && Term != "") {
         
          var pictureMarkup = EA.Web.getParsedImage(ctx, $getItemValue(ctx, "Slider background image"), 980, 374, encodedId, "", true);
          var contentPanel = $getItemValue(ctx, "SliderContentPanel");
          var sliderLeftPanel = $getItemValue(ctx, "Sliderleftpanel");

          if(!sliderLeftPanel.isNull) leftPanel = sliderLeftPanel.value; else leftPanel = "";
                                     
		  switch(Term)
		  {
			case 'auto':
				ctx['contentpanel'][ctx.INDEX_AUTO] = sliderLeftPanel;
				ctx['bg'][ctx.INDEX_AUTO] ='<div class="evidence-background">'+pictureMarkup+'</div>';
				ctx['icon'][ctx.INDEX_AUTO] = "<div id='category-automotive-icon-assistenza' class='title-item icon-sprite'><div class='border'></div></div>";
				break;
			case 'casa-e-famiglia':
				ctx['contentpanel'][ctx.INDEX_CASA] = sliderLeftPanel;
				ctx['bg'][ctx.INDEX_CASA] = '<div class="evidence-background">'+pictureMarkup+'</div>';
				ctx['icon'][ctx.INDEX_CASA] = "<div id='category-home-icon-assistenza' class='title-item icon-sprite'><div class='border'></div></div>";
				break;
			case 'salute':
				ctx['contentpanel'][ctx.INDEX_SALUTE] = sliderLeftPanel;
				ctx['bg'][ctx.INDEX_SALUTE] = '<div class="evidence-background">'+pictureMarkup+'</div>';
				ctx['icon'][ctx.INDEX_SALUTE] = "<div id='category-health-icon-assistenza' class='title-item icon-sprite'><div class='border'></div></div>";
				break;
			default:
				break;
		 }
			
        } else if (!contentType.isNull && contentType.value.indexOf(ctx.CT_SERVICE) !== -1 && Term != "") {
            leftPanel = "";
            
			if(Term == "auto")
            {
                if(ctx['Auto_LeftPanel'] != "<div></div>") leftPanel = ctx['Auto_LeftPanel'];
                   leftPanel += "<li><a href='" + ctx.CurrentItem.Path + "'> <span class='ico-service'></span>" + ctx.CurrentItem.Title + "</a></li>";
            } else if (Term == "casa-e-famiglia") {
				if(ctx['Casa-e-famiglia_LeftPanel'] != "<div></div>")
                   leftPanel = ctx['Casa-e-famiglia_LeftPanel'];
                leftPanel += "<li><a href='" + ctx.CurrentItem.Path + "'> <span class='ico-service'></span>" + ctx.CurrentItem.Title + "</a></li>";
            } else if (Term == "salute") {
                if(ctx['Salute_LeftPanel'] != "<div></div>")
                   leftPanel = ctx['Salute_LeftPanel'];
                leftPanel += "<li><a href='" + ctx.CurrentItem.Path + "'> <span class='ico-service'></span>" + ctx.CurrentItem.Title + "</a></li>";
            }

            switch(Term) {
                case 'auto': ctx['leftpanel'][ctx.INDEX_AUTO] += leftPanel; break;
                case 'casa-e-famiglia': ctx['leftpanel'][ctx.INDEX_CASA_E_FAMIGLIA] += leftPanel;  break;
                case 'salute': ctx['leftpanel'][ctx.INDEX_SALUTE] += leftPanel; break;
                default: break;
            }
        }

        ms_outHtml.push(''
,'    '
);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_1b3b895c39b547c5aaea4743286938fe() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Item_Slider_hp", DisplayTemplate_1b3b895c39b547c5aaea4743286938fe);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fItem_Slider_Services_hp_restyling.js", DisplayTemplate_1b3b895c39b547c5aaea4743286938fe);
}
//
        $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fItem_Slider_Services_hp_restyling.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/CustomStrings.js");
    //
}
RegisterTemplate_1b3b895c39b547c5aaea4743286938fe();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fItem_Slider_Services_hp_restyling.js"), RegisterTemplate_1b3b895c39b547c5aaea4743286938fe);
}