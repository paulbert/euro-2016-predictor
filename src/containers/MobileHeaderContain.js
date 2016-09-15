import { connect } from 'react-redux'
import MobileHeader from '../components/MobileHeader'
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
		onSelectChange: (newView) => {
			dispatch(switchRightView(newView));
		}
	}
}

const MobileHeaderContain = connect(mapStateToProps,mapDispatchToProps)(MobileHeader);

export default MobileHeaderContain;