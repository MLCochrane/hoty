import React from 'react';
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
} from '@material-ui/core';
// import PropTypes from 'prop-types';

import EmojiWrapper from '../../global/Emoji';

const CreateEventThemes = ({
  themes,
  toggleThemeCheckbox,
}) => (
  <Container
    maxWidth="sm"
  >
    <List
      data-cy="event-form-themes"
    >
      {themes.map((el, index) => {
        const labelId = `checkbox-list-label-${el.title}`;
        return (
          <ListItem
            key={el.title}
            role={undefined}
            dense
            button
            onClick={() => { toggleThemeCheckbox(index, !el.checked, el.title); }}
          >
            <ListItemIcon>
              <EmojiWrapper
                theme={el.title}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={el.title} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                checked={el.checked}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
                onClick={() => { toggleThemeCheckbox(index, !el.checked, el.title); }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  </Container>
);

export default CreateEventThemes;
CreateEventThemes.propTypes = {
};
