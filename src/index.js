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
		<nav className="navbar navbar-default navbar-static-top navbar-background hidden">
			<div className="collapse navbar-collapse">
				<ul className="nav navbar-nav">
					<li><Link to="/">Your Predictions</Link></li>
					<li><Link to="/trash">Table</Link></li>
				</ul>
			</div>
		</nav>
		<Route path="/" component={App}/>
		<Route path="/trash" component={Trash}/>
	</Provider>,
	document.getElementById('root')
);
