import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Tooltip } from 'react-bootstrap'
import { OverlayTrigger } from 'react-bootstrap'

const PredictButton = ({ predictions, isCurrent, thisUser, onPredictClick, user }) => {
	
	let alertClasses = classnames({ 'text-success': true, 'text-danger': true, 'hidden':true, 'span-spacing':true });
	let buttonClasses = classnames({ 'hidden':!isCurrent || thisUser === '', 'margin-left-right':true });
	let tooltipClass = 'hidden';
	let tooltipMessage = '';
	let penaltyMissing = false;
	let halfFilled = false;
	let btnClass = {'btn':true, 'btn-euros':true, 'btn-primary':true, 'btn-large':true};
	
	
	const checkPredictions = (p) => {
		const findSavedPrediction = (savedP) => {
			return p.matchNum === savedP.matchNum;
		}
		
		if(user && p.matchNum) {
			let savedP = user.predictions.filter(findSavedPrediction);
			if(savedP.length > 0) {
				let userPrediction = savedP[0];
				let useInput = p.inputPrediction && p.inputPrediction.home && p.inputPrediction.away && (p.PKs ? p.winner : true);
				let newBracket = {};
				if(useInput) {
					newBracket = Object.assign({},userPrediction.bracketPrediction,p.bracketPrediction);
				} else {
					newBracket = Object.assign({},userPrediction.bracketPrediction);
				}
				let newPrediction = {};
				newPrediction[p.homeTeamName] = newBracket.home;
				newPrediction[p.awayTeamName] = newBracket.away;
				let homeTeamName = p.homeTeamName || userPrediction.homeTeamName;
				let awayTeamName = p.awayTeamName || userPrediction.awayTeamName;
				let newBracketWinner = p.bracketWinner || p.penaltyWinner || userPrediction.bracketWinner || userPrediction.userPenaltyWinner || '';
				let newWinner = (newBracketWinner === 'home') ? homeTeamName : ((newBracketWinner === 'away') ? awayTeamName : userPrediction.winner);
				let newPKs = typeof p.PKs === 'undefined' ? userPrediction.PKs : p.PKs;
				let newPenaltyWinner = p.penaltyWinner || userPrediction.userPenaltyWinner || '';
				if(!useInput) {
					if(p.inputPrediction && (p.inputPrediction.home || p.inputPrediction.away) && !(p.inputPrediction.home && p.inputPrediction.away)) {
						halfFilled = true;
					}
					if(p.PKs && p.inputPrediction && (p.inputPrediction.home && p.inputPrediction.away) && !p.winner) {
						penaltyMissing = true;
					}
				}
				return Object.assign({},userPrediction,{prediction:newPrediction,bracketPrediction:newBracket,bracketWinner:newBracketWinner,winner:newWinner,homeTeamName:homeTeamName,awayTeamName:awayTeamName,PKs:newPKs,penaltyWinner:newPenaltyWinner});
			}
		}
		return p;
	};
	
	const tooltip = (tooltipMessage,tooltipClass) => { return (
		<Tooltip id="tooltip" className={tooltipClass}>{tooltipMessage}</Tooltip>
	)};
	
	let modifiedPredictions = predictions.map(checkPredictions);
	
	if(penaltyMissing) {
		tooltipClass = '';
		tooltipMessage = 'Missing a winner for penalties. Hit a checkbox and then you can save.';
		btnClass = Object.assign({},btnClass,{'disabled':true});
	} else if (halfFilled) {
		tooltipClass = '';
		tooltipMessage = 'Something is half filled.  You can still save, but it might make your bracket weird.';
	}
	
	const predictClick = (modifiedPredictions) => {
		if(!penaltyMissing) {
			return onPredictClick(modifiedPredictions);
		}
	}
	
	return (
		<span className={buttonClasses}>
			<OverlayTrigger placement="top" overlay={tooltip(tooltipMessage,tooltipClass)}>
			<button className={classnames(btnClass)} onClick={() => predictClick(modifiedPredictions)}>Save Predictions!</button>
			</OverlayTrigger>
			<span className={alertClasses}><span className="glyphicon glyphicon-check" aria-hidden="true"></span><span>Success</span></span>
		</span>
	);

};

export default PredictButton;