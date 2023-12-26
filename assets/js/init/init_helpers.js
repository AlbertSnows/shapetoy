const polyfill_animation_frames = () => {
	const default_animation = (callback) => {
		window.setTimeout(callback, 1000 / 60);
	};
	return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			default_animation;
};

export { polyfill_animation_frames };