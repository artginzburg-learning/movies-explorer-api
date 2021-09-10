const mongoose = require('mongoose');

const User = require('./user');
const Movie = require('./movie');

const { HOST = 'localhost' } = process.env;

mongoose.connect(`mongodb://${HOST}:27017/bitfilmsdb`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

module.exports = {
  User,
  Movie,
};
