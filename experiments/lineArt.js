function setup() {
  createCanvas(windowWidth, windowHeight);
    background(0);
    stroke(200);
    noFill();
    strokeWeight(0.5);
  }
  
  function draw() {
    background(0, 50);
    translate(width / 2, height / 2.5);
    
    let numLines = 200; 
    let radius = 400;

    for (let i = 0; i < numLines; i++) {
      let angle = map(i, 0, numLines, 0, TWO_PI);
      let x = radius * cos(angle);
      let y = radius * sin(angle);
  
      // wave effect
      let waveOffset = sin(frameCount * 0.02 + i * 0.1) * 50;
      
      line(0, 0, x + waveOffset, y + waveOffset);
    }
  
    rotate(frameCount * 0.001);
  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight); 
  }
  