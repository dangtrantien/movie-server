'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const movieRoutes = require('./routes/movie');

// ==================================================

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res, next) => {
  res.send('Server side');
});

app.use('/api/movies', movieRoutes);

app.get('/404', (req, res, next) => {
  res.status(404).send('Route not found');
});

app.listen(process.env.PORT || 5000);
