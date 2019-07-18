import React from 'react';
import { shallow } from 'enzyme';
import { Events } from './Events';

const token = '';

const noAuth = false;


const user = {
  id: '11',
  username: 'luke',
  email: 'lukecochrane2@gmail.com',
  firstName: 'string',
  lastName: 'string',
};

const events = [
  {
    id: 1,
    title: 'Event one',
    description: 'Event description one.',
    startDate: '2019-07-15T22:50:05.539Z',
    endDate: '2019-07-23T22:50:00.000Z',
    userId: '11',
  },
  {
    id: 2,
    title: 'Event two',
    description: 'Event description two.',
    startDate: '2019-07-18T21:26:00.000Z',
    endDate: '2019-07-20T23:26:00.000Z',
    userId: '12',
  },
];

describe('Events component', () => {
  it('filters events based on date', () => {
    const wrapper = shallow(
      <Events
        events={events}
        user={user}
        dispatch={jest.fn()}
        token={token}
        noAuth={noAuth}
      />,
    );
    expect(wrapper.instance().filteredEvents()).toEqual(events);

    wrapper.instance().changeFilter('upcoming');
    expect(wrapper.instance().filteredEvents()).toEqual(
      [
        {
          id: 2,
          title: 'Event two',
          description: 'Event description two.',
          startDate: '2019-07-18T21:26:00.000Z',
          endDate: '2019-07-20T23:26:00.000Z',
          userId: '12',
        },
      ],
    );
  });
});
