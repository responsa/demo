/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_2e35657051d84bdf9c568c19a79c08b3(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_2e35657051d84bdf9c568c19a79c08b3.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fControl_Slider_Services_hp_restyling.js';
  ctx['DisplayTemplateData']['TemplateType']='Control';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

ms_outHtml.push('',''
,''
);
        if (!$isNull(ctx.ClientControl) &&
            !$isNull(ctx.ClientControl.shouldRenderControl) &&
            !ctx.ClientControl.shouldRenderControl())
        {
            return "";
        }
        ctx.ListDataJSONGroupsKey = "ResultTables";
        var $noResults = Srch.ContentBySearch.getControlTemplateEncodedNoResultsMessage(ctx.ClientControl);
        var noResultsClassName = "ms-srch-result-noResults";
        var ListRenderRenderWrapper = function(itemRenderResult, inCtx, tpl) { var iStr = []; iStr.push(itemRenderResult); return iStr.join(''); }
        ctx['ItemRenderWrapper'] = ListRenderRenderWrapper;

        ctx.OnPostRender = function()
        {
			ctx['FIRST_INTERVAL'] = ctx['FIRST_INTERVAL'] * 1000;
			ctx['INTERVAL'] = ctx['INTERVAL'] * 1000;
			EA.Web.Slider.initializeEvidenceBoxAssistenza(ctx['FIRST_AREA_TO_SHOW'],ctx['FIRST_INTERVAL'],ctx['INTERVAL'],ctx['SLIDER_VIEW_ORDER']);
            if(ctx['AreaSelected'] != null)  $('#wp_AssistenzaOnDemand .evidence-box-tab .title-item:nth("'+ (parseInt(ctx['AreaSelected']) - 1)+'")').click();
			var jitems = jQuery('.promo-items'); jitems.addClass('open'); if (!EA.Common.DesignMode() && EA.Web.GA != undefined) EA.Web.Runtime.GA.initializeGaTracking();
        };

        ctx['CT_PRODUCT_CATEGORY'] = "EAProductCategory";
        ctx['CT_PRODUCT_FAMILY'] = "EAProductFamily";
        ctx['CT_SERVICE'] = "EAService";

        ctx['Auto_LeftPanel'] = '<div></div>';
        ctx['Casa-e-famiglia_LeftPanel'] = '<div></div>';
        ctx['Salute_LeftPanel'] = '<div></div>';
        
		ctx['bg']= new Array();
		ctx['icon']= new Array();
		ctx['contentpanel'] = new Array("", "", "");
		ctx['leftpanel'] = new Array("", "", "");
        var currentElement = "";

        ctx['INDEX_AUTO']  = 0;
        ctx['INDEX_CASA_E_FAMIGLIA']  = 0;
        ctx['INDEX_SALUTE'] = 0;
        
        ctx['AreaSelected'] = null;
        ctx['FIRST_AREA_TO_SHOW'] = 1;
        ctx['FIRST_INTERVAL']  = 1;
        ctx['INTERVAL'] = 1;
        ctx['SLIDER_VIEW_ORDER'] = new Array(0, 1, 2);
        ctx['ID_TERMS'] = new Array('', '', '');

        ms_outHtml.push(''
,'        ', ctx.RenderGroups(ctx) ,''
,''
,'        <div id="wp_AssistenzaOnDemand" class="slider-homepage-container">'
,''
,'            <div class="main-nav">'
,'                <div class="first-level-tab">'
,'                    <div class="tab assistenza">'
,'                        <div class="content-assistenza content-box active">'
,'                            <!-- start tab slider assistenza -->'
,'                            <div class="content-tab-home">'
,'                                <div class="slider-tab-assistenza">'
,'                                    <div id="container-assistenza">'
,'                                        <div class="column column-assistenza">'
,'                                            <div class="cell slider-main-box" id="evidence-container-assistenza">'
,'                                                <div id="evidence-backgrounds-assistenza" class="evidence-backgrounds">'
,'                                                    <div id="evidence-backgrounds-slider-assistenza" class="evidence-backgrounds-slider">'
,'														   ', ctx.bg['0'] ,' '
,'														   ', ctx.bg['1'] ,' '
,'														   ', ctx.bg['2'] ,' '
,'                                                    </div>'
,'                                                </div>'
,'                                                <div id="evidence-box-assistenza" class="triple evidence-box">'
,'                                                    <div class="evidence-box-tab">'
,'                                                        <div class="head">I nostri servizi</div>'
,'                                                         ', ctx.icon['0'] ,' '
,'														 ', ctx.icon['1'] ,' '
,'														 ', ctx.icon['2'] ,' '
,'                                                        <div class="body-item left">'
,'                                                            ', !ctx['contentpanel']['0'].isNull ? ctx['contentpanel']['0'] : '' ,''
,'                                                            <div class="info-generic-assistenza">'
,'                                                                <span class="title">Scegli il servizio</span>'
,'                                                                <ul class="service-list">'
,'                                                                    ', ctx['leftpanel']['0'] ,''
,'                                                                </ul>'
,'                                                            </div>'
,'                                                        </div>'
,'                                                        <div class="body-item left">'
,'                                                            ', !ctx['contentpanel']['1'].isNull ? ctx['contentpanel']['1'] : '' ,''
,'                                                            <div class="info-generic-assistenza">'
,'                                                                <span class="title">Scegli il servizio</span>'
,'                                                                <ul class="service-list">'
,'                                                                    ', ctx['leftpanel']['1'] ,''
,'                                                                </ul>'
,'                                                            </div>'
,'                                                        </div>'
,'                                                         <div class="body-item left">'
,'                                                            ', !ctx['contentpanel']['2'].isNull ? ctx['contentpanel']['2'] : '' ,''
,'                                                            <div class="info-generic-assistenza">'
,'                                                                <span class="title">Scegli il servizio</span>'
,'                                                                <ul class="service-list">'
,'                                                                    ', ctx['leftpanel']['2'] ,''
,'                                                                </ul>'
,'                                                            </div>'
,'                                                        </div>'
,'                                                    </div>'
,'                                                </div>'
,'                                            </div>'
,'                                            <span class="shadow"></span>'
,'                                        </div>'
,'                                    </div>'
,'                                </div>'
,'                            </div>'
,'                            <!-- end tab slider assistenza -->'
,'                        </div>'
,'                    </div>'
,''
,'                </div>'
,'            </div>'
);
                AddPostRenderCallback(ctx, function(){
                    var activeTab = jQuery('div.tab-name > a.active')[0];
                    if (activeTab !== undefined)
                    {
                        showHide(activeTab.parentElement);
                    }
                });
            ms_outHtml.push(''
,'        </div>'
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_2e35657051d84bdf9c568c19a79c08b3() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Control_Slider_Services_hp", DisplayTemplate_2e35657051d84bdf9c568c19a79c08b3);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fControl_Slider_Services_hp_restyling.js", DisplayTemplate_2e35657051d84bdf9c568c19a79c08b3);
}
//
        $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fControl_Slider_Services_hp_restyling.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/CustomStrings.js");
        $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fControl_Slider_Services_hp_restyling.js", "~siteCollection/_layouts/15/ea/web/js/ea_slider_restyling.min.js");
    //
}
RegisterTemplate_2e35657051d84bdf9c568c19a79c08b3();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fControl_Slider_Services_hp_restyling.js"), RegisterTemplate_2e35657051d84bdf9c568c19a79c08b3);
}