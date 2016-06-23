

const initView = {'type':'bracket','actual':false,'mobile':'fixtures','menu':false};

const rightView = (state = initView,action) => {
	switch(action.type) {
		case 'SWITCH_RIGHT_VIEW':
			return Object.assign({},state,action.newView);
		default:
			return state;
	}
};

export default rightView;