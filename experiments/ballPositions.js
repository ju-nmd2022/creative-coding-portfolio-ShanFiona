// The following code is based on the Creative Coding - Force example 01 from Garrit

const synthA = new Tone.FMSynth().toDestination();
let elements = [];
let gravity;

class Element {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.initialPosition = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.size = this.getSizeBasedOnY(y);
        this.mass = this.size;
        this.color = this.getColorBasedOnY(y);
    }

    getSizeBasedOnY(y) {
        return map(y, 0, height, 20, 200);
    }

    getColorBasedOnY(y) {
        let r = 255; 
        let g = map(y, 0, height, 0, 255); 
        let b = 0; 
        return color(r, g, b);
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
        ellipse(this.position.x, this.position.y, this.size);
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
    let time = Tone.now();
    let pitch = map(mouseY, 0, height, 24, 72);
    synthA.triggerAttackRelease(Tone.Frequency(pitch, "midi").toNote(), "8n", time);
    let element = new Element(mouseX, mouseY);
    elements.push(element);
}