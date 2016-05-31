import React, { PropTypes } from 'react'
import TeamContain from '../containers/TeamContain'

const Fixture = ({ date, status, matchday, homeTeamName, awayTeamName, result }) => (
	<tr>
		<td><TeamContain team={homeTeamName} /></td>
		<td>{homeTeamName}</td>
		<td>v</td>
		<td><TeamContain team={awayTeamName} /></td>
		<td>{awayTeamName}</td>
	</tr>
)


Fixture.propTypes = {
	date:PropTypes.string,
	status:PropTypes.string,
	matchday:PropTypes.number,
	homeTeamName:PropTypes.string.isRequired,
	awayTeamName:PropTypes.string.isRequired,
	result:PropTypes.object
};

export default Fixture;