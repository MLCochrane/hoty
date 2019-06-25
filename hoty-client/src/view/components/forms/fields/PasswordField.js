import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const PasswordField = props => {
	const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
	return (
		<FormControl
		fullWidth={ true }
		required={ true }
		>
			<InputLabel htmlFor="adornment-password">Password</InputLabel>
        <Input
					required
					id={`${props.formName}-password` }
					name={ props.inputName }
          type={values.showPassword ? 'text' : 'password'}
					value={ props.value }
					error={ props.errors }
					onChange={ props.handleChange }
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
		</FormControl >
	)
}

export default PasswordField;