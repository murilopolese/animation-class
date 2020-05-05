function Ball({x, y, width, height, color=255, loopSize=60}) {
	this.loopSize = loopSize
	this.timelines = {
		x: new Timeline(this.loopSize),
		y: new Timeline(this.loopSize),
		width: new Timeline(this.loopSize),
		height: new Timeline(this.loopSize),
		color: new Timeline(this.loopSize)
	}
	this.pos = createVector(x, y)
	this.size = createVector(width, height)
	this.color = color
	this.timelines.x.addKeyFrame(0, new KeyFrame({ value: this.pos.x }))
	this.timelines.y.addKeyFrame(0, new KeyFrame({ value: this.pos.y }))
	this.timelines.width.addKeyFrame(0, new KeyFrame({ value: this.size.x }))
	this.timelines.height.addKeyFrame(0, new KeyFrame({ value: this.size.y }))
	this.timelines.x.addKeyFrame(loopSize, new KeyFrame({ value: this.pos.x }))
	this.timelines.y.addKeyFrame(loopSize, new KeyFrame({ value: this.pos.y }))
	this.timelines.width.addKeyFrame(loopSize, new KeyFrame({ value: this.size.x }))
	this.timelines.height.addKeyFrame(loopSize, new KeyFrame({ value: this.size.y }))

	this.update = function() {
		let frame = frameCount%this.loopSize
		this.pos.x = this.timelines.x.getValue(frame)
		this.pos.y = this.timelines.y.getValue(frame)
		this.size.x = this.timelines.width.getValue(frame)
		this.size.y = this.timelines.height.getValue(frame)
	}
	this.draw = function() {
		push()
		noStroke()
		fill(this.color)
		ellipse(this.pos.x, this.pos.y, this.size.x, this.size.y)
		pop()
	}
}
