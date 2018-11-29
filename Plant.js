class Plant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.food = 20;

    this.canProduce = (this.y > cHeight-150);

    plantsArray.push(this);
  }

  draw() {
    noStroke();
    fill(50,225,0);
    ellipse(this.x, this.y, 10, 10);
  }

  grow() {
    if (this.canProduce && frameCount % 60 == 0 && random(2) < 1) {
      new Plant(this.x + random(-5,5), this.y-5);
      if (random(100) < 85) {
        this.canProduce = false;
      }
    }
  }

  update() {
    this.grow();
    this.draw();
  }
}
