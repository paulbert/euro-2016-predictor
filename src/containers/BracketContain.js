import { connect } from 'react-redux'
import Bracket from '../components/Bracket'

const mapStateToProps = (state) => {
	return {
		user:state.users.filter((user) => {
			return user._id === state.activeUserView
		})[0],
		fixtures:state.fixtures,
		view:state.rightView,
		predictionsTemplate:state.predictions,
		isCurrent:(state.activeUserView === state.thisUser)
	}
};

const BracketContain = connect(mapStateToProps)(Bracket);

export default BracketContain;