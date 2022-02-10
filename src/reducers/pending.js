const books = (list = [], action) => {
    switch (action.type) {
        case 'GET_REQUESTS':
            return action.payload;
        case 'FETCH_BOOK':
            return action.payload;
        default:
            return list
    }
};

export default books;