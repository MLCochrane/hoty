import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Menu from './Menu';
import Topbar from './Topbar';

const mapStateToProps = ({ users }) => {
	return {
		loggedIn: users.loggedIn
	}
}

class Header extends Component {
	render() {
		return (
			<div className='header'>
				<AppBar position="static">
					<Toolbar>
						{this.props.loggedIn
						? <Menu />
						: null
						}
						<Topbar
							loggedIn={ this.props.loggedIn }
						/>
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}
export default connect(mapStateToProps)(Header);