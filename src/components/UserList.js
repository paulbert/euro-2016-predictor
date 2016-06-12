import React, { PropTypes } from 'react'
import User from './User'

const UserList = ({ users }) => {
	return (
	<div className="col-md-6">
	<table className="table">
		<thead>
			<tr>
				<td colSpan="6">Name</td>
				<td colSpan="4">Top Scorer Pick</td>
				<td colSpan="2" className="text-center">Score</td>
			</tr>
		</thead>
		<tbody>
			{users.sort((a,b) => b.totalScore - a.totalScore).map(user => <User key={user._id} {...user} />)}
		</tbody>
	</table>
	</div>
)};

export default UserList;