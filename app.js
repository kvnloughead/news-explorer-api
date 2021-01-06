const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middleware/logger');
const { handleErrors } = require('./middleware/errors.js');
const { DB_ADDRESS, ERROR_MESSAGES } = require('./utils/constants');
const { limiter } = require('./middleware/limiter');

const routes = require('./routes/index.js');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(limiter);
app.use(errorLogger);
app.use(requestLogger);

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('/', routes);

app.use(() => {
  throw new NotFoundError(ERROR_MESSAGES.notFound);
});

app.use(handleErrors);

module.exports = app;
