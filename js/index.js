//-- INITIALIZE
window.onload = init;
window.onresize = resize;

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

	// Get new center for main dot
	var main_dot_new_top = (floating_div.top-(main_dot.offsetHeight/2));
	var main_dot_new_left = (floating_div.left-(main_dot.offsetWidth/2));
	
	// Take all the sub dots and reposition them according to main dot position
	for (let dot of dots)
	{
		dot.style.top = (parseFloat(dot.style.top) - parseFloat(main_dot.style.top) + main_dot_new_top) + "px";		// Current position - old main_dot position + new main_dot position
		dot.style.left = (parseFloat(dot.style.left) - parseFloat(main_dot.style.left) + main_dot_new_left) + "px";	// Current position - old main_dot position + new main_dot position
	}

	main_dot.style.top = main_dot_new_top + "px";
	main_dot.style.left = main_dot_new_left + "px";
};


dot_objects = [];
dot_max_size = 10;
i = 0;
// Spawn a dot in a random radius, color, and size
function spawndot(){
	
	// Create new dot
	var new_dot = document.createElement("div")
	new_dot.className = "dot";
	new_dot.id = i;

	// Set size
	var size = getRndInteger(1, dot_max_size);
	new_dot.style.height = size + "vh";
	new_dot.style.width = size + "vh";

	// Set color
	new_dot.style.backgroundColor = getRandomColor();

	// Set position
	min_distance = main_dot.offsetWidth/2 + dot_max_size + size*Math.min(vw, vh)*0.01;	// Width of main dot + possible size of dot + offset of dot
	max_distance = Math.min(vw, vh)/2 - size*Math.min(vw, vh)*0.01;						// Width of viewport - possible size of dot

	var distance = getRndInteger(min_distance, max_distance);
	var offset = getRndNumber(-3.2, 3.2);


	//console.log(offset, distance, size);
	console.log(new_dot.style.top, new_dot.style.left, new_dot.offsetHeight)

	var final_top = (floating_div.top + Math.sin(offset) * distance - 30);
	var final_left = (floating_div.left + Math.cos(offset) * distance - 30);

	new_dot.style.top = final_top + "px";
	new_dot.style.left = final_left + "px";

	// Display new dot
	document.body.appendChild(new_dot);

	// Slide dor from center to orbit
	new_dot.animate(
		[
			{ // from
				top: floating_div.top - 15 + "px",
				left: floating_div.left - 15 + "px",
				opacity: 0
			},
			{ // to
				top: final_top + "px",
				left: final_left + "px",
				opacity: 1
			}
		],
		{ // timing options
			duration: 1000,
			easing: "ease-out"
		}
	);
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