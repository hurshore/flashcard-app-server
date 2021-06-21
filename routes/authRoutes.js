const express = require('express');
const router = express.Router();
const { signup, login, getUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.get('/', authMiddleware, getUser);

module.exports = router;
