import { first } from "../utility/core.js";
import { draw_existing_shapes } from "./draw/core.js";

const move_shape = state => {
	const canvas = state.canvas;
	draw_existing_shapes(state.existing_shapes, canvas);
};

const init_release_shape = () => "meh";

export { move_shape };