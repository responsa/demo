/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_60e6d0bce0274167942e1b638beb91b4(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_60e6d0bce0274167942e1b638beb91b4.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fControl_Slider_Easy_hp_restyling.js';
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
        var ListRenderRenderWrapper = function(itemRenderResult, inCtx, tpl)
        {
            var iStr = [];
            iStr.push(itemRenderResult);
            return iStr.join('');
        }
        ctx['ItemRenderWrapper'] = ListRenderRenderWrapper;

        ctx.OnPostRender = function()
        {
                ctx['FIRST_INTERVAL'] = ctx['FIRST_INTERVAL'] * 1000;
                ctx['INTERVAL'] = ctx['INTERVAL'] * 1000;
                EA.Web.Slider.initializeEvidenceBoxEasy(ctx['FIRST_AREA_TO_SHOW'],ctx['FIRST_INTERVAL'],ctx['INTERVAL'],ctx['SLIDER_VIEW_ORDER']);
                var jitems = jQuery('.promo-items');
                jitems.addClass('open');
                if (!EA.Common.DesignMode() && EA.Web.GA != undefined) EA.Web.Runtime.GA.initializeGaTracking();
        };

        ctx['CT_PRODUCT_CATEGORY'] = "EAProductCategory";
        ctx['CT_PRODUCT_FAMILY'] = "EAProductFamily";

        ctx['Flexy_BackgroundImage'] = '<div class="evidence-background"><img src="" alt="" title=""/></div>';
        ctx['Flexy_LeftPanel'] = '<div></div>';
        ctx['Flexy_ContentPanel'] = '<div></div>';
        ctx['Easy_BackgroundImage'] = '<div class="evidence-background"><img src="" alt="" title=""/></div>';
        ctx['Easy_LeftPanel'] = '<div></div>';
        ctx['Easy_ContentPanel'] = '<div></div>';

        var currentElement = "";

        ctx['INDEX_FLEXY']  = 0;
        ctx['INDEX_EASY']  = 0;

        ctx['FLEXY_PRODUCTS'] = new Array();
        ctx['EASY_PRODUCTS'] = new Array();

        ctx['FIRST_AREA_TO_SHOW'] = 1;
        ctx['FIRST_INTERVAL']  = 1;
        ctx['INTERVAL'] = 1;
        ctx['SLIDER_VIEW_ORDER'] = new Array(0, 1);
        ctx['ID_TERMS'] = new Array('', '');

                ms_outHtml.push(''
,'        ', ctx.RenderGroups(ctx) ,''
,''
,'        <div id="wp_Easy" class="slider-homepage-container">'
,'            <div class="main-nav">'
,'                <div class="first-level-tab">'
,'                    <div class="tab easy">'
,'                        <div class="content-easy content-box active">'
,'                            <!-- start tab slider easy -->'
,'                            <div class="content-tab-home">'
,'                                <div class="slider-tab-easy">'
,'                                    <div id="container-abbonamento">'
,'                                        <div class="column" style="padding-left: 642px;">'
,'                                            <div class="cell slider-main-box" id="evidence-container-abbonamento">'
,'                                                <div id="evidence-backgrounds-abbonamento" class="evidence-backgrounds">'
,'                                                    <div id="evidence-backgrounds-slider-abbonamento" class="evidence-backgrounds-slider">'
,'                                                        ', ctx['Flexy_BackgroundImage'] ,' ', ctx['Easy_BackgroundImage'] ,''
,'                                                    </div>'
,'                                                </div>'
,'                                                <div id="evidence-box-abbonamento" class="double evidence-box">'
,'                                                    <div class="evidence-box-tab">'
,'														<div class="head">L\'offerta in abbonamento</div>'
,'                                                        <div id="category-flexy" class="title-item"><div class="border">Flexi</div></div>'
,'                                                        <div id="category-easy" class="title-item"><div class="border">Easy</div></div>'
,'                                                        <div class="body-item left">'
,'                                                            ', ctx['Flexy_ContentPanel'] ,' ', ctx['Flexy_LeftPanel'] ,''
,'                                                        </div>'
,'                                                        <div class="body-item left">'
,'                                                            ', ctx['Easy_ContentPanel'] ,' ', ctx['Easy_LeftPanel'] ,''
,'                                                        </div>'
,'                                                    </div>'
,'                                                </div>'
,'                                            </div>'
,'                                            <span class="shadow"></span>'
,'                                        </div>'
,'                                    </div>'
,'                                </div>'
,'                            </div>'
,'                        </div>'
,'                        <!-- end tab slider easy -->'
,'                    </div>'
,'                </div>'
,'            </div>'
,'        </div>'
);
            AddPostRenderCallback(ctx, function(){
                var activeTab = jQuery('div.tab-name > a.active')[0];
                if (activeTab !== undefined)
                {
                    showHide(activeTab.parentElement);
                }
            });
        ms_outHtml.push(''
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_60e6d0bce0274167942e1b638beb91b4() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Control_Slider_Easy_hp", DisplayTemplate_60e6d0bce0274167942e1b638beb91b4);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fControl_Slider_Easy_hp_restyling.js", DisplayTemplate_60e6d0bce0274167942e1b638beb91b4);
}
//
        $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fControl_Slider_Easy_hp_restyling.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/CustomStrings.js");
        $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fControl_Slider_Easy_hp_restyling.js", "~siteCollection/_layouts/15/ea/web/js/ea_slider_restyling.min.js");
    //
}
RegisterTemplate_60e6d0bce0274167942e1b638beb91b4();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fContentWebParts\u002fDefault\u002fSlider hp\u002fControl_Slider_Easy_hp_restyling.js"), RegisterTemplate_60e6d0bce0274167942e1b638beb91b4);
}