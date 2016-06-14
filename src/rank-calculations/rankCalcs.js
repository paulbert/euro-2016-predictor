
// group setter { 'name': val, 'W':0, 'D':0, 'L':0, 'GF':0, 'GA':0, 'GD':0, 'Pts':0, 'group':thisLetter }
const sortFuncs = {
	'Pts': (a, b) => b.Pts - a.Pts,
	'GF': (a,b) => b.GF - a.GF,
	'GD': (a,b) => (b.GD) - (a.GD),
	'name': (a,b) => a.name > b.name ? 1 : -1
}

const chunkTeams = (group, field) => {
	let chunkedArray = [];
	let previousValue = undefined;
	let newChunk = [];
	
	const addNew = () => {
		if(newChunk.length === 1) {
			chunkedArray.push(newChunk[0]);
		} else {
			chunkedArray.push(newChunk);
		}
	}

	for(var i = 0; i < group.length; i++) {
		if(previousValue !== group[i][field]) {
			if(newChunk.length > 0) {
				addNew();
			}
			newChunk = [];
		}
		newChunk.push(group[i]);
		previousValue = group[i][field];
	}
	addNew();
	return chunkedArray;
}

const sortOptionsOrder = [ {field:'Pts',onlyAgainst:false},{field:'Pts',onlyAgainst:true},{field:'GD',onlyAgainst:true},{field:'GF',onlyAgainst:true},{field:'GD',onlyAgainst:false},{field:'GF',onlyAgainst:false},{field:'name',onlyAgainst:false} ];

const reChunk = (oldChunk,field) => {
	let newChunk = [];
	for(var i = 0; i < oldChunk.length; i++) {
		if(Array.isArray(oldChunk[i])) {
			newChunk = [].concat(newChunk,chunkTeams(oldChunk[i],field));
		} else {
			newChunk = [].concat(newChunk,oldChunk[i]);
		}
	}
	return newChunk;
}

const fullSort = (teams,predictions,nextSort,numChunks,currentChunk) => {
	if(teams.length > 0) {
		let numTeams = teams.length;
		let field = sortOptionsOrder[nextSort].field;
	
		if(!currentChunk) {
			currentChunk = [ teams ];
		}
		
		// Sort steps 1 through 3 are to be repeated until teams cannot be split any further
		// Set numChunks to the current chunk length to check against after step 3
		if(nextSort === 1) {
			numChunks = currentChunk.length;
		}
	
		let rankChunks = sortStage(currentChunk,predictions,sortOptionsOrder[nextSort]);
		let chunked = reChunk(rankChunks,field);
	
		if(chunked.length === teams.length) {
			return chunked.map((team) => calcGroup(predictions,team));
		} else {
			// If steps 1 through 3 separated any teams, repeat steps 1 through 3
			if(nextSort === 3 && chunked.length !== numChunks) {
				return fullSort(teams,predictions,1,numChunks,chunked);
			}
			return fullSort(teams,predictions,nextSort + 1,numChunks,chunked);
		}
	} else {
		return teams;
	}
}

const sortStage = (chunks,predictions,options) => {
	const rerankTeamsInChunks = (chunk,field,onlyAgainst) => {
		if(Array.isArray(chunk)) {
			let newTables = chunk.map((team,ind,chunk) => onlyAgainst ? calcGroup(predictions,team,chunk) : calcGroup(predictions,team)).sort(sortFuncs[field]);
			return newTables;
		}
		return chunk;
	};
	return chunks.map((chunk) => rerankTeamsInChunks(chunk,options.field,options.onlyAgainst));
};

const rankCalcs = {
	fullSort:fullSort
};

const emptyTeam = {'P':0,'W':0, 'D':0, 'L':0, 'GF':0, 'GA':0, 'GD':0, 'Pts':0};
// group setter { 'name': val, 'W':0, 'D':0, 'L':0, 'GF':0, 'GA':0, 'GD':0, 'Pts':0, 'group':thisLetter }
const calcGroup = (predictions,team,groupArray) => {
	return predictions.reduce((previous,current) => {
		let scores = [-1,-1];
		let activeGame = false;
		let wrongOpponent = false;
		let activeTeam = 'second';
		let prediction = current.prediction;
		
		for(var key in prediction) {
			if(prediction[key] !== null) {
				if(key === previous.name) {
					activeGame = true;
					activeTeam = scores[0] === -1 ? 'first' : 'second';
				}
				if(groupArray) {
					let filterGroup = (team) => key === team.name;
					if(groupArray.filter(filterGroup).length === 0) {
						wrongOpponent = true;
					};
				}
				scores[0] = scores[0] === -1 ? parseInt(prediction[key]) : scores[0];
				scores[1] = parseInt(prediction[key]);
			}
		}
		if(!wrongOpponent && activeGame) {
			let result = (scores [0] > scores[1]) ? (activeTeam === 'first' ? 'W' : 'L') : ((scores[1] > scores[0]) ? (activeTeam === 'first' ? 'L' : 'W') : 'D');
			let GF = (activeTeam === 'first' ? scores[0] : scores[1]);
			let GA = (activeTeam === 'first' ? scores[1] : scores[0]);
			let newFields = { 'GF':previous.GF + GF, 'GA':previous.GA + GA };
			newFields.GD = newFields.GF - newFields.GA;
			newFields[result] = previous[result] + 1;
			let tempState = Object.assign({},previous,newFields)
			newFields.Pts = (tempState.W * 3) + tempState.D;
			newFields.P = tempState.W + tempState.D + tempState.L;
			return Object.assign({},tempState,newFields);
		}
		return previous;
	},Object.assign({},team,emptyTeam));
}

export default rankCalcs;