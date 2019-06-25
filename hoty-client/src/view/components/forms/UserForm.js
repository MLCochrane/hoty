import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import FormContainer from './FormContainer';

import API from '../../../api';

class UserForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			step: 0,
			username: '',
			password: '',
			confirmPass: '',
			firstName: 'Mohammed',
			lastName: 'Ali',
			greeting: 'Waiting'
		}
	}

	nestStep = () => {
		const token = localStorage.getItem('token');
		API.get('users/me',
		{
			headers: {
				'Authorization': 'Bearer ' + token
			}
		})
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
		// const { step } = this.state;
		// this.setState({step: step + 1});
	}

	handleChange = (event, value) => {
		this.setState({ step: value });
	}

	render() {
		const { step } = this.state;
		return (
			<Container maxWidth="md">
				<Paper className='form'>
					<Paper>
						<Tabs value={ step } onChange={this.handleChange} variant='fullWidth'>
							<Tab label='Login' />
							<Tab label='Register' />
						</Tabs>
						<FormContainer step={ step } />
						<button onClick={ this.nestStep } >HELLLO</button>
					</Paper>
				</Paper>
			</Container>
		)
	}
}
export default UserForm;