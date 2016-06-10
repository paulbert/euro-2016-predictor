
import fetch from 'isomorphic-fetch'

export const CHANGE_PREDICTION = 'CHANGE_PREDICTION';
export const SEND_PREDICTION = 'SEND_PREDICTION';
export const RECEIVE_PREDICTION = 'RECEIVE_PREDICTION';
export const GETTING_PREDICTION = 'GETTING_PREDICTION';

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

export function getPredictions(predictions) {
	
	return function(dispatch) {
		
		dispatch(gettingPrediction());
		
		return fetch('/getPrediction', {
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
		.then(json => {
			dispatch(receivePrediction(json[0].predictions));
		});
	}	
}

//dispatch(getPredictions());