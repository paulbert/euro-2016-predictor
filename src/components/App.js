import React from 'react'
import FixtureContain from '../containers/FixtureContain'

import GroupsContain from '../containers/GroupsContain'
import UserContain from '../containers/UserContain'
import PredictionHeaderContain from '../containers/PredictionHeaderContain'
import RightViewButtonContain from '../containers/RightViewButtonContain'

const App = () => (
	<div>
	<nav className="navbar navbar-default navbar-static-top navbar-background hidden">
		<div className="collapse navbar-collapse">
			<ul className="nav navbar-nav">
				<li><a>Your Predictions</a></li>
				<li><a>Table</a></li>
			</ul>
		</div>
	</nav>

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
	</div>
);

export default App;