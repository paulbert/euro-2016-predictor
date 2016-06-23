import React, { PropTypes } from 'react'
import BracketGame from './BracketGame'
import BracketWinner from './BracketWinner'
import classnames from 'classnames'
import { initPredictions } from '../reducers/initStateCalcs.js'

const Bracket = ({ user, fixtures, view, predictionsTemplate, isCurrent }) => {
	
	// TODO: Reformat fixtures to have a matchNum
	/*
	const reformatFixtures = (fixture) => {
		var prediction = {};
		prediction[fixture.homeTeamName] = fixture.result.goalsHomeTeam;
		prediction[fixture.awayTeamName] = fixture.result.goalsAwayTeam;
		return Object.assign({},fixture,{prediction:prediction});
	};*/
	
	let hideOtherUsers = !isCurrent && new Date(Date.now()) < new Date(Date.UTC(2016,5,25,13));
	
	const filterToBracket = p => p.matchNum > 0;
	let bracketPredictions = (user ? (user.predictions.filter(filterToBracket)) : []);
	let bracketTemplate = initPredictions.filter(filterToBracket);
	
	const bracketReduceTo = (matchNum,prediction) => {
		if(matchNum === prediction.matchNum) {
			return prediction.winner || '';
		}
		return matchNum;
	};
	
	const bracketUpdateWinners = fixture => {
		let homeWinner = '';
		let awayWinner = '';
		
			if(user) {
				if(fixture.homeTeamIs) {
					homeWinner = bracketPredictions.reduce(bracketReduceTo,fixture.homeTeamIs);
					fixture.homeTeamName = typeof homeWinner === 'string' ? homeWinner : fixture.homeTeamName;
					awayWinner = bracketPredictions.reduce(bracketReduceTo,fixture.awayTeamIs);
					fixture.awayTeamName = typeof awayWinner === 'string' ? awayWinner : fixture.awayTeamName;
				}
			}
		
		return fixture;
	};
	
	const replaceWithPrediction = (prediction,fixture) => {
		if(prediction.matchNum === fixture.matchNum) {
			return Object.assign({},prediction,fixture);
		}
		return prediction;
	};
	
	const checkTemplate = (template) => {
		if(bracketPredictions.length > 0) {
			return bracketPredictions.reduce(replaceWithPrediction,template);
		}
		return template;
	};
	
	if(!hideOtherUsers) {
		bracketPredictions = bracketTemplate.map(checkTemplate).map(bracketUpdateWinners);
	} else {
		bracketPredictions = bracketTemplate;
	}
	
	let hideThisMobile = view.mobile !== 'bracket';
	let colClasses = { 'col-md-6':true, 'col-xs-12':true, 'hidden':view.type !== 'bracket', 'hidden-xs':hideThisMobile, 'hidden-sm':hideThisMobile };
	
	const bracketFilter = prediction => prediction.matchNum;
	
	let bracketForm = predictionsTemplate.filter(bracketFilter);
	
	return (
	<div className={classnames(colClasses)}>
		<div className="bracket">
			<BracketGame bracketPredictions={bracketPredictions} bracketForm={bracketForm} matchNum={15} />
		</div>
	</div>
)}

export default Bracket;