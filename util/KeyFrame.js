function KeyFrame({value, handles=[]}) {
	this.value = value
	this.handles = []
	this.handles[0] = handles[0] || 0 // intensity to previous keyframe
	this.handles[1] = handles[1] || 0 // intensity to next keyframe
}
