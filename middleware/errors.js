const {
  isCelebrateError,
} = require('celebrate');

const { ERROR_MESSAGES } = require('../utils/constants');

module.exports.handleErrors = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    res.status(400).send({ message: [...err.details.entries()][0][1].message });
  }
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({ message: statusCode === 500 ? ERROR_MESSAGES.internalServer : message });
  next(err);
};
