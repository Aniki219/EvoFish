class Fish {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.xvel = 0;
    this.yvel = 0;

    this.size = 10;
    this.speed = 3;

    this.xinf = 0;
    this.yinf = 0;
    this.sight = 0;
    this.food = 50;
    this.timing = floor(random(120));

    this.mutate();


    this.angle = 0;
    this.dead = false;
    fishArray.push(this);
  }

  see() {
    let seen = plantsArray.filter((p) => dist(this.x, this.y, p.x, p.y) < this.sight/2);
    let xx = 0;
    let yy = 0;

    if (seen.length == 0) {
      this.xinf = 0;
      this.yinf = 0;
      return;
    }
    seen.forEach((p) => {
      xx += p.x - this.x;
      yy += p.y - this.y;
    })
    let theta = atan2(yy,xx);
    this.xinf = cos(theta);
    this.yinf = sin(theta);
  }

  mutate() {
    this.size += random(-2, 2);
    this.speed += random(-1, 1);
    this.sight += random(-20, 20);

    this.size = max(this.size, 5);
    this.speed = max(this.speed, 3);
    this.sight = max(this.sight, 0);

    this.maxfood = round(this.size*3+20);
    this.color = color(
      this.speed*24 + 100,
      this.size*6 + 50,
      this.sight
    )
  }

  draw() {
    noStroke();
    push()
      translate(this.x, this.y);
      noFill();
      stroke(255,255,255,30);
      ellipse(0, 0, this.sight, this.sight);
      noStroke();
      rotate(this.angle);
      fill(this.color);
      ellipse(0, 0, this.size*1.25, this.size);
      triangle(-this.size/2, 0, -this.size, -this.size/3, -this.size, this.size/3);
      // fill(255,255,255,50);
      // rect(-this.size, -this.size/2-5, this.size*2, 2);
      // fill(255,155,0,100);
      // rect(-this.size, -this.size/2-5, (this.food/this.maxfood)*this.size*2, 2);
    pop();
  }

  move() {
    this.see();
    stroke(200,0,255,50)
    line(this.x, this.y, this.x+this.xinf*50, this.y+this.yinf*50);
    if (frameCount % 120 == this.timing) {

      this.xvel = 2*(this.xinf)+(this.speed)*random(-1,1);
      this.yvel = 2*(this.yinf)+(this.speed)*random(-1,1);
      this.angle = atan2(this.yvel, this.xvel);
      if (this.food >= 30 && random(100) < 10) {
        this.reproduce();
      }
      this.food-=round(max((2*this.size + this.speed)/5,1));
    }

    if (this.food <= 0) {
      this.dead = true;
    }

    if (placeFree(this, this.x + this.xvel, this.y)) {
      this.x += this.xvel;
    }
    if (placeFree(this, this.x , this.y + this.yvel)) {
      this.y += this.yvel;
    }
    this.xvel *= 0.95;
    this.yvel *= 0.95;
  }

  reproduce() {
    let fish = new Fish(this.x, this.y);
    this.food = floor(this.food/2);
    fish.food = this.food;
    fish.size = this.size;
    fish.speed = this.speed;
    fish.sight = this.sight;

    fish.mutate();
  }

  eat() {
    plantsArray.forEach((plant) => {
      if (plant.food <= 0) {return;}
      if (dist(plant.x, plant.y, this.x, this.y) < (plant.size + this.size)) {
        plant.food-=1;
        this.food+=1;
      }
    })

    if (this.food > this.maxfood) {
      this.food = this.maxfood;
      return;
    }
  }

  update() {
    this.move();
    this.draw();
    this.eat();
  }
}
