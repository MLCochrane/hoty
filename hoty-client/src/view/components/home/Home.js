import React from 'react';
import PropTypes from 'prop-types';
import Landing from '../landing/Landing';
import Dashboard from '../dashboard/Dashboard';

const Home = (props) => {
  const { noAuth, socket } = props;
  return (
    <div>
      {(noAuth)
        ? <Landing />
        : (
          <Dashboard
            chatInterface={socket}
          />
        )
      }
    </div>
  );
};

export default Home;

Home.propTypes = {
  noAuth: PropTypes.bool.isRequired,
  socket: PropTypes.shape({
    receive: PropTypes.func,
    send: PropTypes.func,
  }).isRequired,
};
