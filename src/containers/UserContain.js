import { connect } from 'react-redux'
import UserList from '../components/UserList'
import { switchUsers } from '../actions'

const mapStateToProps = (state) => {
	return {
		users:state.users
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onUserClick: (userId) => {
			dispatch(switchUsers(userId));
		}
	}
}

const UserContain = connect(mapStateToProps,mapDispatchToProps)(UserList);

export default UserContain;