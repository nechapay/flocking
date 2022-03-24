class Boid {
  constructor() {
    this.position = createVector(random(width), random(height))
    this.velocity = p5.Vector.random2D()
    this.velocity.setMag(random(2, 4))
    this.acceleration = createVector()
    this.maxForce = 0.2
    this.maxSpeed = 4
    this.perceptionRadius = 25
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0
    } else if (this.position.x < 0) {
      this.position.x = width
    }

    if (this.position.y > height) {
      this.position.y = 0
    } else if (this.position.y < 0) {
      this.position.y = height
    }
  }

  align(boids) {
    let steering = createVector()
    let total = 0
    for (const boid of boids) {
      let d = dist(this.position.x, this.position.y, boid.position.x, boid.position.y)
      if (d < this.perceptionRadius && boid != this) {
        steering.add(boid.velocity)
        total++
      }
    }
    if (total > 0) {
      steering.div(total)
      steering.sub(this.velocity)
      steering.setMag(this.maxSpeed)
      steering.limit(this.maxForce)
    }
    return steering
  }

  flock(boids) {
    let alignment = this.align(boids)
    this.acceleration = alignment
  }

  update() {
    this.position.add(this.velocity)
    this.velocity.add(this.acceleration)
  }

  show() {
    strokeWeight(8)
    stroke(255)
    point(this.position.x, this.position.y)
  }
}
