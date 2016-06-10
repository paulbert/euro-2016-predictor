import teams from '../reducers/teams.js'
import fixtures from '../reducers/fixtures.js'
import predictions from '../reducers/predictions.js'
import savedPredictions from '../reducers/savedPredictions.js'
import groups from '../reducers/groups.js'
import { combineReducers } from 'redux'

const euroApp = combineReducers({
	teams,
	fixtures,
	predictions,
	savedPredictions,
	groups
});

export default euroApp;