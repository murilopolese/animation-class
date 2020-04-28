function Ball({x, y, width, height, color=255}) {
	this.pos = createVector(x, y)
	this.size = createVector(width, height)
	this.color = color
	this.draw = function() {
		push()
		noStroke()
		fill(this.color)
		ellipse(this.pos.x, this.pos.y, this.size.x, this.size.y)
		pop()
	}
}

function KeyFrame({value, handles=[]}) {
	this.value = value
	this.handles = []
	this.handles[0] = handles[0] || createVector(0, 0) // future
	this.handles[1] = handles[1] || createVector(0, 0) // past
}

function Timeline(size) {
	this.frames = []
	this.size = size
	for (let i = 0; i < this.size; i++) {
		frames[i] = null
	}
	this.addKeyFrame = function(frame, keyFrame) {
		this.frames[frame] = keyFrame
	}
	this.getPreviousKeyFrame = function(frame) {
		let previous = null
		let i
		for (i = frame; i >= 0; i--) {
			let frame = this.frames[i]
			if (frame) {
				previous = frame
				break
			}
		}
		return { index: i, frame: previous }
	}
	this.getNextKeyFrame = function(frame) {
		let next = null
		let i
		for (i = frame+1; i < this.frames.length; i++) {
			let frame = this.frames[i]
			if (frame) {
				next = frame
				break
			}
		}
		return { index: i, frame: next }
	}
	this.getValue = function(frame) {
		let previous = this.getPreviousKeyFrame(frame)
		let next = this.getNextKeyFrame(frame)

		let previousFrame = previous.frame
		let nextFrame = next.frame

		if (!previousFrame) return null
		if (!nextFrame) return previousFrame.value

		let t = map(
			frame,
			previous.index, next.index,
			0, 1
		)

		return bezierPoint(
			previousFrame.value,

			previousFrame.value +
			previousFrame.handles[0].y,

			nextFrame.value +
			nextFrame.handles[1].y,

			nextFrame.value,

			t
		)
	}
}

let ball, positionTimeline, widthTimeline, heightTimeline
let animationLength = 60

function setup() {
	createCanvas(800, 600)
	frameRate(30)
	ball = new Ball({
		x: width/2, y: height-100,
		width: 100, height: 100,
		color: '#e85d4a'
	})

	positionTimeline = new Timeline(animationLength)
	positionTimeline.addKeyFrame(
		0, new KeyFrame({
			value: height,
			handles: [
				createVector(0, -10),
				createVector(0, 0)
			]
		})
	)
	positionTimeline.addKeyFrame(
		30, new KeyFrame({
			value: 0,
			handles: [
				createVector(0, 0),
				createVector(0, height*0.8)
			]
		})
	)
	positionTimeline.addKeyFrame(
		31, new KeyFrame({
			value: 0,
			handles: [
				createVector(0, height*0.8),
				createVector(0, 0)
			]
		})
	)
	positionTimeline.addKeyFrame(
		59, new KeyFrame({
			value: height,
			handles: [
				createVector(0, -10),
				createVector(0, 0)
			]
		})
	)

	widthTimeline = new Timeline(animationLength)
	widthTimeline.addKeyFrame(
		0, new KeyFrame({
			value: 100
		})
	)
	widthTimeline.addKeyFrame(
		28, new KeyFrame({
			value: 80,
			handles: [
				createVector(0, 0),
				createVector(0, 15)
			]
		})
	)
	widthTimeline.addKeyFrame(
		30, new KeyFrame({
			value: 150
		})
	)
	widthTimeline.addKeyFrame(
		32, new KeyFrame({
			value: 80,
			handles: [
				createVector(0, 15),
				createVector(0, 0)
			]
		})
	)
	widthTimeline.addKeyFrame(
		59, new KeyFrame({
			value: 100
		})
	)

	heightTimeline = new Timeline(animationLength)
	heightTimeline.addKeyFrame(
		0, new KeyFrame({
			value: 100
		})
	)
	heightTimeline.addKeyFrame(
		28, new KeyFrame({
			value: 120,
			handles: [
				createVector(0, 0),
				createVector(0, -15)
			]
		})
	)
	heightTimeline.addKeyFrame(
		30, new KeyFrame({
			value: 80
		})
	)
	heightTimeline.addKeyFrame(
		32, new KeyFrame({
			value: 120,
			handles: [
				createVector(0, -15),
				createVector(0, 0)
			]
		})
	)
	heightTimeline.addKeyFrame(
		59, new KeyFrame({
			value: 100
		})
	)

}

function draw() {
	// put origin on bottom left
	scale(1, -1)
	translate(0, -height)

	let frame = floor(frameCount) % animationLength

	let y = positionTimeline.getValue(frame)
	ball.pos.y = map(y, 0, height, 100, height-100)

	let w = widthTimeline.getValue(frame)
	ball.size.x = w

	let h = heightTimeline.getValue(frame)
	ball.size.y = h

	background('#f5e4d7')
	ball.draw()

	push()
	noStroke()
	fill('#52b6de')
	rect(0, 0, width, 100)
	pop()
}
