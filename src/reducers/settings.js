
import { combineReducers } from 'redux'

function names (state = {nameName:'',teamName:''}, action) {
	switch(action.type) {
		case 'GETTING_USERS':
		case 'GETTING_PREDICTION':
		case 'CLEAR_TRASH_PREVIEW':
			return {nameName:'',teamName:''};
		case 'CHANGE_SETTINGS':
			return Object.assign({},state,action.newVals);
		default:
			return state;
	}
}

function settingsStatus (state = '', action) {
	switch(action.type) {
		case 'GETTING_USERS':
		case 'GETTING_PREDICTION':
		case 'CLEAR_TRASH_PREVIEW':
		case 'CLEAR_SETTINGS_STATUS':
			return '';
		case 'SEND_SETTINGS':
			return 'waiting';
		case 'SET_SETTINGS_STATUS':
			return action.status;
		default:
			return state;
	}
}

const settings = combineReducers({names,settingsStatus});

export default settings;