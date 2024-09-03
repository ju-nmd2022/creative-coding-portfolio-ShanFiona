let angleOffset = 0;
const gridSize = 9;

function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(0);
  strokeWeight(0.3);
  noFill();
}

function draw() {
  background(0, 50);

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      push();
      translate(x * width / gridSize, y * height / gridSize);
      translate(width / gridSize / 2, height / gridSize / 2);
      angleOffset += 0.2;
      let numLines = 160;
      let radius = min(width, height) / 10;

      let startColor = color(random(255), random(255), random(255));
      let endColor = color(random(255), random(255), random(255));

      for (let i = 0; i < numLines; i++) {
        let angle = map(i, 0, numLines, 0, TWO_PI);
        let x = radius * cos(angle);
        let y = radius * sin(angle);

        let waveOffset = sin(frameCount * 0.02 + i * 0.1) * 90;

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
