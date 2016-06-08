import React, { PropTypes } from 'react'
import Fixture from './Fixture'

const FixtureList = ({ fixtures, predictions }) => (
	<table>
		<thead>
			<tr>
				<td colSpan="3">Team 1</td>
				<td colSpan="2">Team 2</td>
			</tr>
		</thead>
		<tbody>
			{fixtures.map(fixture => {
					fixture.key = fixture.id;
					fixture.prediction = predictions.reduce((filtered,prediction) => { 
						if(prediction.id === fixture.id) 
						{ 
							return Object.assign({},filtered,prediction);
						} else {
							return Object.assign({},filtered);
						}
					});
					return <Fixture links="fixture._links" key="fixture.key" {...fixture}	/>;
				}
			)}
		</tbody>
	</table>
)

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
		