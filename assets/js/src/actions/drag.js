function drawBalls() {
	//Clear Canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	//Draws Balls
	for (let index = 0; index < balls; index++) {
			ballsArr[index].draw();
	}
}

function isMitOnBall(mx, my) {
	for (let index = balls - 1; index >= 0; index--) {
			if (Math.sqrt(Math.pow((mx - ballsArr[index].x), 2) + Math.pow((my - ballsArr[index].y), 2)) < ballsArr[index].r) {
					currentBall = ballsArr[index];
					break;
			}
	}
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

export { grabShape, moveShape, releaseShape };