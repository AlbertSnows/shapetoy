import { filter_map } from "../utility/core.js";
import { highlight_shape, unhighlight_shape } from "./highlight.js";

const make_range = (value, class_id) => {
    // Create a range input for width
    const range = document.createElement('input');
    range.setAttribute('type', 'range');
    range.setAttribute('min', '1');
    range.setAttribute('max', '500');
    range.setAttribute('value', value);
		range.setAttribute('class', class_id)
		return range;
};
const make_color = (value) => {
	const color = document.createElement('input');
	color.setAttribute('type', 'color');
	color.setAttribute('value', value);
	color.classList.add('color-input');
	return color;
};
const make_div = (id) => {
	const div = document.createElement('div');
	div.setAttribute('id', id);
	div.setAttribute('class', 'shape-property-box');
	return div;
};
const make_number = (value, class_id) => {
	const number = document.createElement('input');
	number.setAttribute('type', 'number');
	number.setAttribute('value', value);
	number.setAttribute('class', class_id);
	return number;
};
const generate_rectangle = (shape) => {
	const width = make_range(shape.width, 'width-input');
	const height = make_range(shape.height, 'height-input');
	const x = make_number(shape.x, 'x-coord');
	const y = make_number(shape.y, 'y-coord');
	const color = make_color(shape.data.color);
	const box = make_div(shape.data.id);
	box.appendChild(width);
	box.appendChild(height);
	box.appendChild(x);
	box.appendChild(y);
	box.appendChild(color);
	return box;
};
const generate_circle = (shape) => {
	const radius = make_number(shape.r, 'radius');
	const x = make_number(shape.x, 'x-coord');
	const y = make_number(shape.y, 'y-coord');
	const color = make_color(shape.data.color);
	const box = make_div(shape.data.id);
	box.appendChild(x);
	box.appendChild(y);
	box.appendChild(radius);
	box.appendChild(color);
	return box;
};
const property_generator = {
	RECTANGLE: generate_rectangle,
	CIRCLE: generate_circle
};
const handle_property_box_input_change = state => (e) => {
	const changed_input = e.target;
	const parent_box = e.currentTarget;
	const id = parent_box.id;
	//todo: handle any input box change
};
const add_to_page = state => (v, k) => {
	const type = v.width ? RECTANGLE : CIRCLE;
	const box = property_generator[type](v)
	box.addEventListener('input', handle_property_box_input_change(state));
	const propertySection = document.getElementById('property-boxes');
	propertySection.appendChild(box);
};
const update_property = state => (selected_shape) => {
	const element_to_remove = document.querySelectorAll(".shape-property-box");
	element_to_remove.forEach(element => element.parentNode.removeChild(element));
	selected_shape.forEach(add_to_page(state));
};
const add_properties = state => shapes_to_add => {
	shapes_to_add.forEach(add_to_page(state));
};
const remove_properties = boxes_to_remove => {
	boxes_to_remove.forEach(e => e.parentNode.removeChild(e));
};
const update_property_display = (document, state) => {
	const selected_shapes = state.selected_shapes;
	const existing_property_boxes = Array.from(document.querySelectorAll(".shape-property-box"));
	const existing_length = existing_property_boxes.length;
	const selected_length = selected_shapes.size;
	const ids = new Set(Array.from(existing_property_boxes)
		.map(element => element.id));
	const should_add_properties = selected_length > existing_length;
	const should_remove_properties = selected_length < existing_length;
	const only_one = selected_shapes.size === 1;
	if(only_one) {
		update_property(state)(selected_shapes);
		selected_shapes.forEach(highlight_shape(state));
	} else if(should_add_properties) {
		const shapes_to_add = filter_map((p, i) => !ids.has(p[0]))(selected_shapes);
		selected_shapes.forEach(highlight_shape(state));
		add_properties(state)(shapes_to_add);
	} else if(should_remove_properties) {
		const boxes_to_remove = existing_property_boxes
			.filter(e => !selected_shapes.has(e.id));
		remove_properties(boxes_to_remove);
		const shapes_to_unhighlight = filter_map((p, i) => !ids.has(p[0]))(selected_shapes);
		shapes_to_unhighlight.forEach(unhighlight_shape(state));
	} // else no change
};

export { update_property_display };