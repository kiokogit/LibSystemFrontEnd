import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL }, {headers:{'Content-Type':'text/plain;charset=utf-8'}});    //eg http://localhost:5000

API.interceptors.request.use((req) => {
    const user = localStorage.getItem('USER')
    if (user) {
        req.headers.authorization = `Token ${localStorage.getItem('USER')}`
    }
    return req
});

//for all users
export const signUp = (user) => API.post(`/signup`, user);

//BOOKSAPI
//get all books
export const getAllBooks = () => API.get(`/books`);
//get one book
export const getOneBook = (id) => API.get(`/books/${id}`);

//ADMINAPI
//login
export const loginAdmin = (admin) => API.post('admin/login', admin)
//get allusers as admin
export const getAllUsers = () => API.get(`admin/users`);
//getUser Details  
export const getOneUser = () => API.get(`admin/users/90`);
//get book requests
export const getPendingRequests = () => API.get(`admin/books/pendingrequests`);
//get all requests - pending and approved - borrow history
export const getAllRequests = () => API.get(`admin/books/allrequests`);
//get list of approved borrowed books - unreturned
export const getUnReturnedBooks = () => API.get(`admin/books/borrowedbooks`);
//get books in carts
export const getBooksInCart = () => API.get('admin/books/incart');
//addBook
export const addBooks = (book) => API.post(`admin/books/add`, book);
//checkout a book
export const checkOutBook = (id) => API.post(`admin/books/lendout/${id}`);
//manual checkOut
export const manualCheckOut = (details) => API.post(`admin/books/manual/lendout`, details);
//receive back a borrowed book from user
export const checkInBook = (id) => API.post(`admin/books/receiveback/${id}`);
//Edit book details, including cmments by users
export const editBook = (toEdit) => API.post('admin/books/edit', toEdit);
//delete a book
export const deleteBook = (id) => API.delete(`admin/books/delete/${id}`);
//delete a user - make user account inactive
export const deleteUser = (id) => API.patch(`admin/users/delete/${id}`);

//USERAPI
//login
export const userLogin = (credentials) => API.post(`users/login`, credentials);
export const logOut = () => API.get('users/logout');
//Edit Profile
//send borrowing request
export const borrowABook = (toBorrow) => API.post(`users/books/borrow`, toBorrow);
//cancel borrow request
export const cancelBorrowRequest = (id) => API.delete(`users/books/cancelorder/${id}`);
//should a user prompt book return?
//add to cart
export const addToCart = (bookId) => API.post(`users/books/addtocart/${bookId}`);
//remove book from cart
export const removeFromCart = (cartId) => API.delete(`users/books/removefromcart/${cartId}`);
//get al books in cart

//edit Profile
export const editProfile = (user) => API.patch(`users/profile/edit`, user);
//getcomments
export const getComments = () => API.get('users/comments');
//submit comments
export const submitComment = (comment) => API.post('users/submitcomment', comment);
//get user borrowedbooks
export const getUserBorrowed = () => API.get('users/borrow/borrowed');
//get user pending requests
export const getUserPendingReqsts = () => API.get('users/borrow/requests');
//get user pending requests
export const getUserBooksInCart = () => API.get('users/books/incart');
