import React, { Component } from 'react';
import PageBar from '../global/header/PageBar';
import {
  socketChat,
} from '../../../api';
// import PropTypes from 'prop-types';

const chatInterface = socketChat();

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      msg: [],
    };

    chatInterface.recieve((id, msg) => {
      this.setState(prevState => ({
        msg: [...prevState.msg, { id, msg }],
      }));
    });

    this.handleChange = this.handleChange.bind(this);
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
      msg,
    } = this.state;
    return (
      <div className="dashboard">
        <PageBar
          title="Dashboard"
        />
        <textarea
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
            {msg.map(el => (
              <li
                key={el.id}
              >
                {el.msg}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Dashboard;

// Dashboard.propTypes = {
// };
