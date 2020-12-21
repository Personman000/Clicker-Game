class dot{
	constructor(size, color, distance, offset, speed, centerX, centerY, main_dot){
		this.size = size;
		this.color = color;
		this.distance = distance;
		this.curr_distance = main_dot.getBBox().width/3;
		this.offset = offset;
		this.speed = speed;
		this.centerX = centerX;
		this.centerY = centerY;
		this.main_dot = main_dot;
		this.element = null;
	}

	build(){
		this.element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

		this.element.style.r = 0;//this.size;
		this.element.style.fill = this.color;

		this.element.style.cy = this.centerY;
		this.element.style.cx = this.centerX;

		this.element.setAttribute('class', "dot");

		return this.element;
	}

	update(deltaTime){
		// Grow
		if(parseFloat(this.element.style.r) < this.size){
			this.element.style.r = parseFloat(this.element.style.r) + 1;
		}

		// Move
		if(this.curr_distance < this.distance){
			this.curr_distance += ((this.distance - this.curr_distance)/100);
		}

		this.offset += deltaTime * this.speed;
		if (Math.abs(this.offset) > Math.PI){
			this.offset = -this.offset;
		}

		this.updateOrbitPos();
	}

	updateOrbitPos(){
		this.element.style.cy = this.getOrbitY();
		this.element.style.cx = this.getOrbitX();
	}

	getOrbitY(){
		return (this.centerY + Math.sin(this.offset) * this.curr_distance);
	}

	getOrbitX(){
		return (this.centerX + Math.cos(this.offset) * this.curr_distance);
	}
}