const express = require('express');
const router = express.Router();
const mapelController = require('../controller/mapelController');

// GET semua mapel
router.get('/', mapelController.getAllMapel);

// GET mapel by ID
router.get('/:id', mapelController.getMapelById);

// POST tambah mapel
router.post('/', mapelController.createMapel);

// PUT update mapel
router.put('/:id', mapelController.updateMapel);

// DELETE all mapel
router.delete('/', mapelController.deleteAllMapel);

// DELETE mapel
router.delete('/:id', mapelController.deleteMapel);

module.exports = router;
