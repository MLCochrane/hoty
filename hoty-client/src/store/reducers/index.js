import { combineReducers } from 'redux';
import users from './userReducer';
import token from './tokenReducer';

export default combineReducers({
	users,
	token
});