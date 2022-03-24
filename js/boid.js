class Boid {
  constructor() {
    this.position = createVector(random(width), random(height))
    this.velocity = p5.Vector.random2D()
    this.velocity.setMag(random(2, 4))
    this.acceleration = createVector()
    this.maxForce = 1
    this.maxSpeed = 4
    this.perceptionRadius = 50
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
      steering.setMag(this.maxSpeed)
      steering.sub(this.velocity)
      steering.limit(this.maxForce)
    }
    return steering
  }

  cohesion(boids) {
    let steering = createVector()
    let total = 0
    for (const boid of boids) {
      let d = dist(this.position.x, this.position.y, boid.position.x, boid.position.y)
      if (d < this.perceptionRadius && boid != this) {
        steering.add(boid.position)
        total++
      }
    }
    if (total > 0) {
      steering.div(total)
      steering.sub(this.position)
      steering.setMag(this.maxSpeed)
      steering.sub(this.velocity)
      steering.limit(this.maxForce)
    }
    return steering
  }

  separation(boids) {
    let steering = createVector()
    let total = 0
    for (const boid of boids) {
      let d = dist(this.position.x, this.position.y, boid.position.x, boid.position.y)
      if (d < this.perceptionRadius && boid != this) {
        let diff = p5.Vector.sub(this.position, boid.position)
        diff.div(d * d)
        steering.add(diff)
        total++
      }
    }
    if (total > 0) {
      steering.div(total)
      steering.setMag(this.maxSpeed)
      steering.sub(this.velocity)
      steering.limit(this.maxForce)
    }
    return steering
  }

  flock(boids) {
    this.acceleration.mult(0)
    let alignment = this.align(boids)
    let cohesion = this.cohesion(boids)
    let separation = this.separation(boids)

    alignment.mult(alignSlider.value())
    cohesion.mult(cohesionSlider.value())
    separation.mult(separationSlider.value())

    this.acceleration.add(alignment)
    this.acceleration.add(cohesion)
    this.acceleration.add(separation)
  }

  update() {
    this.position.add(this.velocity)
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxSpeed)
  }

  show() {
    strokeWeight(5)
    stroke(255)
    triangle(
      this.position.x,
      this.position.y,
      this.position.x - 2.5,
      this.position.y + 5,
      this.position.x + 2.5,
      this.position.y + 5
    )
  }
}
