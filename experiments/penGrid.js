// The following code is based on the Creative Coding - Particle example 01 from Garrit

class Particle {
  constructor(x, y) {
      this.position = createVector(x, y);
      const a = Math.random() * Math.PI * 1;
      const v = 1 + Math.random();
      this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
      this.size = 50;
      this.color = color(random(200, 255), random(100, 200), random(150, 220));    
    }
    
  update() {
      this.velocity.mult(0.5);
      this.position.add(this.velocity);
  }

  draw() {
      push();
      translate(this.position.x, this.position.y);
      noStroke();
      fill(this.color);       
      ellipse(0, 0, this.size);  
      pop();
  }

  isDead() {
      return this.lifespan <= 0;
  }
}

let particles = [];
let prevMouseX, prevMouseY;  

const gridSizeX = 2;
const gridSizeY = 2;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0);
}

function generateParticles(x, y) {
  for (let i = 0; i < 10; i++) {  
      const px = x + random(-1, 1);
      const py = y + random(-1, 1);
      const particle = new Particle(px, py);
      particles.push(particle);
  }
}

function draw() {
  background(0);

  for (let y = 0; y < gridSizeY; y++) {
    for (let x = 0; x < gridSizeX; x++) {
      push();
      translate(x * innerWidth / gridSizeX / 2, y * innerHeight / gridSizeY / 2); // Look into it 
      translate(innerWidth / gridSizeX / 4, innerHeight / gridSizeY / 4);

      for (let particle of particles) {
        particle.draw();
      }

      pop();
    }
  }

  for (let particle of particles) {
    particle.update();

    if (particle.isDead()) {
      particles.splice(particles.indexOf(particle), 1);
    }
  }

  if (mouseIsPressed) {
    if (prevMouseX !== undefined && prevMouseY !== undefined) {
      const steps = dist(mouseX, mouseY, prevMouseX, prevMouseY) / 5;
      for (let i = 0; i < steps; i++) {
        let x = lerp(prevMouseX, mouseX, i / steps);
        let y = lerp(prevMouseY, mouseY, i / steps);
        generateParticles(x, y); 
      }
    }
    prevMouseX = mouseX;
    prevMouseY = mouseY;
  } else {
    prevMouseX = undefined;
    prevMouseY = undefined;
  }
}

function mouseDragged() {
  generateParticles(mouseX, mouseY);
}