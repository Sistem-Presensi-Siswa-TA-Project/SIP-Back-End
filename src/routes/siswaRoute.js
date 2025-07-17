const express = require('express');
const router = express.Router();
const siswaController = require('../controller/siswaController');
const formParser = require('../middleware/formParser'); // <== baru


// GET semua siswa
router.get('/', siswaController.getAllSiswa);

// GET siswa berdasarkan kelas
router.get('/kelas/:kelas', siswaController.getSiswaByKelas);

// GET siswa berdasarkan NISN
router.get('/nisn/:nisn', siswaController.getSiswaByNisn);

// GET siswa berdasarkan NISN
router.get('/id-siswa/:id_siswa', siswaController.getSiswaById);

// POST tambah siswa
router.post('/', formParser, siswaController.createSiswa);

// PUT update siswa berdasarkan ID
router.put('/:id_siswa', siswaController.updateSiswa);

// DELETE siswa berdasarkan ID
router.delete('/:id_siswa', siswaController.deleteSiswa);

module.exports = router;
