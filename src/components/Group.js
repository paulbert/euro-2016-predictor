import React, { PropTypes } from 'react'
import GroupLine from './GroupLine'

const Group = ({ groups,groupLetter }) => {
	
	const groupTeams = groups.filter((val,ind,arr) => val.group === groupLetter);
	
	return (
	
	<table className="table">
		<thead>
			<tr>
				<td className="col-xs-4">Group {groupLetter}</td>
				<td className="col-xs-1">W</td>
				<td className="col-xs-1">D</td>
				<td className="col-xs-1">L</td>
				<td className="col-xs-1">GF</td>
				<td className="col-xs-1">GA</td>
				<td className="col-xs-1">GD</td>
				<td className="col-xs-1">Pts</td>
			</tr>
		</thead>
		<tbody>
			{groupTeams.map(team => {
					return <GroupLine key={team.name} name={team.name} {...team} />;
				}
			)}
		</tbody>
	</table>
	
)}

export default Group;