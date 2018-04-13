function showdiv(div_id) {
	document.getElementById(div_id).style.display = "inline-block";
	var href_id = div_id.replace("table", "arrow");
	var img_id = href_id + "_img";
	document.getElementById(img_id).src = "images/down-arrow.png";
	document.getElementById(href_id).onclick = function(){
		hidediv(div_id);
	};
}

function hidediv(div_id) {
	document.getElementById(div_id).style.display = "none";
	var href_id = div_id.replace("table", "arrow");
	var img_id = href_id + "_img";
	document.getElementById(img_id).src = "images/right-arrow.png";
	document.getElementById(href_id).onclick = function(){
		showdiv(div_id);
	}
}