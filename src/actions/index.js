
import fetch from 'isomorphic-fetch'

export const CHANGE_PREDICTION = 'CHANGE_PREDICTION';
export const SEND_PREDICTION = 'SEND_PREDICTION';
export const RECEIVE_PREDICTION = 'RECEIVE_PREDICTION';
export const GETTING_PREDICTION = 'GETTING_PREDICTION';
export const RECEIVE_FIXTURES = 'RECEIVE_FIXTURES';
export const GETTING_FIXTURES = 'GETTING_FIXTURES';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const GETTING_USERS = 'GETTING_USERS';

export const changePrediction = (id,team,score) => {
	return {
		type: CHANGE_PREDICTION,
		id,
		team,
		score
	}
};

const sendPrediction = () => {
	return {
		type:SEND_PREDICTION
	}
};

const gettingPrediction = () => {
	return {
		type:GETTING_PREDICTION,
	}
};

const receivePrediction = (predictions) => {
	return {
		type:RECEIVE_PREDICTION,
		predictions
	}
};

const gettingFixtures = () => {
	return {
		type:GETTING_FIXTURES,
	}
};

const receiveFixtures = (fixtures) => {
	return {
		type:RECEIVE_FIXTURES,
		fixtures
	}
};

const gettingUsers = () => {
	return {
		type:GETTING_USERS,
	}
};

const receiveUsers = (users) => {
	return {
		type:RECEIVE_USERS,
		users
	}
};

export function savePredictions(predictions) {
	
	return function(dispatch) {
		
		dispatch(sendPrediction());
		
		return fetch('/savePrediction', {
			method: 'POST',
			credentials:'include',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(predictions)
		})
		.then(response => {
			return response.json()
		})
		.then(json => {
			dispatch(receivePrediction(json[0].predictions));
		});
	}	
}

function fetchQuick(url) {
	return fetch(url, {
		method: 'GET',
		credentials:'include',
		headers: {
			'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
			'Content-Type': 'application/json'
		}
	})
	.then(response => {
		return response.json()
	})
}

export function getPredictions() {
	
	return function(dispatch) {
		
		dispatch(gettingPrediction());
		
		return fetchQuick('/getPrediction')
		.then(json => {
			dispatch(receivePrediction(json[0].predictions));
		});
	}	
}

export function getFixtures() {
	return function(dispatch) {
		
		dispatch(gettingFixtures());
		
		return fetchQuick('/getFixtures')
		.then(json => {
			dispatch(receiveFixtures(json));
			dispatch(getUsers());
		});
	}
}

export function getUsers() {
	return function(dispatch) {
		dispatch(gettingUsers());
		return fetchQuick('/getUsers')
		.then(json => {
			dispatch(receiveUsers(json));
		});
	}
}

export function initData() {
	return function(dispatch) {
		dispatch(getPredictions());
		dispatch(getFixtures());
	}
}
//dispatch(getPredictions());