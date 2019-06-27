import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUser } from '../store/actions/userActions';

import Header from './components/global/header/Header';
import Routes from './components/Routes';

const mapStateToProps = ({users, token}) => {
  return {
    userError: users.userError,
    loggedIn: users.loggedIn,
    token: token.token
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noAuth: false
    }
  }
  componentDidMount() {
    // Checks for token so we aren't forcing a login everytime
    if (!this.props.token) {
      this.setState({noAuth: true})
      return;
    }
    // Will see if token is still 
    this.props.dispatch(getCurrentUser(this.props.token));
  }
  componentDidUpdate(prev) {
    // If there's an error 
    if (prev.userError !== this.props.userError) {
      this.setState({
        noAuth: true
      });
      return;
    }
    if (prev.loggedIn !== this.props.loggedIn && this.props.loggedIn === true) {
      this.setState({
        noAuth: false
      });
    }
  }
  render() {
    return (
      <Router>
        <section className="App">
          <Header />
          <main className="page-content">
            <Routes
              noAuth={ this.state.noAuth }
            />
          </main>
        </section>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
