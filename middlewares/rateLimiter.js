const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // in 15m...
  max: 100, // requests per IP.
});

module.exports = rateLimiter;
