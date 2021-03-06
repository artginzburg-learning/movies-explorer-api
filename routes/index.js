const router = require('express').Router();

const { createUser, login, logout } = require('../controllers/users');

const auth = require('../middlewares/auth');
const { validateRegister, validateLogin } = require('../middlewares/validation');

const { NotFoundError } = require('../errors/classes');

const { messages } = require('../helpers/messages');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт (или нет)');
  }, 0);
});

router.post('/signup', validateRegister, createUser);
router.post('/signin', validateLogin, login);
router.delete('/signout', logout);

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.use('*', () => {
  throw new NotFoundError(messages.notFound);
});

module.exports = router;
