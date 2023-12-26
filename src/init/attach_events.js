import { when } from "../src/utility.js";
import { generate_circle, generate_rectangle } from "../src/actions/draw.js";
import { init_grab_shape, init_move_shape, init_release_shape } from "../src/actions/drag.js";
import { polyfill_animation_frames } from "./init_helpers.js"

const canvas = document.getElementById("canvas");
let state = {
    holding_shape: false,
    selected_shape: null,
    shape_locations: [],
    // drawn_shapes: new Quadtree({ width: canvas === null || canvas === void 0 ? void 0 : canvas.clientWidth, height: canvas === null || canvas === void 0 ? void 0 : canvas.clientHeight })
};
const context = canvas.getContext("2d");
const when_canvas_exists = when(() => canvas.getContext !== null && canvas.getContext !== undefined);
const when_holding = when(() => state.holding_shape);
const boundings = canvas.getBoundingClientRect();
const grab_shape = init_grab_shape(state);
// attach generate
document.getElementById('generate_circle')
    .addEventListener('click', () => when_canvas_exists(() => generate_circle(canvas)));
document.getElementById('generate_rectangle')
    .addEventListener('click', () => when_canvas_exists(() => generate_rectangle(canvas)));
window.requestAnimationFrame = polyfill_animation_frames();
// attach movement
canvas.addEventListener('mousedown', (event) => {
    const mouse_down_x = event.clientX - boundings.left;
    const mouse_down_y = event.clientY - boundings.top;
    shape_data = grab_shape(mouse_down_x, mouse_down_y);
    state.selected_shape = shape_data;
    state.holding_shape = shape_data !== null;
});
const dragShape = (event) => {
    var mouseMoveX = event.clientX - boundings.left;
    var mouseMoveY = event.clientY - boundings.top;
    currentBall.x = mouseMoveX;
    currentBall.y = mouseMoveY;
    // drawBalls(); todo: any shape
};
canvas.addEventListener('mousemove', (event) => when_holding(() => dragShape(event)));
canvas.addEventListener('mouseup', (event) => {
    state.selected_shape = null;
    state.holding_shape = false;
});
