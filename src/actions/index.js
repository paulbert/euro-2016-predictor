
export const changePrediction = (id,team,score) => {
	return {
		type: 'CHANGE_PREDICTION',
		id,
		team,
		score
	}
};