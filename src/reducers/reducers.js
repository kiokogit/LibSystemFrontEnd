import { combineReducers } from 'redux';
import books from './books';
import users from './users';
import pending from './pending';
import status from './checks';
import borrowed from './borrowed';
import incart from './incart';
import comments from './comments';
import user from './user';

export default combineReducers({
    books,
    users,
    user,
    pending,
    status,
    borrowed,
    comments,
    incart
});