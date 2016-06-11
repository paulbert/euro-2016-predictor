import React, { PropTypes } from 'react'
import TeamContain from '../containers/TeamContain'
import classnames from 'classnames'

const Fixture = ({ _links, f_id, date, status, matchday, homeTeamName, awayTeamName, result, prediction, savedPrediction, onScoreChange}) => {
	let reformatDate = new Date(date);
	let dateString = (reformatDate.getMonth() + 1) + '/' + reformatDate.getDate();
	
	let today = new Date(Date.now());
	
	today.setHours( today.getHours() );
	
	let inputClassObj = { 'score-box':true, 'hidden': false }
	//inputClassObj.hidden = today > reformatDate;
	let inputClass = classnames(inputClassObj);
	
	let iconClassObj = { 'glyphicon':true,'glyphicon-ok':false,'glyphicon-remove':false,'glyphicon-star':false,'hidden':true }
	if(typeof savedPrediction.points !== 'undefined') {
		iconClassObj.hidden = false;
		if(savedPrediction.points > 0) {
			iconClassObj['glyphicon-ok'] = true;
			if(savedPrediction.bonus) {
				iconClassObj['glyphicon-ok'] = false;
				iconClassObj['glyphicon-star'] = true;
			}
		} else {
			iconClassObj['glyphicon-remove'] = true;
		}
	}
	let iconClass = classnames(iconClassObj);
	
	return (
		<tr>
			<td className="col-xs-1">{dateString}</td>
			<td className="col-xs-1"><TeamContain team={homeTeamName} /></td>
			<td className="col-xs-2">{homeTeamName}</td>
			<td className="col-xs-1"><input className={inputClass} type="number" min="0" step="1" onChange={(e) => onScoreChange(f_id,homeTeamName,e.target.value)}/></td>
			<td className="col-xs-1"><TeamContain team={awayTeamName} /></td>
			<td className="col-xs-2">{awayTeamName}</td>
			<td className="col-xs-1"><input className={inputClass} type="number" min="0" step="1" onChange={(e) => onScoreChange(f_id,awayTeamName,e.target.value)}/></td>
			<td className="col-xs-2 text-center">
				{savedPrediction[homeTeamName]}-{savedPrediction[awayTeamName]}
				<span className={iconClass} aria-hidden="true"></span>
			</td>
			<td className="col-xs-1 text-center">{result.goalsHomeTeam}-{result.goalsAwayTeam}</td>
		</tr>
	)
}


Fixture.propTypes = {
	date:PropTypes.string,
	status:PropTypes.string,
	matchday:PropTypes.number,
	homeTeamName:PropTypes.string.isRequired,
	awayTeamName:PropTypes.string.isRequired,
	result:PropTypes.object
};

export default Fixture;