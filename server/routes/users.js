const express = require('express');
const router = express.Router();
const { registerUser, login, dashboard } = require('../controllers/users');
const authMiddleware = require('../middlewares/authentication');

router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route('/dashboard').get(authMiddleware, dashboard);

module.exports = router;