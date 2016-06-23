import React, { PropTypes } from 'react'
import ButtonContain from '../containers/ButtonContain'
import classnames from 'classnames'

const PredictionHeader = ({ user, isCurrent, mobileView, thisUser, onFilterClick }) => {
	let groupArray = ["A","B","C","D","E","F"];
	let groupButtons = groupArray.map((groupLetter) => {
		return <div key={groupLetter} className="btn-group">
			<button className="btn btn-euros btn-primary" onClick={() => onFilterClick(groupLetter)}>{groupLetter}</button>
		</div>
	});
	let thisMobileView = mobileView === 'fixtures';
	let headerClass = { 'col-md-6':true,'col-xs-12':true,'prediction-header':true,'hidden-xs':!thisMobileView,'hidden-sm':!thisMobileView };
	
	return (
	<div className={classnames(headerClass)}>
		<h3>
			{isCurrent ? (thisUser === '' ? 'Euro 2016' : 'Your Predictions') : user && user.teamName}
			<ButtonContain />
		</h3>
		<div className="filter-label"><label>Filter Matches:</label></div>
		<div className="btn-group btn-group-justified btn-group-filters" role="group">
			<div className="btn-group">
				<button className="btn btn-euros btn-primary" onClick={() => onFilterClick('bracket')}>Bracket</button>
			</div>
			<div className="btn-group">
				<button className="btn btn-euros btn-primary" onClick={() => onFilterClick('all')}>All</button>
			</div>
			{groupButtons}
		</div>
	</div>
)}

export default PredictionHeader;
