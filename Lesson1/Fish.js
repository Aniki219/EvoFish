class Fish {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.xvel = 0;
    this.yvel = 0;

    this.size = 15;
    this.speed = 5;
  }

  draw() {
    noStroke();
    let angle = atan2(this.yvel, this.xvel);
    push();
      translate(this.x, this.y);
      rotate(angle);
      fill(10,100,100);
      ellipse(0, 0, this.size * 1.25, this.size);
      triangle(-this.size / 2, 0, -this.size, -this.size / 3, -this.size, this.size / 3);
    pop();
  }

  move() {
    if (frameCount % 120 == 0) {
      this.xvel += random(-this.speed, this.speed);
      this.yvel += random(-this.speed, this.speed);
      this.angle = atan2(this.yvel, this.xvel);
    }

    if (placeFree(this, this.x + this.xvel, this.y)) {
      this.x += this.xvel;
    }
    if (placeFree(this, this.x, this.y + this.yvel)) {
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
