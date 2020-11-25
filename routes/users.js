const router = require('express').Router();

const {
  getUsers, getUserById,
} = require('../controllers/users');
const auth = require('../middleware/auth');

router.get('/', auth, getUsers);
router.get('/:id', auth, getUserById);

module.exports = router;
