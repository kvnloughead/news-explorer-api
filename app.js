const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const {
  errors, isCelebrateError,
} = require('celebrate');
const BadRequestError = require('./errors/BadRequestError');

const routes = require('./routes/index.js');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/articlesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public')));

app.use(errors());
app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    throw new BadRequestError('Data validation error.  Request cannot be completed.');
  }
  next(err);
});


app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
