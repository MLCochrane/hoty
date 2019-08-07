import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
} from '@material-ui/core';
import {
  Tune,
  Cancel,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import Dayjs from 'dayjs';
import Emoji from '../global/Emoji';

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(3),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  description: {
    whiteSpace: 'pre-wrap',
  },
  host: {
    margin: `${theme.spacing(1)}px 0`,
  },
}));

const formatDate = date => Dayjs(date).format('MMMM D, YYYY [at] h:mma');


const display = (event, userId, toggleConfirm, toggleEditing, classes) => (
  <div
    className="event__content"
    data-cy="event-content"
  >
    <Typography
      variant="overline"
      data-cy="event-date"
    >
      {formatDate(event.startDate)}
    </Typography>
    <Typography
      variant="h2"
      data-cy="event-title"
    >
      {event.title}
    </Typography>
    <Typography
      variant="body1"
      className={classes.host}
      data-cy="event-host"
    >
      {`Hosted by: ${event.fullName}`}
    </Typography>
    {event.themes.length
      ? (
        event.themes.map(el => (
          <Emoji
            key={el}
            theme={el}
          />
        ))
      )
      : null
    }
    <p
      className={classes.description}
    >
      { event.description }
    </p>
    {(userId === event.userId)
      ? (
        <div className="events__actions">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              toggleEditing(true);
            }}
          >
            <Tune
              className={classes.icon}
            />
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => toggleConfirm(true)}
          >
            <Cancel
              className={classes.icon}
            />
            Delete
          </Button>
        </div>
      )
      : null
    }
  </div>
);

const EventOverview = ({
  event,
  userId,
  toggleConfirm,
  toggleEditing,
}) => {
  const classes = useStyles();
  return (
    <div
      className="events__overview"
      data-cy="event-overview"
    >
      {(event)
        ? display(event, userId, toggleConfirm, toggleEditing, classes)
        : null
      }
    </div>
  );
};

export default EventOverview;

EventOverview.propTypes = {
  event: PropTypes.shape({}),
  userId: PropTypes.string,
  toggleConfirm: PropTypes.func.isRequired,
  toggleEditing: PropTypes.func.isRequired,
};

EventOverview.defaultProps = {
  event: {},
  userId: '',
};
