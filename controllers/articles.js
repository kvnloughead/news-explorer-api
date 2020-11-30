const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const Article = require('../models/article');
const { ERROR_MESSAGES, STATUS_CODES } = require('../utils/constants');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => {
      res.status(STATUS_CODES.ok).send(articles);
    })
    .catch(() => {
      throw new InternalServerError(ERROR_MESSAGES.internalServer);
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      res.status(STATUS_CODES.created).send(article);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(ERROR_MESSAGES.articleBadRequest);
      }
    })
    .catch(next);
};

module.exports.deleteArticleById = (req, res, next) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (article && req.user._id.toString() === article.owner.toString()) {
        Article.deleteOne(article).then((deletedArticle) => {
          res.status(STATUS_CODES.ok).send(deletedArticle);
        });
      } else if (!article) {
        throw new NotFoundError(ERROR_MESSAGES.articleNotFound);
      } else {
        throw new UnauthorizedError(ERROR_MESSAGES.ownedArticlesOnly);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError(ERROR_MESSAGES.articleNotFound);
      }
      next(err);
    })
    .catch(next);
};
