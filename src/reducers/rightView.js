
const isGuest = () => {
	var cookieArray = document.cookie.split("; ");
	return cookieArray.reduce((previous,cookie) => {
		var keyValueAsArray = cookie.split('=');
		if(keyValueAsArray[0] === 'user') {
			return false;
		}
		return previous;
	},true);
}

const initView = {'type':'bracket','actual':isGuest(),'mobile':'fixtures','menu':false};

const rightView = (state = initView,action) => {
	switch(action.type) {
		case 'SWITCH_RIGHT_VIEW':
			return Object.assign({},state,action.newView);
		default:
			return state;
	}
};

export default rightView;