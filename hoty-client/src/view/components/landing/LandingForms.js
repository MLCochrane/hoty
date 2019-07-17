import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import {
  Typography,
  Container,
} from '@material-ui/core';

import FormContainer from './FormContainer';


const useStyles = makeStyles(theme => ({
  formWrap: {
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
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
      {(formType === 'login')
        ? (
          <Typography
            variant="caption"
          >
            Don&#39;t have an account?
            <button
              type="button"
              className={classes.captionButtons}
              onClick={() => { buttonCallback('register'); }}
            >
              Create one
            </button>
            now.
          </Typography>
        )
        : (
          <Typography
            variant="caption"
          >
            Already have an account?
            <button
              type="button"
              className={classes.captionButtons}
              onClick={() => { buttonCallback('login'); }}
            >
              Sign in
            </button>
            now.
          </Typography>
        )
      }
    </Container>
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
