import React, { PropTypes } from 'react'
import TeamContain from '../containers/TeamContain'

const Fixture = ({ date, status, matchday, homeTeamName, awayTeamName, result, p_id, prediction, onScoreChange}) => (
	<tr>
		<td><TeamContain team={homeTeamName} /></td>
		<td>{homeTeamName}</td>
		<td><input className="score-box" type="number" min="0" step="1" onChange={(e) => onScoreChange(p_id,homeTeamName,e.target.value)}/></td>
		<td>v</td>
		<td><TeamContain team={awayTeamName} /></td>
		<td><input className="score-box" type="number" min="0" step="1" onChange={(e) => onScoreChange(p_id,awayTeamName,e.target.value)}/></td>
		<td>{awayTeamName}</td>
		<td>{prediction[homeTeamName]}-{prediction[awayTeamName]}</td>
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