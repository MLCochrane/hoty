import API from '../../api';

export function getUserEvents(token, id) {
  return (dispatch) => {
    dispatch({ type: 'EVENT_FETCH_STARTED' });
    API.get(`/users/${id}/event`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: 'RECIEVE_EVENTS_USER', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'RECIEVE_EVENTS_ERROR', payload: err });
      });
  };
}

export function getAllEvents(token) {
  return (dispatch) => {
    dispatch({ type: 'EVENT_FETCH_STARTED' });
    API.get('/users/event',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: 'RECIEVE_EVENTS', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'RECIEVE_EVENTS_ERROR', payload: err });
      });
  };
}


export function postEvent(token, id, reqBody) {
  return (dispatch) => {
    dispatch({ type: 'EVENT_FETCH_STARTED' });
    API.post(`/users/${id}/event`,
      reqBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getAllEvents(token));
      })
      .catch((err) => {
        dispatch({ type: 'RECIEVE_EVENTS_ERROR', payload: err });
      });
  };
}

export function deleteEvent(token, userId, eventId) {
  return (dispatch) => {
    dispatch({ type: 'EVENT_FETCH_STARTED' });
    API.delete(`/users/${userId}/event/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getAllEvents(token));
      })
      .catch((err) => {
        dispatch({ type: 'RECIEVE_EVENTS_ERROR', payload: err });
      });
  };
}
