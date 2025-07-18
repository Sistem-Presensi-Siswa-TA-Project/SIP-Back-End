const express = require('express');
const router = express.Router();
const jadwalController = require('../controller/jadwalController');

// GET semua jadwal
router.get('/', jadwalController.getAllJadwal);

//GET jadwal berdasarkan id 
router.get('/:id', jadwalController.getJadwalById);

//GET jadwal berdasarkan hari
router.get('/hari/:hari', jadwalController.getJadwalByHari);

//GET jadwal berdasarkan hari
router.get('/guru/:guru', jadwalController.getJadwalByGuru);

// POST tambah jadwal (dengan pengecekan mapel dan guru)
router.post('/', jadwalController.createJadwal);

// PUT update jadwal (dengan pengecekan juga)
router.put('/:id', jadwalController.updateJadwal);

// DELETE jadwal
router.delete('/:id', jadwalController.deleteJadwal);

module.exports = router;
