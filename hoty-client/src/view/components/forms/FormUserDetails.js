import React from 'react';
import PropTypes from 'prop-types';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';


const FormUserDetails = ({ form }) => (
  (form === 'login'
    ? <FormLogin />
    : <FormRegister />
  )
);

export default FormUserDetails;

FormUserDetails.propTypes = {
  form: PropTypes.string.isRequired,
};
