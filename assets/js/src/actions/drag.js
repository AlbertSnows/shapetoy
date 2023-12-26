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

const init_move_shape = (canvas) => {
    // Definitions
    var context = canvas.getContext("2d");
    var boundings = canvas.getBoundingClientRect();
    this.console.log("boundings: " + boundings)

    //Specs
    var balls = 5;
    var ballsArr = [];
    var currentBall = null;


};

const init_release_shape = () => "meh";

export { init_grab_shape, init_move_shape, init_release_shape };