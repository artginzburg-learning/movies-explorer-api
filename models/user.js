const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const requiredString = require('./helpers/requiredString');
const validate = require('./helpers/validate');

const userSchema = new mongoose.Schema(
  {
    email: {
      ...requiredString,
      unique: true,
      validate: validate.email,
    },
    password: {
      ...requiredString,
      select: false,
    },
    name: {
      ...requiredString,
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false },
);

const rejectInvalidCredentials = () => Promise.reject(new Error('Неправильные почта или пароль'));

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, pass) {
  return this.findOne({ email }).select('+password')
    .then(({ password, ...user }) => {
      if (!user) {
        return rejectInvalidCredentials;
      }

      return bcrypt.compare(pass, password)
        .then((matched) => {
          if (!matched) {
            return rejectInvalidCredentials;
          }

          return user;
        });
    });
};

const User = mongoose.model('user', userSchema);

module.exports = User;
