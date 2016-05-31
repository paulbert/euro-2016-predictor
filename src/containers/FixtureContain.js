import { connect } from 'react-redux'
import FixtureList from '../components/FixtureList'

const mapStateToProps = (state) => {
	return {
		fixtures:state.fixtures
	}
};

const FixtureContain = connect(mapStateToProps)(FixtureList);

export default FixtureContain;