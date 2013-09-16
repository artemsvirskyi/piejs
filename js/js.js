window.addEventListener("load", function(){
	"use strict";

	var canvas = document.getElementsByTagName("canvas")[0],
		pie = new Pie(canvas);
		
	pie.context.fillStyle = "red";
	pie.animate(90, 1000);

});