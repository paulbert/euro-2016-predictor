import React, { PropTypes } from 'react'
import Group from './Group'

const GroupList = ({ groups }) => {
	//onLoad();
	return (
	<div className="col-md-6 hidden-xs hidden-sm">
		<Group groups={groups} groupLetter={'A'} />
		<Group groups={groups} groupLetter={'B'} />
		<Group groups={groups} groupLetter={'C'} />
		<Group groups={groups} groupLetter={'D'} />
		<Group groups={groups} groupLetter={'E'} />
		<Group groups={groups} groupLetter={'F'} />
	</div>
)}

export default GroupList;