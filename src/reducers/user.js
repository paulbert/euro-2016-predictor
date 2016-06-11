
const thisUser = (state = [],action) => {
	switch(action.type) {
		case 'RECEIVE_USERS':
			return action.users;
		default:
			return state;
	}
};

const thisUser = (state = [],action) => {
	switch(action.type) {
		case 'RECEIVE_USERS':
			return action.users;
		default:
			return state;
	}
};

export default user;