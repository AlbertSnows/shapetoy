const generateCircle = (canvas) => {
	// Get the canvas element
	var ctx = canvas.getContext('2d');

	// Generate a random position for the circle
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);

	// Generate a random radius for the circle (between 10 and 50)
	var radius = Math.floor(Math.random() * (50 - 10 + 1)) + 10;

	// Set a random color for the circle
	var color = '#' + Math.floor(Math.random() * 16777215).toString(16);

	// Draw the circle
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
};

const generateRectangle = (canvas) => {
	console.log("I don't do a whole lot right now...");
};