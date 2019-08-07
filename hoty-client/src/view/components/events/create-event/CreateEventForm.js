import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Typography,
} from '@material-ui/core';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import validator, { dateValidator } from '../../forms/validator';

import { postEvent } from '../../../../store/actions/eventActions';

import CreateEventFields from './CreateEventFields';
import CreateEventThemes from './CreateEventThemes';
import CreateEventReview from './CreateEventReview';

const mapStateToProps = ({ users, events, token }) => ({
  error: users.error,
  fetching: events.fetching,
  fetched: events.fetched,
  token: token.token,
  id: users.user.id,
});

class CreateEventForm extends Component {
  constructor(props) {
    super(props);

    this.startDateRef = React.createRef();
    this.endDateRef = React.createRef();

    this.state = {
      title: {
        val: '',
        errors: false,
        message: '',
      },
      description: {
        val: '',
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
      themes: [
        {
          title: 'celebration',
          checked: false,
        },
        {
          title: 'sports',
          checked: false,
        },
        {
          title: 'party',
          checked: false,
        },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleThemeCheckbox = this.toggleThemeCheckbox.bind(this);
  }

  handleChange(e) {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    const errorResult = validator(name, value);

    this.setState({
      [name]: {
        val: value,
        errors: !errorResult.valid,
        message: errorResult.message,
      },
    });
  }

  toggleThemeCheckbox(i, checked, title) {
    const {
      themes,
    } = this.state;

    const updatedTheme = {
      title,
      checked,
    };

    /* Makes copy of array and then updates object at index i with new obj
    *  Ensures that we're not modifying state directly
    */
    const themesCopy = Object.assign([...themes], { [i]: updatedTheme });

    this.setState({
      themes: themesCopy,
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
      error,
      fetching,
      step,
      changeStep,
    } = this.props;

    const {
      title,
      description,
      startDate,
      endDate,
      themes,
    } = this.state;

    const titles = [
      'Overview',
      'Themes',
      'Review and Publish',
    ];

    const displayStepContent = (curStep) => {
      switch (curStep) {
        case 0:
          return (
            <CreateEventFields
              title={title}
              description={description}
              startDate={startDate}
              endDate={endDate}
              handleChange={this.handleChange}
              handleDateChange={this.handleDateChange}
            />
          );
        case 1:
          return (
            <CreateEventThemes
              themes={themes}
              toggleThemeCheckbox={this.toggleThemeCheckbox}
            />
          );
        case 2:
          return (
            <CreateEventReview
              title={title}
              description={description}
              startDate={startDate}
              endDate={endDate}
              themes={themes}
            />
          );
        default:
          return null;
      }
    };

    const submitButton = () => (
      <div>
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
      </div>
    );

    const nextButton = () => (
      <Button
        color="primary"
        variant="contained"
        onClick={() => { changeStep(step); }}
        data-cy="event-form-next"
      >
          Next
      </Button>
    );

    return (
      <div className="create-event__form-wrap">
        <form
          className="create-event__form"
          noValidate
          onSubmit={this.handleSubmit}
          data-cy="event-form"
        >
          <Typography
            variant="h5"
            data-cy="event-form-title"
          >
            {titles[step]}
          </Typography>
          <Typography
            color="error"
          >
            { !error ? null : error.response.data.error.message }
          </Typography>
          <TransitionGroup
            className="create-event__step-wrap"
          >
            <CSSTransition
              key={step}
              timeout={300}
              classNames="slide-right"
            >
              {displayStepContent(step)}
            </CSSTransition>
          </TransitionGroup>
          {(step === 2)
            ? submitButton()
            : nextButton()
          }
        </form>
      </div>
    );
  }
}
export default connect(mapStateToProps)(CreateEventForm);

CreateEventForm.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.objectOf(),
  fetching: PropTypes.bool,
  fetched: PropTypes.bool,
  token: PropTypes.string.isRequired,
  id: PropTypes.string,
};

CreateEventForm.defaultProps = {
  event: {},
  error: null,
  fetching: false,
  fetched: false,
  id: '',
};
