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
  blurb: {
    color: theme.palette.primary.light,
    paddingBottom: theme.spacing(2),
  },
}));

const PageBar = ({ title, children, blurb }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.bar}
      data-cy="page-bar"
    >
      <div className={classes.wrap}>
        <Typography
          className={classes.title}
          variant="h2"
          data-cy="page-bar-title"
        >
          { title }
        </Typography>
        <div
          className="page-bar__content"
          data-cy="page-bar-content"
        >
          {blurb
            ? (
              <Typography
                className={classes.blurb}
              >
                {blurb}
              </Typography>
            )
            : null
          }
          { children }
        </div>
      </div>
    </div>
  );
};

export default PageBar;
PageBar.propTypes = {
  title: PropTypes.string.isRequired,
  blurb: PropTypes.string.isRequired,
  children: PropTypes.element,
};

PageBar.defaultProps = {
  children: null,
};
