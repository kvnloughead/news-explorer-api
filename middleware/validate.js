const { celebrate, Joi } = require('celebrate');

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateAuthorizeUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateIdParam = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum(),
  }),
});
