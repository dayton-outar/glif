const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let eyes = [];
let theta;

let mouse = {
    x: undefined,
    y: undefined
}


function drawCursor() {
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2, true);
    ctx.fillStyle = 'gold';
    ctx.fill();
    ctx.closePath();
}

window.addEventListener('mousemove', function(e) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

class Eye {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw() {
        // draw eye
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();

        // draw iris
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        theta = Math.atan2(dy, dx);
        let iris_x = this.x + Math.cos(theta) * this.radius / 10;
        let iris_y = this.y + Math.sin(theta) * this.radius / 10;
        let irisRadius = this.radius / 1.2;
        ctx.beginPath();
        ctx.arc(iris_x, iris_y, irisRadius, 0, Math.PI * 2, true);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();

        // draw pupil
        theta = Math.atan2(dy, dx);
        let pupil_x = this.x + Math.cos(theta) * this.radius / 1.9;
        let pupil_y = this.y + Math.sin(theta) * this.radius / 1.9;
        let pupilRadius = this.radius / 2.5; // Why does this work?

        ctx.beginPath();
        ctx.arc(pupil_x, pupil_y, pupilRadius, 0, Math.PI * 2, true);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();

        //draw pupil reflection
        ctx.beginPath();
        var pr = pupilRadius / 3;
        ctx.arc(pupil_x - pr, pupil_y - pr, pupilRadius / 2, 0, Math.PI * 2, true);
        ctx.fillStyle = 'rgba(255,255,255, 0.1)';
        ctx.fill();
        ctx.closePath();

        // draw mouse
        drawCursor();
    }
}
function init() {
    eyes = [];
    let numberOfEyes = 50;
    let overlapping = false;
    let protection = 10000;
    let counter = 0;

    while (eyes.length < numberOfEyes && counter < protection) {
        let eye = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.floor(Math.random() * 100) + 5
        }
        overlapping = false;
        for (let i = 0; i < eyes.length; i++) {
            let previousEye = eyes[i];
            let dx = eye.x - previousEye.x;
            let dy = eye.y - previousEye.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if ( distance < (eye.radius + previousEye.radius) ) {
                overlapping = true;
                break;
            }
        }
        if (!overlapping) {
            eyes.push(new Eye(eye.x, eye.y, eye.radius));
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < eyes.length; i++) {
        eyes[i].draw();
    }
}

init();
animate();