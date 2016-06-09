
const initialState = { 
	waiting: false, 
	invalid: false, 
	invalidMessage: '',
	loginView: 'login'
};

const loginApp = (state = initialState, action) => {
	switch(action.type) {
		case 'LOGIN_SWITCH':
			return Object.assign({},state,{ loginView: action.switchTo });
		case 'LOGIN_SUBMIT':
			return Object.assign({},state,{ waiting: true });
		case 'LOGIN_REJECT':
			return Object.assign({},state,{ waiting: false,invalid:true, invalidMessage:action.message });
			return state;
		default:
			return state;
	}
};

export default loginApp;