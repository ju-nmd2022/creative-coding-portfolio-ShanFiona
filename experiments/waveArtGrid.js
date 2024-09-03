let angleOffset = 0; 
const gridSize = 4; 

function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(0);
  strokeWeight(0.2);
  noFill();
}

function draw() {
  background(0, 50);
  
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      push();
      translate(x * width / gridSize, y * height / gridSize);
      
      translate(width / gridSize / 2, height / gridSize / 2);
      angleOffset += 0.01; 
      let numLines = 500; 
      let radius = min(width, height) /7; 
      stroke(255); 

      for (let i = 0; i < numLines; i++) {
        let angle = map(i, 0, numLines, 0, TWO_PI);
        let x = radius * cos(angle);
        let y = radius * sin(angle);

        // wave effect
        let waveOffset = sin(frameCount * 0.02 + i * 0.1) * 40;

        line(0, 0, x + waveOffset, y + waveOffset);
      }
      
      pop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
}
