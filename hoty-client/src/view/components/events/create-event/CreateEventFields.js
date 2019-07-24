import React from 'react';
import PropTypes from 'prop-types';
import {
  DateTimePicker,
} from '@material-ui/pickers';

import TitleField from '../../forms/fields/TitleField';
import DescriptionField from '../../forms/fields/DescriptionField';

const CreateEventFields = ({
  title,
  description,
  startDate,
  endDate,
  handleChange,
  handleDateChange,
}) => (
  <React.Fragment>
    <TitleField
      formName="event"
      inputName="title"
      value={title.val}
      errors={title.errors}
      errorMessage={title.message}
      handleChange={handleChange}
    />
    <DescriptionField
      formName="event"
      inputName="description"
      value={description.val}
      errors={description.errors}
      errorMessage={description.message}
      handleChange={handleChange}
    />
    <DateTimePicker
      value={startDate.val}
      disablePast
      onChange={date => handleDateChange(date, 'startDate')}
      label="Start Date"
      error={startDate.errors}
      helperText={startDate.errors ? startDate.errorMessage : ''}
      inputVariant="filled"
      showTodayButton
    />
    <DateTimePicker
      value={endDate.val}
      disablePast
      onChange={date => handleDateChange(date, 'endDate')}
      label="End Date"
      error={endDate.errors}
      helperText={endDate.errors ? endDate.errorMessage : ''}
      inputVariant="filled"
      showTodayButton
    />
  </React.Fragment>
);
export default CreateEventFields;
CreateEventFields.propTypes = {
};
