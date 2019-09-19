import React, { Component } from 'react';
import {
  connect,
} from 'react-redux';
import PropTypes from 'prop-types';
import {
  ChatManager,
  TokenProvider,
} from '@pusher/chatkit-client';

const mapStateToProps = ({ users }) => ({
  user: users.user,
});


class Pusher extends Component {
  constructor(props) {
    super(props);
    this.chatManager = '';
    this.pusherUser = null;

    this.state = {
      messages: [],
    };

    this.initPusher = this.initPusher.bind(this);
    this.subscribeUser = this.subscribeUser.bind(this);

    this.initPusher();
  }

  initPusher() {
    const {
      user,
    } = this.props;

    console.log('bad chick alert');

    this.chatManager = new ChatManager({
      instanceLocator: '',
      userId: user.id,
      tokenProvider: new TokenProvider({
        url: '',
      }),
    });

    this.chatManager.connect()
      .then((currentUser) => {
        this.pusherUser = currentUser;
        this.subscribeUser();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  subscribeUser() {
    this.pusherUser.subscribeToRoomMultipart({
      roomId: '55685d07-9073-46dc-9f12-3e74ebd47358',
      hooks: {
        onMessage: (message) => {
          this.setState(prevState => ({
            messages: [...prevState.messages, message],
          }));
        },
      },
      messageLimit: 10,
    });
  }

  render() {
    const {
      messages,
    } = this.state;
    return (
      <div className="chat">
        <ul>
          {messages.map(el => (
            <li
              key={el.id}
            >
              {`(${el.sender.name}) ${el.parts[0].payload.content} `}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Pusher);
Pusher.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
