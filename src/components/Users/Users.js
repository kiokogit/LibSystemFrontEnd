import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { User } from './User/User';
import {Container, Table, TableBody} from '@material-ui/core'
import { getUsers } from '../../actions/adminActions/adminActions'

export const Users = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const users = useSelector(state => state.users);

    return (
        <Container style={{ paddingTop: '10px' }}>
            USERS LIST
            <Table >
                {users.map((user) =>
                    <TableBody  key={user.id}>
                        <User user={user} />
                    </TableBody>)
                }
            </Table>
        </Container>
    );
}
