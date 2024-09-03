let angleOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  strokeWeight(0.23);
  noFill();
}

function draw() {
  background(0, 50);

  const cellSize = 200;
  const cols = floor(width / cellSize); 
  const rows = floor(height / cellSize); 

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      push();
      translate(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
      angleOffset += 0.01;
      let numLines = 600;
      let radius = min(cellSize, cellSize) / 2.5;

      for (let i = 0; i < numLines; i++) {
        let angle = map(i, 0, numLines, 0, TWO_PI);
        let x = radius * cos(angle);
        let y = radius * sin(angle);

        // wave effect
        let waveOffset = sin(frameCount * 0.01 + i * 0.1) * 40;

        // Color
        let startColor = color(255, 0, 0);
        let endColor = color(0, 0, 255);
        let interColor = lerpColor(startColor, endColor, i / numLines);
        stroke(interColor);

        line(0, 0, x + waveOffset, y + waveOffset);
      }

      pop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
