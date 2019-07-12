import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withRouter } from 'react-router-dom';
import Menu from './Menu';
import Topbar from './Topbar';

const mapStateToProps = ({ users }) => ({
  loggedIn: users.loggedIn,
});

const Header = ({ loggedIn, history }) => (
  <div className="header">
    <AppBar position="static">
      <Toolbar>
        {loggedIn
          ? (
            <Menu
              history={history}
            />
          )
          : null
        }
        <Topbar
          loggedIn={loggedIn}
          history={
            history
          }
        />
      </Toolbar>
    </AppBar>
  </div>
);

export default withRouter(connect(mapStateToProps)(Header));

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.objectOf.isRequired,
};
