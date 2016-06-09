import teams from '../reducers/teams.js'
import fixtures from '../reducers/fixtures.js'
import predictions from '../reducers/predictions.js'
import { combineReducers } from 'redux'

const euroApp = combineReducers({
	teams,
	fixtures,
	predictions
});

export default euroApp;