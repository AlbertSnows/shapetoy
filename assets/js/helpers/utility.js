const when = pred => action => {
	if(pred()) {
		action();
	}
};