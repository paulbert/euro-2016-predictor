
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
		
		return fetch(url, {
			method: 'POST',
			credentials:'include',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
			},
			body: JSON.stringify({
				'user': loginValues.user,
				'pass': loginValues.pass
			})})
			.then(response => {
				console.log(response.headers.has("Set-Cookie"));
				return response.json()
			})
			.then(json => {
				if(json.message === 'Login success') {
					location.reload();
				}
				return dispatch(loginReject(json.message));
			});
			
	}
	
}