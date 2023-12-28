// bonus: do group update so we don't clear the board each time
import { CIRCLE, RECTANGLE } from "../../utility/constants.js";
import { generate_commands } from "../define/core.js";
import { draw_existing_shapes, draw_existing_shape } from "./core.js";

const highlight_shape = 
	state => shape => draw_existing_shape(state.canvas)("highlight")(shape);
const unhighlight_shape = state => closest_shape => {
	return draw_existing_shape(state.canvas)("unhighlight")(closest_shape);
};
	const unhighlight_shapes = 
	state => shapes_to_unhighlight => shapes_to_unhighlight.forEach(
		(v, k) => draw_existing_shape(state.canvas)("unhighlight")(v));

export { highlight_shape, unhighlight_shapes, unhighlight_shape };