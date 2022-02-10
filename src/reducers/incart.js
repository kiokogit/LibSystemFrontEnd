const books = (list = [], action) => {
    switch (action.type) {
        case 'GET_INCART':
            return action.payload;
        default:
            return list;
    }     
}

export default books;