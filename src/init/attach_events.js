import { when } from "../utility/core.js";
import { generate } from "../actions/draw/handlers.js";
import { move_shape } from "../actions/drag.js";
import { polyfill_animation_frames } from "./init_helpers.js";
import { highlight_shape } from "../actions/highlight.js";
import { find_closest_shape } from "../utility/find.js";
import { unhighlight_shape } from "../actions/highlight.js";
import { update_property_display } from "../actions/gui.js";
const canvas = document.getElementById("canvas");
let state = {
		cursor: new Quadtree.Circle({
			x: 0, 
			y: 0, 
			r: 9
		}),
    holding_shape: false,
		hovered_shape: null,
    selected_shapes: new Map(),
    existing_shapes: new Map(),
		canvas: canvas,
    shape_locations: new Quadtree({ 
			width: canvas === null || canvas === void 0 ? void 0 : canvas.clientWidth, 
			height: canvas === null || canvas === void 0 ? void 0 : canvas.clientHeight })
};
const context = canvas.getContext("2d");
const when_canvas_exists = when(() => canvas.getContext !== null && canvas.getContext !== undefined);
const boundings = canvas.getBoundingClientRect();

const update_cursor = cursor => {
	const boundings = canvas.getBoundingClientRect();
  const mouse_down_x = event.clientX - boundings.left;
	const mouse_down_y = event.clientY - boundings.top;
	cursor.x = mouse_down_x;
	cursor.y = mouse_down_y;
	return cursor;
};

const listen_for_shape_drag = (event) => {
	state.cursor = update_cursor(state.cursor);
	move_shape(state);
};
const listen_for_shape_highlight = event => {
	state.cursor = update_cursor(state.cursor);
	const closest_shape = find_closest_shape(state);
	const hovering = closest_shape !== null;
	const was_hovering = state.hovered_shape === null;
	const same_shape = state.hovered_shape == closest_shape;

	if(!hovering && was_hovering) {
		state = unhighlight_shape(state, closest_shape);
	} else if(hovering && !was_hovering) {
		state = highlight_shape(closest_shape);
	} else if(hovering && was_hovering && !same_shape) {
		state = unhighlight_shape(state);
		state = highlight_shape(closest_shape);
	} // else not highlighting anything or highlighting same object

};
// attach generate
document.getElementById('generate_circle')
    .addEventListener('click', () => when_canvas_exists(() => {
			generate["circle"](state);
		}));
document.getElementById('generate_rectangle')
    .addEventListener('click', () => when_canvas_exists(() => {
			generate["rectangle"](state)
		}));
window.requestAnimationFrame = polyfill_animation_frames();
// attach movement
canvas.addEventListener('mousedown', (event) => {
		state.cursor = update_cursor(state.cursor);
    const shape_data = find_closest_shape(state);
    state.selected_shapes.set(shape_data?.data.id, shape_data);
    state.holding_shape = shape_data !== null;
});
const drag_and_highlight_listener = (event) => {
	if(state.selected_shapes.size !== 0) {
		listen_for_shape_drag(event);
	} else {
		// listen_for_shape_highlight(event);
	}
	if(state.width !== undefined) {
		console.log("wtf");
	}
};
canvas.addEventListener('mousemove', drag_and_highlight_listener);
canvas.addEventListener('mouseup', (event) => {
    state.selected_shape = null;
    state.holding_shape = false;
});
canvas.addEventListener('click', (event) => {
	const shift_click = event.shiftKey;
	const closest_shape = find_closest_shape(state);
	const shape_selected = closest_shape !== null;
	const add_shape = !state.selected_shapes.has(closest_shape);
	const remove_all_shapes = !shift_click && shape_selected && !add_shape;
	if(!shape_selected || remove_all_shapes) {
		state.selected_shapes = new Map();
	} else if(!shift_click && add_shape) {
		const single_map = new Map([[closest_shape.data.id, closest_shape]]);
		state.selected_shapes = single_map;
	} else if(shift_click && !add_shape) {
		state.selected_shapes.remove(closest_shape.data.id);
	} else if(shift_click && add_shape) {
		state.selected_shapes.put(closest_shape.data.id, closest_shape);
	} // if no shapes, no shapes selected and remove shape, do nothing
	update_property_display(document, state);
});

