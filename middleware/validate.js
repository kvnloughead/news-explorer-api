const { celebrate, Joi } = require('celebrate');

module.exports.validateIdParam = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum(),
  }),
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().min(4).max(15).alphanum()
      .required(),
  }),
});

module.exports.validateAuthorizeUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    publishedAt: Joi.string().required(),
    source: Joi.string().required(),
    url: Joi.string().uri().required(),
    urlToImage: Joi.string().uri().required(),
  }),
});
