import { useSelector } from 'react-redux';
import { Card } from "@material-ui/core";
import { Button } from "@mui/material";
import useStyles from './styles.js'

export const Book = ({ books, cartButton, borrowButton }) => {
    const classes = useStyles();

    const users = useSelector(state => state.users)

    const { borrowedBooks, pendingRequests } = users;               //all data to be in the user model
    //should fetch pending borrow requests for the user, and opt to cancel
    
    //alter books labels - if already borrowed or in pending requests list, button to display 'processing' or 'borrowed'
    const alreadyBorrowed = (bookId) => {
        const exists = pendingRequests.filter((book) => book.bookId._id === bookId)
        const exists2 = borrowedBooks.filter((book) => book.bookId._id === bookId)
        if (exists.length > 0) {
            return 'Borrow Already Borrowed. Borrow Request is Processing';
        }
        else if (exists2.length > 0) {
            return 'Am Sure you have the book with you';
        }
        else return
    };



    return (
        <Card className={classes.Card} style={{ borderRadius: 5, margin: '5px', height: 250, width: 75 }}>
            <div style={{height:115}}>
                <img src={books.coverImage} alt='BookImage' height='1rem' style={{ width: 75, height: 100 }} />
            </div>
            <div>
                <p style={{ fontSize: '0.5rem', height:17 }}>{books.title}</p>
                <p style={{ fontSize: '0.5rem'}}>by:{books.author}</p>
            </div>
            <button onClick={(e) => {
                if (alreadyBorrowed(books._id)) {
                    alert(alreadyBorrowed(books._id))
                    return
                } else {
                    const toBorrow = { bookId: books._id, userId: users._id }
                    borrowButton(e, toBorrow)
                }
            }}
            >Borrow</button>
            <button onClick={(e) => {

                const bookId = books._id;
                const userId = {userId:users._id}
                cartButton(e, bookId, userId)
            }}>Cart</button>
        </Card>
    );
};

export const BookDetails = ({ book, cartButton, borrowButton }) => {
    return (

        <div>
            <div style={{ display: 'flex', flexDirection: 'row', height:250 }}>
                <img src={book.coverImage} alt='Thumbnail' style={{ width: 75, height: 100 }} />
                <div style={{ display: 'inline' }}>
                    <div>
                        {book.title}
                    </div>
                    <div>
                        {book.author}
                    </div>
                    <div>
                        {book.tags.map(tag => `#${tag}`)}
                    </div>
                    <div>
                        {book.noOfPages} pgs
                    </div>
                </div>
                <Button onClick ={(e)=>borrowButton(e,book._id)}>Borrow</Button>
                <Button onClick={(e)=>cartButton(e,book._id)}>Add to Cart</Button>
            </div>
        </div>
    );
};