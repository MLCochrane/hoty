import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  bar: {
    background: '#fff',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  wrap: {
    maxWidth: '1600px',
    margin: '0 auto',
  },
  title: {
    color: theme.palette.primary.main,
  },
}));

const PageBar = ({ title, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.bar}>
      <div className={classes.wrap}>
        <Typography
          className={classes.title}
          variant="h2"
          >
          { title }
        </Typography>
        <div className="page-bar__content">
          { children }
        </div>
      </div>
    </div>
  );
};

export default PageBar;
PageBar.propTypes = {
  title: PropTypes.string.isRequired,
};
