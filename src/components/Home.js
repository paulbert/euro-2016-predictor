import React from 'react'
import FixtureContain from '../containers/FixtureContain'

import GroupsContain from '../containers/GroupsContain'
import BracketContain from '../containers/BracketContain'
import UserContain from '../containers/UserContain'
import PredictionHeaderContain from '../containers/PredictionHeaderContain'
import RightViewButtonContain from '../containers/RightViewButtonContain'
import MobileHeaderContain from '../containers/MobileHeaderContain'

const Home = () => (
	
	
	
	<main className="container-fluid">
		<div className="row">
			<MobileHeaderContain />
			<PredictionHeaderContain />
			<RightViewButtonContain />
		</div>
		<div className="row">
			<FixtureContain />
			<UserContain />
			<GroupsContain />
			<BracketContain />
		</div>
	</main>

);

export default Home;