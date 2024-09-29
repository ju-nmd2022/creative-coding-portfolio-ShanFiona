// The following code is based on the Creative Coding - Force example 01 from Garrit

const synthA = new Tone.FMSynth().toDestination();
let elements = [];
let gravity;
let lastClickTime = 0;
let startTime = 0;

class Element {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.initialPosition = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.size = 40;
        this.mass = this.size;
        this.color = this.getColor();
        this.points = this.getPoints();
    }

    getColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        if (r < 128) r = 255;
        if (g < 128) g = 255;
        if (b < 128) b = 255;
        if (r > 200 && g > 200 && b > 200) {
            r = 255;
            g = 255;
            b = 0;
        }
        return color(r, g, b);
    }

    getPoints() {
        let points = [];
        for (let i = 0; i < 5; i++) {
            let angle = i * 2 * PI / 5;
            let px = cos(angle) * this.size / 2;
            let py = sin(angle) * this.size / 2;
            points.push(createVector(px, py));
            angle += PI / 5;
            px = cos(angle) * this.size / 4;
            py = sin(angle) * this.size / 4;
            points.push(createVector(px, py));
        }
        return points;
    }

    applyForce(force) {
        let newForce = force.copy();
        newForce.div(this.mass);
        this.acceleration.add(newForce);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(20);
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
        noStroke();
        beginShape();
        for (let point of this.points) {
            vertex(this.position.x + point.x, this.position.y + point.y);
        }
        endShape(CLOSE);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    gravity = createVector(0, 10);
    Tone.start();
    startTime = millis();
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

    if (millis() - lastClickTime > 200) {
        lastClickTime = millis();
        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * height);
        let time = Tone.now();
        let pitch = map(y, 0, height, 24, 72);
        synthA.triggerAttackRelease(Tone.Frequency(pitch, "midi").toNote(), "8n", time);
        let element = new Element(x, y);
        elements.push(element);
    }

    if (millis() - startTime > 30000) {
        elements = [];
        startTime = millis();
    }
}

function mousePressed() {
    let time = Tone.now();
    let pitch = map(mouseY, 0, height, 24, 72);
    synthA.triggerAttackRelease(Tone.Frequency(pitch, "midi").toNote(), "8n", time);
    let element = new Element(mouseX, mouseY);
    elements.push(element);
}