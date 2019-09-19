import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dayjs from 'dayjs';

import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
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

const truncateDesc = (desc) => {
  const strLen = 30;
  if (desc.length <= strLen) return desc;
  return desc.slice(0, strLen).trim().concat('...');
};

const EventList = ({ events, setCurrent, curId }) => {
  const classes = useStyles();
  return (
    <div>
      {events.length
        ? (
          <List
            data-cy="event-list"
          >
            {events.map((el, index, self) => (
              <React.Fragment
                key={el.id}
              >
                <li>
                  <ListItem
                    button
                    selected={curId === el.id}
                    data-cy="event-list-item"
                    onClick={() => { setCurrent(el.id); }}
                  >
                    <ListItemText
                      primary={el.title}
                      secondary={truncateDesc(el.description)}
                    />
                    <p className={classes.metadata}>
                      { formatDate(el.startDate) }
                    </p>
                  </ListItem>
                </li>
                { (index !== self.length - 1) ? <Divider component="li" /> : null }
              </React.Fragment>
            ))}
          </List>
        )
        : (
          <Typography>
            Doesn&apos;t look like there are any events yet
          </Typography>
        )
      }
    </div>
  );
};

export default EventList;

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCurrent: PropTypes.func.isRequired,
  curId: PropTypes.number,
};

EventList.defaultProps = {
  curId: null,
};
