import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import euroApp from './reducers/euroApp'
import App from './components/App'

let store = createStore(euroApp);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
