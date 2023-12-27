import { last } from "../utility/core.js";

const constrain = (value_to_constrain, min, max) => {
	const value_or_max = Math.min(value_to_constrain, max);
	const value_or_min_or_max = Math.max(value_or_max, min);
	return value_or_min_or_max;
};
const hovering_rectangle = (canvas, cursor, rect) => {
	const ctx = canvas.getContext('2d');
	ctx.rect(rect.x, rect.y, rect.width, rect.height);
	const { x, y } = cursor;
	return ctx.isPointInPath(x, y);

	// Find the closest point on the rectangle to the circle
	// let closest_to_cursor_x = constrain(cursor.x, rect.y, rect.x + rect.width);
	// let closest_to_cursor_y = constrain(cursor.y, rect.y, rect.y + rect.height);

	// // Calculate distance between the circle's center and the closest point
	// let distance_from_circle_x_to_closest_x = cursor.x - closest_to_cursor_x;
	// let distance_from_circle_y_to_closest_y = cursor.y - closest_to_cursor_y;
	// let distance_squared = (distance_from_circle_x_to_closest_x ** 2) + (distance_from_circle_y_to_closest_y ** 2);

	// // Check if the closest point is within the circle or on its circumference
	// return distance_squared <= (cursor.r ** 2);

	// const {rect_x, rect_y, width, height} = rect;
	// const {point_x, point_y} = cursor;
	// return point_x >= rect_x && 
	// 			point_x <= rect_x + width && 
	// 			point_y >= rect_y && 
	// 			point_y <= rect_y + height;
};

const hovering_circle = (canvas, cursor, circle) => {
	// const {circ_x, circ_y, circ_r} = circle;
	// const {point_x, point_y, point_r} = cursor;
	const distanceBetweenCentersSquared = 
		(circle.x - cursor.x) ** 2 + 
		(circle.y - cursor.y) ** 2;
	const sumOfRadiiSquared = (cursor.r + circle.r) ** 2;
	return distanceBetweenCentersSquared < sumOfRadiiSquared;
	// const distanceSquared = (point_x - circ_x) ** 2 + (point_y - circ_y) ** 2;
	// const rooted_diff = Math.sqrt(distanceSquared);
	// return rooted_diff <= r;
};

const find_nearby_shapes = canvas => possible_shapes => cursor => {
	const p_rectangles = possible_shapes.filter(s => 'width' in s);
	const over_retangles = p_rectangles
		.filter(r => hovering_rectangle(canvas, cursor, r));
	const p_circles = possible_shapes.filter(s => 'r' in s);
	const over_circles = p_circles.filter(c => hovering_circle(canvas, cursor, c));
	return {
		"circles": over_circles,
		"rectangles": over_retangles
	}
};

// bonus: clean up branches
const find_closest_nearby_shape = nearby_shapes => {
	const latest_rect = last(nearby_shapes["rectangles"] ?? []);
	const latest_circle = last(nearby_shapes["circles"] ?? []);
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
	const nearby_shapes = find_nearby_shapes(state.canvas)(possible_shapes)(state.cursor);
	return find_closest_nearby_shape(nearby_shapes);
};

export { find_closest_shape };