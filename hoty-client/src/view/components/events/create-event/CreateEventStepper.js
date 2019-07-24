import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
} from '@material-ui/core/styles';
// import {
//   CSSTransition,
//   TransitionGroup,
// } from 'react-transition-group';

import {
  Container,
  Button,
  Step,
  Stepper,
  StepLabel,
} from '@material-ui/core';

import CreateEventForm from './CreateEventForm';

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center',
  },
  curStep: {
    position: 'relative',
    minHeight: '400px',
    // overflow: 'auto',
  },
}));

function getSteps() {
  return ['Fill out main details', 'Add relevant themes', 'Review and publish'];
}

const CreateEventStepper = ({
  step,
  changeStep,
}) => {
  const classes = useStyles();
  const steps = getSteps();

  return (
    <Container
      className={classes.container}
    >
      <CreateEventForm
        step={step}
        changeStep={changeStep}
      />
      <Stepper
        activeStep={step}
        alternativeLabel
        data-cy="event-form-stepper"
      >
        {
          steps.map(el => (
            <Step
              key={el}
              data-cy="event-form-step"
            >
              <StepLabel>
                {el}
              </StepLabel>
            </Step>
          ))
        }
      </Stepper>
    </Container>
  );
};

export default CreateEventStepper;

CreateEventStepper.propTypes = {
  step: PropTypes.number.isRequired,
  changeStep: PropTypes.func.isRequired,
};
