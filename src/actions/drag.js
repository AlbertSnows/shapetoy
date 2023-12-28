import { first } from "../utility/core.js";
import { draw_existing_shapes } from "./draw/core.js";
import { generate_commands } from "./define/core.js"; 
import { CIRCLE, RECTANGLE } from "../utility/constants.js";

const move_circle = circle => e => canvas => {
	circle.x = event.clientX - canvas.getBoundingClientRect().left;
	circle.y = event.clientY - canvas.getBoundingClientRect().top;
	return circle;
};

const move_rectangle = rect => e => canvas => {
	rect.x = e.clientX - canvas.getBoundingClientRect().left - rect.width / 2;
	rect.y = e.clientY - canvas.getBoundingClientRect().top - rect.height / 2;
	return rect;
};

const move_options = {
	[CIRCLE]: move_circle,
	[RECTANGLE]: move_rectangle
};

const move_shape = e => state => shape => {
	const canvas = state.canvas;
	const type = shape.width ? RECTANGLE : CIRCLE;
	const moved_shape = move_options[type](shape)(e)(canvas);
	state = generate_commands["regenerate"](state)(moved_shape);
	state.selected_shapes.set(moved_shape.data.id, moved_shape);
	return state;
};

const redraw_shapes = e => state => shape => {
	const canvas = state.canvas;
	state = move_shape(e)(state)(shape);
};

export { move_shape };