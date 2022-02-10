import * as api from '../../api/api';

//what specific users can do - edit profile details, send borrow requests, see borrowed books, and fines, track account etc
//login user
export const loginUser = (credentials, navigate) => async (dispatch) => {

    try {
        const {data} = await api.userLogin(credentials)
        localStorage.setItem('USER', data.token);
            //redirect
        //if (data.isAdmin) navigate('/admin/dashboard');
        navigate('/user/dashboard');
        dispatch({ type: 'LOGIN_STATUS', payload: data });
        
    } catch (e) {
        //unauthorized
        if (e.response.status === 401) alert('Invalid Email/Password');        
        //server error(
        if(e.response.status===408) alert('Time Out')
        if (e.response.status === 500) alert('Server Error');   
    }
};

export const logOut = (navigate) => async (dispatch) => {
    try {
        const response = await api.logOut();
        if (response.status === 200) {
            localStorage.removeItem("USER");
            navigate("/");
            dispatch({ type: 'RESET', payload: [] })
        }
        
    } catch (e) {
        if (e.response.status === 500) alert('Server Error');   

    }
};

//Edit User Profile
export const editProfile = (user) => async (dispatch) => {
    try {

        const { data } = await api.editProfile(user);
        //receives back the user details edited
        dispatch({ type: 'FETCH', payload:data});

    } catch (e) {
        alert('Details Not Saved. Server Error')
        if (e.response.status === 401) {
            alert('Session Expired');
        };
        console.log(e)
    }
}

//add a book to cart
export const addBookToCart = (bookId) => async (dispatch) => {
    try {
        const { data } = await api.addToCart(bookId);
        dispatch({type:'ADD_A_BOOK', payload:data})

    } catch (e) {
        if (e.response.status === 401) {
            alert('Session Expired');
        };
        console.log(e);
    }
};

//remove from cart
export const removeFromCart = (cartId) => async () => {
    try {
        await api.removeFromCart(cartId);

    } catch (e) {
        if (e.response.status === 401) {
            alert('Session Expired');
        };
        console.log(e)
    }
};

//submit a borrow request
export const sendBorrowRequest = (toBorrow) => async () => {
    try {
        await api.borrowABook(toBorrow)
        alert('Book Borrowed')

    } catch (e) {
        if (e.response.status === 401) {
            alert('Session Expired');
        };
        console.log(e)
    }
};

//cancel borrow request
export const cancelBookRequest = (toCancel) => async () => {

    try {
        await api.cancelBorrowRequest(toCancel);

    } catch (e) {
        if (e.response.status === 401) {
            alert('Session Expired');
        };
        console.log(e)
    }
};

//fetch comments for books
export const getComments = () => async (dispatch) => {
    try {
        
        const { data } = await api.getComments();
        //returns all comments, to be filtered according to book clicked
        dispatch({type: 'GET_COMMENTS', payload:data})
        
    } catch (e) {
        console.log(e)
    }
}

//Submit comments/Review
export const submitComment = (comment) => async (dispatch) => {
    try {
        const {data} = await api.submitComment(comment);
        
        dispatch({type: 'ADD_COMMENT', payload:data})
        
    } catch (e) {
        if (e.response.status === 401) {
            alert('Session Expired');
        };
        console.log(e);
    }
}

//get pending requests
export const getUserBookRequests = () => async (dispatch) => {

    try {
        const { data } = await api.getUserPendingReqsts();
        dispatch({type:'GET_REQUESTS', payload:data})
    }catch(e){
        console.log(e)
    }
}

//get pending requests
export const getUserBorrowedBks = () => async (dispatch) => {
    try {
        const { data } = await api.getUserBorrowed();
        dispatch({type:'GET_BORROWED', payload:data})
    }catch(e){
        console.log(e);
    }
}

//GET BOOKS IN CART FOR USER
export const getUserBooksInCart = () => async (dispatch) => {
    try {
        const { data } = await api.getUserBooksInCart();
        dispatch({ type: 'GET_INCART', payload: data })
        
    } catch (err) {
        if (err.response.status === 401) {
            alert('Session Expired');
        };
        console.log(err)
    }
}