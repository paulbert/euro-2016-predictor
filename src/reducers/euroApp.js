import teams from '../json/teams.json'
import fixtures from '../json/fixtures.json'

// Creates an id that will be unique to the two strings and date but independent of order.
const makeId = (stringOne, stringTwo, dateString) => {
	
	let sortedStrings = [stringOne,stringTwo].sort().reduce((previous,current) => previous + current);
	
	return sortedStrings + '|' + dateString.substr(0,10);
	
};

let fixtureId = fixture => Object.assign({},fixture,{ id:makeId(fixture.homeTeamName,fixture.awayTeamName,fixture.date) });

let makeBlankPrediction = fixtures => fixtures.map((fixture) => {
	return {
		prediction:{fixture.homeTeamName:0,fixture.awayTeamName:0},
		id:fixture.id
	};
});
	
let fixturesWithId = fixtures.fixtures.map(fixture => fixtureId(fixture););

const initialState = { teams: teams.teams, fixtures: fixturesWithId, prediction: makeBlankPrediction(fixturesWithId) };

const euroApp = (state = initialState, action) => {
	return state;
};

export default euroApp;