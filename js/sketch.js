const flock = []

let alignSlider, cohesionSlider, separationSlider

function setup() {
  createCanvas(854, 480)
  for (let i = 0; i < 200; i++) {
    flock.push(new Boid())
  }

  alignSlider = createSlider(0, 2, 1, 0.1)
  cohesionSlider = createSlider(0, 2, 1, 0.1)
  separationSlider = createSlider(0, 2, 1, 0.1)
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
