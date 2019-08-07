import React from 'react';
import io from 'socket.io-client';

import PageBar from '../global/header/PageBar';
// import PropTypes from 'prop-types';

const Dashboard = () => {
  const socket = io('http://localhost:3000/my-namespace');
  socket.on('event', (data) => {
    console.log(data);
  });
  return (
    <div
      className="dashboard"
      data-cy="dashboard"
    >
      <PageBar
        title="Dashboard"
      />
    </div>
  );
};

export default Dashboard;

// Dashboard.propTypes = {
// };
