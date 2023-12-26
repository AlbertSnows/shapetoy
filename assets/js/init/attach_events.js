import { when } from "../src/utility.js";
import { generate_circle, generate_rectangle } from "../src/actions/generate.js";
import { grab_shape, move_shape, release_shape } from "../src/actions/drag.js";
import { polyfill_animation_frames } from "./init_helpers.js"
import Quadtree from '@timohausmann/quadtree-js';

const canvas = document.getElementById("canvas");
const state = { 
	holding_shape: false, 
	selected_shape: null,
  drawn_shapes: new Quadtree({x: 0, y:0, width: canvas?.clientWidth, height: canvas?.clientHeight }) };

const context = canvas.getContext("2d");
const when_canvas_exists = when(() => canvas.getContext !== null && canvas.getContext !== undefined);
const when_holding = when(() => state.holding_shape);
const boundings = canvas.getBoundingClientRect();

// attach generate
document.getElementById('generateCircle')
	.addEventListener('click', () => when_canvas_exists(() => generateCircle(canvas)));
document.getElementById('generateRectangle')
	.addEventListener('click', () => when_canvas_exists(() => generateRectangle(canvas)));
window.requestAnimationFrame = polyfillAnimationFrames();
	
// attach movement
canvas.addEventListener('mousedown', (event) => {
	var mouseDownX = event.clientX - boundings.left;
	var mouseDownY = event.clientY - boundings.top;
	// isMitOnBall(mouseDownX, mouseDownY) todo
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