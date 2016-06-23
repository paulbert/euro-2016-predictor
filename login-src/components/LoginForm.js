import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

let LoginForm = ({loginView,loginStatus,invalidMessage,onSwitchClick,onSubmitClick}) => {
	let thisMessage = loginView === 'signup' ? 'Already signed up?' : 'Need to sign up?';
	let switchTo = loginView === 'signup' ? 'login' : 'signup';
	let loginViews = {};
	let loginValues = {name:'',pass:'',rptPass:'',teamName:'',gbPred:'',leagueCode:''};
	let alertClasses = classnames({ 'alert': true, 'alert-danger': true, 'alert-success':false, 'hidden':(invalidMessage === '') });
	if(loginStatus === 'invalid') {
		alertClasses.hidden = false;
	}
	
	const loginChange = (val,prop) => {
		let newValue = {};
		newValue[prop] = val;
		return Object.assign({},loginValues,newValue);
	};
	const Alert = () => (
		<div className={alertClasses} role="alert">{invalidMessage}</div>
	);
	loginViews.login = () => (
	
		<form onSubmit={(e) => { e.preventDefault(); return onSubmitClick('/reset',loginValues);}}>
			<div className="form-group">
				<label className="control-label">Password:</label>
				<input type="password" className="form-control" onChange={(e) => loginValues = loginChange(e.target.value,'pass')} />
			</div>
			<div className="form-group">
				<label className="control-label">Repeat Password:</label>
				<input type="password" className="form-control" onChange={(e) => loginValues = loginChange(e.target.value,'rptPass')} />
			</div>
			<button type="submit" className="btn btn-default">Login</button>
		</form>
		
	);
	let ThisView = loginViews[loginView];
	return ( 
		<div>
			<Alert />
			<ThisView />
		</div>
	);
};

LoginForm = connect()(LoginForm);

export default LoginForm;