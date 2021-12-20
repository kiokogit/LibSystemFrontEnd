const books = (books = [], action) => {

    switch (action.type) {
        
        case 'GET_ALL_BOOKS':
            return action.payload;
        
        case 'ADD_NEW_BOOK':
            return [...books, action.payload];
        
        case 'MODIFY_BOOK_DETAILS':
            return action.payload;
    
        default:
            return books;
    }
};

export default books;