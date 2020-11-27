const router = require('express').Router();

const {
  getArticles, createArticle, deleteArticleById,
} = require('../controllers/articles');

const auth = require('../middleware/auth');
const { validateIdParam, validateCreateArticle } = require('../middleware/validate');

router.get('/', auth, getArticles);
router.post('/', auth, validateCreateArticle, createArticle);
router.delete('/:id', auth, validateIdParam, deleteArticleById);

module.exports = router;
