var canvas = document.querySelector('canvas');
var btnGenerate = document.querySelector('.btn-generate-tree');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.lineWidth = branchWidth;

    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0,0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    if (len < 15) {
        // leafs
        ctx.beginPath();
        ctx.arc(0, -len, 10, 0, Math.PI / 2);
        ctx.fill();
        
        ctx.restore(); // Interesting to see what happens when this line is commented
        return;
    }

    drawTree(0, -len, len * 0.75, angle + 5, branchWidth);
    drawTree(0, -len, len * 0.75, angle - 5, branchWidth);

    ctx.restore();
}

drawTree(canvas.width/2, canvas.height - 80, 120, 0, 2, 'brown', 'green');