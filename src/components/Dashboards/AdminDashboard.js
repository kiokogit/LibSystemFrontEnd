import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileBase from 'react-file-base64';

import { AppBar, Paper, Button, Card, Badge, Table, TableBody, TableCell, TableRow, TableHead, TextField, Typography, Container } from '@material-ui/core';

import { editBookDetails, checkInABook, checkOutABook, pendingRequests, unReturnedBooks, checkOutManually, getUsers, getUserDetails, deleteBook } from '../../actions/adminActions/adminActions';
import { getBooks} from '../../actions/adminActions/otherActions/actions';
import { EditForm } from '../EditBook/EditForm';
import { logOut } from '../../actions/userActions/userActions';


export const AdminDashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //create state to manage windows
    const [window, setWindow] = useState('home');
    
    //OTHER WINDOWS OBJECTS
    
    //fetch user details
  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);
    //Returning Books
    useEffect(() => {
        dispatch(unReturnedBooks());
    }, [dispatch]);
    //Borrowing
    useEffect(() => {
        dispatch(pendingRequests());
    }, [dispatch]);
    //Editing
    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch])
    //GET ALL USERS
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    
    const borrowed= useSelector(state => state.borrowed);
    const pending = useSelector(state => state.pending);
    const books = useSelector((state) => state.books);
    const users = useSelector((state) => state.users);
    const user = useSelector((state)=>state.user)

    //HANDLERS
     //auto borrowing
     const handleCheckOut = (e, rqstId) => {
        e.preventDefault();
         dispatch(checkOutABook(rqstId));
         dispatch(pendingRequests());
    };
    //HANDLE LOGOUT
    const handleLogOut = (e) => {
        e.preventDefault();
        dispatch(logOut(navigate));
        
    };
    

//implement a MULTIPURPOSE SEARCH BAR - FOR ALL, EITHER REQUESTS, OR USERS ETC
  

    return (
        <div id='adminDash'>
            <AppBar style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '50px' }}>
                <button onClick={(e) => {
                    e.preventDefault();
                    setWindow('home')
                }}>Home</button>
                <div>Welcome, {user.firstName}</div>
                <button onClick={(e) => { handleLogOut(e) }}>Logout</button>
            </AppBar>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '75px' }}>
                <Container style={{ width: '20%', display: 'flex', flexDirection: 'column' }}>
                    <Card style={{ backgroundColor: 'blue', margin: '3px', cursor: 'pointer', color: 'white', padding: '10px 0 10px 20px' }} onClick={(e) => {
                        e.preventDefault();
                        setWindow('addBook')
                    }}>
                        Add A Book
                    </Card>
                    <Card style={{ backgroundColor: 'green', margin: '3px', cursor: 'pointer', color: 'white', padding: '10px 0 10px 20px' }} onClick={(e) => {
                        e.preventDefault();
                        setWindow('lendOut')
                    }}>
                        Issue A Book
                    </Card>
                    <Card style={{ backgroundColor: 'brown', margin: '3px', cursor: 'pointer', color: 'white', padding: '10px 0 10px 20px' }} onClick={(e) => {
                        e.preventDefault();
                        setWindow('returnBooks')
                    }}>
                        Return a book
                    </Card>
                    <Card style={{ backgroundColor: 'purple', margin: '3px', cursor: 'pointer', color: 'white', padding: '10px 0 10px 20px' }} onClick={(e) => {
                        e.preventDefault();
                        setWindow('explore')
                    }}>
                        Show Books
                    </Card>
                    <Card style={{ backgroundColor: 'orange', margin: '3px', cursor: 'pointer', color: 'white', padding: '10px 0 10px 20px' }} onClick={(e) => {
                        e.preventDefault();
                        setWindow('users')
                    }}>
                        Show Users
                    </Card>
                </Container>
                <div style={{ width: '80%' }}>
                    {window === 'home' && <Home setWindow={setWindow} pending={pending} />}
                    {window === 'addBook' && <AddNewBook books={books} />}
                    {window === 'lendOut' && <LendBooks handleCheckOut={handleCheckOut} borrowRequests={pending} borrowedBooks={borrowed} />}
                    {window === 'returnBooks' && <ReturnABook borrowedBooks={borrowed} />}
                    {window === 'explore' && <ExploreBooks books={books} />}
                    {window === 'users' && <ShowUsers users={users} />}
                </div>
            </div>
        </div>
    );
};

//home drawer:
const Home = ({ setWindow, pending }) => {

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: '50px' }}>
            <Card size='lg' align='center' style={{ borderRadius: '50%', height: '7rem', width: '7rem', backgroundColor: 'blue' }}>
                <Button style={{ marginTop: 25 }} onClick={(e) => {
                    e.preventDefault();
                    setWindow('addBook')
                }}>Add A New Book</Button>
            </Card>
            <Card size='lg' align='center' style={{ borderRadius: '50%', height: '7rem', width: '7rem', backgroundColor: 'green', marginTop: '100px' }}>
                <Button style={{ marginTop: 25 }} onClick={(e) => {
                    e.preventDefault();
                    setWindow('lendOut')
                }}>
                    Lend Out Books
                    <Badge badgeContent={!pending ? 0 : pending.length} color='error'>  {/*Fetch number pending book borrow requests*/}
                    </Badge>
                </Button>
            </Card>
            <Card size='lg' align='center' style={{ borderRadius: '50%', height: '7rem', width: '7rem', backgroundColor: 'brown', marginTop: '75px' }}>
                <Button style={{ marginTop: 25 }} onClick={(e) => {
                    e.preventDefault();
                    setWindow('returnBooks')
                }}>Return a Book</Button>
            </Card>
            <Card size='lg' align='center' style={{ borderRadius: '50%', height: '7rem', width: '7rem', backgroundColor: 'purple', marginTop: '120px' }}>
                <Button style={{ marginTop: 25 }} onClick={(e) => {
                    e.preventDefault();
                    setWindow('explore')
                }}>Explore Books</Button>
            </Card>
            <Card size='lg' align='center' style={{ borderRadius: '50%', height: '7rem', width: '7rem', backgroundColor: 'orange', marginTop: '50px' }}>
                <Button style={{ marginTop: 25 }} onClick={(e) => {
                    e.preventDefault();
                    setWindow('users')
                }}>View Users</Button>
            </Card>
        </div>
    )
};

//lend out books
const LendBooks = ({borrowRequests, borrowedBooks, handleCheckOut}) => {
    const dispatch = useDispatch();
    
    const [details, setDetails] = useState({
        book: '',
        userEmail:''
    })

//for physical lib borrowing
    const manuallyCheckOut = (e, toBorrow) => {
        e.preventDefault();
        dispatch(checkOutManually(toBorrow));
    };

    //check if a book is already borrowed, to prevent duplicate key errors
    const availability = (reqst) => {
        const available = borrowedBooks.filter(book => book.book.id === reqst.book.id);
        if (available.length > 0) return 1;
        else return 0
    };

    return (
        <div>
            <h3>CHECK OUT BOOKS TO BORROWERS</h3>
            <Container style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <Container>
                    <Card>      {/*if else statement for lists*/}
                        {!borrowRequests? 'Cannot Fetch List':((borrowRequests.length===0)? ('No Pending Requests to Show. Try Manual Check Out') :
                    (<Table>
                        <TableHead style={{backgroundColor:'lightcyan'}}>
                            <TableCell>Book</TableCell>
                            <TableCell>Book Title</TableCell>
                            <TableCell>Borrower Email</TableCell>
                            <TableCell>Chek out</TableCell>
                        </TableHead>
                        <TableBody>
                            {borrowRequests.map((reqst) =>
                                <TableRow key={reqst.id}>
                                    <TableCell> <img src={reqst.book? reqst.book.coverImage:null } alt='coverImg' style={{ width: '40px', height: '50px', margin:'3px'}} /> </TableCell>
                                    <TableCell> {!reqst.book? 'No Book Data':reqst.book.title} </TableCell>
                                    <TableCell> {!reqst.book? 'No Book Data':reqst.by.userEmail} </TableCell>
                                    <TableCell>
                                        { availability(reqst)===1 ? 'Book Not Available' :
                                            <Button aria-label='Click to check book out' onClick={(e) => handleCheckOut(e, reqst.id)}>
                                                Check Out
                                            </Button>}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>))}
                </Card>
                </Container>
                <Container style={{width:'400px'}}>
                    <Paper>
                        <Typography>Check out Manually</Typography>
                        <TextField label='Enter Book ID' onChange={(e)=>setDetails({...details, book:e.target.value})}/>
                        <TextField label='Enter User EMAIL' onChange={(e)=>setDetails({...details, userEmail:e.target.value})}/>
                        <Button onClick={(e) => {
                            manuallyCheckOut(e, details)
                        }}>CHECKOUT</Button>
                    </Paper>
                </Container>
            </Container>
        </div>
    );
};

//return a borrowed book to library
const ReturnABook = ({borrowedBooks}) => {

    const dispatch = useDispatch();

     //receive a book, handle checkIn
     const handleCheckIn = (e, borrowId) => {
        e.preventDefault();
        if (window.confirm('All Fines Cleared? ')) {
            dispatch(checkInABook(borrowId));
        } else {
            alert('Client must clear pending fines first...')
            return
        }
    };
    //fines
    const fines = (date2, date1) => {
        const FINES_AMOUNT_PER_DAY = 10;
        const fine = Math.floor((date2.getTime() - date1.getTime())/(3600*24*1000))* FINES_AMOUNT_PER_DAY;
        return fine;
    };
   
    return (
        <div style={{height:'100vh'}}>
            <h3>RECEIVE BOOKS FROM BORROWERS</h3>
            <Container style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <Container>
                    <Card>      {/*if else statement for lists*/}
                        {!borrowedBooks? 'List Not found':((borrowedBooks.length===0)? ('No Pending Borrowed Books to Show. Try Manual Check In') :
                    (<Table>
                        <TableHead style={{backgroundColor:'lightcyan'}}>
                            <TableCell></TableCell>
                            <TableCell>Book Title</TableCell>
                            <TableCell>Borrower</TableCell>
                            <TableCell>Date Borrowed</TableCell>
                            <TableCell>Date Expected</TableCell>
                            <TableCell>Fines Accrued</TableCell>
                            <TableCell>Chek in</TableCell>
                        </TableHead>
                        <TableBody>
                            {borrowedBooks.map((brrw) =>
                                <TableRow key={brrw.id}>
                                    <TableCell> <img src={brrw.book.coverImage} alt='coverImg' style={{ width: '40px', height: '50px', margin:'3px'}} /> </TableCell>
                                    <TableCell> {brrw.book.title} </TableCell>
                                    <TableCell> {brrw.by.userEmail}</TableCell>
                                    <TableCell> {new Date(brrw.dateBorrowed).toLocaleDateString()} </TableCell>
                                    <TableCell> {new Date(brrw.dateToReturn).toLocaleDateString()} </TableCell>
                                    <TableCell> {fines(new Date(), new Date(brrw.dateToReturn))<1? 0: `KES ${fines(new Date(), new Date(brrw.dateToReturn))}`} </TableCell>
                                    <TableCell>
                                        <Button aria-label='Click to check book in' onClick={(e) => {
                                            handleCheckIn(e, brrw.id)
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
                <Container style={{width:'400px'}}>
                    <Paper>
                        <Typography>Check In Manually</Typography>
                        <TextField label='Enter Book ID' />
                        <TextField label='Enter User EMAIL' />
                        <Button>CHECKIN BOOK</Button>
                    </Paper>
                </Container>
            </Container>
        </div>
    );
};

//add newBook
const AddNewBook = () => {
    //set state for windows
    const [method, setMethod] = useState('manual')
    const [bookDetails, setbookDetails] = useState({});

    return (
        <div>
            <h3>ADD A NEW BOOK TO THE LIBRARY</h3>
            <button onClick={(e) => {
                e.preventDefault();
                setMethod('manual');
            }}>Fill Form</button>
            <button onClick={(e) => {
                e.preventDefault();
                setMethod('auto');
            }}>Scan RFID</button>
            {method === 'manual' && <EditForm bookDetails={bookDetails} setbookDetails={setbookDetails} />}
            {method === 'auto' && (<Container>
                <Paper align='center' style={{ width: '400px', margin: '50px', display: 'flex', flexDirection: 'column' }}>
                    <Typography>Scan RFID Tag</Typography>
                    <TextField variant='filled' label='Waiting for Scanner...' />
                    <Button >Submit</Button>
                </Paper>
            </Container>)}
        </div>
    );
};

const ExploreBooks = ({books}) => {

    //set state for the selected book
    const [book, setBook] = useState(null);
    const [draw, setDraw] = useState(null);
    const [message, setMessage] = useState(null)

    return (
        <div style={{ maxHeight: '700px', overflowY: 'unset' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '50%', backgroundColor: 'initial' }}>
                    <Container align='left' style={{ overflowY: 'scroll', maxHeight: '100%' }}>
                        <h2>Explore {books?.length} books in the Library</h2>
                        {books?.map((book) =>
                            <Container onClick={(e) => {
                                setBook(book)
                                setDraw('details')
                            }} key={book.id} style={{ display: 'flex', flexDirection: 'row', fontSize: '0.75rem', borderBottom: 'solid 1px', padding: '5px', textAlign: 'left', width: '100%', cursor: 'pointer' }}>
                                <div >
                                    <img src={book.coverImage} alt='img' style={{ width: '40px', height: '50px', margin: '3px' }} />
                                </div>
                                <div>
                                    <p>{book.title}</p>
                                    <p>  Author: {book.author}.{book.noOfPages}pgs</p>
                                </div>
                
                            </Container>)}
                    </Container>
                </div>
                {draw === 'details' && <ShowDetails setMessage={setMessage} message={message} setBook={setBook} book={book } setDraw={setDraw} />}
                {draw === 'edit' && <BookEditor setBook={setBook} book={book} setDraw={setDraw}/>}
            </div>
        </div>
    );
};

const ShowDetails = ({ setBook, book, setDraw, message, setMessage }) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteBook(book.id));
        dispatch(getBooks())
    }

    return (
        <div style={{ width: '50%', justifyContent: 'left' }}>
            <div>
                <h3>Book details</h3>
                <h4>{book.title}</h4>
                <div>
                    {message === 'delete' ?
                        <Card style={{ color:'red', height: 'fit-content', width: '95%', padding: '10px', borderRadius: '10px' }}>
                            <div>Are you sure you would like to delete this book? This action is not reversible</div>
                            <Button variant='outlined' color='secondary' type='' style={{ marginRight: '30px' }} onClick={e => {
                                e.preventDefault();
                                handleDelete();
                                setMessage(null);
                                setDraw(null);
                            }} >Delete</Button>
                            <Button variant='outlined' color='primary' onClick={e => {
                                e.preventDefault();
                                setMessage(null);
                            }} >Cancel</Button>
                        </Card> :
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <div></div>
                            <div>
                                <Button variant='outlined' color='primary' onClick={(e) => {
                                    e.preventDefault();
                                    setDraw('edit');
                                }}>Edit</Button>
                                <Button variant='outlined' color='secondary' onClick={(e) => {
                                    e.preventDefault();
                                    setMessage('delete');
                                    // handle delete is not called here, as button is hidden onclick
                                }}>Delete</Button>
                            </div>
                        </div>
                    }
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <div>
                        <img src={book.coverImage} style={{ width: '200px', height: '300px', margin: '3px' }} alt='bookCover' />
                    </div>
                    <div style={{ textAlign: 'left', wordWrap: 'break-word', hyphens: 'auto' }}>
                        <p>Author: {book.author}</p>
                        <p>Subject: {book.subject}</p>
                        <p>Edition: {book.edition}</p>
                        <p>Size: {book.noOfPages} pages</p>
                    </div>
                </div>
                <p>Preview: {book.preview}</p>
                <p>Tags: {book.tags?.map((tag) => ` #${tag}`)}</p>
            </div>
        </div>
    );
};

const BookEditor = ({setBook, setDraw, book }) => {

    const dispatch = useDispatch();

    const [bookDetails, setbookDetails] = useState(book)
    //create tags seperated by commas, for mapping with hashtags
    const createList = (value) => {
        const allTags = value.split(',');
        return allTags
    };

    const onSubmit = () => {
        dispatch(editBookDetails(bookDetails))
    };

    return (
        <Paper style={{ padding: '1px 1px 1px 1px' }}>
            <form style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column' }} >
                <Typography variant='h6' style={{ fontFamily: 'Courier' }}>
                    <h3>Editing {book.title}</h3>
                </Typography>
                <Container style={{ width: '100%',  display: 'flex', flexDirection: 'row' }}>
                    <Container style={{ width: '100%',  display: 'flex', flexDirection: 'column' }}>
                    
                        <TextField required label='Title' fullWidth size='small' name='title' variant='outlined' style={{ marginBottom: 5 }} value={bookDetails.title} onChange={(e) => setbookDetails({ ...bookDetails, title: e.target.value })} />
                        <TextField label='Author' fullWidth size='small' name='author' variant='outlined' style={{ marginBottom: 5 }} value={bookDetails.author} onChange={(e) => setbookDetails({ ...bookDetails, author: e.target.value })} />
                        <TextField label='Editors' fullWidth size='small' name='editors' variant='outlined' style={{ marginBottom: 5 }} value={bookDetails.editors} onChange={(e) => {
                            const editors = createList(e.target.value.trim())
                            setbookDetails({ ...bookDetails, editors: editors })
                        }} />
                        <TextField label='Edition' fullWidth size='small' name='edition' variant='outlined' style={{ marginBottom: 5 }} value={bookDetails.edition} onChange={(e) => setbookDetails({ ...bookDetails, edition: e.target.value })} />
                        <TextField type='date' label='Year Published' fullWidth size='small' name='yearOfPublication' variant='outlined' style={{ marginBottom: 5 }} value={bookDetails.yearOfPublication} onChange={(e) => setbookDetails({ ...bookDetails, yearOfPublication: e.target.value })} />
                        <TextField label='Publisher' fullWidth size='small' name='publisher' variant='outlined' style={{ marginBottom: 5 }} value={bookDetails.publisher} onChange={(e) => setbookDetails({ ...bookDetails, publisher: e.target.value })} />
                        <TextField label='City' fullWidth size='small' name='cityPublished' variant='outlined' style={{ marginBottom: 5 }} value={bookDetails.cityPublished} onChange={(e) => setbookDetails({ ...bookDetails, cityPublished: e.target.value })} />
                    </Container>
                    <Container style={{ width: '100%',  display: 'flex', flexDirection: 'column' }}>
                    
                        <TextField label='Volume' fullWidth size='small' name='volume' variant='outlined' style={{ marginBottom: 5 }} value={bookDetails.volume} onChange={(e) => setbookDetails({ ...bookDetails, volume: e.target.value })} />
                        <TextField label='Pages' fullWidth size='small' name='noOfPages' variant='outlined' style={{ marginBottom: 5 }} value={bookDetails.noOfPages} onChange={(e) => setbookDetails({ ...bookDetails, noOfPages: e.target.value })} />
                        <TextField label='Discipline' fullWidth size='small' name='discipline' variant='outlined' style={{ marginBottom: 5 }} value={bookDetails.discipline} onChange={(e) => setbookDetails({ ...bookDetails, discipline: e.target.value })} />
                        <TextField label='Category' fullWidth size='small' name='category' variant='outlined' style={{ marginBottom: 5 }} value={bookDetails.category} onChange={(e) => setbookDetails({ ...bookDetails, category: e.target.value })} />
                        <TextField label='Subject' fullWidth size='small' name='subject' variant='outlined' style={{ marginBottom: 5 }} value={bookDetails.subject} onChange={(e) => setbookDetails({ ...bookDetails, subject: e.target.value })} />
                        <TextField label='Tags(separate with comma)' fullWidth size='small' name='tags' variant='outlined' style={{ marginBottom: 5 }} value={bookDetails.tags} onChange={(e) => {
                            const realTags = createList(e.target.value.trim());
                            setbookDetails({ ...bookDetails, tags: realTags })
                        }} />
                    </Container>
                </Container>
                <div style={{ marginBottom: 10, textAlign: 'center' }}>
                    <p>Choose Cover Image</p>
                    <FileBase type='file' multiple={false} onDone={({ base64 }) => setbookDetails({ ...bookDetails, coverImage: base64 })} />
                </div>
                <TextField label='Preview' fullWidth size='small' name='preview' type='text' multiline='true' style={{ marginBottom: 5 }} value={bookDetails.preview} onChange={(e) => setbookDetails({ ...bookDetails, preview: e.target.value })} />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: '10px' }}>
                    <Button color='primary' variant='contained' onClick={e => {
                        e.preventDefault();
                        onSubmit();
                        setBook(bookDetails)
                        setDraw('details');
                    }} >Save</Button>
                    <Button color='primary' variant='outlined' onClick={e => {
                        e.preventDefault();
                        setDraw('details')
                    }}>Cancel</Button>
                </div>
            </form>
        </Paper>
    );
};


const ShowUsers = ({users}) => {
    return (
        <div>
            <h3>LIBRARY USERS TABLE</h3>
            {users?.map(user =>
                <div key={user.index}>
                    <div>{user.userEmail}, {user.firstName} {user.lastName}</div>
                    <hr/>
                </div>
            )}
        </div>
    )
}