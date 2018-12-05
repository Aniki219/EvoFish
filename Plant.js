const MAXPLANTS = 150;

class Plant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.food = 20;
    this.size = 10;

    this.canProduce = true;

    if (plantsArray.find((plant) => dist(plant.x, plant.y, this.x, this.y) < this.size)) {return;}
    if (this.x < 0 || this.x > cWidth || this.y < 0 || this.y > cHeight) {return;}
    plantsArray.push(this);
  }

  draw() {
    noStroke();
    fill(50,225,0,255*this.food/20);
    ellipse(this.x, this.y, this.size, this.size);
  }

  grow() {
    if (frameCount % 120 != 0) {return;}

    if (this.food <= 0 && random(100) < 10) {
      this.dead = true;
    }
    if (this.food < 20) {
      this.food+=2;
    }
    if (plantsArray.length < MAXPLANTS && this.food >= 20 && random(4) < 1) {
      new Plant(this.x + round(random(-1,1))*this.size, this.y + round(random(-1,1))*this.size);
    }
  }

  update() {
    this.grow();
    this.draw();
  }
}
