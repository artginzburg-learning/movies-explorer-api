const mongoose = require('mongoose');

const requiredString = require('./helpers/requiredString');
const validate = require('./helpers/validate');

const refUserId = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user',
};

const movieSchema = new mongoose.Schema(
  {
    country: {
      ...requiredString,
    },
    director: {
      ...requiredString,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      ...requiredString,
    },
    description: {
      ...requiredString,
    },
    image: {
      ...requiredString,
      validate: validate.URL,
    },
    trailer: {
      ...requiredString,
      validate: validate.URL,
    },
    thumbnail: {
      ...requiredString,
      validate: validate.URL,
    },
    owner: {
      ...refUserId,
      required: true,
    },
    movieId: {
      ...requiredString,
    },
    nameRU: {
      ...requiredString,
    },
    nameEN: {
      ...requiredString,
    },
  },
  { versionKey: false },
);

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;
