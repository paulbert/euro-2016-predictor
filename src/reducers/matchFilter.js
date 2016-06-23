
const matchFilter = (state = 'bracket',action) => {
	switch(action.type) {
		case 'CHANGE_FILTER':
			return action.newFilter;
		default:
			return state;
	}
};

export default matchFilter;