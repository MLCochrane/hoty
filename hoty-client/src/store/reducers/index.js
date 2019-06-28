import { combineReducers } from 'redux';
import users from './userReducer';
import token from './tokenReducer';
import events from './eventsReducer';

export default combineReducers({
	users,
	events,
	token
});