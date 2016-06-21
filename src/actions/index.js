import $ from 'jquery'
import fetch from 'isomorphic-fetch'

export const CHANGE_PREDICTION = 'CHANGE_PREDICTION';
export const SEND_PREDICTION = 'SEND_PREDICTION';
export const RECEIVE_PREDICTION = 'RECEIVE_PREDICTION';
export const GETTING_PREDICTION = 'GETTING_PREDICTION';
export const RECEIVE_FIXTURES = 'RECEIVE_FIXTURES';
export const GETTING_FIXTURES = 'GETTING_FIXTURES';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const GETTING_USERS = 'GETTING_USERS';
export const SWITCH_USERS = 'SWITCH_USERS';

export const changePrediction = (id,team,score) => {
	return {
		type: CHANGE_PREDICTION,
		id,
		team,
		score
	}
};

export const switchUsers = (userId) => {
	return {
		type:SWITCH_USERS,
		userId
	}
};

export const switchRightView = (newView) => {
	return {
		type:'SWITCH_RIGHT_VIEW',
		newView
	}
}

export const changeFilter = (newFilter) => {
	return {
		type:'CHANGE_FILTER',
		newFilter
	}
}

const sendPrediction = () => {
	return {
		type:SEND_PREDICTION
	}
};

const gettingPrediction = () => {
	return {
		type:GETTING_PREDICTION,
	}
};

const receivePrediction = (predictions) => {
	return {
		type:RECEIVE_PREDICTION,
		predictions
	}
};

const gettingFixtures = () => {
	return {
		type:GETTING_FIXTURES,
	}
};

const receiveFixtures = (fixtures) => {
	return {
		type:RECEIVE_FIXTURES,
		fixtures
	}
};

const gettingUsers = () => {
	return {
		type:GETTING_USERS,
	}
};

const receiveUsers = (users) => {
	return {
		type:RECEIVE_USERS,
		users
	}
};


export function savePredictions(predictions) {
	
	return function(dispatch) {
		
		dispatch(sendPrediction());
		
		return fetch('/savePrediction', {
			method: 'POST',
			credentials:'include',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(predictions)
		})
		.then(response => {
			return response.json()
		})
		.then(json => {
			dispatch(receiveUsers(json));
		});
	}	
}

function fetchQuick(url) {
	return fetch(url, {
		method: 'GET',
		credentials:'include',
		headers: {
			'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
			'Content-Type': 'application/json'
		}
	})
	.then(response => {
		return response.json()
	})
}

export function getPredictions() {
	
	return function(dispatch) {
		
		dispatch(gettingPrediction());
		
		return fetchQuick('/getPrediction')
		.then(json => {
			if(json.length > 0) {
				dispatch(receivePrediction(json[0].predictions));
			} else {
				dispatch(receivePrediction([]));
			}
		});
	}	
}

export function getFixtures() {
	return function(dispatch) {
		
		dispatch(gettingFixtures());
		
		return fetchQuick('/getFixtures')
		.then(json => {
			dispatch(receiveFixtures(json));
			dispatch(getUsers());
		});
	}
}

export function getUsers() {
	return function(dispatch) {
		dispatch(gettingUsers());
		return fetchQuick('/getUsers')
		.then(json => {
			dispatch(receiveUsers(json));
		});
	}
}

export function initData() {
	return function(dispatch) {
		dispatch(getPredictions());
		dispatch(getFixtures());
	}
}

// Login actions
// loginValues = {name:'',pass:'',rptPass:'',teamName:'',leagueCode:''};

export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const LOGIN_SWITCH = 'LOGIN_SWITCH';
export const LOGIN_REJECT = 'LOGIN_REJECT';
export const LOGIN_RESET = 'LOGIN_RESET';

const loginSubmit = (loginValues) => {
	return {
		type:LOGIN_SUBMIT,
		loginValues
	}
};

export const loginSwitch = (switchTo) => {
	return {
		type:LOGIN_SWITCH,
		switchTo
	}
};

const loginReject = (message) => {
	return {
		type:LOGIN_REJECT,
		message
	}
};

const loginReset = () => {
	return {
		type:LOGIN_RESET
	}
};

export function loginTry(url,loginValues) {
	
	return function(dispatch) {
		
		dispatch(loginSubmit(loginValues));
		
		if(loginValues.name === '' || ! loginValues.name) {
			return dispatch(loginReject('Username required'));
		}
		
		if(loginValues.pass === '' || ! loginValues.pass) {
			return dispatch(loginReject('Password required'));
		}	
		
		if(url === '/signup' && loginValues.pass !== loginValues.rptPass) {
			return dispatch(loginReject('Passwords do not match'));
		}
		
		return $.ajax(url, {
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(loginValues)
		})
		.then(json => {
			if(json.message === 'Success') {
				location.assign('/');
			}
			dispatch(loginReject(json.message));
			return setTimeout(()=>dispatch(loginReset()),5000);
		});
			
	}
	
}

// Trash talk actions
export const SEND_TRASH_PREVIEW = 'SEND_TRASH_PREVIEW';
export const RECEIVE_TRASH_PREVIEW = 'RECEIVE_TRASH_PREVIEW';
export const GETTING_TRASH = 'GETTING_TRASH';
export const RECEIVE_TRASH = 'RECEIVE_TRASH';
export const RECEIVE_NEW_TRASH_NUM = 'RECEIVE_NEW_TRASH_NUM';

export const changePreviewUrl = (newUrl) => {
	return {
		type: 'CHANGE_PREVIEW_URL',
		newUrl
	}
};

export const showMoreTrash = (number) => {
	return {
		type: 'SHOW_MORE_TRASH',
		number
	}
};

export const cancelTrashInsert = () => {
	return {
		type: 'CANCEL_TRASH_INSERT',
	}
};

const clearTrashPreview = (newUrl) => {
	return {
		type: 'CLEAR_TRASH_PREVIEW',
		newUrl
	}
};

const sendTrashPreview = () => {
	return {
		type:'SEND_TRASH_PREVIEW'
	}
}

const gettingTrash = () => {
	return {
		type:GETTING_TRASH
	}
}

const receiveTrash = (trash) => {
	return {
		type:RECEIVE_TRASH,
		trash
	}
}

const receiveTrashPreview = (message,previewUrl) => {
	return {
		type: RECEIVE_TRASH_PREVIEW,
		message,
		previewUrl
	}
}

const receiveNewTrashNum = (newTrashNum) => {
	return {
		type: RECEIVE_NEW_TRASH_NUM,
		newTrashNum
	}
}

export function sendPreviewUrl(previewUrl) {
	
	return function(dispatch) {
		
		dispatch(sendTrashPreview());
		
		return fetch('/trashpreview', {
			method: 'POST',
			credentials:'include',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({previewUrl:previewUrl})
		})
		.then(response => {
			return response.json()
		})
		.then(json => {
			dispatch(receiveTrashPreview(json.message,previewUrl));
		});
		
	}
}

export function insertTrash(insertUrl) {
	
	return function(dispatch) {
		
		dispatch(sendTrashPreview());
		
		return fetch('/trash', {
			method: 'POST',
			credentials:'include',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({insertUrl:insertUrl})
		})
		.then(response => {
			return response.json()
		})
		.then(json => {
			if(json.message === 'OK') {
				dispatch(clearTrashPreview());
				dispatch(getTrash());
			}
		});
		
	}
}
	
export function getTrash() {
	
	return function(dispatch) {
		
		dispatch(gettingTrash());
		
		return fetchQuick('/getTrash')
		.then(json => {
			if(json.length > 0) {
				dispatch(receiveTrash(json));
			} else {
				dispatch(receiveTrash([]));
			}
		});
	}	
}

export function checkForNewTrash() {
	
	return function(dispatch) {
		
		return fetchQuick('/getTrash')
		.then(json => {
			dispatch(receiveNewTrashNum(json.length));
		});
	}	
}

// Settings actions

export const changeSettings = (newVals) => {
	return {
		type: 'CHANGE_SETTINGS',
		newVals
	}
};

const setSettingsStatus = (status) => {
	return {
		type: 'SET_SETTINGS_STATUS',
		status
	}
};

const sendSettings = () => {
	return {
		type: 'SEND_SETTINGS',
	}
};

export function updateUser(userId,names) {
	
	return function(dispatch) {
		
		dispatch(sendSettings());
		
		return fetch('/userUpdate', {
			method: 'POST',
			credentials:'include',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({userId:userId,updateFields:names})
		})
		.then(response => {
			return response.json()
		})
		.then(json => {
			dispatch(setSettingsStatus(json.message));
		});
		
	}
}