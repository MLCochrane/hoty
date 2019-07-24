import React from 'react';
import PropTypes, { array } from 'prop-types';

import EmojiWrapper from '../../global/Emoji';


const CreateEventReview = ({
  title,
  description,
  themes,
  startDate,
  endDate,
}) => (
  <div className="">
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
  </div>
);
export default CreateEventReview;
CreateEventReview.propTypes = {
};
