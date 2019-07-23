import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
} from '@material-ui/core/styles';

import {
  Typography,
  Button,
  Step,
  Stepper,
  StepLabel,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Fill out main details', 'Add relevant themes', 'Review and publish'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Uknown stepIndex';
  }
}

const CreateEventStepper = ({
  step,
  changeStep,
}) => {
  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Button
        color="primary"
        variant="contained"
        onClick={() => { changeStep(step); }}
        data-cy="event-form-next"
      >
        {(step === 1)
          ? 'Publish'
          : 'Next'
        }
      </Button>
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
    </div>
  );
};

export default CreateEventStepper;

CreateEventStepper.propTypes = {
  step: PropTypes.number.isRequired,
  changeStep: PropTypes.func.isRequired,
};
