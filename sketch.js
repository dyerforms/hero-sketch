let cells = [];
let canvasWidth = 824;
let canvasHeight = 549;
let cols = 8;
let rows = 3;
let cellWidth, cellHeight;
let color1 = [237, 238, 36]; /*red*/
let color2 = [219, 217, 100]; /*lightblue*/
let color3 = [239, 35, 170]; /*PINK*/
let color4 = [246, 243, 235]; /*WHITE*/
let color5 = [12, 11, 20]; /*BLACK*/
let color6 = [2, 0, 233]; /*BLUE*/
let myColors = [color6, color1, color3];

// Shape dimensions as percentages
let shapeOneW, shapeOneH;
let shapeTwoW, shapeTwoH;
let shapeThreeW, shapeThreeH;

// Image array and current index
let images = [];
let currentImageIndex = 0;
let imageChangeInterval = 180; // Change every 3 seconds (at 60fps)
let imageFrameCounter = 0;

function preload() {
  // Load 3 images into the array
  images.push(loadImage('https://freight.cargo.site/w/1648/q/75/i/K2686426179411618730645748134371/PortfolioHero_3.jpg'));
  images.push(loadImage('https://freight.cargo.site/w/1648/q/75/i/O2686447944300676186850380165603/PortfolioHero_B.jpg'));
  images.push(loadImage('https://freight.cargo.site/w/1648/q/75/i/C2752117856838092655226725282275/PortfolioHero_D.jpg'));
}

function setup() {
  let w = windowWidth;
  let h = w * (2/3);
  
  createCanvas(w, h);
  noStroke();
  
  canvasWidth = w;
  canvasHeight = h;
  
  cellWidth = canvasWidth / cols;
  cellHeight = canvasHeight / rows;
  
  shapeOneW = canvasWidth * 0.125;
  shapeOneH = canvasHeight * 0.25;
  shapeTwoW = canvasWidth * 0.125;
  shapeTwoH = canvasHeight * 0.125;
  shapeThreeW = canvasWidth * 0.5;
  shapeThreeH = canvasHeight * 0.5;
  
  cells = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellWidth;
      let y = j * cellHeight;
      cells.push(new Cell(x, y, cellWidth, cellHeight));
    }
  }
}

function draw() {
  background("#f1f5f2");
  
  // Draw the current image
  image(images[currentImageIndex], 0, 0, canvasWidth, canvasHeight);
  
  // Auto-rotate images (optional - remove if you don't want auto-rotation)
  imageFrameCounter++;
  if (imageFrameCounter >= imageChangeInterval) {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    imageFrameCounter = 0;
  }
  
  blendMode(EXCLUSION);
  
  for (let cell of cells) {
    cell.update();
    cell.display();
  }
  
 blendMode(BLEND);
}

function mousePressed() {
  // Rotate to next image on click
  currentImageIndex = (currentImageIndex + 1) % images.length;
  
  // Randomly flip some cells
  for (let cell of cells) {
    if (random() < 0.3) {
      cell.flip();
    }
  }
}

// ... rest of your code stays the same




function windowResized() {
  let w = windowWidth;
  let h = w * (2/3);;
  
  resizeCanvas(w, h);
  
  canvasWidth = w;
  canvasHeight = h;
  cellWidth = canvasWidth / cols;
  cellHeight = canvasHeight / rows;
  
  shapeOneW = canvasWidth * 0.125;
  shapeOneH = canvasHeight * 0.25;
  shapeTwoW = canvasWidth * 0.125;
  shapeTwoH = canvasHeight * 0.125;
  shapeThreeW = canvasWidth * 0.5;
  shapeThreeH = canvasHeight * 0.5;
  
  // Recreate cells with new dimensions
  cells = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellWidth;
      let y = j * cellHeight;
      cells.push(new Cell(x, y, cellWidth, cellHeight));
    }
  }
}

class Cell {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    // Randomly choose a shape type (0=shape1, 1=shape2, 2=shape3)
    this.shapeType = int(random(3));
    
    // Randomly choose a color
    this.color = random(myColors);
    
    // Vertical flip state
    this.flipped = false;
    
    // Timer for random changes
    this.frameCounter = 0;
    this.changeInterval = int(random(90, 300));
  }
  
  update() {
    this.frameCounter++;
    
    if (this.frameCounter >= this.changeInterval) {
      // Randomly change shape type or color
      if (random() < 0.5) {
        this.shapeType = int(random(3));
      } else {
        this.color = random(myColors);
      }
      
      this.frameCounter = 0;
      this.changeInterval = int(random(60, 300));
    }
  }
  
  flip() {
    this.flipped = !this.flipped;
  }
  
  display() {
    fill(this.color[0], this.color[1], this.color[2], 255);
    
    let shapeX, shapeY, shapeW, shapeH;
    
    // Get the specific shape dimensions
    if (this.shapeType === 0) {
      // Shape 1: 12.5%W x 50%H
      shapeW = shapeOneW;
      shapeH = shapeOneH;
    } else if (this.shapeType === 1) {
      // Shape 2: 12.5%W x 25%H
      shapeW = shapeTwoW;
      shapeH = shapeTwoH;
    } else {
      // Shape 3: 6.25%W x 25%H
      shapeW = shapeThreeW;
      shapeH = shapeThreeH;
    }
    
    // Center horizontally within cell
    shapeX = this.x + (this.w - shapeW) / 2;
    
    // Position vertically based on flip state
    if (this.flipped) {
      shapeY = this.y + this.h - shapeH; // Bottom of cell
    } else {
      shapeY = this.y; // Top of cell
    }
    
    rect(shapeX, shapeY, shapeW, shapeH);
  }
}
