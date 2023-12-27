import { generate_commands } from "../define/core.js";
import { draw_existing_shapes } from "./core.js";
const add_shape = state => type => {
	state = generate_commands["generate"](state)(type);
	draw_existing_shapes(state.canvas)("fill")(state.existing_shapes);
	return state;
};

export { add_shape };