import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
} from '@material-ui/core';
import Dayjs from 'dayjs';

const formatDate = date => Dayjs(date).format('MMMM D, YYYY [at] h:mma');

const display = (event, userId, toggleConfirm, toggleEditing) => (
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
      variant="h6"
      data-cy="event-host"
    >
      {`Hosted by: ${event.fullName}`}
    </Typography>
    <p>{ event.description }</p>
    {(userId === event.userId)
      ? (
        <div className="events__actions">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              toggleEditing(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => toggleConfirm(true)}
          >
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
}) => (
  <div
    className="events__overview"
    data-cy="event-overview"
  >
    {(event)
      ? display(event, userId, toggleConfirm, toggleEditing)
      : null
    }
  </div>
);

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
