const { isCelebrateError } = require('celebrate');

const { ERROR_MESSAGES, STATUS_CODES } = require('../utils/constants');

module.exports.handleErrors = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    res
      .status(STATUS_CODES.badRequest)
      .send({ message: [...err.details.entries()][0][1].message });
  }
  const { statusCode = STATUS_CODES.ok, message } = err;
  res
    .status(statusCode)
    .send({
      message:
        statusCode === STATUS_CODES.internalServer
          ? ERROR_MESSAGES.internalServer
          : message,
    });
  next(err);
};
