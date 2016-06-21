import { connect } from 'react-redux'
import Settings from '../components/Settings'
import { getUsers } from '../actions'
import { updateUser } from '../actions'
import { changeSettings } from '../actions'

const mapStateToProps = (state) => {
	return {
		user:state.users.filter((user) => {
			return user._id === state.thisUser;
		})[0],
		names:state.settings.names,
		settingsStatus:state.settings.settingsStatus
	}
};

const mapDispatchToProps = (dispatch) => {
	dispatch(getUsers());
	return {
		onSettingsSubmit: (userId,names) => {
			dispatch(changeSettings(names));
			dispatch(updateUser(userId,names));
		}
	}
}

const SettingsContain = connect(mapStateToProps,mapDispatchToProps)(Settings);

export default SettingsContain;