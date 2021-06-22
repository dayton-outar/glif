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
        drawBranches(canvas, [0, -len], len * 0.8, 35, branchWidth * 0.6);
        drawBranches(canvas, [0, -len], len * 0.8, -35, branchWidth * 0.6);
        drawBranches(canvas, [0, -len], len * 0.5, -35, branchWidth * 0.6);
    }
    
    ctx.restore();
}