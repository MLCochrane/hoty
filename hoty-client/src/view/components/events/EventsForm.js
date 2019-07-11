import React, { Component } from 'react';
import { connect } from 'react-redux';

import TitleField from '../forms/fields/TitleField';
import DescriptionField from '../forms/fields/DescriptionField';
import validator from '../forms/validator';

import { postEvent } from '../../../store/actions/eventActions';

import {
	Dialog,
	DialogContent,
	DialogContentText,
	DialogActions,
	DialogTitle,
	Button, 
	Typography,
 } from '@material-ui/core';

const mapStateToProps = state => {
	return {
		error: state.users.error,
		fetching: state.events.fetching,
		fetched: state.events.fetched,
		token: state.token.token,
		id: state.users.user._id 
	}
}

class EventsForm extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			title: {
				val: '',
				errors: false,
				message: ''
			},
			description: {
				val: '',
				errors: false,
				message: ''
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
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
				title: this.state.title.val,
				description: this.state.description.val
		}
		this.props.dispatch(postEvent(this.props.token, this.props.id, reqBody));
	}

	componentDidUpdate(prevProps) {
		if (prevProps.fetched !== this.props.fetched && this.props.fetched === true) this.props.toggleModal(false);
	}

	render() {
		return (
			<Dialog
				open={this.props.open}
				onClose={() => {this.props.toggleModal(false)}}
				aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
				>
				<form className='form__events'
					noValidate
					onSubmit={ this.handleSubmit }>
					<DialogTitle id="alert-dialog-title">Create new event.</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Make sure to name your event and provide a helpful and clear description.
						</DialogContentText>
					<Typography
						color='error'
					>
						{ !this.props.error ? null : this.props.error.response.data.error.message }
					</Typography>
					<TitleField
						formName='event'
						inputName='title'
						value={ this.state.title.value }
						errors={ this.state.title.errors }
						errorMessage={ this.state.title.message }
						handleChange={ this.handleChange }
					/>
					<DescriptionField
						formName='event'
						inputName='description'
						value={ this.state.description.value }
						errors={ this.state.description.errors }
						errorMessage={ this.state.description.message }
						handleChange={ this.handleChange }
					/>
					</DialogContent>
					<DialogActions>
						<Button
						variant="contained"
						color="secondary"
						onClick={() => {this.props.toggleModal(false)}}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={
								this.props.fetching ||
								this.state.title.errors ||
								this.state.description.errors ||
								!this.state.title.val.length ||
								!this.state.description.val.length }
						>
							{
								this.props.fetching
								? 'Fetching'
								: 'Publish'
							}
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		)
	}
}
export default connect(mapStateToProps)(EventsForm);