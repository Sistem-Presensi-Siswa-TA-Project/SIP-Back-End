const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const formParser = require('../middleware/formParser');

router.post('/login', formParser, authController.login);

module.exports = router;
