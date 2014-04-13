window.addEventListener("load", function(){
	"use strict";

	var data = [
		{
			color: "blue",
			value: 100
		},
		{
			color: "red",
			value: 200
		}
	],
	pieElement = document.getElementsByClassName("pie")[0],
	pie = new Pie(pieElement);

	pie.set(data, {a: 1, b: 2});

	pie.animate();
});