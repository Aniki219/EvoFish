var fishArray = [];
var plantsArray = [];

var cWidth = 500;
var cHeight = 500;

var fishPop = [];
var plantPop = [];

function setup() {
  createCanvas(cWidth, cHeight + 150);
  while(fishArray.length < 5) {
    new Fish(50+random(width-100), 50+random(cHeight-100));
  }

  while(plantsArray.length < 25) {
    new Plant(50+random(cWidth-100), 50+random(cHeight-100));
  }
}

function draw() {
  background(50,80,180);

  fishArray = fishArray.filter((fish) => !fish.dead);
  fishArray.forEach((fish) => {fish.update()});

  plantsArray = plantsArray.filter((plant) => !plant.dead);
  plantsArray.forEach((plant) => {plant.update()});

  if (frameCount % 180 == 0 && random(1000) < 1) {
    new Plant(50+random(cWidth-100), 50+random(cHeight-100));
  }

  drawGraph();
}

function placeFree(obj, x, y) {
  if (x - obj.size < 0 || x + obj.size > cWidth) {return false;}
  if (y - obj.size < 0 || y + obj.size > cHeight) {return false;}
  return true;
}

function drawGraph() {
  if (frameCount % 60 == 0) {
    collectData();
  }
  let plantPopMax = Math.max.apply(null, plantPop);
  let fishPopMax = Math.max.apply(null, fishPop);

  fill(0);
  rect(0, cHeight, width, 150);
  noFill();
  stroke(200,0,0);

  beginShape();
    for (let [i, s] of fishPop.entries()) {
      vertex(width/(fishPop.length+1)*i, height - (s/fishPopMax * 120));
    }
  endShape(OPEN);

  stroke(0,200,0);
  beginShape();
    for (let [i, s] of plantPop.entries()) {
      vertex(width/(plantPop.length+1)*i, height - (s/plantPopMax * 120));
    }
  endShape(OPEN);

  let totalsize = 0;
  fishArray.forEach((fish) => {totalsize += fish.size;})
  let avgSize = round(totalsize/fishArray.length);
  fill(255);
  noStroke();
  textSize(16);
  text("average size: " + avgSize, 10, height-130)
}

function collectData() {
  fishPop.push(fishArray.length);
  plantPop.push(plantsArray.length);

}
