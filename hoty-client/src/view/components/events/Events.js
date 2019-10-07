import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import Dayjs from 'dayjs';
import { getAllEvents } from '../../../store/actions/eventActions';

import './events.scss';

import EventsContainer from './EventsContainer';
import PageBar from '../global/header/PageBar';
import EventFilter from './EventFilter';

const mapStateToProps = ({ events, token, users }) => ({
  token: token.token,
  events: events.events,
  user: users.user,
});

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curId: null,
      formOpen: false,
      confirmOpen: false,
      isEditing: false,
      filter: 'all',
    };

    this.setCurrent = this.setCurrent.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.filteredEvents = this.filteredEvents.bind(this);
  }

  componentDidMount() {
    const { dispatch, token } = this.props;
    dispatch(getAllEvents(token));
  }

  setCurrent(id) {
    const {
      curId,
    } = this.state;

    if (curId === id) {
      this.setState({
        curId: null,
      });
      return;
    }

    this.setState({
      curId: id,
    });
  }

  toggleConfirm(open) {
    this.setState({
      confirmOpen: open,
    });
  }

  toggleEditing(bool) {
    this.setState({
      formOpen: bool,
    });
  }

  changeFilter(filter) {
    /*
    *  Simply sets active to null as the list of current events will change
    *  Could add additional logic to check if active is within new list but meh
    */
    this.setCurrent(null);

    this.setState({
      filter,
    });
  }

  filteredEvents() {
    const {
      filter,
    } = this.state;
    const {
      events,
    } = this.props;

    switch (filter) {
      case 'all':
        return events;
      case 'upcoming':
        return events.filter(el => Dayjs(el.startDate).isAfter(Dayjs(Date.now())));
      case 'past':
        return events.filter(el => Dayjs(el.endDate).isBefore(Dayjs(Date.now())));
      case 'current':
        return events.filter(el => Dayjs(el.startDate).isBefore(Dayjs(Date.now()))
          && Dayjs(el.endDate).isAfter(Dayjs(Date.now())));
      default:
        return null;
    }
  }

  render() {
    const {
      noAuth,
      user,
    } = this.props;

    const {
      curId,
      formOpen,
      confirmOpen,
      isEditing,
      filter,
    } = this.state;

    const pageBlurb = `Hey ${user.firstName}, check out the latest going on or add a new event.`;
    return (
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        {noAuth
          ? <Redirect to="/" />
          : (
            <div className="events">
              <PageBar
                title="Events"
                blurb={pageBlurb}
              >
                <EventFilter
                  filter={filter}
                  user={user}
                  changeFilter={this.changeFilter}
                />
              </PageBar>
              <EventsContainer
                events={this.filteredEvents()}
                setCurrent={this.setCurrent}
                curId={curId}
                toggleConfirm={this.toggleConfirm}
                formOpen={formOpen}
                confirmOpen={confirmOpen}
                toggleEditing={this.toggleEditing}
                isEditing={isEditing}
                userId={user.id}
              />
            </div>
          )
        }
      </MuiPickersUtilsProvider>
    );
  }
}
export default connect(mapStateToProps)(Events);

Events.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  noAuth: PropTypes.bool.isRequired,
  events: PropTypes.arrayOf(PropTypes.object),
};

Events.defaultProps = {
  events: [],
};
