window.log = function(){

	var el = document.getElementById('J_Log') || (function(){
		var el = document.createElement("div");
		el.id = "J_Log";
		el.style.position = "absolute";
		el.style.top = "0";
		el.style.left = "0";
		el.style.width = "100%";
		el.style.height = "100px";
		el.style.background = "#000";
		el.style.color = "#fff";
		el.style.zIndex = 9999;
		document.body.appendChild(el);
		return el;
	})();

	var html = ""
	for(var i in arguments){
		html += JSON.stringify(arguments[i])+" "
	}
	el.innerHTML = html;
} 