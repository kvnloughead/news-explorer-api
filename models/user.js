const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'That is not a valid email address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 15,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
