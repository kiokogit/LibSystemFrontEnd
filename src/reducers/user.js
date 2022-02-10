const user = (user = {}, action) => {
    switch (action.type) {
        case 'GET_USER':
            return action.payload;
        default:
            return user
    }
}

export default user;