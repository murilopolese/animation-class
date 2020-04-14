const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies
const Body = Matter.Body
const Composites = Matter.Composites
let engine, world, body, bodies = [], ground, randomColor
let palette = [
	'#f5e4d7', // bright yellow
	'#edd4c2', // dark yellow
	'#fc6e5b', // bright red
	'#e85d4a', // dark red
	'#80d2f2', // bright blue
	'#52b6de', // regular blue
	'#828dab', // light gray
	'#6e778f', // dark grey
	'#4b5161' // black
]

function Ball(x, y, size) {
	this.size = size || 10
	this.sprite = 0
	this.face = 0
	this.mood = random(['happy', 'scared'])
	let c = parseInt(random(palette.length))
	if (c === randomBgColor) {
		c = (c+4) % palette.length
	}
	this.color = palette[c]
	this.body = Bodies.circle( x, y, this.size, {
			restitution: 1.1,
			frictionAir: 0,
			frictionStatic: 0,
			friction: 0,
			slop: 0,
			density: 0.1
		}
	)
	World.add(world, this.body)

	this.show = function() {
		this.sprite = lerp(
			this.sprite,
			max(min(this.body.velocity.y*3, 30), -30),
			0.08
		)
		this.face = lerp(
			this.face,
			this.sprite,
			0.08
		)
		Body.setAngularVelocity(this.body, 0)
		Body.setVelocity(this.body, {
			x: min(this.body.velocity.x, 20),
			y: min(this.body.velocity.y, 20)
		})
		push()
		ellipseMode(CENTER)
		stroke(this.color)
		fill(this.color)
		translate(this.body.position.x, this.body.position.y)
		ellipse(
			0, 0,
			(this.size*2) + this.sprite,
			(this.size*2)
		)
		push() // face
		translate(-this.body.velocity.x/2, this.face*2)
		// Black part of the eyes
		fill(0)
		ellipse(
			-this.size/5, -this.size/4,
			this.size/6, this.size/6
		)
		ellipse(
			this.size/5, -this.size/4,
			this.size/6, this.size/6
		)
		// Eye cover
		fill(this.color)
		ellipse(
			(-this.size/5),
			(-this.size/4)+10+(this.sprite/5),
			this.size/6, this.size/6
		)
		ellipse(
			(this.size/5),
			(-this.size/4)+10+(this.sprite/5),
			this.size/6, this.size/6
		)
		// Mouth
		stroke(0)
		fill(0)
		strokeWeight(2)
		if (this.mood == 'scared') {
			arc(
				0, (this.size/8) + (this.sprite/5),
				(this.size/2)-this.sprite, (this.size/4) - this.sprite,
				PI, TWO_PI
			)
			arc(
				0, (this.size/8) + (this.sprite/5),
				(this.size/2)-this.sprite, this.sprite/2,
				0, PI)
		} else {
			arc(
				0, (this.sprite/2),
				(this.size/2)-this.sprite, (this.size/4) - this.sprite,
				0, PI
			)
			arc(
				0, (this.sprite/2),
				(this.size/2)-this.sprite, this.sprite/2,
				PI, TWO_PI)
		}

		pop() // face
		pop() // ball
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight)

	// Engine and world setup
	engine = Engine.create()
	world = engine.world
	world.gravity.y = 2
	ground = Bodies.rectangle(
		width/2, height,
		width, 100,
		{ isStatic: true, restitution: 1 }
	)
	World.add(world, ground)
	// walls
	World.add(world, Bodies.rectangle(
		0, height/2, 10, height, { isStatic: true }
	))
	World.add(world, Bodies.rectangle(
		width, height/2, 10, height, { isStatic: true }
	))
	Engine.run(engine)

	// Get randomy color palette
	randomColor = parseInt(random(palette.length))
	randomBgColor = (randomColor+3) % palette.length
	randomGroundColor = (randomColor+6) % palette.length

	// Add bouncing ball
	const body = new Ball(width/2, height/6, 120)
	body.color = palette[randomColor]
	bodies.push(body)
}

function draw() {
	background(palette[randomBgColor])
	bodies.forEach(body => body.show())
	stroke(palette[randomGroundColor])
	fill(palette[randomGroundColor])
	rectMode(CENTER)
	rect(
		ground.position.x, ground.position.y,
		width, 180
	)
}

function mouseClicked() {
	bodies.push(new Ball(mouseX, mouseY, random(60, 140)))
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}
