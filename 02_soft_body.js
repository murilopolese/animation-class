/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function Body(x, y, size) {
	this.pos = createVector(x, y)
	this.vel = createVector(random(10), 0)
	this.acc = createVector(0, 3.5)
	this.drag = createVector(this.pos.x, this.pos.y-100)
	this.note = 0
	// this.scale = random(scales)
	this.scale = shuffle(scale)
	this.octave = 0
	this.synth = synth = new p5.PolySynth();
	this.synth.disconnect()
	this.synth.connect(filter)
	this.synth.setADSR(
		0.2, 0.1, 0.1, 0.5
	)

	// this.reverb.process(this.synth, 1, 1)
	// this.delay.process(this.synth, 0.5, .5);

	this.applyForce = function(f) {
		this.vel.add(f)
		this.vel.limit(60)
	}
	this.nextNote = function() {
		this.note = (this.note + 1) % scale.length
	}
	this.playNote = function() {
		this.synth.play(
			`${this.scale[this.note]}${this.octave}`,
			1, 0.2, 0.3
		)
	}
	this.update = function() {
		if (this.pos.y > height) {
			this.pos.y = height
			this.vel.y *= -1
			this.playNote()
			this.nextNote()
		} else if (this.pos.x > width || this.pos.x < 0) {
			if (this.pos.x > width) {
				this.pos.x = width
			}
			if (this.pos.x < 0) {
				this.pos.x = 0
			}
			this.vel.x *= -1.2
			this.playNote()
			this.nextNote()
		} else {
			this.applyForce(this.acc)
		}
		this.pos.add(this.vel)
	}
	this.draw = function() {
		fill(255)
		ellipse(
			this.pos.x,
			this.pos.y,
			150, 150+this.vel.y
		)
		fill(0)
		ellipse( this.pos.x-20, this.pos.y-30, 15+this.vel.y/4, 15+this.vel.y/3 )
		ellipse( this.pos.x+20, this.pos.y-30, 15+this.vel.y/4, 15+this.vel.y/3 )
		fill('#d00')
		ellipse(
			this.pos.x,
			this.pos.y,
			50+this.vel.y/4,
			20-this.vel.y
		)
	}
}

const scales = [
	// ['C', 'D', 'E', 'G', 'A'],
	['A', 'B', 'C', 'D', 'E'],
	['A', 'B', 'C', 'D', 'E', 'D', 'C', 'B'],
	['A', 'B', 'A', 'C', 'A', 'D', 'A', 'E', 'A', 'D', 'A', 'C', 'A', 'B']
]
let scale = []
let bgColor, bodies = []
let synth, reverb, delay, filter
function setup() {
	scale = random(scales)
	frameRate(20)
  createCanvas(windowWidth, windowHeight)
	ellipseMode(CENTER)
	angleMode(DEGREES)
	noStroke()
	bgColor = color(random(255), random(255), random(255))
	masterVolume(0.3, 0.1, 0.1)
	filter = new p5.LowPass()
	filter.freq(0)
}

function draw() {
	filter.freq(
		map(mouseX, 0, width, 0, 5000)
	)
	translate(0, -75)
	frameRate(30)
	background(bgColor)

	bodies.forEach(function(bodyA) {
		bodyA.update()
		bodyA.draw()
	})

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function mouseClicked() {
	bgColor = color(random(255), random(255), random(255), random(150, 255))
	let b = new Body(mouseX, mouseY)
	b.octave = parseInt(
		random(3, 6)
		// (bodies.length % 4) + 3
	)
	bodies.push( b )
}
