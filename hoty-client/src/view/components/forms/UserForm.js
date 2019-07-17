import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import FormContainer from '../landing/FormContainer';

const mapStateToProps = ({ users }) => ({
  loggedIn: users.loggedIn,
});

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRedirect: false,
      step: 0,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { loggedIn } = this.props;
    if (loggedIn) this.setState({ shouldRedirect: true });
  }

  componentDidUpdate(prev) {
    const { loggedIn } = this.props;

    if (prev.loggedIn !== loggedIn && loggedIn === true) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        shouldRedirect: true,
      });
    }
  }

  handleChange(event, value) {
    this.setState({ step: value });
  }


  render() {
    const {
      shouldRedirect,
      step,
    } = this.state;

    return (
      <Container maxWidth="md">
        {shouldRedirect
          ? (
            <Redirect to={{
              pathname: '/',
              exact: true,
            }}
            />
          )
          : (
            <Paper className="form">
              <Paper>
                <Tabs value={step} onChange={this.handleChange} variant="fullWidth">
                  <Tab label="Login" />
                  <Tab label="Register" />
                </Tabs>
                <FormContainer step={step} />
              </Paper>
            </Paper>
          )
        }
      </Container>
    );
  }
}
export default connect(mapStateToProps)(UserForm);

UserForm.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};
