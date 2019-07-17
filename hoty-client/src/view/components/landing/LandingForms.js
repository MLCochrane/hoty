import React from 'react';
import PropTypes from 'prop-types';
import {
  CSSTransition,
  SwitchTransition,
} from 'react-transition-group';

import { makeStyles } from '@material-ui/core/styles';

import {
  Typography,
  Container,
} from '@material-ui/core';

import FormContainer from './FormContainer';
import LandingFormLinks from './LandingFormLinks';

const useStyles = makeStyles(theme => ({
  formWrap: {
    position: 'absolute',
    transform: 'translate(-50%,calc(-50% - .5px)) translate3d(0,0,0)',
    top: '50%',
    left: '50%',
    backgroundColor: '#fff',
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  formTitle: {
    textTransform: 'capitalize',
  },
  formContainer: {
    marginBottom: theme.spacing(2),
  },
  captionButtons: {
    background: 'none',
    border: 'none',
    color: theme.palette.primary.light,
    cursor: 'pointer',
  },
}));

const LandingForms = (props) => {
  const classes = useStyles();
  const {
    formType,
    buttonCallback,
  } = props;
  return (
    <SwitchTransition>
      <CSSTransition
        key={formType}
        classNames="slide"
        timeout={300}
        in={formType}
      >
        <Container
          maxWidth="xs"
          className={classes.formWrap}
        >
          <Typography
            variant="h5"
            className={classes.formTitle}
          >
            {formType}
          </Typography>
          <Container
            className={classes.formContainer}
          >
            <FormContainer
              formType={formType}
            />
          </Container>
          <LandingFormLinks
            formType={formType}
            buttonCallback={buttonCallback}
            classes={classes}
          />
        </Container>
      </CSSTransition>
    </SwitchTransition>
  );
};
export default LandingForms;

LandingForms.propTypes = {
  formType: PropTypes.string,
  buttonCallback: PropTypes.func.isRequired,
};

LandingForms.defaultProps = {
  formType: 'login',
};
