import { first } from "../utility/core.js";
import { drawObjects } from "./draw/core.js";

const init_grab_shape = state => cursor => {
	const quadtree = state.shape_locations;
	const possible_shapes = quadtree.retrieve(cursor);
	return find_shape(possible_shapes)(cursor);
}

const move_shape = state => {
	const canvas = state.canvas;
	drawObjects(state.existing_shapes, canvas);
};

const init_release_shape = () => "meh";

export { init_grab_shape, move_shape };