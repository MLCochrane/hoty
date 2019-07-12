import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const display = (event, userId, toggleConfirm, toggleModal, toggleEditing) => (
  <div className="event__content">
    <h1>{ event.title || null }</h1>
    <p>{ event.description || null }</p>
    {(userId === event.userId)
      ? (
        <div className="events__actions">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              toggleModal(true);
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
  toggleModal,
  toggleEditing,
}) => (
  <div className="events__overview">
    {(event)
      ? display(event, userId, toggleConfirm, toggleModal, toggleEditing)
      : null
    }
  </div>
);

export default EventOverview;

EventOverview.propTypes = {
  event: PropTypes.arrayOf(),
  userId: PropTypes.string,
  toggleConfirm: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  toggleEditing: PropTypes.func.isRequired,
};

EventOverview.defaultProps = {
  event: [],
  userId: '',
};
