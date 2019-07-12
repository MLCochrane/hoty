import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const PasswordField = ({
  inputName,
  formName,
  value,
  errors,
  handleChange,
}) => {
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  return (
    <FormControl
      fullWidth
      required
    >
      <InputLabel htmlFor="adornment-password">Password</InputLabel>
      <Input
        required
        id={`${formName}-password`}
        name={inputName}
        type={values.showPassword ? 'text' : 'password'}
        value={value}
        error={errors}
        onChange={handleChange}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
)}
      />
    </FormControl>
  );
};

export default PasswordField;

PasswordField.propTypes = {
  inputName: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};
