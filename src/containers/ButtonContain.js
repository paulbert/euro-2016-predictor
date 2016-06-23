import { connect } from 'react-redux'
import PredictButton from '../components/PredictButton'
import { savePredictions } from '../actions'

const mapStateToProps = (state) => {
	return {
		predictions:state.predictions,
		isCurrent:(state.activeUserView === state.thisUser),
		thisUser: state.thisUser,
		user:state.users.filter((user) => {
			return user._id === state.thisUser
		})[0]
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onPredictClick: (predictions) => {
			dispatch(savePredictions(predictions));
		}
	}
}

const ButtonContain = connect(mapStateToProps,mapDispatchToProps)(PredictButton);

export default ButtonContain;