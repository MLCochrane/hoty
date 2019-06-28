import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = ({users, events}) => {
	return {
		user: users.user,
		events: events.eventsUser
	}
}

class Profile extends Component {
	deets() {
		return (
			<div>
				<h1>username: { this.props.user.username }</h1>
				<p>firstname: { this.props.user.firstName }</p>
				<p>lastname: { this.props.user.lastName }</p>
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
			<div className='profile'>
				{this.props.noAuth
					? <Redirect to='/login' />
					: this.deets()
				}
			</div>
		)
	}
}
export default connect(mapStateToProps)(Profile);