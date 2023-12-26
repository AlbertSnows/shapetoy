const polyfillAnimationFrames = () => {
	return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			(callback) => {
					window.setTimeout(callback, 1000 / 60);
			};
};

export { polyfillAnimationFrames };