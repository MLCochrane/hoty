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
  (loggedIn ? (
    <div
      className="header"
      data-cy="header"
    >
      <AppBar position="static">
        <Toolbar
          className="header__toolbar"
        >
          <Menu
            history={history}
          />
          <Topbar
            loggedIn={loggedIn}
            history={
              history
            }
          />
        </Toolbar>
      </AppBar>
    </div>
  ) : null)
);

export default withRouter(connect(mapStateToProps)(Header));

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
};
