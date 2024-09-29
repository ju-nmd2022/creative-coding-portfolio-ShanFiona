// The following code is based on the Creative Coding - Force example 01 from Garrit

const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();
let elements = [];
let gravity;

class Element {
  constructor(x, y, shape = 0, size = 40) {
    this.position = createVector(x, y);
    this.initialPosition = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.shape = shape;
    this.size = size;
    this.mass = this.size;
    this.color = this.getColor();
  }

  applyForce(force) {
    let newForce = force.copy();
    newForce.div(this.mass);
    this.acceleration.add(newForce);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(10);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    if (this.position.y > height) {
      this.position.y = height;
      this.velocity.y *= -1;
      this.velocity.y -= 2;
    }
  }

  draw() {
    fill(this.color);
    switch (this.shape) {
      case 0:
        this.drawHeart(this.position.x, this.position.y, this.size);
        break;
      case 1:
        ellipse(this.position.x, this.position.y, this.size);
        break;
      case 2:
        this.drawTriangle(this.position.x, this.position.y, this.size);
        break;
      case 3:
        this.drawSquare(this.position.x, this.position.y, this.size);
        break;
      case 4:
        this.drawPentagon(this.position.x, this.position.y, this.size);
        break;
    }
  }

  drawHeart(x, y, size) {
    beginShape();
    vertex(x, y);
    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);
  }

  drawTriangle(x, y, size) {
    beginShape();
    vertex(x, y - size / 2);
    vertex(x - size / 2, y + size / 2);
    vertex(x + size / 2, y + size / 2);
    endShape(CLOSE);
  }

  drawSquare(x, y, size) {
    rectMode(CENTER);
    rect(x, y, size, size);
  }

  drawPentagon(x, y, size) {
    beginShape();
    for (let i = 0; i < 5; i++) {
      let angle = i * 2 * PI / 5;
      let px = x + cos(angle) * size / 2;
      let py = y + sin(angle) * size / 2;
      vertex(px, py);
    }
    endShape(CLOSE);
  }

  getColor() {
    switch (this.shape) {
      case 0:
        return color(255, 105, 180);
      case 1:
        return color(255, 165, 0);
      case 2:
        return color(0, 255, 0);
      case 3:
        return color(0, 0, 255);
      case 4:
        return color(255, 0, 0);
    }
  }

  triggerTone() {
    switch (this.shape) {
      case 0:
        synthA.triggerAttackRelease("C4", "8n");
        synthB.triggerAttackRelease("E4", "8n");
        break;
      case 1:
        let time = Tone.now();
        synthA.triggerAttackRelease("C3", "8n", time);
        break;
      case 2:
        synthA.triggerAttackRelease("D4", "8n");
        synthB.triggerAttackRelease("F4", "8n");
        break;
      case 3:
        synthA.triggerAttackRelease("E4", "8n");
        synthB.triggerAttackRelease("G4", "8n");
        break;
      case 4:
        synthA.triggerAttackRelease("G4", "8n");
        synthB.triggerAttackRelease("B4", "8n");
        break;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 10);
  Tone.start();
}

function draw() {
  background(0);
  for (let element of elements) {
    element.applyForce(gravity);
    element.update();
    element.draw();

    if ( element.position.x < 0) {
      element.position.x = 0;
      element.velocity.x *= -1;
    } else if (element.position.x > width) {
      element.position.x = width;
      element.velocity.x *= -1;
    }
    if (element.position.y < 0) {
      element.position.y = 0;
      element.velocity.y *= -1;
    } else if (element.position.y > height) {
      element.position.y = height;
      element.velocity.y *= -1;
    }
  }
}

function mousePressed() {
  let shape = Math.floor(Math.random() * 5);
  let size = Math.floor(Math.random() * 100) + 20;
  let element = new Element(mouseX, mouseY, shape, size);
  element.triggerTone();
  elements.push(element);
}