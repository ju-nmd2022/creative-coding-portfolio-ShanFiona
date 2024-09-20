let elements = [];
let gravity;
let clickCounter = 0; 
let clickThreshold = Math.floor(random(3, 9));

class Element {
  constructor(x, y, isHeart = false) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.size = random(20, 80);
    this.mass = this.size;
    this.isHeart = isHeart; 
    this.color = this.isHeart ? color(255, 105, 180) : this.getColorBasedOnSize();
  }

  getColorBasedOnSize() {
    if (this.size > 60) {
      return color(255, 0, 0); 
    } else if (this.size > 40) {
      return color(255, 165, 0); 
    } else {
      return color(0, 255, 0); 
    }
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
  }

  draw() {
    fill(this.color);
    if (this.isHeart) {
      this.drawHeart(this.position.x, this.position.y, this.size); 
    } else {
      ellipse(this.position.x, this.position.y, this.size); 
    }
  }

  drawHeart(x, y, size) {
    beginShape();
    vertex(x, y);
    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);
  }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    gravity = createVector(0, 10);
    console.log("Setup function called!");
  }

function draw() {
  background(0);
  for (let element of elements) {
    element.applyForce(gravity);
    element.update();
    element.draw();

    if (element.position.x < 0) {
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
    console.log("Mouse pressed!");
    clickCounter++;
    if (clickCounter >= clickThreshold) {
      elements.push(new Element(mouseX, mouseY, true));
      clickCounter = 0; 
      clickThreshold = Math.floor(random(3, 7));
    } else {
      elements.push(new Element(mouseX, mouseY));
    }
  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
