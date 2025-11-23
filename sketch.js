let cells = [];
let canvasWidth = 1800;
let canvasHeight = 900;
let cols = 8;
let rows = 3;
let cellWidth, cellHeight;
let color1 = [255, 214, 51]; /*YELLOW*/
let color2 = [2, 0, 233]; /*BLUE*/
let color3 = [239, 35, 170]; /*PINK*/
/*let color3 = [239, 35, 170];*/
let myColors = [color1, color2, color3];

// Shape dimensions as percentages
let shapeOneW, shapeOneH;
let shapeTwoW, shapeTwoH;
let shapeThreeW, shapeThreeH;
let img;

function preload() {
  img = loadImage('https://freight.cargo.site/w/3500/q/75/i/J2662719359141118263835712762339/HeroPlant.jpg');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  
  cellWidth = canvasWidth / cols;
  cellHeight = canvasHeight / rows;
  
  
  
  
  // Define shape dimensions as percentages of canvas
  shapeOneW = canvasWidth * 0.125;    // 12.5%W
  shapeOneH = canvasHeight * 0.50;    // 50%H
  shapeTwoW = canvasWidth * 0.125;    // 12.5%W
  shapeTwoH = canvasHeight * 0.25;    // 25%H
  shapeThreeW = canvasWidth * 0.0625; // 6.25%W
  shapeThreeH = canvasHeight * 0.25;  // 25%H
  
  // Create a cell for each position in the grid
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
  image(img, 0, 0, canvasWidth, canvasHeight);
  
  // Apply exclusion blend mode for the shapes
  blendMode(EXCLUSION);
  
  for (let cell of cells) {
    cell.update();
    cell.display();
  }
  
  // Reset blend mode back to normal
  blendMode(BLEND);
}

function mousePressed() {
  // Randomly flip some cells
  for (let cell of cells) {
    if (random() < 0.3) { // 30% chance each cell flips
      cell.flip();
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
    this.changeInterval = int(random(120, 300));
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
      this.changeInterval = int(random(120, 300));
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