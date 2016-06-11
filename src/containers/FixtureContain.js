import { connect } from 'react-redux'
import FixtureList from '../components/FixtureList'
import { changePrediction } from '../actions'
import { initData } from '../actions'

const mapStateToProps = (state) => {
	return {
		fixtures:state.fixtures,
		predictions:state.predictions,
		user:state.users.filter((user) => {
			return user._id === state.activeUserView
		})[0]
	}
};

const mapDispatchToProps = (dispatch) => {
	dispatch(initData());
	return {
		onScoreChange: (id,team,score) => {
			dispatch(changePrediction(id,team,score));
		},
		onLoad: () => {
			dispatch(getPredictions());
		}
	}
}

const FixtureContain = connect(mapStateToProps,mapDispatchToProps)(FixtureList);

export default FixtureContain;