import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import loginApp from './reducers/index'
import App from './components/App'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

let store = createStore(loginApp,applyMiddleware(thunkMiddleware,createLogger));

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);