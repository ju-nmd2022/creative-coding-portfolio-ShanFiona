function setup() {
    createCanvas(600, 600);
    background(0);
    stroke(255, 0, 0); 
    noFill();
    strokeWeight(1);
  }
  
  function draw() {
    background(0, 50);
    translate(width / 2, height / 3);
  
    let numLines = 150; 
    let radius = 15; 
  
    for (let i = 0; i < numLines; i++) {

    // The following 7 lines of Code was adapted from blackbox.ai
      let angleStep = TWO_PI / numLines; 
      let angle = i * angleStep;
      let x = 15 * pow(sin(angle), 3); 
      let y = (13 * cos(angle) - 5 * cos(2 * angle) - 2 * cos(3 * angle) - cos(4 * angle)); 
      y = -y;
      x *= radius;
      y *= radius;
  
      let waveOffset = sin(frameCount * 0.02 + i * 0.1) * 20;
      
      line(0, 0, x + waveOffset, y + waveOffset);
    }
  
    rotate(frameCount * 0.001);
  }
  