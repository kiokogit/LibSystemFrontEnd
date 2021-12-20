import * as api from '../../../api/api';

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
export const signUpUser = (user) => async (dispatch) => {
    
    try {
        const { data } = await api.signUp(user);
        alert(data.message)
        dispatch({ type: 'REGISTRATION_STATUS', payload: data });

    } catch (e) {
       console.log(e)
    }
};