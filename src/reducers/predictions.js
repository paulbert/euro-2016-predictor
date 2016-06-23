
import { initPredictions } from '../reducers/initStateCalcs.js'
import { reformatBracket } from '../reducers/initStateCalcs.js'

const getCurrentUser = () => {
	var cookieArray = document.cookie.split("; ");
	return cookieArray.reduce((previous,cookie) => {
		var keyValueAsArray = cookie.split('=');
		if(keyValueAsArray[0] === 'user') {
			return keyValueAsArray[1];
		}
		return previous;
	},'');
}

const newPredictionState = (state,action) => {

	let newWinnerNum = 0,
		oldWinnerNum = 0,
		newWinnerName = '';
	
	const setScores = (p,action) => {
		if(p.p_id !== action.id && p.matchNum !== action.id) {
			return p;
		}
		let newScore = Object.assign({},p);
		newScore.prediction = (typeof newScore.prediction === 'undefined') ? {} : newScore.prediction;
		newScore.prediction[action.team] = action.score;
		if(newScore.matchNum) {
			newScore.bracketPrediction = (typeof newScore.bracketPrediction === 'undefined') ? {} : newScore.bracketPrediction;
			newScore.bracketPrediction[action.bracketTeam] = action.score;
			newScore = resetScore(newScore);
		}
		return newScore;
	}
	
	const resetScore = (newScore) => {
		let firstScore = -1,
			winner = '',
			result = newScore.prediction,
			countKeys = 0,
			homeTeamName = newScore.homeTeamName || newScore.userHomeTeam || '',
			awayTeamName = newScore.awayTeamName || newScore.userAwayTeam || '',
			homeTeamScore = (newScore.bracketPrediction.home === '' || typeof newScore.bracketPrediction.home === 'undefined') ? (newScore.userBracketPrediction ? newScore.userBracketPrediction.home : '') : newScore.bracketPrediction.home,
			awayTeamScore = (newScore.bracketPrediction.away === '' || typeof newScore.bracketPrediction.away === 'undefined') ? (newScore.userBracketPrediction ? newScore.userBracketPrediction.away : '') : newScore.bracketPrediction.away;
			
		winner = homeTeamScore > awayTeamScore ? homeTeamName : (awayTeamScore > homeTeamScore ? awayTeamName : 'draw');
		if(homeTeamScore === '' || typeof homeTeamScore === 'undefined' || awayTeamScore === '' || typeof awayTeamScore === 'undefined') {
			winner = 'none';
		}
		
		newWinnerNum = newScore.matchNum;
		
		newScore.winner = '';
		switch(winner) {
			case 'none':
				newScore.PKs = false;
				break;
			case 'draw':
				newScore.PKs = true;
				switch(newScore.penaltyWinner) {
					case 'home':
						newScore.winner = homeTeamName;
						break;
					case 'away':
						newScore.winner = awayTeamName;
						break;
				}
				break;
			default:
				newScore.winner = winner;
				newScore.PKs = false;
				newWinnerName = winner;
		}
		let bracketWinner = (winner === homeTeamName) ? 'home' : ((winner === awayTeamName) ? 'away' : '');
		newScore.bracketWinner = bracketWinner;
		newScore.prediction = {};
		newScore.bracketPrediction.home = homeTeamScore;
		newScore.bracketPrediction.away = awayTeamScore;
		newScore.prediction[newScore.homeTeamName] = homeTeamScore;
		newScore.prediction[newScore.awayTeamName] = awayTeamScore;
		newScore.homeTeamName = homeTeamName;
		newScore.awayTeamName = awayTeamName;
		return newScore;
	}
	
	const setNewWinnerMatch = p => {
		if(p.homeTeamIs === newWinnerNum) {
			return reformatBracket([Object.assign({},p,{'homeTeamName':newWinnerName})])[0];
		}
		if(p.awayTeamIs === newWinnerNum) {
			return reformatBracket([Object.assign({},p,{'awayTeamName':newWinnerName})])[0];
		}
		return p;
	}
	
	
	const setAllNewWinners = (i, scores) => {
		scores = scores.map(s => {
			if(s.matchNum) {
				s.bracketPrediction = (typeof s.bracketPrediction === 'undefined') ? {} : s.bracketPrediction;
				return resetScore(s);
			}
			return s;
		});
		const filterByMatchNum = p => {
			return p.matchNum === i;
		}
		if(i < 16) {
			newWinnerNum = i;
			newWinnerName = scores.filter(filterByMatchNum)[0].winner || '';
			scores = scores.map(setNewWinnerMatch);
			return setAllNewWinners(i+1,scores);
		} else {
			return scores;
		}	
	}
	
	const setPenaltyWinner = (p,action) => {
		if(p.p_id !== action.id && p.matchNum !== action.id) {
			return p;
		}
		let newScore = Object.assign({},p,{penaltyWinner: action.bracketTeam});
		newScore = resetScore(newScore);
		return newScore;
	}
	
	let newScores = [];
	
	switch(action.type) {
		case 'CHANGE_PREDICTION':
			newScores = state.map(p => setScores(p,action));
			break;
		case 'ASSIGN_PENALTY_WINNER':
			newScores = state.map(p => setPenaltyWinner(p,action));
			break;
	}
	
	newScores = setAllNewWinners(1,newScores);
	return newScores;
}

const userUpdatePrediction = (state,users,thisUser) => {
	
	let user = users.reduce((previous,current) => {
		if(current._id === thisUser) {
			return current;
		}
		return previous;
	},{});
	
	if(state.matchNum && user.predictions) {
		let thisPrediction = user.predictions.reduce((previous,current) => {
			if(current.matchNum === state.matchNum) {
				return current;
			}
			return previous;
		},0);
		
		if(thisPrediction !== 0) {
			let userBracketPrediction = Object.assign({},state.bracketPrediction,thisPrediction.bracketPrediction);
			return Object.assign({},state,{userHomeTeam:thisPrediction.homeTeamName,userAwayTeam:thisPrediction.awayTeamName,userBracketPrediction:userBracketPrediction});
		}
	}
	return state;
	
};

const predictions = (state = initPredictions,action) => {
	switch(action.type) {
		case 'CHANGE_PREDICTION':
			return newPredictionState(state,action);
		case 'RECEIVE_USERS':
			let thisUser = getCurrentUser();
			if(thisUser === '') {
				return state;
			}
			return state.map(p => userUpdatePrediction(p,action.users,thisUser));
		case 'ASSIGN_PENALTY_WINNER':
			return newPredictionState(state,action);
		default:
			return state;
	}
};

export default predictions;