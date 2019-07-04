import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	IconButton,
	Drawer,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventsIcon from '@material-ui/icons/ViewList';
import AccountIcon from '@material-ui/icons/AccountCircle';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import { logout } from '../../../../store/actions/userActions';

class Menu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false
		}

		this.logoutHandle = this.logoutHandle.bind(this);
	}

	toggleDrawer = (open) => () => {
		this.setState({
			open: open
		});
	};

	generateMenuBLock(items) {
		return (
			<List>
			{items.map((el, index) => (
				<ListItem
					button
					key={el.name}
					onClick={el.click}
					>
					<ListItemIcon>
						{ el.icon }
					</ListItemIcon>
					<ListItemText primary={el.name} />
				</ListItem>
			))}
		</List>
		)
	}

	logoutHandle() {
		this.props.dispatch(logout());
	}
	render() {
		const menuBlockTop = [
			{
				name: 'Dashboard',
				icon: <DashboardIcon />,
				click: () => {this.props.history.push('/')}
			},
			{
				name: 'Events',
				icon: <EventsIcon />,
				click: () => {this.props.history.push('/events')}
			}
		]
		
		const menuBlockBottom = [
			{
				name: 'Profile',
				icon: <AccountIcon />,
				click: () => {this.props.history.push('/profile')}
			},
			{
				name: 'Logout',
				icon: <LogoutIcon/>,
				click: this.logoutHandle
			}
		]
		const sideList = (
			<div>
				{ this.generateMenuBLock(menuBlockTop) }
				<Divider />
				{ this.generateMenuBLock(menuBlockBottom) }
			</div>
		);

		return (
			<div className="menu">
				<IconButton
					color="inherit"
					aria-label="Open drawer"
					onClick={this.toggleDrawer(true)}>
					<MenuIcon/>
				</IconButton>
				<Drawer
					open={this.state.open}
					onClose={this.toggleDrawer(false)}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer(false)}
						onKeyDown={this.toggleDrawer(false)}
					>
						{sideList}
					</div>
				</Drawer>
			</div>
		)
	}
}

export default connect()(Menu);