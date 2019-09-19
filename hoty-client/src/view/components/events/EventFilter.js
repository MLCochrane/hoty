import React from 'react';
import {
  Button,
} from '@material-ui/core';
import {
  makeStyles,
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
  {
    name: 'current',
  },
];

const EventFilter = ({ user, filter, changeFilter }) => {
  const classes = useStyles();
  return (
    <div className={classes.filter}>
      {
        buttons.map(el => (
          <Button
            data-filter={el.name}
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
  );
};
export default EventFilter;
EventFilter.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
