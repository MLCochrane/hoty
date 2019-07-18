import React from 'react';
import { shallow } from 'enzyme';
import Toolbar from './Toolbar';

describe('Toolbar component', () => {
  it('displays title', () => {
    const wrapper = shallow(
      <Toolbar title="Dashboard" />,
    );
    expect(wrapper.contains('Dashboard')).toBe(true);
  });

  it('displays child content', () => {
    const wrapper = shallow(
      <Toolbar title="Dashboard">
        <div>
          Child content.
        </div>
      </Toolbar>,
    );
    expect(wrapper.contains('Dashboard')).toBe(true);
    expect(wrapper.contains(<div>Child content.</div>)).toBe(true);
  });
});
