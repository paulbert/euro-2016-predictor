import { connect } from 'react-redux'
import TrashTalk from '../components/TrashTalk'
import { changePreviewUrl } from '../actions'
import { sendPreviewUrl } from '../actions'
import { getTrash } from '../actions'
import { insertTrash } from '../actions'
import { showMoreTrash } from '../actions'
import { checkForNewTrash } from '../actions'
import { cancelTrashInsert } from '../actions'

const mapStateToProps = (state) => {
	return {
		inputUrl:state.trashTalk.inputUrl,
		previewUrl:state.trashTalk.previewUrl,
		entries:state.trashTalk.entries,
		previewResponse:state.trashTalk.previewResponse,
		entriesToShow:state.trashTalk.entriesToShow,
		trashOnServerCount:state.trashTalk.trashOnServerCount
	}
};

const mapDispatchToProps = (dispatch) => {
	dispatch(getTrash());
	setInterval(() => dispatch(checkForNewTrash()),3000);
	return {
		onPreviewSubmit: (previewUrl) => {
			dispatch(sendPreviewUrl(previewUrl));
		},
		onPreviewChange: (newUrl) => {
			dispatch(changePreviewUrl(newUrl));
		},
		onInsertClick: (insertUrl) => {
			dispatch(insertTrash(insertUrl));
		},
		onShowMoreClick: (number) => {
			dispatch(showMoreTrash(number));
		},
		onUpdateClick: () => {
			dispatch(getTrash());
		},
		onCancelClick: () => {
			dispatch(cancelTrashInsert());
		}
	}
};

const TrashContain = connect(mapStateToProps,mapDispatchToProps)(TrashTalk);

export default TrashContain;