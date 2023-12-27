const fill_circle = ctx => obj => {
	ctx.beginPath();
	ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2);
	ctx.fillStyle = obj.data.color;
	ctx.fill();
	ctx.closePath();
};

const fill_rectangle = ctx => obj => {
	ctx.fillStyle = obj.data.color;
	ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
};

const fill_map = {
	CIRCLE: fill_circle,
	RECTANGLE: fill_rectangle,
};


const highlight_circle = circle => {
	const { x, y, r } = circle;
	ctx.beginPath();
	ctx.arc(x, y, r + 2, 0, Math.PI * 2);
	ctx.strokeStyle = 'blue';
	ctx.lineWidth = 3;
	ctx.stroke();
};
const highlight_rectangle = rect => {
	const { x, y, width, height } = rect;
	ctx.strokeStyle = 'blue';
	ctx.lineWidth = 3;
	ctx.strokeRect(x - 2, y - 2, width + 4, height + 4);
};

const highlight_map = {
	CIRCLE: (s) => { highlight_circle(s); fill_circle(s); },
	RECTANGLE: (s) => { highlight_rectangle(s); fill_circle(s); },
};

const style_types = {
	"highlight":  highlight_map,
	"fill": fill_map
};

const draw_existing_shape = canvas => style => existing_shape => {
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	const type = v.width ? 'rectangle' : 'circle';
	style_types[style][type](ctx)(existing_shape);	
};

const draw_existing_shapes = canvas => style => existing_shapes => {
	const draw_shape = draw_existing_shape(canvas, style);
	existing_shapes.forEach((v, k) => draw_existing_shape(v));
};

export { draw_existing_shapes };