// Adapted from https://www.youtube.com/playlist?list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL
import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Utility Functions
function randomIntegers(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

// Particle
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.baseX = x
    this.y = y
    this.baseY = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * Math.PI * 2
    this.velocity = 0.05
    this.distance = randomIntegers(80, 120)
    // // For Cardiod
    // this.distanceFromCenter = {
    //   x: distance,
    //   y: distance
    // };
    // this.prevDistanceFromCenter = {
    //   x: distance,
    //   y: distance
    // };
    this.lastMouse = {
      x,
      y
    }
  }

  draw(lastPoint) {
    c.beginPath()
    c.strokeStyle = this.color
    c.lineWidth = this.radius
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath()
  }

  update() {
    const lastPoint = {
      x: this.x,
      y: this.y
    }
    // Move points over time
    this.radians += this.velocity

    // Drag Effect
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    // Circular Motion
    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distance
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distance

    // // Cardiod
    // this.distanceFromCenter.x = this.prevDistanceFromCenter.x + Math.sin(this.radians) * 100;
    // this.distanceFromCenter.y = this.prevDistanceFromCenter.x + Math.sin(this.radians) * 100;

    // this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter.x;
    // this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter.y;

    this.draw(lastPoint)
  }
}

// Implementation
let particles
function init() {
  particles = []

  for (let i = 0; i < 50; i++) {
    const radius = (Math.random() * 2) + 1;
    particles.push(new Particle(
      canvas.width / 2, canvas.height / 2, radius, randomColor(colors)
    ));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle =`rgba(255, 255, 255, 0.05)`
  c.fillRect(0, 0, canvas.width, canvas.height)

  particles.forEach(particle => {
   particle.update()
  })
}

init()
animate()
