function drawBalls() {
	//Clear Canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	//Draws Balls
	for (let index = 0; index < balls; index++) {
			ballsArr[index].draw();
	}
}

const init_grab_shape = state => (mx, my) => {
	const quadtree = state.drawn_shapes;
	const shape = quadtree.retrieve({x: mx, y: my, width: 1, height: 1 });
	return first(shape);
}

const drag_shape = (canvas) => {
    // Definitions
    var context = canvas.getContext("2d");
    var boundings = canvas.getBoundingClientRect();
    this.console.log("boundings: " + boundings)

    //Specs
    var balls = 5;
    var ballsArr = [];
    var currentBall = null;


};

export { init_grab_shape, moveShape, releaseShape };