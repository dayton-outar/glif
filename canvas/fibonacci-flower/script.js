const canvas = document.getElementsByClassName('cv-ff')[0]; // Take the first element
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let number = 0;
let scale = 10;

function drawFlower() {
    let angle = number * 1;
    let radius = scale * Math.sqrt(number);
    let positionX = radius * Math.sin(angle) + (canvas.width / 2);
    let positionY = radius * Math.cos(angle) + (canvas.height / 2);

    ctx.fillStyle = '#f35500';
    ctx.strokeStyle = '#03abf0';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(positionX, positionY, 20, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    number+=10;
}

function animate() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //if (number < 500) {
        drawFlower();
    //}
    

    requestAnimationFrame(animate);
}

animate();