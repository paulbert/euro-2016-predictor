import { connect } from 'react-redux'
import TeamFlag from '../components/TeamFlag'

const mapStateToProps = (state,ownProps) => {
	return {
		teams:state.teams,
		thisTeam:ownProps.team
	}
};

const TeamContain = connect(mapStateToProps)(TeamFlag);

export default TeamContain;