// The following code is based on the Creative Coding - Particle example 01 from Garrit

let particles = [];
let centerX, centerY;

function setup() {
  createCanvas(innerWidth, innerHeight);
  centerX = innerWidth / 2;
  centerY = innerHeight / 2;
  background(0, 0, 0);
  colorMode(HSB);

  let offsetPixels = 50;

  // Bottom
  createParticles(centerX, centerY + offsetPixels, 0, 0);

  // Top
  createParticles(centerX, centerY - offsetPixels, 0, 1);
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  centerX = innerWidth / 2;
  centerY = innerHeight / 2;
}

class Particle {
  constructor(x, y, degree, r, g, b, generation, direction) {
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;
    this.degree = degree;
    this.maxLife = 1 + Math.floor(Math.random() * 25);
    this.r = r;
    this.g = g;
    this.b = b;
    this.life = 0;
    this.generation = generation;
    this.direction = direction; 
  }

  move() {
    this.b = 50 + (1.5 * this.maxLife) / this.life;
    this.lastX = this.x;
    this.lastY = this.y;
    this.x += Math.cos((this.degree / 180) * Math.PI) * Math.random() * 250;
    if (this.direction === 0) {
      this.y += Math.sin((this.degree / 180) * Math.PI) * Math.random() * 20;
    } else {
      this.y -= Math.sin((this.degree / 180) * Math.PI) * Math.random() * 20;
    }
    this.life++;
    this.degree++;
  }

  draw() {
    push();
    stroke(this.r, this.g, this.b, 0.5);
    line(this.lastX, this.lastY, this.x, this.y);
    pop();
  }
}

function createParticles(x, y, generation, direction) {
  let r, g, b;
  if (direction === 0) {
    r = Math.random() * 0; 
    g = Math.random() * 255;
    b = Math.random() * 255;
  } else {
    r = Math.random() * 0;
    g = Math.random() * 255;
    b = Math.random() * 255;
  }
  let maxDegrees = 180;
  let offset = 0.9;
  for (let i = offset; i < offset + maxDegrees; i++) {
    let particle = new Particle(x, y, i * 1, r, g, b, generation, direction);
    particles.push(particle);
  }
}

function draw() {
  for (let i = 0; i < 5; i++) {
    let opacity = 0.01 - i * 0.005;
    fill(50, 100, 100, opacity);
    ellipse(centerX, centerY, 150 + i * 10);
  }

  fill(60, 255, 255);
  noStroke();
  ellipse(centerX, centerY, 80, 80);

  for (let particle of particles) {
    particle.draw();
    particle.move();
    if (particle.life >= particle.maxLife) {
      particles.splice(particles.indexOf(particle), 1);
      if (particle.generation < 1) {
        createParticles(particle.x, particle.y, particle.generation + 1, particle.direction);
      }
    }
  }
}
