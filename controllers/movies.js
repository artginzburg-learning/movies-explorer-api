const { Movie } = require('../models');

const { classes, names } = require('../errors');

const { StatusCodes } = require('../helpers/StatusCodes');

const {
  NotFoundError, BadRequestError, ForbiddenError,
} = classes;

const defaultPopulation = ['owner'];

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((data) => res.status(StatusCodes.created).send({ data }))
    .catch((err) => next(err.name === names.Validation ? new BadRequestError() : err));
};

module.exports.getMovies = (req, res, next) => Movie.find({})
  .populate(defaultPopulation)
  .then((data) => res.send({ data }))
  .catch(next);

module.exports.deleteMovie = async (req, res, next) => {
  let movie;
  try {
    movie = await Movie.findById(req.params.id)
      .orFail(new NotFoundError());
  } catch (error) {
    return next(error);
  }

  return movie.owner.toString() === req.user._id
    ? movie
      .delete()
      .then((data) => res.send({ data }))
      .catch((err) => next(err.name === names.Cast ? new BadRequestError() : err))
    : next(new ForbiddenError());
};
