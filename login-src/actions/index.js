
import fetch from 'isomorphic-fetch'
import $ from 'jquery'

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
		
		return $.ajax(url, {
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(loginValues)
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