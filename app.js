require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { createUser, login, logout } = require('./controllers/users');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateRegister, validateLogin } = require('./middlewares/validation');

const { NotFoundError } = require('./errors/classes');

const { StatusCodes } = require('./helpers/StatusCodes');
const { messages } = require('./helpers/messages');

const rateLimiter = require('./rateLimiter');

const { PORT = 3000, HOST = 'localhost' } = process.env;

const app = express();

app.use(
  rateLimiter,
  helmet(),
  cors({
    credentials: true,
    origin: '*',
  }),
);

app.options('*', cors()); // preflight request

app.use(
  cookieParser(),
  express.json(),
);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт (или нет)');
  }, 0);
});

app.post('/signup', validateRegister, createUser);
app.post('/signin', validateLogin, login);
app.delete('/signout', logout);

app.use('/', require('./routes'));

app.use('*', () => {
  throw new NotFoundError(messages.notFound);
});

app.use(errorLogger);

app.use(
  errors(),
  (err, req, res, next) => {
    const {
      statusCode = StatusCodes.internal,
      message = messages.internal,
    } = err;

    res.status(statusCode).send({ message });
    next();
  },
);

app.listen(PORT, () => console.log(`API listening on http://${HOST}:${PORT}`));
