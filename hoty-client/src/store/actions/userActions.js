import API from '../../api';

export function login(reqBody) {
    return dispatch => {
        console.log(reqBody);
        dispatch({ type: "FETCH_STARTED" });
        API.post('/users/login', reqBody)
        .then(res => {
            dispatch({ type: 'RECIEVE_TOKEN', payload: res.data });
        })
        .catch(err => {
            dispatch({ type: 'RECIEVE_TOKEN_ERROR', payload: err });
        });
    };
}

export function setCurrentIndex(index) {
    return (dispatch) => {
        dispatch({
            type: 'SET_CURRENT',
            payload: index
        });
    }
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