import { first } from "../utility/core.js";
import { drawObjects } from "./draw/core.js";

const move_shape = state => {
	const canvas = state.canvas;
	drawObjects(state.existing_shapes, canvas);
};

const init_release_shape = () => "meh";

export { move_shape };