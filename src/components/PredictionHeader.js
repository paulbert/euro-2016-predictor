import React, { PropTypes } from 'react'
import ButtonContain from '../containers/ButtonContain'
import classnames from 'classnames'

const PredictionHeader = ({ user, isCurrent, mobileView, thisUser,matchFilter, onFilterClick }) => {
	let groupArray = ["A","B","C","D","E","F"];
	let groupButtons = groupArray.map((groupLetter) => {
		return <div key={groupLetter} className="btn-group">
			<button className="btn btn-euros btn-primary" onClick={() => onFilterClick(groupLetter)}>{groupLetter}</button>
		</div>
	});
	let thisMobileView = mobileView === 'fixtures';
	let headerClass = { 'col-md-6':true,'col-xs-12':true,'prediction-header':true,'hidden-xs':!thisMobileView,'hidden-sm':!thisMobileView };
	let groupClass = { 'btn-group':true, 'btn-group-justified':true,'hidden':matchFilter === 'bracket' };
	
	return (
	<div className={classnames(headerClass)}>
		<h3>
			{isCurrent ? (thisUser === '' ? 'Euro 2016' : 'Your Predictions') : user && user.teamName + (user.nameName ? ' (' + user.nameName + ')' : '') }
			<ButtonContain />
		</h3>
		<div className="filter-label"><label>Filter Matches:</label></div>
		<div className="btn-group btn-group-justified btn-group-filters btn-group-margin" role="group">
			<div className="btn-group">
				<button className="btn btn-euros btn-primary" onClick={() => onFilterClick('bracket')}>Bracket</button>
			</div>
			<div className="btn-group">
				<button className="btn btn-euros btn-primary" onClick={() => onFilterClick('group')}>Groups</button>
			</div>
		</div>
		<div className={classnames(groupClass)} role="group">
			{groupButtons}
		</div>
	</div>
)}

export default PredictionHeader;
