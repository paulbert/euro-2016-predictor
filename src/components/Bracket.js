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
	const assignWinner = fixture => {
		let winner = '',
			winnerObj = {},
			penaltyWinner = '';
		if(fixture.status === 'FINISHED') {
			winner = fixture.result.goalsHomeTeam > fixture.result.goalsAwayTeam ? fixture.homeTeamName : (fixture.result.goalsAwayTeam > fixture.result.goalsHomeTeam ? fixture.awayTeamName : 'draw');
			if(winner === 'draw') {
				winner = fixture.result.extraTime.goalsHomeTeam > fixture.result.extraTime.goalsAwayTeam ? fixture.homeTeamName : (fixture.result.extraTime.goalsAwayTeam > fixture.result.extraTime.goalsHomeTeam ? fixture.awayTeamName : 'draw');
				if(winner === 'draw') {
					winner = fixture.result.penaltyShootout.goalsHomeTeam > fixture.result.penaltyShootout.goalsAwayTeam ? fixture.homeTeamName : fixture.awayTeamName;
					penaltyWinner = fixture.result.penaltyShootout.goalsHomeTeam > fixture.result.penaltyShootout.goalsAwayTeam ? 'home' : 'away';
					winnerObj = {penaltyWinner:penaltyWinner,PKs:true};
				}
			}
			winnerObj = Object.assign({},winnerObj,{winner:winner});
			return Object.assign({},fixture,winnerObj);
		}
		return fixture;
	}
	
	let bracketPredictions = (user ? (user.predictions.filter(filterToBracket)) : []);
	let bracketTemplate = initPredictions().filter(filterToBracket);
	
	const assignMatchNumToFixture = f => {
		const matchFixtureToBracket = b => f.date === b.date;
		let bracketF = bracketTemplate.filter(matchFixtureToBracket)[0];
		if(bracketF) {
			let addProps = {matchNum:bracketF.matchNum};
			if(bracketF.homeTeamIs) {
				addProps.homeTeamIs = bracketF.homeTeamIs;
				addProps.awayTeamIs = bracketF.awayTeamIs;
			}
			return Object.assign({},f,addProps);
		}
		return f;
	};	
			
	let bracketFixtures = fixtures.map(assignMatchNumToFixture).filter(filterToBracket).map(assignWinner);
	
	const bracketReduceTo = (matchNum,match) => {
		if(matchNum === match.matchNum) {
			//if(actual) {
			//	return bracketFixtures.reduce(
			return match.winner || '';
		}
		return matchNum;
	};
	
	const bracketUpdateWinners = fixture => {
		let homeWinner = '',
			awayWinner = '',
			bracketToUpdate;
		
		if(view.actual) {
			bracketToUpdate = bracketFixtures;
		} else {
			bracketToUpdate = bracketPredictions;
		}
		
		if(user && !fixture.homeTeamName) {
			if(fixture.homeTeamIs) {
				homeWinner = bracketToUpdate.reduce(bracketReduceTo,fixture.homeTeamIs);
				fixture.homeTeamName = typeof homeWinner === 'string' ? homeWinner : fixture.homeTeamName;
				awayWinner = bracketToUpdate.reduce(bracketReduceTo,fixture.awayTeamIs);
				fixture.awayTeamName = typeof awayWinner === 'string' ? awayWinner : fixture.awayTeamName;
			}
		}
		
		return fixture;
	};
	
	const replaceWithPrediction = (template,prediction) => {
		if(template.matchNum === prediction.matchNum) {
			return Object.assign({},template,prediction);
		}
		return template;
	};
	
	const replaceWithFixture = (template,fixture) => {
		if(template.date === fixture.date) {
			return Object.assign({},template,fixture);
		}
		return template;
	};
	
	const checkTemplate = (template) => {
		if(view.actual) {
			if(bracketFixtures.length > 0) {
				return bracketFixtures.reduce(replaceWithFixture,template);
			}
		} else {
			if(bracketPredictions.length > 0) {
				return bracketPredictions.reduce(replaceWithPrediction,template);
			}
		}
		return template;
	};
	
	if(!hideOtherUsers || view.actual) {
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