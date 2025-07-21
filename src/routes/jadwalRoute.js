const express = require('express');
const router = express.Router();
const jadwalController = require('../controller/jadwalController');

// GET semua jadwal
router.get('/', jadwalController.getAllJadwal);

//GET jadwal berdasarkan id 
router.get('/:id', jadwalController.getJadwalById);

//GET jadwal berdasarkan hari dan guru
router.get('/hari/:hari/guru/:guru', jadwalController.getJadwalByHaridanGuru);

//GET jadwal berdasarkan guru
router.get('/guru/:guru', jadwalController.getJadwalByGuru);

//GET jadwal berdasarkan kelas
router.get('/kelas/:kelas', jadwalController.getJadwalByKelas);

// POST tambah jadwal (dengan pengecekan mapel dan guru)
router.post('/', jadwalController.createJadwal);

// PUT update jadwal (dengan pengecekan juga)
router.put('/:id', jadwalController.updateJadwal);

// DELETE jadwal
router.delete('/:id', jadwalController.deleteJadwal);

module.exports = router;
