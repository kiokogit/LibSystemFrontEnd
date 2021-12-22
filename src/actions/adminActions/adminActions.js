import * as api from '../../api/api';

//SignUp Admin
export const registerAdmin = (admin, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUpAdmin(admin);
        if (data.status === 'ok') {
            alert(data.message);
            //proceed to login
            navigate('/adminLogin');

        } else {
            alert(data.message)
        }

        dispatch({type:'REGISTRATION_STATUS', payload:data})

    } catch (e) {
        
    }
}

//login Admin
export const adminLogin = (admin, navigate) => async (dispatch) => {
    try {
        const { data } = await api.loginAdmin(admin);
        if (data.status === 'ok') {
            localStorage.setItem('USER', JSON.stringify({ data: data.message }));
            //redirect
            navigate('/adminPage');
        } else {
            alert(data.message)
        }
        dispatch({ type: 'LOGIN_STATUS', payload: data });
    } catch (e) {
        
    }
};

//fetch users
export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getAllUsers();
        dispatch({ type: 'FETCH', payload: data });

    } catch (e) {
        console.error(e)
    }
};

//fetch One User
export const getUserDetails = () => async (dispatch) => {
    try {
        const { data } = await api.getOneUser();
        dispatch({ type: 'FETCH', payload: data });
    } catch (e) {
        console.log(e);
    }
};

//add a book
export const addABook = (book) => async (dispatch) => {
    try {
        const { data } = await api.addBooks(book);
        alert('Book Added to Library');
        dispatch({ type: 'ADD_NEW_BOOK', payload: data });

    } catch (e) {
        console.log(e);
    }
};
//see book requests from users
export const pendingRequests = () => async (dispatch) => {
    try {
        const { data } = await api.getPendingRequests();
        dispatch({ type: 'GET_LIST', payload: data });

    } catch (e) {
        console.log(e);
    }
};
//see books borrowed remaining to be returned
export const unReturnedBooks = () => async (dispatch) => {
    try {
        const { data } = await api.getUnReturnedBooks();
        dispatch({ type: 'GET_LIST_2', payload: data });

    } catch (e) {
        console.log(e);
    }
};

//checkOut a book to a borrower
export const checkOutABook = (id) => async (dispatch) => {
    try {
        console.log('Sending...')
        const { data } = await api.checkOutBook(id);
        console.log('api data: '+ data)
        dispatch({ type: 'ADD_NEW_BOOK', payload: data })

    } catch (e) {
        console.log(e)
    };
};
//manual checkout
export const checkOutManually = (details) => async (dispatch) => {
    try {
        console.log('Sending...')
        const { data } = await api.manualCheckOut(details);
        console.log('api data: '+ data)
        dispatch({ type: 'ADD_NEW_BOOK', payload: data })

    } catch (e) {
        console.log(e)
    };
};

export const checkInABook = (id) => async (dispatch) => {       //BorrowedBook id
    try {
        console.log('Sending...')
        console.log(id)
        const { data } = await api.checkInBook(id);
        console.log('api data: '+ data)
        dispatch({ type: 'ADD_NEW_BOOK', payload: data })

    } catch (e) {
        console.log(e)
    };
};