// Franks Laboratory: https://youtu.be/VcxVDahScp8
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 620;

let snowBgCanvas;
let branchCanvas;

function initializeCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    return canvas;
}

function main() {
    snowBgCanvas = initializeCanvas('cv-bg');
    branchCanvas = initializeCanvas('cv-ft');

    const treeLocation = [CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.95];
    drawBranches(branchCanvas, treeLocation, 100, 0, 20);
    drawLeaves(branchCanvas);
}

// Radu Mareiscu-Istodor: https://youtu.be/Zn3Xf7XBuws
function drawLeaves(branchCanvas) {
    const ctx = branchCanvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const data = imageData.data;

    let branchPixels = [];
    for(let y = 0; y < CANVAS_HEIGHT; y++) {
        for(let x = 0; x < CANVAS_WIDTH; x++) {
            let alpha = data[4 * (y * CANVAS_WIDTH + x) + 3]; // Why multiply by 4 ... Don't understand the formula for index
            if (alpha > 0 && y < CANVAS_HEIGHT * 0.95 - 100) {
                branchPixels.push([x, y]);
            }
        }
    }

    for (let i = 0; i < branchPixels.length; i++) {
        if (Math.random() > 0.80) {
            let loc = branchPixels[i];
            loc[0] += (Math.random() - 0.5) * 10;
            loc[1] += (Math.random() - 0.5) * 10;
            ctx.save(); // ?
            ctx.beginPath();
            let green = 255 * (CANVAS_HEIGHT - loc[1]) / CANVAS_HEIGHT;
            ctx.fillStyle = `rgba(0, ${ green }, 0, 0.4)`;
            ctx.translate(...loc); // Why this instead of moveTo?
            ctx.rotate(Math.random() * Math.PI * 2);
            ctx.arc(0, 0, 5, 0, Math.PI);
            ctx.fill();
            ctx.restore(); // ?
        }        
    }
}

function drawBranches(canvas, start, len, angle, branchWidth) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.save();
    ctx.lineWidth = branchWidth;
    ctx.translate(...start);
    ctx.rotate(angle * Math.PI / 180);

    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    if (len > 10) {
        drawBranches(canvas, [0, -len], len * 0.5, 45, branchWidth * 0.7);
        drawBranches(canvas, [0, -len], len * 0.5, -45, branchWidth * 0.7);
        drawBranches(canvas, [0, -len], len * 0.8, 0, branchWidth * 0.7);
    }
    
    ctx.restore();
}