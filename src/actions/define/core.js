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

const generate_types = {
	CIRCLE: generate_circle,
	RECTANGLE: generate_rectangle,
};

const generate_shape = state => type => {
	const canvas = state.canvas;
	const ctx = canvas.getContext('2d');
	const shape = generate_types[type](ctx);
	state.existing_shapes.set(shape.data.id, shape);
	state.shape_locations.insert(shape);	
	return state;
};
const remove_shape = state => {
	state.shape_locations.remove(shape);
	state.existing_shapes.delete(shape.data.id);
	return state;
};
const regenerate_shape = 
	state => type => shape => generate_shape(remove_shape(state, shape), type);



const generate_commands = {
	"generate": generate_shape,
	"regenerate": regenerate_shape
};

export { generate_commands };