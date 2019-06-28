import API from '../../api';

export function getUserEvents(token, id) {
    return dispatch => {
        dispatch({ type: "EVENT_FETCH_STARTED" });
        API.get(`/users/${id}/event`,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        )
        .then(res => {
            dispatch({ type: 'RECIEVE_EVENTS_USER', payload: res.data });
        })
        .catch(err => {
            dispatch({ type: 'RECIEVE_EVENTS_ERROR', payload: err });
        });
    }
}

export function getAllEvents(token) {
    return dispatch => {
        dispatch({ type: "EVENT_FETCH_STARTED" });
        API.get(`/users/event`,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        )
        .then(res => {
            dispatch({ type: 'RECIEVE_EVENTS', payload: res.data });
        })
        .catch(err => {
            dispatch({ type: 'RECIEVE_EVENTS_ERROR', payload: err });
        });
    }
}