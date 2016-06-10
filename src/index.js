import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import euroApp from './reducers/euroApp'
import App from './components/App'
import thunkMiddleware from 'redux-thunk'

let store = createStore(euroApp,applyMiddleware(thunkMiddleware));

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
