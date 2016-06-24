import React, { PropTypes } from 'react'
import Fixture from './Fixture'
import classnames from 'classnames'

const FixtureList = ({ fixtures, predictions, user, isCurrent, groups, matchFilter, thisUser, view, onScoreChange, onLoad, onPenaltyClick }) => {
	//onLoad();
	
	//let hideOtherUsers = !isCurrent && new Date(Date.now()) < new Date(Date.UTC(2016,5,25,13));
	let hideOtherUsers = !isCurrent && new Date(Date.UTC(2016,5,25,13)) < new Date(Date.UTC(2016,5,25,13));
	
	const setFixtureLine = fixture => {
		fixture.key = fixture.f_id || fixture.p_id;
		let defaultPrediction = {};
		defaultPrediction[fixture.homeTeamName] = null;
		defaultPrediction[fixture.awayTeamName] = null;
		const reduceToPrediction = (filtered,p,index) => { 
			if(hideOtherUsers && p.matchNum) {
				return Object.assign({},filtered);
			}
			if(p.p_id === fixture.f_id) { 
				return Object.assign({},filtered,p.prediction,(typeof p.points !== 'undefined' ? {points:p.points,bonus:p.bonus}:{}),(p.bracketPrediction ? p.bracketPrediction : {} ),{winner:p.winner,inputPrediction:p.inputPrediction,penaltyWinner:p.penaltyWinner,PKs:p.PKs});
			} else {
				return Object.assign({},filtered);
			}
		};
		let prediction = predictions.reduce(reduceToPrediction,defaultPrediction);
		let savedPrediction = user ? user.predictions.reduce(reduceToPrediction,defaultPrediction) : {};
		return <Fixture key={fixture.key} {...fixture} PKs={fixture.PKs} prediction={prediction} savedPrediction={savedPrediction} onScoreChange={onScoreChange} isCurrent={isCurrent} thisUser={thisUser} realFixture={fixture.realFixture} onPenaltyClick={onPenaltyClick} />;
	};
	
	const fixtureFilter = fixture => {
		if(matchFilter === 'all') {
			return new Date(fixture.date) < new Date(2016,5,23) ;
		} else {
			// group setter { 'name': val, 'W':0, 'D':0, 'L':0, 'GF':0, 'GA':0, 'GD':0, 'Pts':0, 'group':thisLetter }
			let fixtureGroup = groups.reduce((teamGroup, team) => {
				if(team.name === fixture.homeTeamName) {
					return team.group;
				}
				return teamGroup;
			},'');
			if(fixtureGroup === matchFilter) {
				return true;
			}
			return false;
		}
	}
	
	const reformatBracket = fixture => Object.assign({},fixture,{f_id:fixture.p_id,result:{goalsHomeTeam:null,goalsAwayTeam:null},status:'TIMED'});
	
	const bracketFilter = prediction => prediction.matchNum;
	
	const bracketReduceTo = (matchNum,prediction) => {
		if(matchNum === prediction.matchNum) {
			return prediction.winner || '';
		}
		return matchNum;
	};
	
	// Bracket fixture example
	//{ 'date': new Date(Date.UTC(2016,5,30,19)), 'matchNum':9, 'homeTeamName': '', 'awayTeamName': '', homeTeamIs:1, awayTeamIs:3, placeholder: 'QF' }
	
	const bracketUpdateWinners = fixture => {
		let homeWinner = '';
		let awayWinner = '';
		if(!hideOtherUsers && fixture.matchNum) {
			if(user) {
				if(fixture.homeTeamIs) {
					homeWinner = predictions.reduce(bracketReduceTo,fixture.homeTeamIs) || user.predictions.reduce(bracketReduceTo,fixture.homeTeamIs);
					fixture.homeTeamName = typeof homeWinner === 'string' ? homeWinner : fixture.homeTeamName;
					awayWinner = predictions.reduce(bracketReduceTo,fixture.awayTeamIs) || user.predictions.reduce(bracketReduceTo,fixture.awayTeamIs);
					fixture.awayTeamName = typeof awayWinner === 'string' ? awayWinner : fixture.awayTeamName;
				}
			}
		}
		return fixture;
	};
	
	const bracketAddRealFixture = bracketFixture => {
		const matchFixture = fixture => fixture.date === bracketFixture.date;
		
		let realFixture = fixtures.filter(matchFixture)[0];
		
		return Object.assign({},bracketFixture,{realFixture:realFixture});
		
	}
	
	let unsignedUser = (isCurrent && thisUser === '');
	let predictionsClass = { 'text-center': true, 'hidden': unsignedUser };
	let hideThisMobile = view.mobile !== 'fixtures';
	let colClasses = { 'col-md-6':true, 'col-xs-12':true, 'hidden-xs':hideThisMobile, 'hidden-sm':hideThisMobile };
	
	return (
	
	<div className={classnames(colClasses)}>
	<table className="table fixture-list">
		<thead>
			<tr>
				<td colSpan="1">Date</td>
				<td colSpan={unsignedUser ? 2: 3}>Team 1</td>
				<td colSpan={unsignedUser ? 2: 3}>Team 2</td>
				<td colSpan="1" className={classnames(predictionsClass)}>Predictions</td>
				<td colSpan="1" className="text-center">{unsignedUser ? 'Score' : 'Actual'}</td>
			</tr>
		</thead>
		<tbody>
			{fixtures.filter(fixtureFilter).map(setFixtureLine)}
			{predictions.filter(bracketFilter).map(reformatBracket).map(bracketUpdateWinners).map(bracketAddRealFixture).map(setFixtureLine)}
		</tbody>
	</table>
	</div>
)}

FixtureList.propTypes = {
	fixtures: PropTypes.arrayOf(PropTypes.shape({
		_links:PropTypes.shape({
			self:PropTypes.object,
			soccerseason:PropTypes.object,
			hometeam:PropTypes.object,
			awayTeam:PropTypes.object
		}),
		date:PropTypes.string,
		status:PropTypes.string,
		matchday:PropTypes.number,
		homeTeamName:PropTypes.string.isRequired,
		awayTeamName:PropTypes.string.isRequired,
		result:PropTypes.object
	}).isRequired).isRequired
};

export default FixtureList;
		