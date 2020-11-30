const router = require('express').Router();

const {
  getUsers, getUserById,
} = require('../controllers/users');
const auth = require('../middleware/auth');

const { validateIdParam } = require('../middleware/validate');

router.get('/', auth, getUsers);
router.get('/:id', auth, validateIdParam, getUserById);

module.exports = router;
