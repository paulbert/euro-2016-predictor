import { connect } from 'react-redux'
import UserList from '../components/UserList'

const mapStateToProps = (state) => {
	return {
		users:state.users
	}
};

const UserContain = connect(mapStateToProps)(UserList);

export default UserContain;