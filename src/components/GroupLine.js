import React, { PropTypes } from 'react'

const GroupLine = ({ name,P,W,D,L,GF,GA,GD,Pts,colorRow }) => {
	
	let formatGD = GD > 0 ? '+' + GD : GD;
	let rowClass = colorRow ? 'success' : '';
	
	return (
	
	
			<tr className={rowClass}>
				<td className="col-xs-4">{name}</td>
				<td className="col-xs-1">{P}</td>
				<td className="col-xs-1">{W}</td>
				<td className="col-xs-1">{D}</td>
				<td className="col-xs-1">{L}</td>
				<td className="col-xs-1">{GF}</td>
				<td className="col-xs-1">{GA}</td>
				<td className="col-xs-1">{GD}</td>
				<td className="col-xs-1">{Pts}</td>
			</tr>
)}

export default GroupLine;