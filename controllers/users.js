const NotFoundError = require('../errors/NotFoundError');
const User = require('../models/user');
const { ERROR_MESSAGES } = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  User.find({}).select('+password')
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id === 'me' ? req.user._id : req.params.id).select('+password')
    .then((user) => {
      if (user) {
        res.status(200).send(user);
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
