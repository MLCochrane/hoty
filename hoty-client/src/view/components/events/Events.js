import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAllEvents } from '../../../store/actions/eventActions';

import EventsContainer from './EventsContainer';

const mapStateToProps = ({events, token}) => {
	return {
    token: token.token,
		events: events.events
	}
}

class Events extends Component {
	constructor(props) {
		super(props);

		this.state = {
			curIndex: null,
			modalOpen: false
		}

		this.setCurrent = this.setCurrent.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}
	componentDidMount() {
			this.props.dispatch(getAllEvents(this.props.token));
	}
	setCurrent(index) {
		this.setState({
			curIndex: index
		})
	}
	toggleModal(open) {
		this.setState({
			modalOpen: open 
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
						curIndex={this.state.curIndex}
						toggleModal={this.toggleModal}
						modalOpen={this.state.modalOpen}
						/>
				}
			</div>
		)
	}
}
export default connect(mapStateToProps)(Events);