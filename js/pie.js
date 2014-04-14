(function(){
	"use strict";

	var few = toRad(0.1),
		twoPI = 2 * Math.PI;

	function toRad(deg){
		return deg * Math.PI / 180;
	}

	function Pie(element){
		this.element = element;

		this.width = element.clientWidth * 2;

		this.canvas = this.appendCanvas();
		this.context = this.canvas.getContext("2d");
	}

	Pie.prototype.appendCanvas = function(){
		var canvas = document.createElement("canvas");

		canvas.width = this.width;
		canvas.height = this.width;

		return this.element.appendChild(canvas);
	};

	Pie.prototype.set = function(data, options){
		this.duration = 1000; // 1000 ms
		this.start = 0; 	 // 0 degrees

		utils.mixin(this, options || {});

		this.init();

		this.setData(data);
	};

	Pie.prototype.init = function(){
		this.center = this.radius = this.width / 2;
		this.drawSector = this.drawPieSector;

		if(this.type === "doughnut"){
			this.doughnutInit();
		}

		this.current = this.start = toRad(this.start - 90);
		this.step = twoPI / (this.duration * 0.062); // 0.062 - 62 / 1000;
		this.end = this.start + twoPI + few;
	};

	Pie.prototype.doughnutInit = function(){
		var arcWidth = this.arcWidth || Math.floor(this.radius / 3);

		this.context.lineWidth = arcWidth;
		this.radius = this.radius - arcWidth / 2;
		this.drawSector = this.drawDoughnutSector;
	};

	Pie.prototype.setData = function(data){
		var sum = 0, length = data.length, from = this.start, index = 0;

		for(; index < length; index++){
			sum += data[index].value;
		}

		this.data = data.map(function(sector){
			var to = from + twoPI * (sector.value / sum);

			sector.from = from;
			sector.to = to + few;

			from = to;

			return sector;
		});

		this.length = length;
	};

	Pie.prototype.clear = function(){
		this.context.clearRect(0, 0, this.width, this.width);
	};

	Pie.prototype.clearAnimation = function(){
		webkitCancelAnimationFrame(this.requestAnimationFrameId);
		this.requestAnimationFrameId = null;
	};

	Pie.prototype.reset = function(){
		this.clear();
		this.clearAnimation();
		this.current = this.start;
	};

	Pie.prototype.animate = function(){
		this.requestAnimationFrameId = webkitRequestAnimationFrame(this.draw.bind(this));
	};

	Pie.prototype.draw = function(){
		this.clear();
		this.current += this.step;

		this.drawSectors();

		if(this.current < this.end){
			this.animate();
		}
	};

	Pie.prototype.drawSectors = function(){
		var index = 0, sector;
		for(; index < this.length; index++){
			sector = this.data[index];
			if(this.current < sector.to){
				this.drawSector(sector.from, this.current, sector.color);
				break;
			}
			this.drawSector(sector.from, sector.to, sector.color);
		}
	};

	Pie.prototype.drawPieSector = function(from, to, color){
		this.context.beginPath();
		this.context.moveTo(this.center, this.center);
		this.context.arc(this.center, this.center, this.radius - 1, from, to);
		this.context.fillStyle = color;
		this.context.fill();
	};

	Pie.prototype.drawDoughnutSector = function(from, to, color){
		this.context.beginPath();
		this.context.arc(this.center, this.center, this.radius - 1, from, to);
		this.context.strokeStyle = color;
		this.context.stroke();
	};

	window.Pie = Pie;
})();

var utils = {};

utils.mixin = function(target, source, args){
	var keys = args instanceof Array ? args : Object.keys(source);

	keys.filter(function(key){
		return !!source[key];
	}).forEach(function(key){
			target[key] = source[key];
		});

	return target;
};
