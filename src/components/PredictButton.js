import React, { PropTypes } from 'react'
import classnames from 'classnames'

const PredictButton = ({ predictions, isCurrent, thisUser, onPredictClick, user }) => {
	
	let alertClasses = classnames({ 'text-success': true, 'text-danger': true, 'hidden':true, 'span-spacing':true });
	let buttonClasses = classnames({ 'hidden':!isCurrent || thisUser === '', 'margin-left-right':true });
	
	const checkPredictions = (p) => {
		const findSavedPrediction = (savedP) => {
			return p.matchNum === savedP.matchNum;
		}
		
		if(user && p.matchNum && (typeof p.prediction === 'undefined' || typeof p.prediction[p.homeTeamName] === 'undefined')) {
			let savedP = user.predictions.filter(findSavedPrediction);
			if(savedP.length > 0) {
				let userPrediction = savedP[0];
				let newBracket = Object.assign({},userPrediction.bracketPrediction,p.bracketPrediction);
				let newPrediction = {};
				newPrediction[p.homeTeamName] = newBracket.home;
				newPrediction[p.awayTeamName] = newBracket.away;
				let homeTeamName = p.homeTeamName || userPrediction.homeTeamName;
				let awayTeamName = p.awayTeamName || userPrediction.awayTeamName;
				let newBracketWinner = p.bracketWinner !== '' ? p.bracketWinner : userPrediction.bracketWinner;
				let newWinner = (newBracketWinner === 'home') ? p.homeTeamName : ((newBracketWinner === 'away') ? p.awayTeamName : userPrediction.winner);
				return Object.assign({},userPrediction,{prediction:newPrediction,bracketPrediction:newBracket,bracketWinner:newBracketWinner,winner:newWinner,homeTeamName:homeTeamName,awayTeamName:awayTeamName});
			}
		}
		return p;
	};
	let modifiedPredictions = predictions.map(checkPredictions);
	
	return (
		<span className={buttonClasses}>
			<button className="btn btn-euros btn-primary btn-large" onClick={() => onPredictClick(modifiedPredictions)}>Save Predictions!</button>
			<span className={alertClasses}><span className="glyphicon glyphicon-check" aria-hidden="true"></span><span>Success</span></span>
		</span>
	);

};

export default PredictButton;