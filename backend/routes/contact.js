const express = require('express');
const router = express.Router();
const { validateContact } = require('../middleware/validation');
const submitContact = require('../controllers/contactController');

router.post('/contact', validateContact, submitContact);

module.exports = router;