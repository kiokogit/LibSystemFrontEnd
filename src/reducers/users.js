const users = (users = [], action) => {
    switch (action.type) {
        case 'FETCH':
            return action.payload;
        case 'RESET':
            return {...users, users:[]};
      
        default:
            return users;
    };
};

export default users;