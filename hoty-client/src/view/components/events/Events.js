import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAllEvents } from '../../../store/actions/eventActions';

import EventsContainer from './EventsContainer';

const mapStateToProps = ({events, token, users}) => {
	return {
    token: token.token,
		events: events.events,
		userId: users.user._id
	}
}

class Events extends Component {
	constructor(props) {
		super(props);

		this.state = {
			curId: null,
			formOpen: false,
			confirmOpen: false
		}

		this.setCurrent = this.setCurrent.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.toggleConfirm = this.toggleConfirm.bind(this);
	}
	componentDidMount() {
			this.props.dispatch(getAllEvents(this.props.token));
	}
	setCurrent(id) {
		this.setState({
			curId: id
		})
	}
	toggleModal(open) {
		this.setState({
			formOpen: open
		})
	}
	toggleConfirm(open) {
		this.setState({
			confirmOpen: open
		})
	}
	render() {
		return (
			<div className='events'>
				{this.props.noAuth
					? <Redirect to='/login' />
					: <EventsContainer
						events={this.props.events}
						callback={this.setCurrent}
						curId={this.state.curId}
						toggleModal={this.toggleModal}
						toggleConfirm={this.toggleConfirm}
						formOpen={this.state.formOpen}
						confirmOpen={this.state.confirmOpen}
						userId={this.props.userId}
						/>
				}
			</div>
		)
	}
}
export default connect(mapStateToProps)(Events);