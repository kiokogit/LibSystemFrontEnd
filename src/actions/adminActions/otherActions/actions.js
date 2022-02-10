import * as api from '../../../api/api';
import {loginUser} from '../../userActions/userActions';

//basically books actions - accessible by all - user, admin; public api actions

//fetch books
export const getBooks = () => async (dispatch) => {
    try {

        const { data } = await api.getAllBooks();
        dispatch({ type: 'GET_ALL_BOOKS', payload: data });

    } catch (e) {
        console.log(e);
    }
};

//getOne Book
export const getBookDetails = (id) => async (dispatch) => {
    try {
        const { data } = await api.getOneBook(id)
        dispatch({ type: 'GET_BOOK_DETAILS', payload: data });

    } catch (e) {
        console.log(e)
    }
};

//add User
export const signUpUser = (user, navigate) => async (dispatch) => {
    
    try {
        const signdata = await api.signUp(user);
        
        alert('User Registered Successfully')
            //for signin
        const credentials = {email:user.userEmail, password:user.userPassword};
        await dispatch({ type: 'REGISTRATION_STATUS', payload: signdata.data });
        await dispatch(loginUser(credentials, navigate)); 
       
    } catch (e) {
        if (e.response.status === 401) alert('User With That Email Exists');
        if (e.response.status === 500) alert('Server Error');
        else alert('User cannot be registered')
    }
};