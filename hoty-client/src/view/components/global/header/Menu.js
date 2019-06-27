import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import DashboardIcon from '@material-ui/icons/Dashboard';
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
					onClick={(el.name === 'Logout') ? this.logoutHandle : null}
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
		console.log('fam');
		this.props.dispatch(logout());
	}
	render() {
		const menuBlockTop = [
			{
				name: 'Dashboard',
				icon: <DashboardIcon />
			}
		]
		
		const menuBlockBottom = [
			{
				name: 'Profile',
				icon: <AccountIcon />
			},
			{
				name: 'Logout',
				icon: <LogoutIcon/>
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