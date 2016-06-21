
import { combineReducers } from 'redux'
import { LOGIN_SUBMIT, LOGIN_SWITCH, LOGIN_REJECT, LOGIN_RESET } from '../actions'

const initialState = { 
	loginStatus:'', 
	invalidMessage: '',
	loginView: 'login',
	loginCreds: {name:'',pass:'',rptPass:'',teamName:'',gbPred:'',leagueCode:''}
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

function loginCreds (state = {name:'',pass:'',rptPass:'',teamName:'',gbPred:'',leagueCode:''},action) {
	switch(action.type) {
		case 'GETTING_PREDICTIONS':
			return initialState.loginCreds;
		case 'LOGIN_SUBMIT':
			return action.loginValues;
		case 'LOGIN_REJECT':
		case 'LOGIN_CHANGE':
			let newPropVal = {};
			newPropVal[action.prop] = action.val;
			return Object.assign({},state,newPropVal);
		case 'LOGIN_SWITCH':
		default:
			return state;
	}
}

const login = combineReducers({loginStatus,invalidMessage,loginView,loginCreds});

export default login;