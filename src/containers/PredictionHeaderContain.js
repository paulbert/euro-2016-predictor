import { connect } from 'react-redux'
import PredictionHeader from '../components/PredictionHeader'


const mapStateToProps = (state) => {
	return {
		user:state.users.filter((user) => {
			return user._id === state.activeUserView
		})[0],
		isCurrent:(state.activeUserView === state.thisUser)
	}
};

const PredictionHeaderContain = connect(mapStateToProps)(PredictionHeader);

export default PredictionHeaderContain;