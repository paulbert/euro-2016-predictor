import React, { PropTypes } from 'react'
import TeamContain from '../containers/TeamContain'
import BracketTier from './BracketTier'
import classnames from 'classnames'
import BracketWinner from './BracketWinner'

const BracketGame = ({ bracketPredictions, bracketForm, matchNum }) => {
	
	// TODO: Reformat fixtures to have a matchNum
	/*
	const reformatFixtures = (fixture) => {
		var prediction = {};
		prediction[fixture.homeTeamName] = fixture.result.goalsHomeTeam;
		prediction[fixture.awayTeamName] = fixture.result.goalsAwayTeam;
		return Object.assign({},fixture,{prediction:prediction});
	};*/
	
	let thisPrediction = bracketPredictions.filter(p => p.matchNum === matchNum)[0];
	let thisGame = bracketForm.filter(f => f.matchNum === matchNum)[0];
	
	let homeTeamScore = '',
		awayTeamScore = '',
		tempResult = {};
	
	if(thisPrediction.prediction) {
		homeTeamScore = thisPrediction.prediction[thisPrediction.homeTeamName];
		awayTeamScore = thisPrediction.prediction[thisPrediction.awayTeamName];
	} else if(thisPrediction.result) {
		tempResult = thisPrediction.result.extraTime ? thisPrediction.result.extraTime : thisPrediction.result;
		homeTeamScore = tempResult.goalsHomeTeam;
		awayTeamScore = tempResult.goalsAwayTeam;
	}
	
	return (
	<div className="game">
		<span className="tree-label">
			<div className="bracket-team">
				<TeamContain team={thisPrediction ? thisPrediction.homeTeamName : thisGame.homeTeamName} />
				<span className="score">{homeTeamScore}</span>
				<span className="penalty-mark">{(thisPrediction.penaltyWinner === 'home' && thisPrediction.PKs) ? '*':''}</span>
			</div>
			<div className="bracket-team">
				<TeamContain team={thisPrediction ? thisPrediction.awayTeamName : thisGame.awayTeamName} />
				<span className="score">{awayTeamScore}</span>
				<span className="penalty-mark">{(thisPrediction.penaltyWinner === 'away' && thisPrediction.PKs) ? '*':''}</span>
			</div>
		</span>
		<BracketWinner bracketPredictions={bracketPredictions} matchNum={matchNum} />
		<BracketTier bracketPredictions={bracketPredictions} bracketForm={bracketForm} matchNumOne={thisGame.homeTeamIs} matchNumTwo={thisGame.awayTeamIs} />
	</div>
)}

export default BracketGame;