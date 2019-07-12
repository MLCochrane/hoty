import API from '../../api';

import { getUserEvents } from './eventActions';

function setToken(data) {
  return (dispatch) => {
    dispatch({ type: 'RECIEVE_TOKEN', payload: data });
  };
}

export function getCurrentUser(data) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_STARTED' });
    API.get('/users/me',
      {
        headers: {
          Authorization: `Bearer ${data}`,
        },
      })
      .then((res) => {
        dispatch({ type: 'RECIEVE_USER', payload: res.data });
        dispatch(setToken(data));
        dispatch(getUserEvents(data, res.data.id));
      })
      .catch((err) => {
        dispatch({ type: 'RECIEVE_USER_ERROR', payload: err });
        dispatch({ type: 'REMOVE_TOKEN' });
      });
  };
}

export function login(reqBody) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_STARTED' });
    API.post('/users/login', reqBody)
      .then((res) => {
        dispatch(getCurrentUser(res.data.token));
      })
      .catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', payload: err });
      });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: 'REMOVE_TOKEN' });
    dispatch({ type: 'LOGOUT' });
  };
}


// export function register() {
//     return dispatch => {
//         dispatch({ type: "FETCH_STARTED" });
//         API.post('/users/')
//         .then(res => {
//             dispatch({ type: 'RECIEVE_ARTISTS', payload: res.data });
//         })
//         .catch(err => {
//             dispatch({ type: 'RECIEVE_ARTISTS_ERROR', payload: err });
//         });
//     };
// }
