import React from 'react';
import {
  Typography,
  Button,
} from '@material-ui/core';
import {
  makeStyles
} from '@material-ui/core/styles';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  filter: {
    marginTop: theme.spacing(2),
  },
  filterButtons: {
    marginRight: theme.spacing(2),
    '&:last-of-type': {
      marginRight: '0px',
    },
  },
  blurb: {
    color: theme.palette.primary.light,
    paddingBottom: theme.spacing(2),
  },
}));


const buttons = [
  {
    name: 'all',
  },
  {
    name: 'upcoming',
  },
  {
    name: 'past',
  },
];

const EventFilter = ({ user, filter, changeFilter }) => {
  const classes = useStyles();
  return (
    <div className={classes.filter}>
      <Typography
        className={classes.blurb}
      >
        Hey { user.firstName }, check out the latest going on or add a new event.
      </Typography>
      {
        buttons.map(el => (
          <Button
            key={el.name}
            type="button"
            color="primary"
            variant={(filter === el.name) ? 'contained' : 'outlined'}
            className={classes.filterButtons}
            onClick={() => { changeFilter(el.name); }}
          >
            { el.name }
          </Button>
        ))
      }
    </div>
  )
}
export default EventFilter;
EventFilter.propTypes = {
};