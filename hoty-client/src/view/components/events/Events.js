import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAllEvents } from '../../../store/actions/eventActions';

const mapStateToProps = ({events, token}) => {
	return {
        token: token.token,
		events: events.events
	}
}

class Events extends Component {
    componentDidMount() {
        this.props.dispatch(getAllEvents(this.props.token));
    }
	deets() {
		return (
			<div>
				{ this.props.events.map((el, index) => (
					<div key={ index }>
						<h2>{ el.title }</h2>
						<p>{ el.description }</p>
					</div>
				))}
			</div>
		)
	}
	render() {
		return (
			<div className='events'>
				{this.props.noAuth
					? <Redirect to='/login' />
					: this.deets()
				}
			</div>
		)
	}
}
export default connect(mapStateToProps)(Events);