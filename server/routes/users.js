const express = require('express');
const router = express.Router();
const { registerUser, login, getUsers, dashboard } = require('../controllers/users');
const authMiddleware = require('../middlewares/authentication');

router.route('/').get(getUsers);
router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route('/dashboard').get(authMiddleware, dashboard);

module.exports = router;