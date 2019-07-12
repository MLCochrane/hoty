import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  FormControl,
} from '@material-ui/core';

const TitleField = ({
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
      id={`${formName}-title`}
      value={value}
      error={errors}
      helperText={errors ? errorMessage : ''}
      label="Title"
      margin="normal"
      variant="standard"
      onChange={handleChange}
    />
  </FormControl>
);

export default TitleField;

TitleField.propTypes = {
  inputName: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};
