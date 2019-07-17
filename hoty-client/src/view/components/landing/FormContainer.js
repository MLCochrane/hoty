import React from 'react';
import PropTypes from 'prop-types';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';

const FormContainer = ({ formType }) => {
  switch (formType) {
    case 'login':
      return <FormLogin />;
    case 'register':
      return <FormRegister />;
    default:
      return null;
  }
};

export default FormContainer;

FormContainer.propTypes = {
  formType: PropTypes.string,
};

FormContainer.defaultProps = {
  formType: 'login',
};
