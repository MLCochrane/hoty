import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getCurrentUser } from '../store/actions/userActions';

import Header from './components/global/header/Header';
import Routes from './components/Routes';


const mapStateToProps = ({ users, token }) => ({
  userError: users.userError,
  loggedIn: users.loggedIn,
  token: token.token,
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noAuth: true,
    };
  }

  componentDidMount() {
    const {
      token,
      dispatch,
    } = this.props;
    // Checks for token so we aren't forcing a login everytime
    if (!token) {
      this.setState({ noAuth: true });
      return;
    }
    // Will see if token is still valid
    dispatch(getCurrentUser(token));
  }

  componentDidUpdate(prev) {
    const {
      userError,
      loggedIn,
    } = this.props;
    // If there's an error
    if (prev.userError !== userError) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        noAuth: true,
      });
      return;
    }
    if (prev.loggedIn !== loggedIn) {
      if (loggedIn === true) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          noAuth: false,
        });
      } else if (loggedIn === false) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          noAuth: true,
        });
      }
    }
  }

  render() {
    const { noAuth } = this.state;

    return (
      <Router>
        <section className="App">
          <CssBaseline />
          <Header />
          <main className="page-content">
            <Routes
              noAuth={noAuth}
            />
          </main>
        </section>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);

App.propTypes = {
  token: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  userError: PropTypes.objectOf(),
  loggedIn: PropTypes.bool,
};

App.defaultProps = {
  token: null,
  userError: null,
  loggedIn: false,
};
