import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PageBar from '../global/header/PageBar';
import Pusher from '../chat/Pusher';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      msgs: [],
    };
  }

  handleChange(e) {
    const { target } = e;
    const { value } = target;

    this.setState({
      message: value,
    });
  }

  render() {
    const {
      message,
      msgs,
    } = this.state;

    return (
      <div
        className="dashboard"
        data-cy="dashboard"
      >
        <PageBar
          title="Dashboard"
        />
        <Pusher />
        {/* <textarea
          value={message}
          onChange={e => this.handleChange(e)}
        />
        <button
          type="button"
          onClick={() => { chatInterface.send(message); }}
        >
          click me
        </button>
        <div>
          <ul>
            {msgs.map(el => (
              <li
                key={el.id}
              >
                {el.msg}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    );
  }
}

export default Dashboard;

Dashboard.propTypes = {
};
