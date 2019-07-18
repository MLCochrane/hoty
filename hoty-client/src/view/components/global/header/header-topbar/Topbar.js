import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import HeaderIcons from '../header-icons/HeaderIcons';
import HeaderSettings from '../header-settings/HeaderSettings';


const useStyles = makeStyles({
  title: {
    'flex-grow': 1,
    'text-align': 'center',
  },
});

const Topbar = (props) => {
  const classes = useStyles();
  const {
    loggedIn,
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h5" color="inherit" noWrap className={classes.title}>
        Host Of The Year
      </Typography>
      {loggedIn
        ? (
          <React.Fragment>
            <HeaderIcons
              notifications="10"
            />
            <HeaderSettings />
          </React.Fragment>
        )
        : (
          <Link
            replace
            to="/login"
          >
            <Button
              color="inherit"
            >
              Login
            </Button>
          </Link>
        )
            }
    </React.Fragment>
  );
};

export default Topbar;

Topbar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};
