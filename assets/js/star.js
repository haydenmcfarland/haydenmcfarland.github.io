class Star {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.radius = radius;
    this.setRandomTargetRadius();
    this.speed = Math.max(Math.random() * 0.005, 0.005);
    this.frozen = false;
    this.returnToOriginSpeed = 0.05;
  }
  setRandomTargetRadius() {
    this.targetRadius = Math.floor(Math.random() * 3);
  }
  fillStyle() {
    return `rgba(255, 255, 255, ${this.opacity})`;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(this.radius, 0), 0, Math.PI * 2, false);
    ctx.fillStyle = this.fillStyle();
    ctx.fill();
  }
  tryToReturnToOrigin() {
    if (this.blocked) {
      return;
    }

    if (this.x > this.originX) {
      this.x -= Math.min(this.returnToOriginSpeed, this.x - this.originX);
    } else if (this.x < this.originX) {
      this.x += Math.min(this.returnToOriginSpeed, this.originX - this.x);
    }

    if (this.y > this.originY) {
      this.y -= Math.min(this.returnToOriginSpeed, this.y - this.originY);
    } else if (this.y < this.originY) {
      this.y += Math.min(this.returnToOriginSpeed, this.originY - this.y);
    }

    if (this.radius > this.targetRadius) {
      this.radius -= this.speed;
      if (this.radius < this.targetRadius) {
        this.setRandomTargetRadius();
      }
    }

    if (this.radius < this.targetRadius) {
      this.radius += this.speed;
      if (this.radius > this.targetRadius) {
        this.targetRadius = 0;
      }
    }
  }
  withinRadius(x0, y0, x1, y1, r) {
    return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) < r;
  }
  avoidMouse() {
    if (!this.mousePosition) {
      return;
    }

    const withinMouseRadius = this.withinRadius(
      this.mousePosition.x,
      this.mousePosition.y,
      this.x,
      this.y,
      this.mouseRadius
    );
    if (withinMouseRadius) {
      this.x =
        this.x +
        Math.sign(this.x - this.mousePosition.x) * this.mouseAvoidSpeed;
      this.y =
        this.y +
        Math.sign(this.y - this.mousePosition.y) * this.mouseAvoidSpeed;
    }

    this.blocked = withinMouseRadius;
  }
  update(updates) {
    Object.assign(this, updates);
    this.tryToReturnToOrigin();
    this.avoidMouse();
    this.draw();
  }
}
