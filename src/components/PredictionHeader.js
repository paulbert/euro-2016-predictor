import React, { PropTypes } from 'react'
import ButtonContain from '../containers/ButtonContain'

const PredictionHeader = ({ user, isCurrent, onFilterClick }) => {
	let groupArray = ["A","B","C","D","E","F"];
	let groupButtons = groupArray.map((groupLetter) => {
		return <div key={groupLetter} className="btn-group">
			<button className="btn btn-euros btn-primary" onClick={() => onFilterClick(groupLetter)}>{groupLetter}</button>
		</div>
	});
	return (
	<div className="col-md-6 prediction-header">
		<h3>
			{isCurrent ? 'Your Predictions' : user.teamName}
			<ButtonContain />
		</h3>
		<div className="filter-label"><label>Filter Matches:</label></div>
		<div className="btn-group btn-group-justified btn-group-filters" role="group">
			<div className="btn-group">
				<button className="btn btn-euros btn-primary" onClick={() => onFilterClick('all')}>All</button>
			</div>
			{groupButtons}
		</div>
	</div>
)}

export default PredictionHeader;

/*{groupArray.map((groupLetter) => {
				return <div key={groupLetter} className="btn-group">
					<button className="btn btn-euros btn-primary" onClick={() => onFilterClick(groupLetter)}>{groupLetter}</button>
				</div>
			})};*/