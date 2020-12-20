class dot{
	constructor(size, color, distance, offset, speed, centerX, centerY){
		this.size = size;
		this.color = color;
		this.distance = distance;
		this.offset = offset;
		this.speed = speed;
		this.centerX = centerX;
		this.centerY = centerY;
		this.element = null;
	}

	build(){
		var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

		dot.style.r = this.size;
		dot.style.fill = this.color;

		dot.style.cy = this.centerY;
		dot.style.cx = this.centerX;

		dot.setAttribute('class', "dot");

		this.element = dot;
		
		return dot;
	}

	update(deltaTime){
		this.offset += deltaTime * this.speed;
		this.updateOrbitPos();
	}

	updateOrbitPos(){
		this.element.style.cy = this.getOrbitY();
		this.element.style.cx = this.getOrbitX();
	}

	getOrbitY(){
		return (this.centerY + Math.sin(this.offset) * this.distance);
	}

	getOrbitX(){
		return (this.centerX + Math.cos(this.offset) * this.distance);
	}
}