export default function reducer(state = {
    fetching: false,
    fetched: false,
    user: {},
    token: '',
    error: null
  }, action) {
    switch (action.type) {
      case 'FETCH_STARTED': {
        return {...state, fetching: true}
      }
      case 'RECIEVE_USER': {
        return {...state, user: action.payload, fetched: true, fetching: false}
      }
      case 'RECIEVE_TOKEN': {
        return {...state, token: action.payload, fetched: true, fetching: false}
      }
      case 'RECIEVE_USER_ERROR': {
        return {...state, fetching: false, error: action.payload}
      }
      case 'RECIEVE_TOKEN_ERROR': {
        return {...state, fetching: false, error: action.payload}
      }
    //no default
    }
    return state;
  }