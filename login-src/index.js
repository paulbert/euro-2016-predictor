import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import loginApp from './reducers/index'
import App from './components/App'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger();

let store = createStore(loginApp,applyMiddleware(thunkMiddleware));

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);