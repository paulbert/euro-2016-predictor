
import fetch from 'isomorphic-fetch'

export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
const loginSubmit = () => {
	return {
		type:'LOGIN_SUBMIT'
	}
};

export const loginSwitch = (switchTo) => {
	return {
		type:'LOGIN_SWITCH',
		switchTo
	}
};

export const loginChange = (changeTo,prop) => {
	return {
		type:'LOGIN_CHANGE',
		changeTo,
		prop
	}
};

export const LOGIN_REJECT = 'LOGIN_REJECT';
const loginReject = (message) => {
	return {
		type:'LOGIN_REJECT',
		message
	}
};

export function loginTry(url,loginValues) {
	
	return function(dispatch) {
		
		dispatch(loginSubmit());
		
		return fetch(url, {method:'POST', body:{user:loginValues.user,pass:loginValues.pass}})
			.then(response => response.json())
			.then(json => {
				if(json.message === 'Login success') {
					location.reload();
				}
				return dispatch(loginReject(json.message));
			});
			
	}
	
}