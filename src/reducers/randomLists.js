const randomLists = (list = [], action) => {
    switch (action.type) {
        case 'GET_LIST':
            return action.payload;
        case 'FETCH_BOOK':
            return action.payload;
        default:
            return list
    }
};

export default randomLists;