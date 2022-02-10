import * as api from '../../api/api';

//login Admin
export const adminLogin = (admin, navigate) => async (dispatch) => {
    try {
        const { data} = await api.loginAdmin(admin);
        
            localStorage.setItem('USER', data.token);
                //redirect
            navigate('/adminPage');
            dispatch({ type: 'LOGIN_STATUS', payload: data });
        
    } catch (e) {
        //unauthorized
        console.log(e);
        if (e.response.status === 401) alert('Invalid Email/Password');        
        //server error(
        if(e.response.status===403) alert('Forbidden')
        if (e.response.status === 500) alert('Server Error'); 
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
        
        dispatch({ type: 'GET_USER', payload: data });
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
        dispatch({ type: 'GET_REQUESTS', payload: data });

    } catch (e) {
        console.log(e);
    }
};
//see books borrowed remaining to be returned
export const unReturnedBooks = () => async (dispatch) => {
    try {
        const { data } = await api.getUnReturnedBooks();
        dispatch({ type: 'GET_BORROWED', payload: data });

    } catch (e) {
        console.log(e);
    }
};

//checkOut a book to a borrower
export const checkOutABook = (id) => async (dispatch) => {
    try {
        
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
        
        const { data } = await api.manualCheckOut(details);
        
        dispatch({ type: 'ADD_NEW_BOOK', payload: data })

    } catch (e) {
        console.log(e)
    };
};

export const checkInABook = (id) => async (dispatch) => {       //BorrowedBook id
    try {
        const { data } = await api.checkInBook(id);
        dispatch({ type: 'ADD_NEW_BOOK', payload: data })

    } catch (e) {
        console.log(e)
    };
};

//edit book details, including attaching comments by users: Returns fresh books data
export const editBookDetails = (toEdit) => async(dispatch)=>{
    try {
        const { data } = await api.editBook(toEdit);
        dispatch({type:'GET_ALL_BOOKS', payload:data})
    } catch (e) {
        console.log(e)
    }
};

//Delete a book
export const deleteBook = (id) => async () => {
    try {
        await api.deleteBook(id);
    } catch (e) {
        console.log(e)
    }
};

//Delete a user - make a user account inactive
export const deleteUser = (id) => async () => {
    try {
        await api.deleteUser(id);
    } catch (e) {
        console.log(e)
    }
};
