import teams from '../reducers/teams.js'
import fixtures from '../reducers/fixtures.js'
import predictions from '../reducers/predictions.js'
import savedPredictions from '../reducers/savedPredictions.js'
import groups from '../reducers/groups.js'
import users from '../reducers/users.js'
import { thisUser } from '../reducers/user.js'
import { activeUserView } from '../reducers/user.js'
import { combineReducers } from 'redux'
import rightView from '../reducers/rightView.js'

const euroApp = combineReducers({
	teams,
	fixtures,
	predictions,
	savedPredictions,
	groups,
	users,
	thisUser,
	activeUserView,
	rightView
});

export default euroApp;