export default function reducer(state = {
    fetching: false,
    fetched: false,
    user: {},
    loggedIn: false,
    error: null,
    userError: null
  }, action) {
    switch (action.type) {
      case 'FETCH_STARTED': {
        return {...state, fetching: true}
      }
      case 'RECIEVE_USER': {
        return {...state, user: action.payload, fetched: true, fetching: false, loggedIn: true}
      }
      case 'RECIEVE_USER_ERROR': {
        return {...state, fetching: false, userError: action.payload, loggedIn: false}
      }
      case 'LOGIN_ERROR': {
        return {...state, fetching: false, error: action.payload}
      }
      case 'LOGOUT': {
        return {...state, loggedIn: false, user: {}}
      }
    //no default
    }
    return state;
  }