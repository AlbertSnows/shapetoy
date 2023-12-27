const when = pred => action => {
	const acted = pred();
	if(acted) {
		action();
	}
	return acted;
};
const first = list => list[0] ?? null;
const last = list => list[list.length - 1] ?? null;
const filter_map = pred => map => new Map([...map].filter(pred));
const random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
export { when, first, last, filter_map, random };