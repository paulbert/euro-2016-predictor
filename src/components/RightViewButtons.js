import React, { PropTypes } from 'react'
import RightViewButtonContain from '../containers/RightViewButtonContain'
import classnames from 'classnames'

//initView = {'type':'groups','actual':false};
const RightViewButtons = ({ view, user, onButtonClick }) => {
	
	let colClasses = { 'col-md-6':true, 'hidden-xs':true, 'hidden-sm':true };
	
	let secondRowClass = {'hidden':view.type !== 'groups' && view.type !== 'bracket'};
	
	let actualDefault = false;
	if(!user) {
		actualDefault = true;
	}
	
	return (
	<div className={classnames(colClasses)}>
		<div className="btn-group btn-group-justified btn-group-margin" role="group">
			<div className="btn-group">
				<button className="btn btn-euros btn-primary" onClick={() => onButtonClick({type:'groups','actual':actualDefault})}>View Groups</button>
			</div>
			<div className="btn-group">
				<button className="btn btn-euros btn-primary" onClick={() => onButtonClick({type:'bracket','actual':actualDefault})}>View Bracket</button>
			</div>
			<div className="btn-group">
				<button className="btn btn-euros btn-primary" onClick={() => onButtonClick({type:'scores'})}>View Scores</button>
			</div>
		</div>
		<div className="btn-group btn-group-justified btn-group-margin" role="group">
			<div className="btn-group">
				<button className={"btn btn-euros btn-primary " + classnames(secondRowClass)} onClick={() => onButtonClick({'actual':false})}>Predicted</button>
			</div>
			<div className="btn-group">
				<button className={"btn btn-euros btn-primary " + classnames(secondRowClass)} onClick={() => onButtonClick({'actual':true})}>Actual</button>
			</div>
		</div>
	</div>
)}

export default RightViewButtons;