const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies
const Body = Matter.Body
const Composites = Matter.Composites
const Composite = Matter.Composite
const Constraint = Matter.Constraint
let engine, world, body, bodies = [], ground, randomColor
let palette = [
	'#f5e4d7', // bright yellow
	'#edd4c2', // dark yellow
	'#fc6e5b', // bright red
	'#e85d4a', // dark red
	'#80d2f2', // bright blue
	'#52b6de', // regular blue
	'#828dab', // light gray
	// '#6e778f', // dark grey
	// '#4b5161' // black
]

let bodyAMaxYVel, bodyAMinYVel
let bodyBMaxYVel, bodyBMinYVel
let stiffness, gravity
let layout, column1, column2, canvas, toggleSkeleton
let face = 0

function appendControl(label, control) {
	p = createP(label)
	p.parent(column2)
	control.parent(column2)
}

function setup() {
	canvas = createCanvas(windowWidth*0.75, windowHeight)
	layout = createDiv()
	layout.style('display', 'flex')
	layout.style('flex-direction', 'row')
	column1 = createDiv()
	column2 = createDiv()
	column1.parent(layout)
	column2.parent(layout)
	canvas.parent(column1)
	canvas.parent(column1)

	bodyAMaxYVel = createSlider(0, 50, 30, 1)
	appendControl('Top body Max downwards speed', bodyAMaxYVel)
	bodyAMinYVel = createSlider(0, 50, 25, 1)
	appendControl('Top body Max upwards speed', bodyAMinYVel)
	bodyBMaxYVel = createSlider(0, 50, 25, 1)
	appendControl('Bottom Max downwards speed', bodyBMaxYVel)
	bodyBMinYVel = createSlider(0, 50, 30, 1)
	appendControl('Bottom Max upwards speed', bodyBMinYVel)
	stiffness = createSlider(0, 0.2, 0.01, 0.001)
	appendControl('Spring stiffness', stiffness)
	gravity = createSlider(0.1, 4, 3, 0.1)
	appendControl('Gravity', gravity)
	toggleSkeleton = createInput(false, 'checkbox')
	appendControl('Show skeleton', toggleSkeleton)


	// Engine and world setup
	engine = Engine.create()
	world = engine.world
	world.gravity.y = 1
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
	randomBgColor = (randomColor+2) % palette.length
	randomGroundColor = (randomColor+3) % palette.length

	const bodyAOptions = {
		restitution: 1.5,
		frictionAir: 0,
		frictionStatic: 0,
		friction: 0,
		slop: 0,
		density: 10
	}
	const bodyBOptions = {
		restitution: 1,
		frictionAir: 0,
		frictionStatic: 0,
		friction: 0,
		slop: 0,
		density: 10
	}

	xx = width/2; yy = 10; particleRadius = 40;
	body1 = Bodies.circle(
		xx, yy, particleRadius, bodyAOptions
	)
	body2 = Bodies.circle(
		xx, yy+(particleRadius*4), particleRadius, bodyBOptions
	)
	const constraintOptions = {
		bodyA: body1,
		bodyB: body2,
		damping: 0,
		stiffness: 0.01
	}
	spring = Constraint.create(constraintOptions)
	World.add(world, body1)
	World.add(world, body2)
	World.add(world, spring)
}

let body2, spring

function draw() {
	background(palette[randomBgColor])

	Body.setPosition(body1, { x: width/2, y: body1.position.y })
	Body.setPosition(body2, { x: width/2, y: max(body2.position.y, body1.position.y) })
	Body.setVelocity(body1, {
		x: body1.velocity.x, y: constrain(body1.velocity.y, -bodyAMinYVel.value(), bodyAMaxYVel.value())
	})
	Body.setVelocity(body2, {
		x: body1.velocity.x, y: constrain(body1.velocity.y, -bodyBMinYVel.value(), bodyBMaxYVel.value())
	})
	spring.stiffness = stiffness.value()
	world.gravity.y = gravity.value()

	fill(palette[randomColor])
	stroke(palette[randomColor])
	let s = body2.position.y - body1.position.y + particleRadius + body1.velocity.y
	ellipse(
		body1.position.x, body1.position.y+(s/2),
		map(s, 0, 200, particleRadius*10, particleRadius+s),
		particleRadius+s*1.2
	)

	face = lerp(face, body1.position.y + (s), 0.1)
	push() // face
	translate(
		body1.position.x,
		body1.position.y + (face - body1.position.y)/3
	)
	translate(-body1.velocity.x/2, 0)
	// Black part of the eyes
	fill(0)
	ellipse(
		-particleRadius/5, -particleRadius/2,
		particleRadius/4, particleRadius/4
	)
	ellipse(
		particleRadius/5, -particleRadius/2,
		particleRadius/4, particleRadius/4
	)
	// Mouth
	stroke(0)
	fill(0)
	strokeWeight(2)
	arc(
		0, 0,
		(particleRadius/4) + s/4, (particleRadius/8) + s/4,
		0, PI
	)
	arc(
		0, 0,
		(particleRadius/4) + s/4, s/10,
		PI, TWO_PI)
	pop() // face

	stroke(palette[randomGroundColor])
	fill(palette[randomGroundColor])
	rectMode(CENTER)
	rect(
		ground.position.x, ground.position.y,
		width, 100
	)

	if (toggleSkeleton.elt.checked) {
		drawSkeleton()
	}
}

// function mouseClicked() {
// 	bodies.push(new Ball(mouseX, mouseY, random(60, 100)))
// }

function drawSkeleton() {
	push()
	fill(0, 10)
	stroke(0, 10)
	ellipseMode(CENTER)
	translate(body1.position.x, body1.position.y)
	ellipse(
			0, 0, particleRadius*2, particleRadius*2
		)
	pop()
	push()
	fill(0, 10)
	stroke(0, 10)
	ellipseMode(CENTER)
	translate(body2.position.x, body2.position.y)
	ellipse(
		0, 0, particleRadius*2, particleRadius*2
	)
	pop()
	push()
	fill(0, 10)
	stroke(0, 10)
	line(
		spring.bodyA.position.x, spring.bodyA.position.y,
		spring.bodyB.position.x, spring.bodyB.position.y
	)
	pop()
}

function windowResized() {
	resizeCanvas(windowWidth*0.75, windowHeight)
}
