import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import euroApp from './reducers/euroApp'
import App from './components/App'
import Home from './components/Home'
import Login from './components/Login'
import TrashTalkBody from './components/TrashTalkBody'
import SettingsBody from './components/SettingsBody'
import thunkMiddleware from 'redux-thunk'
import { Route,Router,browserHistory,IndexRoute } from 'react-router'


let store = createStore(euroApp,applyMiddleware(thunkMiddleware));

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/trash" component={TrashTalkBody} />
				<Route path="/settings" component={SettingsBody} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);
