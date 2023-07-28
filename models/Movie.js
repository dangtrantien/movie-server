'use strict';

const path = require('path');
const fs = require('fs');

const Genre = require('./Genre');

// ==================================================

const pathDr = path.join(__dirname, '..', 'data', 'movieList.json');

const getMovieList = (callback) => {
  const data = fs.readFileSync(pathDr);

  callback(JSON.parse(data));
};

module.exports = class Movie {
  constructor(keyword, genre, mediaType, language, year) {
    this.keyword = keyword;
    this.genre = genre;
    this.mediaType = mediaType;
    this.language = language;
    this.year = year;
    this.movies = [];
    this.movieListWithGenre = [];
  }

  searchMovie(callback) {
    getMovieList((movies) => {
      // Tìm movie theo keyword
      this.movies = movies.filter(
        (movie) =>
          movie.title?.toLowerCase().includes(this.keyword) ||
          movie.overview?.toLowerCase().includes(this.keyword)
      );

      // Tìm movie theo genre
      if (this.genre) {
        let genre;

        Genre.fetchAll(
          (genres) =>
            (genre = genres.find((g) =>
              g.name.toLowerCase().includes(this.genre)
            ))
        );

        if (!genre) {
          return;
        }

        this.movies.map((movie) => {
          const existingGenre = movie.genre_ids.find((gId) => gId === genre.id);

          if (existingGenre) {
            this.movieListWithGenre.push(movie);
          }
        });

        // Tìm movie theo mediaType
        if (this.mediaType) {
          if (this.mediaType === 'all') {
            this.movieListWithGenre = this.movieListWithGenre;
          } else {
            this.movieListWithGenre = this.movieListWithGenre.filter((movie) =>
              movie.media_type.includes(this.mediaType)
            );
          }
        }

        // Tìm movie theo language
        if (this.language) {
          this.movieListWithGenre = this.movieListWithGenre.filter((movie) =>
            movie.original_language.includes(this.language)
          );
        }

        // Tìm movie theo year
        if (this.year) {
          this.movieListWithGenre = this.movieListWithGenre.filter(
            (movie) =>
              new Date(movie.release_date).getFullYear() === this.year ||
              new Date(movie.first_air_date).getFullYear() === this.year
          );
        }

        return callback(this.movieListWithGenre);
      } else {
        if (this.mediaType) {
          if (this.mediaType === 'all') {
            this.movies = this.movies;
          } else {
            this.movies = this.movies.filter((movie) =>
              movie.media_type.includes(this.mediaType)
            );
          }
        }

        if (this.language) {
          this.movies = this.movies.filter((movie) =>
            movie.original_language.includes(this.language)
          );
        }

        if (this.year) {
          this.movies = this.movies.filter(
            (movie) =>
              new Date(movie.release_date).getFullYear() === this.year ||
              new Date(movie.first_air_date).getFullYear() === this.year
          );
        }

        return callback(this.movies);
      }
    });
  }

  static fetchAll(callback) {
    getMovieList(callback);
  }
};
