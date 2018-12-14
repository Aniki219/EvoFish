const MAXPLANTS = 200;

class Plant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.food = 5;
    this.size = 10;

    this.canProduce = true;
  }

  draw() {
    noStroke();
    fill(30,100,100,100*this.food/5);
    ellipse(this.x, this.y, this.size, this.size);
  }

  grow() {
    if (frameCount % 120 != 0) {return;}

    if (this.food < 5 && random(4) < 1) {
      this.food += 1;
    }

    if (plantsArray.length < MAXPLANTS && random(10) < 1) {
      let plant = new Plant(this.x + round(random(-1,1))*this.size, this.y + round(random(-1,1))*this.size);

      if (plantsArray.find((otherPlant) => dist(plant.x, plant.y, otherPlant.x, otherPlant.y) < this.size)) {return;}
      if (plant.x < 0 || plant.x > cWidth || plant.y < 0 || plant.y > cHeight) {return;}

      plantsArray.push(plant);
    }
  }

  update() {
    this.grow();
    this.draw();
  }
}
