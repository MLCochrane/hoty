import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import FormContainer from './FormContainer';

const mapStateToProps = ({ users }) => {
	return {
		loggedIn: users.loggedIn
	}
};

class UserForm extends Component {
	handleChange = (event, value) => {
		// this.setState({ step: value });
	}

	render() {
		return (
			<Container maxWidth="md">
				<Paper className='form'>
					<Paper>
						<Tabs value={ 0 } onChange={this.handleChange} variant='fullWidth'>
							<Tab label='Login' />
							<Tab label='Register' />
						</Tabs>
						<FormContainer step={ 0 } />
					</Paper>
				</Paper>
			</Container>
		)
	}
}
export default connect(mapStateToProps)(UserForm);