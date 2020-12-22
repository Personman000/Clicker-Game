class dot{
	constructor(size, color, distance, offset, speed, center){
		this.size = size;
		this.color = color;
		this.distance = distance;
		this.curr_distance = center.getBBox().width/3;
		this.offset = offset;
		this.speed = speed;
		this.center = center;
		this.element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		this.orbit_dot = null;
	}

	build(parent){
		// Create dot
		this.element.style.r = 0;						// Start at 0, grow to max
		this.element.style.fill = this.color;			// Random color

		this.element.setAttribute('class', "dot");		// Set dot class

		parent.appendChild(this.element);				// Add to svg

		// Create orbit
		var orbit_dot = new dot(this.distance, null, 1, 0, 0, this.center);

		orbit_dot.element.style.r = orbit_dot.size;		// Start at max size
		orbit_dot.curr_distance = orbit_dot.distance;	// Start at max distance
		orbit_dot.element.setAttribute('class', "dot");	// Set dot class
		orbit_dot.element.classList.add("orbit");		// Set orbit class (to make outline-only)

		this.orbit_dot = orbit_dot;						// Link current dot to orbit dot
		parent.insertBefore(orbit_dot.element, parent.firstChild);	// Add orbit dot to svg
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

		// Move forward
		this.offset += deltaTime * this.speed;
		// If offset value is too high, reset to keep values low
		if (Math.abs(this.offset) > 10*Math.PI){
			this.offset = -this.offset;
		}

		// Update
		this.updateOrbitPos();

		// Also update orbit dot position
		if(this.orbit_dot){
			this.orbit_dot.update(deltaTime);
		}
	}

	updateOrbitPos(){
		this.element.style.cy = this.getOrbitY();
		this.element.style.cx = this.getOrbitX();
	}

	getOrbitY(){
		return ((this.center.getBBox().y + this.center.getBBox().height/2) + Math.sin(this.offset) * this.curr_distance);
	}

	getOrbitX(){
		return ((this.center.getBBox().x + this.center.getBBox().width/2) + Math.cos(this.offset) * this.curr_distance);
	}
}