
import { initFixtures } from '../reducers/initStateCalcs.js'

const fixtures = (state = initFixtures,action) => {
	switch(action.type) {
		case 'RECEIVE_FIXTURES':
			return action.fixtures;
		default:
			return state;
	}
};

export default fixtures;