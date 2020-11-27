const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const User = require('../models/user');
const { ERROR_MESSAGES, STATUS_CODES } = require('../utils/constants');

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const
    {
      name, email, password,
    } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      name,
      password: hash,
    }))
    .then((user) => res.status(STATUS_CODES.created).send(user))
    .catch((err) => {
      if (err.message.includes('duplicate key error')) {
        throw new BadRequestError(ERROR_MESSAGES.emailNotUnique);
      }
      if (err.name === 'ValidationError' || err.name === 'MongoError') {
        throw new BadRequestError(ERROR_MESSAGES.userBadRequest);
      }
      next(err);
    })
    .catch(next);
};

module.exports.authorizeUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(ERROR_MESSAGES.badCredentials);
      } else {
        req._id = user._id;
        return bcrypt.compare(password, user.password);
      }
    })
    .then((matched) => {
      if (!matched) {
        throw new UnauthorizedError(ERROR_MESSAGES.badCredentials);
      }
      const token = jwt.sign({ _id: req._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.header('authorization', `Bearer ${token}`);
      res.cookie('token', token, { httpOnly: true });
      res.status(STATUS_CODES.ok).send({ token });
    })
    .catch(next);
};