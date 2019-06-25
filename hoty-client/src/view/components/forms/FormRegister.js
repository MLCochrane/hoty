import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import PasswordField from './fields/PasswordField';
import EmailField from './fields/EmailField';
import NameField from './fields/NameField';
import UsernameField from './fields/UsernameField';
import validator from './validator';

import api from './../../../api';

export default class FormRegister extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			firstName: {
				val: '',
				errors: false,
				message: ''
			},
			lastName: {
				val: '',
				errors: false,
				message: ''
			},
			username: {
				val: '',
				errors: false,
				message: ''
			},
			email: {
				val: '',
				errors: false,
				message: ''
			},
			password: {
				val: '',
				errors: false,
				message: ''
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		const errorResult = validator(name, value);
		console.log(errorResult);

		this.setState({
			[name]: {
				...this.state[name],
				val: value,
				errors: !errorResult.valid,
				message: errorResult.message
			}
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		api.post('users/login', {
			email: this.state.email.val,
			password: this.state.password.val
		}).then(res => {
			console.log(res);
		}).catch(err => {
			console.error(err);
		});
	}

	render() {
		return (
			<form className='register'
				noValidate
				onSubmit={ this.handleSubmit }>
			<NameField
				formName='register'
				inputName='firstName'
				label='Last Name'
				value={ this.state.firstName.value }
				errors={ this.state.firstName.errors }
				errorMessage={ this.state.firstName.message }
				handleChange={ this.handleChange }
			/>
			<NameField
				formName='register'
				inputName='lastName'
				label='Last Name'
				value={ this.state.lastName.value }
				errors={ this.state.lastName.errors }
				errorMessage={ this.state.lastName.message }
				handleChange={ this.handleChange }
			/>
			<UsernameField
				formName='register'
				inputName='username'
				value={ this.state.username.value }
				errors={ this.state.username.errors }
				errorMessage={ this.state.username.message }
				handleChange={ this.handleChange }
			/>
			<EmailField
				formName='register'
				inputName='email'
				value={ this.state.email.value }
				errors={ this.state.email.errors }
				errorMessage={ this.state.email.message }
				handleChange={ this.handleChange }
			/>
			<PasswordField
				formName='register'
				inputName='password'
				value={ this.state.password.value }
				errors={ this.state.password.errors }
				errorMessage={ this.state.password.message }
				handleChange={ this.handleChange }
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				disabled={
					this.state.email.errors ||
					this.state.password.errors ||
					!this.state.email.val.length ||
					!this.state.password.val.length }
			>
				Sign Up
			</Button>
		</form>
		)
	}
}