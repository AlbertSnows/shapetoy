
	// <div class="shape-property-box" id="uuid"

const update_property_display = (document, selected_shapes) => {
	const existing_property_boxes = document.querysSelectorAll(".shape-property-box");
	const existing_length = existing_property_boxes.length;
	const selected_length = selected_shapes.size;
	const ids = Array.from(existing_property_boxes).map(element => element.id);
	const should_add_properties = selected_length > existing_length;
	const should_remove_properties = selected_length < existing_length;
	const only_one = selected_shapes.size === 1;
	if(only_one) {
		add_property(selected_shapes);
	} else if(should_add_properties) {
		add_properties(selected_shapes);
	} else if(should_remove_properties) {
		should_remove_properties(selected_shapes);
	} // else no change
};