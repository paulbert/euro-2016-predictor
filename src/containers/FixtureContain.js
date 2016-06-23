import { connect } from 'react-redux'
import FixtureList from '../components/FixtureList'
import { changePrediction } from '../actions'
import { initData } from '../actions'
import { assignPenaltyWinner } from '../actions'

const mapStateToProps = (state) => {
	return {
		fixtures:state.fixtures,
		predictions:state.predictions,
		user:state.users.filter((user) => {
			return user._id === state.activeUserView
		})[0],
		isCurrent:(state.activeUserView === state.thisUser),
		groups:state.groups,
		matchFilter:state.matchFilter,
		thisUser:state.thisUser,
		view:state.rightView
	}
};

const mapDispatchToProps = (dispatch) => {
	dispatch(initData());
	return {
		onScoreChange: (id,team,score,bracketTeam) => {
			dispatch(changePrediction(id,team,score,bracketTeam));
		},
		onLoad: () => {
			dispatch(getPredictions());
		},
		onPenaltyClick: (id,bracketTeam) => {
			dispatch(assignPenaltyWinner(id,bracketTeam));
		}
	}
}

const FixtureContain = connect(mapStateToProps,mapDispatchToProps)(FixtureList);

export default FixtureContain;