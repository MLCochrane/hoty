import React from 'react';
import {
	TextField, 
	FormControl
} from '@material-ui/core';

const DescriptionField = props => {
	return (
		<FormControl
		fullWidth={ true }
		required={ true }
		>
			<TextField
				required
				name={ props.inputName }
				id={ `${props.formName}-description` }
				value={ props.value }
				error={ props.errors }
				helperText={ props.errors ? props.errorMessage : '' }
				label='Description'
				margin='normal'
				variant='standard'
				multiline={true}
				rows={5}
				onChange={ props.handleChange }
			/>
		</FormControl >
	)
}

export default DescriptionField;