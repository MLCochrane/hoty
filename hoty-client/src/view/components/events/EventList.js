import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dayjs from 'dayjs';

import {
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

const formatDate = (date) => {
  const theDate = Dayjs(date);
  return theDate.format('MMMM DD, YYYY');
};

const useStyles = makeStyles(() => ({
  metadata: {
    alignSelf: 'flex-start',
    margin: 0,
  },
}));

const EventList = ({ events, callback }) => {
  const classes = useStyles();
  return (
    <List
      data-cy="event-list"
    >
      {events.map((el, index, self) => (
        <React.Fragment
          key={el.id}
        >
          <ListItem
            // button
            data-cy="event-list-item"
            onClick={() => { callback(el.id); }}
          >
            <ListItemText
              primary={el.title}
              secondary={el.description}
            />
            <p className={classes.metadata}>
              { formatDate(el.startDate) }
            </p>
          </ListItem>
          { (index !== self.length - 1) ? <Divider component="li" /> : null }
        </React.Fragment>
      ))}
    </List>
  );
};

export default EventList;

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  callback: PropTypes.func.isRequired,
};
