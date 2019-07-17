import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Hidden,
  Container,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import EventList from './EventList';
import EventForm from './EventsForm';
import EventConfrimation from './EventConfrim';
import EventBackdrop from './EventBackdrop';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(4),
  },
  listContainer: {
    overflowY: 'scroll',
    height: '60vh',
  },
}));

const EventsContainer = ({
  events,
  curId,
  userId,
  callback,
  toggleModal,
  toggleConfirm,
  toggleEditing,
  formOpen,
  isEditing,
  confirmOpen,
}) => {
  const collectCurrent = () => {
    if (events.length) {
      return events.filter(el => el.id === curId)[0];
    } else {
      return {};
    }
  }
  const classes = useStyles();
  return (
    <Container
      maxWidth="xl"
      className={classes.container}
    >
      <Paper
        elevation={1}
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
            sm
            className={classes.listContainer}
          >
            <EventList
              events={events}
              callback={callback}
            />
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} sm={7}>
              <EventBackdrop
                curId={curId}
                event={collectCurrent()}
                toggleConfirm={toggleConfirm}
                toggleModal={toggleModal}
                toggleEditing={toggleEditing}
                userId={userId}
              />
            </Grid>
          </Hidden>
        </Grid>
      </Paper>
      <EventForm
        open={formOpen}
        toggleModal={toggleModal}
        event={collectCurrent()}
        isEditing={isEditing}
        key={curId}
      />
      {
        (confirmOpen)
          ? (
            <EventConfrimation
              open={confirmOpen}
              toggleConfirm={toggleConfirm}
              eventId={curId}
            />
          )
          : null
      }
    </Container>
  );
};
export default EventsContainer;

EventsContainer.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  curId: PropTypes.number,
  userId: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  toggleConfirm: PropTypes.func.isRequired,
  toggleEditing: PropTypes.func.isRequired,
  formOpen: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  confirmOpen: PropTypes.bool.isRequired,
};

EventsContainer.defaultProps = {
  events: [],
  curId: 0,
};
