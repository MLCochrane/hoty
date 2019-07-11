import React from 'react';
import {
	TextField, 
	FormControl
} from '@material-ui/core';

const TitleField = props => {
	return (
		<FormControl
		fullWidth={ true }
		required={ true }
		>
			<TextField
				required
				name={ props.inputName }
				id={ `${props.formName}-title` }
				value={ props.value }
				error={ props.errors }
				helperText={ props.errors ? props.errorMessage : '' }
				label='Title'
				margin='normal'
				variant='standard'
				onChange={ props.handleChange }
			/>
		</FormControl >
	)
}

export default TitleField;