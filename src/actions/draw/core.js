import { CIRCLE, RECTANGLE } from "../../utility/constants.js";
const fill_circle = canvas => obj => {
	const ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2);
	ctx.fillStyle = obj.data.color;
	ctx.fill();
	ctx.closePath();
};

const fill_rectangle = canvas => obj => {
	const ctx = canvas.getContext('2d');
	ctx.fillStyle = obj.data.color;
	ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
};

const fill_map = {
	[CIRCLE]: fill_circle,
	[RECTANGLE]: fill_rectangle,
};


const highlight_circle = canvas => circle => {
	const { x, y, r } = circle;
	const ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.arc(x, y, r + 2, 0, Math.PI * 2);
	ctx.strokeStyle = 'blue';
	ctx.lineWidth = 3;
	ctx.stroke();
};
const highlight_rectangle = canvas => rect => {
	const { x, y, width, height } = rect;
	const ctx = canvas.getContext('2d');
	ctx.strokeStyle = 'blue';
	ctx.lineWidth = 3;
	ctx.strokeRect(x - 2, y - 2, width + 4, height + 4);
};

const highlight_map = {
	[CIRCLE]: highlight_circle,
	[RECTANGLE]: highlight_rectangle,
};

const unhighlight_circle = canvas => circle => {
	const { x, y, r } = circle;
	const ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.arc(x, y, r, 0, Math.PI * 2, true); 
	ctx.closePath();
	ctx.clip();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};
const unhighlight_rectangle = canvas => rect => {
	const { x, y, width, height } = rect;
	const ctx = canvas.getContext('2d');
	ctx.clearRect(x - 2, y - 2, width + 4, height + 4); 
  ctx.fillStyle = rect.data.color;
  ctx.fillRect(x, y, width, height);
	// ctx.beginPath();
	// ctx.rect(0, 0, canvas.width, canvas.height);
	// ctx.arc(x, y, r, 0, Math.PI * 2, true); 
	// ctx.closePath();

	// ctx.clip();
	// ctx.clearRect(x - 2, y - 2, width + 4, height + 4);
  // ctx.strokeRect(x, y, width, height);
};

const unhighlight_map = {
	[CIRCLE]: unhighlight_circle,
	[RECTANGLE]: unhighlight_rectangle,
};

const style_types = {
	"highlight":  highlight_map,
	"unhighlight": unhighlight_map,
	"fill": fill_map
};

const draw_existing_shape = canvas => style => shape => {
	const type = shape.width ? 'rectangle' : 'circle';
	style_types[style][type](canvas)(shape);	
};

const draw_existing_shapes = canvas => style => existing_shapes => {
	const ctx = canvas.getContext('2d');
	const draw_shape = draw_existing_shape(canvas)(style);
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	existing_shapes.forEach((v, k) => draw_shape(v));
};

export { draw_existing_shapes, draw_existing_shape };