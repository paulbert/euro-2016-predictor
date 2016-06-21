import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

let Settings = ({user,names,settingsStatus,onSettingsSubmit}) => {
	
	const setSetting = (inputted,saved,key) => inputted[key] || (saved ? saved[key] : '');
	
	let alertClasses = { 'alert': true, 'alert-danger': true, 'alert-success':false, 'hidden':true };
	if(settingsStatus !== '' && settingsStatus !== 'waiting') {
		alertClasses.hidden = false;
	}
	if(settingsStatus === 'Success') {
		alertClasses = Object.assign({},alertClasses,{'alert-danger':false,'alert-success':true});
	}
	const Alert = () => (
		<div className={alertClasses} role="alert">{settingsStatus}</div>
	);
	
	let settingsValues = names;
	
	const settingsChange = (val,prop) => {
		let newValue = {};
		newValue[prop] = val;
		settingsValues = Object.assign({},settingsValues,newValue);
	};
	
	alertClasses = classnames(alertClasses);
	
	let ThisView = () => (
		<form onSubmit={(e) => { e.preventDefault(); return onSettingsSubmit(user._id,settingsValues);}}>
			<div className="form-group">
				<label className="control-label">Your Name:</label>
				<input type="text" className="form-control" defaultValue={setSetting(names,user,'nameName')} onChange={(e) => settingsChange(e.target.value,'nameName')} />
			</div>
			<div className="form-group">
				<label className="control-label">Team Name:</label>
				<input type="text" className="form-control" defaultValue={setSetting(names,user,'teamName')} onChange={(e) => settingsChange(e.target.value,'teamName')} />
			</div>
			<button type="submit" className="btn btn-default">Update Names</button>
		</form>
	);
	return ( 
		<div className="col-xs-12 col-md-6 col-lg-4">
			<Alert />
			<ThisView />
		</div>
	);
};

export default Settings;