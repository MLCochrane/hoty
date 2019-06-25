import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const UsernameField = props => {
	return (
		<FormControl
		fullWidth={ true }
		required={ true }
		>
			<TextField
				name={ props.inputName }
				id={`${props.formName}-username` }
				value={ props.value }
				error={ props.errors }
				label='Username'
				margin='normal'
				variant='standard'
				onChange={ props.handleChange }
				helperText={ props.errors ? props.errorMessage : '' }
			/>
		</FormControl>
	)
}

export default UsernameField;