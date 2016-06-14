import React, { PropTypes } from 'react'
import ButtonContain from '../containers/ButtonContain'

const PredictionHeader = ({ user, isCurrent }) => {
	
	return (
	<div className="col-md-6">
		<h3>
			{isCurrent ? 'Your Predictions' : user.teamName}
			<ButtonContain />
		</h3>
	</div>
)}

export default PredictionHeader;