import React from 'react';

import IconButton from '@material-ui/core/IconButton';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
// import Badge from '@material-ui/core/Badge';

const HeaderIcons = props => {
	return (
		<div className='header__icons'>
			{/* <IconButton color='inherit'>
				<Badge
					badgeContent={props.notifications}
					color='secondary'
				>
					<NotificationsIcon />
				</Badge>
			</IconButton> */}
			<Link
				to="/profile"
			>
				<IconButton
					// aria-owns={isMenuOpen ? 'material-appbar' : undefined}
					aria-haspopup='true'
					color='inherit'
					>
					<AccountCircle />
				</IconButton>
			</Link>
		</div>
	);
};

export default HeaderIcons;
