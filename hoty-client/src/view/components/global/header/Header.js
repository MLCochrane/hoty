import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Menu from './Menu';
import HeaderIcons from './HeaderIcons';
import HeaderSettings from './HeaderSettings';

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
						<Menu />
						<Typography variant="h5" color="inherit" noWrap>
							Material-UI
            </Typography>
						<div className='flex-grow'/>
						{this.state.loggedIn
						? <React.Fragment>
								<HeaderIcons
									notifications='10'
									/>
								<HeaderSettings />
							</React.Fragment>
						: <Button
							color='inherit'
							onClick={() => {this.setState({loggedIn: !this.state.loggedIn})}}
							>Login</Button>
						}
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}
export default Header;