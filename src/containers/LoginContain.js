import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { loginSwitch } from '../actions'
import { loginTry } from '../actions'
import { loginChange } from '../actions'

const mapStateToProps = (state) => {
	return {
		loginView:state.login.loginView,
		invalid:state.login.invalid,
		invalidMessage:state.login.invalidMessage,
		loginCreds:state.login.loginCreds
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSwitchClick: (switchTo) => {
			dispatch(loginSwitch(switchTo));
		},
		onSubmitClick: (url,loginValues) => {
			dispatch(loginTry(url,loginValues));
		}
	}
}

const LoginContain = connect(mapStateToProps,mapDispatchToProps)(LoginForm);

export default LoginContain;