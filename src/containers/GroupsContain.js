import { connect } from 'react-redux'
import GroupList from '../components/GroupList'

const mapStateToProps = (state) => {
	return {
		groups:state.groups,
		savedPredictions:state.savedPredictions
	}
};

const GroupContain = connect(mapStateToProps)(GroupList);

export default GroupContain;