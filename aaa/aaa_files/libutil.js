function getE$(name) {
	var ret=document.getElementById(name);
	if (ret==null || ret=='undefined')
	    return null
    return ret;
}
function tabswitch(baseid, num, firstRef, lastRef) {
	var PLUSCLASS = ' no_bordo';
	var NUMTABS = 50; //4;
	var classe='';
	// considera i REF contigui, nel caso non lo siano bisogna passargli la lista dei ref ammessi
	for(var i=1; i<=NUMTABS; i++) {
		if (getE$(baseid+i)!=null) {
		    getE$(baseid+i).className = baseid+"invisibile";
			classe = '';
			if (i==firstRef) {
				classe = PLUSCLASS;
			}
			getE$("div_"+baseid+i).className = "bot_gruppo"+classe;
			getE$("a_"+baseid+i).className = "puntatore_link";
		}
	}
	classe = '';
	if (i==firstRef) {
		classe = PLUSCLASS;
	}
	getE$("div_"+baseid+num).className = "bot_gruppo bot_gruppo_evid"+classe;
	getE$("a_"+baseid+num).className = "puntatore_link puntatore_link_evid";
	getE$(baseid+num).className = baseid+"visibile";
	
	if (num==lastRef) {
		getE$('maindiv_boxjs_0').className = 'bk_img_bot bk_img_bot_evid';
	}
	else {
		getE$('maindiv_boxjs_0').className = 'bk_img_bot';
	}
}

/* funzione per la landing page -> applico il colore di sfondo bianco per evidenziare il pulsante */ 
function botbianco (t, myid, idvalidi) {
	for(var i=0;i<idvalidi.length;i++) {
		document.getElementById("li_botjs_"+idvalidi[i]).className='no_bianco';		
	}
	document.getElementById("li_botjs_"+myid).className='bot_bianco';
}

/* funzione per la landing page -> tolgo il colore di sfondo bianco dal pulsante all'evento OnMouseOut */ 
function nobianco (t, myid) {
	document.getElementById("li_botjs_"+myid).className='ripristina';
}

function menu2class(id,clas) {
	var obj=document.getElementById(id);
	if (obj!='undefined') {
		obj.className = clas;
		var sp = obj.getElementsByTagName('span');
	    if (sp.length>0) {
	        if (sp[0].style.paddingLeft==null || sp[0].style.paddingLeft=='' || sp[0].style.paddingLeft=='0px' )
	        	sp[0].style.paddingLeft = '12px';
		}
	}
}
function imgPiuMeno(fakepar, ref)
{
	var submenu = document.getElementById(ref);
	if (submenu.style.display=='none') /* none -> visible */
	{ 
		submenu.style.display='block';
		document.getElementById(ref+"_img_piu_meno").className='img_meno';
	}
	else
	{
		submenu.style.display='none';
		document.getElementById(ref+"_img_piu_meno").className='img_piu';
	}
}