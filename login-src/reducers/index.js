
import { combineReducers } from 'redux'
import { LOGIN_SUBMIT, LOGIN_SWITCH, LOGIN_REJECT, LOGIN_RESET } from '../actions'

const initialState = { 
	loginStatus:'', 
	invalidMessage: '',
	loginView: 'login'
};

function loginStatus (state = '', action) {
	switch(action.type) {
		case 'LOGIN_SUBMIT':
			return action.type;
		case 'LOGIN_REJECT':
			return action.type;
		case 'LOGIN_SWITCH':
		default:
			return state;
	}
}

function invalidMessage (state = '', action) {
	switch(action.type) {
		case 'LOGIN_REJECT':
			return action.message;
		case 'LOGIN_SWITCH':
		case 'LOGIN_SUBMIT':
		default:
			return '';
	}
}

function loginView (state = 'login',action) {
	switch(action.type) {
		case 'LOGIN_SWITCH':
			return action.switchTo;
		case 'LOGIN_SUBMIT':
		case 'LOGIN_REJECT':
		default:
			return state;
	}
}
const loginApp = combineReducers({loginStatus,invalidMessage,loginView});

export default loginApp;