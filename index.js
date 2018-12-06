var fishArray = [];
var plantsArray = [];
var rocksArray = [];

var cWidth = 500;
var cHeight = 500;

var fishPop = [];
var plantPop = [];

function setup() {
  createCanvas(cWidth, cHeight + 150);
  colorMode(HSB, 100);
  while(fishArray.length < 5) {
    new Fish(50+random(width-100), 50+random(cHeight-100));
  }

  while(plantsArray.length < 25) {
    new Plant(50+random(cWidth-100), 50+random(cHeight-100));
  }

  while(rocksArray.length < round(random(20,50))) {
    console.log(1)
    new Rock(round(random(cWidth)), round(random(cHeight)));
  }
}

function draw() {
  background(65,70,70);

  rocksArray.forEach((rock) => {rock.draw()});

  plantsArray = plantsArray.filter((plant) => !plant.dead);
  plantsArray.forEach((plant) => {plant.update()});

  fishArray = fishArray.filter((fish) => !fish.dead);
  fishArray.forEach((fish) => {fish.update()});

  if (frameCount % 180 == 0 && random(1000) < 1) {
    new Plant(50+random(cWidth-100), 50+random(cHeight-100));
  }

  drawGraph();
}

function placeFree(obj, x, y) {
  if (x - obj.size < 0 || x + obj.size > cWidth) {return false;}
  if (y - obj.size < 0 || y + obj.size > cHeight) {return false;}
  for (var r of rocksArray) {
    if (dist(x, y, r.x, r.y) < obj.size/2 + r.size/2) {
      return false;
    }
  }
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
  stroke(0,100,90);

  beginShape();
    for (let [i, s] of fishPop.entries()) {
      vertex(width/(fishPop.length+1)*i, height - (s/fishPopMax * 120));
    }
  endShape(OPEN);

  stroke(50,100,100);
  beginShape();
    for (let [i, s] of plantPop.entries()) {
      vertex(width/(plantPop.length+1)*i, height - (s/plantPopMax * 120));
    }
  endShape(OPEN);

  let totalsize = 0;
  fishArray.forEach((fish) => {totalsize += fish.size;})
  let avgSize = round(totalsize/fishArray.length);
  fill(100,0,100);
  noStroke();
  textSize(10);
  let fishSizes = fishArray.map(f => f.size);
  text("smallest size: " + round(Math.min.apply(null, fishSizes)), 10, height-130);
  text("largest size: " + round(Math.max.apply(null, fishSizes)), 10, height-110);
  text("average size: " + avgSize, 10, height-100)
}

function collectData() {
  fishPop.push(fishArray.length);
  plantPop.push(plantsArray.length);

}
