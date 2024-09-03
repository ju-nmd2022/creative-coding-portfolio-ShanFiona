let angleOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  strokeWeight(0.2);
  noFill();
}

function draw() {
  background(0, 50);

  const cellSize = 150; 
  const cols = ceil(width / cellSize); 
  const rows = ceil(height / cellSize);
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      push();
      translate(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
      angleOffset += 0.02;
      let numLines = 400;
      let radius = min(cellSize, cellSize) / 3;
    
      for (let i = 0; i < numLines; i++) {
        let angle = map(i, 0, numLines, 0, TWO_PI);
        let lineX = radius * cos(angle);
        let lineY = radius * sin(angle);

        // Wave effect
        let waveOffset = sin(frameCount * 0.02 + i * 0.1) * 60;

        stroke(255);
        line(0, 0, lineX + waveOffset, lineY + waveOffset);
      }

      pop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
