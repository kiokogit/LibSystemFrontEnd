const comments = (comments = [], action) => {
    switch (action.type) {
        case 'GET_COMMENTS':
            return action.payload;
        case 'ADD_COMMENT':
            return [...comments, action.payload];
        default:
            return comments;
    }
};
export default comments;