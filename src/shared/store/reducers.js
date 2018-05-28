import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import todos from './todo/todoReducer';

export default combineReducers({
    todos, routing: routerReducer
});
