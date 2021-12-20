import React, { useState} from 'react';
import { useDispatch} from 'react-redux';
import { Button, Paper, TextField, Typography } from '@material-ui/core'
import { signUpUser } from '../../actions/adminActions/otherActions/actions';
import { Header } from '../Header/Header';

//form validation
import { isEmail, isStrongPassword } from 'validator'

export const SignUp = () => {
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
    
    //show success or failure message
    // const [regStatus, setRegStatus] = useState(false)

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
                await dispatch(signUpUser(user));
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
            <Paper align='center' style={{ maxWidth: 300, padding: 20, marginTop:'100px' }}>
                <Typography variant="h5" style={{ fontFamily: 'courier', fontStyle: 'bold', fontSize: '1.5rem' }}>
                    Sign Up
                </Typography>
                
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
                        <Button variant='outlined' color='default' size='small' onClick={(e) => {setshow(!show)}}>{show ? 'HIDE' : 'SHOW'}</Button>
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
                    <Button type='submit' style={{ backgroundColor: 'black', color: 'white', marginTop: '3px' }} fullWidth>{!loading ? 'Register' : 'Loading...'}</Button>
                    <Button variant='contained' color='secondary' style={{ marginTop:'2px', color: 'white' }} fullWidth onClick={(e)=>clear(e)}>Clear</Button>
                </form>
            </Paper>
        </div>
    );
};
