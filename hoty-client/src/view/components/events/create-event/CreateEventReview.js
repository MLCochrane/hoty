import React from 'react';
import {
  Container,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import EmojiWrapper from '../../global/Emoji';


const CreateEventReview = ({
  title,
  description,
  themes,
  startDate,
  endDate,
}) => (
  <Container
    data-cy="event-form-review"
  >
    <p>{ title.val }</p>
    <p>{ description.val }</p>
    {
      themes.filter(el => el.checked).map(el => (
        <EmojiWrapper
          key={el.title}
          theme={el.title}
        />
      ))
    }
  </Container>
);
export default CreateEventReview;
CreateEventReview.propTypes = {
};
