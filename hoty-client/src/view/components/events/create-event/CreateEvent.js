import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import {
  Redirect,
} from 'react-router-dom';
import {
  connect,
} from 'react-redux';
import './create-event.scss';

import PageBar from '../../global/header/PageBar';
import CreateEventContainer from './CreatEventContainer';

const mapStateToProps = ({ events, token, users }) => ({
  token: token.token,
  events: events.events,
  user: users.user,
});

class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
    };

    this.changeStep = this.changeStep.bind(this);
  }

  changeStep(num) {
    if (num < 0 || num > 2) {
      return;
    }

    this.setState({
      step: num + 1,
    });
  }

  render() {
    const {
      step,
    } = this.state;
    const {
      noAuth,
    } = this.props;
    return (
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        {noAuth
          ? <Redirect to="/" />
          : (
            <div
              data-cy="create-events"
            >
              <PageBar
                title="Create new event"
                blurb="I'm excited already!"
              />
              <CreateEventContainer
                step={step}
                changeStep={this.changeStep}
              />
            </div>
          )
        }
      </MuiPickersUtilsProvider>
    );
  }
}

export default connect(mapStateToProps)(CreateEvent);

CreateEvent.propTypes = {
  noAuth: PropTypes.bool.isRequired,
};
