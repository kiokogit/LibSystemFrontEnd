import { Book } from "../Book/Book";

export const Books = ({books, cartButton, borrowButton}) => {


    return (
        <div >
            <div style={{ display: 'flex', flexDirection: 'row', height:250}}>
                {books.map((book) => (
                    <div key={book._id} >
                        <Book books={book} cartButton={cartButton} borrowButton={borrowButton}/>
                        </div>))}
            </div>
        </div>
    );
};
