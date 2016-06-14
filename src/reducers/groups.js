
import { initGroups } from '../reducers/initStateCalcs.js'
import rankCalcs from '../rank-calculations/rankCalcs'

const emptyTeam = {'P':0,'W':0, 'D':0, 'L':0, 'GF':0, 'GA':0, 'GD':0, 'Pts':0};
// group setter { 'name': val, 'W':0, 'D':0, 'L':0, 'GF':0, 'GA':0, 'GD':0, 'Pts':0, 'group':thisLetter }
// groups is a collection of teams with group information, so to keep naming from getting weird calling this team

const groups = (state = initGroups,action) => {
	switch(action.type) {
		default:
			return state;
	}
};

export default groups;