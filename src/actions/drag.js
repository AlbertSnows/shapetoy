import { first } from "../utility.js";
import { drawObjects } from "./draw/core.js";

function isWithinRectangle(cursorX, cursorY, rect) {
	const [x, y, width, height] = rect;
	return cursorX >= x && 
				cursorX <= x + width && 
				cursorY >= y && 
				cursorY <= y + height;
}

function isWithinCircle(cursorX, cursorY, circle) {
	const [x, y, r] = circle;
	const distanceSquared = (cursorX - centerX) ** 2 + (cursorY - centerY) ** 2;
	return distanceSquared <= r ** 2;
}

const find_shape = possible_shapes => cursor => {
	const p_rectangles = possible_shapes.filter(s => 'width' in s);
	const over_retangles = possible_shapes.filter(r => isWithinRectangle(
		cursor.x,
		cursor.y,
		r));
	const p_circles = possible_shapes.filter(s => 'r' in s);
	const over_circles = possible_shapes.filter(c => isWithinCircle(
		cursor.x,
		cursor.y,
		c));
	if(over_retangles.length !== 0) {
		return first(over_retangles);
	} else {
		return first(over_circles) ?? null;
	}
};

const init_grab_shape = state => cursor => {
	const quadtree = state.shape_locations;
	const possible_shapes = quadtree.retrieve(cursor);
	return find_shape(possible_shapes)(cursor);
}

const move_shape = state => {
	const canvas = state.canvas;
	const ctx = canvas.getContext('2d');
	var context = canvas.getContext("2d");
	var boundings = canvas.getBoundingClientRect();
	drawObjects(state.existing_shapes, ctx);
};

const init_release_shape = () => "meh";

export { init_grab_shape, move_shape };