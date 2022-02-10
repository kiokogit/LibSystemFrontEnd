import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";
import moment from 'moment';

import { IconButton, Grid, TextField, Button, Input } from "@material-ui/core";
import { AccountCircle, ShoppingCart, AddShoppingCart, Menu as MenuIcon, Edit, Home, Lock} from "@material-ui/icons";
import { Container, Badge, AppBar, Avatar } from "@mui/material";

import { getUserDetails } from "../../actions/adminActions/adminActions";
import { getComments, submitComment, addBookToCart, cancelBookRequest, editProfile, logOut, removeFromCart, sendBorrowRequest, getUserBorrowedBks, getUserBookRequests, getUserBooksInCart } from "../../actions/userActions/userActions";
import { getBooks } from "../../actions/adminActions/otherActions/actions";

import { editBookDetails } from "../../actions/adminActions/adminActions";

//Styles css
import './dashStyles/userstyles.css';
//userdashboard
export const UserDashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //fetch user details
  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  //fetch library
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  //fetch borrowed books - stored in state.list1
  useEffect(() => {
    dispatch(getUserBorrowedBks());
  }, [dispatch]);

  //fetch pending requests - stored in state.list2
  useEffect(()=>{
    dispatch(getUserBookRequests());
  }, [dispatch]);

  //fetch booksincart
  useEffect(() => {
    dispatch(getUserBooksInCart())
  }, [dispatch]);

  //get all comments
  useEffect(() => {
    dispatch(getComments())
  }, [dispatch]);

  //fetch states in store
  const user = useSelector(state => state.user);
  const books = useSelector(state => state.books);
  const pending = useSelector(state => state.pending);
  const borrowedBooks = useSelector(state => state.borrowed);
  const inCart = useSelector(state => state.incart);
  const allComments = useSelector(state => state.comments);
  
  //create state to shift through windows
  const [window, setWindow] = useState("home");

  //filter out the borrowed unreturned books
  const unreturnedBooks = borrowedBooks?.filter(book => book.returned === false);

  //to show a badge for late books alerts
  const filteredBorrowed = borrowedBooks?.filter(book => (new Date(book.dateToReturn).getTime() < (new Date().getTime())) && (book.returned === false));

  //EVENT HANDLERS: WITH EACH HANDLER, REFRESH USER DETAILS
  //handle Logout
  const logOutuser = (e) => {
    e.preventDefault();
    dispatch(logOut(navigate));
  };

  //handle Borrow Request
  const handleBorrow = (e, toBorrow) => {
    e.preventDefault();
    dispatch(sendBorrowRequest(toBorrow));
    dispatch(getUserBookRequests());
  };

  //handle cancel borrow
  const handleCancelBorrow = (e, toCancel) => {
    e.preventDefault();
    dispatch(cancelBookRequest(toCancel));
    dispatch(getUserBookRequests());
  };

  //handle add to Cart
  const handleAddToCart = (e, bookId) => {
    e.preventDefault();
    dispatch(addBookToCart(bookId));
    dispatch(getUserBooksInCart())
  };

  //handle Remove from cart
  const handleRemoveFromCart = (e, bookId) => {
    e.preventDefault();
    dispatch(removeFromCart(bookId));
    dispatch(getUserBooksInCart())
  };

  const [searchFilter, setSearchFilter] = useState(books);

  //triggered while searching
  const search = (value) => {
    if (value === null || value === '') {
      setSearchFilter(books);
    } else {
      const filter = books?.filter((book) =>
        book.title?.toLowerCase().includes(value.toLowerCase()) || book.author?.toLowerCase().includes(value.toLowerCase()) || book.subject?.toLowerCase().includes(value.toLowerCase()) || book.tags?.filter(tag => tag).includes(value)
      );
      setSearchFilter(filter);
    }
  };
  

  //create and handle Book Comments and reviews
  //comment object has: UserNames, book Id, commentBody, commentTime
  const handleComment = (comment) => {
    dispatch(submitComment(comment));
    dispatch(getComments);
  };

  //Handle book views - the number of times the book is clicked to sort books
  const handleViews = (edited) => {
    dispatch(editBookDetails(edited));
  };

  //Handle show comments(filter per book clicked);
  const bookComments = (bookId) => {
    const comments = allComments?.filter(comment => comment.book.id === bookId);     //comment.book is the Id of the book
    return comments;
  };

  return (
    <div>
      <AppBar style={{ display: "grid", gridTemplateColumns: '1fr 3fr 2fr', backgroundColor:'grey' }}>
        <div>
          <div class="dropdown">
            <div class="dropbtn">
              <MenuIcon />
              </div>
            <div class="dropdown-content">
              <button onClick={(e) => {
                e.preventDefault();
                setWindow("home");
              }}>Home</button>
              <hr/>
              <button onClick={(e) => {
              e.preventDefault();
              setWindow("cart");
            }}>My Store</button>
              <button  onClick={(e) => {
                e.preventDefault();
                setWindow("profile");
              }}>My Profile</button>
            </div>
          </div>
          <button style={{marginLeft:'15px', border:'none', backgroundColor:'transparent'}} onClick={(e) => {
            e.preventDefault();
            setWindow("home");
          }}>
            <Home style={{color:'white'}}/>
          </button>
        </div>
        <div>
          <TextField id="searchBar" variant='outlined' size='small' placeholder='Search Books by Author, Subject or Title here...' style={{ backgroundColor: 'white', borderRadius: '4px', width: 400, marginTop: '7.5px' }} onChange={(e) => {
            e.preventDefault();
            setWindow('home');
            search(e.target.value)
          }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <div  class='dropdown'>
            <div class='dropbtn'>
              <Badge badgeContent={unreturnedBooks?.length} color="success">
                <ShoppingCart />
              </Badge>
            </div>
            <div class='dropdown-content'>
              <button onClick={(e) => {
                e.preventDefault();
                setWindow('cart')
              }}>My Store</button>
            </div>
          </div>
          <div class="dropdown" >
            {user.firstName} {user.lastName}
            <IconButton className="dropbtn">
              <Badge badgeContent={window === 'profile' ? null : filteredBorrowed?.length} color="error">
                {user.profilePhoto ? (<img style={{ width: 30, height: 30, borderRadius: '50%' }} src={user.profilePhoto} alt='img'></img>) : <AccountCircle />}
              </Badge>
            </IconButton>
            <div class="dropdown-content">
              <button  onClick={(e) => {
                e.preventDefault();
                setWindow("profile");
              }}> {user.profilePhoto ? (<img style={{ marginRight:10,width: 20, height: 20, borderRadius: '50%' }} src={user.profilePhoto} alt='img'></img>) : <AccountCircle />}Account</button>
              <button onClick={(e) => logOutuser(e)}> <Lock/> Logout</button>
            </div>
          </div>
        </div>
      </AppBar>
      <div style={{ marginTop: "75px" }}>
        {window === "home" && (<Landing bookComments={bookComments} inCart={inCart} pending={pending} borrowedBooks={borrowedBooks} handleViews={handleViews} user={user} books={books} search={search} handleComment={handleComment} handleBorrow={handleBorrow} handleAddToCart={handleAddToCart} searchFilter={searchFilter} setSearchFilter={setSearchFilter} />)}
        {window === "profile" && <Profile inCart={inCart} pending={pending} borrowed={borrowedBooks} user={user} />}
        {window === "cart" && (<Cart inCart={inCart} pending={pending} borrowedBooks={borrowedBooks} user={user} handleBorrow={handleBorrow} handleCancelBorrow={handleCancelBorrow} handleRemoveFromCart={handleRemoveFromCart} />)}
      </div>
    </div>
  );
};

//User's Homepage
const Landing = ({pending, inCart, bookComments, handleViews, books, user, handleComment, handleBorrow, handleAddToCart, search, searchFilter }) => {

  //check if book in cart already
  const checkInCart = (bookId) => {
    const found = inCart?.filter((book) => book.id === bookId);
    if (found?.length > 0) {
      return "Book is Already in Cart";
    }
  };

  //check if book already borrowed, and create alert
  //On submit, the method first checks if checkBorrowed returns anything
  const checkBorrowed = (bookId) => {
    const borrowed = user.booksBorrowed?.filter(
      (book) => book.returned === false
    );
    const found = pending?.filter((book) => book.book.id === bookId);
    const found2 = borrowed?.filter((book) => book.book.id === bookId);
    if (found?.length > 0) {
      return "This book is being processed for you already";
    } else if (found2?.length > 0) {
      return "System: You Have This Book With You.. Check Again";
    } else {
      return;
    }
  };

  //SORT BOOKS
  const sortedFiltered = searchFilter?.sort((x,y)=>+(y.views)-+(x.views))
  
  //set Select a book, and set initial as the first book in the list on load
  const [book, setBook] = useState(null);

  return (
    <div style={{ margin:'auto', overflowY:'hidden' }}>
      <h3>LIBRARY</h3>
      <hr/>
      <Container style={{ margin: "10px 0 0 0", width: "100%", display: "grid", gridTemplateColumns: "1fr 3fr 2fr" }}>
        <Container name="leftbar" style={{ borderRight: "1px solid" }}>
          <h4>Browse</h4>
          <hr />
          <div>Filter Books by:</div>
          <Button fullWidth onClick={(e) => {
            e.preventDefault();
            document.getElementById('searchBar').value = '';
            search('')
          }} >All ({ books?.length})</Button>
          <hr />
          <div>Advanced Search</div>
        </Container>
        <Container name="centerbar" style={{ display: "flex", flexDirection: "column", overflowY:'scroll' }}>
          <Grid container>
            {!sortedFiltered?.length > 0 ? "No Matching Results" : sortedFiltered.map((book) => (
              <Container key={book.id} style={{ display: "flex", flexDirection: "column", fontSize: "0.75rem", borderBottom: "solid 1px", padding: "5px", textAlign: "left", width: "100%", cursor: "pointer", }} onClick={(e) => {
                e.preventDefault();
                /*ON click, set view of the book to +1 */
                const currentViews = book.views++;
                const toEdit = { ...book, views: currentViews };
                handleViews(toEdit);
                setBook(book);
              }}>
                <div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <img src={book.coverImage} alt="img" style={{ width: "40px", height: "50px", margin: "3px" }} />
                    <div>
                      <p>{book.title}</p>
                      <p>Author: {book.author}.{book.noOfPages}pgs</p>
                    </div>
                  </div>
                </div>
              </Container>
            ))}
          </Grid>
        </Container>
        <Container name="rightbar" style={{ borderLeft: "1px solid", overflowY:'scroll'}}>
          {!book ? 'Select a Book to See Details / review / comment' : (
            <div style={{ width: "100%", justifyContent: "left" }}>
              <div>
                <h3>Book details</h3>
                <h4>{book.title}</h4>
                <div style={{ display: "flex", flexDirection: "column", }}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
                    <div>
                      <img src={book.coverImage} style={{ width: "200px", height: "300px", margin: "3px" }} alt="bookCover" />
                    </div>
                    <div
                      style={{ textAlign: "left", wordWrap: "break-word", hyphens: "auto", }}>
                      <p>Author: {book.author}</p>
                      <p>Subject: {book.subject}</p>
                      <p>Edition: {book.edition}</p>
                      <p>Size: {book.noOfPages} pages</p>
                    </div>
                    <div>
                    </div>
                  </div>
                  <p>Preview: {book.preview}</p>
                  <p>Tags: {book.tags?.map((tag) => <button key={tag.index} onClick={e => {
                    e.preventDefault();
                    document.getElementById('searchBar').value = `#${tag}`;
                    search(tag)
                  }}>#{tag}</button>)}</p>
                  <div>
                    <div>
                    <Button variant='outlined' onClick={(e) => {
                      e.preventDefault();
                      const toBorrow = { bookId: book.id };
                      if (checkBorrowed(book.id)) {
                        alert(checkBorrowed(book.id));
                        return;
                      } else {
                        handleBorrow(e, toBorrow);
                        alert("Sending Borrow request");
                      }
                    }}>
                    Borrow
                  </Button>
                  <Button variant='outlined' onClick={(e) => {
                      e.preventDefault();
                      if (checkInCart(book.id)) {
                        alert(checkInCart(book.id));
                        return;
                      } else {
                        handleAddToCart(e, book.id);
                        alert("Adding to Cart");
                      }
                    }}>
                    <AddShoppingCart />
                  </Button>
                    </div>
                    {/* <Visibility /> {book.views ? book.views : 0} */}
                    </div>
                  <div>
                    <h4>Comments</h4>
                    <hr />
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>Leave a review/Comment
                      <Button onClick={(e) => {
                        e.preventDefault();
                        console.log(book.id)
                        const newComment = {
                          book:book.id,
                          body: document.getElementById('comment').value
                        };
                        handleComment(newComment);
                        document.getElementById('comment').value = ''
                      }}>Submit</Button>
                    </div>
                    <p></p>
                    <textarea style={{ width: '95%', fontFamily: 'inherit', fontSize:'1rem', color: 'black', border: 'none', borderBottom: 'solid black 2px' }} type="text" id="comment" placeholder="Comment..." />
                    <p>Previous Comments {bookComments(book.id)?.length}</p>
                    {bookComments(book.id)?.map(comment =>
                      <div style={{ mrginLeft: '30px', paddingBottom: '10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {comment.by.profilePhoto ? (<img style={{ width: 30, height: 30, borderRadius: '50%', marginRight: '10px' }} src={comment.by.profilePhoto} alt='img'/>) : <AccountCircle />}
                            <div>{comment.by.firstName}
                              <div style={{ fontStyle: 'italic', fontSize: '0.7rem' }}>{moment(comment.date).fromNow()}</div>
                            </div>
                          </div>
                          <div>
                            {/*Like comment and share */}
                            {user.id === comment.by.id ? <Button type='text'>Share</Button> : (<div><Button type='text'>Like</Button><Button type='text'>Share</Button></div>)}
                          </div>
                        </div>
                        <div>{comment.body}</div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Container>
    </div>
  );
};

//function to calculate fines
const fines = (date2, date1) => {
    const FINES_AMOUNT_PER_DAY = 10;
    const fine =
      Math.floor((date2.getTime() - date1.getTime()) / (3600 * 24 * 1000)) *
      FINES_AMOUNT_PER_DAY;
    return fine;
  };

  //profile component: editing, mesages, notifications/alerts
const Profile = ({ user, inCart, pending, borrowed }) => {
  const dispatch = useDispatch();
  const [noEdit, setNoEdit] = useState(true); //onclick edit

  const [edited, setEdited] = useState(user);
  const [changePass, setChangePass] = useState(false)

  //Edit profile submit
  const handleSubmit = (e) => {
    if (passWarning) {
      alert('Correct form errors')
      return
    } else {
      if (window.confirm("Submit Profile changes?")) {
        dispatch(editProfile(edited));
      } else alert("Not Saved");
      setNoEdit(true);
    };
  };

  //Edit User Details, and delete etc
  const editingFunc = (e, changed) => {
    e.preventDefault();
    dispatch(editProfile(changed))
  };

  const [expand, setExpand] = useState({
    id: null,
    state: false
  });

  //Filter Books with fines for alerts
  const filteredBorrowed = user.booksBorrowed?.filter(book => (new Date(book.dateToReturn).getTime() < (new Date().getTime())) && (book.returned === false));

  //SORT
  //sorted notifications according to timestamp
  const sortedNotifications = user.notifications?.sort((x, y) => + new Date(y.time) - + new Date(x.time))
  const sortedMessages = user.messages?.sort((x, y) => + new Date(y.time) - + new Date(x.time))
  //to show more
  const [moreNotes, setMoreNotes] = useState(3)

  //to show more messages
  const [moreMsg, setMoreMsg] = useState(3)

  //Editing form warnings
  const [passWarning, setPassWarning] = useState(null)

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Account</h2>
      <hr />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr' }}>
        <div id="inbox" style={{ padding: '0 20px 0 20px' }}>
          <h3>Inbox</h3>
          <div id='messages'>
            <h4>Messages {user.messages?.length}</h4>
            {sortedMessages?.slice(0, moreMsg).map(message =>
              <div key={message.id} onMouseOver={(e) => setExpand({ id: message.id, state: true })}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>{message.sender} {expand.id === message.id ? <button onClick={e => {
                  const remaining = user.messages.filter((msg) => msg.id !== message.id)
                  editingFunc(e, { ...edited, messages: remaining })
                }}>x</button> : null}</div>
                <div>{(expand.id === message.id && expand.state) ? message.body : (`${message.body.substring(0, 70)}...`)}</div>
                <div style={{ color: "grey", fontSize: "0.75rem", textAlign: "right" }}>{moment(new Date(message.time).toLocaleString()).fromNow()}</div>
                <hr />
              </div>
            )}
            <Button fullWidth onClick={e => {
              e.preventDefault();
              if (moreMsg === 100) setMoreMsg(3)
              else setMoreMsg(100)
            }}>{moreMsg === 100 ? 'SHOW LESS' : 'SHOW MORE'}</Button>
            <hr />
          </div>
          <div id='notifications'><h4>Notifications {user.notifications?.length}</h4>
            {sortedNotifications?.slice(0, moreNotes).map(note =>
              <div key={note.id} onMouseOver={(e) => setExpand({ id: note.id, state: true })}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontStyle: 'italic' }}>{note.sender} {expand.id === note.id ? <button onClick={e => {
                  const remaining = user.notifications.filter((msg) => msg.id !== note.id)
                  editingFunc(e, { ...edited, notifications: remaining })
                }}>x</button> : null}</div>
                <div onMouseOut={e => setExpand({ id: null, state: false })}>{(expand.id === note.id && expand.state) ? note.body : (`${note.body.substring(0, 70)}...`)}</div>
                <div style={{ color: "grey", fontSize: "0.75rem", textAlign: "right" }}>{moment(new Date(note.time).toLocaleString()).fromNow()}</div>
                <hr />
              </div>
            )}
            <Button fullWidth onClick={e => {
              e.preventDefault();
              if (moreNotes === 100) setMoreNotes(3)
              else setMoreNotes(100)
            }}>{moreNotes === 100 ? 'SHOW LESS' : 'SHOW MORE'}</Button>
            <hr />
          </div>
        </div>
        <Container id='personal-settings'>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <h3>Profile</h3>
            <div>
              <Button variant='text' onClick={e => {
                e.preventDefault();
                if (noEdit) setNoEdit(false)
                else handleSubmit(e)
              }}>{noEdit ? (<Edit />) : 'Submit'}</Button>
              {noEdit ? null : <Button onClick={(e) => setNoEdit(true)}>Cancel</Button>}
            </div>
          </div>
          {noEdit ? (
            <div>
              <div style={{ textAlign: 'center' }}>
                <div>
                  {user.profilePhoto ? (<img style={{ width: 100, height: 100, borderRadius: '50%' }} src={user.profilePhoto} alt='img'></img>) : <Avatar style={{ width: 100, height: 100, margin: 'auto' }} />}
                </div>
                <div>
                  <h3>{user.firstName} {user.lastName}</h3>
                </div>
                <h5>About</h5>
                <p>{user.bio}</p>
              </div>
              <hr />
              <h5>Personal Details</h5>
              <div> <p> Gender: {user?.gender}</p></div>
              <div> <p> Phone Number: {user?.userPhone}</p></div>
              <div> <p> Email: {user?.userEmail}</p></div>
              <div> <p> Date of Birth: {new Date(user?.dateOfBirth).toLocaleDateString()}</p></div>
              <div> <p> Residential Address: {user?.userAddress?.town} Town in {user?.userAddress?.county} County, {user?.userAddress?.country}</p></div>
              <hr />
              <h5>Statistics</h5>
              <div><p>Pending Orders Placed: {pending?.length}</p></div>
              <div><p>Saved Books in Cart: {inCart?.length}</p></div>
              <div><p>Borrowed Books(history): {borrowed?.length}</p></div>
            </div>
          ) : (
            <form style={{ paddingLeft: '30px', paddingRight: '30px' }}>
              <div style={{ marginBottom: 10, textAlign: 'center' }}>
                <div>
                  {user.profilePhoto ? (<div><img style={{ width: 100, height: 100, borderRadius: '50%' }} src={user.profilePhoto} alt='img'></img>
                    <button onClick={e => {
                      e.preventDefault();
                      if (window.confirm('Remove photo? This action is not reversible')) {
                        setEdited({ ...edited, profilePhoto: '' })
                        dispatch(editProfile(edited))
                      }
                      else return
                    }}>Remove Photo</button></div>
                  ) : <Avatar style={{ width: 100, height: 100, margin: 'auto' }} />}
                </div>
                <h3>{user.firstName} {user.lastName}</h3>
                <p></p>
                Upload Profile Photo
                <FileBase type='file' multiple={false} onDone={({ base64 }) => setEdited({ ...edited, profilePhoto: base64 })} />
              </div>
              <div><h5>Edit Bio</h5></div>
              <TextField multiline='true' fullWidth value={edited.bio} onChange={e => setEdited({ ...edited, bio: e.target.value })} />
              <hr />
              <h5>Change Personal Details</h5>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>First Name:
                <Input style={{ margin: '10px' }} value={edited.firstName} name="firstName" onChange={(e) => setEdited({ ...edited, firstName: e.target.value })} /> </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}> Last Name:
                <Input style={{ margin: '10px' }} value={edited.lastName} name="lastName" onChange={(e) => setEdited({ ...edited, lastName: e.target.value })} /> </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}> Phone Number:
                <Input style={{ margin: '10px' }} value={edited.userPhone} name="userPhone" onChange={(e) => setEdited({ ...edited, userPhone: e.target.value })} /> </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}> Gender:
                <Input style={{ margin: '10px' }} value={edited.gender} name="gender" onChange={(e) => setEdited({ ...edited, gender: e.target.value })} /> </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}> Date Of Birth:
                <Input style={{ margin: '10px' }} type='date' value={edited.dateOfBirth} name="dateOfBirth" onChange={(e) => setEdited({ ...edited, dateOfBirth: e.target.value })} /> </div>
              <div>
                <hr />
                <h5>Change Residential Address</h5>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}> Country:
                  <Input style={{ margin: '10px' }} name="address" value={edited.userAddress?.country} onChange={(e) => setEdited({ ...edited, userAddress: { ...edited.userAddress, country: e.target.value } })} /></div></div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}> County:
                <Input style={{ margin: '10px' }} name="address" value={edited.userAddress?.county} onChange={(e) => setEdited({ ...edited, userAddress: { ...edited.userAddress, county: e.target.value } })} /> </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}> Town:
                <Input style={{ margin: '10px' }} name="address" value={edited.userAddress?.town} onChange={(e) => setEdited({ ...edited, userAddress: { ...edited.userAddress, town: e.target.value } })} /> </div>
              <hr />
                <h5>Change Password</h5>
                <Button variant="text" style={{ width: '2rem', height: '1rem' }} onClick={(e) => {
                  e.preventDefault();
                  setChangePass(!changePass);
                }}>{changePass ? 'Submit' : <Edit />}</Button>
                {changePass ? (<div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}> Enter New Password:
                <Input style={{ margin: '10px' }} name="address" placeholder='New Password' onChange={(e) => setEdited({ ...edited, userPassword: e.target.value })} /> </div>
              <div>{passWarning}</div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}> Enter New Password Again:
                <Input style={{ margin: '10px' }} name="address" placeholder='New Password' onChange={(e) => {
                  if (edited.userPassword !== e.target.value) {
                    setPassWarning('Passwords do Not Match')
                  } else setPassWarning(null)
                }} /> </div></div>) : 'Click to change password'}
              <hr />
              <hr />
              <h5>Delete Account</h5>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}> Confirm Your Password:
                <Input placeholder='Enter Password'/>
                  <button onClick={e => {
                    
                }}>Delete</button>
              </div>
            </form>
          )}
        </Container>
        <div id="recent-activity">
          <h3>Notice Board</h3>
          <div><h4>{filteredBorrowed?.length > 1 ? (<Badge badgeContent={filteredBorrowed?.length} color='error'> You Have Accumulated Fines</Badge>) : null}</h4></div>
          {filteredBorrowed?.map(book =>
            <div>
              <h5>{book.bookId.title}</h5>
              <div style={{ display: 'grid', gridTemplateColumns: '0.25fr 1fr' }}>
                <img style={{ width: "40px", height: "50px", margin: "3px" }} src={book.bookId?.coverImage} alt='bookCover' />
                <div>
                  <div>Date Expected: {moment(book.dateToReturn).fromNow()} </div>
                  <div style={{ color: 'red' }}> Fines Accumulated:   {fines(new Date(), new Date(book.dateToReturn)) < 1 ? `KES 0.00` : `KES ${fines(new Date(), new Date(book.dateToReturn))}`} </div>
                </div>
              </div>
            </div>)}
          <hr />
        </div>
      </div>
    </div>
  );
};

//the store
const Cart = ({user, inCart, handleBorrow, handleCancelBorrow, handleRemoveFromCart,booksBorrowed,pending}) => {
  //lists
  const borrowed = booksBorrowed?.filter((book) => book.returned === false);
  const borrowHistory = booksBorrowed;

  //check if book already borrowed, and create alert
  //On submit, the method first checks if checkBorrowed returns anything
  const checkBorrowed = (bookId) => {
    const found = pending?.filter((book) => book.bookId.id === bookId);
    const found2 = borrowed?.filter((book) => book.bookId.id === bookId);
    if (found?.length > 0) {
      return "This book is being processed for you already";
    } else if (found2?.length > 0) {
      return "System: You Have This Book With You.. Check Again";
    } else {
      return;
    }
  };


  return (
    <div>
      <h3>My Store - {user.firstName} {user.lastName}</h3>
      <Container align="left" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", }}>
        <Container>
          In Cart
          <Grid container>
            {!inCart? "Data Not Available": inCart.length < 1 ? "No Books In Cart" : inCart.map((saved) => (
                  <Container key={saved.id} style={{display: "flex",flexDirection: "column",fontSize: "0.75rem",borderBottom: "solid 1px",padding: "5px",textAlign: "left", width: "100%", cursor: "pointer"}}>
                    <div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <img src={saved.book.coverImage} alt="img" style={{ width: "40px", height: "50px", margin: "3px" }}/>
                        <div>
                          <p>{saved.book.title}</p>
                          <p>Author: {saved.book.author}.{saved.book.noOfPages}pgs </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button onClick={(e) => {
                          e.preventDefault();
                          const toBorrow = { bookId: saved.book.id };
                          if (checkBorrowed(saved.book.id)) {
                            alert(checkBorrowed(saved.book.id));
                            return;
                          } else {
                            handleBorrow(e, toBorrow);
                            alert("Sending Request");
                          }}}>
                        Borrow
                      </button>
                      <button onClick={(e) => {
                          handleRemoveFromCart(e, saved.id);
                        }}>
                        Remove
                      </button>
                    </div>
                  </Container>
                ))}
          </Grid>
        </Container>
        <Container>
          Pending Requests
          <Grid container>
            {!pending? "Data not Available": pending.length < 1? "no Pending Requests": pending.map((req) => (
                  <Container key={req.id} style={{ display: "flex", flexDirection: "column", fontSize: "0.75rem", borderBottom: "solid 1px", padding: "5px", textAlign: "left", width: "100%",cursor: "pointer",
                    }}>
                    <div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <img src={req.book.coverImage} alt="img" style={{ width: "40px", height: "50px", margin: "3px" }}/>
                        <div>
                          <p>{req.book.title}</p>
                          <p>Author: {req.book.author}.{req.book.noOfPages} pgs
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={(e) => {
                          handleCancelBorrow(e, req.id);
                        }}>
                        Cancel
                      </button>
                    </div>
                  </Container>
                ))}
          </Grid>
        </Container>
        <Container>
          Boorrowed Books
          <Grid container>
            {!borrowed ? "Data Not Available" : borrowed.length < 1 ? "no Pending Requests" : borrowed.map((book) => (
              <Container
                key={book.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "0.75rem",
                  borderBottom: "solid 1px",
                  padding: "5px",
                  textAlign: "left",
                  width: "100%",
                  cursor: "pointer",
                }}>
                <div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <img
                      src={book.book.coverImage}
                      alt="img"
                      style={{ width: "40px", height: "50px", margin: "3px" }}
                    />
                    <div>
                      <p>{book.book.title}</p>
                      <p> Author: {book.book.author}</p>
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
                  <div>
                    Fines Accumulated:   {fines(new Date(), new Date(book.dateToReturn)) < 1 ? `KES 0.00` : `KES ${fines(new Date(), new Date(book.dateToReturn))}`}{" "}
                  </div>
                </div>
              </Container>
            ))}
          </Grid>
        </Container>
        <Container>
          Boorrowing History
          <Grid container>
            {!borrowHistory
              ? "Data Not Available"
              : borrowHistory.length < 1
                ? "no Pending Requests"
                : borrowHistory.map((book) => (
                  <Container
                    key={book.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      fontSize: "0.75rem",
                      borderBottom: "solid 1px",
                      padding: "5px",
                      textAlign: "left",
                      width: "100%",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <img
                          src={book.book.coverImage}
                          alt="img"
                          style={{ width: "40px", height: "50px", margin: "3px" }}
                        />
                        <div>
                          <p>{book.book.title}</p>
                          <p> Author: {book.book.author}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        Date Borrowed:{" "}
                        {new Date(book.dateBorrowed).toLocaleDateString()}
                      </div>
                      <div>
                        Date Expected:{" "}
                        {new Date(book.dateToReturn).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      Date Returned:
                      {book.returned
                        ? new Date(book.dateReturned).toLocaleDateString()
                        : " Not Yet"}
                    </div>
                  </Container>
                ))}
          </Grid>
        </Container>
      </Container>
    </div>
  );
};
