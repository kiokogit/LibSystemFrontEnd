import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate} from 'react-router-dom';

import { Typography, IconButton, Card, Grid, TextField} from '@material-ui/core';
import { AccountCircle, Message, ShoppingCart, Menu as MenuIcon }from '@material-ui/icons';
import {  Container, Badge, AppBar} from '@mui/material';

import { getUserDetails } from '../../actions/adminActions/adminActions';
import {  logOut } from '../../actions/userActions/userActions';
import { getBooks} from '../../actions/adminActions/otherActions/actions';

//userdashboard
export const UserDashboard = () => {
    const token = JSON.parse(localStorage.getItem('USER')).data;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getUserDetails())
    }, [dispatch, token]);

    useEffect(() => {
        dispatch(getBooks())
    }, [dispatch]);

    const user = useSelector(state => state.users);
    const books = useSelector(state => state.books);
 
    //create state to shift through windows
    const [window, setWindow] = useState('home');
    
    const logOutuser = (e) => {
        e.preventDefault();
        localStorage.removeItem('USER');
        dispatch(logOut());
        navigate('/');
    };

    return (
        <div>
            <AppBar style={{ position: 'static', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <button onClick={e => {
                    e.preventDefault();
                    setWindow('home')
                }}>
                    <MenuIcon />
                </button>
                <div>
                    <IconButton onClick={e => {
                        e.preventDefault();
                        setWindow('messages')
                    }}>
                        <Badge badgeContent={user.messages?.length} color='success'>
                            <Message />
                        </Badge>
                    </IconButton>
                </div>
                <div>
                    My Store
                    <IconButton onClick={e => {
                        e.preventDefault();
                        setWindow('cart')
                    }}>
                        <Badge badgeContent={4} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>
                <div>
                    {token.userName}
                    <IconButton onClick={e => {
                        e.preventDefault();
                        setWindow('profile')
                    }}>
                        <Badge badgeContent={2} color='warning'>
                            <AccountCircle />
                        </Badge>
                    </IconButton>
                </div>
                <button onClick={(e) => logOutuser(e)}>LogOut</button>
            </AppBar>
            {window === 'home' && <Landing books={books} />}
            {window === 'profile' && <Profile user={user} />}
            {window === 'messages' && <Messages user={user} />}
            {window === 'cart' && <Cart user={user} />}
        </div>
    )
};

const Landing = ({books}) => {
    return (
        <Container style={{ marginTop: '10px', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Container name='leftbar' style={{ width: '10%', borderRight: '1px solid' }}>
                <div>
                    Search
                    <div>
                        by Category
                        by Year
                        by Author
                        by Subject
                    </div>
                </div>
                <hr />
                <div>
                    Filter Books
                    <div>
                        by Category
                        by Year
                        by Author
                        by Subject
                    </div>
                </div>
                <hr />
                <div>
                    Advanced Search
                </div>
            </Container>
            <Container name='centerbar' style={{ width: '60%', display: 'flex', flexDirection: 'column' }}>
                <Grid container >
                    {!books ? 'no books to show' : (
                        books.map((book) => (
                            <Grid item xs={7} lg={3}>
                                <img src={book.coverImage} alt='bookCover' style={{ width: '75px', height: '120px' }} />
                                <div>
                                    {book.title}
                                </div>
                                <div>
                                    {book.author}
                                </div>
                                <button >Borrow</button>
                                <button >Add to Cart</button>
                            </Grid>
                        )))}
                </Grid>
            </Container>
            <Container name='rightbar' style={{ width: '30%', borderLeft: '1px solid' }}>
            </Container>
        </Container>
    )
};

const Profile = ({user}) => {
    return (
        <Container>
            <Typography>
                Personal Settings
                Edit Profile
            </Typography>
            <form>
            <TextField variant='outlined' value={user.firstName} />
            <TextField variant='outlined' value={user.lastName} />
            <TextField variant='outlined' value={user.userEmail} />
            <TextField variant='outlined' value={user.userPhone} />
            <TextField variant='outlined' value={user.dateOfBirth} />
            <TextField variant='outlined' value={user.gender} />
            </form>
        </Container>
    )
};

const Messages = ({ user }) => {
    const { messages, notifications } = user
    return (
        <Container>
            MESSAGES
            {messages?.map((message) => (
                <Card>
                    <div>
                        {message.text}
                    </div>
                    <div>
                        {message.time}
                    </div>
                </Card>
            ))}
            <div>
                Fines
            </div>
            NOTIFICATIONS
            <Container>
                {notifications?.map((note) => (
                    <Card>
                        <div>
                            {note.text}
                        </div>
                        <div>
                            {note.time}
                        </div>
                    </Card>
                ))}
            </Container>
        </Container>
    )
};

const Cart = ({ user }) => {
    //lists
    const books = user.booksInCart;
    const pending = user.bookRequests;
    const borrowed = user.booksBorrowed.filter((book) => book.returned === false);
    const borrowHistory = user.booksBorrowed;
    return (
        <Container align='left'>
            <div>
                In Cart
                <Grid container >
                    {!books ? 'no books to show' : (
                        books.map((book) => (
                            <Grid item xs={7} lg={3}>
                                <img src={book.coverImage} alt='bookCover' style={{ width: '75px', height: '120px' }} />
                                <div>
                                    {book.title}
                                </div>
                                <div>
                                    {book.author}
                                </div>
                                <button fullWidth >Borrow</button>
                                <button fullWidth color='secondary'>Remove</button>
                            </Grid>
                        )))}
                </Grid>
            </div>
            <div>
                Pending Requests
                <Grid container >
                    {!pending ? 'no books to show' : pending.length<1? 'no Pending Requests':(
                        pending.map((book) => (
                            <Grid item xs={7} lg={3}>
                                <img src={book.coverImage} alt='bookCover' style={{ width: '75px', height: '120px' }} />
                                <div>
                                    {book.title}
                                </div>
                                <div>
                                    {book.author}
                                </div>
                                <button fullWidth >Cancel</button>
                            </Grid>
                        )))}
                </Grid>
            </div>
            <div>
                Boorrowed Books
                <Grid container >
                    {!borrowed ? 'no booksto show' : borrowed.length<1? 'no Pending Requests': (
                        borrowed.map((book) => (
                            <Grid item xs={7} lg={3}>
                                <img src={book.coverImage} alt='bookCover' style={{ width: '75px', height: '120px' }} />
                                <div>
                                    {book.title}
                                </div>
                                <div>
                                    {book.author}
                                </div>
                                <div>
                                    {book.dateToReturn}
                                </div>
                                <div>
                                    {book.dateBorrowed}
                                </div>
                            </Grid>
                        )))}
                </Grid>
            </div>
            <div>
                Boorrowing History
                <Grid container >
                    {!borrowHistory ? 'no booksto show' : borrowHistory.length<1? 'no Pending Requests': (
                        borrowHistory.map((book) => (
                            <Grid item xs={7} lg={3}>
                                <img src={book.coverImage} alt='bookCover' style={{ width: '75px', height: '120px' }} />
                                <div>
                                    {book.title}
                                </div>
                                <div>
                                    {book.author}
                                </div>
                                <div>
                                    Date Expected back: {book.dateToReturn}
                                </div>
                                <div>
                                    Date Borrowed: {book.dateBorrowed}
                                </div>
                                <div>
                                   Returned?: {book.returned}
                                </div>
                                <div>
                                    {book.returned?  `Date Returned: ${book.dateReturned}`:null}
                                </div>
                            </Grid>
                        )))}
                </Grid>
            </div>
        </Container>
    )
}