import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const UsernameField = ({
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
      name={inputName}
      id={`${formName}-username`}
      value={value}
      error={errors}
      label="Username"
      margin="normal"
      variant="standard"
      onChange={handleChange}
      helperText={errors ? errorMessage : ''}
    />
  </FormControl>
);

export default UsernameField;

UsernameField.propTypes = {
  inputName: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};
