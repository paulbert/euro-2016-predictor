import React, { PropTypes } from 'react'
import User from './User'
import classnames from 'classnames'

const UserList = ({ users, view, onUserClick }) => {
	
	let colClasses = { 'col-md-6':true, 'hidden':view.type !== 'scores', 'hidden-xs':true };
	
	return (
	<div className={classnames(colClasses)}>
	<table className="table table-hover">
		<thead>
			<tr>
				<td colSpan="6">Name</td>
				<td colSpan="4">Top Scorer Pick</td>
				<td colSpan="2" className="text-center">Score</td>
			</tr>
		</thead>
		<tbody>
			{users.sort((a,b) => b.totalScore - a.totalScore).map(user => <User key={user._id} id={user._id} {...user} onUserClick={onUserClick} />)}
		</tbody>
	</table>
	</div>
)};

export default UserList;