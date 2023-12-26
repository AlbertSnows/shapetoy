import { when } from "./helpers/utility"
import * from "./helpers/logic"

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const when_canvas_exists = when(() => canvas.getContext !== null && canvas.getContext !== undefined);
document.getElementById('generateCircle')
	.addEventListener('click', () => when_canvas_exists(() => generateCircle(canvas)));
document.getElementById('generateRectangle')
	.addEventListener('click', when_canvas_exists(() => generateRectangle(canvas)));

