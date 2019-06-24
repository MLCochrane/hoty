import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';


class FormUserDetails extends Component {
	render() {
		const login = (
			<React.Fragment>
				<FormControl fullWidth='true'>
					<TextField
						required
						id='login-username'
						label='Username'
						defaultValue=''
						margin='normal'
						variant='standard'
					/>
				</FormControl>
				<FormControl fullWidth='true'>
					<TextField
						required
						id='login-password'
						label='Password'
						defaultValue=''
						margin='normal'
						variant='standard'
					/>
				</FormControl>
			</React.Fragment>
		);

		const register = (
			<React.Fragment>
				<FormControl fullWidth='true'>
					<TextField
						required
						id='register-username'
						label='Username'
						defaultValue=''
						margin='normal'
						variant='standard'
					/>
				</FormControl>
				<FormControl fullWidth='true'>
					<TextField
						required
						id='register-password'
						label='Password'
						defaultValue=''
						margin='normal'
						variant='standard'
					/>
				</FormControl>
				<FormControl fullWidth='true'>
					<TextField
						required
						id='register-firstname'
						label='First Name'
						defaultValue=''
						margin='normal'
						variant='standard'
					/>
				</FormControl>
				<FormControl fullWidth='true'>
					<TextField
						required
						id='register-lastname'
						label='Last Name'
						defaultValue=''
						margin='normal'
						variant='standard'
					/>
				</FormControl>
			</React.Fragment>
		);
		return (
			<form className='form__details' noValidate>
			{this.props.form === 'login'
			 ? { login }
			 : { register }
			}
			</form>
		);
	}
}
export default FormUserDetails;