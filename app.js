require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(requestLogger);

app.use(
  rateLimiter,
  helmet(),
  cors({
    credentials: true,
    origin: [
      'https://deeplomka.nomoredomains.club',
      'https://localhost:3000',
    ],
  }),
);

app.options('*', cors()); // preflight request

app.use(
  cookieParser(),
  express.json(),
);

app.use('/', require('./routes'));

app.use(errorLogger);

app.use(
  errors(),
  errorHandler,
);

module.exports = { app };
