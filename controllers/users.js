const NotFoundError = require('../errors/NotFoundError');
const User = require('../models/user');
const { ERROR_MESSAGES, STATUS_CODES } = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  User.find({}).select('+password')
    .then((user) => res.status(STATUS_CODES.ok).send(user))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id === 'me' ? req.user._id : req.params.id).select('+password')
    .then((user) => {
      if (user) {
        res.status(STATUS_CODES.ok).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'TypeError') {
        throw new NotFoundError(ERROR_MESSAGES.userNotFound);
      }
      next(err);
    })
    .catch(next);
};
