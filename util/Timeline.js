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
			previousFrame.handles[1],

			nextFrame.value +
			nextFrame.handles[0],

			nextFrame.value,

			t
		)
	}
}
