/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_62bb1298c08f4748ad2b90c41c1007b9(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_62bb1298c08f4748ad2b90c41c1007b9.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fAB\u002fItem_HP.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Titolo':['Title'], 'slider':['WebsliderOWSBOOL'], 'Slider_background_image':['SliderbackgroundimageOWSIMGE'], 'Slider_left_panel':['SliderLeftPanelOWSHTML'], 'Preventivatore':['EASliderCheckPreventivatoreOWSBOOL', 'FormPreventivatoreVisibileOWSBOOL'], 'Contenuto_Form':['EASliderHtmlPreventivatoreOWSHTML', 'HtmlformpreventivatoreOWSHTML'], 'Flusso':['EAFlussoCommerceSourceOWSCHCS'], 'TrkCode':['EAFlussoCommerceTrkCodeOWSTEXT'], 'ContentType':['ContentType'], 'ProductItemCategory':['owstaxIdProductCatalogItemCategory'], 'SliderContentPanel':['SliderContentPanelOWSHTML']};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {
    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
};

ms_outHtml.push('',''
);
        var encodedId = $htmlEncode(ctx.ClientControl.get_nextUniqueId() + "_SliderHp_"); var contentType = $getItemValue(ctx, "ContentType");
        var ItemCategory = $getItemValue(ctx, "ProductItemCategory"); ItemCategory = ItemCategory.inputValue.toLowerCase(); var Term=""; if(ItemCategory.indexOf('viaggi') !== -1) ctx.ID_TERMS[0] = ItemCategory.substring(5,ItemCategory.indexOf(';')); if(ctx.ID_TERMS[0]!= "" && ItemCategory.indexOf(ctx.ID_TERMS[0]) !== -1) Term = 'viaggi';
		if (!contentType.isNull && contentType.value.indexOf(ctx.CT_PRODUCT_CATEGORY) !== -1 && Term != "")
	    {
            var pictureMarkup = EA.Web.getParsedImage(ctx, $getItemValue(ctx, "Slider_background_image"), 980, 505, encodedId, "", true); var left = $getItemValue(ctx, "Slider_left_panel");var form = $getItemValue(ctx, "Contenuto_Form");  var flusso = $getItemValue(ctx, "Flusso"); var trkCode = $getItemValue(ctx, "TrkCode"); 
			if(!left.isNull || !form.isNull) { var preventivatore = $getItemValue(ctx, "Preventivatore"); if (preventivatore.inputValue == "1") { content = form.value; ctx['Active_Form_Viaggi'] = true; ctx['Active_Form_Viaggi_flusso'] = (flusso == "Bundle") ? "bundletariffa" : "tariffa"; ctx['Active_Form_Viaggi_trkCode'] = trkCode; } else content = left.value;  } else content = "";
			if(Term == 'viaggi') { ctx['Viaggi_BackgroundImage'] = '<div class="preventivo_top"><div class="image">'+pictureMarkup+'</div></div>'; ctx['Viaggi_LeftPanel'] = left;  ctx['Viaggi_ContentPanel'] = content; }
        }
        ms_outHtml.push(''
,'    '
);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_62bb1298c08f4748ad2b90c41c1007b9() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Item_HP", DisplayTemplate_62bb1298c08f4748ad2b90c41c1007b9);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fAB\u002fItem_HP.js", DisplayTemplate_62bb1298c08f4748ad2b90c41c1007b9);
}
//
        $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fAB\u002fItem_HP.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/CustomStrings.js");
    //
}
RegisterTemplate_62bb1298c08f4748ad2b90c41c1007b9();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fAB\u002fItem_HP.js"), RegisterTemplate_62bb1298c08f4748ad2b90c41c1007b9);
}