import React from 'react'
import FixtureContain from '../containers/FixtureContain'
import ButtonContain from '../containers/ButtonContain'
import GroupsContain from '../containers/GroupsContain'
import UserContain from '../containers/UserContain'

const App = () => (
	<div>
	<nav className="navbar navbar-default navbar-static-top navbar-background">
		<div className="collapse navbar-collapse">
			<ul className="nav navbar-nav">
				<li><a>Your Predictions</a></li>
				<li><a>Table</a></li>
			</ul>
		</div>
	</nav>

	<main className="container-fluid">
		<ButtonContain />
		<div className="row">
			<FixtureContain />
			<UserContain />
		</div>
	</main>
	</div>
);

export default App;