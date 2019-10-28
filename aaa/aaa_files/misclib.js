function sublist(fakepar, menuID)
{
	var submenu = document.getElementById(menuID);
	var sublink = document.getElementById(menuID+'_simbolo');
	if (submenu.style.display=='none')
	{
		submenu.style.display='block';
		sublink.innerHTML = '-';
	}
	else
	{
		submenu.style.display='none';
		sublink.innerHTML = '+';
	}
}

function sublist2boxestr(fakepar, ref, boxestr) {
	var boxesarr= boxestr.split(',');
	for(var i=0; i<boxesarr.length; i++) {
		if (boxesarr[i]!=ref) {
			var obj = document.getElementById(boxesarr[i]);
			if (obj!=null && obj!='undefined') {
				obj.style.display='none';
			}
		}
	}
	var submenu = document.getElementById(ref);
	if (submenu.style.display=='none') /* none -> visible */
		submenu.style.display='block';
	else
		submenu.style.display='none';
	try{
	if (pit && pit!='undefined')
		pit.positionit();
	}catch(e){}
}