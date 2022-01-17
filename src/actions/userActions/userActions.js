import * as api from '../../api/api';

//what specific users can do - edit profile details, send borrow requests, see borrowed books, and fines, track account etc

//login user
export const loginUser = (credentials, navigate) => async (dispatch) => {
    
    try {
        const login = await api.userLogin(credentials)
        if (login.data.status === 'ok') {
            localStorage.setItem('USER', JSON.stringify({data:login.data.message}));
            //redirect
            navigate('/user/dashboard');
        } else {
            alert(login.data.message)
            
        }
        dispatch({ type: 'LOGIN_STATUS', payload: login.data });

    } catch (e) {
        console.log(e);
        alert(e.message)
    }
};


export const logOut = () => async (dispatch) => {
    try {
        dispatch({ type: 'RESET', payload: [] })

    } catch (e) {
        console.log(e);
    }
};

//Edit User Profile
export const editProfile = (user) => async (dispatch) => {
    try {

        const { data } = await api.editProfile(user);
        dispatch({ type: 'FETCH', payload:data});

    } catch (e) {
        alert('Details Not Saved. Server Error')
        console.log(e)
    }
}

//add a book to cart
export const addBookToCart = (bookId) => async (dispatch) => {
    try {
        const { data } = await api.addToCart(bookId);
        dispatch({type:'ADD_A_BOOK', payload:data})

    } catch (e) {
        console.log(e);
    }
};

//remove from cart
export const removeFromCart = (bookId) => async (dispatch) => {
    try {
        const { data } = await api.removeFromCart(bookId);
        dispatch({ type: 'DELETE_FROM_LIST', payload: data })
    } catch (e) {
        console.log(e)
    }
};

//submit a borrow request
export const sendBorrowRequest = (toBorrow) => async (dispatch) => {
    try {
        const { data } = await api.borrowABook(toBorrow)
        dispatch({ type: 'ADD_A_BOOK', payload: data });

    } catch (e) {
        console.log(e)
    }
};

//cancel borrow request
export const cancelBookRequest = (toCancel) => async (dispatch) => {

    try {
        const { data } = await api.cancelBorrowRequest(toCancel);
        dispatch({ type: 'DELETE_FROM_LIST', payload: data });
    } catch (e) {
        console.log(e)
    }
};