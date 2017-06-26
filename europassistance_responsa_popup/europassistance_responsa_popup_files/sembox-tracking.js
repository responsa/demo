$embox = function(site_id){

urlsite = new String(location.pathname);
var res = urlsite.toLowerCase();
if (res == "/landing-nuova-protezione-casa/"){
	site_id = '1215';
}
if (res == "/landing-nuova-protezione-casa"){
	site_id = '1215';
}

var source = '', content = '', d = document,
_get = (function(){
for(var q = {}, pairs = location.search.substr(1).split('&'), le = pairs.length, i = 0, par; i < le; i++){
par = pairs[i].split('=');q[par[0]]=par[1];
}return function (key) {if (q[key])return q[key];return ''};
})();




//var ua = navigator.userAgent.toLowerCase();
/*if (ua.indexOf('safari') != -1) {
    if (ua.indexOf('chrome') > -1) {} else {*/
            d = document;
            site_id_s = site_id;
            var source_s = '',
                content_s = '',
                p_s = ''; 
            var q_s = (function () {
                for (var q_s = {}, pairs = location.search.substr(1).split('&'), le = pairs.length, i = 0, par; i < le; i++) {
                    par = pairs[i].split('=');
                    q_s[par[0]] = par[1];
                }
				if 	(source_s == ''){																									
					if (document.referrer.split('/')[2] != '' && document.referrer.split('/')[2] != 'undefined' && document.referrer.split('/')[2] != null) {
						source_s = document.referrer.split('/')[2].trim();
						source_s = source_s.toLowerCase();
					}

					if (source_s == '' || source_s == 'undefined' || source_s == null) {
						source_s = "direct";
					}
					
					if (source_s != '' && source_s.indexOf("google") > 0 ) {
						source_s = 'Google-not-Provided';
						content_s = 'not provided'
					}
					
					if (source_s != '' && source_s.indexOf("bing") > 0 ) {
						source_s = 'Bing';
					}
					
					if (source_s != '' && source_s != 'Google-not-Provided' && source_s != 'Bing' && source_s != 'direct' ){
						content_s = source_s;
						source_s = 'Referer';		
					}
				}						
                return function (key) {
                    if (q_s[key]) return q_s[key];
                    return ''
                };
            })();						
			
			
            if (q_s('sembox_source')){              
                acst = new Array();
                acst[0] = encodeURIComponent((q_s('sembox_source') || source_s));
                acst[1] = encodeURIComponent((q_s('sembox_content') || content_s));
                acst[2] = "";
                acst[3] = encodeURIComponent((q_s('sembox_p') || p_s));
				
				var date_s = new Date();
				date_s.setTime(date_s.getTime()+(180*10000));
				var expire_s = "; expires="+date_s.toGMTString();
				
                var cookie_name = "sbx_s" + site_id_s,
                    match = d.cookie.match(new RegExp(cookie_name + "=([^;]+)")),
                    value;
                if (match == null) {
                    value = "y";
                    d.cookie = cookie_name + '=' + value + expire_s +';path=/;';
                    coksi = CreationCookie("prov"+site_id_s, js_array_serialize(acst), 1);
                }
            }								
			
            if (q_s('tx_s')){              
                acst = new Array();
                acst[0] = encodeURIComponent((q_s('tx_s') || source_s));
                acst[1] = encodeURIComponent((q_s('tx_c') || content_s));
                acst[2] = "";
                acst[3] = encodeURIComponent((q_s('tx_p') || content_s));
                var cookie_name = "sbx_s" + site_id_s,
                    match = d.cookie.match(new RegExp(cookie_name + "=([^;]+)")),
                    value;
                if (match == null) {
                    value = "y";
                    d.cookie = cookie_name + '=' + value + ';path=/;';
                    coksi = CreationCookie("prov"+site_id_s, js_array_serialize(acst), 1);
                }
            }            
			
			
            if (source_s != '' && source_s != 'direct'){              
                acst = new Array();
                acst[0] = source_s;
                acst[1] = content_s;
                acst[2] = "";
                acst[3] = p_s;
				
				var date_s = new Date();
				date_s.setTime(date_s.getTime()+(180*10000));
				var expire_s = "; expires="+date_s.toGMTString();
				
                var cookie_name = "sbx_s" + site_id_s,
                    match = d.cookie.match(new RegExp(cookie_name + "=([^;]+)")),
                    value;
                if (match == null) {
                    value = "y";
                    d.cookie = cookie_name + '=' + value + expire_s +';path=/;';
                    coksi = CreationCookie("prov"+site_id_s, js_array_serialize(acst), 1);
                }
            }			
			
    /*}
}*/

function CreationCookie(nom, valeur, permanent) {
    if (permanent) {
        dateExp = new Date();
        dateExp.setDate(dateExp.getDate() + 31);
        dateExp = dateExp.toGMTString();
        ifpermanent = ';expires=' + dateExp + ';';
        document.cookie = nom + '=' + escape(valeur) + ifpermanent + ';path=/;';
    }
}

function js_array_serialize(a) {
    var a_php = "";
    var total = 0;
    for (var key in a) {
        ++total;
        a_php = a_php + "i:" + total + ";s:" + String(a[key]).length + ":\"" + String(a[key]) + "\";";
    }
    a_php = "a:" + total + ":{" + a_php + "}";
    return a_php;
}

if ( site_id == '1180'){
	!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
	n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
	n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
	t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
	document,'script','//connect.facebook.net/en_US/fbevents.js');
	fbq('init', '387314134807032');
	fbq('track', 'PageView');
	fbq('track', 'ViewContent');
}


this.source = function(value){source=value;return this};
this.content = function(value){content=value;return this};
this.hit=function(){


var date_system = new Date();
date_system.setTime(date_system.getTime()+(1*1000));
var system_date = "; expires="+date_system.toGMTString();

d.cookie = '1=2' + system_date + '; path=/';

var date_expires = new Date();
date_expires.setTime(date_expires.getTime()+(180*10000));
var expires_date = "; expires="+date_expires.toGMTString();

var cookie_name = "sbx" + site_id,
match = d.cookie.match(new RegExp(cookie_name + "=([^;]+)")),
value;

if (match == null) {
if ((d.referrer&&!_get("sembox_noref")&&!_get("sembox_source"))||(d.referrer&&!_get("tx_noref")&&!_get("tx_s"))){var inter = d.referrer.toString().indexOf(window.location.hostname);if (inter === 7||inter === 8)return false}
if (_get("sembox_source")!=''){
value = '&sembox_source='+(encodeURIComponent(_get("sembox_source")) || source)+
'&sembox_content='+encodeURIComponent(_get("sembox_content") || content)+
'&sembox_p='+encodeURIComponent(_get("sembox_p"))+
'&sembox_ka='+encodeURIComponent(_get("sembox_ka"))+
'&gclid='+encodeURIComponent(_get("gclid"))+
'&ref='+encodeURIComponent(d.referrer);
}else{
value = '&sembox_source='+(encodeURIComponent(_get("tx_s")) || source)+
'&sembox_content='+encodeURIComponent(_get("tx_c") || content)+
'&sembox_p='+encodeURIComponent(_get("tx_p"))+
'&sembox_ka='+encodeURIComponent(_get("tx_ka"))+
'&gclid='+encodeURIComponent(_get("gclid"))+
'&ref='+encodeURIComponent(d.referrer);    
}

d.cookie = cookie_name + '=' + value + expires_date + '; path=/';

} else if (match[1] === 'y') {
return;
} else {
value = match[1];



}
if (value) {
var img = new Image();
img.src = $embox.host + 'sembox.it/index.php?load=conversioni&act=hit&c=' + site_id + value;
img.onload = function() {
d.cookie = cookie_name + '=y; path=/';
};
}
};
};
$embox.host = (("https:" == document.location.protocol) ? "https://tracking." : "http://tools.");
(function(queue){
for (var i = 0, le = queue.length; i < le; i++)
queue[i]();
})(window.$embox_queue||[]);