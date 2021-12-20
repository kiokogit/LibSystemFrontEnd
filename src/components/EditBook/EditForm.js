import { Button, Paper, TextField, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';
import React, { useState} from 'react';
import { useDispatch} from 'react-redux';

import { addABook } from '../../actions/adminActions/adminActions';

export const EditForm = () => {

    const [bookDetails, setbookDetails] = useState({
        title: "",
        author: "",
        yearOfPublication: "",
        coverImage: "",
        edition: "",
        volume: "",
        editors: [],
        preview: "",
        cityPublished: "",
        publisher: "",
        noOfPages: "",
        category: "",
        discipline: "",
        subject: "",
        reviews: "",
        tags: [],
    });

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addABook(bookDetails));
        clearForm();
        alert('Book Added to Library');
    };

    //clear form after submit - reset state
    const clearForm = () => {
        setbookDetails({
            title: "",
            author: "",
            yearOfPublication: "",
            coverImage: "",
            edition: "",
            volume: "",
            editors: [],
            preview: "",
            cityPublished: "",
            publisher: "",
            noOfPages: "",
            category: "",
            discipline: "",
            subject: "",
            reviews: "",
            tags: []
        })
    };

    //create tags seperated by commas, for mapping with hashtags
    const createList = (value) => {
        const allTags = value.split(',');
        return allTags
    };

    return (
        <Paper style={{ padding: '10px 10px 10px 10px' }}>
            <form type='submit' onSubmit={onSubmit} style={{ width: '95%', textAlign: 'center' }} >
                <Typography variant='h6' style={{ fontFamily: 'Courier' }}>
                Book Details
                </Typography>
                <TextField label='Title' fullWidth name='title' variant='outlined' style={{ margin: 10 }} value={bookDetails.title} onChange={(e) => setbookDetails({ ...bookDetails, title: e.target.value })} />
                <TextField label='Author' fullWidth name='author' variant='outlined' style={{ margin: 10 }} value={bookDetails.author} onChange={(e) => setbookDetails({ ...bookDetails, author: e.target.value })} />
                <TextField label='Editors' fullWidth name='editors' variant='outlined' style={{ margin: 10 }} value={bookDetails.editors} onChange={(e) => {
                    const editors = createList(e.target.value.trim())
                    setbookDetails({ ...bookDetails, editors: editors })
                }} />
                <TextField label='Edition' fullWidth name='edition' variant='outlined' style={{ margin: 10 }} value={bookDetails.edition} onChange={(e) => setbookDetails({ ...bookDetails, edition: e.target.value })} />
                <TextField label='Year Published' fullWidth name='yearOfPublication' variant='outlined' style={{ margin: 10 }} value={bookDetails.yearPublished} onChange={(e) => setbookDetails({ ...bookDetails, yearPublished: e.target.value })} />
                <TextField label='Publisher' fullWidth name='publisher' variant='outlined' style={{ margin: 10 }} value={bookDetails.publisher} onChange={(e) => setbookDetails({ ...bookDetails, publisher: e.target.value })} />
                <TextField label='City' fullWidth name='cityPublished' variant='outlined' style={{ margin: 10 }} value={bookDetails.cityPublished} onChange={(e) => setbookDetails({ ...bookDetails, cityPublished: e.target.value })} />
                <TextField label='Volume' fullWidth name='volume' variant='outlined' style={{ margin: 10 }} value={bookDetails.volume} onChange={(e) => setbookDetails({ ...bookDetails, volume: e.target.value })} />
                <TextField label='Pages' fullWidth name='noOfPages' variant='outlined' style={{ margin: 10 }} value={bookDetails.noOfPages} onChange={(e) => setbookDetails({ ...bookDetails, noOfPages: e.target.value })} />
                <TextField label='Discipline, eg Languages' fullWidth name='discipline' variant='outlined' style={{ margin: 10 }} value={bookDetails.discipline} onChange={(e) => setbookDetails({ ...bookDetails, discipline: e.target.value })} />
                <TextField label='Category, eg school book, fiction' fullWidth name='category' variant='outlined' style={{ margin: 10 }} value={bookDetails.category} onChange={(e) => setbookDetails({ ...bookDetails, category: e.target.value })} />
                <TextField label='Subject, eg English, Sociology' fullWidth name='subject' variant='outlined' style={{ margin: 10 }} value={bookDetails.subject} onChange={(e) => setbookDetails({ ...bookDetails, subject: e.target.value })} />
                <TextField label='Preview' fullWidth name='preview' variant='outlined' style={{ margin: 10 }} value={bookDetails.preview} onChange={(e) => setbookDetails({ ...bookDetails, preview: e.target.value })} />
                <TextField label='Tags (separate with comma)' fullWidth name='tags' variant='outlined' style={{ margin: 10 }} value={bookDetails.tags} onChange={(e) => {
                    const realTags = createList(e.target.value.trim());
                    setbookDetails({ ...bookDetails, tags: realTags })
                }} />
                <div style={{ marginBottom: 10, textAlign: 'center' }}>
                    <p>Choose Cover Image</p>
                    <FileBase type='file' multiple={false} onDone={({ base64 }) => setbookDetails({ ...bookDetails, coverImage: base64 })} />
                </div>
                <div>
                    <Button type='submit' color='primary' variant='contained'>Add Book to Library</Button>
                </div>
            </form>
            
        </Paper>
    );
};
