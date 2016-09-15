import React, { PropTypes } from 'react'
import classnames from 'classnames'

const MobileHeader = ({ view, user, onSelectChange }) => {
	
	let groupClass = { 'hidden': (view.mobile !== 'groups' && view.mobile !== 'bracket'), 'form-control':true, 'bottom-space':true };
	
	return (
	<div className="col-xs-12 visible-xs visible-sm">
		<select className="form-control bottom-space" onChange={(e) => onSelectChange({'mobile':e.target.value,'type':e.target.value,'actual':!user})}>
			<option value="fixtures">View Fixtures</option>
			<option value="groups">View Groups</option>
			<option value="bracket">View Bracket</option>
			<option value="scores">View Scores</option>
		</select>
		{(() => {
			if(user) {
				return (
				<select className={classnames(groupClass)} onChange={(e) => onSelectChange({'actual':e.target.value === 'actual'})} value={view.actual ? 'actual' : 'predicted'}>
					<option value="predicted">Predicted</option>
					<option value="actual">Actual</option>
				</select>
			)}
		})()}
	</div>
)}

export default MobileHeader;