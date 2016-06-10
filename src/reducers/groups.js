
import { initGroups } from '../reducers/initStateCalcs.js'

const groups = (state = initGroups,action) => {
	switch(action.type) {
		case 'RECEIVE_PREDICTION':
			/*action.predictions.reduce((previous,current) => {
				if(state.p_id === current.p_id) {
					return current;
				}
				return previous;
			},state);
			return newPrediction;*/
		default:
			return state;
	}
};

export default groups;