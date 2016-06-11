import React, { PropTypes } from 'react'
import classnames from 'classnames'

const PredictButton = ({ predictions, onPredictClick }) => {
	
	let alertClasses = classnames({ 'text-success': true, 'text-danger': true, 'hidden':true, 'span-spacing':true });
	
	return (
		<div className="row">
			<div className="col-xs-12">
				<button className="btn btn-euros btn-primary btn-large" onClick={() => onPredictClick(predictions)}>Save Predictions!</button>
				<span className={alertClasses}><span className="glyphicon glyphicon-check" aria-hidden="true"></span><span>Success</span></span>
			</div>
		</div>
	);

};

export default PredictButton;