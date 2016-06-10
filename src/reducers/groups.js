
import { initGroups } from '../reducers/initStateCalcs.js'

const emptyTeam = {'P':0,'W':0, 'D':0, 'L':0, 'GF':0, 'GA':0, 'GD':0, 'Pts':0};
// group setter { 'name': val, 'W':0, 'D':0, 'L':0, 'GF':0, 'GA':0, 'GD':0, 'Pts':0, 'group':thisLetter }
// groups is a collection of teams with group information, so to keep naming from getting weird calling this team
const team = (state,action) => {
	switch(action.type) {
		case 'RECEIVE_PREDICTION':
			return action.predictions.reduce((previous,current) => {
				let scores = [-1,-1];
				let activeGame = false;
				let activeTeam = 'second';
				let prediction = current.prediction;
				for(var key in prediction) {
					if(key === previous.name) {
						activeGame = true;
						activeTeam = scores[0] === -1 ? 'first' : 'second';
					}
					scores[0] = scores[0] === -1 ? parseInt(prediction[key]) : scores[0];
					scores[1] = parseInt(prediction[key]);
				}
				if(activeGame) {
					let result = (scores [0] > scores[1]) ? (activeTeam === 'first' ? 'W' : 'L') : ((scores[1] > scores[0]) ? (activeTeam === 'first' ? 'L' : 'W') : 'D');
					let GF = (activeTeam === 'first' ? scores[0] : scores[1]);
					let GA = (activeTeam === 'first' ? scores[1] : scores[0]);
					let newFields = { 'GF':previous.GF + GF, 'GA':previous.GA + GA };
					newFields.GD = newFields.GF - newFields.GA;
					newFields[result] = previous[result] + 1;
					let tempState = Object.assign({},previous,newFields);
					newFields.Pts = (tempState.W * 3) + tempState.D;
					newFields.P = tempState.W + tempState.D + tempState.L;
					return Object.assign({},tempState,newFields);
				}
				return previous;
			},Object.assign({},state,emptyTeam));
		default:
			return state;
	}
}

const groups = (state = initGroups,action) => {
	switch(action.type) {
		case 'RECEIVE_PREDICTION':
			return state.map( g => team(g,action) ); 
		default:
			return state;
	}
};

export default groups;