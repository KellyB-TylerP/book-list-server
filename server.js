'use strict';

//application dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');

//application setup
const app = express();
const PORT = process.env.PORT;

//Database setup
const conString = process.env.DATABASE_URL;
// const conString = 'postgres://localhost:5432/books_app';
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.log(err));

//application middleware
app.use(cors());

//API Endpoints
app.get('/api/v1/books', (req, res) => {
    console.log('OMG i handling a git request by a client');
    let SQL = 'SELECT * FROM books;';
    client.query(SQL)
        .then(results => res.send(results.rows))
        .catch(console.log.error);
});

app.get('*', (req, res) => res.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`The server is alive and well and listening on port ${PORT}`));




