import { connect } from 'react-redux'
import FullHeader from '../components/FullHeader'
import { switchRightView } from '../actions'

const mapStateToProps = (state) => {
	return {
		loggedIn: state.thisUser !== '',
		view:state.rightView.menu
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onMenuClick: (newView) => {
			dispatch(switchRightView(newView));
		}
	}
};

const FullHeaderContain = connect(mapStateToProps,mapDispatchToProps)(FullHeader);

export default FullHeaderContain;