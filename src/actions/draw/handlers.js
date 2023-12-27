import { draw_existing_shapes } from "./core.js";
import {v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@9.0.1/+esm';

const generate_circle = (state) => {
	var ctx = state.canvas.getContext('2d');
	var x = Math.floor(Math.random() * (canvas.width-60));
	var y = Math.floor(Math.random() * (canvas.height-30));
	var radius = Math.floor(1 * (50)) + 10;
	var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const circle = new Quadtree.Circle({ 
		x: x, 
		y: y, 
		r: radius,
		data: {
			color: color,
			created: (new Date().getTime()),
			id: uuidv4()
		}
	});
	
	state.existing_shapes.set(circle.data.id, circle);
	state.shape_locations.insert(circle);	
	draw_existing_shapes(state.existing_shapes, canvas);
};

 // Function to generate a random number within a range
 const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generate_rectangle = (state) => {
	const canvas = state.canvas;
	var ctx = canvas.getContext('2d');
	var color = '#' + Math.floor(Math.random() * 16777215).toString(16);

	const rect = new Quadtree.Rectangle({
		x: Math.random() * (canvas.width-60),
		y: Math.random() * (canvas.height-30),
		width: Math.floor(1 * 50) + 10,
		height: Math.floor(1 * 50) + 10,
		data: {
				color: color,
				created: (new Date().getTime()),
				id: uuidv4()
		},
});
state.existing_shapes.set(rect.data.id, rect);
state.shape_locations.insert(rect);
draw_existing_shapes(state.existing_shapes, canvas);
};

const generate = {
	"circle": generate_circle,
	"rectangle": generate_rectangle,
};

export { generate };