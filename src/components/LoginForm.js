import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

let LoginForm = ({loginView,loginStatus,invalidMessage,loginCreds,onSwitchClick,onSubmitClick}) => {
	let thisMessage = loginView === 'signup' ? 'Already signed up?' : 'Need to sign up?';
	let switchTo = loginView === 'signup' ? 'login' : 'signup';
	let loginViews = {};
	let loginValues = loginCreds;
	let alertClasses = { 'alert': true, 'alert-danger': true, 'alert-success':false, 'hidden':(invalidMessage === '') };
	if(loginStatus === 'invalid') {
		alertClasses.hidden = false;
	}
	if(invalidMessage === 'Success') {
		alertClasses = Object.assign({},alertClasses,{'alert-danger':false,'alert-success':true});
	}
	
	const loginChange = (val,prop) => {
		let newValue = {};
		newValue[prop] = val;
		return Object.assign({},loginValues,newValue);
	};
	const Alert = () => (
		<div className={alertClasses} role="alert">{invalidMessage}</div>
	);
	const clickAction = (url) => onSubmitClick(url,loginValues);
	
	alertClasses = classnames(alertClasses);
	
	loginViews.login = () => (
	
		<form onSubmit={(e) => { e.preventDefault(); return clickAction('/login');}}>
			<div className="form-group">
				<label className="control-label">Username:</label>
				<input type="text" className="form-control" defaultValue={loginValues.name} onChange={(e) => loginValues = loginChange(e.target.value,'name')} />
			</div>
			<div className="form-group">
				<label className="control-label">Password:</label>
				<input type="password" className="form-control" defaultValue={loginValues.pass} onChange={(e) => loginValues = loginChange(e.target.value,'pass')} />
			</div>
			<button type="submit" className="btn btn-default">Login</button>
		</form>
		
	);
	loginViews.signup = () => (
		<form onSubmit={(e) => { e.preventDefault(); return clickAction('/signup');}}>
			<div className="form-group">
				<label className="control-label">Username:</label>
				<input type="text" className="form-control" defaultValue={loginValues.name} onChange={(e) => loginValues = loginChange(e.target.value,'name')} />
			</div>
			<div className="form-group">
				<label className="control-label">Password:</label>
				<input type="password" className="form-control" defaultValue={loginValues.pass} onChange={(e) => loginValues = loginChange(e.target.value,'pass')} />
			</div>
			<div className="form-group">
				<label className="control-label">Repeat Password:</label>
				<input type="password" className="form-control" defaultValue={loginValues.rptPass} onChange={(e) => loginValues = loginChange(e.target.value,'rptPass')} />
			</div>
			<div className="form-group">
				<label className="control-label">Team Name:</label>
				<input type="text" className="form-control" defaultValue={loginValues.teamName} onChange={(e) => loginValues = loginChange(e.target.value,'teamName')} />
			</div>
			<div className="form-group">
				<label className="control-label">Golden Boot Prediction:</label>
				<input type="text" className="form-control" defaultValue={loginValues.gbPred} onChange={(e) => loginValues = loginChange(e.target.value,'gbPred')} />
			</div>
			<div className="form-group">
				<label className="control-label">League Code:</label>
				<input type="password" className="form-control" defaultValue={loginValues.leagueCode} onChange={(e) => loginValues = loginChange(e.target.value,'leagueCode')} />
			</div>
			<button type="submit" className="btn btn-default">Login</button>
		</form>
	);
	let ThisView = loginViews[loginView];
	return ( 
		<div className="col-xs-12 col-md-6 col-lg-4">
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