// State for the currently selected user's saved predictions as received from server

const deDupe = (oldArray,newArray) => {
	let filteredArray = newArray.filter((val,ind,arr) => {
		let omit = oldArray.reduce((previous,current) => {
			if(val.p_id === current.p_id) {
				return true;
			}
			return previous;
		},true);
		return omit;
	});
	return filteredArray;
}

const prediction = (state,action) => {
	switch(action.type) {
		case 'RECEIVE_PREDICTION':
			let newPrediction = action.predictions.reduce((previous,current) => {
				if(state.p_id === current.p_id) {
					return current;
				}
				return previous;
			},state);
			return newPrediction;
		default:
			return state;
	}
};

const savedPredictions = (state = [],action) => {
	switch(action.type) {
		case 'RECEIVE_PREDICTION':
			let updateOld = state.map(p => prediction(p,action));
			let addNew = deDupe(updateOld,action.predictions);
			return [].concat(updateOld,addNew);
		default:
			return state;
	}
};

export default savedPredictions;