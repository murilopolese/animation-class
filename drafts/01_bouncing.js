function Body(x, y, size) {
	this.pos = createVector(x, y)
	this.vel = createVector(0, -15)
	this.acc = createVector(0, 0)
	this.size = size || 20

	this.applyForce = function(f) {
		this.vel.add(f)
		this.vel.limit(30)
	}
	this.update = function() {
		if (this.pos.y > height) {
			this.pos.y = height
			this.vel.y *= -1
		} else if (this.pos.x > width || this.pos.x < 0) {
			this.pos.x = min(max(0, this.pos.x), width)
			this.vel.x *= -1
		} else {
			this.vel.add(this.acc)
		}
		this.pos.add(this.vel)
	}
	this.draw = function() {
		stroke(255)
		fill(255)
		ellipse(this.pos.x, this.pos.y, this.size, this.size)
	}
}

let slider
let gravity
let bodies = []
function setup() {
  createCanvas(600, 600)
	ellipseMode(CENTER)
	angleMode(DEGREES)
	bodies.push( new Body( width/2, height ) )
	createP('Gravity')
	slider = createSlider(0.1, 2, 0.5, 0.01)
}

function draw() {
	background(0)
	gravity = createVector(0, slider.value())
	bodies.forEach((b) => {
		b.update()
		b.applyForce(gravity)
		b.draw()
	})
}
