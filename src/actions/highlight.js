// bonus: do group update so we don't clear the board each time
const change_shape = state => command => {
	const state = generate_commands("regenerate");
	draw_existing_shapes(state.canvas)(command)(state.existing_shapes);
	return state;
};

const highlight_shapes = state => change_shape(state)("highlight");
const unhighlight_shapes = state => change_shape(state)("fill");

export { highlight_shapes, unhighlight_shapes };