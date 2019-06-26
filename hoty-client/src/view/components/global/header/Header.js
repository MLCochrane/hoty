import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Menu from './Menu';
import Topbar from './Topbar';


class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false
		}
	}
	render() {
		return (
			<div className='header'>
				<AppBar position="static">
					<Toolbar>
						{this.state.loggedIn
						? <Menu />
						: null
						}
						<Topbar
							loggedIn={ this.state.loggedIn }
						/>
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}
export default Header;