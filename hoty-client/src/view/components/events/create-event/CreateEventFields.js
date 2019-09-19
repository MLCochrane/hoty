import React from 'react';
import PropTypes from 'prop-types';
import {
  DateTimePicker,
} from '@material-ui/pickers';

import {
  Container,
} from '@material-ui/core';

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
  <Container
    maxWidth="sm"
  >
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
      helperText={startDate.errors ? startDate.message : ''}
      inputVariant="filled"
      showTodayButton
    />
    <DateTimePicker
      value={endDate.val}
      disablePast
      onChange={date => handleDateChange(date, 'endDate')}
      label="End Date"
      error={endDate.errors}
      helperText={endDate.errors ? endDate.message : ''}
      inputVariant="filled"
      showTodayButton
    />
  </Container>
);
export default CreateEventFields;
CreateEventFields.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  title: PropTypes.shape({
    val: PropTypes.string,
    errors: PropTypes.bool,
    message: PropTypes.string,
  }).isRequired,
  description: PropTypes.shape({
    val: PropTypes.string,
    errors: PropTypes.bool,
    message: PropTypes.string,
  }).isRequired,
  startDate: PropTypes.shape({
    val: PropTypes.object,
    errors: PropTypes.bool,
    message: PropTypes.string,
  }).isRequired,
  endDate: PropTypes.shape({
    val: PropTypes.object,
    errors: PropTypes.bool,
    message: PropTypes.string,
  }).isRequired,
};
