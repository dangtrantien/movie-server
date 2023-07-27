'use strict';

const express = require('express');

const movieController = require('../controllers/movie');
const { authToken } = require('../middleware/authentication');

// ==================================================

const router = express.Router();

router.get('/', authToken, movieController.getMovies);

router.get('/trending', authToken, movieController.getMoviesTrending);

router.get('/top-rate', authToken, movieController.getMoviesTopRate);

router.get('/discover', authToken, movieController.getMoviesDiscover);

router.post('/video', authToken, movieController.postMoviesVideo);

router.post('/search', authToken, movieController.postMoviesSearch);

module.exports = router;
