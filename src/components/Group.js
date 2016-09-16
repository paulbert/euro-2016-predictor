import React, { PropTypes } from 'react'
import GroupLine from './GroupLine'
import rankCalcs from '../rank-calculations/rankCalcs'

const Group = ({ groups,groupLetter,thirdPlace }) => {
	
	let groupHeader = 'Third Place';
	let groupTeams = [];
	
	if(groupLetter !== 'Third Place') {
		groupTeams = groups.filter((val,ind,arr) => val.group === groupLetter);
		groupHeader = 'Group ' + groupLetter;
	} else {
		groupTeams = groups;
	}
	
	// group setter { 'name': val, 'W':0, 'D':0, 'L':0, 'GF':0, 'GA':0, 'GD':0, 'Pts':0, 'group':thisLetter }
	const groupMap = (team,ind,groupTeams) => {
		const inTopFour = (found,thirdPlaceTeam,ind,thirdPlace) => {
			if(team.name === thirdPlaceTeam.name && ind < 4) {
				return true;
			}
			return found;
		}
		
		let colorRow = ind < 2 || thirdPlace.reduce(inTopFour,false);
		return <GroupLine key={team.name} name={team.name} {...team} colorRow={colorRow} />
		
	}
	
	return (
	<div className="table-container">
	<table className="table group-table">
		<thead>
			<tr>
				<td className="col-xs-4">{groupHeader}</td>
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
			{groupTeams.map(groupMap)}
		</tbody>
	</table>
	</div>
)}

export default Group;