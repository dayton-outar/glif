const canvas = document.getElementsByClassName('cv-ff')[0]; // Take the first element
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//ctx.globalCompositeOperation = 'destination-over';

let number = 0;
let scale = 10;
let hue = 0;

function drawFlower() {
    let angle = number * 3.9; // Each coefficient gives a different shape
    let radius = scale * Math.sqrt(number);
    let positionX = radius * Math.sin(angle) + (canvas.width / 2);
    let positionY = radius * Math.cos(angle) + (canvas.height / 2);

    ctx.fillStyle = `hsl(${ hue }, 100%, 50%)`;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(positionX, positionY, 8, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    number++;
    hue++;
}

function animate() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawFlower();

    if (number > 1000) return;

    requestAnimationFrame(animate);
}

animate();