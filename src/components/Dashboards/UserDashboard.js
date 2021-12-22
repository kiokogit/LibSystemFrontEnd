import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate} from 'react-router-dom';

import { Typography, IconButton, Grid, TextField} from '@material-ui/core';
import { AccountCircle, Message, ShoppingCart, Menu as MenuIcon }from '@material-ui/icons';
import {  Container, Badge, AppBar} from '@mui/material';

import { getUserDetails } from '../../actions/adminActions/adminActions';
import {  addBookToCart, cancelBookRequest, logOut, removeFromCart, sendBorrowRequest } from '../../actions/userActions/userActions';
import { getBooks} from '../../actions/adminActions/otherActions/actions';

//userdashboard
export const UserDashboard = () => {
    const token = JSON.parse(localStorage.getItem('USER')).data;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    //fetch user details
    useEffect(() => {
        dispatch(getUserDetails())
    }, [dispatch, token]);

    //fetch library
    useEffect(() => {
        dispatch(getBooks())
    }, [dispatch]);

    //fetch states in store
    const user = useSelector(state => state.users);
    const books = useSelector(state => state.books);
 
    //create state to shift through windows
    const [window, setWindow] = useState('home');
    
    //EVENT HANDLERS: WITH EACH HANDLER, REFRESH USER DETAILS
    //handle Logout
    const logOutuser = (e) => {
        e.preventDefault();
        localStorage.removeItem('USER');
        dispatch(logOut());
        navigate('/');
    };

    //handle Borrow Request
    const handleBorrow = (e, toBorrow) => {
        e.preventDefault();
        dispatch(sendBorrowRequest(toBorrow));
        dispatch(getUserDetails());
    };

    //handle cancel borrow
    const handleCancelBorrow = (e, toCancel) => {
        e.preventDefault();
        dispatch(cancelBookRequest(toCancel));
        dispatch(getUserDetails());
    };

    //handle add to Cart
    const handleAddToCart = (e, bookId) => {
        e.preventDefault();
        dispatch(addBookToCart(bookId));
        dispatch(getUserDetails());
    };

    //handle Remove from cart
    const handleRemoveFromCart = (e, bookId) => {
        e.preventDefault();
        dispatch(removeFromCart(bookId));
        dispatch(getUserDetails());
    };

    return (
        <div>
            <AppBar style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <button onClick={e => {
                    e.preventDefault();
                    setWindow('home');
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
                        <Badge badgeContent={user.booksBorrowed?.length} color='secondary'>
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
                        <Badge badgeContent={user.fines} color='warning'>
                            <AccountCircle />
                        </Badge>
                    </IconButton>
                </div>
                <button onClick={(e) => logOutuser(e)}>LogOut</button>
            </AppBar>
            <div style={{marginTop:'75px'}}>
            {window === 'home' && <Landing user={user} books={books} handleBorrow={handleBorrow} handleAddToCart={handleAddToCart} />}
            {window === 'profile' && <Profile user={user} />}
            {window === 'messages' && <Messages user={user} />}
                {window === 'cart' && <Cart user={user} handleBorrow={handleBorrow} handleCancelBorrow={handleCancelBorrow} handleRemoveFromCart={handleRemoveFromCart} />}
                </div>
        </div>
    );
};

const Landing = ({user, books, handleBorrow, handleAddToCart }) => {
    const inCart = user.booksInCart;
    const pending = user.bookRequests;
    
    //check if book in cart already
    const checkInCart = (bookId) => {
        const found = inCart.filter((book) => book._id === bookId);
        if (found?.length > 0) {
            return 'Book is Already in Cart'
        }
    };
    
        //check if book already borrowed, and create alert
        //On submit, the method first checks if checkBorrowed returns anything
        const checkBorrowed = (bookId) => {
        const borrowed = user.booksBorrowed.filter((book) => book.returned === false);
        const found = pending.filter((book) => book.bookId._id === bookId);
        const found2 = borrowed.filter((book) => book.bookId._id === bookId);
        if (found?.length > 0) {
            return 'This book is being processed for you already';
        } else if (found2?.length > 0) {
            
            return 'System: You Have This Book With You.. Check Again'
        } else {
            return
        }
    };

    //set Select a book
    const [book, setBook] = useState(null);

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
                            <Container key={book._id} style={{ display: 'flex', flexDirection: 'column', fontSize: '0.75rem', borderBottom: 'solid 1px', padding: '5px', textAlign: 'left', width: '100%', cursor: 'pointer' }} onDoubleClick={(e) => {
                                e.preventDefault();
                                setBook(book);
                            }}>
                                <div >
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <img src={book.coverImage} alt='img' style={{ width: '40px', height: '50px', margin: '3px' }} />
                                        <div>
                                            <p>{book.title}</p>
                                            <p>  Author: {book.author}.{book.noOfPages}pgs</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={(e) => {
                                        e.preventDefault()
                                        const toBorrow = { bookId: book._id }
                                        if (checkBorrowed(book._id)) {
                                            alert(checkBorrowed(book._id));
                                            return
                                        } else {
                                            handleBorrow(e, toBorrow)
                                            alert('Sending Borrow request')
                                        }
                                    }}>Borrow</button>
                                    <button onClick={(e) => {
                                        e.preventDefault()
                                        if (checkInCart(book._id)) {
                                            alert(checkInCart(book._id));
                                            return
                                        } else {
                                            handleAddToCart(e, book._id)
                                            alert('Adding to Cart')
                                        }
                                    }}>Add to Cart</button>
                                </div>
                            </Container>
                        )))}
                </Grid>
            </Container>
            <Container name='rightbar' style={{ width: '30%', borderLeft: '1px solid' }}>
                {(!book) ? null : (
                    <div style={{ width: '100%', justifyContent: 'left' }}>
                        <div>
                            <h3>Book details</h3>
                            <h4>{book.title}</h4>
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                <div>
                                    <img src={book.coverImage} style={{ width: '200px', height: '300px', margin: '3px' }} alt='bookCover' />
                                </div>
                                <div style={{ textAlign: 'left', wordWrap: 'break-word', hyphens: 'auto' }}>
                                    <p>Author: {book.author}</p>
                                    <p>Subject: {book.subject}</p>
                                    <p>Edition: {book.edition}</p>
                                    <p>Size: {book.noOfPages} pages</p>
                                </div>
                                <div>
                                    <p>Preview: {book.preview}</p>
                                    <p>Tags: {book.tags.map((tag) => ` #${tag}`)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </Container>
    );
};

const Profile = ({ user }) => {
    return (
        <Container>
            <Typography>
                Personal Settings
            </Typography>
            <Typography>
                Edit Profile
            </Typography>
            <form style={{display:'flex', flexDirection:'column', width:'300px'}}>
                <TextField variant='filled' label='First Name' value={user.firstName} />
                <TextField variant='filled' label='Last Name' value={user.lastName} />
                <TextField variant='filled' label='Email Address' value={user.userEmail} />
                <TextField variant='filled' label='Phone Number' value={user.userPhone} />
                <TextField variant='filled' label='Date of Birth' value={user.dateOfBirth} />
                <TextField variant='filled' label='Gender' value={user.gender} />
            </form>
        </Container>
    )
};

const Messages = ({ user }) => {
    const { messages, notifications } = user;
    
    return (
        <Container style={{ display: 'flex', flexDirection: 'row', marginTop: '50px' }}>
            <Container style={{width:'25%'}}>
                NOTIFICATIONS
                {notifications?.map((note) => (
                    <Container key={note._id} style={{padding:'5px', margin:'5px'}}>
                        <div style={{ textAlign:'left', fontStyle:'italic'}}>
                            {note.sender}
                        </div>
                        <div style={{fontSize:'0.9rem', textAlign:'left'}}>
                            {note.body.length>60? `${note.body.substring(0,60)}...`:note.body}
                        </div>
                        <div style={{color:'grey', fontSize:'0.75rem', textAlign:'right'}}>
                            {new Date(note.time).toLocaleString()}
                        </div>
                    </Container>
                ))}
            </Container>
            <Container>
                MESSAGES
                {messages?.map((message) => (
                    <Container key={message._id} style={{padding:'5px', margin:'5px'}}>
                        <div style={{ textAlign:'left', fontStyle:'italic'}}>
                            {message.sender}
                        </div>
                        <div style={{fontSize:'0.9rem', textAlign:'left'}}>
                            {message.body.length>60? message.body.substring(0, 60):message.body}
                        </div>
                        <div style={{color:'grey', fontSize:'0.75rem', textAlign:'right'}}>
                            {new Date(message.time).toLocaleString()}
                        </div>
                    </Container>
                ))}
            </Container>
            
        </Container>
    )
};

const Cart = ({ user, handleBorrow, handleCancelBorrow, handleRemoveFromCart }) => {
    //lists
    const inCart = user.booksInCart;
    const pending = user.bookRequests;
    const borrowed = user.booksBorrowed.filter((book) => book.returned === false);
    const borrowHistory = user.booksBorrowed;

    //check if book already borrowed, and create alert
    //On submit, the method first checks if checkBorrowed returns anything
    const checkBorrowed = (bookId) => {
        const found = pending.filter((book) => book.bookId._id === bookId);
        const found2 = borrowed.filter((book) => book.bookId._id === bookId);
        if (found?.length > 0) {
            return 'This book is being processed for you already';
        } else if (found2?.length > 0) {
            
            return 'System: You Have This Book With You.. Check Again'
        } else {
            return
        }
    };

    return (
        <Container align='left' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Container>
                In Cart
                <Grid container >
                    {!inCart ? 'Data Not Available' : inCart.length < 1 ? 'No Books In Cart' : (
                        inCart.map((book) => (
                            <Container key={book._id} style={{ display: 'flex', flexDirection: 'column', fontSize: '0.75rem', borderBottom: 'solid 1px', padding: '5px', textAlign: 'left', width: '100%', cursor: 'pointer' }}>
                                <div >
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <img src={book.coverImage} alt='img' style={{ width: '40px', height: '50px', margin: '3px' }} />
                                        <div>
                                            <p>{book.title}</p>
                                            <p>  Author: {book.author}.{book.noOfPages}pgs</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        const toBorrow = { bookId: book._id }
                                        if (checkBorrowed(book._id)) {
                                            alert(checkBorrowed(book._id));
                                            return
                                        } else {
                                            handleBorrow(e, toBorrow)
                                            alert('Sending Request')
                                        }
                                    }}>Borrow</button>
                                    <button onClick={(e) => {
                                        handleRemoveFromCart(e, book._id)
                                    }}>Remove</button>
                                </div>
                            </Container>
                        )))}
                </Grid>
            </Container>
            <Container>
                Pending Requests
                <Grid container >
                    {!pending ? 'Data not Available' : pending.length < 1 ? 'no Pending Requests' : (
                        pending.map((book) => (
                            <Container key={book._id} style={{ display: 'flex', flexDirection: 'column', fontSize: '0.75rem', borderBottom: 'solid 1px', padding: '5px', textAlign: 'left', width: '100%', cursor: 'pointer' }}>
                                <div >
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <img src={book.bookId.coverImage} alt='img' style={{ width: '40px', height: '50px', margin: '3px' }} />
                                        <div>
                                            <p>{book.bookId.title}</p>
                                            <p>  Author: {book.bookId.author}.{book.bookId.noOfPages}pgs</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={(e) => {
                                        const toCancel = { bookId: book.bookId._id }
                                        handleCancelBorrow(e, toCancel)
                                    }} >Cancel</button>
                                </div>
                            </Container>
                        )))}
                </Grid>
            </Container>
            <Container>
                Boorrowed Books
                <Grid container >
                    {!borrowed ? 'Data Not Available' : borrowed.length < 1 ? 'no Pending Requests' : (
                        borrowed.map((book) => (
                            <Container key={book._id} style={{ display: 'flex', flexDirection: 'column', fontSize: '0.75rem', borderBottom: 'solid 1px', padding: '5px', textAlign: 'left', width: '100%', cursor: 'pointer' }}>
                                <div >
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <img src={book.bookId.coverImage} alt='img' style={{ width: '40px', height: '50px', margin: '3px' }} />
                                        <div>
                                            <p>{book.bookId.title}</p>
                                            <p>  Author: {book.bookId.author}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        Date Borrowed:  {new Date(book.dateBorrowed).toLocaleDateString()}
                                    </div>
                                    <div>
                                       Date Expected:  {new Date(book.dateToReturn).toLocaleDateString()}
                                    </div>
                                </div>
                            </Container>
                        )))}
                </Grid>
            </Container>
            <Container>
                Boorrowing History
                <Grid container >
                    {!borrowHistory ? 'Data Not Available' : borrowHistory.length < 1 ? 'no Pending Requests' : (
                        borrowHistory.map((book) => (
                            <Container key={book._id} style={{ display: 'flex', flexDirection: 'column', fontSize: '0.75rem', borderBottom: 'solid 1px', padding: '5px', textAlign: 'left', width: '100%', cursor: 'pointer' }}>
                                <div >
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <img src={book.bookId.coverImage} alt='img' style={{ width: '40px', height: '50px', margin: '3px' }} />
                                        <div>
                                            <p>{book.bookId.title}</p>
                                            <p>  Author: {book.bookId.author}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        Date Borrowed:  {new Date(book.dateBorrowed).toLocaleDateString()}
                                    </div>
                                    <div>
                                       Date Expected:  {new Date(book.dateToReturn).toLocaleDateString()}
                                    </div>
                                </div>
                                <div>
                                    Date Returned:{book.returned ?  new Date(book.dateReturned).toLocaleDateString() : ' Not Yet'}
                                </div>
                            </Container>
                        )))}
                </Grid>
            </Container>
        </Container>
    );
};