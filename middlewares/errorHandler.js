const { StatusCodes } = require('../helpers/StatusCodes');
const { messages } = require('../helpers/messages');

const errorHandler = (err, req, res, next) => {
  const {
    statusCode = StatusCodes.internal,
    message = messages.internal,
  } = err;

  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
