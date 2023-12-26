const generate_circle = (canvas) => {
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

 // Function to generate a random number within a range
 const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generate_rectangle = (canvas) => {
	const ctx = canvas.getContext('2d');
	const x = getRandomNumber(0, canvas.width - 50);
	const y = getRandomNumber(0, canvas.height - 50);
	// Draw a rectangle
	ctx.fillStyle = 'blue'; // Set the fill color
	ctx.fillRect(x, y, 20, 10);
};

export { generate_circle, generate_rectangle };