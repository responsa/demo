/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_0422ec1fd54042848bb45e2fcb61d1c5(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_0422ec1fd54042848bb45e2fcb61d1c5.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fAB\u002fControl_HP.js';
  ctx['DisplayTemplateData']['TemplateType']='Control';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

ms_outHtml.push('',''
);
        if (!$isNull(ctx.ClientControl) && !$isNull(ctx.ClientControl.shouldRenderControl) && !ctx.ClientControl.shouldRenderControl()) { return ""; }
        ctx.ListDataJSONGroupsKey = "ResultTables"; var $noResults = Srch.ContentBySearch.getControlTemplateEncodedNoResultsMessage(ctx.ClientControl); var noResultsClassName = "ms-srch-result-noResults";
        var ListRenderRenderWrapper = function(itemRenderResult, inCtx, tpl) { var iStr = []; iStr.push(itemRenderResult); return iStr.join(''); }
        ctx['ItemRenderWrapper'] = ListRenderRenderWrapper;
        ctx.OnPostRender = function() { if (ctx['Active_Form_Viaggi'] != false) { if (!EA.Common.DesignMode()) CommerceForm("AppViaggi", ctx['Active_Form_Viaggi_flusso'], ctx['Active_Form_Viaggi_trkCode']); }};
        ctx['CT_PRODUCT_CATEGORY'] = "EAProductCategory"; ctx['CT_PRODUCT_FAMILY'] = "EAProductFamily";
        ctx['Viaggi_BackgroundImage'] = '<div class="evidence-background"><img src="" alt="" title=""/></div>'; ctx['Viaggi_LeftPanel'] = '<div class="body-item left"></div>'; ctx['Viaggi_ContentPanel'] = '<div></div>';
        ctx['Active_Form_Viaggi'] = false; ctx['INDEX_VIAGGI'] = 0; ctx['VIAGGI_PRODUCTS'] = new Array();ctx['ID_TERMS'] = new Array('', '', '', '');
		ms_outHtml.push(''
,'        ', ctx.RenderGroups(ctx) ,''
,'        <div id="wp_Assicurazioni" class="slider-homepage-container" style="margin-top: 63px; position: relative;"><div id="AppViaggiContainer"> ', ctx['Viaggi_BackgroundImage'] ,' ', ctx['Viaggi_ContentPanel'] ,' ', ctx['Viaggi_LeftPanel'] ,' </div></div>'
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_0422ec1fd54042848bb45e2fcb61d1c5() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Control_HP", DisplayTemplate_0422ec1fd54042848bb45e2fcb61d1c5);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fAB\u002fControl_HP.js", DisplayTemplate_0422ec1fd54042848bb45e2fcb61d1c5);
}
//
        $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fAB\u002fControl_HP.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/CustomStrings.js");
        $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fAB\u002fControl_HP.js", "~sitecollection/_layouts/15/ea/web/ab/js/ea_slider_commerce.min.js?v=0.1");
        $includeCSS("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fAB\u002fControl_HP.js", "~sitecollection/_layouts/15/ea/web/ab/css/ab.min.css");
    //
}
RegisterTemplate_0422ec1fd54042848bb45e2fcb61d1c5();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fAB\u002fControl_HP.js"), RegisterTemplate_0422ec1fd54042848bb45e2fcb61d1c5);
}