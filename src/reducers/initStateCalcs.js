import teams from '../json/teams.json'
import fixtures from '../json/fixtures.json'
import groups from '../json/groups.json'
import bracket from '../json/bracket.js'

// Creates an id that will be unique to the two strings and date but independent of order.
const makeId = (stringOne, stringTwo, dateString) => {
	
	let sortedStrings = [stringOne,stringTwo].sort().reduce((previous,current) => previous + current);
	
	return sortedStrings + '|' + dateString.substr(0,10);
	
};

let fixtureId = fixture => Object.assign({},fixture,{ f_id:makeId(fixture.homeTeamName,fixture.awayTeamName,fixture.date) });

let makeBlankPrediction = fixtures => fixtures.map((fixture) => {
	var prediction = {};
	prediction[fixture.homeTeamName] = null;
	prediction[fixture.awayTeamName] = null;
	return {
		prediction:prediction,
		p_id:fixture.f_id
	};
});

const formatGroups = groups => {
	let newGroups = [];
	for(var key in groups) {
		let thisLetter = key;
		newGroups = newGroups.concat(groups[key].map((val,ind,arr) => {return { 'name': val,'P':0, 'W':0, 'D':0, 'L':0, 'GF':0, 'GA':0, 'GD':0, 'Pts':0, 'group':thisLetter }}));
	}
	return newGroups;
}
	
let fixturesWithId = fixtures.fixtures.map(fixture => fixtureId(fixture));

const initialState = { teams: teams.teams, fixtures: fixturesWithId, predictions: makeBlankPrediction(fixturesWithId) };

const pad = (number) => {
	if (number < 10) {
		return '0' + number;
	}
	return number;
}

const reformatDate = (date) => {
	let dateObj = new Date(date);
	return dateObj.getUTCFullYear() +
		'-' + pad(dateObj.getUTCMonth() + 1) +
		'-' + pad(dateObj.getUTCDate()) +
		'T' + pad(dateObj.getUTCHours()) +
		':' + pad(dateObj.getUTCMinutes()) +
		':' + pad(dateObj.getUTCSeconds()) +
		'Z';
}

export const reformatBracket = (bracket) => bracket.map((match) => Object.assign({},match, { p_id:makeId(match.matchNum,'',reformatDate(match.date)), date:reformatDate(match.date) } ));

export const initTeams = teams.teams;
export const initFixtures = fixturesWithId;
export const initPredictions = () => [].concat(makeBlankPrediction(fixturesWithId),reformatBracket(bracket));
export const initGroups = formatGroups(groups);

console.log(initGroups);