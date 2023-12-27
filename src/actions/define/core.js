// import { draw_existing_shapes } from "../draw/core.js";
import {v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@9.0.1/+esm';

const generate_circle = (ctx) => {
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
	return circle;
};



const generate_rectangle = (ctx) => {
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
	return rect;
};

const generate = {
	"circle": generate_circle,
	"rectangle": generate_rectangle,
};

const generate = state => {
	const canvas = state.canvas;
	const ctx = canvas.getContext('2d');
	const shape = generate[type](ctx);
	state.existing_shapes.set(shape.data.id, shape);
	state.shape_locations.insert(shape);	
	return state;
};
const regenerate = state => shape => {
	const canvas = state.canvas;
	const ctx = canvas.getContext('2d');
	state.shape_locations.remove(shape);
	state.existing_shapes.delete(shape.data.id);
	const regenerated_shape = generate[type](ctx);
	state.existing_shapes.set(regenerated_shape.data.id, regenerated_shape);
	state.shape_locations.insert(regenerated_shape);	
	return state;

};

const generate_highlighted_shape = () => {

};

const generate_unhighlighted_shape = () => {

};

const generate_commands = {
	// "highlight" => generate_highlighted_shape,
	// "unhighlight" => generate_unhighlighted_shape,
};

const regenerate_commands = {

};

export { generate, generate_commands };