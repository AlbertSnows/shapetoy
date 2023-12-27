import { last } from "../utility/core.js"

const hovering_rectangle = (cursorX, cursorY, rect) => {
	const {x, y, width, height} = rect;
	return cursorX >= x && 
				cursorX <= x + width && 
				cursorY >= y && 
				cursorY <= y + height;
};

const hovering_circle = (cursorX, cursorY, circle) => {
	const {x, y, r} = circle;
	const distanceSquared = (cursorX - x) ** 2 + (cursorY - x) ** 2;
	const rooted_diff = Math.sqrt(distanceSquared);
	return rooted_diff <= r;
};

const find_nearby_shapes = possible_shapes => cursor => {
	const p_rectangles = possible_shapes.filter(s => 'width' in s);
	const over_retangles = possible_shapes.filter(r => hovering_rectangle(
		cursor.x,
		cursor.y,
		r));
	const p_circles = possible_shapes.filter(s => 'r' in s);
	const over_circles = possible_shapes.filter(c => hovering_circle(
		cursor.x,
		cursor.y,
		c));
		return {
			"circles": over_circles,
			"rectangles": over_retangles
		}
};

const find_closest_shape = nearby_shapes => {
	const latest_rect = last(hovered_shapes["rectangles"]);
	const latest_circle = last(hovered_shapes["circle"]);
	const circle_is_recent = 
		latest_circle.data.created > latest_rect.data.created;
	if(circle_is_recent) {
		return latest_circle;
	} else {
		return latest_rect;
	}
}