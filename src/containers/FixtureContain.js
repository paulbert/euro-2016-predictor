import { connect } from 'react-redux'
import FixtureList from '../components/FixtureList'

const mapStateToProps = (state) => {
	return {
		fixtures:state.fixtures,
		predictions:state.predictions
	}
};

const FixtureContain = connect(mapStateToProps)(FixtureList);

export default FixtureContain;