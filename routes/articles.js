const router = require('express').Router();

const {
  getArticles, createArticle, deleteArticleById,
} = require('../controllers/articles');

const auth = require('../middleware/auth');

router.get('/', auth, getArticles);
router.post('/', auth, createArticle);
router.delete('/:id', auth, deleteArticleById);

module.exports = router;
