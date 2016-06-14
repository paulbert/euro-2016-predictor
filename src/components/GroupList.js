import React, { PropTypes } from 'react'
import Group from './Group'
import rankCalcs from '../rank-calculations/rankCalcs'
import classnames from 'classnames'

const GroupList = ({ groups, savedPredictions, user, fixtures, view }) => {
	
	// Add a prediction object to fixtures so it will work with full sort
	const reformatFixtures = (fixture) => {
		var prediction = {};
		prediction[fixture.homeTeamName] = fixture.result.goalsHomeTeam;
		prediction[fixture.awayTeamName] = fixture.result.goalsAwayTeam;
		return Object.assign({},fixture,{prediction:prediction});
	};
	let sortedGroups = [];
	if(view.actual) {
		sortedGroups = rankCalcs.fullSort(groups,fixtures.map(reformatFixtures),0);
	} else {
		sortedGroups = rankCalcs.fullSort(groups,user ? user.predictions : savedPredictions,0);
	}
	
	let groupCount = {"A":0,"B":0,"C":0,"D":0,"E":0,"F":0}
	// group setter { 'name': val, 'W':0, 'D':0, 'L':0, 'GF':0, 'GA':0, 'GD':0, 'Pts':0, 'group':thisLetter }
	let thirdPlace = sortedGroups.reduce( (thirdPlace,team) => {
		groupCount[team.group]++;
		if(groupCount[team.group] === 3) {
			return thirdPlace = [].concat(thirdPlace, [team]);
		}
		return thirdPlace;
	},[]);
	
	let colClasses = { 'col-md-6':true, 'hidden':view.type !== 'groups', 'hidden-xs':true };
	let groupArray = ["A","B","C","D","E","F",'Third Place'];
	
	return (
	<div className={classnames(colClasses)}>
		{groupArray.map((groupLetter) => {
			if(groupLetter === 'Third Place') {
				return <Group key={groupLetter} groups={thirdPlace} groupLetter={groupLetter} thirdPlace={thirdPlace} />
			} else {
				return <Group key={groupLetter} groups={sortedGroups} groupLetter={groupLetter} thirdPlace={thirdPlace} />
			}
		})}
	</div>
)}

export default GroupList;