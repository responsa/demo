LH_dataCreazione='26/06/2017-10.25.18';LH_Versione='3.12';agente=navigator.userAgent.toLowerCase();function LH_reset()
{LHreset();}
function LHreset()
{clearTimeout(LHt_Sparizione1);clearTimeout(LHt_Sparizione2);clearTimeout(LHt_Ingaggio);clearTimeout(LHt_http);delete Apparizione;delete LHinfo;if(document.getElementById("LH2013"))
{var LHelement=document.getElementById("LH2013");LHelement.parentNode.removeChild(LHelement);}}
LHfrequenza=30000;LHPrimotest=true;IDgruppo='72976';IDwidget='71';var LHt_Sparizione1;var LHt_Sparizione2;var LHt_Ingaggio;var LHt_http;function LHSessionStorage(chiave,valore)
{try
{sessionStorage.setItem(chiave,valore);}
catch(E){}}
function LHsettaLocalStorage(chiave,valore)
{try
{localStorage.setItem(chiave,valore);}
catch(E){}}
if(typeof LHinfo==='undefined')
{LHinfo='';}
else
LHinfo=LHinfo.replace('^','-').replace('|','-').replace(';','-');if(typeof LHnick==='undefined')
{LHnick='';}
if(typeof LHalias==='undefined')
{LHalias='';}
if(typeof LHragsoc==='undefined')
{LHragsoc='';}
if(typeof LHemail==='undefined')
{LHemail='';}
if(typeof LHidpadre==='undefined')
{LHidpadre='';}
if(typeof LHidfiglio==='undefined')
{LHidfiglio='';}
if(typeof LHcluster==='undefined')
{LHcluster='';}
if(typeof LHtarget==='undefined')
{LHtarget='LiveHelpwin1_'+ IDgruppo;}
if(LHtarget=='')
LHtarget='LiveHelpwin1_'+ IDgruppo;function ProvenienzaURL()
{if(typeof LHurl==='undefined')
{return(escape(document.location.href));}
else
if(LHurl=='')
return(escape(document.location.href));return(escape(LHurl));}
function StringaURL()
{if(typeof LHurlstring==='undefined')
{return(document.location.href);}
else
if(LHurlstring=='')
return(document.location.href);return(LHurlstring);}
if(typeof LHheight==='undefined')
{LHheight=600;}
if(typeof LHwidth==='undefined')
{LHwidth=500;}
if(typeof LHtesto_btn==='undefined')
{LHtesto_btn='Widget 1 - Ciao,<br>hai bisogno di aiuto?<br><b>Chatta con noi</b> ';}
if(!sessionStorage.getItem("minimizza_"+ IDgruppo))
{LHSessionStorage("minimizza_"+ IDgruppo,"0");}
giachat=0;Stanza='EuropAssistance.it-72976';carrello=0;LHTemplate='12096';Responsive=1;Priorita=1;Bottone='29';BottoneMobile='30';BottoneChiuso='-1';BottoneMobileChiuso='-1';Bottone_img='73220%5FEA%5FROSSO%5Fristretto%2Epng';BottoneMobile_img='73220%5Fchat%5Feuropeassistance%5FARANCIONE%5FPICCOLO%5Frosso%5Fgrigio%2Epng';BottoneChiuso_img='bottone%5Fchat2%2Epng';BottoneMobileChiuso_img='bottone%5Fchat2%2Epng';if(agente.indexOf('mobile')>0&&BottoneMobile!='0')
{Bottone=BottoneMobile;Bottone_img=BottoneMobile_img;}
if(agente.indexOf('mobile')>0&&BottoneMobileChiuso!='0')
{BottoneChiuso=BottoneMobileChiuso;BottoneChiuso_img=BottoneMobileChiuso_img;}
if(sessionStorage.getItem("minimizza_"+ IDgruppo)=="1"&&BottoneChiuso!="-1")
{Bottone=BottoneChiuso;Bottone_img=BottoneChiuso_img;}
Trasparente='0';PosizioneX='right'
Sparizione=0;Operatori=1;if(typeof Apparizione==='undefined')
{Apparizione=60000;}
Vis_dopo=5000;Pagine_viste='5';Permanenza_sito=1800;Disponibilita='1';Provenienza='';if(typeof LHparametri==='undefined')
{LHparametri='';}
urltags='';pagine_escluse='';Vis_lun=1;Vis_mar=1;Vis_mer=1;Vis_gio=1;Vis_ven=1;Vis_sab=0;Vis_dom=0;Vis_da='10';Vis_a='18';Esclusioni='';Chattato='1';vis_bottone=1;testato=0;data=new Date();tempo=data.getTime();Ingresso=parseInt(tempo);if(!sessionStorage.getItem("referrer_"+ IDgruppo))
if(document.referrer+''!='')
LHSessionStorage("referrer_"+ IDgruppo,document.referrer);else
LHSessionStorage("referrer_"+ IDgruppo,'NONE');if(!localStorage.getItem("permanenza_"+ IDgruppo))
{data=new Date();tempo=data.getTime();LHsettaLocalStorage("permanenza_"+ IDgruppo,parseInt(tempo));}
if(!sessionStorage.getItem("pagine_viste_"+ IDgruppo))
{LHSessionStorage("pagine_viste_"+ IDgruppo,1);}
else
{LHSessionStorage("pagine_viste_"+ IDgruppo,parseFloat(sessionStorage.getItem("pagine_viste_"+ IDgruppo))+ 1)}
function LHingaggio()
{vis_bottone=0;if(parseFloat(Pagine_viste)>0)
{testato=1;if(parseFloat(sessionStorage.getItem("pagine_viste_"+ IDgruppo))>=parseFloat(Pagine_viste))
{vis_bottone=1;}
else
{}}
if(vis_bottone==0)
{if(typeof LHbasket==='undefined')
{}
else
{testato=1;if(LHbasket<carrello)
{}
else
{vis_bottone=1;}}}
if(vis_bottone==0)
{if(Apparizione>0)
{testato=1;data=new Date();var adesso=data.getTime();if((parseInt(adesso)-Ingresso)>=Apparizione)
{vis_bottone=1;}
else
{}}}
if(vis_bottone==0)
{if(Permanenza_sito>0)
{testato=1;data=new Date();var adesso=data.getTime();if((parseInt(adesso)-parseInt(localStorage.getItem("permanenza_"+ IDgruppo)))/1000>=Permanenza_sito )
{vis_bottone=1;}
else
{}}}
if(vis_bottone==0)
{if(Provenienza!='')
{testato=1;prov=Provenienza.split(',');trovato=0;for(i=0;i<prov.length;i++)
{if(sessionStorage.getItem("referrer_"+ IDgruppo).indexOf(prov[i])>-1)
{trovato=1;vis_bottone=1;}}}}
if(vis_bottone==0)
{if(urltags!='')
{testato=1;prov2=urltags.split(',');trovato=0;tempurl=StringaURL();for(i=0;i<prov2.length;i++)
{if(tempurl.indexOf(prov2[i])>-1)
{trovato=1;vis_bottone=1;}}
if(trovato==0)
{}}}
if(testato==0)
{vis_bottone=1;}
if(agente.indexOf('mobile')>0&&BottoneMobile=='-1')
{vis_bottone=0;}
if(vis_bottone==1)
{trovato=0;if(Esclusioni!='')
{data=new Date();date=Esclusioni.split(',');gg=data.getDate();if(gg<10)
gg='0'+ gg
mm=data.getMonth()+ 1
if(mm<10)
mm='0'+mm
aaaa=data.getFullYear()
oggi=gg+'/'+ mm+'/'+ aaaa
for(i=0;i<date.length;i++)
{if(date[i]==oggi)
trovato=1;}}
if(trovato==1)
vis_bottone=0;}
if(vis_bottone==1)
{data=new Date();var giorno=data.getDay();if((Vis_lun==1&&giorno==1)||(Vis_mar==1&&giorno==2)||(Vis_mer==1&&giorno==3)||(Vis_gio==1&&giorno==4)||(Vis_ven==1&&giorno==5)||(Vis_sab==1&&giorno==6)||(Vis_dom==1&&giorno==0))
{}
else
{vis_bottone=0;}}
if(vis_bottone==1)
{data=new Date();var ora=data.getHours();if((parseFloat(Vis_da)<=parseFloat(ora)&&parseFloat(Vis_a)>parseFloat(ora)))
{}
else
{vis_bottone=0;}}
if(vis_bottone==1)
{if(pagine_escluse!='')
{tempurl=document.location.href;prov2=pagine_escluse.split(',');for(i=0;i<prov2.length;i++)
{if(tempurl.indexOf(prov2[i])>-1)
{vis_bottone=0;}}}}
if(vis_bottone==0)
{if(1==parseInt(Chattato))
if(giaChattato()==true)
vis_bottone=1;}
if(vis_bottone==1&&Operatori==1)
{http();}
else
{if(vis_bottone==1)
{LH_apri_bott();}
else
LHt_Ingaggio=setTimeout("LHingaggio()",5000);}}
function LH_minimizza()
{LHSessionStorage("minimizza_"+ IDgruppo,"1");if(Trasparente!='0')
{tempHTML='<table style="border:0px solid trasparent !important; background:trasparent !important; margin:0px !important; cellpadding:0px !important; cellspacing:0px !important;">';tempHTML=tempHTML+'<tr style="background:transparent !important;"><td style="border: 0px solid transparent !important; background:transparent !important;"><A HREF="#" OnClick="LH_chat(); return(false);"><img id="LH_bottone" border="0" src="https://server.livehelp.it/admin/logo_livehelp.asp?bottone='+ BottoneChiuso+'&immagine='+ BottoneChiuso_img+'&gruppo='+ IDgruppo+'&stanza='+ Stanza+'"></A></td></tr></table>';document.getElementById('LH2013').innerHTML=tempHTML;}
else
{document.getElementById('LH_bottone').src='https://server.livehelp.it/admin/logo_livehelp.asp?bottone='+ BottoneChiuso+'&immagine='+ BottoneChiuso_img+'&gruppo='+ IDgruppo+'&stanza='+ Stanza;document.getElementById('LH_chiudi').innerHTML='';}}
function LH_vis_bottone()
{LH_apri_bott();}
function LH_apri_bott()
{if(document.getElementById('LH2013'))
if(document.getElementById('LH2013').style.display!='none')
{if(Operatori==1)
{LHt_http=setTimeout("http();",LHfrequenza);}
return;}
var stringa=document.createElement("span");stringa.style.display='none';stringa.style.display='none';stringa.style.bottom='-150px';stringa.style.border='0px';if(PosizioneX=='right')
{stringa.style.right='15px';}
if(PosizioneX=='left')
{stringa.style.left='5px';}
if(PosizioneX=='topright')
{stringa.style.right='15px';}
if(PosizioneX=='midright')
{stringa.style.right='0px';}
if(PosizioneX=='midleft')
{stringa.style.left='0px';}
if(PosizioneX=='topleft')
{stringa.style.left='0px';}
try
{stringa.style.border='0px solid transparent !important';}catch(E){}
stringa.style.position='fixed';stringa.style.zIndex='32676';stringa.id='LH2013';if(agente.indexOf('msie 8')==-1)
{try
{stringa.style.setProperty("-webkit-transition","all 1s ease-in-out");stringa.style.setProperty("-moz-transition","all 1s ease-in-out");stringa.style.setProperty("-o-transition","all 1s ease-in-out");stringa.style.setProperty("-ms-transition","all 1s ease-in-out");}catch(E){}}
if(Trasparente=='0'||sessionStorage.getItem("minimizza_"+ IDgruppo)=="1"||agente.indexOf('mobile')>0)
{tempHTML='<table style="width: auto !important; border: 0px solid transparent !important; background:transparent !important;margin:0px !important; cellpadding:0px !important; cellspacing:0px !important;">';if(sessionStorage.getItem("minimizza_"+ IDgruppo)=="0"&&BottoneChiuso!="-1")
if(PosizioneX=='midright')
tempHTML=tempHTML+'<tr style="background:transparent !important;"><td align=right style="padding:0px !important; text-align:right !important;border: 0px solid transparent !important; background:transparent !important;" height="16"><A id="LH_chiudi" HREF="#" OnClick="LH_minimizza(); return(false);"><img style="position: absolute; top:9px; left:-7px; height:16px; width:16px;" src="https://server.livehelp.it/client_user_resp/img/cerchio2.png" border="0"></a></td></tr>';else
tempHTML=tempHTML+'<tr style="background:transparent !important;"><td align=right style="padding:0px !important; text-align:right !important;border: 0px solid transparent !important; background:transparent !important;" height="16"><A id="LH_chiudi" HREF="#" OnClick="LH_minimizza(); return(false);"><img style="position: absolute; top:9px; right:-7px; height:16px; width:16px;" src="https://server.livehelp.it/client_user_resp/img/cerchio2.png" border="0"></a></td></tr>';tempHTML=tempHTML+'<tr style="background:transparent !important;"><td style="padding:0px !important;border: 1px solid transparent !important; background:transparent !important;"><A HREF="#" OnClick="LH_chat(); return(false);"><img id="LH_bottone" border="0"  src="https://server.livehelp.it/admin/logo_livehelp.asp?bottone='+ Bottone+'&immagine='+ Bottone_img+'&gruppo='+ IDgruppo+'&stanza='+ Stanza+'"></A></td></tr></table>';}
else
{tempHTML='<table style="width: auto !important; border:0px solid transparent !important; background:transparent !important; margin:0px !important; cellpadding:0px !important; cellspacing:0px !important;">';if(sessionStorage.getItem("minimizza_"+ IDgruppo)=="0"&&BottoneChiuso!="-1")
tempHTML=tempHTML+'<tr style="background:transparent !important;"><td align=right style="padding:0px !important;border: 0px solid transparent !important; background:transparent !important;" height="16"><A id="LH_chiudi" HREF="#" OnClick="LH_minimizza(); return(false);"><img  style="position: absolute; top:8px !important; right:-1px !important;height:16px; width:16px;" src="https://server.livehelp.it/client_user_resp/img/cerchio2.png" border="0"></a></td></tr>';tempHTML=tempHTML+'<tr style="background:transparent !important;"><td style="padding:0px !important;border: 0px solid transparent !important; background:transparent !important;"><table style="width:240px; height:100px; border:0px solid transparent !important; background:trasparent !important; margin:0px !important; cellpadding:0px !important; cellspacing:0px !important; cursor:pointer;background-repeat:no-repeat !important;" OnClick="LH_chat(); return(false);" background="https://server.livehelp.it/admin/logo_livehelp.asp?bottone='+ Bottone+'&immagine='+ Bottone_img+'&gruppo='+ IDgruppo+'&stanza='+ Stanza+'"  width="240" height="100">';tempHTML=tempHTML+'<tr style="background:transparent !important;"><td style="border: 0px solid transparent !important; background:transparent !important;"><div  OnClick="LH_chat(); return(false);" id="testochat" style="font-family: verdana; font-size:12px; cursor:pointer;line-height:150%; padding-top:5px !important; padding-left:15px !important;padding-right:3px !important; padding-bottom:15px !important;">'+ LHtesto_btn+'</div></td></tr></table></td></tr></table>';}
stringa.innerHTML=tempHTML;document.getElementsByTagName('body')[0].parentNode.insertBefore(stringa,document.getElementsByTagName('body')[0].nextSibling);if(Sparizione!=0)
{LHt_Sparizione1=setTimeout("document.getElementById('LH2013').style.display='none';",Sparizione+1000);LHt_Sparizione2=setTimeout("document.getElementById('LH2013').style.bottom='-200px';",Sparizione);}
document.getElementById('LH2013').style.display='inline-block';if(PosizioneX=='topright')
{setTimeout("document.getElementById('LH2013').style.top='0px'",100);}
else if(PosizioneX=='topleft')
{setTimeout("document.getElementById('LH2013').style.top='0px'",100);}
else if(PosizioneX=='midleft')
{setTimeout("document.getElementById('LH2013').style.top= window.innerHeight/3 +'px'",100);}
else if(PosizioneX=='midright')
{setTimeout("document.getElementById('LH2013').style.top=window.innerHeight/3 +'px'",100);}
else
{setTimeout("document.getElementById('LH2013').style.bottom='0px'",100);}
if(Operatori==1)
{LHt_http=setTimeout("http();",LHfrequenza);}}
LHt_Ingaggio=setTimeout("LHingaggio()",Vis_dopo+100);function LH_chat()
{if(LHtarget!='_self')
{LH_hasWindow=window.open('','LiveHelpwin1_'+ IDgruppo,'status=no,location=no,toolbar=no,width='+ LHwidth+',height='+ LHheight+',resizable=yes');}
if(typeof LHmagento==='undefined')
{LH_apri_win();return;}
if(LHmagento==='')
{LH_apri_win();return;}
var xmlhttp=false;try{xmlhttp=new XDomainRequest();}catch(e){try{xmlhttp=new XMLHttpRequest();}catch(e){try{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}catch(E){xmlhttp=false;}}}
if(!xmlhttp&&typeof XMLHttpRequest!='undefined'){try{xmlhttp=new XMLHttpRequest();}catch(e){xmlhttp=false;}}
xmlhttp.onload=function()
{if(xmlhttp.status==200)
link=xmlhttp.responseText;else
link=LHinfo;LHinfo=link;LH_apri_win();}
if(!xmlhttp&&window.createRequest){try{xmlhttp=window.createRequest();}catch(e){xmlhttp=false;}}
url=LHmagento;xmlhttp.open("GET",url,true);xmlhttp.send(null)}
var LH_hasWindow;function LH_apri_win()
{riapri=0
if(typeof nuovo_LiveHelp72976==='undefined')
riapri=1;else
if(nuovo_LiveHelp72976.closed==true)
riapri=1;if(LHtarget!='_self')
{LH_hasWindow=window.open('','LiveHelpwin1_'+ IDgruppo,'status=no,location=no,toolbar=no,width='+ LHwidth+',height='+ LHheight+',resizable=yes');LH_hasWindow.focus();try
{testwin=LH_hasWindow.document.location;}
catch(e){riapri=0;}}
if(riapri==1)
{if(typeof LHtarget==='undefined')
{LHtarget='LiveHelpwin1_'+ IDgruppo;}
if(LHtarget=='')
LHtarget='LiveHelpwin1_'+ IDgruppo;if(typeof LHcontinua==='undefined')
{LHcontinua='';}
var d=new Date();if(Responsive==0)
{nuovo_LiveHelp72976=window.open('https://server.livehelp.it/client_user/default.asp?provenienza='+ ProvenienzaURL()+'&info='+ LHinfo+'&template='+ LHTemplate+'&stanza='+ Stanza+'&ID='+ IDgruppo+'&gruppo=&nick='+ LHnick+'&x='+ d.valueOf()+'&'+ LHparametri+'&continua='+ LHcontinua,LHtarget,'status=no,location=no,toolbar=no,width='+ LHwidth+',height='+ LHheight+',resizable=yes');}
else
{nuovo_LiveHelp72976=window.open('https://server.livehelp.it/client_user_resp/index.asp?provenienza='+ ProvenienzaURL()+'&info='+ LHinfo+'&template='+ LHTemplate+'&stanza='+ Stanza+'&ID='+ IDgruppo+'&gruppo=&nick='+ LHnick+'&x='+ d.valueOf()+'&'+ LHparametri+'&continua='+ LHcontinua+'&LHalias='+ LHalias+'&LHragsoc='+ encodeURIComponent(LHragsoc)+'&LHemail='+ LHemail+'&LHidpadre='+ LHidpadre+'&LHidfiglio='+ LHidfiglio+'&LHcluster='+ LHcluster,LHtarget,'status=no,location=no,toolbar=no,width='+ LHwidth+',height='+ LHheight+',resizable=yes');}
nuovo_LiveHelp72976.focus();}
else
nuovo_LiveHelp72976.focus();cliccaPrimavolta();}
function http()
{if(LHPrimotest==false&&Priorita==0)
{return;}
LHPrimotest=false;var xmlhttp=false;try{xmlhttp=new XDomainRequest();}catch(e){try{xmlhttp=new XMLHttpRequest();}catch(e){try{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}catch(E){xmlhttp=false;}}}
if(!xmlhttp&&typeof XMLHttpRequest!='undefined'){try{xmlhttp=new XMLHttpRequest();}catch(e){xmlhttp=false;}}
xmlhttp.onload=function()
{var vis=1;var stato=xmlhttp.responseText;if(stato=='-1')
vis=0;else
if(Disponibilita>parseInt(stato))
vis=0;if(vis==1)
{LH_apri_bott();}
else
{if(document.getElementById('LH2013'))
{document.getElementById('LH2013').style.display='none';document.getElementById('LH2013').style.bottom='-200px';}
LHt_Ingaggio=setTimeout("LHingaggio()",LHfrequenza*3);}}
if(!xmlhttp&&window.createRequest){try{xmlhttp=window.createRequest();}catch(e){xmlhttp=false;}}
try
{var d=new Date();url='https://server.livehelp.it/presence/'+ Disponibilita+'/'+ IDgruppo+'/'+ escape(Stanza)+'/'+ LHfrequenza/1000+'/?x='+ d.valueOf();xmlhttp.open("GET",url,true);xmlhttp.send(null)}
catch(e){console.log('Errore '+ e);}}
function cliccaPrimavolta()
{LHSessionStorage("LHclick72976",'si');}
function chattaPrimavolta()
{LHsettaLocalStorage("LHchat72976",'si');}
function giaChattato()
{if(giachat==1)
return true;if(localStorage.getItem("LHclick72976")=='si')
{giachat=1;return true;}
else
return false;}
if(typeof ga!="undefined")
{var LHparametri=ga.getAll()[0].get('linkerParam');}