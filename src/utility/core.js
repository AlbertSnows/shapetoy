const when = pred => action => {
	const acted = pred();
	if(acted) {
		action();
	}
	return acted;
};
const first = list => list[0] ?? null;
export { when, first };