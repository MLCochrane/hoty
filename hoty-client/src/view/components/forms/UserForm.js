import React, { Component } from 'react';

import API from '../../../api';

class UserForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			step: 1,
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
			<div className='form'>
				 { this.state.greeting }
				<button onClick={ this.nestStep }>
					Click me
				</button>
			</div>
		)
	}
}
export default UserForm;