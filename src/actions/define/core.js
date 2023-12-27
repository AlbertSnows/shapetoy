import {v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@9.0.1/+esm';
import { CIRCLE, RECTANGLE } from '../../utility/constants.js';
const generate_circle = () => {
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

const generate_rectangle = () => {
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

const generate_types = {
	[CIRCLE]: generate_circle,
	[RECTANGLE]: generate_rectangle,
};

const add_shape = state => shape => {
	state.existing_shapes.set(shape.data.id, shape);
	state.shape_locations.insert(shape);	
	return state;
};
const remove_shape = state => shape => {
	state.shape_locations.remove(shape);
	state.existing_shapes.delete(shape.data.id);
	return state;
};
const readd_shape = state => shape => add_shape(remove_shape(state, shape), shape);

const generate_commands = {
	"generate": add_shape,
	"regenerate": readd_shape
};

export { generate_commands, generate_types };