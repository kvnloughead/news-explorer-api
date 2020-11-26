const NotFoundError = require('../errors/NotFoundError');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({}).select('+password')
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id === 'me' ? req.user._id : req.params.id).select('+password')
    .then((user) => {
      if (user) {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'TypeError') {
        throw new NotFoundError('User not found.');
      }
      next(err);
    })
    .catch(next);
};
