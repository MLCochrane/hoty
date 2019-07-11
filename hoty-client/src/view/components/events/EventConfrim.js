import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Dialog,
	DialogContent,
	DialogContentText,
	DialogActions,
	DialogTitle,
	Button,
} from '@material-ui/core';

import { deleteEvent } from '../../../store/actions/eventActions';

const mapStateToProps = ({events, token, users}) => {
	return {
		fetching: events.fetching,
		fetched: events.fetched,
		token: token.token,
		id: users.user._id
	}
}

class EventConfrimation extends Component {
	componentDidUpdate(prevProps) {
		if (prevProps.fetched !== this.props.fetched && this.props.fetched === true) this.props.toggleConfirm(false);
	}
	render() {
		return (
			<Dialog
				open={this.props.open}
				onClose={() => {this.props.toggleConfirm(false)}}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Delete this event?</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This action is nonreversable.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => {this.props.toggleConfirm(false)}}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {this.props.dispatch(deleteEvent(this.props.token, this.props.id, this.props.eventId))}}
						disabled = {
							this.props.fetching
						}
					>
						{
							this.props.fetching
							? 'Pending'
							: 'Confirm'
						}
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}
export default connect(mapStateToProps)(EventConfrimation);