(function(){
	"use strict";

	var degToRad = Math.PI / 180;

	function Pie(canvas, options){
		this.canvas = canvas;
		this.context = this.canvas.getContext("2d");
		this.start = -90;
		this.animationInterval = 20;
		if(options){
			Object.keys(options).forEach(function(option){
				this[option] = options[option];
			}, this);
		}
		this.current = this.start = this.start * degToRad;
		// Pie center coordinates and radius. All are the same values.
		this.xyr = this.canvas.width / 2;
		this.onstep = function(){};
		this.onfinalstep = function(){};
	}
	Pie.prototype.animate = function(end, duration){
		var that = this, stepIndex = 0, length, step,
			stepsNumber = Math.floor(duration / this.animationInterval);
		end = end * degToRad;
		length = end - this.current;
		step = length / stepsNumber;
		this.counterclockwise = (length < 0);
		this.animation = setInterval(function(){
			stepIndex++;
			that.current += step;
			that.redraw();
			that.onstep();
			if(stepIndex === stepsNumber){
				that.current = end;
				that.onfinalstep();
				clearInterval(that.animation);
			}
		}, this.animationInterval);
	};
	Pie.prototype.redraw = function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.beginPath();
		this.context.moveTo(this.xyr, this.xyr);
	    this.context.arc(this.xyr, this.xyr, this.xyr, this.start, this.current, this.counterclockwise);
		this.context.fill();
	};
	Pie.prototype.reset = function(){
		clearInterval(this.animation);
		this.current = this.start;
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};
	window.Pie = Pie;
})();