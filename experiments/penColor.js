// The following code is based on the Creative Coding - Particle example 01 from Garrit

class Particle {
    constructor(x, y) {
        this.position = createVector(x, y);
        const a = Math.random() * Math.PI * 2;
        const v = 8 + Math.random();
        this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
        this.lifespan = 100;
        this.size = 5;
        this.color = color(random(255), random(255), random(255));
    }
      
    update() {
        this.lifespan--;
        this.velocity.mult(0.99);
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
    for (let particle of particles) {
        particle.update();
        particle.draw();
  
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
  