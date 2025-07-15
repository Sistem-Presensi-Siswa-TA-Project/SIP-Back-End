const express = require('express');
const router = express.Router();
const siswaController = require('../controller/siswaController');

<<<<<<< HEAD
// GET semua siswa
router.get('/', siswaController.getAllSiswa);

// GET siswa berdasarkan kelas
router.get('/kelas/:kelas', siswaController.getSiswaByKelas);

// GET siswa berdasarkan NISN
router.get('/nisn/:nisn', siswaController.getSiswaByNisn);

// POST tambah siswa
router.post('/', siswaController.createSiswa);

// PUT update siswa berdasarkan ID
router.put('/:id_siswa', siswaController.updateSiswa);

// DELETE siswa berdasarkan ID
router.delete('/:id_siswa', siswaController.deleteSiswa);

module.exports = router;
=======
// GET all students
router.get('/', siswaController.getAllSiswa);

// GET student by NISN and Kelas
router.get('/:nisn/:kelas', siswaController.getSiswaByNisnAndKelas);

// POST new student
router.post('/', siswaController.createSiswa);

// PUT update student by id_siswa
router.put('/:id_siswa', siswaController.updateSiswa);

// DELETE student by id_siswa
router.delete('/:id_siswa', siswaController.deleteSiswa);

module.exports = router;
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
