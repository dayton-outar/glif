const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let adjustX = 20;
let adjustY = 20;
let particles = [];
ctx.lineWidth = 3;

let mouse = {
    x: undefined,
    y: undefined,
    radius: 150
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
    init();
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
        this.density = (Math.random() * 8) + 1;
        this.distance;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
        ctx.strokeStyle = `rgba(34, 147, 214, 1)`;
        ctx.beginPath();

        if (this.distance < mouse.radius - 5) {
            this.size = 5;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x - 3, this.y - 3, (this.size / 2.5), 0, Math.PI * 2);
            ctx.arc(this.x + 7, this.y + 7, (this.size / 3.5), 0, Math.PI * 2);
        }
        else if (this.distance <= mouse.radius)
        {
            this.size = 10;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x - 2, this.y - 2, (this.size / 3), 0, Math.PI * 2);
        } 
        else 
        {
            this.size = 15;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            //ctx.beginPath();
            //ctx.arc(this.x - 1, this.y - 1, (this.size / 3), 0, Math.PI * 2);
        }
        
        ctx.closePath();
        ctx.fill();
    }

    update() {
        // Check for collision between mouse and particles
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        this.distance = distance;
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
    //connect();

    requestAnimationFrame(animate);    
}
animate();

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let cdx = (particles[a].x - particles[b].x);
            let cdy = (particles[a].y - particles[b].y);
            let distance = ((cdx * cdx) + (cdy * cdy));
            if (distance < 300) {
                opacityValue = 0.8;
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}