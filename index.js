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

  while(plantsArray.length < 10) {
    new Plant(50+random(width-100), cHeight);
  }
}

function draw() {
  background(50,80,180);

  fishArray = fishArray.filter((fish) => !fish.dead);
  fishArray.forEach((fish) => {fish.update()});

  plantsArray = plantsArray.filter((plant) => !plant.dead);
  plantsArray.forEach((plant) => {plant.update()});

  //drawGraph();
}

function placeFree(obj, x, y) {
  if (x - obj.size < 0 || x + obj.size > cWidth) {return false;}
  if (y - obj.size < 0 || y + obj.size > cHeight) {return false;}
  return true;
}

function drawGraph() {
  let sugarPopMax = Math.max.apply(null, sugarPop);
  let foodPopMax = Math.max.apply(null, foodPop);
  let bugPopMax = Math.max.apply(null, bugPop);
  fill(0);
  rect(0, cHeight, width, 150);
  noFill();
  stroke(200,0,0);
  beginShape();
    for (let [i, s] of sugarPop.entries()) {
      vertex(width/(sugarPop.length+1)*i, height - (s/sugarPopMax * 120));
    }
  endShape(OPEN);

  stroke(0,200,0);
  beginShape();
    for (let [i, s] of foodPop.entries()) {
      vertex(width/(foodPop.length+1)*i, height - (s/foodPopMax * 120));
    }
  endShape(OPEN);

  stroke(0,0,200);
  beginShape();
    for (let [i, s] of bugPop.entries()) {
      vertex(width/(bugPop.length+1)*i, height - (s/bugPopMax * 120));
    }
  endShape(OPEN);
}
