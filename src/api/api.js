import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.BASE_URL:process.env.LOCAL_URL

const API = axios.create({ baseURL: BASE_URL }, {headers:{'Content-Type':'text/plain;charset=utf-8'}});    //eg http://localhost:5000

API.interceptors.request.use((req) => {
    const user = localStorage.getItem('USER')
    if (user) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('USER')).data.token}`
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
//signUp
export const signUpAdmin= (admin) => API.post('admin/signup', admin)
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
//addBook
export const addBooks = (book) => API.post(`admin/books`, book);
//checkout a book
export const checkOutBook = (id) => API.post(`admin/books/lendout/${id}`);
//manual checkOut
export const manualCheckOut = (details) => API.post(`admin/books/manual/lendout`, details);
//receive back a borrowed book from user
export const checkInBook = (id) => API.post(`admin/books/receiveback/${id}`);
//Edit book details, including cmments by users
export const editBook = (toEdit) => API.post('admin/books/edit', toEdit)

//USERAPI
//login
export const userLogin = (credentials) => API.post(`users/login`, credentials);
//Edit Profile
//send borrowing request
export const borrowABook = (toBorrow) => API.post(`users/books/borrow`, toBorrow);
//cancel borrow request
export const cancelBorrowRequest = (toCancel) => API.post(`users/books/cancelorder`, toCancel);
//should a user prompt book return?
//add to cart
export const addToCart = (bookId) => API.patch(`users/books/addtocart/${bookId}`);
//remove book from cart
export const removeFromCart = (bookId) => API.patch(`users/books/removefromcart/${bookId}`);
//get al books in cart

//edit Profile
export const editProfile = (user) => API.patch(`users/profile/edit`, user);
//get suggestions of books - search through db to find similar books
