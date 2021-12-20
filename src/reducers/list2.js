const list2 = (list2 = [], action) => {
    switch (action.type) {
        case 'GET_LIST_2':
            return action.payload;
        case 'FETCH_BOOKS':
            return action.payload;
        default:
            return list2
    }
};

export default list2;