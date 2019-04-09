import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';

const HeaderSetings = props => {
	return (
		<div className='header__settings'>
			<IconButton aria-haspopup="true" onClick={props.handleMobileMenuOpen} color="inherit">
				<MoreIcon />
			</IconButton>
		</div>
	);
};

export default HeaderSetings;
