import React from 'react';
import { shallow } from 'enzyme';
import EventsContainer from './EventsContainer';

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

describe('EventsContainer component', () => {
  it('can get current event by id', () => {
    const wrapper = shallow(
      <EventsContainer
        events={events}
        userId="11"
        curId={1}
        callback={jest.fn()}
        toggleModal={jest.fn()}
        toggleConfirm={jest.fn()}
        toggleEditing={jest.fn()}
        formOpen={false}
        isEditing={false}
        confirmOpen={false}
      />,
    );
    expect(wrapper.instance().collectCurrent()).toEqual({
      id: 1,
      title: 'Event one',
      description: 'Event description one.',
      startDate: '2019-07-15T22:50:05.539Z',
      endDate: '2019-07-23T22:50:00.000Z',
      userId: '11',
    });
  });
});
