import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PasswordField from './fields/PasswordField';
import EmailField from './fields/EmailField';
import validator from './validator';

import { login } from '../../../store/actions/userActions';

const mapStateToProps = state => ({
  error: state.users.error,
  fetching: state.users.fetching,
});

class FormLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: {
        val: '',
        errors: false,
        message: '',
      },
      password: {
        val: '',
        errors: false,
        message: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    const errorResult = validator(name, value);

    this.setState({
      [name]: {
        // eslint-disable-next-line
        ...this.state[name],
        val: value,
        errors: !errorResult.valid,
        message: errorResult.message,
      },
    });
  }

  handleSubmit(e) {
    const {
      dispatch,
    } = this.props;

    const {
      email,
      password,
    } = this.state;

    e.preventDefault();
    const reqBody = {
      email: email.val,
      password: password.val,
    };
    dispatch(login(reqBody));
  }

  render() {
    const {
      error,
      fetching,
    } = this.props;

    const {
      email,
      password,
    } = this.state;

    return (
      <form
        className="form__login"
        noValidate
        onSubmit={this.handleSubmit}
        {...this.props}
      >
        <Typography
          color="error"
        >
          { !error ? null : error.response.data.error.message }
        </Typography>
        <EmailField
          formName="login"
          inputName="email"
          value={email.value}
          errors={email.errors}
          errorMessage={email.message}
          handleChange={this.handleChange}
        />
        <PasswordField
          formName="login"
          inputName="password"
          value={password.value}
          errors={password.errors}
          errorMessage={password.message}
          handleChange={this.handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={
          fetching
          || email.errors
          || password.errors
          || !email.val.length
          || !password.val.length}
        >
          {
          fetching
            ? 'Fetching'
            : 'Sign In'
        }
        </Button>
      </form>
    );
  }
}

export default connect(mapStateToProps)(FormLogin);

FormLogin.propTypes = {
  error: PropTypes.objectOf(),
  fetching: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

FormLogin.defaultProps = {
  error: null,
  fetching: false,
};
