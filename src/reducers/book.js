const book = (book = '', action) => {
    switch (action.type) {
        case 'GET_BOOK_DETAILS':
            return action.payload;
        default:
            return book;
    }
};
export default book;