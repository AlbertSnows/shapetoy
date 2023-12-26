const when = pred => action => {
	if(pred()) {
		action();
	}
};

export { when };