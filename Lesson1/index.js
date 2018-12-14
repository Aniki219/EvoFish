var fish;

var cWidth = 300;
var cHeight = 300;

function setup() {
  createCanvas(cWidth, cHeight);
  colorMode(HSB, 100);
  fish = new Fish(250, 250);
}

function draw() {
  background(65,70,70);
  fish.update();
}

function placeFree(obj, x, y) {
  if (x - obj.size < 0 || x + obj.size > cWidth) {return false;}
  if (y - obj.size < 0 || y + obj.size > cHeight) {return false;}

  return true;
}
