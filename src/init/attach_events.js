import { when } from "../utility.js";
import { generate } from "../actions/draw/handlers.js";
import { init_grab_shape, move_shape } from "../actions/drag.js";
import { polyfill_animation_frames } from "./init_helpers.js"
const canvas = document.getElementById("canvas");

let state = {
		cursor: new Quadtree.Circle({
			x: 0, 
			y: 0, 
			r: 3
		}),
    holding_shape: false,
    selected_shape: null,
    existing_shapes: [],
		canvas: canvas,
    shape_locations: new Quadtree({ 
			width: canvas === null || canvas === void 0 ? void 0 : canvas.clientWidth, 
			height: canvas === null || canvas === void 0 ? void 0 : canvas.clientHeight })
};
const context = canvas.getContext("2d");
const when_canvas_exists = when(() => canvas.getContext !== null && canvas.getContext !== undefined);
const when_holding = when(() => state.holding_shape);
const boundings = canvas.getBoundingClientRect();
const grab_shape = init_grab_shape(state);
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
		const boundings = canvas.getBoundingClientRect();
    const mouse_down_x = event.clientX - boundings.left;
    const mouse_down_y = event.clientY - boundings.top;
		state.cursor.x = mouse_down_x;
		state.cursor.y = mouse_down_y;
    const shape_data = grab_shape(state.cursor);
    state.selected_shape = shape_data;
    state.holding_shape = shape_data !== null;
});
const listen_for_shape_drag = (event) => {
	const boundings = canvas.getBoundingClientRect();
  const mouse_down_x = event.clientX - boundings.left;
	const mouse_down_y = event.clientY - boundings.top;
	const selected_shape = state.selected_shape;
	selected_shape.x = mouse_down_x;
	selected_shape.y = mouse_down_y;
	move_shape(state);
};
canvas.addEventListener('mousemove', 
	(event) => when_holding(() => listen_for_shape_drag(event)));
canvas.addEventListener('mouseup', (event) => {
    state.selected_shape = null;
    state.holding_shape = false;
});
