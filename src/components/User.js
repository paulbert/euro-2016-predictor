import React, { PropTypes } from 'react'

const User = ({ id,teamName,topScorer,predictions,totalScore,onUserClick}) => {
	
	
	
	return (
	
	<tr className="user-row" onClick={(e) => onUserClick(id)}>
		<td colSpan="6">{teamName}</td>
		<td colSpan="4">{topScorer}</td>
		<td colSpan="2" className="text-center">{totalScore}</td>
	</tr>
)}

export default User;