(function(){
	"use strict";

	function toRad(deg){
		return deg * Math.PI / 180;
	}

	function Pie(element){
		this.element = element;

		this.radius = element.clientWidth;

		this.canvas = this.appendCanvas();
		this.context = this.canvas.getContext("2d");
	}

	Pie.prototype.appendCanvas = function(){
		var canvas = document.createElement("canvas");

		canvas.width = this.radius;
		canvas.height = this.radius;

		return this.element.appendChild(canvas);
	};

	Pie.prototype.set = function(data, options){
		this.setData(data);
		this.setOptions(options);
	};

	Pie.prototype.setData = function(data){
		//
	};

	Pie.prototype.setOptions = function(options){
		// default options:

		this.type = "pie"; 	 // pie || daughnut
 		this.duration = 500; // 500 ms
 		this.start = 0; 	 // 0 degrees

 		utils.mixin(this, options);

		this.start = toRad(this.start - 90);

 		this.draw = this.drawPie;

		if(this.type === "daughnut"){
			this.context.borderWidth = this.borderWidth || Math.floor(this.radius / 3);
			this.draw = this.drawDaughnut;
		}
	};

	Pie.prototype.animate = function(){

	};

	window.Pie = Pie;
})();

/*function mapToArray(map){
	console.log(map);
	return Object.keys(map).map(function(id){
		console.log(id);
		var item = map[id],
			obj = Object.create(item);
		obj.id = id;
		return obj;
	});
};*/

	function mixin(target, source, args){
		var keys = args instanceof Array ? args : Object.keys(source);

		keys.filter(function(key){
			return !!source[key];
		}).forEach(function(key){
				target[key] = source[key];
			});

		return target;
	};
