import { connect } from 'react-redux'
import GroupList from '../components/GroupList'

const mapStateToProps = (state) => {
	return {
		groups:state.groups,
		savedPredictions:state.savedPredictions,
		user:state.users.filter((user) => {
			return user._id === state.activeUserView
		})[0],
		fixtures:state.fixtures,
		view:state.rightView
	}
};

const GroupContain = connect(mapStateToProps)(GroupList);

export default GroupContain;