import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';

import { Paper, Typography, Input, Button} from '@material-ui/core';
import { Header } from '../Header/Header';
import { loginUser } from '../../actions/userActions/userActions'

//validation
import { isEmail } from 'validator';

export const Login = () => {
    const dispatch = useDispatch();

    //STATES
    //capture details
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    //show hide password
    const [show, setshow] = useState(false)
    //validation of email structure
    const [emailWarning, setemailWarning] = useState(null)
    //validation of all credentials after submit
    //show background loading
    const [loading, setLoading] = useState(false)

    //check login status from reduxstore
    
    //on submit, navigate or return*/
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const credentials = { email: email, password: password }
        //do not submit if there are warnings
        try {
            setLoading(true)
            dispatch(loginUser(credentials, navigate));  //AWAIT to force succeeding actions to wait for the current task
            setLoading(false)     
        } catch (e) {
            console.log(e)
            return
        }
    };
  
    return (
        <div >
            <Header />
            <div style={{ marginTop: '150px' }}>
                <form type="submit" autoComplete="off" onSubmit={handleSubmit}>
                    <Paper align='center' style={{ maxWidth: 400 }}>
                        <Typography style={{ paddingTop: 10, fontFamily: 'fantasy' }}>
                            Welcome to Gemini Library User Portal
                        </Typography>
                        <div style={{ alignText: 'center', width:'70%' }}>
                            <Input required style={{ paddingTop: 10 }} placeholder='Enter email address' fullWidth onChange={(e) => {
                                if (isEmail(e.target.value)) {
                                    setemailWarning(null)
                                    setemail(e.target.value)
                                } else {
                                    setemailWarning('Enter a Valid Email Address')
                                }
                            }} />
                                <Typography color='error' style={{ fontSize: '0.6rem' }}>{emailWarning ? emailWarning : null}</Typography>
                            <div style={{ alignText: 'center',display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <Input required style={{ paddingTop: 10 }} placeholder='Enter password' type={show ? 'text' : 'password'} onChange={(e) => setpassword(e.target.value)} />
                                <Button onClick={(e) => setshow(!show)}>{show ? 'HIDE' : 'SHOW'}</Button>
                            </div>
                        </div>
                        <Button style={{ backgroundColor: 'green', padding: 4, margin: '5px', minWidth: 200 }} type='submit'>{loading? 'Logging user...':'Login'}
                        </Button>
                        <div>
                            forgot password?
                            <Link to='/reset'>
                                reset
                            </Link>
                        </div>
                        <div>
                            Do not have an account yet?
                            <Link to='/signupPage'>
                                Register
                            </Link>
                        </div>
                        <footer style={{ height: 20 }}>
                        </footer>
                    </Paper>
                </form>
            </div>
        </div>
    );
};
