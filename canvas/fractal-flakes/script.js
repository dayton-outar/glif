var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var maxLevel = 5;
var branches = 2;
var spread = (Math.random() * 48) + 0.51;

ctx.translate(canvas.width / 2, canvas.height / 2);

var angle = Math.PI * 2 * spread;

function drawLine(level) {
    if (level > maxLevel) return;

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 0);
    ctx.stroke();

    for (let i = 1; i < branches + 1; i++) {
        ctx.save();
        ctx.translate(200 * i / (branches + 1), 0);
        ctx.scale(0.5, 0.5);
        ctx.save();

        ctx.rotate(angle);
        drawLine(level + 1);
        ctx.restore();
        ctx.save();

        ctx.rotate(-angle);
        drawLine(level + 1);
        ctx.restore();

        ctx.restore();
    }
}

var sides = Math.floor((Math.random() * 10) + 3);

for (var i = 0; i < sides; i++) {
    drawLine(0);
    ctx.rotate(Math.PI * 2 / sides);
}