import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, TextField, Paper } from '@material-ui/core';

import { Header } from '../Header/Header';
import { adminLogin} from '../../actions/adminActions/adminActions'

//Enter Key Card Code
export const AdminLogin = () => {
   
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [admin, setAdmin] = useState({ email: '', password: '' });
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(adminLogin(admin, navigate))
    }; 
    return (
        <div align='center'>
            <Header />
            <form onSubmit={(e) => handleSubmit(e)} style={{ marginTop: '150px', width: '300px' }}>
                <Paper style={{ paddingBottom: '23px' }}>
                    Admin Portal
                    <div style={{ width: '90%' }}>
                        <TextField required fullWidth variant='outlined' size='small' value={admin.email} label='Enter Admin Email' onChange={(e) => setAdmin({ ...admin, email: e.target.value })} style={{ margin: '10px 0' }} />
                        <TextField required fullWidth variant='outlined' size='small' type='password' value={admin.password} label='Enter Password' onChange={(e) => setAdmin({ ...admin, password: e.target.value })} style={{ margin: '10px 0' }} />
                        <Button variant="outlined" type='submit'>
                            LOGIN
                        </Button>
                    </div>
                </Paper>
            </form>
        </div>
    );
};
