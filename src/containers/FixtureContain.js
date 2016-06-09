import { connect } from 'react-redux'
import FixtureList from '../components/FixtureList'
import { changePrediction } from '../actions'

const mapStateToProps = (state) => {
	return {
		fixtures:state.fixtures,
		predictions:state.predictions
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onScoreChange: (id,team,score) => {
			dispatch(changePrediction(id,team,score));
		}
	}
}

const FixtureContain = connect(mapStateToProps,mapDispatchToProps)(FixtureList);

export default FixtureContain;