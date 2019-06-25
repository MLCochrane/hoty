import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const EmailField = props => {
	return (
		<FormControl
		fullWidth={ true }
		required={ true }
		>
			<TextField
				required
				name={ props.inputName }
				id={ `${props.formName}-email` }
				value={ props.value }
				error={ props.errors }
				helperText={ props.errors ? props.errorMessage : '' }
				label='Email'
				margin='normal'
				variant='standard'
				onChange={ props.handleChange }
			/>
		</FormControl >
	)
}

export default EmailField;