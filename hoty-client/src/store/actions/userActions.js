import API from '../../api';

export function login() {
    return dispatch => {
        dispatch({ type: "FETCH_STARTED" });
        API.post('/users/login')
        .then(res => {
            dispatch({ type: 'RECIEVE_TOKEN', payload: res.data });
        })
        .catch(err => {
            dispatch({ type: 'RECIEVE_TOKEN_ERROR', payload: err });
        });
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

// export function fetchUser() {
//   return dispatch => {
// 		dispatch({ type: "FETCH_STARTED" });
// 		API.get('/users/me')
//         .then(res => {
//             dispatch({ type: 'RECIEVE_USER', payload: res.data });
//         })
//         .catch(err => {
//             dispatch({ type: 'RECIEVE_USER_ERROR', payload: err });
//         });
//   };
// }