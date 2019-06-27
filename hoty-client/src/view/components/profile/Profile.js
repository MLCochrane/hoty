import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Profile extends Component {
	render() {
		return (
			<div className='profile'>
				{this.props.noAuth
					? <Redirect to='/login' />
					: <h1>Hi</h1>
				}
			</div>
		)
	}
}
export default Profile;