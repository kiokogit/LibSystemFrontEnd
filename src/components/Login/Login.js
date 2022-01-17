import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';

import { Paper, Typography, Button, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Header } from '../Header/Header';
import { Loading } from '../Loading';
import { loginUser } from '../../actions/userActions/userActions'
import { signUpUser } from '../../actions/adminActions/otherActions/actions';

//validation
import { isEmail, isStrongPassword } from 'validator';

export const Login = () => {
    const [form, setForm] = useState('login');

    return (
        <div align='center'>
            <Header />
            <div style={{ marginTop: '100px' }}>
                {form === 'login' && <LoginForm setForm={setForm} />}
                {form === 'signup' && <SignUpForm setForm={setForm} />}
            </div>
        </div>
    );
};

const LoginForm = ({setForm}) => {
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
    
    //on submit, navigate or return*/
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { email: email, password: password }
        //do not submit if there are warnings
        try {
            if (emailWarning) {
                alert('Cannot Submit A Form with Errors')
                return
            } else {
                setLoading(true)
                await dispatch(loginUser(credentials, navigate));  //AWAIT to force succeeding actions to wait for the current task
                setLoading(false)
            }   
        } catch (e) {
            console.log(e)
            return
        }
    };
    return (
        <form type="submit" autoComplete="off" onSubmit={handleSubmit}>
            <Paper align='center' style={{ maxWidth: 400 }}>
                        <Typography style={{ paddingTop: 10 }}>
                            User Portal Login
                </Typography>
                {loading? <Loading/>:null}
                        <div style={{ alignText: 'center', width:'80%' }}>
                            <TextField required variant='outlined' size='small' style={{marginTop:'10px'}} label='Enter email address' fullWidth onChange={(e) => {
                                if (isEmail(e.target.value)) {
                                    setemailWarning(null)
                                    setemail(e.target.value)
                                } else {
                                    setemailWarning('Enter a Valid Email Address')
                                }
                            }} />
                                <Typography color='error' style={{ fontSize: '0.6rem' }}>{emailWarning ? emailWarning : null}</Typography>
                            <div style={{ alignText: 'center',display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <TextField required variant='outlined' size='small' style={{marginTop:'10px'}} label='Enter password' type={show ? 'text' : 'password'} onChange={(e) => setpassword(e.target.value)} />
                                <Button onClick={(e) => setshow(!show)}>{show ? <VisibilityOff /> : <Visibility/>}</Button>
                            </div>
                        </div>
                        <Button variant="contained" color="primary" style={{ padding: 4, margin: '5px', minWidth: 200 }} type='submit'>{loading? 'Please Wait...':'Login'}
                        </Button>
                        <div>
                            forgot password?
                            <Link to='/reset'>
                                reset
                            </Link>
                        </div>
                        <div>
                            Do not have an account yet?
                    <button onClick={(e) => {
                        e.preventDefault();
                        setForm('signup')
                            }}>
                                Register
                            </button>
                        </div>
                        <footer style={{ height: 20 }}>
                        </footer>
                    </Paper>
                </form>
    )
};

const SignUpForm = ({setForm}) => {
    const dispatch = useDispatch();
    
    //user details state
    const [user, setuser] = useState({
        firstName: "",
        lastName: "",
        userPhone: "",
        userEmail: "",
        userPassword: "",
        confirmPassword:"",
    });
    //show or hide password
    const [show, setshow] = useState(false)
    //show or Hide Loading - for the Spinner
    const [loading, setLoading] = useState(false)
    
    //perform email and password check - validator
    const [emailWarning, setemailWarning] = useState(null);
    const [passWarning, setPassWarning] = useState(null);
    const [pass1Warning, setPass1Warning] = useState(null);
    
    const navigate = useNavigate();
    
    //submit data
    const onSubmit = async (e) => {
        e.preventDefault();
        //cannot submit form if has errors
        try {
            if (emailWarning || passWarning || pass1Warning) {
                alert('Check warnings')
                return
            } else {
                setLoading(true);
                await dispatch(signUpUser(user, navigate));
                setLoading(false);
                //clear form if user registered
            }
        } catch (e) {
            console.log(e)
        }
    };

    //clear form
    const clear = (e) => {
        e.preventDefault();
        setuser({
            firstName: '',
            lastName: '',
            userEmail: '',
            userPhone: '',
            userPassword: '',
            confirmPassword:'',
        });
    };

    return (
        <div>
            <Header />
            <Paper align='center' style={{ maxWidth: 300, padding: 20 }}>
                <Typography variant="h5" style={{ fontFamily: 'courier', fontStyle: 'bold', fontSize: '1.5rem' }}>
                    Register as a User
                </Typography>
                {loading? <Loading/>:null}
                <form type="submit" autoComplete="off" onSubmit={onSubmit}>
                    <TextField size='small' required label="First Name" name="firstName" variant="outlined" value={user.firstName} style={{ margin: '10px 0' }} fullWidth onChange={(e) => setuser({ ...user, firstName: e.target.value })} />
                    <TextField size='small' label="Last Name" name="lastName" variant="outlined" value={user.lastName} style={{ margin: '10px 0' }} fullWidth onChange={(e) => setuser({ ...user, lastName: e.target.value })} />
                    <TextField size='small' required label="Email Address" name="email" variant="outlined" value={user.userEmail} style={{ margin: '10px 0' }} fullWidth onChange={(e) => {
                        setuser({ ...user, userEmail: e.target.value })
                        if (isEmail(e.target.value)) {
                            setemailWarning(null)
                        } else {
                            setemailWarning('Invalid Email Address')
                        }
                    }} />
                    <Typography color='error' style={{fontSize:'0.6rem'}}>{emailWarning}</Typography>
                    <TextField size='small' required label="Phone Number" name="phoneNumber" variant="outlined" value={user.userPhone} style={{ margin: '10px 0' }} fullWidth onChange={(e) => setuser({ ...user, userPhone: e.target.value })} />
                    <div style={{ justifyContent:'space-between', display:'flex', flexDirection:'row'}}>
                        <TextField size='small' required label="Password" name="password" type={show ? 'text' : 'password'} variant="outlined" value={user.userPassword} onChange={(e) => {
                            if (isStrongPassword(e.target.value)) {
                                setPass1Warning(null)
                            } else {
                                setPass1Warning(`Password must be stronger than that!`)
                            }
                            setuser({ ...user, userPassword: e.target.value })
                        }} />
                        <Button variant='text' color='default' size='small' onClick={(e) => {setshow(!show)}}>{show ? <VisibilityOff /> : <Visibility/>}</Button>
                        </div>
                        <Typography color='error' align='left' style={{fontSize:'0.6rem'}}>{pass1Warning}</Typography>
                        <TextField size='small' required label="Confirm Password" type={show? 'text':'password'} name="confirmPassword" variant="outlined" value={user.confirmPassword} fullWidth
                            onChange={(e) => {
                                setuser({...user, confirmPassword:e.target.value})
                                if (user.userPassword !== e.target.value) {
                                    setPassWarning('Passwords Do Not Match')
                                } else {
                                    setPassWarning(null)
                                }
                            }}
                            style={{ margin: '10px 0' }} />
                    <Typography color='error' style={{fontSize:'0.6rem'}}>{passWarning}</Typography>
                    <Button type='submit' style={{ backgroundColor: 'black', color: 'white', marginTop: '3px' }} fullWidth>{!loading ? 'Register' : 'Please Wait...'}</Button>
                    <Button variant='contained' color='secondary' style={{ marginTop: '2px', color: 'white' }} fullWidth onClick={(e) => clear(e)}>Clear</Button>
                </form>
                <div>Have an Account Already? <Button onClick={(e) => {
                        e.preventDefault();
                        setForm('login')
                            }}>LOGIN</Button></div>
            </Paper>
        </div>
    );
};