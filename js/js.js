window.addEventListener("load", function(){
	"use strict";

	var data = [
		{
			color: "blue",
			value: 70
		},
		{
			color: "red",
			value: 30
		},
		{
			color: "green",
			value: 50
		},
		{
			color: "black",
			value: 30
		},
		{
			color: "orange",
			value: 10
		}
	],
	pieElement = document.getElementsByClassName("pie")[0],
	pie = new Pie(pieElement);

	pie.set(data);

	setTimeout(function(){
		pie.animate();
	}, 1000);
});