
import fetch from 'isomorphic-fetch'

export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const LOGIN_SWITCH = 'LOGIN_SWITCH';
export const LOGIN_REJECT = 'LOGIN_REJECT';
export const LOGIN_RESET = 'LOGIN_RESET';

const loginSubmit = () => {
	return {
		type:LOGIN_SUBMIT
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
}
// loginValues = {name:'',pass:'',rptPass:'',teamName:'',leagueCode:''};
export function loginTry(url,loginValues) {
	
	return function(dispatch) {
		
		dispatch(loginSubmit());
		
		if(url === '/signup' && loginValues.pass !== loginValues.rptPass) {
			return dispatch(loginReject('Passwords do not match'));
		}
		
		return fetch(url, {
			method: 'POST',
			credentials:'include',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(loginValues)
		})
		.then(response => {
			return response.json()
		})
		.then(json => {
			if(json.message === 'Success') {
				location.reload();
			}
			dispatch(loginReject(json.message));
			return setTimeout(()=>dispatch(loginReset()),5000);
		});
			
	}
	
}