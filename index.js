// Based on Jared Tarbell's Substrate algorithm concept.
// http://www.complexification.net/gallery/machines/substrate/index.php

 var Boid = function ( x, y, angle ) {

	this.x = x;
	this.y = y;
	this.color = 'rgb(0,0,0)';

	this.angle = angle + Math.pow( Math.random(), 20 );

	this.dx =  Math.cos( this.angle );
	this.dy =  Math.sin( this.angle );

	this.life = Math.random() * 100 + 100;
	this._x=this.x;
	this._y=this.y;
	this.dead = false;

	this.update = function () {

		
		context.beginPath();

		context.moveTo( this._x, this._y );

		this.x += this.dx * 2;
		this.y += this.dy * 2;
		this.life -= 1;

		context.lineTo( this.x, this.y );
		context.stroke();

		var index = ( Math.floor( this.x ) + width * Math.floor( this.y ) ) * 4;
		//if (Math.abs(this._x-this.x)<250 && ( Math.abs(this._y-this.y)<250)) {
			if (this.life <= 0) this.kill();
			if (this.crossesRoad(index)) this.kill();

		//	if (this.outsideBorders()) this.angle=+ (90 * Math.PI / 180);
		//}
		if (this.outsideBorders()) this.kill();
	}
	this.crossesRoad = function(index){
		if (data[index ] < 100 && data[index +1] <100 && data[index +2] <100 && data[index +3] != 0) {
			return true;
		}
		return false;
	}
	this.outsideBorders = function(){
		if (this.x < 20 || this.x > width-20 || this.y < 20 || this.y > height-20){
			return true;
		}
		return false;
	}

	this.kill = function () {

		boids.splice( boids.indexOf( this ), 1 );
		this.dead = true;
	}
};



var width = window.innerWidth;
var height = window.innerHeight;

var canvas = document.getElementById( 'world' );
canvas.width = width;
canvas.height = height;
var context = canvas.getContext( '2d' );

var image, data;

var boids = [];
boids.push( new Boid( width / 2, height / 2, Math.random() * 360 * Math.PI / 180 ) );

var river = new River();
river.drawRiver();

/*
var image2 = new Image();             //create image object
image2.onload = function() {
 	context.drawImage(image2, 0, 0);
};

image2.crossOrigin = 'anonymous';
image2.src = 'rzeka.jpg';*/
   // crossOrigin attribute has to be set before setting src.If reversed, it wont work.
//image2.src = obj_data.srcUser;

var main = function () {
	image = context.getImageData( 0, 0, width, height );
	data = image.data;
	for ( var i = 0; i < boids.length; i ++ ) {

		var boid = boids[ i ];
		boid.update();
		if ( !boid.dead && Math.random() > 0.95 && boids.length < 500 ) {
			boids.push( new Boid( boid.x, boid.y, ( Math.random() > 0.5 ? 90 : - 90 ) * Math.PI / 180 + boid.angle ) );
		}

	}
};

var refreshIntervalId = setInterval(main,1);

if (boids.length <1 )
	clearInterval(refreshIntervalId);
