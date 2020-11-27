const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const Article = require('../models/article');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch(() => {
      throw new InternalServerError('An error has occured on the server');
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
      res.status(201).send(article);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Data validation failed:  article cannot be created.');
      }
    })
    .catch(next);
};

module.exports.deleteArticleById = (req, res, next) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (article && req.user._id.toString() === article.owner.toString()) {
        Article.deleteOne(article).then((deletedArticle) => {
          res.status(200).send(deletedArticle);
        });
      } else if (!article) {
        throw new NotFoundError('Card not found.');
      } else {
        throw new UnauthorizedError('Authorization required.  You can only delete your own cards.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Card not found.');
      }
      next(err);
    })
    .catch(next);
};
