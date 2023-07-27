'use strict';

const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Video = require('../models/Video');
const { paging } = require('../util/paging');

// ==================================================

// Lấy tất cả data của movie từ database
exports.getMovies = (req, res, next) => {
  const page = req.query.page;

  Movie.fetchAll((movies) => {
    const data = paging(movies, page);

    return res.send(data);
  });
};

// Lấy tất cả data của movie theo trending
exports.getMoviesTrending = (req, res, next) => {
  const page = req.query.page;

  Movie.fetchAll((movies) => {
    // Sắp xếp giảm dần theo popularity
    const trendingList = movies.sort((a, b) => b.popularity - a.popularity);

    const data = paging(trendingList, page);

    return res.send(data);
  });
};

// Lấy tất cả data của movie theo top-rate
exports.getMoviesTopRate = (req, res, next) => {
  const page = req.query.page;

  Movie.fetchAll((movies) => {
    // Sắp xếp giảm dần theo vote_average
    const trendingList = movies.sort((a, b) => b.vote_average - a.vote_average);

    const data = paging(trendingList, page);

    return res.send(data);
  });
};

// Lấy tất cả data của movie theo genre
exports.getMoviesDiscover = (req, res, next) => {
  const page = req.query.page;
  const genreId = req.query.genreId;

  if (!genreId) {
    return res.status(400).send({ message: 'Not found gerne parram' });
  }

  Genre.fetchAll((genres) => {
    // Tìm genre theo id
    const genre = genres.find((g) => g.id === +genreId);

    if (!genre) {
      return res.status(400).send({ message: 'Not found that gerne id' });
    }

    Movie.fetchAll((movies) => {
      const discoverList = [];

      movies.map((movie) =>
        movie.genre_ids.map((gId) => {
          if (gId === +genreId) discoverList.push(movie);
        })
      );

      const data = paging(discoverList, page);

      return res.send({ ...data, genre_name: genre.name });
    });
  });
};

// Tìm trailer/teaser của 1 movie
exports.postMoviesVideo = (req, res, next) => {
  const filmId = req.body.film_id;

  if (!filmId) {
    return res.status(400).send({ message: 'Not found film_id parram' });
  }

  Video.fetchAll((videos) => {
    // Tìm video theo movie id
    const movieVideo = videos.find((v) => v.id === +filmId);

    if (!movieVideo) {
      return res.status(404).send({ message: 'Not found video' });
    }

    const dataList = [];
    const trailerList = [];

    movieVideo.videos.map((v) => {
      // Tìm theo điều kiện là trailer hoặc teaser
      if (
        v.official &&
        v.site === 'YouTube' &&
        (v.type === 'Trailer' || v.type === 'Teaser')
      ) {
        // Tính thời gian ra video gần nhất
        const timeDuration =
          new Date().getTime() - new Date(v.published_at).getTime();

        if (v.type === 'Trailer') {
          trailerList.push({
            ...v,
            published_duration: timeDuration,
          });
        } else {
          dataList.push({ ...v, published_duration: timeDuration });
        }
      }
    });

    if (trailerList.length === 0 && dataList.length === 0) {
      return res.status(404).send({ message: 'Not found video' });
    }

    // Ưu tiên trả về là 1 trailer với thời gian ra mắt gần nhất
    if (trailerList.length !== 0) {
      let trailerInfo = trailerList[0];

      for (const i of trailerList) {
        if (trailerInfo?.timeDuration > trailerList[i]?.timeDuration) {
          trailerInfo = trailerList[i];
        }
      }

      return res.send(trailerInfo);
    }

    let videoInfo = dataList[0];

    // Nếu không có trailer sẽ trả về teaser ra mắt gần nhất
    for (const i of dataList) {
      if (videoInfo?.timeDuration > dataList[i]?.timeDuration) {
        videoInfo = dataList[i];
      }
    }

    return res.send(videoInfo);
  });
};

// Tìm kiếm movie
exports.postMoviesSearch = (req, res, next) => {
  const page = req.query.page;
  const keyword = req.body.keyword;
  const genre = req.body.genre;
  const mediaType = req.body.mediaType;
  const language = req.body.language;
  const year = req.body.year;

  if (!keyword) {
    return res.status(400).send({ message: 'Not found keyword parram' });
  }

  const movie = new Movie(keyword, genre, mediaType, language, year);

  movie.searchMovie((movies) => {
    if (movies.length === 0) {
      return res
        .status(400)
        .send({ message: 'Can not find any information about this movie' });
    }

    const movieList = paging(movies, page);

    return res.send(movieList);
  });
};
