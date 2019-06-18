/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_e9e0342f4c5e415b8cf14a139b3d7d1a(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_e9e0342f4c5e415b8cf14a139b3d7d1a.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fSearch\u002fDefault\u002fControl_SearchBox_Compact.js';
  ctx['DisplayTemplateData']['TemplateType']='Control';
  ctx['DisplayTemplateData']['TargetControlType']=['SearchBox'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

ms_outHtml.push('',''
); 
 
        checkValueInputSearch = function (event, el){
            $getClientControl(el).search(($get($scriptEncode(searchBoxId)).value).replace(/\W/g," "));
            return Srch.U.cancelEvent(event);
        };

        checkValueInputSearchKeyPress = function (event, el){
            if (Srch.U.isEnterKey(String.fromCharCode(event.keyCode))) 
            { 
                $getClientControl(el).search(($get($scriptEncode(searchBoxId)).value).replace(/\W/g," "));
                return Srch.U.cancelEvent(event); 
            }
        };
        
        var showQuerySuggestions = ctx.ClientControl.get_showQuerySuggestions();
        var showNavigation = ctx.ClientControl.get_showNavigation();

        var prompt = ctx.ClientControl.get_initialPrompt();
        if ($isNull(prompt))
        {
            prompt = Srch.Res.sb_Prompt;
        }

        var searchBoxDivId = ctx.ClientControl.get_id() + "_sboxdiv";
        var searchBoxId = ctx.ClientControl.get_id() + "_sbox";
        var navButtonId = ctx.ClientControl.get_id() + "_NavButton";
        var suggestionsListId = ctx.ClientControl.get_id() + "_AutoCompList"; 
        var navListId = ctx.ClientControl.get_id() + "_NavDropdownList";
        var searchBoxLinkId = ctx.ClientControl.get_id() + "_SearchLink";
        var searchBoxProgressClass = "ms-srch-sbprogress";
        var searchBoxPromptClass = "ms-srch-sb-prompt ms-helperText";

        ctx.OnPostRender = function(rCtx) {
            ctx.ClientControl.activate(
                prompt, 
                searchBoxId, 
                searchBoxDivId, 
                navButtonId, 
                suggestionsListId, 
                navListId, 
                searchBoxLinkId, 
                searchBoxProgressClass,
                searchBoxPromptClass);            
        };

        
ms_outHtml.push(''
,'        <div id="SearchBox" name="Control">'
,'            <div class="over-label-container" id="', $htmlEncode(searchBoxDivId) ,'">'
,'                <input type="text" value="', $htmlEncode(ctx.ClientControl.get_currentTerm()) ,'" maxlength="2048" class="search-field" accessKey="', $htmlEncode(Srch.Res.sb_AccessKey) ,'" title="', $htmlEncode(prompt) ,'" id="', $htmlEncode(searchBoxId) ,'" autocomplete="off" autocorrect="off" onkeypress="checkValueInputSearchKeyPress(event,this);" onkeydown="var ctl = $getClientControl(this);ctl.activateDefaultQuerySuggestionBehavior();" onfocus="var ctl = $getClientControl(this);ctl.hidePrompt();ctl.setBorder(true);" onblur="var ctl = $getClientControl(this);ctl.showPrompt();ctl.setBorder(false);" />'
); 
                var imagesUrl = GetThemedImageUrl('../ea/web/images/restyling-nav/ico-search.gif');
                if (showNavigation) { 
ms_outHtml.push(''
,'                  <a onclick="checkValueInputSearch(event, this);" class="search-submit icon-sprite" id="A1" alt="', $htmlEncode(Srch.Res.sb_GoNav) ,'"></a>'
); 
                }
ms_outHtml.push(''
,'                  <a onclick="checkValueInputSearch(event, this);" class="search-submit icon-sprite" id="navImg" alt="', $htmlEncode(Srch.Res.sb_GoNav) ,'"></a>'
); 
            if (showQuerySuggestions) { 
ms_outHtml.push(''
,'                <div class="ms-qSuggest-container ms-shadow" id="AutoCompContainer">'
,'                    <div id="', $htmlEncode(suggestionsListId) ,'"></div>'
,'                </div>'
); 
            } 

            if (showNavigation) { 
ms_outHtml.push(''
,'                <div class="ms-qSuggest-container ms-shadow" id="NavDropdownListContainer">'
,'                    <div id="', $htmlEncode(navListId) ,'"></div>'
,'                </div>'
); 
            } 
ms_outHtml.push(''
,'            </div>'
); 
            if (ctx.ClientControl.get_showAdvancedLink()) {
                var advancedUrl = ctx.ClientControl.get_advancedSearchPageAddress();
                if(!$isEmptyString(advancedUrl)){ 
ms_outHtml.push(''
,'                    <div class="ms-srch-sb-link"><a id="AdvancedLink" href="', $urlHtmlEncode(advancedUrl) ,'">', $htmlEncode(Srch.Res.sb_AdvancedLink) ,'</a></div>'
); 
                }
            }
            if (ctx.ClientControl.get_showPreferencesLink()) {
                var preferencesUrl = ctx.ScriptApplicationManager.get_preferencesUrl();
                if(!$isEmptyString(preferencesUrl)){ 
ms_outHtml.push(''
,'                    <div class="ms-srch-sb-link"><a id="PreferencesLink" href="', $urlHtmlEncode(preferencesUrl) ,'">', $htmlEncode(Srch.Res.sb_PreferencesLink) ,'</a></div>'
); 
                }
            } 
ms_outHtml.push(''
,'        </div>'
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_e9e0342f4c5e415b8cf14a139b3d7d1a() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Control_SearchBox_Compact", DisplayTemplate_e9e0342f4c5e415b8cf14a139b3d7d1a);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fSearch\u002fDefault\u002fControl_SearchBox_Compact.js", DisplayTemplate_e9e0342f4c5e415b8cf14a139b3d7d1a);
}

}
RegisterTemplate_e9e0342f4c5e415b8cf14a139b3d7d1a();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fEA\u002fDisplayTemplates\u002fSearch\u002fDefault\u002fControl_SearchBox_Compact.js"), RegisterTemplate_e9e0342f4c5e415b8cf14a139b3d7d1a);
}