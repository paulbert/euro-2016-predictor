
const getCurrentUser = () => {
	var cookieArray = document.cookie.split("; ");
	return cookieArray.reduce((previous,cookie) => {
		var keyValueAsArray = cookie.split('=');
		if(keyValueAsArray[0] === 'user') {
			return keyValueAsArray[1];
		}
		return previous;
	},'');
}


const thisUser = (state = [],action) => {
	switch(action.type) {
		default:
			return getCurrentUser();
	}
};

const activeUserView = (state = [],action) => {
	switch(action.type) {
		case 'SWITCH_USERS':
			return action.user;
		default:
			return getCurrentUser();
	}
};

export default thisUser;
export default activeUserView;