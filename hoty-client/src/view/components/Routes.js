import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from './landing/Landing';
import UserForm from './forms/UserForm';
import Profile from './profile/Profile';

// ROUTE CONFIG
const routes = [
	{
		exact: true,
		path: "/",
		component: Landing
	},
	{
		exact: true,
		path: "/login/",
		component: UserForm
	},
	{
		exact: true,
		path: "/profile/",
		component: Profile
	}
];

class Routes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentRoute: '',
			enterId: '',
		}
	}

	componentDidMount() {
		this.setState({ currentRoute: window.location.pathname });
	}
	render() {
		return (
			<Route
				render={({ location }) => 
					<Switch key={location.key} location={location}>
							{routes.map(
								({ exact, path, component: C }, index) => (
									<Route
										key={ index }
										exact={ exact }
										path={ path }
										render={props => <C {...props} noAuth={ this.props.noAuth } />}
									/>
								)
							)}
					</Switch>
				}>
			</Route>
		);
	}
}

export default Routes;
