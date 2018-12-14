class Fish {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.xvel = 0;
    this.yvel = 0;

    this.size = 15;
    this.speed = 5;
    this.hue = 10;

    this.food = 50;
    this.maxfood = 50;
    this.dead = false;

    this.timing = floor(random(120));
  }

  reproduce() {
    let fish = new Fish(this.x, this.y);
    this.food = floor(this.food/1.5);
    fish.food = this.food;
    fish.size = this.size;
    fish.speed = this.speed;
    fish.hue = this.hue;

    fish.mutate();
    fishArray.push(fish);
  }

  mutate() {
    if (random(2) < 1) {return;}
    this.size += random(-4, 4);
    this.speed += random(-1, 1);

    this.size = max(this.size, 5);
    this.speed = max(this.speed, 3);

    this.hue += random(-5, 5);
    if (this.hue < 0) { this.hue = 100; }
    if (this.hue > 100) { this.hue = 0; }

    this.maxfood = round(this.size*3+10);
  }

  draw() {
    noStroke();
    let angle = atan2(this.yvel, this.xvel);
    push();
      translate(this.x, this.y);
      rotate(angle);
      fill(this.hue,100,100);
      ellipse(0, 0, this.size * 1.25, this.size);
      triangle(-this.size / 2, 0, -this.size, -this.size / 3, -this.size, this.size / 3);
    pop();

    fill(100,0,50,50);
    rect(this.x-this.size, this.y-this.size/2-5, this.size*2, 3);
    fill(10,100,100,150);
    rect(this.x-this.size, this.y-this.size/2-5, (this.food/this.maxfood)*this.size*2, 3);
  }

  move() {
    if (frameCount % 120 == this.timing) {
      this.xvel += random(-this.speed, this.speed);
      this.yvel += random(-this.speed, this.speed);
      this.angle = atan2(this.yvel, this.xvel);

      if (this.food >= 30 && random(100) < 2) {
        this.reproduce();
      }

      this.food-=round(max((this.size + this.speed)/5,1));
    }
    if (this.food <= 0) {
      this.dead = true;
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

  eat() {
    if (this.food >= this.maxfood) {
      this.food = this.maxfood;
      return;
    }

    plantsArray.forEach((plant) => {
      if (plant.food <= 0) {return;}
      if (dist(plant.x, plant.y, this.x, this.y) < (plant.size + this.size)) {
        plant.food-=2;
        this.food+=2;
      }
    })
  }

  update() {
    this.move();
    this.eat();
    this.draw();
  }
}
