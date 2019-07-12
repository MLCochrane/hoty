import React from 'react';
import PropTypes from 'prop-types';
import FormUserDetails from './FormUserDetails';

const FormContainer = ({ step }) => {
  switch (step) {
    case 0:
      return <FormUserDetails form="login" />;
    case 1:
      return <FormUserDetails form="register" />;
    default:
      return null;
  }
};

export default FormContainer;

FormContainer.propTypes = {
  step: PropTypes.number,
};

FormContainer.defaultProps = {
  step: 0,
};
