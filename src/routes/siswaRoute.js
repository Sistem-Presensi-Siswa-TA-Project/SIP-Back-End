const express = require('express');
const router = express.Router();
const siswaController = require('../controller/siswaController');

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