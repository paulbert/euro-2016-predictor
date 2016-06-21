import React, { PropTypes } from 'react'
import classnames from 'classnames'

const TrashTalk = ({ inputUrl, previewUrl, entries, previewResponse, entriesToShow, trashOnServerCount, onPreviewSubmit, onPreviewChange, onInsertClick, onShowMoreClick, onUpdateClick, onCancelClick }) => {
	
	const validate = () => {
		return onPreviewSubmit(previewUrl);
	};
	
	let imgClass = { 'hidden':previewResponse !== 'OK' };
	let messageClass = { 'hidden':previewResponse === 'OK' };
	let btnClass = Object.assign({},imgClass,{'btn':true, 'btn-euros':true, 'btn-primary':true});
	let btnCancelClass = Object.assign({},imgClass,{'btn':true, 'btn-default':true});
	let panelClass = {'hidden':previewResponse === '' && imgClass.hidden,'panel':true, 'panel-default':true};
	let testImg = previewResponse === 'OK' ? inputUrl : '';
	let shownEntries = entries.slice(0,entriesToShow);
	let showMoreClass = {'hidden':entriesToShow >= entries.length,'row':true};
	
	let newTrashCount = trashOnServerCount - entries.length;
	let updateTrashClass = {'row':true, hidden:(newTrashCount <= 0)};
	
	return (
		<main className="container-fluid trash-talk">
			<div className="row">
				<div className="col-xs-12 col-sm-8 col-md-6">
					<form onSubmit={(e) => { e.preventDefault(); return validate();}}>
						<div className="input-group">
							<div className="input-group-btn">
								<button className="btn btn-euros btn-primary" type="submit">Preview Image</button>
							</div>
							<input type="url" className="form-control" onChange={(e) => onPreviewChange(e.target.value)}/>
						</div>
					</form>
				</div>	
			</div>
			<div className="row preview-image">
				<div className="col-xs-12 col-sm-8 col-md-6">
					<div className={classnames(panelClass)}>
						<div className="panel-body">
							<span className={classnames(messageClass)}>{previewResponse}</span>
							<span className={classnames(imgClass)}><img src={testImg} className="trash-img" /></span>
							<span className={classnames(imgClass)}>Is this good to add?</span>
							<button className={classnames(btnClass)} onClick={() => onInsertClick(inputUrl)}>Add Trash!</button>
							<button className={classnames(btnCancelClass)} onClick={() => onCancelClick()}>Cancel</button>
						</div>
					</div>
				</div>
			</div>
			<div className={classnames(updateTrashClass)}>
				<div className="col-xs-12 col-sm-8 col-md-6 show-new-trash">
					<div>
						<a onClick={(e) => { e.preventDefault(); return onUpdateClick();}}>{'Show ' + newTrashCount + ' new posts'}</a>
					</div>
				</div>
			</div>
			{shownEntries.map((entry) => {
				let dateOptions = { weekday:'short',month:'short',day:'numeric',hour:'numeric',minute:'numeric',year:'numeric'};
				//let dateOptions = { weekday: 'long' };
				let formattedDate = new Date(entry.date);
				let entryDateHeader = 'On ' + formattedDate.toLocaleString(undefined,dateOptions) + ' ';
				let entryEndHeader = (typeof entry.nameName !== 'undefined' ? ' (' + entry.nameName + ') ' : ' ') + 'said';
				return <div key={entry._id} className="row">
					<div className="col-xs-12 col-sm-8 col-md-6">
						<div>{entryDateHeader}<b>{entry.teamName}</b>{entryEndHeader}</div>
						<div><img src={entry.trash} className="trash-img" /></div>
					</div>
				</div>
			})}
			<div className={classnames(showMoreClass)}>
				<div className="col-xs-12 col-sm-8 col-md-6 show-more-trash">
					<div>
						<a onClick={(e) => { e.preventDefault(); return onShowMoreClick(entriesToShow + 10);}}>Show more trash</a>
					</div>
				</div>
			</div>
		</main>
	);

};

export default TrashTalk;