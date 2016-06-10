import React, { PropTypes } from 'react'
import Group from './Group'

const GroupList = ({ groups, savedPredictions }) => {
	//onLoad();
	return (
	<div className="col-md-6 hidden">
		<Group groups={groups} savedPredictions={savedPredictions} groupLetter={'A'} />
		<Group groups={groups} savedPredictions={savedPredictions} groupLetter={'B'} />
		<Group groups={groups} savedPredictions={savedPredictions} groupLetter={'C'} />
		<Group groups={groups} savedPredictions={savedPredictions} groupLetter={'D'} />
		<Group groups={groups} savedPredictions={savedPredictions} groupLetter={'E'} />
		<Group groups={groups} savedPredictions={savedPredictions} groupLetter={'F'} />
	</div>
)}

export default GroupList;