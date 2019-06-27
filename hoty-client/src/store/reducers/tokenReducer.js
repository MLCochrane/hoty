export default function reducer(state = {
	token: null
  }, action) {
    switch (action.type) {
      case 'RECIEVE_TOKEN': {
        return {...state, token: action.payload}
      }
      case 'REMOVE_TOKEN': {
        return {...state, token: null }
			}
    //no default
    }
    return state;
  }