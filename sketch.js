let cells = [];
let canvasWidth = 824;
let canvasHeight = 549;
let cellWidth, cellHeight;
let color1 = [237, 28, 36]; /*RED*/
let color2 = [12, 11, 20]; /*BLACK*/
let color3 = [246, 243, 235]; /*WHITE*/
let myColors = [color1, color2, color3];

// Tile sizes from second code
let tileSizesW = [103, 206, 412];
let tileSizesH = [61, 183];
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
  
  canvasWidth = w;
  canvasHeight = h;
  
  // Pick initial tile sizes
  currentSizeW = random(tileSizesW);
  currentSizeH = random(tileSizesH);
  
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
  currentSizeW = random(tileSizesW);
  currentSizeH = random(tileSizesH);
  generateCells();
}

function windowResized() {
  let w = windowWidth;
  let h = w * (2/3);
  
  resizeCanvas(w, h);
  
  canvasWidth = w;
  canvasHeight = h;
  
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
    
    // Timer for random color changes
    this.frameCounter = 0;
    this.changeInterval = int(random(180, 300));
  }
  
  update() {
    this.frameCounter++;
    
    if (this.frameCounter >= this.changeInterval) {
      // Change color
      this.color = random(myColors);
      
      this.frameCounter = 0;
      this.changeInterval = int(random(60, 300));
    }
  }
  
  display() {
    fill(this.color[0], this.color[1], this.color[2], 255);
    rect(this.x, this.y, this.w, this.h);
  }
}