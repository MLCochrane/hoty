import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withRouter } from 'react-router-dom';
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
						? <Menu 
							history={ this.props.history }
						/>
						: null
						}
						<Topbar
							loggedIn={ this.props.loggedIn }
							history={
								this.props.history
							}
						/>
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}
export default withRouter(connect(mapStateToProps)(Header));