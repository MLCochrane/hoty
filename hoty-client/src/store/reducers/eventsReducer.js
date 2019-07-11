export default function reducer(state = {
    fetching: false,
    fetched: false,
    events: [],
    eventsUser: [],
    error: null,
  }, action) {
    switch (action.type) {
      case 'EVENT_FETCH_STARTED': {
        return {...state, fetching: true, fetched: false}
      }
      case 'RECIEVE_EVENTS': {
        return {...state, events: action.payload, fetched: true, fetching: false}
      }
      case 'RECIEVE_EVENTS_USER': {
        return {...state, eventsUser: action.payload, fetched: true, fetching: false}
      }
      case 'RECIEVE_EVENTS_ERROR': {
        return {...state, fetching: false, error: action.payload}
      }
    //no default
    }
    return state;
  }