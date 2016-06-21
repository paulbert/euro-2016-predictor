import { connect } from 'react-redux'
import PredictionHeader from '../components/PredictionHeader'
import { changeFilter } from '../actions'

const mapStateToProps = (state) => {
	return {
		user:state.users.filter((user) => {
			return user._id === state.activeUserView
		})[0],
		isCurrent:(state.activeUserView === state.thisUser),
		thisUser: state.thisUser,
		mobileView: state.rightView.mobile
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFilterClick: (newFilter) => {
			dispatch(changeFilter(newFilter));
		}
	}
}

const PredictionHeaderContain = connect(mapStateToProps,mapDispatchToProps)(PredictionHeader);

export default PredictionHeaderContain;