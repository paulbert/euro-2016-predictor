import React, { PropTypes } from 'react'

const TeamFlag = ({ teams, thisTeam }) => {
	
	let teamFlag = teams.filter(team => team.name === thisTeam)[0].crestUrl;
	
	return (
		<img src={teamFlag} width="50" />
	);

};

export default TeamFlag;