import React from 'react';
import PropTypes from 'prop-types';

import {
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

const EventList = ({ events, callback }) => (
  <List>
    {events.map((el, index, self) => (
      <React.Fragment
        key={el.id}
      >
        <ListItem
          button
          onClick={() => { callback(el.id); }}
        >
          <ListItemText
            primary={el.title}
            secondary={el.description}
          />
        </ListItem>
        { (index !== self.length - 1) ? <Divider component="li" /> : null }
      </React.Fragment>
    ))}
  </List>
);

export default EventList;

EventList.propTypes = {
  events: PropTypes.arrayOf().isRequired,
  callback: PropTypes.func.isRequired,
};
