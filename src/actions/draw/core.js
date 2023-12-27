const draw_circle = ctx => obj => {
	ctx.beginPath();
	ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2);
	ctx.fillStyle = obj.data.color;
	ctx.fill();
	ctx.closePath();
}

const draw_rectangle = ctx => obj => {
	ctx.fillStyle = obj.data.color;
	ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
};

const draw_existing_shapes = (existing_shapes, canvas) => {
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	existing_shapes.forEach((v, k) => {
		const type = v.width ? 'rectangle' : 'circle';
		drawMap[type](ctx)(v);	
	});
}

const drawMap = {
	"circle": draw_circle,
	"rectangle": draw_rectangle,
};
// const drawMap = new Map();
// drawMap.set('Rectangle', function(ctx, obj) {
// 	ctx.fillStyle = obj.data.check ? colorChecked : colorWhite;
// 	ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
// });
// drawMap.set('Circle', function(ctx, obj) {
// 	ctx.fillStyle = obj.data.check ? colorChecked : colorWhite;
// 	ctx.beginPath();
// 	ctx.arc(obj.x, obj.y, obj.r, 0, 2 * Math.PI);
// 	ctx.closePath();
// 	ctx.fill();
// });

export { draw_existing_shapes };