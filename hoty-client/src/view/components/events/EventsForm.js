import React, { Component } from 'react';

import { Modal } from '@material-ui/core';

class EventsForm extends Component {
	render() {
		return (
			<Modal open={this.props.open}>
				<div>
				 Form
				</div>
			</Modal>
		)
	}
}
export default EventsForm;