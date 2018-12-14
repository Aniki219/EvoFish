var fishArray = [];
var plantsArray = [];

var cWidth = 300;
var cHeight = 300;

function setup() {
  createCanvas(cWidth, cHeight);
  colorMode(HSB, 100);
  while(fishArray.length < 5) {
    fish = new Fish(random(cWidth-50)+50, random(cHeight-50)+50);
    fish.mutate();
    fishArray.push(fish);
  }
  while(plantsArray.length < 35) {
    plant = new Plant(random(cWidth-50)+50, random(cHeight-50)+50);
    plantsArray.push(plant);
  }
}

function draw() {
  background(65,70,70);

  plantsArray = plantsArray.filter((plant) => !plant.dead);
  for(var plant of plantsArray) {
    plant.update();
  }

  if (frameCount % 180 == 0 && random(1000) < 1) {
    new Plant(50+random(cWidth-100), 50+random(cHeight-100));
  }

  fishArray = fishArray.filter((fish) => !fish.dead);
  for(var fish of fishArray) {
    fish.update();
  }
}

function placeFree(obj, x, y) {
  if (x - obj.size < 0 || x + obj.size > cWidth) {return false;}
  if (y - obj.size < 0 || y + obj.size > cHeight) {return false;}

  return true;
}
