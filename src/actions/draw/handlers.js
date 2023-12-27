const generate_and_draw = state => action => {
	draw_existing_shapes(state.canvas)(style)(state.existing_shapes);
};

const draw_actions = {
	"highlight": "regen + highlight...",
	"unhighlight": "..."
};