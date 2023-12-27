// bonus: do group update so we don't clear the board each time
const highlight_shape = (state) => (shape, id) => {
	regenerate_shape(state)("highlight")(shape);
	return state;
};

const unhighlight_shape = (state) => (shape, id) => {
	regenerate_shape(state)("unhighlight")(shape);
	return state;	
};

export { highlight_shape, unhighlight_shape };