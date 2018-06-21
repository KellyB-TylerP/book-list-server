'use strict';

//Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');

// Setup

const app = express();
const PORT = process.env.PORT;


const client = new pg.Client(process.env.DATABASE_URL);


client.connect();
client.on('error', err => console.log(err));

//Middleware
app.use(cors());

// Endpoints
app.get('/api/v1/books', (req, res) => {
    console.log('These are not the droids you\'re looking for... However it is the response you\'re looking for')
    let SQL = `SELECT * FROM books;`;
    client.query(SQL)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

//.git for limited info
app.get('/api/v1/books-limited', (req, res) => {
    console.log('limited request')
    let SQL = `
        SELECT book_id, title, author, image_url FROM books;
        `;
    client.query(SQL)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

//Inserting placeholder values
app.post('/api/v1/books', (req, res) => {
    let SQL = `INSERT INTO books_app(book_id, title, author, isbn, image_url, description)
    VALUES ($1, $2, $3, $4, $5, $6);`;


    let values = [
        req.params.id,
        req.body.title,
        req.body.author,
        req.body.isbn,
        req.body.image_url,
        req.body.description
    ];

    client.query(SQL, values)
        .then(function () {
        res.send('insert completed')
        })
        .catch(function (err) {
            console.error(err);
    })
})


app.get('/api/v1/books:id', (req, res) => {
    console.log(req);
    let SQL = `
        SELECT * FROM books WHERE book_id=$1;
        `;
    

    client.query(SQL)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('*', (req, res) => res.status(404).send('rip'));

app.listen(PORT, () => console.log(`The server is listening on PORT: ${PORT}`));




