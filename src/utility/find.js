import { last } from "../utility/core.js"

const hovering_rectangle = (cursor, rect) => {
	const {rect_x, rect_y, width, height} = rect;
	const {point_x, point_y} = cursor;
	return point_x >= rect_x && 
				point_x <= rect_x + width && 
				point_y >= rect_y && 
				point_y <= rect_y + height;
};

const hovering_circle = (cursor, circle) => {
	const {circ_x, circ_y, r} = circle;
	const {point_x, point_y} = cursor;
	const distanceSquared = (point_x - circ_x) ** 2 + (point_y - circ_y) ** 2;
	const rooted_diff = Math.sqrt(distanceSquared);
	return rooted_diff <= r;
};

const find_nearby_shapes = possible_shapes => cursor => {
	const p_rectangles = possible_shapes.filter(s => 'width' in s);
	const over_retangles = possible_shapes
		.filter(r => hovering_rectangle(cursor, r));
	const p_circles = possible_shapes.filter(s => 'r' in s);
	const over_circles = possible_shapes.filter(c => hovering_circle(cursor, c));
		return {
			"circles": over_circles,
			"rectangles": over_retangles
		}
};

// bonus: clean up branches
const find_closest_nearby_shape = nearby_shapes => {
	const latest_rect = last(nearby_shapes["rectangles"] ?? []);
	const latest_circle = last(nearby_shapes["circle"] ?? []);
	const circle_is_recent = latest_circle?.data.created > latest_rect?.data.created;
	if(latest_rect === null && latest_circle === null) {
		return null;
	} else if(latest_rect === null || circle_is_recent) {
		return latest_circle;
	} else if(latest_circle === null || !circle_is_recent) {
		return latest_rect;
	}
	return null;
};

const find_closest_shape = state  => {
	const quadtree = state.shape_locations;
	const possible_shapes = quadtree.retrieve(state.cursor);
	const nearby_shapes = find_nearby_shapes(possible_shapes)(state.cursor);
	return find_closest_nearby_shape(nearby_shapes);
};

export { find_closest_shape };