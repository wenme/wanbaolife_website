function showdiv() {
	document.getElementById("table").style.display = "inline-block";
	document.getElementById("arrow_img").src = "images/down-arrow.png";
	document.getElementById("arrow_a").href = "javascript:hidediv()";
}

function hidediv() {
	document.getElementById("table").style.display = "none";
	document.getElementById("arrow_img").src = "images/right-arrow.png";
	document.getElementById("arrow_a").href = "javascript:showdiv()";
}