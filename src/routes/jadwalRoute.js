const express = require('express');
const router = express.Router();
const jadwalController = require('../controller/jadwalController');

// GET semua jadwal
router.get('/', jadwalController.getAllJadwal);

// POST tambah jadwal (dengan pengecekan mapel dan guru)
router.post('/', jadwalController.createJadwal);

// PUT update jadwal (dengan pengecekan juga)
router.put('/:id', jadwalController.updateJadwal);

// DELETE jadwal
router.delete('/:id', jadwalController.deleteJadwal);

module.exports = router;
