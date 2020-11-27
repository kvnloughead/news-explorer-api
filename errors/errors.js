const {
  isCelebrateError,
} = require('celebrate');

module.exports.handleErrors = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    // { message: 'Data validation error.  Request cannot be completed.' }
    // console.log([...err.details.entries()][0][1].message);
    res.status(400).send({ message: [...err.details.entries()][0][1].message });
  }
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'An error has occured on the server' : message });
  next(err);
};
