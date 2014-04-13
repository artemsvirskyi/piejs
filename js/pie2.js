(function(){
	"use strict";

	var degToRad = Math.PI / 180;

	function Pie(canvas, options){
		this.start = 0;

		Object.keys(options || {}).forEach(function(option){
			this[option] = options[option];
		}, this);

		this.canvas = canvas;
		this.context = this.canvas.getContext("2d");

		this.current = this.start = (this.start - 90) * degToRad;
		this.radius = this.canvas.width / 2;
	}

	Pie.prototype.animate = function(end, duration){
		this.end = (end - 90) * degToRad;
		this.duration = duration;
		this.length = this.end - this.start;
		this.startTime = Date.now();
		this.counterclockwise = (this.length < 0);
		this.isEnd = this.counterclockwise ? this.lt : this.gt;
		this.animated = true;
		this.setAnimation();
	};

	Pie.prototype.setAnimation = function(){
		var curTime = Date.now();

		this.current = this.start + (curTime - this.startTime) / this.duration * this.length;
		this.redraw();

		if(this.animated && !this.isEnd()){
			window.requestAnimationFrame((function(){
				this.setAnimation();
			}).bind(this));
		}else{
			this.current = this.end;
			this.redraw();
			this.animated = false;
		}
	};

	Pie.prototype.redraw = function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.beginPath();
		this.context.moveTo(this.radius, this.radius);
	    this.context.arc(this.radius, this.radius, this.radius, this.start, this.current, this.counterclockwise);
		this.context.fill();
	};

	Pie.prototype.setTo = function(angle, isPercentage){
		this.current = (angle - 90) * degToRad;
		this.redraw();
	};

	Pie.prototype.reset = function(){
		this.animated = false;
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.current = this.start;
	};

	Pie.prototype.gt = function(){
		return this.current > this.end;
	};

	Pie.prototype.lt = function(){
		return this.current < this.end;
	};

	window.Pie = Pie;
})();