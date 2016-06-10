
const pointSort = (a, b) => b.Pts - a.Pts;

const goalScoredSort = (a,b) => b.GF - a.GF;

const goalDiffSort = (a,b) => (b.GD) - (a.GD);

const chunkTeams = (group, field) => {
	let chunkedArray = [];
	let previousValue = undefined;
	let newChunk = [];
	for(var i = 0; i < group.length; i++) {
		if(previousValue !== group[i][field]) {
			if(newChunk.length > 0) { chunkedArray.push(newChunk); }
			newChunk = [];
		}
		newChunk.push(group[i]);
		previousValue = group[i][field];
	}
	chunkedArray.push(newChunk);
	return chunkedArray;
}

const fullSort = (group,predictions) => {
	let groupByPoints = group.sort(pointSort);
	let chunked = chunkTeams(groupByPoints,'Pts');
	sortStageMiniPts(chunked,predictions);
	if(chunked.length === 4) {
		return groupByPoints;
	} else {
		return groupByPoints;
	}
}

const sortStageMiniPts = (chunks,predictions) => {
	chunks.map((chunk) => {
		let newRanks = chunk.map((team,ind,arr) => calcGroup(predictions,team,arr));
		let superChunk = chunkTeams(newRanks,'Pts');
		if(superChunk.length === chunk.length) {
			return newRanks;
		}
		return chunk;
	});
	let finalChunks = chunks.reduce((previous,current) => previous.concat(current), []);
	return finalChunks;
}

const rankCalcs = {
	pointSort:pointSort,
	goalScoredSort:goalScoredSort,
	goalDiffSort:goalDiffSort,
	fullSort:fullSort
};

const emptyTeam = {'W':0, 'D':0, 'L':0, 'GF':0, 'GA':0, 'GD':0, 'Pts':0};
// group setter { 'name': val, 'W':0, 'D':0, 'L':0, 'GF':0, 'GA':0, 'GD':0, 'Pts':0, 'group':thisLetter }
const calcGroup = (predictions,team,groupArray) => {
	
	return predictions.reduce((previous,current) => {
		let scores = [-1,-1];
		let activeGame = false;
		let activeTeam = 'second';
		let prediction = current.prediction;
		for(var key in prediction) {
			if(key === previous.name) {
				activeGame = true;
				activeTeam = scores[0] === -1 ? 'first' : 'second';
			}
			if(groupArray) {
				if(groupArray.indexOf(key) === -1) { activeGame = false };
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
			let tempState = Object.assign({},previous,newFields)
			newFields.Pts = (tempState.W * 3) + tempState.D;
			return Object.assign({},tempState,newFields);
		}
		return previous;
	},Object.assign({},team,emptyTeam));

}

export default rankCalcs;

