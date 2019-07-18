import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
} from '@material-ui/core';

const LandingFormLinks = (props) => {
  const {
    formType,
    buttonCallback,
    classes,
  } = props;

  return (
    <div className="">
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
    </div>
  );
};
export default LandingFormLinks;
LandingFormLinks.propTypes = {
  formType: PropTypes.string.isRequired,
  buttonCallback: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    captionButtons: PropTypes.string,
  }).isRequired,
};
