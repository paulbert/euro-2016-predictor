import React, { PropTypes } from 'react'
import classnames from 'classnames'

const PredictButton = ({ predictions, isCurrent, onPredictClick }) => {
	
	let alertClasses = classnames({ 'text-success': true, 'text-danger': true, 'hidden':true, 'span-spacing':true });
	let buttonClasses = classnames({ 'hidden':!isCurrent, 'margin-left-right':true });
	
	return (
		<span className={buttonClasses}>
			<button className="btn btn-euros btn-primary btn-large" onClick={() => onPredictClick(predictions)}>Save Predictions!</button>
			<span className={alertClasses}><span className="glyphicon glyphicon-check" aria-hidden="true"></span><span>Success</span></span>
		</span>
	);

};

export default PredictButton;