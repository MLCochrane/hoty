import React, { Component } from 'react';
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
		API.get('/ping')
		.then(res => {
			this.setState({greeting: res.data.greeting});
		})
		.catch(err => {
			console.log(err);
		});
		// const { step } = this.state;
		// this.setState({step: step + 1});
	}

	render() {
		return (
			<Paper className='form'>
				<Paper>
					<Tabs value={ 0 } onChange={this.handleChange} variant='fullWidth'>
						<Tab label='Register' />
						<Tab label='Login' />
					</Tabs>
					<FormContainer step={ this.state.step } />
				</Paper>
			</Paper>
		)
	}
}
export default UserForm;