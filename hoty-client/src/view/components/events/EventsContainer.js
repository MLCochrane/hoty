import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Hidden,
  Container,
  Typography,
  Paper,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import EventList from './EventList';
import EventOverview from './EventOverview';
import EventForm from './EventsForm';
import EventConfrimation from './EventConfrim';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(4),
  },
  titleBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing(4),
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
  const collectCurrent = () => events.filter(el => el.id === curId)[0];
  const classes = useStyles();
  return (
    <Container
      maxWidth="xl"
      className={classes.container}
    >
      <div
        className={classes.titleBar}
      >
        <Typography
          variant="h5"
          component="h1"
        >
          Events
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => { toggleModal(true); }}
        >
          Add New
        </Button>
      </div>
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
            style={{
              'overflow-y': 'scroll',
              height: '60vh',
            }}
          >
            <EventList
              events={events}
              callback={callback}
            />
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} sm={7}>
              <EventOverview
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
      <EventConfrimation
        open={confirmOpen}
        toggleConfirm={toggleConfirm}
        eventId={curId}
      />
    </Container>
  );
};
export default EventsContainer;

EventsContainer.propTypes = {
  events: PropTypes.arrayOf(),
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
