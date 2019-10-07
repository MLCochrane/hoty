import React from 'react';
import PropTypes from 'prop-types';
import {
  CSSTransition,
  SwitchTransition,
} from 'react-transition-group';
import EventOverview from './EventOverview';
import EventCTA from './EventCTA';

const EventBackdrop = (props) => {
  const {
    curId,
    event,
    userId,
    toggleConfirm,
    toggleEditing,
  } = props;
  return (
    <SwitchTransition>
      <CSSTransition
        key={curId}
        classNames="fade"
        timeout={300}
        in={!!curId}
      >
        {(curId !== null)
          ? (
            <EventOverview
              event={event}
              userId={userId}
              toggleConfirm={toggleConfirm}
              toggleEditing={toggleEditing}
            />
          )
          : (
            <EventCTA
              toggleEditing={toggleEditing}
            />
          )
        }
      </CSSTransition>
    </SwitchTransition>
  );
};

export default EventBackdrop;

EventBackdrop.propTypes = {
  event: PropTypes.shape({}),
  userId: PropTypes.string,
  curId: PropTypes.number,
  toggleConfirm: PropTypes.func.isRequired,
  toggleEditing: PropTypes.func.isRequired,
};

EventBackdrop.defaultProps = {
  event: {},
  curId: null,
  userId: '',
};
