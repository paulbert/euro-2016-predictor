import React from 'react'
import FixtureContain from '../containers/FixtureContain'

import GroupsContain from '../containers/GroupsContain'
import UserContain from '../containers/UserContain'
import PredictionHeaderContain from '../containers/PredictionHeaderContain'
import RightViewButtonContain from '../containers/RightViewButtonContain'

const App = () => (

	<main className="container-fluid">
		<div className="row">
			<PredictionHeaderContain />
			<RightViewButtonContain />
		</div>
		<div className="row">
			<FixtureContain />
			<UserContain />
			<GroupsContain />
		</div>
	</main>

);

export default App;