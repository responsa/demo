function $_global_clientrenderer(){SPClientRenderer={GlobalDebugMode:false,AddCallStackInfoToErrors:false,RenderErrors:true};SPClientRenderer.IsDebugMode=function(a){return typeof a!="undefined"&&null!=a&&typeof a.DebugMode!="undefined"?Boolean(a.DebugMode):Boolean(SPClientRenderer.GlobalDebugMode)};SPClientRenderer.Render=function(b,a){if(b==null||a==null)return;SPClientRenderer._ExecuteRenderCallbacks(a,"OnPreRender");var c=SPClientRenderer.RenderCore(a);if(a.Errors!=null&&a.Errors.length>0){var k=[];if(Boolean(SPClientRenderer.RenderErrors))for(var j=0;j<a.Errors.length;j++)k.push(a.Errors[j]);c=k.join("")+" "}if(c!=null&&c!="")if(b.tagName=="DIV"||b.tagName=="TD"){if(a.fHidden)b.style.display="none";b.innerHTML=c}else{var g=document.createElement("div");g.innerHTML=c;var i=g.firstChild;if(g.childNodes.length==1&&i!=null&&i.nodeType==3){var n=document.createTextNode(c);InsertNodeAfter(b,n)}else{var h=i.childNodes,f;f=b.parentNode;for(var d=0;d<h.length;d++){var e=h[d];if(e.nodeType==1)if(f.nodeName==e.nodeName)for(var l=e.childNodes,o=l.length,m=0;m<o;m++)f.appendChild(l[0]);else{if(a.fHidden)e.style.display="none";f.appendChild(h[d]);d--}}}}SPClientRenderer._ExecuteRenderCallbacks(a,"OnPostRender")};SPClientRenderer.RenderReplace=function(b,a){if(b==null||a==null)return;SPClientRenderer._ExecuteRenderCallbacks(a,"OnPreRender");var c=SPClientRenderer.RenderCore(a),d=b.parentNode;if(d!=null){if(c!=null&&c!=""){var e=document.createElement("div");e.innerHTML=c;var f=e.childNodes;while(f.length>0)d.insertBefore(f[0],b)}d.removeChild(b)}SPClientRenderer._ExecuteRenderCallbacks(a,"OnPostRender")};SPClientRenderer._ExecuteRenderCallbacks=function(c,b){var a={Operation:b},d=function(){a:;return SPClientRenderer._ExecuteRenderCallbacksWorker(c,b,a)};return CallFunctionWithErrorHandling(d,c,null,a)};SPClientRenderer._ExecuteRenderCallbacksWorker=function(c,d,f){if(!c||d==null||d=="")return;var a=c[d];if(a==null)return;if(typeof a=="function"){f.TemplateFunction=a;a(c)}else if(typeof a=="object"){var e=a.length;if(e&&typeof e=="number")for(var b=0;b<Number(e);b++)if(typeof a[b]=="function"){f.TemplateFunction=a[b];a[b](c)}}};SPClientRenderer.RenderCore=function(a){if(a==null)return"";a.RenderView=g;a.RenderHeader=l;a.RenderBody=n;a.RenderFooter=j;a.RenderGroups=k;a.RenderItems=m;a.RenderFields=i;a.RenderFieldByName=h;return g(a);function g(a){return b(a,"View")}function l(a){return b(a,"Header")}function n(a){return b(a,"Body")}function j(a){return b(a,"Footer")}function d(a,b,c){return a==null?"":a.ResolveTemplate!=null&&typeof a.ResolveTemplate=="function"?a.ResolveTemplate(a,b,c):""}function b(b,e){if(b==null)return"";var a=d(b,b.ListData,e);if(a==null||a==""){var c=b.Templates;if(c==null)return"";a=c[e]}return a==null||a==""?"":CoreRender(a,b)}function k(a){if(a==null||a.ListData==null)return"";var b=null;if(a.Templates!=null)b=a.Templates.Group;var k=a.ListData,j=k[f(a)],h="";if(j==null){if(typeof b=="string"||typeof b=="function"){a.CurrentGroupIdx=0;a.CurrentGroup=k;a.CurrentItems=k[c(a)];h+=CoreRender(b,a);a.CurrentItems=null;a.CurrentGroup=null}return h}for(var i=0;i<j.length;i++){var g=j[i],e=d(a,g,"Group");if(e==null||e==""){if(b==null||b=={})return"";if(typeof b=="string"||typeof b=="function")e=b;if(e==null||e==""){var l=g.GroupType;e=b[l]}}if(e==null||e=="")continue;a.CurrentGroupIdx=i;a.CurrentGroup=g;a.CurrentItems=g[c(a)];h+=CoreRender(e,a);a.CurrentGroup=null;a.CurrentItems=null}return h}function m(a){if(a==null||a.ListData==null)return"";var g=null;if(a.Templates!=null)g=a.Templates.Item;var p=a.ListData,e=a.CurrentItems;if(e==null)e=typeof a.CurrentGroup!="undefined"?a.CurrentGroup[c(a)]:null;if(e==null){var l=p[f(a)];e=typeof l!="undefined"?l[c(a)]:null}if(e==null)return"";for(var j="",h=0;h<e.length;h++){var i=e[h],b=d(a,i,"Item");if(b==null||b==""){if(g==null||g=={})return"";if(typeof g=="string"||typeof g=="function")b=g;if(b==null||b==""){var o=i.ContentType;b=g[o]}}if(b==null||b=="")continue;a.CurrentItemIdx=h;a.CurrentItem=i;if(typeof a.ItemRenderWrapper=="string")a.ItemRenderWrapper==SPClientRenderer.ParseTemplateString(a.ItemRenderWrapper,a);if(typeof a.ItemRenderWrapper=="function"){var k=a.ItemRenderWrapper,m={TemplateFunction:k,Operation:"ItemRenderWrapper"},n=function(){a:;return k(CoreRender(b,a),a,b)};j+=CallFunctionWithErrorHandling(n,a,"",m)}else j+=CoreRender(b,a);a.CurrentItem=null}return j}function i(a){if(a==null||a.Templates==null||a.ListSchema==null||a.ListData==null)return"";var f=a.CurrentItem,b=a.ListSchema.Field,d=a.Templates.Fields;if(f==null||b==null||d==null)return"";var c="";for(var g in b)c+=e(a,b[g]);return c}function h(a,c){if(a==null||a.Templates==null||a.ListSchema==null||a.ListData==null||c==null||c=="")return"";var d=a.CurrentItem,b=a.ListSchema.Field,g=a.Templates.Fields;if(d==null||b==null||g==null)return"";if(typeof SPClientTemplates!="undefined"&&spMgr!=null&&a.ControlMode==SPClientTemplates.ClientControlMode.View)return spMgr.RenderFieldByName(a,c,d,a.ListSchema);for(var f in b)if(b[f].Name==c)return e(a,b[f]);return""}function e(a,f){var e=a.CurrentItem,d=a.Templates.Fields,b=f.Name;if(typeof e[b]=="undefined")return"";var c="";if(d[b]!=null)c=d[b];if(c==null||c=="")return"";a.CurrentFieldValue=e[b];a.CurrentFieldSchema=f;var g=CoreRender(c,a);a.CurrentFieldValue=null;a.CurrentFieldSchema=null;return g}function f(b){var a=b.ListDataJSONGroupsKey;return typeof a!="string"||a==""?"Groups":a}function c(b){var a=b.ListDataJSONItemsKey;return typeof a!="string"||a==""?"Items":a}};SPClientRenderer.ParseTemplateString=function(a,b){var c={TemplateFunction:a,Operation:"ParseTemplateString"},d=function(){a:;return SPClientRenderer.ParseTemplateStringWorker(a,b)};return CallFunctionWithErrorHandling(d,b,null,c)};SPClientRenderer.ParseTemplateStringWorker=function(a){if(a==null||a.length==0)return null;var c="var p=[]; p.push('"+a.replace(/[\r\t\n]/g," ").replace(/'(?=[^#]*#>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<#=(.+?)#>/g,"',$1,'").split("<#").join("');").split("#>").join("p.push('")+"'); return p.join('');",b;b=new Function("ctx",c);return b};SPClientRenderer.ReplaceUrlTokens=function(a){var c=window._spPageContextInfo;if(a==null||a==""||c==null)return"";var k="~site/",f="~sitecollection/",e="~sitecollectionmasterpagegallery/",b=a.toLowerCase();if(b.indexOf(k)==0){var n=h(c.webServerRelativeUrl);a=n+a.substr(k.length);b=n+b.substr(k.length)}else if(b.indexOf(f)==0){var m=h(c.siteServerRelativeUrl);a=m+a.substr(f.length);b=m+b.substr(f.length)}else if(b.indexOf(e)==0){var l=h(c.siteServerRelativeUrl);a=l+"_catalogs/masterpage/"+a.substr(e.length);b=l+"_catalogs/masterpage/"+b.substr(e.length)}var j="{lcid}",i="{locale}",g="{siteclienttag}",d=-1;while((d=b.indexOf(j))!=-1){a=a.substring(0,d)+String(c.currentLanguage)+a.substr(d+j.length);b=b.replace(j,String(c.currentLanguage))}while((d=b.indexOf(i))!=-1){a=a.substring(0,d)+c.currentUICultureName+a.substr(d+i.length);b=b.replace(i,c.currentUICultureName)}while((d=b.indexOf(g))!=-1){a=a.substring(0,d)+c.siteClientTag+a.substr(d+g.length);b=b.replace(g,c.siteClientTag)}return a;function h(a){if(a==null||a=="")return"";var b=a.length;return a[b-1]=="/"?a:a+"/"}};typeof Sys!="undefined"&&Sys!=null&&Sys.Application!=null&&Sys.Application.notifyScriptLoaded();typeof NotifyScriptLoadedAndExecuteWaitingJobs=="function"&&NotifyScriptLoadedAndExecuteWaitingJobs("clientrenderer.js")}function ULSSwq(){var a={};a.ULSTeamName="Microsoft SharePoint Foundation";a.ULSFileName="clientrenderer.commentedjs";return a}var SPClientRenderer;function CallFunctionWithErrorHandling(c,b,d,a){if(SPClientRenderer.IsDebugMode(b))return c();try{return c()}catch(f){if(b.Errors==null)b.Errors=[];try{f.ExecutionContext=a;if(Boolean(SPClientRenderer.AddCallStackInfoToErrors)&&typeof a=="object"&&null!=a)a.CallStack=ULSGetCallstack(CallFunctionWithErrorHandling.caller)}catch(e){}b.Errors.push(f);return d}}function CoreRender(b,a){var c={TemplateFunction:b,Operation:"CoreRender"},d=function(){a:;return CoreRenderWorker(b,a)};return CallFunctionWithErrorHandling(d,a,"",c)}function CoreRenderWorker(b,c){var a;if(typeof b=="string")a=SPClientRenderer.ParseTemplateString(b,c);else if(typeof b=="function")a=b;return a==null?"":a(c)}function GetViewHash(a){return ajaxNavigate.getParam("InplviewHash"+a.view.toLowerCase().substring(1,a.view.length-1))}function RenderAsyncDataLoad(){return'<div style="padding-top:5px;"><center><img src="/_layouts/15/images/gears_an.gif" style="border-width:0px;" /></center></div>'}function RenderCallbackFailures(a,b){if(!Boolean(a)||b==null||b.status!=601)return;if(a.Errors==null)a.Errors=[];a.Errors.push(b.responseText);SPClientRenderer.Render(document.getElementById("script"+a.wpq),a)}function AsyncDataLoadPostRender(a){window.asyncCallback=function(){a:;ExecuteOrDelayUntilScriptLoaded(function(){a:;var b=a.clvp.PagingString();a.queryString="?"+(b!=null?b:"");a.onRefreshFailed=RenderCallbackFailures;a.loadingAsyncData=true;var c={currentCtx:a,csrAjaxRefresh:true};AJAXRefreshView(c,1)},"inplview.js")};if(typeof g_mdsReady!="undefined"&&Boolean(g_mdsReady)&&typeof g_MDSPageLoaded!="undefined"&&!Boolean(g_MDSPageLoaded))_spBodyOnLoadFunctionNames.push("asyncCallback");else asyncCallback()}function AddPostRenderCallback(b,a){AddRenderCallback(b,"OnPostRender",a,false)}function AddPostRenderCallbackUnique(b,a){AddRenderCallback(b,"OnPostRender",a,true)}function AddRenderCallback(d,c,b,g){if(Boolean(d)&&typeof b=="function"&&c!=""){var a=d[c];if(a==null)d[c]=b;else if(typeof a=="function"){if(!Boolean(g)||String(a)!=String(b)){var e=[];e.push(a);e.push(b);d[c]=e}}else if(typeof a=="object"){var h=false;if(Boolean(g))for(var f=0;f<a.length;f++)if(a[f]==b){h=true;break}!h&&d[c].push(b)}}}$_global_clientrenderer();