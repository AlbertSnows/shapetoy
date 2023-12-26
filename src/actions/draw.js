// import { Rectangle, Circle, Line } from '@timohausmann/quadtree-ts';
const generate_circle = (state) => {
	var ctx = state.canvas.getContext('2d');
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	var radius = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
	var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const circle = new Quadtree.Circle({ 
		x: x, 
		y: y, 
		r: radius,
		data: {
			color: color
		}
	});
	
	state.existing_shapes.push(circle);
	state.shape_locations.insert(circle);	
	draw_circle(ctx)(state.existing_shapes);
};

 // Function to generate a random number within a range
 const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generate_rectangle = (state) => {
	const canvas = state.canvas;
	var ctx = canvas.getContext('2d');
	var color = '#' + Math.floor(Math.random() * 16777215).toString(16);

	const rect = new Quadtree.Rectangle({
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height,
		width: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
		height: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
		data: {
				color: color
		},
});
state.existing_shapes.push(rect);
state.shape_locations.insert(rect);
draw_rectangle(ctx)(state.existing_shapes);
};

const draw_circle = ctx => existing_shapes => {
	for(let i=0;i<existing_shapes.length;i=i+1) {
		const obj = existing_shapes[i];
		ctx.beginPath();
		ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2);
		ctx.fillStyle = obj.data.color;
		ctx.fill();
		ctx.closePath();
	}
}

const draw_rectangle = ctx => existing_shapes => {
    // Clear the canvas
    ctx.clearRect(0, 0, 640, 480);
    
    // Draw the objects
    for(let i=0;i<existing_shapes.length;i=i+1) {
        const obj = existing_shapes[i];
        ctx.fillStyle = obj.data.color;
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    }
};

const generate = {
	"circle": generate_circle,
	"rectangle": generate_rectangle,
};

export { generate };