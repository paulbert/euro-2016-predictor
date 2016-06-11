import React from 'react'
import FixtureContain from '../containers/FixtureContain'
import ButtonContain from '../containers/ButtonContain'
import GroupsContain from '../containers/GroupsContain'

const App = () => (
	<header>
		<nav className="navbar navbar-default navbar-fixed-top navbar-background">
			
		</nav>
	</header>
	</header>
	<div className="container-fluid">
		<ButtonContain />
		<div className="row">
			<FixtureContain />
			<GroupsContain />
		</div>
	</div>
);

export default App;