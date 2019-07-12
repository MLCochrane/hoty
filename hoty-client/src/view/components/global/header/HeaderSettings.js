import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';

const HeaderSetings = ({ handleMobileMenuOpen }) => (
  <div className="header__settings">
    <IconButton aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
      <MoreIcon />
    </IconButton>
  </div>
);

export default HeaderSetings;

HeaderSetings.propTypes = {
  handleMobileMenuOpen: PropTypes.func.isRequired,
};
