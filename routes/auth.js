const router = require('express').Router();

const {
  createUser, authorizeUser,
} = require('../controllers/auth');

const {
  validateCreateUser, validateAuthorizeUser,
} = require('../middleware/validate');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateAuthorizeUser, authorizeUser);

module.exports = router;
