import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import PasswordField from './fields/PasswordField';
import EmailField from './fields/EmailField';
import validator from './validator';

import api from './../../../api';

export default class FormLogin extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			email: {
				val: '',
				errors: false,
				message: ''
			},
			password: {
				val: '',
				errors: false,
				message: ''
			},
			errors: []
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		const errorResult = validator(name, value);

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
			console.log('response');
			if (res.data && res.data.token) {
				localStorage.setItem('token', res.data.token);
			}
		}).catch(err => {
			this.state.push(err.response);
			console.log(err.response);
		});
	}

	render() {
		return (
			<form className='form__login'
				noValidate
				onSubmit={ this.handleSubmit }>
			<EmailField
				formName='login'
				inputName='email'
				value={ this.state.email.value }
				errors={ this.state.email.errors }
				errorMessage={ this.state.email.message }
				handleChange={ this.handleChange }
			/>
			<PasswordField
				formName='login'
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
				Sign In
			</Button>
		</form>
		)
	}
}