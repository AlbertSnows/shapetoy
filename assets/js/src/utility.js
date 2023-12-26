const when = pred => action => {
	if(pred()) {
		action();
	}
};
const first = list => list[0] ?? null;
export { when, first };