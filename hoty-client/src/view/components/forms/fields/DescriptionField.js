import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  FormControl,
} from '@material-ui/core';

const DescriptionField = ({
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
      id={`${formName}-description`}
      value={value}
      error={errors}
      helperText={errors ? errorMessage : ''}
      label="Description"
      margin="normal"
      variant="standard"
      multiline
      rows={5}
      onChange={handleChange}
    />
  </FormControl>
);

export default DescriptionField;

DescriptionField.propTypes = {
  inputName: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};
