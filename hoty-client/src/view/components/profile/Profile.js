import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import PageBar from '../global/header/PageBar';


const mapStateToProps = ({ users, events }) => ({
  user: users.user,
  events: events.eventsUser,
});

class Profile extends Component {
  deets() {
    const {
      user,
      events,
    } = this.props;
    return (
      <div>
        <h1>
          username:
          { user.username }
        </h1>
        <p>
          firstname:
          { user.firstName }
        </p>
        <p>
          lastname:
          { user.lastName }
        </p>
        { events.map(el => (
          <div key={el.id}>
            <h2>{ el.title }</h2>
            <p>{ el.description }</p>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { noAuth } = this.props;
    return (
      <div className="profile">
        <PageBar
          title="Profile"
        />
        {noAuth
          ? <Redirect to="/" />
          : this.deets()
        }
      </div>
    );
  }
}
export default connect(mapStateToProps)(Profile);

Profile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  events: PropTypes.arrayOf(PropTypes.object),
  noAuth: PropTypes.bool.isRequired,
};

Profile.defaultProps = {
  events: [],
};
