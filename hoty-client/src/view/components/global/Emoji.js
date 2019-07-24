import React from 'react';
import PropTypes from 'prop-types';

const availThemes = {
  celebration: '🎉',
};

const mapTitlesToEmojis = str => availThemes[str];

const Emoji = ({
  theme,
}) => (
  <span
    className="emoji"
    role="img"
    aria-label={theme || ''}
    aria-hidden={theme ? 'false' : 'true'}
  >
    { mapTitlesToEmojis(theme) }
  </span>
);
export default Emoji;

Emoji.propTypes = {
  theme: PropTypes.string,
};

Emoji.defaultProps = {
  theme: null,
};
