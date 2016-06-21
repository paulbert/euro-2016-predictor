
import { combineReducers } from 'redux'


function inputUrl (state = '', action) {
	switch(action.type) {
		case 'GETTING_USERS':
		case 'GETTING_PREDICTION':
		case 'CLEAR_TRASH_PREVIEW':
		case 'CANCEL_TRASH_INSERT':
			return '';
		case 'RECEIVE_TRASH_PREVIEW':
			return action.previewUrl;
		default:
			return state;
	}
}

function previewUrl (state = '', action) {
	switch(action.type) {
		case 'GETTING_USERS':
		case 'GETTING_PREDICTION':
		case 'CLEAR_TRASH_PREVIEW':
			return '';
		case 'CHANGE_PREVIEW_URL':
			return action.newUrl;
		default:
			return state;
	}
}

function entries (state = [],action) {
	switch(action.type) {
		case 'GETTING_USERS':
		case 'GETTING_PREDICTION':
			return [];
		case 'RECEIVE_TRASH':
			return action.trash;
		default:
			return state;
	}
}

function previewResponse (state = '', action) {
	switch(action.type) {
		case 'GETTING_USERS':
		case 'GETTING_PREDICTION':
		case 'CLEAR_TRASH_PREVIEW':
		case 'CANCEL_TRASH_INSERT':
			return '';
		case 'RECEIVE_TRASH_PREVIEW':
			return action.message;
		default:
			return state;
	}
}

function entriesToShow (state = 10, action) {
	switch(action.type) {
		case 'GETTING_USERS':
		case 'GETTING_PREDICTION':
		case 'CLEAR_TRASH_PREVIEW':
			return 10;
		case 'SHOW_MORE_TRASH':
			return action.number;
		default:
			return state;
	}
}

function trashOnServerCount (state = 0, action) {
	switch(action.type) {
		case 'GETTING_USERS':
		case 'GETTING_PREDICTION':
			return 0;
		case 'RECEIVE_NEW_TRASH_NUM':
			return action.newTrashNum;
		default:
			return state;
	}
}

const trashTalk = combineReducers({inputUrl,previewUrl,entries,previewResponse,entriesToShow,trashOnServerCount});

export default trashTalk;