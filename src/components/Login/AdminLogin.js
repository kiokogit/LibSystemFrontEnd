import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, TextField, Paper } from '@material-ui/core';

import { Header } from '../Header/Header';
import { adminLogin, registerAdmin } from '../../actions/adminActions/adminActions'

//Enter Key Card Code
export const AdminLogin = () => {
   
    const [formType, setFormType] = useState('signin')

    //to handle both sign up and login
    return (
        <div align='center'>
            <Header />
            {formType === 'signin' && <SignInForm setFormType={setFormType} />}
            {formType === 'signup' && <SignUpForm setFormType={setFormType} />}
        </div>
    );
};

const SignInForm = ({setFormType}) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [admin, setAdmin] = useState({ email: '', keyCode: '' });
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(adminLogin(admin, navigate))
    }; 
    return (
        <form onSubmit={(e) => handleSubmit(e)} style={{ marginTop: '150px', width: '300px' }}>
            <Paper style={{ paddingBottom: '23px' }}>
                Login
                <div style={{ width: '90%' }}>
                    <TextField required fullWidth variant='outlined' size='small' value={admin.email} label='Enter Admin Email' onChange={(e) => setAdmin({ ...admin, email: e.target.value })} style={{ margin: '10px 0' }} />
                    <TextField required fullWidth variant='outlined' size='small' value={admin.keyCode} label='Enter Code' onChange={(e) => setAdmin({ ...admin, keyCode: e.target.value })} style={{ margin: '10px 0' }} />
                    <Button type='submit'>
                        LOGIN
                    </Button>
                    <div><button onClick={(e) => {
                        e.preventDefault();
                        setFormType('signup')
                    }}>Register</button> Account (moderators only)</div>
                </div>
            </Paper>
        </form>
    );
};

const SignUpForm = ({setFormType}) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [admin, setAdmin] = useState({ name:'', phone:'', email: '', keyCode: '' });
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerAdmin(admin, navigate))
    }; 

    return (
        <form onSubmit={(e) => handleSubmit(e)} style={{ marginTop: '150px', width:'300px' }}>
        <Paper style={{ paddingBottom: '23px' }}>
            SignUP
            <div style={{ width:'90%' }}>
                <TextField required variant='outlined' fullWidth size='small' value={admin.name} label='Enter Name' onChange={(e) => setAdmin({ ...admin, name: e.target.value })} style={{ margin: '10px 0' }} />
                <TextField required variant='outlined' fullWidth size='small' value={admin.phone} label='Enter Phone Number' onChange={(e) => setAdmin({ ...admin, phone: e.target.value })} style={{ margin: '10px 0' }}/>
                <TextField required variant='outlined' fullWidth size='small' value={admin.email} label='Enter Admin Email' onChange={(e) => setAdmin({ ...admin, email: e.target.value })} style={{ margin: '10px 0' }}/>
                <TextField required variant='outlined' fullWidth size='small' value={admin.keyCode} label='Enter Code' onChange={(e) => setAdmin({ ...admin, keyCode: e.target.value })} style={{ margin: '10px 0' }}/>
            <Button type='submit'>
                REGISTER
            </Button>
            <div> <button onClick={(e) => {
                    e.preventDefault();
                    setFormType('signin')
                }}>SIGNIN</button> to existing Admin Account</div>
                </div>
            </Paper >
            </form>
    )
}
