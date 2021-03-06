const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');

const { requestLogger, errorLogger } = require('./middleware/logger');
const { handleErrors } = require('./middleware/errors.js');
const { DB_ADDRESS, ERROR_MESSAGES, STATUS_CODES } = require('./utils/constants');
const { limiter } = require('./middleware/limiter');

const routes = require('./routes/index.js');

const { PORT = 3000 } = process.env;
const app = express();

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

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.status(STATUS_CODES.notFound).json({ message: ERROR_MESSAGES.notFound });
});
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
