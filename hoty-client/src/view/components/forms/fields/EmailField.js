import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const EmailField = ({
  inputName,
  formName,
  value,
  errors,
  handleChange,
  errorMessage,
}) => (
  <FormControl
    fullWidth
    required
  >
    <TextField
      required
      name={inputName}
      id={`${formName}-email`}
      value={value}
      error={errors}
      helperText={errors ? errorMessage : ''}
      label="Email"
      margin="normal"
      variant="filled"
      onChange={handleChange}
    />
  </FormControl>
);

export default EmailField;

EmailField.propTypes = {
  inputName: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};
