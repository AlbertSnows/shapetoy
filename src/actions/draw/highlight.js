// bonus: do group update so we don't clear the board each time
import { CIRCLE, RECTANGLE } from "../../utility/constants.js";
import { generate_commands } from "../define/core.js";
import { draw_existing_shapes, draw_existing_shape } from "./core.js";

const highlight_shape = 
	state => shape => draw_existing_shape(state.canvas.getContext('2d'))("highlight")(shape);
const unhighlight_shapes = 
	state => shapes_to_unhighlight => draw_existing_shapes(state.canvas)("fill")(shapes_to_unhighlight);

export { highlight_shape, unhighlight_shapes };