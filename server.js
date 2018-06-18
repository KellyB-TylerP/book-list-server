'use strict';

//application dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');

//application setup
const app = express();
const PORT = process.env.PORT;

//Database setup

//application middleware
app.use(cors());

//API Endpoints
app.get('/api/v1/test', (req, res) => {
    console.log('OMG i have been visited by a client')
    res.send('OMG I am in contact with the server!!!!');
});

app.get('*', (req, res) => res.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`The server is alive and well and listening on port ${PORT}`));


