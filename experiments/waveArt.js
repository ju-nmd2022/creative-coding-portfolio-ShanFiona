let angleOffset = 0; // Rotation

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    strokeWeight(0.20);
    noFill();
}

function draw() {
    background(0, 50);
    
    translate(width / 2, height / 2.2);
    
    // Speed
    angleOffset += 0.03; 
    let numLines = 500; 
    let radius = 300;
    stroke(255); 

    for (let i = 0; i < numLines; i++) {
        let angle = map(i, 0, numLines, 0, TWO_PI);
        let x = radius * cos(angle);
        let y = radius * sin(angle);

        // wave effect
        let waveOffset = sin(frameCount * 0.02 + i * 0.1) * 50;

        line(0, 0, x + waveOffset, y + waveOffset);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight); 
  }
  