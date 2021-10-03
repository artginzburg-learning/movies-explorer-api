const fs = require('fs');
const https = require('https');

const { app } = require('./app');

const defaultEnv = 'development';

const { NODE_ENV = defaultEnv, PORT = NODE_ENV === defaultEnv ? 3001 : 3000, HOST = 'localhost' } = process.env;

if (NODE_ENV === defaultEnv) {
  https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
  }, app)
    .listen(PORT, () => console.log(`API listening on https://${HOST}:${PORT}`));
} else {
  app.listen(PORT, () => console.log(`API listening on http://${HOST}:${PORT}`));
}
