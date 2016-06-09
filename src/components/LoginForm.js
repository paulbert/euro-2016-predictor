import React, { PropTypes } from 'react'

const loginViews = {
	'login':<form>
		<div className="form-group">
			<label className="control-label">Username:</label>
			<input type="text" className="form-control" />
		</div>
		<div className="form-group">
			<label className="control-label">Password:</label>
			<input type="password" className="form-control" />
		</div>
		<button type="submit" className="btn btn-default">Login</button>
	</form>
	<a href="" onClick={() => onSwitchClick('signup')}>Need to sign up?</a>,
	'signup':<form>
		<div className="form-group">
			<label className="control-label">Username:</label>
			<input type="text" className="form-control" />
		</div>
		<div className="form-group">
			<label className="control-label">Password:</label>
			<input type="password" className="form-control" />
		</div>
		<div className="form-group">
			<label className="control-label">Repeat Password:</label>
			<input type="password" className="form-control" />
		</div>
		<div className="form-group">
			<label className="control-label">Team Name:</label>
			<input type="text" className="form-control" />
		</div>
		<div className="form-group">
			<label className="control-label">League Code:</label>
			<input type="password" className="form-control" />
		</div>
		<button type="submit" className="btn btn-default">Login</button>
	</form>
	<a href="" onClick={() => onSwitchClick('login')}>Already signed up?</a>
};

const LoginForm = ({loginView,onSwitchClick) => (
	loginViews[loginView]
);

export default LoginForm;