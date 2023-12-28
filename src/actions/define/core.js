import {v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@9.0.1/+esm';
import { CIRCLE, RECTANGLE } from '../../utility/constants.js';
const generate_circle = () => {
	const rx_value = Math.random();
	const ry_value = Math.random();
	const x = Math.max(40, Math.min(250, Math.floor(rx_value * (canvas.width))));
	const y = Math.max(40, Math.min(105, Math.floor(ry_value * (canvas.height))));
	const radius = Math.floor(0.5 * (50)) + 10;
	const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
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
	const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const rx_value = Math.random();
	const ry_value = Math.random();
	const x = Math.max(20, Math.min(225, Math.floor(rx_value * (canvas.width))));
	const y = Math.max(20, Math.min(80, Math.floor(ry_value * (canvas.height))));
	const rect = new Quadtree.Rectangle({
		x: x,
		y: y,
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