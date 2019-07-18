import React from 'react';
import { create } from 'react-test-renderer';
import Dashboard from './Dashboard';

// const Dashboard = () => (
//   <div className="dashboard">
//     <Toolbar
//       title="Dashboard"
//     />
//   </div>
// );
describe('Dashboard component', () => {
  test('dashboard renders', () => {
    const component = create(
      <Dashboard />,
    );
    expect(component).toMatchSnapshot();
  });
});
