// bonus: do group update so we don't clear the board each time
import { CIRCLE, RECTANGLE } from "../../utility/constants.js";
import { generate_commands } from "../define/core.js";
const change_shape = state => command => shape => {
	const type = shape.width ? RECTANGLE : CIRCLE;
	state = generate_commands("regenerate")(state)(type)(shape);
	draw_existing_shapes(state.canvas)(command)(state.existing_shapes);
	return state;
};

const highlight_shape = state => shape => {
	
};
const unhighlight_shapes = state => change_shape(state)("fill");

export { highlight_shapes, unhighlight_shapes };