const express = require('express');
const router = express.Router();
const { validateLogin } = require('../middleware/validation'); //login can be use for register
const submitRegister = require('../controllers/registerController');

router.post('/register', validateLogin, submitRegister);

module.exports = router;