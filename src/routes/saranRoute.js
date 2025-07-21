const express = require('express');
const router = express.Router();
const saranController = require('../controllers/saranController');

router.post('/', saranController.createSaran);
router.get('/', saranController.getAllSaran);

module.exports = router;
