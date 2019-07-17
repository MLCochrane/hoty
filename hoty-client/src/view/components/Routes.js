import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from './home/Home';
import Profile from './profile/Profile';
import Events from './events/Events';

// ROUTE CONFIG
const routes = [
  {
    exact: true,
    path: '/',
    component: Home,
  },
  {
    exact: true,
    path: '/profile/',
    component: Profile,
  },
  {
    exact: true,
    path: '/events/',
    component: Events,
  },
];

class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRoute: '',
      enterId: '',
    };
  }

  componentDidMount() {
    this.setState({ currentRoute: window.location.pathname });
  }

  render() {
    const { noAuth } = this.props;
    return (
      <Route
        render={({ location }) => (
          <Switch key={location.key} location={location}>
          (
            {routes.map(
              ({ exact, path, component: C }, index) => (
                <Route
                  key={index} // eslint-disable-line
                  exact={exact}
                  path={path}
                  render={props => <C {...props} noAuth={noAuth} />}
                />
              ),
            )}
          )
          </Switch>
        )}
      />
    );
  }
}

Routes.propTypes = {
  noAuth: PropTypes.bool.isRequired,
};

export default Routes;
