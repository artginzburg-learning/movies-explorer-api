const mongoose = require('mongoose');

const { MONGO } = require('../helpers/constants');

const User = require('./user');
const Movie = require('./movie');

mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

module.exports = {
  User,
  Movie,
};
