import React, { PropTypes } from 'react'
import Fixture from './Fixture'
import classnames from 'classnames'

const FixtureList = ({ fixtures, predictions, user, isCurrent, groups, matchFilter, thisUser, view, onScoreChange, onLoad }) => {
	//onLoad();
	
	const setFixtureLine = fixture => {
		fixture.key = fixture.f_id;
		let defaultPrediction = {};
		defaultPrediction[fixture.homeTeamName] = null;
		defaultPrediction[fixture.awayTeamName] = null;
		const reduceToPrediction = (filtered,p,index) => { 
			if(p.p_id === fixture.f_id) 
			{ 
				return Object.assign({},filtered,p.prediction,(typeof p.points !== 'undefined' ? {points:p.points,bonus:p.bonus}:{}));
			} else {
				return Object.assign({},filtered);
			}
		};
		let prediction = predictions.reduce(reduceToPrediction,defaultPrediction);
		let savedPrediction = user ? user.predictions.reduce(reduceToPrediction,defaultPrediction) : {};
		return <Fixture links={fixture._links} key={fixture.key} {...fixture} prediction={prediction} savedPrediction={savedPrediction} onScoreChange={onScoreChange} isCurrent={isCurrent} thisUser={thisUser} />;
	};
	
	const fixtureFilter = fixture => {
		if(matchFilter === 'all') {
			return true;
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
	
	let unsignedUser = (isCurrent && thisUser === '');
	let predictionsClass = { 'text-center': true, 'hidden': unsignedUser };
	let hideThisMobile = view.mobile !== 'fixtures';
	let colClasses = { 'col-md-6':true, 'col-xs-12':true, 'hidden-xs':hideThisMobile, 'hidden-sm':hideThisMobile };
	
	return (
	
	<div className={classnames(colClasses)}>
	<table className="table">
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
		