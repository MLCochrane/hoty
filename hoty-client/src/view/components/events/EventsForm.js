import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import TitleField from '../forms/fields/TitleField';
import DescriptionField from '../forms/fields/DescriptionField';
import validator, { dateValidator } from '../forms/validator';

import { postEvent } from '../../../store/actions/eventActions';

const mapStateToProps = ({ users, events, token }) => ({
  error: users.error,
  fetching: events.fetching,
  fetched: events.fetched,
  token: token.token,
  id: users.user.id,
});

class EventsForm extends Component {
  constructor(props) {
    super(props);

    let initTitle = '';
    let initDescription = '';

    // Antipattern to define state from props but needed to init form when editing
    if (props.event && props.isEditing) {
      initTitle = props.event.title;
      initDescription = props.event.description;
    }

    this.startDateRef = React.createRef();
    this.endDateRef = React.createRef();

    this.state = {
      title: {
        val: initTitle,
        errors: false,
        message: '',
      },
      description: {
        val: initDescription,
        errors: false,
        message: '',
      },
      startDate: {
        val: new Date(),
        errors: false,
        message: '',
      },
      endDate: {
        val: new Date(),
        errors: false,
        message: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      fetched,
      toggleModal,
    } = this.props;
    if (prevProps.fetched !== fetched && fetched === true) toggleModal(false);
  }

  handleChange(e) {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    const errorResult = validator(name, value);

    this.setState({
      [name]: {
        ...[name],
        val: value,
        errors: !errorResult.valid,
        message: errorResult.message,
      },
    });
  }

  handleDateChange(date, name) {
    const { startDate, endDate } = this.state;
    let errorResult;

    if (name === 'startDate') {
      errorResult = dateValidator(date, endDate.val);
    } else {
      errorResult = dateValidator(startDate.val, date);
    }

    this.setState({
      [name]: {
        ...[name],
        val: date,
        errors: !errorResult.valid,
        message: errorResult.message,
      },
    });
  }

  handleSubmit(e) {
    const {
      token,
      id,
      dispatch,
    } = this.props;

    const {
      title,
      description,
      startDate,
      endDate,
    } = this.state;

    e.preventDefault();
    const reqBody = {
      title: title.val,
      description: description.val,
      startDate: startDate.val.toISOString(),
      endDate: endDate.val.toISOString(),
    };
    dispatch(postEvent(token, id, reqBody));
  }

  render() {
    const {
      open,
      toggleModal,
      error,
      fetching,
    } = this.props;

    const {
      title,
      description,
      startDate,
      endDate,
      isEditing,
    } = this.state;

    return (
      <Dialog
        open={open}
        onClose={() => { toggleModal(false); }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <p>{ isEditing }</p>
        <form
          className="form__events"
          noValidate
          onSubmit={this.handleSubmit}
        >
          <DialogTitle id="alert-dialog-title">Create new event.</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Make sure to name your event and provide a helpful and clear description.
            </DialogContentText>
            <Typography
              color="error"
            >
              { !error ? null : error.response.data.error.message }
            </Typography>
            <TitleField
              formName="event"
              inputName="title"
              value={title.val}
              errors={title.errors}
              errorMessage={title.message}
              handleChange={this.handleChange}
            />
            <DescriptionField
              formName="event"
              inputName="description"
              value={description.val}
              errors={description.errors}
              errorMessage={description.message}
              handleChange={this.handleChange}
            />
            <DateTimePicker
              value={startDate.val}
              disablePast
              onChange={date => this.handleDateChange(date, 'startDate')}
              label="Start Date"
              error={startDate.errors}
              helperText={startDate.errors ? startDate.errorMessage : ''}
              showTodayButton
            />
            <DateTimePicker
              value={endDate.val}
              disablePast
              onChange={date => this.handleDateChange(date, 'endDate')}
              label="End Date"
              error={endDate.errors}
              helperText={endDate.errors ? endDate.errorMessage : ''}
              showTodayButton
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => { toggleModal(false); }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                fetching
                || title.errors
                || description.errors
                || !title.val.length
                || !description.val.length}
            >
              {
                fetching
                  ? 'Fetching'
                  : 'Publish'
              }
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}
export default connect(mapStateToProps)(EventsForm);

EventsForm.propTypes = {
  open: PropTypes.bool.isRequired,
  event: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  toggleModal: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(),
  fetching: PropTypes.bool,
  fetched: PropTypes.bool,
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

EventsForm.defaultProps = {
  event: {},
  error: null,
  fetching: false,
  fetched: false,
};
