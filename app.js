const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const { requestLogger, errorLogger } = require('./middleware/logger');
const { handleErrors } = require('./middleware/errors.js');

const routes = require('./routes/index.js');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(errorLogger);
app.use(requestLogger);

mongoose.connect('mongodb://127.0.0.1:27017/articlesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.status(404).json({ message: 'Requested resource not found' });
});
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
