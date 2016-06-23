import React, { PropTypes } from 'react'
import TeamContain from '../containers/TeamContain'
import classnames from 'classnames'

const BracketWinner = ({ bracketPredictions, matchNum }) => {
	
	// TODO: Reformat fixtures to have a matchNum
	/*
	const reformatFixtures = (fixture) => {
		var prediction = {};
		prediction[fixture.homeTeamName] = fixture.result.goalsHomeTeam;
		prediction[fixture.awayTeamName] = fixture.result.goalsAwayTeam;
		return Object.assign({},fixture,{prediction:prediction});
	};*/
	
	let finalPrediction = bracketPredictions.filter(p => p.matchNum === 15)[0];
	
	if(finalPrediction.winner && matchNum === 15) {
		return (
		<div className="winner-contain">
			<span>Euro 2016 Champion:</span>
			<span className="winner">
				<div className="winner-top"><span className="champ-name"><strong>{finalPrediction.winner}</strong></span></div>
				<div className="winner-bottom"><span className="flag-contain"><TeamContain team={finalPrediction.winner} /></span></div>
			</span>
		</div>
	)
	} else if(matchNum === 15) {
		return (
		<div className="winner-contain">
			<span>Euro 2016 Champion:</span>
		</div>
	)
	} else {
		return (
		<span></span>
	)
	}
	
}

export default BracketWinner;