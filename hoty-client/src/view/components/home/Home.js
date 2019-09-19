import React from 'react';
import PropTypes from 'prop-types';
import Landing from '../landing/Landing';
import Dashboard from '../dashboard/Dashboard';

const Home = (props) => {
  const { noAuth } = props;
  return (
    <div>
      {(noAuth)
        ? <Landing />
        : (
          <Dashboard />
        )
      }
    </div>
  );
};

export default Home;

Home.propTypes = {
  noAuth: PropTypes.bool.isRequired,
};
