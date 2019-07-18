import React from 'react';
import PropTypes from 'prop-types';
import {
  CSSTransition,
  SwitchTransition,
} from 'react-transition-group';
import EventOverview from '../events-overview/EventOverview';
import EventCTA from '../events-cta/EventCTA';

const EventBackdrop = (props) => {
  const {
    curId,
    event,
    userId,
    toggleConfirm,
    toggleModal,
    toggleEditing,
  } = props;
  return (
    <SwitchTransition>
      <CSSTransition
        key={curId}
        classNames="fade"
        timeout={300}
        in={curId}
      >
        {(curId !== null)
          ? (
            <EventOverview
              event={event}
              userId={userId}
              toggleConfirm={toggleConfirm}
              toggleModal={toggleModal}
              toggleEditing={toggleEditing}
            />
          )
          : (
            <EventCTA
              toggleModal={toggleModal}
            />
          )
        }
      </CSSTransition>
    </SwitchTransition>
  );
};
export default EventBackdrop;
EventBackdrop.propTypes = {
};
