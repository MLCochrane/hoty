import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import {
  Container,
  Paper,
  IconButton,
} from '@material-ui/core';
import {
  Cancel,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import CreateEventStepper from './CreateEventStepper';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(4),
  },
}));

const CreateEventsContainer = ({ step, changeStep }) => {
  const classes = useStyles();
  return (
    <Container
      maxWidth="xl"
      className={classes.container}
      data-cy="create-events-container"
    >
      <Paper
        elevation={1}
      >
        <Link
          to="/events"
        >
          <IconButton
            data-cy="close-form"
            color="primary"
          >
            <Cancel />
          </IconButton>
        </Link>
        <CreateEventStepper
          step={step}
          changeStep={changeStep}
        />
      </Paper>
    </Container>
  );
};
export default CreateEventsContainer;

CreateEventsContainer.propTypes = {
  step: PropTypes.number.isRequired,
  changeStep: PropTypes.func.isRequired,
};
