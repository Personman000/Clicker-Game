//-- INITIALIZE
window.onload = init;
window.onresize = resize;


dot_objects = [];

timestamp = null;
lasttimestampt = null;
delta_time = null;

loop(0);

function loop(timestamp){
	// Set time vars if null
	if(timestamp == null){
		timestamp = 0;
	}
	if(lasttimestampt == null){
		lasttimestampt = 0;
	}

	// Set time vars for current frame
	delta_time = lasttimestampt - timestamp;
	lasttimestampt = timestamp;

	// Update positions of all dots
	for(let dot_object of dot_objects){
		if(pause){
			delta_time = 0;
		}
		dot_object.update(delta_time);
	}

	// Loop
	window.requestAnimationFrame(loop);
}

function init(){
	// Get main dot
	main_dot = document.getElementById("main_dot");
	dots = document.getElementsByClassName("dot");

	// Add spawn functionality
	main_dot.onclick = spawndot;

	// Add orbit toggle functionality
	document.getElementById("toggle_orbits_button").addEventListener("click", toggleorbits);

	// Add pause functionality
	document.getElementById("pause_button").addEventListener("click", togglepause);

	resize();
}

function resize(){
	get_dimensions();
	movedots();
}

//-- MAIN FUNCTIONS
// Move dots to center
// TODO: Store the distance of each dot so that they maintain those positions upon resizing
function movedots(){
	var i = 0;
	center = main_dot.getBBox();

	// Take all the sub dots and reposition them according to main dot position
	for (let dot_object of dot_objects)
	{
		dot_object.centerY = center.y + center.height/2
		dot_object.centerX = center.x + center.width/2
	}
};

dot_min_size = 1;
i = 0;
// Spawn a dot in a random radius, color, and size
function spawndot(){
	// Set new dot variables
	var dot_max_size = this.getBBox().width/4;
	var size = getRndInteger(dot_min_size, dot_max_size);
	
	var color = getRandomColor();

	var min_distance = this.getBBox().width/1.5;
	var max_distance = this.getBBox().width*3;
	var distance = getRndInteger(min_distance, max_distance);

	var offset = getRndNumber(-Math.PI, Math.PI);
	
	var speed = 0;
	while(speed == 0){
		speed = getRndNumber(0.0001, 0.0015);
		if(getRndInteger(0, 1) == 0){
			speed = -speed;
		}
	}

	// Create new dot
	var new_dot = new dot(size, color, distance, offset, speed, this);
	new_dot.build(document.getElementById("svg"));

	// Give dot spawning rights if big enough
	if(size > dot_min_size){
		new_dot.element.onclick = spawndot;
	}

	dot_objects[i]=new_dot;
	i++;

	console.log(new_dot);
}

//-- SECONDARY FUNCTIONS
function toggleorbits(){
	white_block = document.getElementById("white_block");

	if(white_block.style.opacity == 0){
		white_block.style.opacity = 1;
	}else{
		white_block.style.opacity = 0;	
	}
}

pause = false;
function togglepause(){
	pause = !pause;
}

//-- UTILITY FUNCTIONS
function get_dimensions(){
	vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
	vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRndNumber(min, max){
	return Math.random() * (max - min) + min ;
}

function getOrbitPos(x_pos, rad)
{
	return Math.sqrt(rad^2 - x_pos^2);
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}