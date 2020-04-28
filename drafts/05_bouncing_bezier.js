let body
let pointA, pointB, supportA, supportB
let phase = 0, phaseVel = 0
let ballPos, facePos, v
let shape = { x: 200, y: 200 }

function setup() {
	createCanvas(windowWidth, windowHeight)
	angleMode(DEGREES)
	pointA = createVector(0, 0)
	pointB = createVector(width, height)
	supportA = createVector(width, 0)
	supportB = createVector(width, 0)
	ballPos = pointA.copy()
	facePos = pointA.copy()
	ballVel = createVector()
}

function draw() {
	let t = ((millis()/8)) % 360
	let p = abs(sin(t))
	phase = map(p, 0, 1, 1, 0.4)
	background('#f5e4d7')

	let y = bezierPoint(
		pointA.y, supportA.y,
		supportB.y, pointB.y,
		phase
	)
	v = bezierTangent(
		pointA.y, supportA.y,
		supportB.y, pointB.y,
		phase
	)

	ballPos.y =
	constrain(
		map(
			y,
			0, height,
			100, height-80
		),
		0, height-130
	)

	// BALL
	stroke('#e85d4a')
	fill('#e85d4a')
	ellipse(
		width/2, ballPos.y // position
		,
		shape.x
		- map(abs(v), 0, height*2, 0, shape.x*0.2)
		+ map(max(phase, 0.9), 0.9, 1, 0, shape.x*0.8)
		,
		shape.y
		+ map(abs(v), 0, height*2, 0, shape.y*0.2)
		- map(max(phase, 0.9), 0.9, 1, 0, shape.y*0.4)
	)
	// FACE
	stroke(0)
	fill(0)
	push()
	let eyeSize = shape.x/10
	let newFacePos = facePos.copy()
	newFacePos.y = lerp(
		facePos.y, ballPos.y, 0.15
	)
	let d = p5.Vector.sub(newFacePos, ballPos)
	d.limit(50)
	facePos.y = ballPos.y + d.y
	ellipse( // Left eye
		width/2 - (shape.x/10),
		facePos.y - (shape.x/6),
		eyeSize, eyeSize
	)
	ellipse( // Left eye
		width/2 + (shape.x/10),
		facePos.y - (shape.x/6),
		eyeSize, eyeSize
	)
	stroke('#e85d4a')
	fill('#e85d4a')
	ellipse( // Left eye
		width/2 - (shape.x/10),
		facePos.y - (shape.x/6) + map((phase+0.5), 0, 1.5, 0, eyeSize),
		eyeSize, eyeSize
	)
	ellipse( // Left eye
		width/2 + (shape.x/10),
		facePos.y - (shape.x/6) + map((phase+0.5), 0, 1.5, 0, eyeSize),
		eyeSize, eyeSize
	)
	// MOUTH
	stroke(0)
	fill(0)
	arc( // bottom lip
		width/2,
		facePos.y,
		(shape.x/2) - map((phase), 0, 1, 0, shape.x/3),
		(shape.y/2) - map((phase), 0, 1, 0, shape.y/3),
		0, 180
	)
	arc( // upper lip
		width/2,
		facePos.y,
		(shape.x/2) - map((phase), 0, 1, 0, shape.x/3),
		(shape.y/6) - map((phase), 0, 1, shape.y/6, 0),
		180, 360
	)
	pop()


	stroke('#52b6de')
	fill('#52b6de')
	rect(0, height-100, width, 100)

}

function controls() {
	push()
	noFill()
	stroke(255, 0, 0)
	text(`phase ${phase}`, 0, 20)
	text(parseInt(v), 0, 40)
	bezier(
		pointA.x, pointA.y,
		supportA.x, supportA.y,
		supportB.x, supportB.y,
		pointB.x, pointB.y
	)
	line(
		pointA.x, pointA.y,
		supportA.x, supportA.y
	)
	line(
		pointB.x, pointB.y,
		supportB.x, supportB.y
	)
	pop()

	rect(0, height*0.8, abs(v), 10)
}
