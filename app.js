'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const movieRoutes = require('./routes/movie');

// ==================================================

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res, next) => {
  res.send('<h1>Welcome to my server!</h1>');
});
app.use('/api/movies', movieRoutes);

app.listen(process.env.PORT || 5000);
