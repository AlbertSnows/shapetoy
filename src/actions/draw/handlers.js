import { generate_commands, generate_types } from "../define/core.js";
import { draw_existing_shapes } from "./core.js";

const add_shape = state => shape => {
	state = generate_commands["generate"](state)(shape);
	draw_existing_shapes(state.canvas)("fill")(state.existing_shapes);
	return state;
};
const make_shape = type => generate_types[type]();
export { add_shape, make_shape };