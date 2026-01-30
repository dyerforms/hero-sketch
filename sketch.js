let cells = [];
let canvasWidth = 824;
let canvasHeight = 549;
let cellWidth, cellHeight;
let color1 = [237, 28, 36]; /*RED*/
let color2 = [12, 11, 20]; /*BLACK*/
let color3 = [246, 243, 235]; /*WHITE*/
let myColors = [color1, color2, color3];

// Tile sizes as percentages of canvas dimensions
let tileSizesW = [0.125, 0.25]; // 12.5% and 25% of width
let tileSizesH = [0.125, 0.25]; // 12.5% and 25% of height
let currentSizeW;
let currentSizeH;

let img;

function preload() {
  img = loadImage('https://freight.cargo.site/w/1684/q/75/i/N2771079264186014987794753204707/bananaLeaf_842x549x2.jpg');
}

function setup() {
  let w = windowWidth;
  let h = w * (2/3);
  
  createCanvas(w, h);
  noStroke();
  noSmooth(); // Add this line - disables anti-aliasing

  
  canvasWidth = w;
  canvasHeight = h;
  
  // Calculate tile sizes as percentages of canvas
  //currentSizeW = random(tileSizesW) * canvasWidth;
  //currentSizeH = random(tileSizesH) * canvasHeight;
  
  
  // In setup, mousePressed, and windowResized:
currentSizeW = Math.round(random(tileSizesW) * canvasWidth);
currentSizeH = Math.round(random(tileSizesH) * canvasHeight);
  
  generateCells();
}

function generateCells() {
  cells = [];
  
  // Create grid based on current tile sizes
  for (let x = 0; x < canvasWidth; x += currentSizeW) {
    for (let y = 0; y < canvasHeight; y += currentSizeH) {
      cells.push(new Cell(x, y, currentSizeW, currentSizeH));
    }
  }
}

function draw() {
  background("#f1f5f2");
  image(img, 0, 0, canvasWidth, canvasHeight);
  
  blendMode(EXCLUSION);
  
  for (let cell of cells) {
    cell.update();
    cell.display();
  }
  
  blendMode(BLEND);
}

function mousePressed() {
  // Regenerate grid with new tile size
  currentSizeW = random(tileSizesW) * canvasWidth;
  currentSizeH = random(tileSizesH) * canvasHeight;
  generateCells();
}

function windowResized() {
  let w = windowWidth;
  let h = w * (2/3);
  
  resizeCanvas(w, h);
  
  canvasWidth = w;
  canvasHeight = h;
  
  // Recalculate tile sizes for new canvas dimensions
  currentSizeW = random(tileSizesW) * canvasWidth;
  currentSizeH = random(tileSizesH) * canvasHeight;
  
  generateCells();
}

class Cell {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    // Randomly choose a color
    this.color = random(myColors);
    
    // Timer for random color changes - slowed down for homepage
    this.frameCounter = 0;
    this.changeInterval = int(random(180, 600));
  }
  
  update() {
    this.frameCounter++;
    
    if (this.frameCounter >= this.changeInterval) {
      // Change color
      this.color = random(myColors);
      
      this.frameCounter = 0;
      this.changeInterval = int(random(180, 600));
    }
  }
  
  display() {
    fill(this.color[0], this.color[1], this.color[2], 255);
    rect(this.x, this.y, this.w, this.h);
  }
}