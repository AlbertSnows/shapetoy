import { first } from "../utility/core.js";
import { draw_existing_shapes } from "./draw/core.js";
import { generate_commands } from "./define/core.js"; 
const move_shape = e => state => rect => {
	const canvas = state.canvas;
	rect.x = e.clientX - canvas.getBoundingClientRect().left - rect.width / 2;
	rect.y = e.clientY - canvas.getBoundingClientRect().top - rect.height / 2;
	state = generate_commands["regenerate"](state)(rect);
	state.selected_shapes.set(rect.data.id, rect);
	return state;
};

const redraw_shapes = e => state => shape => {
	const canvas = state.canvas;
	state = move_shape(e)(state)(shape);
};

export { move_shape };