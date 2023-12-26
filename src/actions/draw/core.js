const draw_circle = ctx => obj => {
	ctx.beginPath();
	ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2);
	ctx.fillStyle = obj.data.color;
	ctx.fill();
	ctx.closePath();
}

const draw_rectangle = ctx => existing_shapes => {
	const obj = existing_shapes[i];
	ctx.fillStyle = obj.data.color;
	ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
};

const drawObjects = (objects, ctx) => {
	//bonus: swap to a filter
	for(let i=0;i<objects.length;i=i+1) {
			const type = objects[i].width ? 'rectangle' : 'circle';
			drawMap[type](ctx)(objects[i]);
	}
}

const draw = {
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

