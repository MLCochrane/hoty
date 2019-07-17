import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import PasswordField from '../forms/fields/PasswordField';
import EmailField from '../forms/fields/EmailField';
import NameField from '../forms/fields/NameField';
import UsernameField from '../forms/fields/UsernameField';
import validator from '../forms/validator';

import api from '../../../api';

export default class FormRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: {
        val: '',
        errors: false,
        message: '',
      },
      lastName: {
        val: '',
        errors: false,
        message: '',
      },
      username: {
        val: '',
        errors: false,
        message: '',
      },
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
      email,
      password,
    } = this.state;

    e.preventDefault();
    api.post('users/login', {
      email: email.val,
      password: password.val,
    });
  }

  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
    } = this.state;
    return (
      <form
        className="register"
        noValidate
        onSubmit={this.handleSubmit}
      >
        <NameField
          formName="register"
          inputName="firstName"
          label="Last Name"
          value={firstName.value}
          errors={firstName.errors}
          errorMessage={firstName.message}
          handleChange={this.handleChange}
        />
        <NameField
          formName="register"
          inputName="lastName"
          label="Last Name"
          value={lastName.value}
          errors={lastName.errors}
          errorMessage={lastName.message}
          handleChange={this.handleChange}
        />
        <UsernameField
          formName="register"
          inputName="username"
          value={username.value}
          errors={username.errors}
          errorMessage={username.message}
          handleChange={this.handleChange}
        />
        <EmailField
          formName="register"
          inputName="email"
          value={email.value}
          errors={email.errors}
          errorMessage={email.message}
          handleChange={this.handleChange}
        />
        <PasswordField
          formName="register"
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
          email.errors
          || password.errors
          || !email.val.length
          || !password.val.length}
        >
        Register
        </Button>
      </form>
    );
  }
}
