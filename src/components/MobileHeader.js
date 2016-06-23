import React, { PropTypes } from 'react'
import classnames from 'classnames'

const MobileHeader = ({ view, onSelectChange }) => {
	
	let groupClass = { 'hidden': view.mobile !== 'groups', 'form-control':true, 'bottom-space':true };
	
	return (
	<div className="col-xs-12 visible-xs visible-sm">
		<select className="form-control bottom-space" onChange={(e) => onSelectChange({'mobile':e.target.value,'type':e.target.value})}>
			<option value="fixtures">View Fixtures</option>
			<option value="groups">View Groups</option>
			<option value="bracket">View Bracket</option>
			<option value="scores">View Scores</option>
		</select>
		<select className={classnames(groupClass)} onChange={(e) => onSelectChange({'actual':e.target.value})}>
			<option value="">Predicted</option>
			<option value="true">Actual</option>
		</select>
	</div>
)}

export default MobileHeader;