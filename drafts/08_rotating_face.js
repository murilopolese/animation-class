let canvas
let ball, eyeLeft, eyeRight, mouth
let mask

const animationLength = 60

function setup() {
	createCanvas(windowWidth, windowHeight)
	mask = createGraphics(width, height)
	frameRate(30)

	ball = new Ball({
		x: width/2, y: height/2,
		width: height/2, height: height/2,
		color: '#e85d4a'
	})
	eyeLeft = new Ball({
		x: ball.pos.x-ball.size.x*0.2, y: ball.pos.y,
		width: ball.size.x/10, height: ball.size.y/10,
		color: '#000000'
	})
	eyeRight = new Ball({
		x: ball.pos.x+ball.size.x*0.2, y: ball.pos.y,
		width: ball.size.x/10, height: ball.size.y/10,
		color: '#000000'
	})
	mouth = new Ball({
		x: ball.pos.x-ball.size.x*0, y: ball.pos.y-20,
		width: ball.size.x/5, height: ball.size.y/5,
		color: '#000000'
	})

	ball.timelines.y.addKeyFrame(0, new KeyFrame({
		value: (height/2),
		handles: [0, 20]
	}))
	ball.timelines.y.addKeyFrame(30, new KeyFrame({
		value: (height/2)+20
	}))
	ball.timelines.y.addKeyFrame(0, new KeyFrame({
		value: (height/2),
		handles: [20, 0]
	}))

	ball.timelines.height.addKeyFrame(0, new KeyFrame({
		value: (height/2),
		handles: [0, -20]
	}))
	ball.timelines.height.addKeyFrame(30, new KeyFrame({
		value: (height/2)-20
	}))
	ball.timelines.height.addKeyFrame(60, new KeyFrame({
		value: (height/2),
		handles: [0, -20]
	}))

	ball.timelines.width.addKeyFrame(0, new KeyFrame({
		value: (height/2),
		handles: [0, 20]
	}))
	ball.timelines.width.addKeyFrame(30, new KeyFrame({
		value: (height/2)+20
	}))
	ball.timelines.width.addKeyFrame(60, new KeyFrame({
		value: (height/2),
		handles: [0, -20]
	}))

	mouth.timelines.x.addKeyFrame(0, new KeyFrame({
		value: ball.pos.x-ball.size.x*0.65,
		handles: [0, 125]
	}))
	mouth.timelines.x.addKeyFrame(30, new KeyFrame({
		value: ball.pos.x,
		handles: [-25, 25]
	}))
	mouth.timelines.x.addKeyFrame(60, new KeyFrame({
		value: ball.pos.x+ball.size.x*0.65,
		handles: [-125, 0]
	}))

	mouth.timelines.y.addKeyFrame(0, new KeyFrame({
		value: mouth.pos.y,
		handles: [0, 120]
	}))
	mouth.timelines.y.addKeyFrame(30, new KeyFrame({
		value: mouth.pos.y+120,
		handles: [0, 0]
	}))
	mouth.timelines.y.addKeyFrame(60, new KeyFrame({
		value: mouth.pos.y,
		handles: [120, 0]
	}))

	mouth.timelines.height.addKeyFrame(0, new KeyFrame({
		value: (mouth.size.y),
		handles: [0, 10]
	}))
	mouth.timelines.height.addKeyFrame(30, new KeyFrame({
		value: (mouth.size.y)
	}))
	mouth.timelines.height.addKeyFrame(60, new KeyFrame({
		value: (mouth.size.y),
		handles: [20, 0]
	}))

	// mouth.timelines.width.addKeyFrame(30, new KeyFrame({
	// 	value: (mouth.size.y*1.3)
	// }))
}

function draw() {
	background('#f5e4d7')
	ball.update()
	ball.draw()
	eyeLeft.draw()
	eyeRight.draw()
	mouth.update()
	mouth.draw()

	mask.push()
  mask.translate(ball.pos.x, ball.pos.y)
  mask.background('#f5e4d7')
  mask.erase()
  mask.noStroke()
  mask.ellipse(0, 0, ball.size.x, ball.size.y)
  mask.noErase()
  mask.pop()
	image(mask, 0, 0)

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}
