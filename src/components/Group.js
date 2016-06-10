import React, { PropTypes } from 'react'
import GroupLine from './GroupLine'
import rankCalcs from '../rank-calculations/rankCalcs'

const Group = ({ groups,savedPredictions,groupLetter }) => {
	
	const groupTeams = rankCalcs.fullSort(groups.filter((val,ind,arr) => val.group === groupLetter),savedPredictions);
	
	return (
	
	<table className="table">
		<thead>
			<tr>
				<td className="col-xs-4">Group {groupLetter}</td>
				<td className="col-xs-1">P</td>
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