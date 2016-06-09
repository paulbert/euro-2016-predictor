import teams from '../json/teams.json'
import fixtures from '../json/fixtures.json'

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
	
let fixturesWithId = fixtures.fixtures.map(fixture => fixtureId(fixture));

const initialState = { teams: teams.teams, fixtures: fixturesWithId, predictions: makeBlankPrediction(fixturesWithId) };

export const initTeams = teams.teams;
export const initFixtures = fixturesWithId;
export const initPredictions = makeBlankPrediction(fixturesWithId);