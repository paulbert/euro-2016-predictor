import { connect } from 'react-redux'
import PredictButton from '../components/PredictButton'
import { savePredictions } from '../actions'

const mapStateToProps = (state) => {
	return {
		predictions:state.predictions,
		isCurrent:(state.activeUserView === state.thisUser)
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