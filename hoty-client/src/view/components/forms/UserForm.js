import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
	constructor(props) {
		super(props);

		this.state = {
			shouldRedirect: false,
			step: 0
		}
	}
	handleChange = (event, value) => {
		this.setState({ step: value });
	}

	componentDidUpdate(prev) {
		if (prev.loggedIn !== this.props.loggedIn && this.props.loggedIn === true) {
			this.setState({ shouldRedirect: true });
		}
	}

	componentDidMount() {
		if (this.props.loggedIn) this.setState({ shouldRedirect: true });
	}

	render() {
		return (
			<Container maxWidth="md">
				{this.state.shouldRedirect
				? <Redirect to={{
						pathname: '/',
						exact: true
					}} />
				: <Paper className='form'>
						<Paper>
							<Tabs value={ this.state.step } onChange={this.handleChange} variant='fullWidth'>
								<Tab label='Login' />
								<Tab label='Register' />
							</Tabs>
							<FormContainer step={ this.state.step } />
						</Paper>
					</Paper>
				}
			</Container>
		)
	}
}
export default connect(mapStateToProps)(UserForm);