let canvas
let face_size, face_pos, left_eye, right_reye, mouth

function setup() {
	canvas = createCanvas(windowWidth, windowHeight)
	face_size = createVector(width/2, height/2)
	face_pos = createVector(width/2, height/2)
	left_eye = createVector(-width/3, -height/8)
	right_eye = createVector(width/3, -height/8)
	mouth = createVector(0, 0)
}

function draw() {
	let ratio = width / height
	let eye_size = constrain(width/10, 20, 50)
	face_size.x = lerp(face_size.x, width*0.8, .2)
	face_size.y = lerp(face_size.y, height*0.8, .2)
	face_pos.x = lerp(face_pos.x, width/2, .2)
	face_pos.y = lerp(face_pos.y, height/2, .2)
	mouth.y = lerp(mouth.y, -height*ratio*0.01, .2)
	left_eye.x = lerp(
		left_eye.x,
		constrain((-width/3)*ratio*0.4, -width*0.4, width*0.4),
		0.1
	)
	left_eye.y = lerp(
		left_eye.y,
		constrain((-height/4)*ratio*0.4, -height*0.4, height*0.4),
		0.1
	)
	right_eye.x = lerp(
		right_eye.x,
		constrain((width/3)*ratio*0.4, -width*0.4, width*0.4),
		0.1
	)
	right_eye.y = lerp(
		right_eye.y,
		constrain((-height/4)*ratio*0.4, -height*0.4, height*0.4),
		0.1
	)

	background('#f5e4d7')

	push('face')

	translate(face_pos.x, face_pos.y)
	noStroke()
	fill('#e85d4a')
	ellipse(0, 0, face_size.x, face_size.y)
	stroke('#e85d4a')
	strokeWeight(eye_size)
	line(0, 0, left_eye.x, left_eye.y)
	line(0, 0, right_eye.x, right_eye.y)

	fill(0, 200)
	noStroke()
	ellipse( left_eye.x, left_eye.y, eye_size, eye_size )
	ellipse( right_eye.x, right_eye.y, eye_size, eye_size )

	push('mouth')
	translate(0, mouth.y)
	bezier(
		-width*0.3, height/32,
		-width*0.3, height/2,
		width*0.3, height/2,
		width*0.3, height/32,
	)
	pop('mouth')

	pop('face')

	push('text')
	fill(255, constrain(255-frameCount, 0, 255))
	textSize(24)
	textAlign(CENTER)
	text('resize my face', width/2, height/2)
	pop('text')
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}
