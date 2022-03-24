const flock = []

function setup() {
  createCanvas(854, 480)
  for (let i = 0; i < 100; i++) {
    flock.push(new Boid())
  }
  setInterval(() => {
    flock.push(new Boid())
  }, 10000)
}

function draw() {
  background(51)

  for (const boid of flock) {
    boid.edges()
    boid.flock(flock)
    boid.update()
    boid.show()
  }
}
