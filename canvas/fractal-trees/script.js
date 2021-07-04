var canvas = document.querySelector('canvas');
var btnGenerate = document.querySelector('.btn-generate-tree');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');
var curve = 10;
var curve = 0;
var threshold = 10;

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
    ctx.beginPath();
    ctx.save();

    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.shadowBlur = 5;
    ctx.shadowColor = 'rgba(255,255,255, 0.5)';
    ctx.lineWidth = branchWidth;

    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0,0);
    //ctx.lineTo(0, -len);
    
    curve = (Math.random() * 30) + 2;
    curve2 = (Math.random() * 20) + 2;

    if (angle > 0) {
        ctx.bezierCurveTo(curve * 3, -len/2, curve2, -len/2, 0, -len);
    } else {
        ctx.bezierCurveTo(curve, -len/2, -curve2, -len/2, 0, -len);
    }    
    ctx.stroke();

    if (len < (Math.random() * threshold)) { //<-- randomize
        // leafs
        ctx.beginPath();
        ctx.arc(0, -len, 10, 0, Math.PI / 2);
        ctx.fill();

        ctx.restore(); // Interesting to see what happens when this line is commented
        return;
    }

    drawTree(0, -len, len * 0.75, angle + curve, branchWidth * 0.6);
    drawTree(0, -len, len * 0.75, angle - curve, branchWidth * 0.6);

    ctx.restore();
}

drawTree(canvas.width/2, canvas.height - 80, 120, 0, 15, 'brown', 'green');

function generateRandomTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var centerPointX = canvas.width / 2;
    var len = Math.floor((Math.random() * 20) + 100);
    var angle = 0;
    var branchWidth = (Math.random() * 70) + 1;
    var color1 = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';
    var color2 = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';

    btnGenerate.style.background = color1;
    //btnGenerate.style.color = ; // Will need color contrast ration calculation: https://www.accessibility-developer-guide.com/knowledge/colours-and-contrast/how-to-calculate/, 
    drawTree(centerPointX, canvas.height - 80, len, angle, branchWidth, color1, color2);
}

btnGenerate.addEventListener('click', generateRandomTree);