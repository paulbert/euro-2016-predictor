import React, { PropTypes } from 'react'

const User = ({ teamName,topScorer,predictions,totalScore}) => {
	return (
	
	<tr>
		<td colSpan="6">{teamName}</td>
		<td colSpan="4">{topScorer}</td>
		<td colSpan="2" className="text-center">{totalScore}</td>
	</tr>
)}

export default User;