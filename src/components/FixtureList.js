import React, { PropTypes } from 'react'
import Fixture from './Fixture'

const FixtureList = ({ fixtures, predictions, user, isCurrent, onScoreChange, onLoad }) => {
	//onLoad();
	
	return (
	
	<div className="col-md-6 col-xs-12">
	<table className="table">
		<thead>
			<tr>
				<td colSpan="4">Team 1</td>
				<td colSpan="3">Team 2</td>
				<td colSpan="1" className="text-center">Predictions</td>
				<td colSpan="1" className="text-center">Actual</td>
			</tr>
		</thead>
		<tbody>
			{fixtures.map(fixture => {
					fixture.key = fixture.f_id;
					let defaultPrediction = {};
					defaultPrediction[fixture.homeTeamName] = null;
					defaultPrediction[fixture.awayTeamName] = null;
					const reduceToPrediction = (filtered,p,index) => { 
						if(p.p_id === fixture.f_id) 
						{ 
							return Object.assign({},filtered,p.prediction,(typeof p.points !== 'undefined' ? {points:p.points,bonus:p.bonus}:{}));
						} else {
							return Object.assign({},filtered);
						}
					};
					let prediction = predictions.reduce(reduceToPrediction,defaultPrediction);
					let savedPrediction = user ? user.predictions.reduce(reduceToPrediction,defaultPrediction) : {};
					return <Fixture links={fixture._links} key={fixture.key} {...fixture} prediction={prediction} savedPrediction={savedPrediction} onScoreChange={onScoreChange} isCurrent={isCurrent} />;
				}
			)}
		</tbody>
	</table>
	</div>
)}

FixtureList.propTypes = {
	fixtures: PropTypes.arrayOf(PropTypes.shape({
		_links:PropTypes.shape({
			self:PropTypes.object,
			soccerseason:PropTypes.object,
			hometeam:PropTypes.object,
			awayTeam:PropTypes.object
		}),
		date:PropTypes.string,
		status:PropTypes.string,
		matchday:PropTypes.number,
		homeTeamName:PropTypes.string.isRequired,
		awayTeamName:PropTypes.string.isRequired,
		result:PropTypes.object
	}).isRequired).isRequired
};

export default FixtureList;
		