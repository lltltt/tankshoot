var game = new Game();

function init() {
	if(game.init())
		game.start();
}

var imageRepository = new function() {
	this.background = new Image();
	this.tank = new Image();

	var numImages = 2;
	var numLoaded = 0;
	function imageLoaded() {
		numLoaded++;
		if (numLoaded === numImages) {
			window.init();
		}
	}
	this.background.onload = function() {
		imageLoaded();
	}
	this.tank.onload = function() {
		imageLoaded();
	}

	this.background.src = "https://storage.needpix.com/rsynced_images/gray-rocky-background.jpg";
	this.tank.src = "https://i.imgur.com/N2Ck06y.png";
}

function Drawable() {
	this.init = function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

	}
	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;

	this.draw = function() {};
	this.move = function() {};
}

function Background() {
	this.speed = 2;
	this.draw = function() {
		this.x = this.x - this.speed;
		this.context.drawImage(imageRepository.background, this.x, this.y);
		this.context.drawImage(imageRepository.background, this.x + imageRepository.background.width, this.y);

		if (this.x <= -this.canvasWidth)
			this.x = 0;
	};
}
Background.prototype = new Drawable();

function Tank() {
	this.speed = 4;
    this.draw = function() {
        this.context.drawImage(imageRepository.tank, this.x, this.y);
	};

	this.move = function(event, ctx) {
		if (KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.down || KEY_STATUS.up) {
			
			this.context.clearRect(this.x, this.y, this.width, this.height);
			
			if (KEY_STATUS.up) {
				this.y -= this.speed
				if (this.y <= 0)
					this.y = 0;
			} else if (KEY_STATUS.down) {
				this.y += this.speed
				if (this.y >= this.canvasHeight - imageRepository.tank.height/4*3)
					this.y = this.canvasHeight - imageRepository.tank.height/4*3;
			}
			
			this.draw();
		}
	}
}
Tank.prototype = new Drawable();

function Game() {
	this.init = function() {
		this.bgCanvas = document.getElementById('background');
		this.tankCanvas = document.getElementById('tank');
		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');
			this.tankContext = this.tankCanvas.getContext('2d');

            Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;

            Tank.prototype.context = this.tankContext;
			Tank.prototype.canvasWidth = this.tankCanvas.width;
			Tank.prototype.canvasHeight = this.tankCanvas.height;

            this.background = new Background();
            this.background.init(0,0);
            
            this.tank = new Tank();
            this.tank.init(0, (this.tankCanvas.height / 2) - 100, this.tank.width, this.tank.height);

			return true;
		} else {
			return false;
		}
	};

	this.start = function() {
		this.tank.draw();
		animate();
	};
}

function animate() {
	requestAnimFrame( animate );
	game.background.draw();
	game.tank.move();
}

KEY_CODES = {32: 'space', 37: 'left', 38: 'up', 39: 'right', 40: 'down'}
  
KEY_STATUS = {};
for (code in KEY_CODES) { KEY_STATUS[KEY_CODES[code]] = false; }

document.onkeydown = function(e) {
	var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
	if (KEY_CODES[keyCode]) {
		e.preventDefault();
		KEY_STATUS[KEY_CODES[keyCode]] = true;
	}
}

document.onkeyup = function(e) {
	var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
	if (KEY_CODES[keyCode]) {
		e.preventDefault();
		KEY_STATUS[KEY_CODES[keyCode]] = false;
	}
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