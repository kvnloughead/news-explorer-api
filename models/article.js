const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const pattern = /^(http:\/\/|https:\/\/)(www.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+\.[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/igm;
        return pattern.test(v);
      },
    },
  },
  urlToImage: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const pattern = /^(http:\/\/|https:\/\/)(www.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+\.[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/igm;
        return pattern.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('article', articleSchema);
