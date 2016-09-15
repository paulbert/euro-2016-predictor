import { connect } from 'react-redux'
import RightViewButtons from '../components/RightViewButtons'
import { switchRightView } from '../actions'


const mapStateToProps = (state) => {
	return {
		view:state.rightView,
		user:state.users.filter((user) => {
			return user._id === state.activeUserView
		})[0]
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onButtonClick: (newView) => {
			dispatch(switchRightView(newView));
		}
	}
}

const RightViewButtonContain = connect(mapStateToProps,mapDispatchToProps)(RightViewButtons);

export default RightViewButtonContain;