import React, { PropTypes } from 'react'
import TeamContain from '../containers/TeamContain'
import BracketGame from './BracketGame'
import classnames from 'classnames'

const BracketTier = ({ bracketPredictions, bracketForm, matchNumOne, matchNumTwo }) => {
	if(matchNumOne) {
		return (
		<div className="branch">
			<BracketGame bracketPredictions={bracketPredictions} bracketForm={bracketForm} matchNum={matchNumOne} />
			<BracketGame bracketPredictions={bracketPredictions} bracketForm={bracketForm} matchNum={matchNumTwo} />
		</div>
		)
	} else {
		return (<span></span>)
	}
}

export default BracketTier;