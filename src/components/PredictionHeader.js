import React, { PropTypes } from 'react'

const PredictionHeader = ({ user, isCurrent }) => {
	//onLoad();
	
	return (
	<div className="col-xs-12">
	<h3>{isCurrent ? 'Your Predictions' : user.teamName}</h3>
	</div>
)}

export default PredictionHeader;