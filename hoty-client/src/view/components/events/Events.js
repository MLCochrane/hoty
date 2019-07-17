import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import { getAllEvents } from '../../../store/actions/eventActions';

import EventsContainer from './EventsContainer';

const mapStateToProps = ({ events, token, users }) => ({
  token: token.token,
  events: events.events,
  userId: users.user.id,
});

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curId: null,
      formOpen: false,
      confirmOpen: false,
      isEditing: false,
    };

    this.setCurrent = this.setCurrent.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  componentDidMount() {
    const { dispatch, token } = this.props;
    dispatch(getAllEvents(token));
  }

  setCurrent(id) {
    this.setState({
      curId: id,
    });
  }

  toggleModal(open) {
    this.setState({
      formOpen: open,
    });

    // if (open === false) {
    // this.setState({
    // isEditing: false
    // })
    // }
  }

  toggleConfirm(open) {
    this.setState({
      confirmOpen: open,
    });
  }

  toggleEditing(bool) {
    this.setState({
      isEditing: bool,
    });
  }

  render() {
    const {
      noAuth,
      events,
      userId,
    } = this.props;

    const {
      curId,
      formOpen,
      confirmOpen,
      isEditing,
    } = this.state;
    return (
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <div className="events">
          {noAuth
            ? <Redirect to="/" />
            : (
              <EventsContainer
                events={events}
                callback={this.setCurrent}
                curId={curId}
                toggleModal={this.toggleModal}
                toggleConfirm={this.toggleConfirm}
                formOpen={formOpen}
                confirmOpen={confirmOpen}
                toggleEditing={this.toggleEditing}
                isEditing={isEditing}
                userId={userId}
              />
            )
            }
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}
export default connect(mapStateToProps)(Events);

Events.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  noAuth: PropTypes.bool.isRequired,
  events: PropTypes.arrayOf(PropTypes.object),
};

Events.defaultProps = {
  events: [],
};
