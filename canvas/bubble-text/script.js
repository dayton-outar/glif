const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let adjustX = 20;
let adjustY = 20;
let particles = [];

let mouse = {
    x: undefined,
    y: undefined,
    radius: 250
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

ctx.fillStyle = '#fff';
ctx.font = '30px Verdana';
ctx.fillText('Boombang!', 0, 30);
const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);

class Particle {
    constructor(x, y) {
        this.x = x + 100;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }

    draw() {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        // Check for collision between mouse and particles
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

        // max distance, past that the force will be 0
        const maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;

        let forceFactor = force * this.density;
        let directionX = forceDirectionX * forceFactor;
        let directionY = forceDirectionY * forceFactor;

        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 20;
            }

            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 20;
            }
        }

        this.draw();
    }
}

function init() {
    particles = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                let spread = 10;
                particles.push(new Particle(positionX * spread, positionY * spread));
            }
        }
    }
}
init();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
    requestAnimationFrame(animate);
}
animate();