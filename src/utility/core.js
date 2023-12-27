const when = pred => action => {
	const acted = pred();
	if(acted) {
		action();
	}
	return acted;
};
const first = list => list[0] ?? null;
const last = list => list[list.length - 1] ?? null;
export { when, first, last };