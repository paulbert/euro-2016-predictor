import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

const FullHeader = ({ loggedIn, view, onMenuClick }) => {
	
	let loginClass = { 'hidden': loggedIn };
	let menuClass = { 'hidden': !loggedIn };
	let settingsClass = { 'hidden': !loggedIn, 'big-cog': true, 'hidden-sm':true, 'hidden-xs':true };
	let mobileSettingsClass = { 'hidden': !loggedIn, 'visible-sm':true, 'visible-xs':true };
	
	let dropdownClass = {'collapse':true,'navbar-collapse':true,'in':view};
	
	return (
	<nav className="navbar navbar-default navbar-static-top navbar-background">
		<div className="navbar-header visible-xs">
			<a className="navbar-brand" onClick={() => onMenuClick({'menu':!view})}>Menu</a>
		</div>
		<div className={classnames(dropdownClass)}>
			<ul className="nav navbar-nav">
				<li className={classnames(menuClass)}><Link to="/" onClick={() => onMenuClick({'menu':false})}>Your Predictions</Link></li>
				<li className={classnames(menuClass)}><Link to="/trash" onClick={() => onMenuClick({'menu':false})}>Trash Talk</Link></li>
				<li className={classnames(mobileSettingsClass)}><Link to="/settings" onClick={() => onMenuClick({'menu':false})}>Settings</Link></li>
				<li className={classnames(loginClass)}><Link to="/" onClick={() => onMenuClick({'menu':false})}>Matches</Link></li>
			</ul>
			<ul className="nav navbar-nav navbar-right">
				<li className={classnames(loginClass)}><Link to="/login" onClick={() => onMenuClick({'menu':false})}>Login</Link></li>
				<li className={classnames(settingsClass)}><Link to="/settings"><span className="glyphicon glyphicon-cog"></span></Link></li>
			</ul>
		</div>
	</nav>
)}

export default FullHeader;

//<li><Link to="/trash">Table</Link></li>