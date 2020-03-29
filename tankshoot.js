window.addEventListener('keydown', this.move,false);

var tank = new Image();

function init() {
    tank.src = 'https://i.imgur.com/N2Ck06y.png';
    window.requestAnimationFrame(draw);
}

function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');


    var time = new Date();
    ctx.drawImage(tank, 0, 400);

    window.requestAnimationFrame(draw);
}

function move(event) {
    if (event.keyCode == 39) {
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.translate(10, 0)    
    } 

    if (event.keyCode== 37) {
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.translate(-10, 0)            
    }
}

init();