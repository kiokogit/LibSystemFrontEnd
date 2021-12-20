import { combineReducers } from 'redux';
import books from './books';
import users from './users';
import list from './randomLists';
import status from './checks';
import list2 from './list2';
import book from './book';

export default combineReducers({
    books: books,
    users: users,
    list: list,
    status:status,
    list2: list2,
    book:book
});