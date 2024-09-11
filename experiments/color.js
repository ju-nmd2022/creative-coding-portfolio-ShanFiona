// The following code is based on the Creative Coding - Particle example 01 from Garrit

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0, 0, 0);
  colorMode(HSB);
  let offsetPixels = 577.95;
  createParticles(innerWidth / 2 - offsetPixels, innerHeight - offsetPixels, 0, 0);
  createParticles(innerWidth / 2 - offsetPixels, offsetPixels, 0, 1);
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

let particles = [];

function createParticles(x, y, generation, direction) {
  let r, g, b;
  if (direction === 0) {
    r = Math.random() * 60 + 30;
    g = Math.random() * 60 + 60;
    b = Math.random() * 60 + 40;
  } else {
    r = Math.random() * 60 + 200;
    g = Math.random() * 60 + 220;
    b = Math.random() * 60 + 240;
  }
  let maxDegrees = 180;
  let offset = 0.9;
  for (let i = offset; i < offset + maxDegrees; i++) {
    let particle = new Particle(x, y, i * 1, r, g, b, generation, direction);
    particles.push(particle);
  }
}

function draw() {
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