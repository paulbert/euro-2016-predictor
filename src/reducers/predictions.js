
import { initPredictions } from '../reducers/initStateCalcs.js'

const prediction = (state,action) => {
	switch(action.type) {
		case 'CHANGE_PREDICTION':
			if(state.p_id !== action.id) {
				return state;
			}
			let newScore = Object.assign({},state);
			newScore.prediction[action.team] = action.score;
			return newScore;
		default:
			return state;
	}
};

const predictions = (state = initPredictions,action) => {
	switch(action.type) {
		case 'CHANGE_PREDICTION':
			return state.map(p => prediction(p,action));
		default:
			return state;
	}
};

export default predictions;