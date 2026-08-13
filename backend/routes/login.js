const express = require('express');
const router = express.Router();
const { validateLogin } = require('../middleware/validation');
const submitLogin = require('../controllers/loginController');

router.post('/login', validateLogin, submitLogin);

module.exports = router;