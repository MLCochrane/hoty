import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PasswordField from './fields/PasswordField';
import EmailField from './fields/EmailField';
import validator from './validator';

import { login } from '../../../store/actions/userActions';

const mapStateToProps = state => {
	return {
		error: state.users.error,
		fetching: state.users.fetching
	}
}

class FormLogin extends Component {
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
		const reqBody = {
				email: this.state.email.val,
				password: this.state.password.val
		}
		this.props.dispatch(login(reqBody));
	}

	render() {
		return (
			<form className='form__login'
				noValidate
				onSubmit={ this.handleSubmit }>
			<Typography
				color='error'
			>
				{ !this.props.error ? null : this.props.error.response.data.error.message }
			</Typography>
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
					this.props.fetching ||
					this.state.email.errors ||
					this.state.password.errors ||
					!this.state.email.val.length ||
					!this.state.password.val.length }
			>
				{
					this.props.fetching
					? 'Fetching'
					: 'Sign In'
				}
			</Button>
		</form>
		)
	}
}

export default connect(mapStateToProps)(FormLogin);