//-- INITIALIZE
window.onload = init;
window.onresize = resize;


dot_objects = [];
dot_max_size = 50;
dot_min_size = 1;

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
		dot_object.update(delta_time);
	}

	// Loop
	window.requestAnimationFrame(loop);
}

function init(){
	// Get main dot
	main_dot = document.getElementById("main_dot");
	dots = document.getElementsByClassName("dot");

	// Add commands
	main_dot.onclick = spawndot;

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
	floating_div = document.getElementById("floating_div").getBoundingClientRect();

	// Take all the sub dots and reposition them according to main dot position
	for (let dot_object of dot_objects)
	{
		dot_object.centerY = floating_div.top;
		dot_object.centerX = floating_div.left;
	}
};

i = 0;
// Spawn a dot in a random radius, color, and size
function spawndot(){
	// Set new dot variables
	var size = getRndInteger(dot_min_size, dot_max_size);
	var color = getRandomColor();

	var min_distance = main_dot.getBBox().width/1.5;
	var max_distance = Math.min(vw, vh)/1.5 - size;
	var distance = getRndInteger(min_distance, max_distance);

	var offset = getRndNumber(-Math.PI, Math.PI);
	
	var speed = getRndNumber(-0.001, 0.001);
	while (speed == 0){
		var speed = getRndNumber(-0.001, 0.001);
	}

	// Create new dot
	var new_dot = new dot(size, color, distance, offset, speed, floating_div.left, floating_div.top, main_dot);
	document.getElementById("svg").appendChild(new_dot.build());

	console.log(new_dot);
	dot_objects[i]=new_dot;
	i++;
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