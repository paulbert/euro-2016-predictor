import teams from '../json/teams.json'
import fixtures from '../json/fixtures.json'

const initialState = { teams: teams.teams, fixtures: fixtures.fixtures };

const euroApp = (state = initialState, action) => {
	return state;
};

export default euroApp;