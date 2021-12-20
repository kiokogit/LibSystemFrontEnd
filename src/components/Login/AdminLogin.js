/* import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; */
import { Button, TextField } from '@material-ui/core';
import { Link} from 'react-router-dom';
import { Header } from '../Header/Header';

//Enter Key Card Code
export const AdminLogin = () => {
   /*  const dispatch = useDispatch();
    const [keyCode, setkeyCode] = useState(null);

    const handleSubmit = () => {
        // dispatch(confirmAdmin(keyCode))
    }; */

    return (
        <div>
            <Header />
            <form onSubmit={(e)=>{}}>
                <div style={{ marginTop: '250px' }}>
                    Enter Key Card Code
                    <div>
                        <TextField variant='outlined' label='Enter Code' onChange={(e) => {}}/>
                    </div>
                    <Link to='/adminPage'>
                        <Button type='submit'>
                            LOGIN
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    );
};
