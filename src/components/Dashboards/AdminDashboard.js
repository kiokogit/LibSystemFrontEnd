import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Paper, Button, Card, Badge, Table, TableBody, TableCell, TableRow, TableHead, TextField, Typography, Container } from '@material-ui/core';

import { checkInABook, checkOutABook, pendingRequests, unReturnedBooks, checkOutManually } from '../../actions/adminActions/adminActions';
import { getBooks, getBookDetails } from '../../actions/adminActions/otherActions/actions';
import { EditForm } from '../EditBook/EditForm';

export const AdminDashboard = () => {
    const user = 'admin';
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pendingRequests());
    }, [dispatch]);
    const list = useSelector(state => state.list)

    return (
        <div id='adminDash'>
            <div  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: '50px', marginTop:'150px', height:'100vh'}}>
                <Card size='lg' align='center' style={{ borderRadius: '50%', height: '7rem', width: '7rem', backgroundColor: 'blue' }}>
                    <Link to='/books/new'>
                    <Button style={{ marginTop: 25 }}>Add A New Book</Button>
                    </Link>
                </Card>
                <Card size='lg' align='center' style={{ borderRadius: '50%', height: '7rem', width: '7rem', backgroundColor: 'green', marginTop: '100px' }}>
                    <Link to='/lendOut'>
                    <Button style={{ marginTop: 25 }}>
                        Lend Out Books
                        <Badge badgeContent={!list? 0:list.length} color='error'>  {/*Fetch number pending book borrow requests*/}
                        </Badge>
                    </Button>
                    </Link >
                </Card>
                <Card size='lg' align='center' style={{ borderRadius: '50%', height: '7rem', width: '7rem', backgroundColor: 'brown', marginTop: '75px' }}>
                    <Link to='/returnbooks'>
                    <Button style={{ marginTop: 25 }}>Return a Book</Button>
                    </Link>
                </Card>
                <Card size='lg' align='center' style={{ borderRadius: '50%', height: '7rem', width: '7rem', backgroundColor: 'purple', marginTop: '120px' }}>
                    <Link to='/browsebooks'>
                    <Button style={{ marginTop: 25 }}>Explore Books</Button>
                    </Link>
                </Card>
                <Card size='lg' align='center' style={{ borderRadius: '50%', height: '7rem', width: '7rem', backgroundColor: 'orange', marginTop: '50px' }}>
                    <Button style={{ marginTop: 25 }}>View Users</Button>
                </Card>
            </div>
        </div>
    );
};

//lend out books
export const LendBooks = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(pendingRequests());
    }, [dispatch]);

    const [details, setDetails] = useState({
        bookId: '',
        userEmail:''
    })
    const list = useSelector(state => state.list);

    //auto borrowing
    const handleCheckOut = (e, rqstId) => {
        e.preventDefault();
        dispatch(checkOutABook(rqstId));
    };
//for physical lib borrowing
    const manuallyCheckOut = (e, toBorrow) => {
        e.preventDefault();
        dispatch(checkOutManually(toBorrow))
    };

    return (
        <div>
            <h3>CHECK OUT BOOKS TO BORROWERS</h3>
            <Container style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:'100px'}}>
                <Container style={{width:'400px'}}>
                    <Paper>
                        <Typography>Check out Manually</Typography>
                        <TextField label='Enter Book ID' onChange={(e)=>setDetails({...details, bookId:e.target.value})}/>
                        <TextField label='Enter User EMAIL' onChange={(e)=>setDetails({...details, userEmail:e.target.value})}/>
                        <Button onClick={(e) => {
                            manuallyCheckOut(e, details)
                        }}>CHECKOUT</Button>
                    </Paper>
                </Container>
                <Container>
                    <Card>      {/*if else statement for lists*/}
                        {!list? 'Cannot Fetch List':((list.length===0)? ('No Pending Requests to Show. Try Manual Check Out') :
                    (<Table>
                        <TableHead style={{backgroundColor:'lightcyan'}}>
                            <TableCell>Book</TableCell>
                            <TableCell>Book Title</TableCell>
                            <TableCell>Borrower</TableCell>
                            <TableCell>Borrower Email</TableCell>
                            <TableCell>Chek out</TableCell>
                        </TableHead>
                        <TableBody>
                            {list.map((reqst) =>
                                <TableRow key={reqst._id}>
                                    <TableCell> <img src={reqst.bookId? reqst.bookId.coverImage:null } alt='coverImg' style={{ width: '40px', height: '50px', margin:'3px'}} /> </TableCell>
                                    <TableCell> {!reqst.bookId? 'No Book Data':reqst.bookId.title} </TableCell>
                                     <TableCell> {!reqst.bookId? 'No Book Data ':reqst.userId.firstName} {!reqst.bookId? 'No Book Data':reqst.userId.lastName} </TableCell>
                                    <TableCell> {!reqst.bookId? 'No Book Data':reqst.userId.userEmail} </TableCell>
                                    <TableCell>
                                        <Button aria-label='Click to check book out' onClick={(e)=> handleCheckOut(e, reqst._id)}>
                                            Check Out
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>))}
                </Card>
                </Container>
                <Link to='/adminPage'>
                <Button >Back</Button>
                </Link>
            </Container>
        </div>
    );
};

//return a borrowed book to library
export const ReturnABook = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(unReturnedBooks());
    }, [dispatch]);

    const list2= useSelector(state => state.list2);

    const handleCheckIn = (e, borrowId) => {
        e.preventDefault();
        dispatch(checkInABook(borrowId));
    };

    return (
        <div style={{height:'100vh'}}>
            <h3>RECEIVE BOOKS FROM BORROWERS</h3>
            <Container style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:'100px'}}>
                <Container style={{width:'400px'}}>
                    <Paper>
                        <Typography>Check In Manually</Typography>
                        <TextField label='Enter Book ID' />
                        <TextField label='Enter User EMAIL' />
                        <Button>CHECKIN BOOK</Button>
                    </Paper>
                </Container>
                <Container>
                    <Card>      {/*if else statement for lists*/}
                        {!list2? 'List Not found':((list2.length===0)? ('No Pending Borrowed Books to Show. Try Manual Check In') :
                    (<Table>
                        <TableHead style={{backgroundColor:'lightcyan'}}>
                            <TableCell></TableCell>
                            <TableCell>Book Title</TableCell>
                            <TableCell>Borrower</TableCell>
                            <TableCell>Date Borrowed</TableCell>
                            <TableCell>Date Expected</TableCell>
                            <TableCell>Chek in</TableCell>
                        </TableHead>
                        <TableBody>
                            {list2.map((brrw) =>
                                <TableRow key={brrw._id}>
                                    <TableCell> <img src={brrw.bookId.coverImage} alt='coverImg' style={{ width: '40px', height: '50px', margin:'3px'}} /> </TableCell>
                                    <TableCell> {brrw.bookId.title} </TableCell>
                                    <TableCell> {brrw.userId.firstName} {brrw.userId.lastName} </TableCell>
                                    <TableCell> {new Date(brrw.dateBorrowed).toLocaleDateString()} </TableCell>
                                    <TableCell> {new Date(brrw.dateToReturn).toLocaleDateString()} </TableCell>
                                    <TableCell>
                                        <Button aria-label='Click to check book in' onClick={(e) => {
                                            handleCheckIn(e, brrw._id)
                                        }}>
                                            Check In
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>))}
                </Card>
                </Container>
                <Link to='/adminPage'>
                <Button >Back</Button>
                </Link>
            </Container>
        </div>
    );
};

//add newBook
export const AddNewBook = () => {
    return (
        <div >
            <h3>ADD A NEW BOOK TO THE LIBRARY</h3>
            <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop:'100px' }}>
                <Container>
                    <Paper style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>Scan RFID Tag</Typography>
                        <TextField label='Waiting for Scanner...' />
                        <Button fullwidth>Submit</Button>
                    </Paper>
                </Container>
                <EditForm />
                <Link to='/adminPage'>
                    <Button >Back</Button>
                </Link>
            </Container>
        </div>
    );
};

export const ExploreBooks = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch])

    const books = useSelector((state) => state.books)
    const [selection, setSelection] = useState(null);

    const bookDetails = (id) => {
        dispatch(getBookDetails(id));
    };
    const book = useSelector((state) => state.list);

    return (
        <div style={{ maxHeight:'700px', overflowY: 'unset' }}>
            <div style={{ marginTop: '100px', width: '100%', display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '10%', backgroundColor: 'maroon' }}>
                    <h3>SideBar</h3>
                </div>
                <div style={{ width: '50%', backgroundColor: 'initial' }}>
                    <Container align='left' style={{ overflowY: 'scroll', maxHeight: '500px' }}>
                        <h2>Explore {books.length} books in the Library</h2>
                        {books.map((book) =>
                            <Container onDoubleClick={(e) => {
                                setSelection(book._id)
                                bookDetails(book._id)
                            }} key={book._id} style={{ display: 'flex', flexDirection: 'row', fontSize: '0.75rem', borderBottom: 'solid 1px', padding: '5px', textAlign: 'left', width: '100%', cursor:'pointer'}}>
                                <div >
                                    <img src={book.coverImage} alt='img' style={{ width: '40px', height: '50px', margin: '3px' }} />
                                </div>
                                <div>
                                    <p>{book.title}</p>
                                    <p>  Author: {book.author}.{book.noOfPages}pgs</p> </div>
                            </Container>)}
                    </Container>
                </div>
                <div style={{ width: '40%', height: '', backgroundColor: 'yellowgreen', justifyContent: 'left' }}>
                    <h3>Book details</h3>
                    {(!selection) ? 'Select to show details' : (
                        <div>
                            <h4>{book.title}</h4>
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                <div>
                                    <img src={book.coverImage} style={{ width: '200px', height: '300px', margin: '3px' }} alt='bookCover' />
                                </div>
                                <div style={{ textAlign: 'left', wordWrap:'break-word', hyphens:'auto' }}>
                                    <p>Author: {book.author}</p>
                                    <p>Subject: {book.subject}</p>
                                    <p>Edition: {book.edition}</p>
                                    <p>Size: {book.noOfPages} pages</p>
                                    {/* <p>Tags: {book.tags.map((tag) => ` #${tag}`)}</p> */}
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};