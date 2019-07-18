import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  Container,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  landingIntro: {
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
    top: '50%',
    left: '50%',
    backgroundColor: '#fff',
  },
  landingButtons: {
    display: 'flex',
    flexDirection: 'column',
  },
  landingTitle: {
    marginBottom: theme.spacing(2),
  },
  landingType: {
    textAlign: 'center',
    marginBottom: theme.spacing(6),
  },
  buttons: {
    marginBottom: theme.spacing(2),
  },
}));

const LandingIntro = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.landingIntro}>
      <Container
        className={classes.landingType}
      >
        <Typography
          variant="h2"
          component="h1"
          color="primary"
          className={classes.landingTitle}
        >
          Host Of The Year
        </Typography>
        <Typography
          color="primary"
        >
          Stay up to date on what&#39;s happening and who&#39;s making it happen!
        </Typography>
      </Container>
      <Container
        maxWidth="xs"
        className={classes.landingButtons}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth={false}
          size="large"
          className={classes.buttons}
          onClick={() => { props.buttonCallback('register'); }}
        >
          Register
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth={false}
          size="large"
          onClick={() => { props.buttonCallback('login'); }}
        >
          Login
        </Button>
      </Container>
    </div>
  );
};
export default LandingIntro;

LandingIntro.propTypes = {
  buttonCallback: PropTypes.func.isRequired,
};
