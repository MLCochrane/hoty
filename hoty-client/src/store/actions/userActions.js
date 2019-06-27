import API from '../../api';

export function login(reqBody) {
    return dispatch => {
        dispatch({ type: "FETCH_STARTED" });
        API.post('/users/login', reqBody)
        .then(res => {
            dispatch(getCurrentUser(res.data.token));
        })
        .catch(err => {
            dispatch({ type: 'LOGIN_ERROR', payload: err });
        });
    };
}

export function getCurrentUser(data) {
    return dispatch => {
        dispatch({ type: "FETCH_STARTED" });
        API.get('/users/me',
            {
                headers: {
                    'Authorization': 'Bearer ' + data
                }
            }
        )
        .then(res => {
            dispatch({ type: 'RECIEVE_USER', payload: res.data });
            dispatch(setToken(data));
        })
        .catch(err => {
            dispatch({ type: 'RECIEVE_USER_ERROR', payload: err });
            dispatch({ type: 'REMOVE_TOKEN' });
        });
    };
}

function setToken(data) {
        return dispatch => {
            dispatch({ type: 'RECIEVE_TOKEN', payload: data });
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