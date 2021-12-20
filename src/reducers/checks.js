const status = (status = {}, action) => {
    switch (action.type) {
        case 'REGISTRATION_STATUS': //ERROR OR OK
            return action.payload;
        case 'LOGIN_STATUS': //ERROR OR OK
            return action.payload;
        default:
            return status;
    };
};

export default status;