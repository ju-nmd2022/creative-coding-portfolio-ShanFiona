// The following code is based on the Creative Coding - Particle example 01 from Garrit

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0);
  colorMode(HSB, 360, 100, 100, 100);
  
  createParticles(innerWidth / 2, 3, 6, 5, 0);  
  createParticles(innerWidth / 2, innerHeight, 0, -5, 50);
}

class Particle {

  constructor(x, y, degree, generation, direction) {
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;
    this.degree = degree;
    this.maxLife = 50 + Math.floor(Math.random() * 2000);
    this.life = 0;
    this.generation = generation;
    this.direction = direction;
    this.size = Math.random() * 3 + 1;  
    this.hue = Math.random() * 60;    this.saturation = Math.random() * 40 + 60;  
    this.brightness = Math.random() * 40 + 60; 
  }

  move() {
    this.lastX = this.x;
    this.lastY = this.y;
    let angle = (this.degree / 180) * Math.PI;
    this.x += Math.cos(angle) * Math.random() * 100;
    if (this.direction === 0) {
      this.y += Math.sin(angle) * Math.random() * 10;
    } else {
      this.y -= Math.sin(angle) * Math.random() * 20;
    }
    this.y += 0.5; 
    this.life++;
    this.degree++;
  }


  draw() {
    push();
    let fade = map(this.life, 0, this.maxLife, 100, 0);
    stroke(this.hue, this.saturation, this.brightness, fade);
    strokeWeight(this.size);
    line(this.lastX, this.lastY, this.x, this.y);
    pop();
  }
}

let particles = [];

function createParticles(x, y, generation, direction) {

  let maxDegrees = 350; 

  let offset = 0;

  for (let i = offset; i < offset + maxDegrees; i++) {

    let particle = new Particle(x, y, i * 1, generation, direction);

    particles.push(particle);

  }

}
function draw() {
  background(0, 0, 0, 25);  
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
