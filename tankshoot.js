var game = new Game();

function init() {
	if(game.init())
		game.start();
}

function Drawable() {
	this.init = function(x, y) {
		this.x = x;
		this.y = y;
	}
	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;

	this.draw = function() {};
}

function Background() {
    this.background = new Image();
    this.background.src = "https://storage.needpix.com/rsynced_images/gray-rocky-background.jpg";

	this.speed = 3;
	this.draw = function() {
		this.x = this.x - this.speed;
		this.context.drawImage(this.background, this.x, this.y);
		this.context.drawImage(this.background, this.x + this.background.width, this.y);

		if (this.x <= -this.canvasWidth)
			this.x = 0;
	};
}
Background.prototype = new Drawable();

function Tank() {
    this.tank = new Image();
    this.tank.src = "https://i.imgur.com/N2Ck06y.png";

    this.draw = function() {
        this.context.drawImage(this.tank, this.x, this.y);
    };
}
Tank.prototype = new Drawable();

function Game() {
	this.init = function() {
		this.bgCanvas = document.getElementById('canvas');
		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');

            Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;

            Tank.prototype.context = this.bgContext;
			Tank.prototype.canvasWidth = this.bgCanvas.width;
			Tank.prototype.canvasHeight = this.bgCanvas.height;

            this.background = new Background();
            this.background.init(0,0);
            
            this.tank = new Tank();
            this.tank.init(0, 300);

			return true;
		} else {
			return false;
		}
	};

	this.start = function() {
		animate();
	};
}

function animate() {
	requestAnimFrame( animate );
    game.background.draw();
    game.tank.draw();
}

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback, element){
				window.setTimeout(callback, 1000 / 60);
			};
})();