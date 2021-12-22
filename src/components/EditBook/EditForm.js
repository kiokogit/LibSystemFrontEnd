import { Button, Paper, TextField, Typography, Container } from '@material-ui/core';
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
            <form type='submit' onSubmit={onSubmit} style={{ width: '95%', textAlign: 'center', display: 'flex', flexDirection: 'column' }} >
                <Typography variant='h6' style={{ fontFamily: 'Courier' }}>
                    Book Details
                </Typography>
                <Container style={{ width: '95%', textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
                    <Container style={{ width: '95%', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                    
                        <TextField label='Title' fullWidth size='small' name='title' variant='outlined' style={{ margin: 10 }} value={bookDetails.title} onChange={(e) => setbookDetails({ ...bookDetails, title: e.target.value })} />
                        <TextField label='Author' fullWidth size='small' name='author' variant='outlined' style={{ margin: 10 }} value={bookDetails.author} onChange={(e) => setbookDetails({ ...bookDetails, author: e.target.value })} />
                        <TextField label='Editors' fullWidth size='small' name='editors' variant='outlined' style={{ margin: 10 }} value={bookDetails.editors} onChange={(e) => {
                            const editors = createList(e.target.value.trim())
                            setbookDetails({ ...bookDetails, editors: editors })
                        }} />
                        <TextField label='Edition' fullWidth size='small' name='edition' variant='outlined' style={{ margin: 10 }} value={bookDetails.edition} onChange={(e) => setbookDetails({ ...bookDetails, edition: e.target.value })} />
                        <TextField label='Year Published' fullWidth size='small' name='yearOfPublication' variant='outlined' style={{ margin: 10 }} value={bookDetails.yearOfPublication} onChange={(e) => setbookDetails({ ...bookDetails, yearOfPublication: e.target.value })} />
                        <TextField label='Publisher' fullWidth size='small' name='publisher' variant='outlined' style={{ margin: 10 }} value={bookDetails.publisher} onChange={(e) => setbookDetails({ ...bookDetails, publisher: e.target.value })} />
                        <TextField label='City' fullWidth size='small' name='cityPublished' variant='outlined' style={{ margin: 10 }} value={bookDetails.cityPublished} onChange={(e) => setbookDetails({ ...bookDetails, cityPublished: e.target.value })} />
                    </Container>
                    <Container style={{ width: '95%', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                    
                        <TextField label='Volume' fullWidth size='small' name='volume' variant='outlined' style={{ margin: 10 }} value={bookDetails.volume} onChange={(e) => setbookDetails({ ...bookDetails, volume: e.target.value })} />
                        <TextField label='Pages' fullWidth size='small' name='noOfPages' variant='outlined' style={{ margin: 10 }} value={bookDetails.noOfPages} onChange={(e) => setbookDetails({ ...bookDetails, noOfPages: e.target.value })} />
                        <TextField label='Discipline, eg Languages' fullWidth size='small' name='discipline' variant='outlined' style={{ margin: 10 }} value={bookDetails.discipline} onChange={(e) => setbookDetails({ ...bookDetails, discipline: e.target.value })} />
                        <TextField label='Category, eg school book, fiction' fullWidth size='small' name='category' variant='outlined' style={{ margin: 10 }} value={bookDetails.category} onChange={(e) => setbookDetails({ ...bookDetails, category: e.target.value })} />
                        <TextField label='Subject, eg English, Sociology' fullWidth size='small' name='subject' variant='outlined' style={{ margin: 10 }} value={bookDetails.subject} onChange={(e) => setbookDetails({ ...bookDetails, subject: e.target.value })} />
                        <TextField label='Preview' fullWidth size='small' name='preview' variant='outlined' style={{ margin: 10 }} value={bookDetails.preview} onChange={(e) => setbookDetails({ ...bookDetails, preview: e.target.value })} />
                        <TextField label='Tags (separate with comma)' fullWidth size='small' name='tags' variant='outlined' style={{ margin: 10 }} value={bookDetails.tags} onChange={(e) => {
                            const realTags = createList(e.target.value.trim());
                            setbookDetails({ ...bookDetails, tags: realTags })
                        }} />
                    </Container>
                </Container>
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
