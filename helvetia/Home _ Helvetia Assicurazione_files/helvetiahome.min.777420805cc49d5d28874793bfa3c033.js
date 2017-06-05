var Nx=Nx||{};
Nx.$=jQuery.noConflict(false);
Nx.Config={dependencyPath:{library:"/global/content/js/libraries/dynamic/",plugin:"/global/content/js/plugins/dynamic/",util:"/global/content/js/utils/dynamic/"}};
(function(){var a=false,b=/xyz/.test(function(){xyz
})?/\b_super\b/:/.*/;
this.Class=function(){};
Class.extend=function(g){var f=this.prototype;
a=true;
var e=new this();
a=false;
for(var d in g){e[d]=typeof g[d]=="function"&&typeof f[d]=="function"&&b.test(g[d])?(function(h,i){return function(){var k=this._super;
this._super=f[h];
var j=i.apply(this,arguments);
this._super=k;
return j
}
})(d,g[d]):g[d]
}function c(){if(!a&&this.init){this.init.apply(this,arguments)
}}c.prototype=e;
c.constructor=c;
c.extend=arguments.callee;
return c
}
})();
(function(a){Nx.Application=Class.extend({init:function(c,b){this.config=a.extend(Nx.Config,b);
this.$ctx=c||a("body");
this.modules=[];
this.connectors={};
this.wildcardComponents=[];
this.sandbox=new Nx.Sandbox(this,this.config)
},registerModules:function(c){var d=this,b=[];
c=c||this.$ctx;
a(".mod:not([data-lazyinit=true]):not(.mod[data-lazyinit=true] .mod)",c).each(function(){var l=a(this);
var j=l.attr("class").split(" ");
if(j.length>1){var k,m=[],f=[];
for(var h=0,e=j.length;
h<e;
h++){var g=a.trim(j[h]);
if(g.indexOf("mod")===0&&g.length>3){k=g.substr(3)
}else{if(g.indexOf("skin")===0){m.push(g.substr(4).replace(k,""))
}}}if(l.attr("data-connectors")){f=l.attr("data-connectors").split(",");
for(var h=0,e=f.length;
h<e;
h++){f[h]=a.trim(f[h])
}}if(k&&Nx.Module[k]){b.push(d.registerModule(l,k,m,f))
}}});
return b
},unregisterModules:function(f){var d=this.connectors,c=this.wildcardComponents;
f=f||this.modules;
if(f===this.modules){this.wildcardComponents=[];
this.connectors=[];
this.modules=[]
}else{for(var h=0,b=f.length;
h<b;
h++){var g=f[h];
var e;
for(var j in d){d[j].unregisterComponent(g)
}e=a.inArray(g,c);
delete c[e];
e=a.inArray(g,this.modules);
delete this.modules[e]
}}},start:function(g){var c=this.wildcardComponents,d=this.connectors;
g=g||this.modules;
for(var h=0,b=g.length;
h<b;
h++){g[h].start()
}for(var h=0,b=c.length;
h<b;
h++){var f=c[h];
if(a.inArray(f,g)>-1){for(var e in d){f.attachConnector(d[e]);
d[e].registerComponent(f,"*")
}}}},stop:function(c){c=c||this.modules;
for(var d=0,b=c.length;
d<b;
d++){c[d].stop()
}},registerModule:function(b,k,j,c){var d=this.modules;
k=k||null;
j=j||[];
c=c||[];
if(k&&Nx.Module[k]){var g=d.length;
b.data("id",g);
d[g]=new Nx.Module[k](b,this.sandbox,g);
for(var f=0,h=j.length;
f<h;
f++){var e=j[f];
if(Nx.Module[k][e]){d[g]=d[g].getDecoratedModule(k,e)
}}for(var f=0,h=c.length;
f<h;
f++){this.registerConnection(c[f],d[g])
}return d[g]
}else{return null
}},registerConnection:function(d,f){var c=d.replace(/[0-9]+[a-zA-Z]*$/,""),e=d.replace(/[a-zA-Z]*$/,"").replace(/^[a-zA-Z]*/,""),g=d.replace(/^[a-zA-Z]*[0-9]*/,"");
if(e==="*"&&g==="*"){this.wildcardComponents.push(f)
}else{var b=this.connectors;
if(!b[e]){if(c===""){b[e]=new Nx.Connector(e)
}else{if(Nx.Connector[c]){b[e]=new Nx.Connector[c](e)
}}}if(b[e]){f.attachConnector(b[e]);
b[e].registerComponent(f,g)
}}}})
})(Nx.$);
(function(a){Nx.Module=Class.extend({init:function(c,b,d){this.$ctx=c;
this.modId=d;
this.connectors=[];
this.dependencyCounter={beforeBinding:0,onBinding:1,afterBinding:0};
this.sandbox=b
},start:function(){var b=this;
if(this.dependencies){this.dependencyCounter.beforeBinding++;
this.dependencies();
this.dependencyCounter.beforeBinding--
}this.checkDependencies("beforeBinding",function(){b.initBeforeBinding()
})
},stop:function(){var b=this.$ctx;
a("*",b).unbind().removeData();
b.unbind().removeData()
},initBeforeBinding:function(){var b=this;
if(this.beforeBinding){this.beforeBinding(function(){b.beforeBindingCallback()
})
}else{this.beforeBindingCallback()
}},beforeBindingCallback:function(){var b=this;
this.dependencyCounter.onBinding--;
this.checkDependencies("onBinding",function(){b.initOnBinding()
})
},initOnBinding:function(){var b=this;
if(this.onBinding){this.onBinding()
}this.checkDependencies("afterBinding",function(){b.initAfterBinding()
})
},initAfterBinding:function(){var b=this;
this.sandbox.readyForAfterBinding(function(){if(b.afterBinding){b.afterBinding()
}})
},checkDependencies:function(b,c){if(this.dependencyCounter[b]===0){c()
}},require:function(c,d,b,e){d=d||"plugin";
b=b||"onBinding";
e=e===false?false:true;
this.dependencyCounter[b]++;
var f=a.proxy(function(){if(e){var g=this;
this.dependencyCounter[b]--;
this.checkDependencies(b,function(){g["init"+Nx.Utils.String.capitalize(b)]()
})
}},this.sandbox.getModuleById(this.modId));
this.sandbox.loadDependency(c,d,f,b)
},fire:function(f,e,c){var d=this,b=this.connectors;
e=e||{};
f=Nx.Utils.String.capitalize(f);
a.each(b,function(){var g=this;
var h=function(){if(typeof c=="function"){c()
}g.notify(d,"after"+f,e)
};
if(g.notify(d,"on"+f,e,h)){h()
}});
if(b.length<1){if(typeof c=="function"){c()
}}},attachConnector:function(b){this.connectors.push(b)
},getDecoratedModule:function(c,d){if(Nx.Module[c][d]){var b=Nx.Module[c][d];
b.prototype=this;
b.prototype.constructor=Nx.Module[c][d];
return new b(this)
}else{return null
}}})
})(Nx.$);
(function(a){Nx.Connector=Class.extend({init:function(b){this.connectorId=b;
this.components=[]
},registerComponent:function(b,c){c=c||"standard";
this.components.push({component:b,role:c})
},unregisterComponent:function(b){var c=this.components;
for(var d in c){if(c[d].component===b){delete c[d]
}}},notify:function(b,f,e,h){var d=true,c=this.components;
for(var g in c){if(c[g].component!==b&&c[g].component[f]){if(c[g].component[f](e,h)===false){d=false
}}}return d
}})
})(Nx.$);
(function(a){Nx.Connector.MasterSlave=Nx.Connector.extend({init:function(b){this._super(b)
},notify:function(b,e,d,g){var c=true,f;
for(f in this.components){if(this.components[f].component.modId===b.modId&&this.components[f].role==="Master"){for(f in this.components){if(this.components[f].component.modId!==b.modId&&this.components[f].component[e]){if(this.components[f].component[e](d,g)===false){c=false
}}}}}return c
}})
})(Nx.$);
(function(a){Nx.Sandbox=Class.extend({init:function(c,b){this.application=c;
this.config=b;
this.dependencies=[];
this.afterBindingCallbacks=[]
},addModules:function(d){var c=[],b=this.application;
if(d){a(".mod[data-lazyinit=true]",d).removeAttr("data-lazyinit");
c=b.registerModules(d);
b.start(c)
}return c
},removeModules:function(c){var b=this.application;
if(c){b.stop(c);
b.unregisterModules(c)
}},getModuleById:function(c){var b=this.application;
if(b.modules[c]!==undefined){return b.modules[c]
}else{throw new Error("the module with the id "+c+" does not exist")
}},getConfig:function(){return this.config
},getConfigParam:function(c){var b=this.config;
if(b.name!==undefined){return b.name
}else{throw new Error("the config param "+c+" does not exist")
}},loadDependency:function(c,d,g,b){var e=this;
b=b||"none";
d=d||"plugin";
if(e.dependencies[c]&&e.dependencies[c].state==="requested"){e.dependencies[c].callbacks.push(function(){g(b)
})
}else{if(e.dependencies[c]&&e.dependencies[c].state==="loaded"){g(b)
}else{e.dependencies[c]={state:"requested",callbacks:[]};
var f;
switch(d){case"library":case"plugin":case"util":f=this.config.dependencyPath[d];
break;
case"url":f="";
break;
case"default":break
}a.ajax({url:""+f+c,dataType:"script",cache:true,success:function(){e.dependencies[c].state="loaded";
g(b);
var j=e.dependencies[c].callbacks;
for(var h=0;
h<j.length;
h++){j[h]()
}},error:function(){}})
}}},readyForAfterBinding:function(d){var b=this.afterBindingCallbacks;
b.push(d);
if(this.application.modules.length==b.length){for(var c=0;
c<b.length;
c++){b[c]()
}}}})
})(Nx.$);
Nx.Utils={};
(function(a){Nx.Utils.String={capitalize:function(b){return b.substr(0,1).toUpperCase().concat(b.substr(1))
}}
})(Nx.$);
new function(e){var d=e.separator||"&";
var c=e.spaces===false?false:true;
var a=e.suffix===false?"":"[]";
var g=e.prefix===false?false:true;
var b=g?e.hash===true?"#":"?":"";
var f=e.numbers===false?false:true;
jQuery.query=new function(){var h=function(m,l){return m!=undefined&&m!==null&&(!!l?m.constructor==l:true)
};
var i=function(t){var l,s=/\[([^[]*)\]/g,o=/^([^[]+)(\[.*\])?$/.exec(t),q=o[1],r=[];
while(l=s.exec(o[2])){r.push(l[1])
}return[q,r]
};
var k=function(u,t,s){var v,r=t.shift();
if(typeof u!="object"){u=null
}if(r===""){if(!u){u=[]
}if(h(u,Array)){u.push(t.length==0?s:k(null,t.slice(0),s))
}else{if(h(u,Object)){var q=0;
while(u[q++]!=null){}u[--q]=t.length==0?s:k(u[q],t.slice(0),s)
}else{u=[];
u.push(t.length==0?s:k(null,t.slice(0),s))
}}}else{if(r&&r.match(/^\s*[0-9]+\s*$/)){var m=parseInt(r,10);
if(!u){u=[]
}u[m]=t.length==0?s:k(u[m],t.slice(0),s)
}else{if(r){var m=r.replace(/^\s*|\s*$/g,"");
if(!u){u={}
}if(h(u,Array)){var l={};
for(var q=0;
q<u.length;
++q){l[q]=u[q]
}u=l
}u[m]=t.length==0?s:k(u[m],t.slice(0),s)
}else{return s
}}}return u
};
var j=function(l){var m=this;
m.keys={};
if(l.queryObject){jQuery.each(l.get(),function(o,q){m.SET(o,q)
})
}else{jQuery.each(arguments,function(){var o=""+this;
o=o.replace(/^[?#]/,"");
o=o.replace(/[;&]$/,"");
if(c){o=o.replace(/[+]/g," ")
}jQuery.each(o.split(/[&;]/),function(){var q=decodeURIComponent(this.split("=")[0]||"");
var r=decodeURIComponent(this.split("=")[1]||"");
if(!q){return
}if(f){if(/^[+-]?[0-9]+\.[0-9]*$/.test(r)){r=parseFloat(r)
}else{if(/^[+-]?[0-9]+$/.test(r)){r=parseInt(r,10)
}}}r=(!r&&r!==0)?true:r;
if(r!==false&&r!==true&&typeof r!="number"){r=r
}m.SET(q,r)
})
})
}return m
};
j.prototype={queryObject:true,has:function(l,m){var o=this.get(l);
return h(o,m)
},GET:function(m){if(!h(m)){return this.keys
}var l=i(m),o=l[0],r=l[1];
var q=this.keys[o];
while(q!=null&&r.length!=0){q=q[r.shift()]
}return typeof q=="number"?q:q||""
},get:function(l){var m=this.GET(l);
if(h(m,Object)){return jQuery.extend(true,{},m)
}else{if(h(m,Array)){return m.slice(0)
}}return m
},SET:function(m,t){var q=!h(t)?null:t;
var l=i(m),o=l[0],s=l[1];
var r=this.keys[o];
this.keys[o]=k(r,s.slice(0),q);
return this
},set:function(l,m){return this.copy().SET(l,m)
},REMOVE:function(l){return this.SET(l,null).COMPACT()
},remove:function(l){return this.copy().REMOVE(l)
},EMPTY:function(){var l=this;
jQuery.each(l.keys,function(m,o){delete l.keys[m]
});
return l
},load:function(l){var o=l.replace(/^.*?[#](.+?)(?:\?.+)?$/,"$1");
var m=l.replace(/^.*?[?](.+?)(?:#.+)?$/,"$1");
return new j(l.length==m.length?"":m,l.length==o.length?"":o)
},empty:function(){return this.copy().EMPTY()
},copy:function(){return new j(this)
},COMPACT:function(){function l(q){var o=typeof q=="object"?h(q,Array)?[]:{}:q;
if(typeof q=="object"){function m(t,r,s){if(h(t,Array)){t.push(s)
}else{t[r]=s
}}jQuery.each(q,function(r,s){if(!h(s)){return true
}m(o,r,l(s))
})
}return o
}this.keys=l(this.keys);
return this
},compact:function(){return this.copy().COMPACT()
},toString:function(){var o=0,t=[],s=[],m=this;
var q=function(u){u=u+"";
if(c){u=u.replace(/ /g,"+")
}return encodeURIComponent(u)
};
var l=function(u,v,w){if(!h(w)||w===false){return
}var x=[q(v)];
if(w!==true){x.push("=");
x.push(q(w))
}u.push(x.join(""))
};
var r=function(v,u){var w=function(x){return !u||u==""?[x].join(""):[u,"[",x,"]"].join("")
};
jQuery.each(v,function(x,y){if(typeof y=="object"){r(y,w(x))
}else{l(s,w(x),y)
}})
};
r(this.keys);
if(s.length>0){t.push(b)
}t.push(s.join(d));
return t.join("")
}};
return new j(location.search,location.hash)
}
}(jQuery.query||{});
(function(b){b.fn.ajaxSubmit=function(t){if(!this.length){a("ajaxSubmit: skipping submit process - no element selected");
return this
}if(typeof t=="function"){t={success:t}
}var e=b.trim(this.attr("action"));
if(e){e=(e.match(/^([^#]+)/)||[])[1]
}e=e||window.location.href||"";
t=b.extend({url:e,type:this.attr("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t||{});
var v={};
this.trigger("form-pre-serialize",[this,t,v]);
if(v.veto){a("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
return this
}if(t.beforeSerialize&&t.beforeSerialize(this,t)===false){a("ajaxSubmit: submit aborted via beforeSerialize callback");
return this
}var m=this.formToArray(t.semantic);
if(t.data){t.extraData=t.data;
for(var f in t.data){if(t.data[f] instanceof Array){for(var g in t.data[f]){m.push({name:f,value:t.data[f][g]})
}}else{m.push({name:f,value:t.data[f]})
}}}if(t.beforeSubmit&&t.beforeSubmit(m,this,t)===false){a("ajaxSubmit: submit aborted via beforeSubmit callback");
return this
}this.trigger("form-submit-validate",[m,this,t,v]);
if(v.veto){a("ajaxSubmit: submit vetoed via form-submit-validate trigger");
return this
}var d=b.param(m);
if(t.type.toUpperCase()=="GET"){t.url+=(t.url.indexOf("?")>=0?"&":"?")+d;
t.data=null
}else{t.data=d
}var u=this,l=[];
if(t.resetForm){l.push(function(){u.resetForm()
})
}if(t.clearForm){l.push(function(){u.clearForm()
})
}if(!t.dataType&&t.target){var r=t.success||function(){};
l.push(function(j){b(t.target).html(j).each(r,arguments)
})
}else{if(t.success){l.push(t.success)
}}t.success=function(w,k){for(var q=0,j=l.length;
q<j;
q++){l[q].apply(t,[w,k,u])
}};
var c=b("input:file",this).fieldValue();
var s=false;
for(var i=0;
i<c.length;
i++){if(c[i]){s=true
}}var h=false;
if((c.length&&t.iframe!==false)||t.iframe||s||h){if(t.closeKeepAlive){b.get(t.closeKeepAlive,o)
}else{o()
}}else{b.ajax(t)
}this.trigger("form-submit-notify",[this,t]);
return this;
function o(){var x=u[0];
if(b(":input[name=submit]",x).length){alert('Error: Form elements must not be named "submit".');
return
}var q=b.extend({},b.ajaxSettings,t);
var H=b.extend(true,{},b.extend(true,{},b.ajaxSettings),q);
var w="jqFormIO"+(new Date().getTime());
var D=b('<iframe id="'+w+'" name="'+w+'" src="'+q.iframeSrc+'" />');
var F=D[0];
D.css({position:"absolute",top:"-1000px",left:"-1000px"});
var G={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(){this.aborted=1;
D.attr("src",q.iframeSrc)
}};
var E=q.global;
if(E&&!b.active++){b.event.trigger("ajaxStart")
}if(E){b.event.trigger("ajaxSend",[G,q])
}if(H.beforeSend&&H.beforeSend(G,H)===false){H.global&&b.active--;
return
}if(G.aborted){return
}var k=0;
var A=0;
var j=x.clk;
if(j){var y=j.name;
if(y&&!j.disabled){t.extraData=t.extraData||{};
t.extraData[y]=j.value;
if(j.type=="image"){t.extraData[name+".x"]=x.clk_x;
t.extraData[name+".y"]=x.clk_y
}}}setTimeout(function(){var K=u.attr("target"),I=u.attr("action");
x.setAttribute("target",w);
if(x.getAttribute("method")!="POST"){x.setAttribute("method","POST")
}if(x.getAttribute("action")!=q.url){x.setAttribute("action",q.url)
}if(!t.skipEncodingOverride){u.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"})
}if(q.timeout){setTimeout(function(){A=true;
B()
},q.timeout)
}var J=[];
try{if(t.extraData){for(var L in t.extraData){J.push(b('<input type="hidden" name="'+L+'" value="'+t.extraData[L]+'" />').appendTo(x)[0])
}}D.appendTo("body");
F.attachEvent?F.attachEvent("onload",B):F.addEventListener("load",B,false);
x.submit()
}finally{x.setAttribute("action",I);
K?x.setAttribute("target",K):u.removeAttr("target");
b(J).remove()
}},10);
var z=50;
function B(){if(k++){return
}F.detachEvent?F.detachEvent("onload",B):F.removeEventListener("load",B,false);
var J=true;
try{if(A){throw"timeout"
}var K,N;
N=F.contentWindow?F.contentWindow.document:F.contentDocument?F.contentDocument:F.document;
var O=q.dataType=="xml"||N.XMLDocument||b.isXMLDoc(N);
a("isXml="+O);
if(!O&&(N.body==null||N.body.innerHTML=="")){if(--z){k=0;
setTimeout(B,100);
return
}a("Could not access iframe DOM after 50 tries.");
return
}G.responseText=N.body?N.body.innerHTML:null;
G.responseXML=N.XMLDocument?N.XMLDocument:N;
G.getResponseHeader=function(Q){var P={"content-type":q.dataType};
return P[Q]
};
if(q.dataType=="json"||q.dataType=="script"){var I=N.getElementsByTagName("textarea")[0];
if(I){G.responseText=I.value
}else{var M=N.getElementsByTagName("pre")[0];
if(M){G.responseText=M.innerHTML
}}}else{if(q.dataType=="xml"&&!G.responseXML&&G.responseText!=null){G.responseXML=C(G.responseText)
}}K=b.httpData(G,q.dataType)
}catch(L){J=false;
b.handleError(q,G,"error",L)
}if(J){q.success(K,"success");
if(E){b.event.trigger("ajaxSuccess",[G,q])
}}if(E){b.event.trigger("ajaxComplete",[G,q])
}if(E&&!--b.active){b.event.trigger("ajaxStop")
}if(q.complete){q.complete(G,J?"success":"error")
}setTimeout(function(){D.remove();
G.responseXML=null
},100)
}function C(I,J){if(window.ActiveXObject){J=new ActiveXObject("Microsoft.XMLDOM");
J.async="false";
J.loadXML(I)
}else{J=(new DOMParser()).parseFromString(I,"text/xml")
}return(J&&J.documentElement&&J.documentElement.tagName!="parsererror")?J:null
}}};
b.fn.ajaxForm=function(c){return this.ajaxFormUnbind().bind("submit.form-plugin",function(){b(this).ajaxSubmit(c);
return false
}).bind("click.form-plugin",function(i){var h=i.target;
var f=b(h);
if(!(f.is(":submit,input:image"))){var d=f.closest(":submit");
if(d.length==0){return
}h=d[0]
}var g=this;
g.clk=h;
if(h.type=="image"){if(i.offsetX!=undefined){g.clk_x=i.offsetX;
g.clk_y=i.offsetY
}else{if(typeof b.fn.offset=="function"){var j=f.offset();
g.clk_x=i.pageX-j.left;
g.clk_y=i.pageY-j.top
}else{g.clk_x=i.pageX-h.offsetLeft;
g.clk_y=i.pageY-h.offsetTop
}}}setTimeout(function(){g.clk=g.clk_x=g.clk_y=null
},100)
})
};
b.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")
};
b.fn.formToArray=function(r){var q=[];
if(this.length==0){return q
}var d=this[0];
var h=r?d.getElementsByTagName("*"):d.elements;
if(!h){return q
}for(var k=0,m=h.length;
k<m;
k++){var e=h[k];
var f=e.name;
if(!f){continue
}if(r&&d.clk&&e.type=="image"){if(!e.disabled&&d.clk==e){q.push({name:f,value:b(e).val()});
q.push({name:f+".x",value:d.clk_x},{name:f+".y",value:d.clk_y})
}continue
}var s=b.fieldValue(e,true);
if(s&&s.constructor==Array){for(var g=0,c=s.length;
g<c;
g++){q.push({name:f,value:s[g]})
}}else{if(s!==null&&typeof s!="undefined"){q.push({name:f,value:s})
}}}if(!r&&d.clk){var l=b(d.clk),o=l[0],f=o.name;
if(f&&!o.disabled&&o.type=="image"){q.push({name:f,value:l.val()});
q.push({name:f+".x",value:d.clk_x},{name:f+".y",value:d.clk_y})
}}return q
};
b.fn.formSerialize=function(c){return b.param(this.formToArray(c))
};
b.fn.fieldSerialize=function(d){var c=[];
this.each(function(){var h=this.name;
if(!h){return
}var f=b.fieldValue(this,d);
if(f&&f.constructor==Array){for(var g=0,e=f.length;
g<e;
g++){c.push({name:h,value:f[g]})
}}else{if(f!==null&&typeof f!="undefined"){c.push({name:this.name,value:f})
}}});
return b.param(c)
};
b.fn.fieldValue=function(h){for(var g=[],e=0,c=this.length;
e<c;
e++){var f=this[e];
var d=b.fieldValue(f,h);
if(d===null||typeof d=="undefined"||(d.constructor==Array&&!d.length)){continue
}d.constructor==Array?b.merge(g,d):g.push(d)
}return g
};
b.fieldValue=function(c,j){var e=c.name,q=c.type,r=c.tagName.toLowerCase();
if(typeof j=="undefined"){j=true
}if(j&&(!e||c.disabled||q=="reset"||q=="button"||(q=="checkbox"||q=="radio")&&!c.checked||(q=="submit"||q=="image")&&c.form&&c.form.clk!=c||r=="select"&&c.selectedIndex==-1)){return null
}if(r=="select"){var k=c.selectedIndex;
if(k<0){return null
}var m=[],d=c.options;
var g=(q=="select-one");
var l=(g?k+1:d.length);
for(var f=(g?k:0);
f<l;
f++){var h=d[f];
if(h.selected){var o=h.value;
if(!o){o=(h.attributes&&h.attributes.value&&!(h.attributes.value.specified))?h.text:h.value
}if(g){return o
}m.push(o)
}}return m
}return c.value
};
b.fn.clearForm=function(){return this.each(function(){b("input,select,textarea",this).clearFields()
})
};
b.fn.clearFields=b.fn.clearInputs=function(){return this.each(function(){var d=this.type,c=this.tagName.toLowerCase();
if(d=="text"||d=="password"||c=="textarea"){this.value=""
}else{if(d=="checkbox"||d=="radio"){this.checked=false
}else{if(c=="select"){this.selectedIndex=-1
}}}})
};
b.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){this.reset()
}})
};
b.fn.enable=function(c){if(c==undefined){c=true
}return this.each(function(){this.disabled=!c
})
};
b.fn.selected=function(c){if(c==undefined){c=true
}return this.each(function(){var d=this.type;
if(d=="checkbox"||d=="radio"){this.checked=c
}else{if(this.tagName.toLowerCase()=="option"){var e=b(this).parent("select");
if(c&&e[0]&&e[0].type=="select-one"){e.find("option").selected(false)
}this.selected=c
}}})
};
function a(){if(b.fn.ajaxSubmit.debug&&window.console&&window.console.log){window.console.log("[jquery.form] "+Array.prototype.join.call(arguments,""))
}}})(jQuery);
(function(c){var a={};
if(c.ajaxPrefilter){c.ajaxPrefilter(function(f,e,g){var d=f.port;
if(f.mode=="abort"){if(a[d]){a[d].abort()
}a[d]=g
}})
}else{var b=c.ajax;
c.ajax=function(e){var f=("mode" in e?e:c.ajaxSettings).mode,d=("port" in e?e:c.ajaxSettings).port;
if(f=="abort"){if(a[d]){a[d].abort()
}return(a[d]=b.apply(this,arguments))
}return b.apply(this,arguments)
}
}})(jQuery);
(function(a){if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){a.each({focus:"focusin",blur:"focusout"},function(c,b){a.event.special[b]={setup:function(){this.addEventListener(c,d,true)
},teardown:function(){this.removeEventListener(c,d,true)
},handler:function(f){arguments[0]=a.event.fix(f);
arguments[0].type=b;
return a.event.handle.apply(this,arguments)
}};
function d(f){f=a.event.fix(f);
f.type=b;
return a.event.handle.call(this,f)
}})
}a.extend(a.fn,{validateDelegate:function(d,c,b){return this.bind(c,function(e){var f=a(e.target);
if(f.is(d)){return b.apply(f,arguments)
}})
}})
})(jQuery);
(function($){$.extend({metadata:{defaults:{type:"class",name:"metadata",cre:/({.*})/,single:"metadata"},setType:function(type,name){this.defaults.type=type;
this.defaults.name=name
},get:function(elem,opts){var settings=$.extend({},this.defaults,opts);
if(!settings.single.length){settings.single="metadata"
}var data=$.data(elem,settings.single);
if(data){return data
}data="{}";
if(settings.type=="class"){var m=settings.cre.exec(elem.className);
if(m){data=m[1]
}}else{if(settings.type=="elem"){if(!elem.getElementsByTagName){return undefined
}var e=elem.getElementsByTagName(settings.name);
if(e.length){data=$.trim(e[0].innerHTML)
}}else{if(elem.getAttribute!=undefined){var attr=elem.getAttribute(settings.name);
if(attr){data=attr
}}}}if(data.indexOf("{")<0){data="{"+data+"}"
}data=eval("("+data+")");
$.data(elem,settings.single,data);
return data
}}});
$.fn.metadata=function(opts){return $.metadata.get(this[0],opts)
}
})(jQuery);
/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2009 M. Alsup
 * Version: 2.74 (03-FEB-2010)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.2.6 or later
 */
;
(function(i){var l="2.74";
if(i.support==undefined){i.support={opacity:!(i.browser.msie)}
}function a(r){if(i.fn.cycle.debug){f(r)
}}function f(){if(window.console&&window.console.log){window.console.log("[cycle] "+Array.prototype.join.call(arguments," "))
}}i.fn.cycle=function(s,r){var t={s:this.selector,c:this.context};
if(this.length===0&&s!="stop"){if(!i.isReady&&t.s){f("DOM not ready, queuing slideshow");
i(function(){i(t.s,t.c).cycle(s,r)
});
return this
}f("terminating; zero elements found by selector"+(i.isReady?"":" (DOM not ready)"));
return this
}return this.each(function(){var x=m(this,s,r);
if(x===false){return
}if(this.cycleTimeout){clearTimeout(this.cycleTimeout)
}this.cycleTimeout=this.cyclePause=0;
var y=i(this);
var z=x.slideExpr?i(x.slideExpr,this):y.children();
var v=z.get();
if(v.length<2){f("terminating; too few slides: "+v.length);
return
}var u=k(y,z,v,x,t);
if(u===false){return
}var w=u.continuous?10:h(u.currSlide,u.nextSlide,u,!u.rev);
if(w){w+=(u.delay||0);
if(w<10){w=10
}a("first timeout: "+w);
this.cycleTimeout=setTimeout(function(){e(v,u,0,!u.rev)
},w)
}})
};
function m(r,u,s){if(r.cycleStop==undefined){r.cycleStop=0
}if(u===undefined||u===null){u={}
}if(u.constructor==String){switch(u){case"stop":r.cycleStop++;
if(r.cycleTimeout){clearTimeout(r.cycleTimeout)
}r.cycleTimeout=0;
i(r).removeData("cycle.opts");
return false;
case"toggle":r.cyclePause=(r.cyclePause===1)?0:1;
return false;
case"pause":r.cyclePause=1;
return false;
case"resume":r.cyclePause=0;
if(s===true){u=i(r).data("cycle.opts");
if(!u){f("options not found, can not resume");
return false
}if(r.cycleTimeout){clearTimeout(r.cycleTimeout);
r.cycleTimeout=0
}e(u.elements,u,1,1)
}return false;
case"prev":case"next":var v=i(r).data("cycle.opts");
if(!v){f('options not found, "prev/next" ignored');
return false
}i.fn.cycle[u](v);
return false;
default:u={fx:u}
}return u
}else{if(u.constructor==Number){var t=u;
u=i(r).data("cycle.opts");
if(!u){f("options not found, can not advance slide");
return false
}if(t<0||t>=u.elements.length){f("invalid slide index: "+t);
return false
}u.nextSlide=t;
if(r.cycleTimeout){clearTimeout(r.cycleTimeout);
r.cycleTimeout=0
}if(typeof s=="string"){u.oneTimeFx=s
}e(u.elements,u,1,t>=u.currSlide);
return false
}}return u
}function b(r,s){if(!i.support.opacity&&s.cleartype&&r.style.filter){try{r.style.removeAttribute("filter")
}catch(t){}}}function k(z,K,v,u,F){var D=i.extend({},i.fn.cycle.defaults,u||{},i.metadata?z.metadata():i.meta?z.data():{});
if(D.autostop){D.countdown=D.autostopCount||v.length
}var s=z[0];
z.data("cycle.opts",D);
D.$cont=z;
D.stopCount=s.cycleStop;
D.elements=v;
D.before=D.before?[D.before]:[];
D.after=D.after?[D.after]:[];
D.after.unshift(function(){D.busy=0
});
if(!i.support.opacity&&D.cleartype){D.after.push(function(){b(this,D)
})
}if(D.continuous){D.after.push(function(){e(v,D,0,!D.rev)
})
}o(D);
if(!i.support.opacity&&D.cleartype&&!D.cleartypeNoBg){g(K)
}if(z.css("position")=="static"){z.css("position","relative")
}if(D.width){z.width(D.width)
}if(D.height&&D.height!="auto"){z.height(D.height)
}if(D.startingSlide){D.startingSlide=parseInt(D.startingSlide)
}if(D.random){D.randomMap=[];
for(var I=0;
I<v.length;
I++){D.randomMap.push(I)
}D.randomMap.sort(function(M,w){return Math.random()-0.5
});
D.randomIndex=0;
D.startingSlide=D.randomMap[0]
}else{if(D.startingSlide>=v.length){D.startingSlide=0
}}D.currSlide=D.startingSlide=D.startingSlide||0;
var y=D.startingSlide;
K.css({position:"absolute",top:0,left:0}).hide().each(function(w){var M=y?w>=y?v.length-(w-y):y-w:v.length-w;
i(this).css("z-index",M)
});
i(v[y]).css("opacity",1).show();
b(v[y],D);
if(D.fit&&D.width){K.width(D.width)
}if(D.fit&&D.height&&D.height!="auto"){K.height(D.height)
}var E=D.containerResize&&!z.innerHeight();
if(E){var x=0,C=0;
for(var G=0;
G<v.length;
G++){var r=i(v[G]),L=r[0],B=r.outerWidth(),J=r.outerHeight();
if(!B){B=L.offsetWidth
}if(!J){J=L.offsetHeight
}x=B>x?B:x;
C=J>C?J:C
}if(x>0&&C>0){z.css({width:x+"px",height:C+"px"})
}}if(D.pause){z.hover(function(){this.cyclePause++
},function(){this.cyclePause--
})
}if(c(D)===false){return false
}var t=false;
u.requeueAttempts=u.requeueAttempts||0;
K.each(function(){var O=i(this);
this.cycleH=(D.fit&&D.height)?D.height:O.height();
this.cycleW=(D.fit&&D.width)?D.width:O.width();
if(O.is("img")){var M=(i.browser.msie&&this.cycleW==28&&this.cycleH==30&&!this.complete);
var P=(i.browser.mozilla&&this.cycleW==34&&this.cycleH==19&&!this.complete);
var N=(i.browser.opera&&((this.cycleW==42&&this.cycleH==19)||(this.cycleW==37&&this.cycleH==17))&&!this.complete);
var w=(this.cycleH==0&&this.cycleW==0&&!this.complete);
if(M||P||N||w){if(F.s&&D.requeueOnImageNotLoaded&&++u.requeueAttempts<100){f(u.requeueAttempts," - img slide not loaded, requeuing slideshow: ",this.src,this.cycleW,this.cycleH);
setTimeout(function(){i(F.s,F.c).cycle(u)
},D.requeueTimeout);
t=true;
return false
}else{f("could not determine size of image: "+this.src,this.cycleW,this.cycleH)
}}}return true
});
if(t){return false
}D.cssBefore=D.cssBefore||{};
D.animIn=D.animIn||{};
D.animOut=D.animOut||{};
K.not(":eq("+y+")").css(D.cssBefore);
if(D.cssFirst){i(K[y]).css(D.cssFirst)
}if(D.timeout){D.timeout=parseInt(D.timeout);
if(D.speed.constructor==String){D.speed=i.fx.speeds[D.speed]||parseInt(D.speed)
}if(!D.sync){D.speed=D.speed/2
}while((D.timeout-D.speed)<250){D.timeout+=D.speed
}}if(D.easing){D.easeIn=D.easeOut=D.easing
}if(!D.speedIn){D.speedIn=D.speed
}if(!D.speedOut){D.speedOut=D.speed
}D.slideCount=v.length;
D.currSlide=D.lastSlide=y;
if(D.random){D.nextSlide=D.currSlide;
if(++D.randomIndex==v.length){D.randomIndex=0
}D.nextSlide=D.randomMap[D.randomIndex]
}else{D.nextSlide=D.startingSlide>=(v.length-1)?0:D.startingSlide+1
}if(!D.multiFx){var H=i.fn.cycle.transitions[D.fx];
if(i.isFunction(H)){H(z,K,D)
}else{if(D.fx!="custom"&&!D.multiFx){f("unknown transition: "+D.fx,"; slideshow terminating");
return false
}}}var A=K[y];
if(D.before.length){D.before[0].apply(A,[A,A,D,true])
}if(D.after.length>1){D.after[1].apply(A,[A,A,D,true])
}if(D.next){i(D.next).bind(D.prevNextEvent,function(){return q(D,D.rev?-1:1)
})
}if(D.prev){i(D.prev).bind(D.prevNextEvent,function(){return q(D,D.rev?1:-1)
})
}if(D.pager){d(v,D)
}j(D,v);
return D
}function o(r){r.original={before:[],after:[]};
r.original.cssBefore=i.extend({},r.cssBefore);
r.original.cssAfter=i.extend({},r.cssAfter);
r.original.animIn=i.extend({},r.animIn);
r.original.animOut=i.extend({},r.animOut);
i.each(r.before,function(){r.original.before.push(this)
});
i.each(r.after,function(){r.original.after.push(this)
})
}function c(x){var v,t,s=i.fn.cycle.transitions;
if(x.fx.indexOf(",")>0){x.multiFx=true;
x.fxs=x.fx.replace(/\s*/g,"").split(",");
for(v=0;
v<x.fxs.length;
v++){var w=x.fxs[v];
t=s[w];
if(!t||!s.hasOwnProperty(w)||!i.isFunction(t)){f("discarding unknown transition: ",w);
x.fxs.splice(v,1);
v--
}}if(!x.fxs.length){f("No valid transitions named; slideshow terminating.");
return false
}}else{if(x.fx=="all"){x.multiFx=true;
x.fxs=[];
for(p in s){t=s[p];
if(s.hasOwnProperty(p)&&i.isFunction(t)){x.fxs.push(p)
}}}}if(x.multiFx&&x.randomizeEffects){var u=Math.floor(Math.random()*20)+30;
for(v=0;
v<u;
v++){var r=Math.floor(Math.random()*x.fxs.length);
x.fxs.push(x.fxs.splice(r,1)[0])
}a("randomized fx sequence: ",x.fxs)
}return true
}function j(s,r){s.addSlide=function(u,v){var t=i(u),w=t[0];
if(!s.autostopCount){s.countdown++
}r[v?"unshift":"push"](w);
if(s.els){s.els[v?"unshift":"push"](w)
}s.slideCount=r.length;
t.css("position","absolute");
t[v?"prependTo":"appendTo"](s.$cont);
if(v){s.currSlide++;
s.nextSlide++
}if(!i.support.opacity&&s.cleartype&&!s.cleartypeNoBg){g(t)
}if(s.fit&&s.width){t.width(s.width)
}if(s.fit&&s.height&&s.height!="auto"){$slides.height(s.height)
}w.cycleH=(s.fit&&s.height)?s.height:t.height();
w.cycleW=(s.fit&&s.width)?s.width:t.width();
t.css(s.cssBefore);
if(s.pager){i.fn.cycle.createPagerAnchor(r.length-1,w,i(s.pager),r,s)
}if(i.isFunction(s.onAddSlide)){s.onAddSlide(t)
}else{t.hide()
}}
}i.fn.cycle.resetState=function(s,r){r=r||s.fx;
s.before=[];
s.after=[];
s.cssBefore=i.extend({},s.original.cssBefore);
s.cssAfter=i.extend({},s.original.cssAfter);
s.animIn=i.extend({},s.original.animIn);
s.animOut=i.extend({},s.original.animOut);
s.fxFn=null;
i.each(s.original.before,function(){s.before.push(this)
});
i.each(s.original.after,function(){s.after.push(this)
});
var t=i.fn.cycle.transitions[r];
if(i.isFunction(t)){t(s.$cont,i(s.elements),s)
}};
function e(y,r,x,z){if(x&&r.busy&&r.manualTrump){i(y).stop(true,true);
r.busy=false
}if(r.busy){return
}var v=r.$cont[0],B=y[r.currSlide],A=y[r.nextSlide];
if(v.cycleStop!=r.stopCount||v.cycleTimeout===0&&!x){return
}if(!x&&!v.cyclePause&&((r.autostop&&(--r.countdown<=0))||(r.nowrap&&!r.random&&r.nextSlide<r.currSlide))){if(r.end){r.end(r)
}return
}if(x||!v.cyclePause){var w=r.fx;
B.cycleH=B.cycleH||i(B).height();
B.cycleW=B.cycleW||i(B).width();
A.cycleH=A.cycleH||i(A).height();
A.cycleW=A.cycleW||i(A).width();
if(r.multiFx){if(r.lastFx==undefined||++r.lastFx>=r.fxs.length){r.lastFx=0
}w=r.fxs[r.lastFx];
r.currFx=w
}if(r.oneTimeFx){w=r.oneTimeFx;
r.oneTimeFx=null
}i.fn.cycle.resetState(r,w);
if(r.before.length){i.each(r.before,function(C,D){if(v.cycleStop!=r.stopCount){return
}D.apply(A,[B,A,r,z])
})
}var t=function(){i.each(r.after,function(C,D){if(v.cycleStop!=r.stopCount){return
}D.apply(A,[B,A,r,z])
})
};
if(r.nextSlide!=r.currSlide){r.busy=1;
if(r.fxFn){r.fxFn(B,A,r,t,z)
}else{if(i.isFunction(i.fn.cycle[r.fx])){i.fn.cycle[r.fx](B,A,r,t)
}else{i.fn.cycle.custom(B,A,r,t,x&&r.fastOnEvent)
}}}r.lastSlide=r.currSlide;
if(r.random){r.currSlide=r.nextSlide;
if(++r.randomIndex==y.length){r.randomIndex=0
}r.nextSlide=r.randomMap[r.randomIndex]
}else{var u=(r.nextSlide+1)==y.length;
r.nextSlide=u?0:r.nextSlide+1;
r.currSlide=u?y.length-1:r.nextSlide-1
}if(r.pager){i.fn.cycle.updateActivePagerLink(r.pager,r.currSlide)
}}var s=0;
if(r.timeout&&!r.continuous){s=h(B,A,r,z)
}else{if(r.continuous&&v.cyclePause){s=10
}}if(s>0){v.cycleTimeout=setTimeout(function(){e(y,r,0,!r.rev)
},s)
}}i.fn.cycle.updateActivePagerLink=function(r,s){i(r).each(function(){i(this).find("a").removeClass("activeSlide").filter("a:eq("+s+")").addClass("activeSlide")
})
};
function h(w,u,v,s){if(v.timeoutFn){var r=v.timeoutFn(w,u,v,s);
while((r-v.speed)<250){r+=v.speed
}a("calculated timeout: "+r+"; speed: "+v.speed);
if(r!==false){return r
}}return v.timeout
}i.fn.cycle.next=function(r){q(r,r.rev?-1:1)
};
i.fn.cycle.prev=function(r){q(r,r.rev?1:-1)
};
function q(s,v){var r=s.elements;
var u=s.$cont[0],t=u.cycleTimeout;
if(t){clearTimeout(t);
u.cycleTimeout=0
}if(s.random&&v<0){s.randomIndex--;
if(--s.randomIndex==-2){s.randomIndex=r.length-2
}else{if(s.randomIndex==-1){s.randomIndex=r.length-1
}}s.nextSlide=s.randomMap[s.randomIndex]
}else{if(s.random){if(++s.randomIndex==r.length){s.randomIndex=0
}s.nextSlide=s.randomMap[s.randomIndex]
}else{s.nextSlide=s.currSlide+v;
if(s.nextSlide<0){if(s.nowrap){return false
}s.nextSlide=r.length-1
}else{if(s.nextSlide>=r.length){if(s.nowrap){return false
}s.nextSlide=0
}}}}if(i.isFunction(s.prevNextClick)){s.prevNextClick(v>0,s.nextSlide,r[s.nextSlide])
}e(r,s,1,v>=0);
return false
}function d(s,t){var r=i(t.pager);
i.each(s,function(u,v){i.fn.cycle.createPagerAnchor(u,v,r,s,t)
});
i.fn.cycle.updateActivePagerLink(t.pager,t.startingSlide)
}i.fn.cycle.createPagerAnchor=function(v,w,t,u,x){var s;
if(i.isFunction(x.pagerAnchorBuilder)){s=x.pagerAnchorBuilder(v,w)
}else{s='<a href="#">'+(v+1)+"</a>"
}if(!s){return
}var y=i(s);
if(y.parents("body").length===0){var r=[];
if(t.length>1){t.each(function(){var z=y.clone(true);
i(this).append(z);
r.push(z[0])
});
y=i(r)
}else{y.appendTo(t)
}}y.bind(x.pagerEvent,function(B){B.preventDefault();
x.nextSlide=v;
var A=x.$cont[0],z=A.cycleTimeout;
if(z){clearTimeout(z);
A.cycleTimeout=0
}if(i.isFunction(x.pagerClick)){x.pagerClick(x.nextSlide,u[x.nextSlide])
}e(u,x,1,x.currSlide<v);
return false
});
if(x.pagerEvent!="click"){y.click(function(){return false
})
}if(x.pauseOnPagerHover){y.hover(function(){x.$cont[0].cyclePause++
},function(){x.$cont[0].cyclePause--
})
}};
i.fn.cycle.hopsFromLast=function(u,t){var s,r=u.lastSlide,v=u.currSlide;
if(t){s=v>r?v-r:u.slideCount-r
}else{s=v<r?r-v:r+u.slideCount-v
}return s
};
function g(t){function s(u){u=parseInt(u).toString(16);
return u.length<2?"0"+u:u
}function r(x){for(;
x&&x.nodeName.toLowerCase()!="html";
x=x.parentNode){var u=i.css(x,"background-color");
if(u.indexOf("rgb")>=0){var w=u.match(/\d+/g);
return"#"+s(w[0])+s(w[1])+s(w[2])
}if(u&&u!="transparent"){return u
}}return"#ffffff"
}t.each(function(){i(this).css("background-color",r(this))
})
}i.fn.cycle.commonReset=function(x,u,v,s,t,r){i(v.elements).not(x).hide();
v.cssBefore.opacity=1;
v.cssBefore.display="block";
if(s!==false&&u.cycleW>0){v.cssBefore.width=u.cycleW
}if(t!==false&&u.cycleH>0){v.cssBefore.height=u.cycleH
}v.cssAfter=v.cssAfter||{};
v.cssAfter.display="none";
i(x).css("zIndex",v.slideCount+(r===true?1:0));
i(u).css("zIndex",v.slideCount+(r===true?0:1))
};
i.fn.cycle.custom=function(C,w,r,t,s){var B=i(C),x=i(w);
var u=r.speedIn,A=r.speedOut,v=r.easeIn,z=r.easeOut;
x.css(r.cssBefore);
if(s){if(typeof s=="number"){u=A=s
}else{u=A=1
}v=z=null
}var y=function(){x.animate(r.animIn,u,v,t)
};
B.animate(r.animOut,A,z,function(){if(r.cssAfter){B.css(r.cssAfter)
}if(!r.sync){y()
}});
if(r.sync){y()
}};
i.fn.cycle.transitions={fade:function(s,t,r){t.not(":eq("+r.currSlide+")").css("opacity",0);
r.before.push(function(w,u,v){i.fn.cycle.commonReset(w,u,v);
v.cssBefore.opacity=0
});
r.animIn={opacity:1};
r.animOut={opacity:0};
r.cssBefore={top:0,left:0}
}};
i.fn.cycle.ver=function(){return l
};
i.fn.cycle.defaults={fx:"fade",timeout:10000,timeoutFn:null,continuous:0,speed:3000,speedIn:null,speedOut:null,next:null,prev:null,prevNextClick:null,prevNextEvent:"click",pager:null,pagerClick:null,pagerEvent:"click",pagerAnchorBuilder:null,before:null,after:null,end:null,easing:null,easeIn:null,easeOut:null,shuffle:null,animIn:null,animOut:null,cssBefore:null,cssAfter:null,fxFn:null,height:"auto",startingSlide:0,sync:1,random:0,fit:0,containerResize:1,pause:0,pauseOnPagerHover:0,autostop:0,autostopCount:0,delay:0,slideExpr:null,cleartype:!i.support.opacity,cleartypeNoBg:false,nowrap:0,fastOnEvent:0,randomizeEffects:1,rev:0,manualTrump:true,requeueOnImageNotLoaded:true,requeueTimeout:250}
})(jQuery);
/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2008 M. Alsup
 * Version:	 2.72
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function(a){a.fn.cycle.transitions.none=function(c,d,b){b.fxFn=function(g,e,f,h){a(e).show();
a(g).hide();
h()
}
};
a.fn.cycle.transitions.scrollUp=function(d,e,c){d.css("overflow","hidden");
c.before.push(a.fn.cycle.commonReset);
var b=d.height();
c.cssBefore={top:b,left:0};
c.cssFirst={top:0};
c.animIn={top:0};
c.animOut={top:-b}
};
a.fn.cycle.transitions.scrollDown=function(d,e,c){d.css("overflow","hidden");
c.before.push(a.fn.cycle.commonReset);
var b=d.height();
c.cssFirst={top:0};
c.cssBefore={top:-b,left:0};
c.animIn={top:0};
c.animOut={top:b}
};
a.fn.cycle.transitions.scrollLeft=function(d,e,c){d.css("overflow","hidden");
c.before.push(a.fn.cycle.commonReset);
var b=d.width();
c.cssFirst={left:0};
c.cssBefore={left:b,top:0};
c.animIn={left:0};
c.animOut={left:0-b}
};
a.fn.cycle.transitions.scrollRight=function(d,e,c){d.css("overflow","hidden");
c.before.push(a.fn.cycle.commonReset);
var b=d.width();
c.cssFirst={left:0};
c.cssBefore={left:-b,top:0};
c.animIn={left:0};
c.animOut={left:b}
};
a.fn.cycle.transitions.scrollHorz=function(c,d,b){c.css("overflow","hidden").width();
b.before.push(function(h,f,g,e){a.fn.cycle.commonReset(h,f,g);
g.cssBefore.left=e?(f.cycleW-1):(1-f.cycleW);
g.animOut.left=e?-h.cycleW:h.cycleW
});
b.cssFirst={left:0};
b.cssBefore={top:0};
b.animIn={left:0};
b.animOut={top:0}
};
a.fn.cycle.transitions.scrollVert=function(c,d,b){c.css("overflow","hidden");
b.before.push(function(h,f,g,e){a.fn.cycle.commonReset(h,f,g);
g.cssBefore.top=e?(1-f.cycleH):(f.cycleH-1);
g.animOut.top=e?h.cycleH:-h.cycleH
});
b.cssFirst={top:0};
b.cssBefore={left:0};
b.animIn={top:0};
b.animOut={left:0}
};
a.fn.cycle.transitions.slideX=function(c,d,b){b.before.push(function(g,e,f){a(f.elements).not(g).hide();
a.fn.cycle.commonReset(g,e,f,false,true);
f.animIn.width=e.cycleW
});
b.cssBefore={left:0,top:0,width:0};
b.animIn={width:"show"};
b.animOut={width:0}
};
a.fn.cycle.transitions.slideY=function(c,d,b){b.before.push(function(g,e,f){a(f.elements).not(g).hide();
a.fn.cycle.commonReset(g,e,f,true,false);
f.animIn.height=e.cycleH
});
b.cssBefore={left:0,top:0,height:0};
b.animIn={height:"show"};
b.animOut={height:0}
};
a.fn.cycle.transitions.shuffle=function(e,f,d){var c,b=e.css("overflow","visible").width();
f.css({left:0,top:0});
d.before.push(function(i,g,h){a.fn.cycle.commonReset(i,g,h,true,true,true)
});
if(!d.speedAdjusted){d.speed=d.speed/2;
d.speedAdjusted=true
}d.random=0;
d.shuffle=d.shuffle||{left:-b,top:15};
d.els=[];
for(c=0;
c<f.length;
c++){d.els.push(f[c])
}for(c=0;
c<d.currSlide;
c++){d.els.push(d.els.shift())
}d.fxFn=function(m,j,l,g,i){var h=i?a(m):a(j);
a(j).css(l.cssBefore);
var k=l.slideCount;
h.animate(l.shuffle,l.speedIn,l.easeIn,function(){var q=a.fn.cycle.hopsFromLast(l,i);
for(var r=0;
r<q;
r++){i?l.els.push(l.els.shift()):l.els.unshift(l.els.pop())
}if(i){for(var s=0,o=l.els.length;
s<o;
s++){a(l.els[s]).css("z-index",o-s+k)
}}else{var t=a(m).css("z-index");
h.css("z-index",parseInt(t)+1+k)
}h.animate({left:0,top:0},l.speedOut,l.easeOut,function(){a(i?this:m).hide();
if(g){g()
}})
})
};
d.cssBefore={display:"block",opacity:1,top:0,left:0}
};
a.fn.cycle.transitions.turnUp=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,true,false);
f.cssBefore.top=e.cycleH;
f.animIn.height=e.cycleH
});
b.cssFirst={top:0};
b.cssBefore={left:0,height:0};
b.animIn={top:0};
b.animOut={height:0}
};
a.fn.cycle.transitions.turnDown=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,true,false);
f.animIn.height=e.cycleH;
f.animOut.top=g.cycleH
});
b.cssFirst={top:0};
b.cssBefore={left:0,top:0,height:0};
b.animOut={height:0}
};
a.fn.cycle.transitions.turnLeft=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,false,true);
f.cssBefore.left=e.cycleW;
f.animIn.width=e.cycleW
});
b.cssBefore={top:0,width:0};
b.animIn={left:0};
b.animOut={width:0}
};
a.fn.cycle.transitions.turnRight=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,false,true);
f.animIn.width=e.cycleW;
f.animOut.left=g.cycleW
});
b.cssBefore={top:0,left:0,width:0};
b.animIn={left:0};
b.animOut={width:0}
};
a.fn.cycle.transitions.zoom=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,false,false,true);
f.cssBefore.top=e.cycleH/2;
f.cssBefore.left=e.cycleW/2;
f.animIn={top:0,left:0,width:e.cycleW,height:e.cycleH};
f.animOut={width:0,height:0,top:g.cycleH/2,left:g.cycleW/2}
});
b.cssFirst={top:0,left:0};
b.cssBefore={width:0,height:0}
};
a.fn.cycle.transitions.fadeZoom=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,false,false);
f.cssBefore.left=e.cycleW/2;
f.cssBefore.top=e.cycleH/2;
f.animIn={top:0,left:0,width:e.cycleW,height:e.cycleH}
});
b.cssBefore={width:0,height:0};
b.animOut={opacity:0}
};
a.fn.cycle.transitions.blindX=function(d,e,c){var b=d.css("overflow","hidden").width();
c.before.push(function(h,f,g){a.fn.cycle.commonReset(h,f,g);
g.animIn.width=f.cycleW;
g.animOut.left=h.cycleW
});
c.cssBefore={left:b,top:0};
c.animIn={left:0};
c.animOut={left:b}
};
a.fn.cycle.transitions.blindY=function(d,e,c){var b=d.css("overflow","hidden").height();
c.before.push(function(h,f,g){a.fn.cycle.commonReset(h,f,g);
g.animIn.height=f.cycleH;
g.animOut.top=h.cycleH
});
c.cssBefore={top:b,left:0};
c.animIn={top:0};
c.animOut={top:b}
};
a.fn.cycle.transitions.blindZ=function(e,f,d){var c=e.css("overflow","hidden").height();
var b=e.width();
d.before.push(function(i,g,h){a.fn.cycle.commonReset(i,g,h);
h.animIn.height=g.cycleH;
h.animOut.top=i.cycleH
});
d.cssBefore={top:c,left:b};
d.animIn={top:0,left:0};
d.animOut={top:c,left:b}
};
a.fn.cycle.transitions.growX=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,false,true);
f.cssBefore.left=this.cycleW/2;
f.animIn={left:0,width:this.cycleW};
f.animOut={left:0}
});
b.cssBefore={width:0,top:0}
};
a.fn.cycle.transitions.growY=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,true,false);
f.cssBefore.top=this.cycleH/2;
f.animIn={top:0,height:this.cycleH};
f.animOut={top:0}
});
b.cssBefore={height:0,left:0}
};
a.fn.cycle.transitions.curtainX=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,false,true,true);
f.cssBefore.left=e.cycleW/2;
f.animIn={left:0,width:this.cycleW};
f.animOut={left:g.cycleW/2,width:0}
});
b.cssBefore={top:0,width:0}
};
a.fn.cycle.transitions.curtainY=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,true,false,true);
f.cssBefore.top=e.cycleH/2;
f.animIn={top:0,height:e.cycleH};
f.animOut={top:g.cycleH/2,height:0}
});
b.cssBefore={left:0,height:0}
};
a.fn.cycle.transitions.cover=function(f,g,e){var i=e.direction||"left";
var b=f.css("overflow","hidden").width();
var c=f.height();
e.before.push(function(j,d,h){a.fn.cycle.commonReset(j,d,h);
if(i=="right"){h.cssBefore.left=-b
}else{if(i=="up"){h.cssBefore.top=c
}else{if(i=="down"){h.cssBefore.top=-c
}else{h.cssBefore.left=b
}}}});
e.animIn={left:0,top:0};
e.animOut={opacity:1};
e.cssBefore={top:0,left:0}
};
a.fn.cycle.transitions.uncover=function(f,g,e){var i=e.direction||"left";
var b=f.css("overflow","hidden").width();
var c=f.height();
e.before.push(function(j,d,h){a.fn.cycle.commonReset(j,d,h,true,true,true);
if(i=="right"){h.animOut.left=b
}else{if(i=="up"){h.animOut.top=-c
}else{if(i=="down"){h.animOut.top=c
}else{h.animOut.left=-b
}}}});
e.animIn={left:0,top:0};
e.animOut={opacity:1};
e.cssBefore={top:0,left:0}
};
a.fn.cycle.transitions.toss=function(e,f,d){var b=e.css("overflow","visible").width();
var c=e.height();
d.before.push(function(i,g,h){a.fn.cycle.commonReset(i,g,h,true,true,true);
if(!h.animOut.left&&!h.animOut.top){h.animOut={left:b*2,top:-c/2,opacity:0}
}else{h.animOut.opacity=0
}});
d.cssBefore={left:0,top:0};
d.animIn={left:0}
};
a.fn.cycle.transitions.wipe=function(u,m,e){var s=u.css("overflow","hidden").width();
var j=u.height();
e.cssBefore=e.cssBefore||{};
var g;
if(e.clip){if(/l2r/.test(e.clip)){g="rect(0px 0px "+j+"px 0px)"
}else{if(/r2l/.test(e.clip)){g="rect(0px "+s+"px "+j+"px "+s+"px)"
}else{if(/t2b/.test(e.clip)){g="rect(0px "+s+"px 0px 0px)"
}else{if(/b2t/.test(e.clip)){g="rect("+j+"px "+s+"px "+j+"px 0px)"
}else{if(/zoom/.test(e.clip)){var q=parseInt(j/2);
var f=parseInt(s/2);
g="rect("+q+"px "+f+"px "+q+"px "+f+"px)"
}}}}}}e.cssBefore.clip=e.cssBefore.clip||g||"rect(0px 0px 0px 0px)";
var k=e.cssBefore.clip.match(/(\d+)/g);
var v=parseInt(k[0]),c=parseInt(k[1]),o=parseInt(k[2]),i=parseInt(k[3]);
e.before.push(function(x,h,t){if(x==h){return
}var d=a(x),b=a(h);
a.fn.cycle.commonReset(x,h,t,true,true,false);
t.cssAfter.display="block";
var r=1,l=parseInt((t.speedIn/13))-1;
(function w(){var z=v?v-parseInt(r*(v/l)):0;
var A=i?i-parseInt(r*(i/l)):0;
var B=o<j?o+parseInt(r*((j-o)/l||1)):j;
var y=c<s?c+parseInt(r*((s-c)/l||1)):s;
b.css({clip:"rect("+z+"px "+y+"px "+B+"px "+A+"px)"});
(r++<=l)?setTimeout(w,13):d.css("display","none")
})()
});
e.cssBefore={display:"block",opacity:1,top:0,left:0};
e.animIn={left:0};
e.animOut={left:0}
}
})(jQuery);
if(window.location.pathname.indexOf("entry.html")===-1){var pathArray=window.location.pathname.split("/");
var cookieValue=pathArray[3]+"-"+pathArray[1];
createCookie("helvetia.lang",cookieValue,24)
}function createCookie(d,f,b){if(b){var c=new Date();
c.setTime(c.getTime()+(b*3600*7*52*1000));
var a="; expires="+c.toGMTString()
}else{var a=""
}var e=window.location.pathname.split("/");
document.cookie=d+"="+f+a+"; path=/"+e[1]
}(function(a){Nx.Module.Mainnavigation=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){},afterBinding:function(){}})
})(Nx.$);
(function(a){Nx.Module.SchaufensterBildHome=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){},afterBinding:function(){}})
})(Nx.$);
(function(a){Nx.Module.Kontaktbox=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){},afterBinding:function(){}})
})(Nx.$);
(function(a){Nx.Module.Countryselector=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){a(".actualCountry").click(function(){a(".flyout").toggle()
});
a(document).bind("click",function(c){var b=a(c.target);
if(!b.parents().hasClass("modCountryselector")){a(".flyout").hide()
}});
a(".modCountryselector .flyout ul li").mouseover(function(){a(this).addClass("active")
}).mouseout(function(){a(this).removeClass("active")
})
},afterBinding:function(){}})
})(Nx.$);
(function(a){Nx.Module.Searchbox=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){var b=a("#searchtext").text();
a("#inpsearch").focus(function(){if(b==a("#searchtext").text()){a(this).attr("value","")
}else{a(this).attr("value",b)
}});
a("#inpsearch").blur(function(){a(this).attr("value",b)
});
a("#inpsearch").keyup(function(){b=a(this).attr("value")
})
},afterBinding:function(){}})
})(Nx.$);
(function(a){Nx.Module.Wegweiser=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){},afterBinding:function(){}})
})(Nx.$);
(function(a){Nx.Module.SchaufensterBildTextHome=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){var b=this.$ctx;
a(".rotate").cycle({fx:"fade",speed:2500,delay:1000})
},afterBinding:function(){}})
})(Nx.$);
(function(a){Nx.Module.SchaufensterNewsHome=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){},afterBinding:function(){}})
})(Nx.$);
(function(a){Nx.Module.SchaufensterNewsHome.Purple=function(b){this.dependencies=function(){b.dependencies()
};
this.beforeBinding=function(c){b.beforeBinding(function(){c()
})
};
this.onBinding=function(){b.onBinding()
};
this.afterBinding=function(){b.afterBinding()
}
}
})(Nx.$);
(function(a){Nx.Module.SchaufensterNewsHome.Red=function(b){this.dependencies=function(){b.dependencies()
};
this.beforeBinding=function(c){b.beforeBinding(function(){c()
})
};
this.onBinding=function(){b.onBinding()
};
this.afterBinding=function(){b.afterBinding()
}
}
})(Nx.$);
(function(a){Nx.Module.SchaufensterNewsHome.Yellow=function(b){this.dependencies=function(){b.dependencies()
};
this.beforeBinding=function(c){b.beforeBinding(function(){c()
})
};
this.onBinding=function(){b.onBinding()
};
this.afterBinding=function(){b.afterBinding()
}
}
})(Nx.$);
(function(a){Nx.Module.SchaufensterNewsHome.Green=function(b){this.dependencies=function(){b.dependencies()
};
this.beforeBinding=function(c){b.beforeBinding(function(){c()
})
};
this.onBinding=function(){b.onBinding()
};
this.afterBinding=function(){b.afterBinding()
}
}
})(Nx.$);
(function(a){Nx.Module.SchaufensterNewsHome.Grey=function(b){this.dependencies=function(){b.dependencies()
};
this.beforeBinding=function(c){b.beforeBinding(function(){c()
})
};
this.onBinding=function(){b.onBinding()
};
this.afterBinding=function(){b.afterBinding()
}
}
})(Nx.$);
(function(a){Nx.Module.SchaufensterNewsHome.Orange=function(b){this.dependencies=function(){b.dependencies()
};
this.beforeBinding=function(c){b.beforeBinding(function(){c()
})
};
this.onBinding=function(){b.onBinding()
};
this.afterBinding=function(){b.afterBinding()
}
}
})(Nx.$);
(function(a){Nx.Module.SchaufensterNewsHome.Blue=function(b){this.dependencies=function(){b.dependencies()
};
this.beforeBinding=function(c){b.beforeBinding(function(){c()
})
};
this.onBinding=function(){b.onBinding()
};
this.afterBinding=function(){b.afterBinding()
}
}
})(Nx.$);
(function(a){Nx.Module.Video=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){this.require("jwplayer.js","library","beforeBinding");
this.require("jwplayer.html5.js","library","beforeBinding")
},beforeBinding:function(f){var c=this,b=this.$ctx,e=this.modId,d=a(".mediaspace",b);
d.attr("id","mediaspace"+e);
jwplayer.key="OEJEMIpSLXY6clO9fG98OJST0rH3+yfVnMrb0iawHOs=";
jwplayer("mediaspace"+e).setup({flashplayer:d.data("playerurl"),file:d.data("videourl"),image:d.data("videoimage"),width:d.data("videowidth"),height:d.data("videoheight"),autostart:d.data("videoautostart"),controlbar:"bottom",stretching:"fill",dock:"true",icons:"true",menu:"false",volume:"30","controlbar.idlehide":"false",plugins:{"hd-2":{}},analytics:{cookies:false,enabled:false}});
jwplayer("mediaspace"+e).onPlay(function(g){c.fire("stop")
});
jwplayer("mediaspace"+e).onPause(function(g){c.fire("play")
});
jwplayer("mediaspace"+e).onComplete(function(g){c.fire("play")
});
f()
}})
})(Nx.$);
(function(a){Nx.Module.Footerclaim=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){},afterBinding:function(){}})
})(Nx.$);
(function(a){Nx.Module.Rotator=Nx.Module.extend({init:function(c,b,d){this.counter=0;
this._super(c,b,d)
},dependencies:function(){var b=this.$ctx;
var c=a(".rotator",b);
var d=c.data("rotatordeactivated");
if(!d){this.require("jquery.carouFredSel.js","library","beforeBinding")
}},beforeBinding:function(){var b=this.$ctx,d=a(".rotateList",b),c=a(".rotator",b),e=5,g=d.outerHeight()+e;
var f=c.data("rotatordeactivated");
if(!f){d.carouFredSel({direction:"up",circular:true,infinite:true,width:727,height:g,align:false,padding:0,items:{visible:"variable",height:"variable"},scroll:{pauseOnHover:true},auto:{pauseDuration:c.data("pauseduration"),delay:c.data("delay"),duration:c.data("scrollduration"),items:1}})
}},onPlay:function(){this.counter--;
if(this.counter==0){a(".rotateList",this.$ctx).trigger("play",true)
}},onStop:function(){this.counter++;
a(".rotateList",this.$ctx).trigger("stop")
}})
})(Nx.$);
(function(a){Nx.Module.Footernavigation=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){},afterBinding:function(){}})
})(Nx.$);
(function(a){Nx.Module.Aktienkurs=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){},afterBinding:function(){}})
})(Nx.$);
(function(a){Nx.Module.Contactbox=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){},afterBinding:function(){}})
})(Nx.$);
(function(a){Nx.Module.Hintergrundbild=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){var c=this.$ctx;
var b=this;
var d=3;
d=a("#random").attr("data-timeout");
if(d==0){d=3
}d=d*1000;
Nx.$("#random",b.$ctx).cycle({fx:"fade",speed:2500,timeout:d});
swfobject.registerObject("myId","9.0.0","/global/content/global/content/img/expressInstall.swf")
},afterBinding:function(){}})
})(Nx.$);
(function(a){Nx.Module.Logo=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){},afterBinding:function(){}})
})(Nx.$);
(function(a){Nx.Module.Formular=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){var b=a(".leftContent .inputlong");
b.focus(function(){a(this).parent().parent().children(":first").hide()
});
b.blur(function(){if(!this.value){a(this).parent().parent().children(":first").show()
}});
b.each(function(){if(this.value){a(this).parent().parent().children(":first").hide()
}});
a(".leftContent .selectlong").parent().parent().parent().children(":first").hide()
},afterBinding:function(){}})
})(Nx.$);
(function(a){Nx.Module.Flash=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){},afterBinding:function(){}})
})(Nx.$);
(function(a){Nx.Module.Servicenavigation=Nx.Module.extend({init:function(c,b,d){this._super(c,b,d)
},dependencies:function(){},beforeBinding:function(b){b()
},onBinding:function(){},afterBinding:function(){}})
})(Nx.$);
var gapi=window.gapi=window.gapi||{};
gapi._bs=new Date().getTime();
(function(){var aa=encodeURIComponent,k=window,ba=Object,q=document,ca=Array,da=parseInt,r=String,ea=decodeURIComponent;
function fa(a,b){return a.type=b
}var ga="appendChild",ha="shift",ia="exec",ja="width",s="replace",ka="concat",la="charAt",ma="match",t="createElement",v="setAttribute",na="bind",oa="getTime",pa="getElementsByTagName",x="substr",y="toString",z="split",A="location",B="style",qa="protocol",D="href",ra="action",E="apply",sa="attributes",ta="height",F="push",G="test",ua="slice",va="getElementById",wa="JSON",H="indexOf",xa="nodeName",ya="type",I="length",K="prototype",za="removeChild",L="call",M="getAttribute",N="charCodeAt",Aa="substring",Ba="documentMode",O="parentNode",Ca="update",P="join",Da="toLowerCase",Ea=function(a,b,c){return a[L][E](a[na],arguments)
},Fa=function(a,b,c){if(!a){throw Error()
}if(2<arguments[I]){var d=ca[K][ua][L](arguments,2);
return function(){var c=ca[K][ua][L](arguments);
ca[K].unshift[E](c,d);
return a[E](b,c)
}
}return function(){return a[E](b,arguments)
}
},Ga=function(a,b,c){Ga=Function[K][na]&&-1!=Function[K][na][y]()[H]("native code")?Ea:Fa;
return Ga[E](null,arguments)
};
Function[K].bind=Function[K][na]||function(a,b){if(1<arguments[I]){var c=ca[K][ua][L](arguments,1);
c.unshift(this,a);
return Ga[E](null,c)
}return Ga(this,a)
};
var Q=k,R=q,Ha=Q[A],Ia=function(){},Ja=/\[native code\]/,S=function(a,b,c){return a[b]=a[b]||c
},Ka=function(a){for(var b=0;
b<this[I];
b++){if(this[b]===a){return b
}}return -1
},La=function(a){a=a.sort();
for(var b=[],c=void 0,d=0;
d<a[I];
d++){var e=a[d];
e!=c&&b[F](e);
c=e
}return b
},Ma=/&/g,Na=/</g,Oa=/>/g,Pa=/"/g,Qa=/'/g,Ra=function(a){return r(a)[s](Ma,"&amp;")[s](Na,"&lt;")[s](Oa,"&gt;")[s](Pa,"&quot;")[s](Qa,"&#39;")
},T=function(){var a;
if((a=ba.create)&&Ja[G](a)){a=a(null)
}else{a={};
for(var b in a){a[b]=void 0
}}return a
},U=function(a,b){return ba[K].hasOwnProperty[L](a,b)
},Sa=function(a){if(Ja[G](ba.keys)){return ba.keys(a)
}var b=[],c;
for(c in a){U(a,c)&&b[F](c)
}return b
},V=function(a,b){a=a||{};
for(var c in a){U(a,c)&&(b[c]=a[c])
}},Ta=function(a){return function(){Q.setTimeout(a,0)
}
},Ua=function(a,b){if(!a){throw Error(b||"")
}},W=S(Q,"gapi",{});
var X=function(a,b,c){var d=new RegExp("([#].*&|[#])"+b+"=([^&#]*)","g");
b=new RegExp("([?#].*&|[?#])"+b+"=([^&#]*)","g");
if(a=a&&(d[ia](a)||b[ia](a))){try{c=ea(a[2])
}catch(e){}}return c
},Va=/^([^?#]*)(\?([^#]*))?(\#(.*))?$/,Wa=function(a){a=a[ma](Va);
var b=T();
b.H=a[1];
b.j=a[3]?[a[3]]:[];
b.o=a[5]?[a[5]]:[];
return b
},Xa=function(a){return a.H+(0<a.j[I]?"?"+a.j[P]("&"):"")+(0<a.o[I]?"#"+a.o[P]("&"):"")
},Ya=function(a,b){var c=[];
if(a){for(var d in a){if(U(a,d)&&null!=a[d]){var e=b?b(a[d]):a[d];
c[F](aa(d)+"="+aa(e))
}}}return c
},Za=function(a,b,c,d){a=Wa(a);
a.j[F][E](a.j,Ya(b,d));
a.o[F][E](a.o,Ya(c,d));
return Xa(a)
},$a=function(a,b){var c="";
2000<b[I]&&(c=b[Aa](2000),b=b[Aa](0,2000));
var d=a[t]("div"),e=a[t]("a");
e.href=b;
d[ga](e);
d.innerHTML=d.innerHTML;
b=r(d.firstChild[D]);
d[O]&&d[O][za](d);
return b+c
},ab=/^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i;
var bb=function(a,b,c,d){if(Q[c+"EventListener"]){Q[c+"EventListener"](a,b,!1)
}else{if(Q[d+"tachEvent"]){Q[d+"tachEvent"]("on"+a,b)
}}},cb=function(){var a=R.readyState;
return"complete"===a||"interactive"===a&&-1==navigator.userAgent[H]("MSIE")
},fb=function(a){var b=db;
if(!cb()){try{b()
}catch(c){}}eb(a)
},eb=function(a){if(cb()){a()
}else{var b=!1,c=function(){if(!b){return b=!0,a[E](this,arguments)
}};
Q.addEventListener?(Q.addEventListener("load",c,!1),Q.addEventListener("DOMContentLoaded",c,!1)):Q.attachEvent&&(Q.attachEvent("onreadystatechange",function(){cb()&&c[E](this,arguments)
}),Q.attachEvent("onload",c))
}},gb=function(a){for(;
a.firstChild;
){a[za](a.firstChild)
}},hb={button:!0,div:!0,span:!0};
var Y;
Y=S(Q,"___jsl",T());
S(Y,"I",0);
S(Y,"hel",10);
var ib=function(a){return Y.dpo?Y.h:X(a,"jsh",Y.h)
},jb=function(a){var b=S(Y,"sws",[]);
b[F][E](b,a)
},kb=function(a){return S(Y,"watt",T())[a]
},lb=function(a){var b=S(Y,"PQ",[]);
Y.PQ=[];
var c=b[I];
if(0===c){a()
}else{for(var d=0,e=function(){++d===c&&a()
},f=0;
f<c;
f++){b[f](e)
}}},nb=function(a){return S(S(Y,"H",T()),a,T())
};
var ob=S(Y,"perf",T()),pb=S(ob,"g",T()),qb=S(ob,"i",T());
S(ob,"r",[]);
T();
T();
var rb=function(a,b,c){var d=ob.r;
"function"===typeof d?d(a,b,c):d[F]([a,b,c])
},sb=function(a,b,c){pb[a]=!b&&pb[a]||c||(new Date)[oa]();
rb(a)
},ub=function(a,b,c){b&&0<b[I]&&(b=tb(b),c&&0<c[I]&&(b+="___"+tb(c)),28<b[I]&&(b=b[x](0,28)+(b[I]-28)),c=b,b=S(qb,"_p",T()),S(b,c,T())[a]=(new Date)[oa](),rb(a,"_p",c))
},tb=function(a){return a[P]("__")[s](/\./g,"_")[s](/\-/g,"_")[s](/\,/g,"_")
};
var vb=T(),wb=[],xb=function(a){throw Error("Bad hint"+(a?": "+a:""))
};
wb[F](["jsl",function(a){for(var b in a){if(U(a,b)){var c=a[b];
"object"==typeof c?Y[b]=S(Y,b,[])[ka](c):S(Y,b,c)
}}if(b=a.u){a=S(Y,"us",[]),a[F](b),(b=/^https:(.*)$/[ia](b))&&a[F]("http:"+b[1])
}}]);
var yb=/^(\/[a-zA-Z0-9_\-]+)+$/,zb=/^[a-zA-Z0-9\-_\.,!]+$/,Ab=/^gapi\.loaded_[0-9]+$/,Bb=/^[a-zA-Z0-9,._-]+$/,Fb=function(a,b,c,d){var e=a[z](";"),f=vb[e[ha]()],g=null;
f&&(g=f(e,b,c,d));
if(b=g){b=g,c=b[ma](Cb),d=b[ma](Db),b=!!d&&1===d[I]&&Eb[G](b)&&!!c&&1===c[I]
}b||xb(a);
return g
},Ib=function(a,b,c,d){a=Gb(a);
Ab[G](c)||xb("invalid_callback");
b=Hb(b);
d=d&&d[I]?Hb(d):null;
var e=function(a){return aa(a)[s](/%2C/g,",")
};
return[aa(a.T)[s](/%2C/g,",")[s](/%2F/g,"/"),"/k=",e(a.version),"/m=",e(b),d?"/exm="+e(d):"","/rt=j/sv=1/d=1/ed=1",a.J?"/am="+e(a.J):"",a.K?"/rs="+e(a.K):"","/cb=",e(c)][P]("")
},Gb=function(a){"/"!==a[la](0)&&xb("relative path");
for(var b=a[Aa](1)[z]("/"),c=[];
b[I];
){a=b[ha]();
if(!a[I]||0==a[H](".")){xb("empty/relative directory")
}else{if(0<a[H]("=")){b.unshift(a);
break
}}c[F](a)
}a={};
for(var d=0,e=b[I];
d<e;
++d){var f=b[d][z]("="),g=ea(f[0]),h=ea(f[1]);
2==f[I]&&g&&h&&(a[g]=a[g]||h)
}b="/"+c[P]("/");
yb[G](b)||xb("invalid_prefix");
c=Jb(a,"k",!0);
d=Jb(a,"am");
a=Jb(a,"rs");
return{T:b,version:c,J:d,K:a}
},Hb=function(a){for(var b=[],c=0,d=a[I];
c<d;
++c){var e=a[c][s](/\./g,"_")[s](/-/g,"_");
Bb[G](e)&&b[F](e)
}return b[P](",")
},Jb=function(a,b,c){a=a[b];
!a&&c&&xb("missing: "+b);
if(a){if(zb[G](a)){return a
}xb("invalid: "+b)
}return null
},Eb=/^https?:\/\/[a-z0-9_.-]+\.google\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,Db=/\/cb=/g,Cb=/\/\//g,Kb=function(){var a=ib(Ha[D]);
if(!a){throw Error("Bad hint")
}return a
};
vb.m=function(a,b,c,d){(a=a[0])||xb("missing_hint");
return"https://apis.google.com"+Ib(a,b,c,d)
};
var Lb=decodeURI("%73cript"),Mb=function(a,b){for(var c=[],d=0;
d<a[I];
++d){var e=a[d];
e&&0>Ka[L](b,e)&&c[F](e)
}return c
},Ob=function(a){"loading"!=R.readyState?Nb(a):R.write("<"+Lb+' src="'+encodeURI(a)+'"></'+Lb+">")
},Nb=function(a){var b=R[t](Lb);
b[v]("src",a);
b.async="true";
(a=R[pa](Lb)[0])?a[O].insertBefore(b,a):(R.head||R.body||R.documentElement)[ga](b)
},Pb=function(a,b){var c=b&&b._c;
if(c){for(var d=0;
d<wb[I];
d++){var e=wb[d][0],f=wb[d][1];
f&&U(c,e)&&f(c[e],a,b)
}}},Rb=function(a,b){Qb(function(){var c;
c=b===ib(Ha[D])?S(W,"_",T()):T();
c=S(nb(b),"_",c);
a(c)
})
},Tb=function(a,b){var c=b||{};
"function"==typeof b&&(c={},c.callback=b);
Pb(a,c);
var d=a?a[z](":"):[],e=c.h||Kb(),f=S(Y,"ah",T());
if(f["::"]&&d[I]){for(var g=[],h=null;
h=d[ha]();
){var l=h[z]("."),l=f[h]||f[l[1]&&"ns:"+l[0]||""]||e,n=g[I]&&g[g[I]-1]||null,m=n;
n&&n.hint==l||(m={hint:l,M:[]},g[F](m));
m.M[F](h)
}var p=g[I];
if(1<p){var w=c.callback;
w&&(c.callback=function(){0==--p&&w()
})
}for(;
d=g[ha]();
){Sb(d.M,c,d.hint)
}}else{Sb(d||[],c,e)
}},Sb=function(a,b,c){a=La(a)||[];
var d=b.callback,e=b.config,f=b.timeout,g=b.ontimeout,h=null,l=!1;
if(f&&!g||!f&&g){throw"Timeout requires both the timeout parameter and ontimeout parameter to be set"
}var n=S(nb(c),"r",[]).sort(),m=S(nb(c),"L",[]).sort(),p=[][ka](n),w=function(a,b){if(l){return 0
}Q.clearTimeout(h);
m[F][E](m,C);
var d=((W||{}).config||{})[Ca];
d?d(e):e&&S(Y,"cu",[])[F](e);
if(b){ub("me0",a,p);
try{Rb(b,c)
}finally{ub("me1",a,p)
}}return 1
};
0<f&&(h=Q.setTimeout(function(){l=!0;
g()
},f));
var C=Mb(a,m);
if(C[I]){var C=Mb(a,n),u=S(Y,"CP",[]),J=u[I];
u[J]=function(a){if(!a){return 0
}ub("ml1",C,p);
var b=function(b){u[J]=null;
w(C,a)&&lb(function(){d&&d();
b()
})
},c=function(){var a=u[J+1];
a&&a()
};
0<J&&u[J-1]?u[J]=function(){b(c)
}:b(c)
};
if(C[I]){var mb="loaded_"+Y.I++;
W[mb]=function(a){u[J](a);
W[mb]=null
};
a=Fb(c,C,"gapi."+mb,n);
n[F][E](n,C);
ub("ml0",C,p);
b.sync||Q.___gapisync?Ob(a):Nb(a)
}else{u[J](Ia)
}}else{w(C)&&d&&d()
}};
var Qb=function(a){if(Y.hee&&0<Y.hel){try{return a()
}catch(b){Y.hel--,Tb("debug_error",function(){try{k.___jsl.hefn(b)
}catch(a){throw b
}})
}}else{return a()
}};
W.load=function(a,b){return Qb(function(){return Tb(a,b)
})
};
var Ub=function(a){var b=k.___jsl=k.___jsl||{};
b[a]=b[a]||[];
return b[a]
},Vb=function(a){var b=k.___jsl=k.___jsl||{};
b.cfg=!a&&b.cfg||{};
return b.cfg
},Wb=function(a){return"object"===typeof a&&/\[native code\]/[G](a[F])
},Xb=function(a,b){if(b){for(var c in b){b.hasOwnProperty(c)&&(a[c]&&b[c]&&"object"===typeof a[c]&&"object"===typeof b[c]&&!Wb(a[c])&&!Wb(b[c])?Xb(a[c],b[c]):b[c]&&"object"===typeof b[c]?(a[c]=Wb(b[c])?[]:{},Xb(a[c],b[c])):a[c]=b[c])
}}},Yb=function(a){if(a&&!/^\s+$/[G](a)){for(;
0==a[N](a[I]-1);
){a=a[Aa](0,a[I]-1)
}var b;
try{b=k[wa].parse(a)
}catch(c){}if("object"===typeof b){return b
}try{b=(new Function("return ("+a+"\n)"))()
}catch(d){}if("object"===typeof b){return b
}try{b=(new Function("return ({"+a+"\n})"))()
}catch(e){}return"object"===typeof b?b:{}
}},Zb=function(a){Vb(!0);
var b=k.___gcfg,c=Ub("cu");
if(b&&b!==k.___gu){var d={};
Xb(d,b);
c[F](d);
k.___gu=b
}var b=Ub("cu"),e=q.scripts||q[pa]("script")||[],d=[],f=[];
f[F][E](f,Ub("us"));
for(var g=0;
g<e[I];
++g){for(var h=e[g],l=0;
l<f[I];
++l){h.src&&0==h.src[H](f[l])&&d[F](h)
}}0==d[I]&&0<e[I]&&e[e[I]-1].src&&d[F](e[e[I]-1]);
for(e=0;
e<d[I];
++e){d[e][M]("gapi_processed")||(d[e][v]("gapi_processed",!0),(f=d[e])?(g=f.nodeType,f=3==g||4==g?f.nodeValue:f.textContent||f.innerText||f.innerHTML||""):f=void 0,(f=Yb(f))&&b[F](f))
}a&&(d={},Xb(d,a),c[F](d));
d=Ub("cd");
a=0;
for(b=d[I];
a<b;
++a){Xb(Vb(),d[a])
}d=Ub("ci");
a=0;
for(b=d[I];
a<b;
++a){Xb(Vb(),d[a])
}a=0;
for(b=c[I];
a<b;
++a){Xb(Vb(),c[a])
}},Z=function(a){if(!a){return Vb()
}a=a[z]("/");
for(var b=Vb(),c=0,d=a[I];
b&&"object"===typeof b&&c<d;
++c){b=b[a[c]]
}return c===a[I]&&void 0!==b?b:void 0
},$b=function(a,b){var c=a;
if("string"===typeof a){for(var d=c={},e=a[z]("/"),f=0,g=e[I];
f<g-1;
++f){var h={},d=d[e[f]]=h
}d[e[f]]=b
}Zb(c)
};
var ac=function(){var a=k.__GOOGLEAPIS;
a&&(a.googleapis&&!a["googleapis.config"]&&(a["googleapis.config"]=a.googleapis),S(Y,"ci",[])[F](a),k.__GOOGLEAPIS=void 0)
};
var bc={apppackagename:1,callback:1,clientid:1,cookiepolicy:1,openidrealm:-1,includegrantedscopes:-1,requestvisibleactions:1,scope:1},cc=!1,dc=T(),ec=function(){if(!cc){for(var a=q[pa]("meta"),b=0;
b<a[I];
++b){var c=a[b].name[Da]();
if(0==c.lastIndexOf("google-signin-",0)){var c=c[Aa](14),d=a[b].content;
bc[c]&&d&&(dc[c]=d)
}}if(k.self!==k.top){var a=q[A][y](),e;
for(e in bc){0<bc[e]&&(b=X(a,e,""))&&(dc[e]=b)
}}cc=!0
}e=T();
V(dc,e);
return e
},fc=function(a){return !!(a.clientid&&a.scope&&a.callback)
};
var gc=k.console,hc=function(a){gc&&gc.log&&gc.log(a)
};
var ic=function(){return !!Y.oa
},jc=function(){};
var $=S(Y,"rw",T()),kc=function(a){for(var b in $){a($[b])
}},lc=function(a,b){var c=$[a];
c&&c.state<b&&(c.state=b)
};
var mc;
var nc=/^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/u\/(\d)\//,oc=/^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/b\/(\d{10,})\//,pc=function(a){var b=Z("googleapis.config/sessionIndex");
null==b&&(b=k.__X_GOOG_AUTHUSER);
if(null==b){var c=k.google;
c&&(b=c.authuser)
}null==b&&(a=a||k[A][D],b=X(a,"authuser")||null,null==b&&(b=(b=a[ma](nc))?b[1]:null));
return null==b?null:r(b)
},qc=function(a){var b=Z("googleapis.config/sessionDelegate");
null==b&&(b=(a=(a||k[A][D])[ma](oc))?a[1]:null);
return null==b?null:r(b)
};
var rc=function(){this.c=-1
};
var sc=function(){this.c=-1;
this.c=64;
this.b=[];
this.p=[];
this.N=[];
this.n=[];
this.n[0]=128;
for(var a=1;
a<this.c;
++a){this.n[a]=0
}this.l=this.g=0;
this.reset()
};
(function(){function a(){}a.prototype=rc[K];
sc.$=rc[K];
sc.prototype=new a;
sc.H=function(a,c,d){return rc[K][c][E](a,ca[K][ua][L](arguments,2))
}
})();
sc[K].reset=function(){this.b[0]=1732584193;
this.b[1]=4023233417;
this.b[2]=2562383102;
this.b[3]=271733878;
this.b[4]=3285377520;
this.l=this.g=0
};
var tc=function(a,b,c){c||(c=0);
var d=a.N;
if("string"==typeof b){for(var e=0;
16>e;
e++){d[e]=b[N](c)<<24|b[N](c+1)<<16|b[N](c+2)<<8|b[N](c+3),c+=4
}}else{for(e=0;
16>e;
e++){d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4
}}for(e=16;
80>e;
e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];
d[e]=(f<<1|f>>>31)&4294967295
}b=a.b[0];
c=a.b[1];
for(var g=a.b[2],h=a.b[3],l=a.b[4],n,e=0;
80>e;
e++){40>e?20>e?(f=h^c&(g^h),n=1518500249):(f=c^g^h,n=1859775393):60>e?(f=c&g|h&(c|g),n=2400959708):(f=c^g^h,n=3395469782),f=(b<<5|b>>>27)+f+l+n+d[e]&4294967295,l=h,h=g,g=(c<<30|c>>>2)&4294967295,c=b,b=f
}a.b[0]=a.b[0]+b&4294967295;
a.b[1]=a.b[1]+c&4294967295;
a.b[2]=a.b[2]+g&4294967295;
a.b[3]=a.b[3]+h&4294967295;
a.b[4]=a.b[4]+l&4294967295
};
sc[K].update=function(a,b){void 0===b&&(b=a[I]);
for(var c=b-this.c,d=0,e=this.p,f=this.g;
d<b;
){if(0==f){for(;
d<=c;
){tc(this,a,d),d+=this.c
}}if("string"==typeof a){for(;
d<b;
){if(e[f]=a[N](d),++f,++d,f==this.c){tc(this,e);
f=0;
break
}}}else{for(;
d<b;
){if(e[f]=a[d],++f,++d,f==this.c){tc(this,e);
f=0;
break
}}}}this.g=f;
this.l+=b
};
var uc=function(){this.q=new sc
};
uc[K].reset=function(){this.q.reset()
};
var Bc=function(){var a;
vc?(a=new Q.Uint32Array(1),wc.getRandomValues(a),a=Number("0."+a[0])):(a=xc,a+=da(yc[x](0,20),16),yc=zc(yc),a/=Ac+Math.pow(16,20));
return a
},wc=Q.crypto,vc=!1,Cc=0,Dc=0,xc=1,Ac=0,yc="",Ec=function(a){a=a||Q.event;
var b=a.screenX+a.clientX<<16,b=b+(a.screenY+a.clientY),b=(new Date)[oa]()%1000000*b;
xc=xc*b%Ac;
0<Cc&&++Dc==Cc&&bb("mousemove",Ec,"remove","de")
},zc=function(a){var b=new uc;
a=unescape(aa(a));
for(var c=[],d=0,e=a[I];
d<e;
++d){c[F](a[N](d))
}b.q[Ca](c);
a=b.q;
b=[];
d=8*a.l;
56>a.g?a[Ca](a.n,56-a.g):a[Ca](a.n,a.c-(a.g-56));
for(c=a.c-1;
56<=c;
c--){a.p[c]=d&255,d/=256
}tc(a,a.p);
for(c=d=0;
5>c;
c++){for(e=24;
0<=e;
e-=8){b[d]=a.b[c]>>e&255,++d
}}a="";
for(c=0;
c<b[I];
c++){a+="0123456789ABCDEF"[la](Math.floor(b[c]/16))+"0123456789ABCDEF"[la](b[c]%16)
}return a
},vc=!!wc&&"function"==typeof wc.getRandomValues;
vc||(Ac=1000000*(screen[ja]*screen[ja]+screen[ta]),yc=zc(R.cookie+"|"+R[A]+"|"+(new Date)[oa]()+"|"+Math.random()),Cc=Z("random/maxObserveMousemove")||0,0!=Cc&&bb("mousemove",Ec,"add","at"));
var Fc=function(){var a=Y.onl;
if(!a){a=T();
Y.onl=a;
var b=T();
a.e=function(a){var d=b[a];
d&&(delete b[a],d())
};
a.a=function(a,d){b[a]=d
};
a.r=function(a){delete b[a]
}
}return a
},Gc=function(a,b){var c=b.onload;
return"function"===typeof c?(Fc().a(a,c),c):null
},Hc=function(a){Ua(/^\w+$/[G](a),"Unsupported id - "+a);
Fc();
return'onload="window.___jsl.onl.e(&#34;'+a+'&#34;)"'
},Ic=function(a){Fc().r(a)
};
var Jc={allowtransparency:"true",frameborder:"0",hspace:"0",marginheight:"0",marginwidth:"0",scrolling:"no",style:"",tabindex:"0",vspace:"0",width:"100%"},Kc={allowtransparency:!0,onload:!0},Lc=0,Mc=function(a){Ua(!a||ab[G](a),"Illegal url for new iframe - "+a)
},Nc=function(a,b,c,d,e){Mc(c.src);
var f,g=Gc(d,c),h=g?Hc(d):"";
try{f=a[t]('<iframe frameborder="'+Ra(r(c.frameborder))+'" scrolling="'+Ra(r(c.scrolling))+'" '+h+' name="'+Ra(r(c.name))+'"/>')
}catch(l){f=a[t]("iframe"),g&&(f.onload=function(){f.onload=null;
g[L](this)
},Ic(d))
}for(var n in c){a=c[n],"style"===n&&"object"===typeof a?V(a,f[B]):Kc[n]||f[v](n,r(a))
}(n=e&&e.beforeNode||null)||e&&e.dontclear||gb(b);
b.insertBefore(f,n);
f=n?n.previousSibling:b.lastChild;
c.allowtransparency&&(f.allowTransparency=!0);
return f
};
var Oc=/^:[\w]+$/,Pc=/:([a-zA-Z_]+):/g,Qc=function(){var a=pc()||"0",b=qc(),c;
c=pc(void 0)||a;
var d=qc(void 0),e="";
c&&(e+="u/"+c+"/");
d&&(e+="b/"+d+"/");
c=e||null;
(e=(d=!1===Z("isLoggedIn"))?"_/im/":"")&&(c="");
var f=Z("iframes/:socialhost:"),g=Z("iframes/:im_socialhost:");
return mc={socialhost:f,ctx_socialhost:d?g:f,session_index:a,session_delegate:b,session_prefix:c,im_prefix:e}
},Rc=function(a,b){return Qc()[b]||""
},Sc=function(a){return function(b,c){return a?Qc()[c]||a[c]||"":Qc()[c]||""
}
};
var Tc={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},Uc=function(a){var b,c,d;
b=/[\"\\\x00-\x1f\x7f-\x9f]/g;
if(void 0!==a){switch(typeof a){case"string":return b[G](a)?'"'+a[s](b,function(a){var b=Tc[a];
if(b){return b
}b=a[N]();
return"\\u00"+Math.floor(b/16)[y](16)+(b%16)[y](16)
})+'"':'"'+a+'"';
case"number":return isFinite(a)?r(a):"null";
case"boolean":case"null":return r(a);
case"object":if(!a){return"null"
}b=[];
if("number"===typeof a[I]&&!a.propertyIsEnumerable("length")){d=a[I];
for(c=0;
c<d;
c+=1){b[F](Uc(a[c])||"null")
}return"["+b[P](",")+"]"
}for(c in a){!/___$/[G](c)&&U(a,c)&&"string"===typeof c&&(d=Uc(a[c]))&&b[F](Uc(c)+":"+d)
}return"{"+b[P](",")+"}"
}return""
}},Vc=function(a){if(!a){return !1
}if(/^[\],:{}\s]*$/[G](a[s](/\\["\\\/b-u]/g,"@")[s](/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]")[s](/(?:^|:|,)(?:\s*\[)+/g,""))){try{return eval("("+a+")")
}catch(b){}}return !1
},Wc=!1;
try{Wc=!!k[wa]&&'["a"]'===k[wa].stringify(["a"])&&"a"===k[wa].parse('["a"]')[0]
}catch(Xc){}var Yc=function(a){try{return k[wa].parse(a)
}catch(b){return !1
}},Zc=Wc?k[wa].stringify:Uc,$c=Wc?Yc:Vc;
var ad=function(a){var b;
a[ma](/^https?%3A/i)&&(b=ea(a));
return $a(q,b?b:a)
},bd=function(a){a=a||"canonical";
for(var b=q[pa]("link"),c=0,d=b[I];
c<d;
c++){var e=b[c],f=e[M]("rel");
if(f&&f[Da]()==a&&(e=e[M]("href"))&&(e=ad(e))&&null!=e[ma](/^https?:\/\/[\w\-\_\.]+/i)){return e
}}return k[A][D]
};
var cd={se:"0"},dd={post:!0},ed={style:"position:absolute;top:-10000px;width:450px;margin:0px;border-style:none"},fd="onPlusOne _ready _close _open _resizeMe _renderstart oncircled drefresh erefresh".split(" "),gd=S(Y,"WI",T()),hd=function(a,b,c){var d,e;
d={};
var f=e=a;
"plus"==a&&b[ra]&&(e=a+"_"+b[ra],f=a+"/"+b[ra]);
(e=Z("iframes/"+e+"/url"))||(e=":im_socialhost:/:session_prefix::im_prefix:_/widget/render/"+f+"?usegapi=1");
for(var g in cd){d[g]=g+"/"+(b[g]||cd[g])+"/"
}d=$a(R,e[s](Pc,Sc(d)));
g="iframes/"+a+"/params/";
f={};
V(b,f);
(e=Z("lang")||Z("gwidget/lang"))&&(f.hl=e);
dd[a]||(f.origin=k[A].origin||k[A][qa]+"//"+k[A].host);
f.exp=Z(g+"exp");
if(g=Z(g+"location")){for(e=0;
e<g[I];
e++){var h=g[e];
f[h]=Q[A][h]
}}switch(a){case"plus":case"follow":g=f[D];
e=b[ra]?void 0:"publisher";
g=(g="string"==typeof g?g:void 0)?ad(g):bd(e);
f.url=g;
delete f[D];
break;
case"plusone":g=(g=b[D])?ad(g):bd();
f.url=g;
g=b.db;
e=Z();
null==g&&e&&(g=e.db,null==g&&(g=e.gwidget&&e.gwidget.db));
f.db=g||void 0;
g=b.ecp;
e=Z();
null==g&&e&&(g=e.ecp,null==g&&(g=e.gwidget&&e.gwidget.ecp));
f.ecp=g||void 0;
delete f[D];
break;
case"signin":f.url=bd()
}Y.ILI&&(f.iloader="1");
delete f["data-onload"];
delete f.rd;
for(var l in cd){f[l]&&delete f[l]
}f.gsrc=Z("iframes/:source:");
l=Z("inline/css");
"undefined"!==typeof l&&0<c&&l>=c&&(f.ic="1");
l=/^#|^fr-/;
c={};
for(var n in f){U(f,n)&&l[G](n)&&(c[n[s](l,"")]=f[n],delete f[n])
}n="q"==Z("iframes/"+a+"/params/si")?f:c;
l=ec();
for(var m in l){!U(l,m)||U(f,m)||U(c,m)||(n[m]=l[m])
}m=[][ka](fd);
(n=Z("iframes/"+a+"/methods"))&&"object"===typeof n&&Ja[G](n[F])&&(m=m[ka](n));
for(var p in b){U(b,p)&&/^on/[G](p)&&("plus"!=a||"onconnect"!=p)&&(m[F](p),delete f[p])
}delete f.callback;
c._methods=m[P](",");
return Za(d,f,c)
},id=["style","data-gapiscan"],kd=function(a){for(var b=T(),c=0!=a[xa][Da]()[H]("g:"),d=0,e=a[sa][I];
d<e;
d++){var f=a[sa][d],g=f.name,h=f.value;
0<=Ka[L](id,g)||c&&0!=g[H]("data-")||"null"===h||"specified" in f&&!f.specified||(c&&(g=g[x](5)),b[g[Da]()]=h)
}a=a[B];
(c=jd(a&&a[ta]))&&(b.height=r(c));
(a=jd(a&&a[ja]))&&(b.width=r(a));
return b
},jd=function(a){var b=void 0;
"number"===typeof a?b=a:"string"===typeof a&&(b=da(a,10));
return b
},md=function(){var a=Y.drw;
kc(function(b){if(a!==b.id&&4!=b.state&&"share"!=b[ya]){var c=b.id,d=b[ya],e=b.url;
b=b.userParams;
var f=R[va](c);
if(f){var g=hd(d,b,0);
g?(f=f[O],e[s](/\#.*/,"")[s](/(\?|&)ic=1/,"")!==g[s](/\#.*/,"")[s](/(\?|&)ic=1/,"")&&(b.dontclear=!0,b.rd=!0,b.ri=!0,fa(b,d),ld(f,b),(d=$[f.lastChild.id])&&(d.oid=c),lc(c,4))):delete $[c]
}else{delete $[c]
}}})
};
var nd,od,pd,qd,rd,sd=/(?:^|\s)g-((\S)*)(?:$|\s)/,td={plusone:!0,autocomplete:!0,profile:!0,signin:!0};
nd=S(Y,"SW",T());
od=S(Y,"SA",T());
pd=S(Y,"SM",T());
qd=S(Y,"FW",[]);
rd=null;
var vd=function(a,b){ud(void 0,!1,a,b)
},ud=function(a,b,c,d){sb("ps0",!0);
c=("string"===typeof c?q[va](c):c)||R;
var e;
e=R[Ba];
if(c.querySelectorAll&&(!e||8<e)){e=d?[d]:Sa(nd)[ka](Sa(od))[ka](Sa(pd));
for(var f=[],g=0;
g<e[I];
g++){var h=e[g];
f[F](".g-"+h,"g\\:"+h)
}e=c.querySelectorAll(f[P](","))
}else{e=c[pa]("*")
}c=T();
for(f=0;
f<e[I];
f++){g=e[f];
var l=g,h=d,n=l[xa][Da](),m=void 0;
l[M]("data-gapiscan")?h=null:(0==n[H]("g:")?m=n[x](2):(l=(l=r(l.className||l[M]("class")))&&sd[ia](l))&&(m=l[1]),h=!m||!(nd[m]||od[m]||pd[m])||h&&m!==h?null:m);
h&&(td[h]||0==g[xa][Da]()[H]("g:")||0!=Sa(kd(g))[I])&&(g[v]("data-gapiscan",!0),S(c,h,[])[F](g))
}if(b){for(var p in c){for(b=c[p],d=0;
d<b[I];
d++){b[d][v]("data-onload",!0)
}}}for(var w in c){qd[F](w)
}sb("ps1",!0);
if((p=qd[P](":"))||a){try{W.load(p,a)
}catch(C){hc(C);
return
}}if(wd(rd||{})){for(var u in c){a=c[u];
w=0;
for(b=a[I];
w<b;
w++){a[w].removeAttribute("data-gapiscan")
}xd(u)
}}else{d=[];
for(u in c){for(a=c[u],w=0,b=a[I];
w<b;
w++){e=a[w],yd(u,e,kd(e),d,b)
}}zd(p,d)
}},Ad=function(a){var b=S(W,a,{});
b.go||(b.go=function(b){return vd(b,a)
},b.render=function(b,d){var e=d||{};
fa(e,a);
return ld(b,e)
})
},Bd=function(a){nd[a]=!0
},Cd=function(a){od[a]=!0
},Dd=function(a){pd[a]=!0
};
var xd=function(a,b){var c=kb(a);
b&&c?(c(b),(c=b.iframeNode)&&c[v]("data-gapiattached",!0)):W.load(a,function(){var c=kb(a),e=b&&b.iframeNode;
e&&c?(c(b),e[v]("data-gapiattached",!0)):(0,W[a].go)(e&&e[O])
})
},wd=function(){return !1
},zd=function(){},yd=function(a,b,c,d,e,f){switch(Ed(b,a,f)){case 0:a=pd[a]?a+"_annotation":a;
d={};
d.iframeNode=b;
d.userParams=c;
xd(a,d);
break;
case 1:var g;
if(b[O]){for(var h in c){if(f=U(c,h)){f=c[h],f=!!f&&"object"===typeof f&&(!f[y]||f[y]===ba[K][y]||f[y]===ca[K][y])
}if(f){try{c[h]=Zc(c[h])
}catch(l){delete c[h]
}}}var n=!0;
c.dontclear&&(n=!1);
delete c.dontclear;
jc();
f=hd(a,c,e);
h={allowPost:1,attributes:ed};
h.dontclear=!n;
e={};
e.userParams=c;
e.url=f;
fa(e,a);
var m;
c.rd?m=b:(m=q[t]("div"),b[v]("data-gapistub",!0),m[B].cssText="position:absolute;width:450px;left:-10000px;",b[O].insertBefore(m,b));
e.siteElement=m;
m.id||(b=m,S(gd,a,0),n="___"+a+"_"+gd[a]++,b.id=n);
b=T();
b[">type"]=a;
V(c,b);
n=f;
c=m;
f=h||{};
b=f[sa]||{};
Ua(!f.allowPost||!b.onload,"onload is not supported by post iframe");
h=b=n;
Oc[G](b)&&(h=Z("iframes/"+h[Aa](1)+"/url"),Ua(!!h,"Unknown iframe url config for - "+b));
n=$a(R,h[s](Pc,Rc));
b=c.ownerDocument||R;
m=0;
do{h=f.id||["I",Lc++,"_",(new Date)[oa]()][P]("")
}while(b[va](h)&&5>++m);
Ua(5>m,"Error creating iframe id");
m={};
var p={};
b[Ba]&&9>b[Ba]&&(m.hostiemode=b[Ba]);
V(f.queryParams||{},m);
V(f.fragmentParams||{},p);
var w=f.connectWithQueryParams?m:p,C=f.pfname,u=T();
u.id=h;
u.parent=b[A][qa]+"//"+b[A].host;
var J=X(b[A][D],"parent"),C=C||"";
!C&&J&&(J=X(b[A][D],"id",""),C=X(b[A][D],"pfname",""),C=J?C+"/"+J:"");
u.pfname=C;
V(u,w);
(u=X(n,"rpctoken")||m.rpctoken||p.rpctoken)||(u=w.rpctoken=f.rpctoken||r(Math.round(100000000*Bc())));
f.rpctoken=u;
u=b[A][D];
w=T();
(J=X(u,"_bsh",Y.bsh))&&(w._bsh=J);
(u=ib(u))&&(w.jsh=u);
f.hintInFragment?V(w,p):V(w,m);
n=Za(n,m,p,f.paramsSerializer);
p=T();
V(Jc,p);
V(f[sa],p);
p.name=p.id=h;
p.src=n;
f.eurl=n;
if((f||{}).allowPost&&2000<n[I]){m=Wa(n);
p.src="";
p["data-postorigin"]=n;
n=Nc(b,c,p,h);
-1!=navigator.userAgent[H]("WebKit")&&(g=n.contentWindow.document,g.open(),p=g[t]("div"),w={},u=h+"_inner",w.name=u,w.src="",w.style="display:none",Nc(b,p,w,u,f));
p=(f=m.j[0])?f[z]("&"):[];
f=[];
for(w=0;
w<p[I];
w++){u=p[w][z]("=",2),f[F]([ea(u[0]),ea(u[1])])
}m.j=[];
p=Xa(m);
m=b[t]("form");
m.action=p;
m.method="POST";
m.target=h;
m[B].display="none";
for(h=0;
h<f[I];
h++){p=b[t]("input"),fa(p,"hidden"),p.name=f[h][0],p.value=f[h][1],m[ga](p)
}c[ga](m);
m.submit();
m[O][za](m);
g&&g.close();
g=n
}else{g=Nc(b,c,p,h,f)
}e.iframeNode=g;
e.id=g[M]("id");
g=e.id;
c=T();
c.id=g;
c.userParams=e.userParams;
c.url=e.url;
fa(c,e[ya]);
c.state=1;
$[g]=c;
g=e
}else{g=null
}g&&((e=g.id)&&d[F](e),xd(a,g))
}},Ed=function(a,b,c){if(a&&1===a.nodeType&&b){if(c){return 1
}if(pd[b]){if(hb[a[xa][Da]()]){return(a=a.innerHTML)&&a[s](/^[\s\xa0]+|[\s\xa0]+$/g,"")?0:1
}}else{if(od[b]){return 0
}if(nd[b]){return 1
}}}return null
},ld=function(a,b){var c=b[ya];
delete b[ya];
var d=("string"===typeof a?q[va](a):a)||void 0;
if(d){var e={},f;
for(f in b){U(b,f)&&(e[f[Da]()]=b[f])
}e.rd=1;
(f=!!e.ri)&&delete e.ri;
var g=[];
yd(c,d,e,g,0,f);
zd(c,g)
}else{hc("string"==="gapi."+c+".render: missing element "+typeof a?a:"")
}};
S(W,"platform",{}).go=vd;
var wd=function(a){for(var b=["_c","jsl","h"],c=0;
c<b[I]&&a;
c++){a=a[b[c]]
}b=ib(Ha[D]);
return !a||0!=a[H]("n;")&&0!=b[H]("n;")&&a!==b
},zd=function(a,b){Fd(a,b)
},db=function(a){ud(a,!0)
},Gd=function(a,b){for(var c=b||[],d=0;
d<c[I];
++d){a(c[d])
}for(d=0;
d<c[I];
d++){Ad(c[d])
}};
wb[F](["platform",function(a,b,c){rd=c;
b&&qd[F](b);
Gd(Bd,a);
Gd(Cd,c._c.annotation);
Gd(Dd,c._c.bimodal);
ac();
Zb();
if("explicit"!=Z("parsetags")){jb(a);
fc(ec())&&!Z("disableRealtimeCallback")&&jc();
var d;
c&&(a=c.callback)&&(d=Ta(a),delete c.callback);
fb(function(){db(d)
})
}}]);
W._pl=!0;
var Hd=function(a){a=(a=$[a])?a.oid:void 0;
if(a){var b=R[va](a);
b&&b[O][za](b);
delete $[a];
Hd(a)
}};
var Id=/^\{h\:'/,Jd=/^!_/,Kd="",Fd=function(a,b){function c(){bb("message",d,"remove","de")
}function d(d){var g=d.data,h=d.origin;
if(Ld(g,b)){var l=e;
e=!1;
l&&sb("rqe");
Md(a,function(){l&&sb("rqd");
c();
for(var a=S(Y,"RPMQ",[]),b=0;
b<a[I];
b++){a[b]({data:g,origin:h})
}})
}}if(0!==b[I]){Kd=X(Ha[D],"pfname","");
var e=!0;
bb("message",d,"add","at");
Tb(a,c)
}},Ld=function(a,b){a=r(a);
if(Id[G](a)){return !0
}var c=!1;
Jd[G](a)&&(c=!0,a=a[x](2));
if(!/^\{/[G](a)){return !1
}var d=$c(a);
if(!d){return !1
}var e=d.f;
if(d.s&&e&&-1!=Ka[L](b,e)){if("_renderstart"===d.s||d.s===Kd+"/"+e+"::_renderstart"){var f=d.a&&d.a[c?0:1],c=R[va](e);
lc(e,2);
if(f&&c&&f[ja]&&f[ta]){n:{d=c[O];
e=f||{};
if(ic()){var g=c.id;
if(g){f=(f=$[g])?f.state:void 0;
if(1===f||4===f){break n
}Hd(g)
}}(f=d.nextSibling)&&f[M]&&f[M]("data-gapistub")&&(d[O][za](f),d[B].cssText="");
var f=e[ja],h=e[ta],l=d[B];
l.textIndent="0";
l.margin="0";
l.padding="0";
l.background="transparent";
l.borderStyle="none";
l.cssFloat="none";
l.styleFloat="none";
l.lineHeight="normal";
l.fontSize="1px";
l.verticalAlign="baseline";
d=d[B];
d.display="inline-block";
l=c[B];
l.position="static";
l.left=0;
l.top=0;
l.visibility="visible";
f&&(d.width=l.width=f+"px");
h&&(d.height=l.height=h+"px");
e.verticalAlign&&(d.verticalAlign=e.verticalAlign);
g&&lc(g,3)
}c["data-csi-wdt"]=(new Date)[oa]()
}}return !0
}return !1
},Md=function(a,b){Tb(a,b)
};
var Nd=function(a,b){this.B=a;
var c=b||{};
this.R=c.W;
this.A=c.domain;
this.C=c.path;
this.S=c.X
},Od=/^[-+/_=.:|%&a-zA-Z0-9@]*$/,Pd=/^[A-Z_][A-Z0-9_]{0,63}$/;
Nd[K].write=function(a,b){if(!Pd[G](this.B)){throw"Invalid cookie name"
}if(!Od[G](a)){throw"Invalid cookie value"
}var c=this.B+"="+a;
this.A&&(c+=";domain="+this.A);
this.C&&(c+=";path="+this.C);
var d="number"===typeof b?b:this.R;
if(0<=d){var e=new Date;
e.setSeconds(e.getSeconds()+d);
c+=";expires="+e.toUTCString()
}this.S&&(c+=";secure");
q.cookie=c;
return !0
};
Nd.iterate=function(a){for(var b=q.cookie[z](/;\s*/),c=0;
c<b[I];
++c){var d=b[c][z]("="),e=d[ha]();
a(e,d[P]("="))
}};
var Qd=function(a){this.U=a
},Rd={};
Qd[K].write=function(a){Rd[this.U]=a;
return !0
};
Qd.iterate=function(a){for(var b in Rd){Rd.hasOwnProperty(b)&&a(b,Rd[b])
}};
var Sd="https:"===k[A][qa],Td=Sd||"http:"===k[A][qa]?Nd:Qd,Ud=function(a){var b=a[x](1),c="",d=k[A].hostname;
if(""!==b){c=da(b,10);
if(isNaN(c)){return null
}b=d[z](".");
if(b[I]<c-1){return null
}b[I]==c-1&&(d="."+d)
}else{d=""
}return{d:"S"==a[la](0),domain:d,i:c}
},Vd=function(a){if(0!==a[H]("GCSC")){return null
}var b={w:!1};
a=a[x](4);
if(!a){return b
}var c=a[la](0);
a=a[x](1);
var d=a.lastIndexOf("_");
if(-1==d){return b
}var e=Ud(a[x](d+1));
if(null==e){return b
}a=a[Aa](0,d);
if("_"!==a[la](0)){return b
}d="E"===c&&e.d;
return !d&&("U"!==c||e.d)||d&&!Sd?b:{w:!0,d:d,V:a[x](1),domain:e.domain,i:e.i}
},Wd=function(a){if(!a){return[]
}a=a[z]("=");
return a[1]?a[1][z]("|"):[]
},Xd=function(a){a=a[z](":");
return{t:a[0][z]("=")[1],O:Wd(a[1]),Z:Wd(a[2]),Y:Wd(a[3])}
},Yd=function(){var a,b=null;
Td.iterate(function(c,d){if(0===c[H]("G_AUTHUSER_")){var e=Ud(c[Aa](11));
if(!a||e.d&&!a.d||e.d==a.d&&e.i>a.i){a=e,b=d
}}});
if(null!==b){var c;
Td.iterate(function(b,d){var e=Vd(b);
e&&e.w&&e.d==a.d&&e.i==a.i&&(c=d)
});
if(c){var d=Xd(c),e=d&&d.O[Number(b)],d=d&&d.t;
if(e){return{P:b,Q:e,t:d}
}}}return null
};
var Zd=function(a){this.G=a
};
Zd[K].k=0;
Zd[K].F=2;
Zd[K].G=null;
Zd[K].v=!1;
Zd[K].L=function(){this.v||(this.k=0,this.v=!0,this.D())
};
Zd[K].D=function(){this.v&&(this.G()?this.k=this.F:this.k=Math.min(2*(this.k||this.F),120),k.setTimeout(Ga(this.D,this),1000*this.k))
};
for(var $d=0;
64>$d;
++$d){}var ae=null,ic=function(){return Y.oa=!0
},jc=function(){Y.oa=!0;
var a=Yd();
(a=a&&a.P)&&$b("googleapis.config/sessionIndex",a);
ae||(ae=S(Y,"ss",new Zd(be)));
a=ae;
a.L&&a.L()
},be=function(){var a=Yd(),b=a&&a.Q||null,c=a&&a.t;
Tb("auth",{callback:function(){var a=Q.gapi.auth,e={client_id:c,session_state:b};
a.checkSessionState(e,function(b){var c=e.session_state,h=Z("isLoggedIn");
b=Z("debug/forceIm")?!1:c&&b||!c&&!b;
if(h=h!=b){$b("isLoggedIn",b),jc(),md(),b||((b=a.signOut)?b():(b=a.setToken)&&b(null))
}b=ec();
var l=Z("savedUserState"),c=a._guss(b.cookiepolicy),l=l!=c&&"undefined"!=typeof l;
$b("savedUserState",c);
(h||l)&&fc(b)&&!Z("disableRealtimeCallback")&&a._pimf(b,!0)
})
}});
return !0
};
sb("bs0",!0,k.gapi._bs);
sb("bs1",!0);
delete k.gapi._bs
})();
gapi.load("",{callback:window.gapi_onload,_c:{jsl:{ci:{llang:"de",client:{headers:{response:["Cache-Control","Content-Disposition","Content-Encoding","Content-Language","Content-Length","Content-MD5","Content-Range","Content-Type","Date","ETag","Expires","Last-Modified","Location","Pragma","Range","Server","Transfer-Encoding","WWW-Authenticate","X-Goog-Safety-Content-Type","X-Goog-Safety-Encoding","X-Goog-Upload-Chunk-Granularity","X-Goog-Upload-Control-URL","X-Goog-Upload-Size-Received","X-Goog-Upload-Status","X-Goog-Upload-URL","X-Goog-Diff-Download-Range","X-Goog-Hash","X-Server-Object-Version","X-Guploader-Customer","X-Guploader-Upload-Result","X-Guploader-Uploadid"],request:["Accept","Accept-Language","Authorization","Cache-Control","Content-Disposition","Content-Encoding","Content-Language","Content-Length","Content-MD5","Content-Range","Content-Type","Date","GData-Version","Host","If-Match","If-Modified-Since","If-None-Match","If-Unmodified-Since","Origin","OriginToken","Pragma","Range","Slug","Transfer-Encoding","X-ClientDetails","X-GData-Client","X-GData-Key","X-Goog-AuthUser","X-Goog-PageId","X-Goog-Encode-Response-If-Executable","X-Goog-Correlation-Id","X-Goog-Request-Info","X-Goog-Experiments","x-goog-iam-role","x-goog-iam-authorization-token","X-Goog-Spatula","X-Goog-Upload-Command","X-Goog-Upload-Content-Disposition","X-Goog-Upload-Content-Length","X-Goog-Upload-Content-Type","X-Goog-Upload-File-Name","X-Goog-Upload-Offset","X-Goog-Upload-Protocol","X-Goog-Visitor-Id","X-HTTP-Method-Override","X-JavaScript-User-Agent","X-Pan-Versionid","X-Origin","X-Referer","X-Upload-Content-Length","X-Upload-Content-Type","X-Use-HTTP-Status-Code-Override","X-YouTube-VVT","X-YouTube-Page-CL","X-YouTube-Page-Timestamp"]},cors:false},plus_layer:{isEnabled:false},enableMultilogin:true,disableRealtimeCallback:false,isLoggedIn:false,iframes:{additnow:{methods:["launchurl"],url:"https://apis.google.com/additnow/additnow.html?usegapi\u003d1"},person:{url:":socialhost:/:session_prefix:_/widget/render/person?usegapi\u003d1"},visibility:{params:{url:""},url:":socialhost:/:session_prefix:_/widget/render/visibility?usegapi\u003d1"},photocomments:{url:":socialhost:/:session_prefix:_/widget/render/photocomments?usegapi\u003d1"},plus_followers:{params:{url:""},url:":socialhost:/_/im/_/widget/render/plus/followers?usegapi\u003d1"},signin:{methods:["onauth"],params:{url:""},url:":socialhost:/:session_prefix:_/widget/render/signin?usegapi\u003d1"},share:{url:":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi\u003d1"},commentcount:{url:":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi\u003d1"},page:{url:":socialhost:/:session_prefix:_/widget/render/page?usegapi\u003d1"},hangout:{url:"https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"},plus_circle:{params:{url:""},url:":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi\u003d1"},youtube:{methods:["scroll","openwindow"],params:{location:["search","hash"]},url:":socialhost:/:session_prefix:_/widget/render/youtube?usegapi\u003d1"},zoomableimage:{url:"https://ssl.gstatic.com/microscope/embed/"},card:{url:":socialhost:/:session_prefix:_/hovercard/card"},evwidget:{params:{url:""},url:":socialhost:/:session_prefix:_/events/widget?usegapi\u003d1"},reportabuse:{params:{url:""},url:":socialhost:/:session_prefix:_/widget/render/reportabuse?usegapi\u003d1"},follow:{url:":socialhost:/:session_prefix:_/widget/render/follow?usegapi\u003d1"},shortlists:{url:""},plus:{url:":socialhost:/:session_prefix:_/widget/render/badge?usegapi\u003d1"},configurator:{url:":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi\u003d1"},":socialhost:":"https://apis.google.com",post:{params:{url:""},url:":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi\u003d1"},community:{url:":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi\u003d1"},":gplus_url:":"https://plus.google.com",rbr_s:{params:{url:""},url:":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"},autocomplete:{params:{url:""},url:":socialhost:/:session_prefix:_/widget/render/autocomplete"},plus_share:{params:{url:""},url:":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare\u003dtrue\u0026usegapi\u003d1"},":source:":"3p",blogger:{methods:["scroll","openwindow"],params:{location:["search","hash"]},url:":socialhost:/:session_prefix:_/widget/render/blogger?usegapi\u003d1"},savetowallet:{url:"https://clients5.google.com/s2w/o/savetowallet"},rbr_i:{params:{url:""},url:":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"},appcirclepicker:{url:":socialhost:/:session_prefix:_/widget/render/appcirclepicker"},savetodrive:{methods:["save"],url:"https://drive.google.com/savetodrivebutton?usegapi\u003d1"},":im_socialhost:":"https://plus.googleapis.com",ytshare:{params:{url:""},url:":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi\u003d1"},":signuphost:":"https://plus.google.com",plusone:{params:{count:"",size:"",url:""},url:":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi\u003d1"},comments:{methods:["scroll","openwindow"],params:{location:["search","hash"]},url:":socialhost:/:session_prefix:_/widget/render/comments?usegapi\u003d1"},ytsubscribe:{url:"https://www.youtube.com/subscribe_embed?usegapi\u003d1"}},isPlusUser:false,debug:{host:"https://apis.google.com",forceIm:false,reportExceptionRate:0.05,rethrowException:false},enableContextualSignin:false,enableSigninTooltip:false,deviceType:"desktop",inline:{css:1},lexps:[102,99,97,79,109,45,17,117,115,81,127,123,122,61,30],include_granted_scopes:true,"oauth-flow":{usegapi:false,disableOpt:true,authUrl:"https://accounts.google.com/o/oauth2/auth",proxyUrl:"https://accounts.google.com/o/oauth2/postmessageRelay"},report:{apiRate:{"gapi\\.signin\\..*":0.05},host:"https://apis.google.com",rate:0.001,apis:["iframes\\..*","gadgets\\..*","gapi\\.appcirclepicker\\..*","gapi\\.auth\\..*","gapi\\.client\\..*"]},csi:{rate:0.01},"googleapis.config":{auth:{useFirstPartyAuthV2:false}}},h:"m;/_/scs/apps-static/_/js/k\u003doz.gapi.de.UmKUqE4ZCV0.O/m\u003d__features__/am\u003dAQ/rt\u003dj/d\u003d1/t\u003dzcms/rs\u003dAItRSTOAFZsacC5Rno5WDXXrpGONOpWqvQ",u:"https://apis.google.com/js/platform.js",hee:true,fp:"55da5efad07bbc48f46e6e998cd919f2a45d531c",dpo:false},platform:["additnow","blogger","comments","commentcount","community","follow","page","person","plus","plusone","post","reportabuse","savetodrive","savetowallet","shortlists","visibility","youtube","ytsubscribe","zoomableimage","photocomments","hangout"],fp:"55da5efad07bbc48f46e6e998cd919f2a45d531c",annotation:["interactivepost","recobar","autocomplete","profile"],bimodal:["signin","share"]}});
var Helvetia={};
Helvetia.$=jQuery.noConflict();
Helvetia.$(document).ready(function(){var j=false;
var i=false;
var h=/(helvetiaCookieAccept=)/g;
var k=Helvetia.$(".modCookieBanner").height();
var b=window.location.href;
var g=Helvetia.$(".modCookieBanner .expireDate").text();
if(b.indexOf("?wcmmode=disabled")!=-1){i=true
}if(Helvetia.$(".modCookieBanner #author").text()=="Authormode activated"){j=true
}Helvetia.$(".modCookieBanner").hide();
if(h.test(document.cookie)==false){var f=Helvetia.$(".modCookieBanner .closeLink").css("color");
if(!j){Helvetia.$(".modCookieBanner").slideDown(1000);
Helvetia.$("html #wrap.head").animate({paddingTop:k},1000);
Helvetia.$(".modCookieBanner .bannerText a").css("color",f);
if(!j&&!i){e()
}}}else{var c=a();
if(c=="false"&&!i&&!j){e()
}}Helvetia.$("#closeLinkId").click(function(){if(!j&&!i){Helvetia.$(".modCookieBanner").slideUp(1000);
Helvetia.$("html #wrap.head").animate({paddingTop:"-"+k},1750);
d("helvetiaCookieAccept",true,g)
}});
Helvetia.$("body a").click(function(){if(Helvetia.$("input#chkContinueBrowse").is(":checked")&&h.test(document.cookie)==false&&!j&&!i){d("helvetiaCookieAccept",true,g)
}});
Helvetia.$("#cookiesAcceptButton").click(function(){if(!j&&!i){Helvetia.$(".modCookieBanner").slideUp(1000);
Helvetia.$("html #wrap.head").animate({paddingTop:"-"+k},1750);
d("helvetiaCookieAccept",true,g)
}});
Helvetia.$("#cookiesUnAcceptButton").click(function(){if(!j&&!i){Helvetia.$(".modCookieBanner").slideUp(1000);
Helvetia.$("html #wrap.head").animate({paddingTop:"-"+k},1750);
d("helvetiaCookieAccept",false,g);
e()
}});
function d(o,q,r){if(r){var m=new Date();
m.setTime(m.getTime()+(r*24*60*60*1000));
var l="; expires="+m.toGMTString()
}else{var l=""
}document.cookie=o+"="+q+l+"; path=/"
}function e(){if(document.cookie.indexOf("helvetiaCookieAccept")>=0){var l=location.pathname.substring(location.pathname.lastIndexOf(".html"),0);
jQuery.ajax({type:"GET",url:l+".cookiebanner.html"})
}}function a(){var q="";
var m=document.cookie.split(" ");
for(var o=0;
o<m.length;
o++){if(m[o]=="helvetiaCookieAccept=false;"||m[o]=="helvetiaCookieAccept=true;"){var r=m[o].indexOf("=")+1;
var l=m[o].lastIndexOf(";");
q=m[o].substring(r,l);
break
}}return q
}});
/*! Lazy Load XT v1.0.6 2014-11-19
 * http://ressio.github.io/lazy-load-xt
 * (C) 2014 RESS.io
 * Licensed under MIT */
(function(k,r,w,l){var t="lazyLoadXT",B="lazied",m="load error",a="lazy-hidden",E=w.documentElement||w.body,g=(r.onscroll===l||!!r.operamini||!E.getBoundingClientRect),i={autoInit:true,selector:"img[data-src]",blankImage:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",throttle:99,forceLoad:g,loadEvent:"pageshow",updateEvent:"load orientationchange resize scroll touchmove focus",forceEvent:"",oninit:{removeClass:"lazy"},onshow:{addClass:a},onload:{removeClass:a,addClass:"lazy-loaded"},onerror:{removeClass:a},checkDuplicates:true},d={srcAttr:"data-src",edgeX:1,edgeY:1,visibleOnly:false},u=k(r),v=k.isFunction,b=k.extend,j=k.data||function(G,F){return k(G).data(F)
},y=k.contains||function(G,F){while(F=F.parentNode){if(F===G){return true
}}return false
},s=[],f=0,q=0;
k[t]=b(i,d,k[t]);
function A(F,G){return F[G]===l?i[G]:F[G]
}function c(){var F=r.pageYOffset;
return(F===l)?E.scrollTop:F
}k.fn[t]=function(J){J=J||{};
var F=A(J,"blankImage"),I=A(J,"checkDuplicates"),G=A(J,"scrollContainer"),H={},K;
k(G).on("scroll",x);
for(K in d){H[K]=A(J,K)
}return this.each(function(L,N){if(N===r){k(i.selector).lazyLoadXT(J)
}else{if(I&&j(N,B)){return
}var M=k(N).data(B,1);
if(F&&N.tagName==="IMG"&&!N.src){N.src=F
}M[t]=b({},H);
e("init",M);
s.push(M)
}})
};
function e(H,F){var G=i["on"+H];
if(G){if(v(G)){G.call(F[0])
}else{if(G.addClass){F.addClass(G.addClass)
}if(G.removeClass){F.removeClass(G.removeClass)
}}}F.trigger("lazy"+H,[F]);
x()
}function h(F){e(F.type,k(this).off(m,h))
}function o(G){if(!s.length){return
}G=G||i.forceLoad;
f=Infinity;
var H=c(),N=r.innerHeight||E.clientHeight,Q=r.innerWidth||E.clientWidth,M,I;
for(M=0,I=s.length;
M<I;
M++){var V=s[M],J=V[0],U=V[t],K=false,L=G,R;
if(!y(E,J)){K=true
}else{if(G||!U.visibleOnly||J.offsetWidth||J.offsetHeight){if(!L){var T=J.getBoundingClientRect(),P=U.edgeX,O=U.edgeY;
R=(T.top+H-O)-N;
L=(R<=H&&T.bottom>-O&&T.left<=Q+P&&T.right>-P)
}if(L){e("show",V);
var S=U.srcAttr,F=v(S)?S(V):J.getAttribute(S);
if(F){V.on(m,h);
J.src=F
}K=true
}else{if(R<f){f=R
}}}}if(K){s.splice(M--,1);
I--
}}if(!I){e("complete",k(E))
}}function z(){if(q>1){q=1;
o();
setTimeout(z,i.throttle)
}else{q=0
}}function x(F){if(!s.length){return
}if(F&&F.type==="scroll"&&F.currentTarget===r){if(f>=c()){return
}}if(!q){setTimeout(z,0)
}q=2
}function C(){u.lazyLoadXT()
}function D(){o(true)
}k(w).ready(function(){e("start",u);
u.on(i.loadEvent,C).on(i.updateEvent,x).on(i.forceEvent,D);
k(w).on(i.updateEvent,x);
if(i.autoInit){C()
}})
})(window.jQuery||window.Zepto||window.$,window,document);