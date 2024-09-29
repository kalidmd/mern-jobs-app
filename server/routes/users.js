const express = require('express');
const router = express.Router();
const { registerUser, login, getUsers } = require('../controllers/users');

router.route('/').get(getUsers);
router.route('/register').post(registerUser);
router.route('/login').post(login);

module.exports = router;