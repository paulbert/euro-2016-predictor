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
	
		<form onSubmit={(e) => { e.preventDefault(); return onSubmitClick('/login',loginValues);}}>
			<div className="form-group">
				<label className="control-label">Username:</label>
				<input type="text" className="form-control" onChange={(e) => loginValues = loginChange(e.target.value,'name')} />
			</div>
			<div className="form-group">
				<label className="control-label">Password:</label>
				<input type="password" className="form-control" onChange={(e) => loginValues = loginChange(e.target.value,'pass')} />
			</div>
			<button type="submit" className="btn btn-default">Login</button>
		</form>
		
	);
	loginViews.signup = () => (
		<form onSubmit={(e) => { e.preventDefault(); return onSubmitClick('/signup',loginValues);}}>
			<div className="form-group">
				<label className="control-label">Username:</label>
				<input type="text" className="form-control" onChange={(e) => loginValues = loginChange(e.target.value,'name')} />
			</div>
			<div className="form-group">
				<label className="control-label">Password:</label>
				<input type="password" className="form-control" onChange={(e) => loginValues = loginChange(e.target.value,'pass')} />
			</div>
			<div className="form-group">
				<label className="control-label">Repeat Password:</label>
				<input type="password" className="form-control" onChange={(e) => loginValues = loginChange(e.target.value,'rptPass')} />
			</div>
			<div className="form-group">
				<label className="control-label">Team Name:</label>
				<input type="text" className="form-control" onChange={(e) => loginValues = loginChange(e.target.value,'teamName')} />
			</div>
			<div className="form-group">
				<label className="control-label">Golden Boot Prediction:</label>
				<input type="text" className="form-control" onChange={(e) => loginValues = loginChange(e.target.value,'gbPred')} />
			</div>
			<div className="form-group">
				<label className="control-label">League Code:</label>
				<input type="password" className="form-control" onChange={(e) => loginValues = loginChange(e.target.value,'leagueCode')} />
			</div>
			<button type="submit" className="btn btn-default">Login</button>
		</form>
	);
	let ThisView = loginViews[loginView];
	return ( 
		<div>
			<Alert />
			<ThisView />
			<div>
				<a href="" onClick={(e) => { 
					e.preventDefault(); 
					return onSwitchClick(switchTo);
				}}>{thisMessage}</a>
			</div>
		</div>
	);
};

LoginForm = connect()(LoginForm);

export default LoginForm;