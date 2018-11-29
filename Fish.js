class Fish {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.xvel = 0;
    this.yvel = 0;

    this.size = 25;

    this.clr = color(250,180,0);
    this.food = 50;
    this.dead = false;
    fishArray.push(this);
  }

  draw() {
    fill(this.clr);
    ellipse(this.x, this.y, this.size*1.25, this.size);
    fill(0);
    textSize(10);
    text(this.food, this.x+10, this.y+20)
  }

  move() {
    if (frameCount % 120 == 0) {
      this.xvel = random(-5,5);
      this.yvel = random(-5,5);
    }

    this.food--;

    if (placeFree(this, this.x + this.xvel, this.y)) {
      this.x += this.xvel;
    }
    if (placeFree(this, this.x , this.y + this.yvel)) {
      this.y += this.yvel;
    }
    this.xvel *= 0.95;
    this.yvel *= 0.95;
  }

  update() {
    this.move();
    this.draw();
  }
}
