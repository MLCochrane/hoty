import React from 'react';
import {
  Typography,
  Button,
} from '@material-ui/core';
import {
  Link,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import bg from '../../../EVENT-BG.jpg';

const useStyles = makeStyles(theme => ({
  wrap: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  bg: {
    backgroundImage: `url(${bg})`,
    backgroundSize: '50%',
    height: '100%',
    width: '100%',
    opacity: '0.5',
  },
  cta: {
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
    top: '50%',
    left: '50%',
    textAlign: 'center',
  },
  ctaText: {
    marginBottom: theme.spacing(2),
  },
}));

const EventCta = () => {
  const classes = useStyles();
  return (
    <div
      className={classes.wrap}
      data-cy="event-cta"
    >
      <div className={classes.bg} />
      <div className={classes.cta}>
        <Typography
          variant="h5"
          color="primary"
          className={classes.ctaText}
        >
          Something fun going down?!
        </Typography>
        <Link
          to="/events/create"
        >
          <Button
            type="button"
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventCta;
